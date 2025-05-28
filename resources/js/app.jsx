import "./bootstrap";
import "../css/app.css";
import "../css/rtl.css";

import { createInertiaApp, router } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import axios from "axios";

import GlobalProviders from "./Components/GlobalProviders";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Add CSRF token to all axios requests
        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
        axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
        axios.defaults.withCredentials = true;

        // Optimize CSRF token refresh handling
        let isRefreshing = false;
        let failedQueue = [];

        const processQueue = (error, token = null) => {
            failedQueue.forEach((prom) => {
                if (error) {
                    prom.reject(error);
                } else {
                    prom.resolve(token);
                }
            });
            failedQueue = [];
        };

        // Enhanced CSRF token refresh for axios
        axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (
                    error.response &&
                    error.response.status === 419 &&
                    !originalRequest._retry
                ) {
                    if (isRefreshing) {
                        return new Promise((resolve, reject) => {
                            failedQueue.push({ resolve, reject });
                        })
                            .then((token) => {
                                originalRequest.headers["X-CSRF-TOKEN"] = token;
                                return axios(originalRequest);
                            })
                            .catch((err) => Promise.reject(err));
                    }

                    originalRequest._retry = true;
                    isRefreshing = true;

                    try {
                        // Get fresh CSRF token from server
                        const tokenResponse = await fetch("/refresh-csrf");
                        const tokenData = await tokenResponse.json();
                        const newToken = tokenData.token;

                        // Update meta tag
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.setAttribute("content", newToken);

                        // Update axios headers
                        axios.defaults.headers.common["X-CSRF-TOKEN"] =
                            newToken;
                        originalRequest.headers["X-CSRF-TOKEN"] = newToken;

                        isRefreshing = false;
                        processQueue(null, newToken);

                        return axios(originalRequest);
                    } catch (refreshError) {
                        isRefreshing = false;
                        processQueue(refreshError);
                        return Promise.reject(error);
                    }
                }
                return Promise.reject(error);
            }
        );

        // Global Inertia error handler for CSRF errors
        router.on("error", (event) => {
            const { errors } = event.detail;

            // Check if it's a CSRF error (419)
            if (
                errors &&
                (errors.message?.includes("419") ||
                    errors.message?.includes("expired") ||
                    errors.message?.includes("token") ||
                    Object.keys(errors).some(
                        (key) =>
                            errors[key]?.includes &&
                            (errors[key].includes("419") ||
                                errors[key].includes("expired") ||
                                errors[key].includes("token"))
                    ))
            ) {
                console.log("CSRF error detected, refreshing token...");

                // Refresh CSRF token
                fetch("/refresh-csrf")
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.token) {
                            document
                                .querySelector('meta[name="csrf-token"]')
                                ?.setAttribute("content", data.token);

                            // Show user-friendly message
                            alert("جلسه ختم شوې. مهرباني وکړئ بیا هڅه وکړئ.");
                        }
                    })
                    .catch(() => {
                        // If refresh fails, reload the page
                        window.location.reload();
                    });
            }
        });

        root.render(
            <GlobalProviders>
                <App {...props} />
            </GlobalProviders>
        );
    },
    progress: {
        color: "#4B5563",
    },
});

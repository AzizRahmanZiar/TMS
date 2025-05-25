import "./bootstrap";
import "../css/app.css";
import "../css/rtl.css";

import { createInertiaApp } from "@inertiajs/react";
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

        // Add CSRF token to all requests
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

        axios.interceptors.response.use(
            (response) => response,
            (error) => {
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

                    return new Promise((resolve, reject) => {
                        const newToken = document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content");

                        axios.defaults.headers.common["X-CSRF-TOKEN"] =
                            newToken;
                        originalRequest.headers["X-CSRF-TOKEN"] = newToken;

                        isRefreshing = false;
                        processQueue(null, newToken);
                        resolve(axios(originalRequest));
                    });
                }
                return Promise.reject(error);
            }
        );

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

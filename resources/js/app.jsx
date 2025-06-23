import "./bootstrap";
import "../css/app.css";
import "../css/rtl.css";

import { createInertiaApp, router } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import axios from "axios";

import GlobalProviders from "./Components/GlobalProviders";
import { recordCSRFError, resetCSRFErrorTracking } from "./Utils/csrfUtils";

// Load CSRF console utilities in development
if (import.meta.env.DEV) {
    import("./Utils/csrfConsole");
}

// Configure Inertia to include CSRF token in all requests
router.on('before', (event) => {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (token) {
        event.detail.visit.headers = {
            ...event.detail.visit.headers,
            'X-CSRF-TOKEN': token,
        };
    }
});

// Handle successful responses to update CSRF token
router.on('success', (event) => {
    // Reset CSRF error tracking on successful requests
    resetCSRFErrorTracking();

    // Check if response contains a new CSRF token
    const newToken = event.detail.page.props._token;
    if (newToken) {
        const metaTag = document.querySelector('meta[name="csrf-token"]');
        if (metaTag) {
            metaTag.setAttribute('content', newToken);
        }
        // Update axios headers
        if (window.axios) {
            window.axios.defaults.headers.common['X-CSRF-TOKEN'] = newToken;
        }
    }
});

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
        let refreshTimeout = null;

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

        // Debounced token refresh to prevent rapid successive calls
        const refreshCSRFToken = async () => {
            if (refreshTimeout) {
                clearTimeout(refreshTimeout);
            }

            return new Promise((resolve, reject) => {
                refreshTimeout = setTimeout(async () => {
                    try {
                        const response = await fetch("/refresh-csrf", {
                            method: 'GET',
                            credentials: 'same-origin',
                            headers: {
                                'Accept': 'application/json',
                                'X-Requested-With': 'XMLHttpRequest'
                            }
                        });

                        if (response.ok) {
                            const data = await response.json();
                            if (data.token) {
                                // Update meta tag
                                document
                                    .querySelector('meta[name="csrf-token"]')
                                    ?.setAttribute("content", data.token);

                                // Update axios headers
                                axios.defaults.headers.common["X-CSRF-TOKEN"] = data.token;

                                console.log("CSRF token refreshed successfully");
                                resolve(data.token);
                            } else {
                                reject(new Error('No token received'));
                            }
                        } else {
                            reject(new Error('Failed to refresh token'));
                        }
                    } catch (error) {
                        console.error("Failed to refresh CSRF token:", error);
                        reject(error);
                    }
                }, 100); // 100ms debounce
            });
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
                        // Use the debounced refresh function
                        const newToken = await refreshCSRFToken();

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
            const { errors, status } = event.detail;

            // Check if it's a CSRF error (419)
            if (status === 419 || (
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
            )) {
                console.log("CSRF error detected, refreshing token...");

                // Record the CSRF error for tracking
                recordCSRFError();

                // Use the debounced refresh function
                refreshCSRFToken()
                    .then((newToken) => {
                        console.log("CSRF token refreshed successfully");
                        // Show user-friendly message
                        alert("جلسه ختم شوې. مهرباني وکړئ بیا هڅه وکړئ.");
                    })
                    .catch((error) => {
                        console.error("Failed to refresh CSRF token:", error);
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

import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { PostProvider } from "./Contexts/PostContext";
import { SadraiProvider } from "./Contexts/SadraiContext";
import { ClothsProvider } from "./Contexts/ClothsContext";
import { UniformProvider } from "./Contexts/UniformContext";
import { KortaiProvider } from "./Contexts/KortaiContext";
import { AdminProvider } from "./Contexts/AdminContext";
import { RegProvider } from "./Contexts/RegContext";
import { RatingProvider } from "./Contexts/RatingContext";

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

        root.render(
            <RatingProvider>
                <RegProvider>
                    <AdminProvider>
                        <ClothsProvider>
                            <UniformProvider>
                                <KortaiProvider>
                                    <SadraiProvider>
                                        <PostProvider>
                                            <App {...props} />{" "}
                                        </PostProvider>
                                    </SadraiProvider>
                                </KortaiProvider>
                            </UniformProvider>
                        </ClothsProvider>
                    </AdminProvider>
                </RegProvider>
            </RatingProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});

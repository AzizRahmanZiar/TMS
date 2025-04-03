import { router, usePage } from "@inertiajs/react";
import { useEffect } from "react";

const ProtectedRoute = ({ children, roles = [] }) => {
    const { auth } = usePage().props;

    useEffect(() => {
        if (!auth.user) {
            router.visit("/login");
        } else if (roles.length > 0 && !roles.includes(auth.user.role)) {
            router.visit("/");
        }
    }, [auth.user, roles]);

    if (!auth.user || (roles.length > 0 && !roles.includes(auth.user.role))) {
        return null;
    }

    return children;
};

export default ProtectedRoute;

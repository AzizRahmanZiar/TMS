import React from "react";
import { Link, usePage } from "@inertiajs/react";

const Sidebar = () => {
    const { auth, url } = usePage().props;
    const user = auth.user;

    // Function to check if a link is active - matching Navbar's logic
    const isActive = (path) => {
        if (!url || !path) return false;

        // Remove trailing slash for comparison
        const currentPath =
            url.endsWith("/") && url !== "/" ? url.slice(0, -1) : url;
        const linkPath =
            path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;

        // Check if the current path includes the link path
        return (
            currentPath === linkPath || currentPath.startsWith(linkPath + "/")
        );
    };

    // Define menu items with their required roles
    const menuItems = [
        {
            title: "Dashboard",
            href: "/dashboard",
            role: "admin,tailor",
        },
        {
            title: "اډمین",
            href: "/admin",
            role: "admin",
        },
        {
            title: "جامې",
            href: "/cloths",
            role: "tailor",
        },
        {
            title: "درشی",
            href: "/uniform",
            role: "tailor",
        },
        {
            title: "کورتۍ",
            href: "/kortai",
            role: "tailor",
        },
        {
            title: "صدرۍ",
            href: "/sadrai",
            role: "tailor",
        },
        {
            title: "پوسټ",
            href: "/adminpost",
            role: "tailor",
        },
    ];

    // Filter menu items based on user role
    const filteredMenuItems = menuItems.filter((item) => {
        if (!user) return false;
        // Admin can see all items
        if (user.role === "admin") return true;
        // Other users can only see items with their role
        return item.role === user.role;
    });

    return (
        <div className="flex justify-center pt-5 w-40 overflow-hidden h-screen bg-tertiary-600 text-white rtl">
            <ul className="w-full">
                {filteredMenuItems.map((item, index) => (
                    <li key={index}>
                        <Link
                            href={item.href}
                            className={`flex flex-row items-end justify-end font-semibold text-xl p-4 text-right transition ${
                                isActive(item.href)
                                    ? "text-secondary-400"
                                    : "text-primary-50 hover:text-primary-400"
                            }`}
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;

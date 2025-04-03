import React from "react";
import { Link } from "@inertiajs/react";

const Sidebar = ({ user }) => {
    // Define menu items with their required roles
    const menuItems = [
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
            title: "درشي",
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
        <div className="flex justify-center pt-5 w-40 overflow-hidden h-screen bg-tertiary-600 text-white">
            <ul>
                {filteredMenuItems.map((item, index) => (
                    <li key={index}>
                        <Link
                            href={item.href}
                            className="flex flex-row items-end font-semibold text-xl p-4 hover:bg-gray-700"
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

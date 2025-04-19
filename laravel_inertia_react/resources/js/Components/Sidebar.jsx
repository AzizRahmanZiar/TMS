import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { IoMdArrowDropleft } from "react-icons/io";
import { GiSewingMachine } from "react-icons/gi";
import { motion } from "framer-motion";

const Sidebar = () => {
    const { auth } = usePage().props;
    const user = auth.user;

    // Load active path from localStorage
    const [activePath, setActivePath] = useState(
        localStorage.getItem("activeSidebarPath") ||
            (user?.role === "admin" ? "/admin" : "/dashboard")
    );

    useEffect(() => {
        // Save to localStorage whenever activePath changes
        localStorage.setItem("activeSidebarPath", activePath);
    }, [activePath]);

    // Define menu items with their required roles
    const menuItems = [
        {
            title: "اډمین",
            href: "/admin",
            roles: ["admin"],
        },
        {
            title: "ډشبورډ",
            href: "/dashboard",
            roles: ["tailor"],
        },
        {
            title: "جامې",
            href: "/cloths",
            roles: ["tailor"],
        },
        {
            title: "درشی",
            href: "/uniform",
            roles: ["tailor"],
        },
        {
            title: "کورتۍ",
            href: "/kortai",
            roles: ["tailor"],
        },
        {
            title: "صدرۍ",
            href: "/sadrai",
            roles: ["tailor"],
        },
        {
            title: "پوسټ",
            href: "/adminpost",
            roles: ["tailor"],
        },
    ];

    // Filter menu items based on user role
    const filteredMenuItems = menuItems.filter((item) => {
        if (!user) return false;
        return item.roles.includes(user.role);
    });

    return (
        <div className="flex flex-col w-48 overflow-hidden h-screen border-primary-300 bg-primary-700 text-white rtl">
            <div className="flex items-center justify-center h-20 space-x-2 rtl:space-x-reverse">
                <Link
                    href={user?.role === "admin" ? "/admin" : "/dashboard"}
                    className="text-2xl font-bold flex items-center justify-center"
                    onClick={() =>
                        setActivePath(
                            user?.role === "admin" ? "/admin" : "/dashboard"
                        )
                    }
                >
                    <GiSewingMachine className="text-secondary-400 h-20 w-20" />
                </Link>
            </div>
            <ul className="w-full border-t-0.5 pt-10 border-primary-500 pr-0">
                {filteredMenuItems.map((item, index) => (
                    <motion.li
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Link
                            href={item.href}
                            onClick={() => setActivePath(item.href)}
                            className={`flex flex-row items-center justify-between font-semibold text-xl p-4 text-right transition-all duration-300 ${
                                activePath === item.href
                                    ? "text-secondary-400 bg-primary-600 border-r-4 border-secondary-400"
                                    : "text-primary-50 hover:text-primary-400 hover:bg-primary-600/30"
                            }`}
                        >
                            <span className="flex items-center w-full justify-between gap-2">
                                {item.title}
                                <motion.span
                                    animate={{
                                        x: activePath === item.href ? 0 : -5,
                                        opacity:
                                            activePath === item.href ? 1 : 0.7,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                >
                                    <IoMdArrowDropleft className="text-lg" />
                                </motion.span>
                            </span>
                        </Link>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;

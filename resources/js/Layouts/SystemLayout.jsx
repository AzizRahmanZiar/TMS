"use client";

import { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import ProtectedRoute from "../Components/ProtectedRoute";
import Sidebar from "../Components/Sidebar";
import NotificationDropdown from "../Components/NotificationDropdown";
import Portal from "../Components/Portal";
import { FaBars, FaUser, FaSignOutAlt, FaHome, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const SystemLayout = ({ children }) => {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const profileRef = useRef(null);

    // Add click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setShowProfileModal(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!auth.user) {
        return null; // ProtectedRoute will handle the redirect
    }

    // Get the current path
    const currentPath = window.location.pathname;

    // Determine which roles can access the current path
    let allowedRoles = [];
    if (currentPath === "/admin") {
        allowedRoles = ["admin"];
    } else if (currentPath === "/dashboard") {
        allowedRoles = ["tailor", "shopkeeper"];
    } else if (
        currentPath.startsWith("/cloths") ||
        currentPath.startsWith("/uniform") ||
        currentPath.startsWith("/kortai") ||
        currentPath.startsWith("/sadrai") ||
        currentPath.startsWith("/adminpost")
    ) {
        allowedRoles = ["tailor"];
    } else if (currentPath.startsWith("/advertisements")) {
        allowedRoles = ["shopkeeper"];
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <ProtectedRoute roles={allowedRoles}>
            <div className="flex h-screen rtl bg-gray-50">
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="flex w-full flex-col">
                    <motion.header
                        className="flex w-full h-16 md:h-20 justify-between items-center bg-gradient-to-br from-secondary-900 via-tertiary-800 to-secondary-950 px-4 md:px-8 shadow-2xl border-b border-tertiary-700/50 backdrop-blur-sm relative overflow-hidden"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full -translate-x-16 -translate-y-16"></div>
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-tertiary-400 to-primary-400 rounded-full translate-x-12 translate-y-12"></div>
                        </div>
                        <motion.button
                            className="text-white p-3 rounded-xl focus:outline-none hover:bg-white/10 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/20"
                            onClick={toggleSidebar}
                            aria-label="Toggle sidebar"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                animate={{ rotate: sidebarOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {sidebarOpen ? (
                                    <FaTimes className="text-xl" />
                                ) : (
                                    <FaBars className="text-xl" />
                                )}
                            </motion.div>
                        </motion.button>

                        <div className="flex items-center space-x-3 md:space-x-4">
                            {/* Notifications */}
                            <NotificationDropdown />

                            {/* User Profile Image */}
                            <div className="relative" ref={profileRef}>
                                <motion.button
                                    onClick={() =>
                                        setShowProfileModal(!showProfileModal)
                                    }
                                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30 shadow-lg backdrop-blur-sm border border-white/20"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary-400 flex items-center justify-center overflow-hidden">
                                        {auth.user &&
                                        auth.user.profile_image ? (
                                            <img
                                                src={`/storage/${auth.user.profile_image}`}
                                                alt={auth.user.name || "User"}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    console.error(
                                                        "Profile image failed to load:",
                                                        auth.user.profile_image
                                                    );
                                                    e.target.onerror = null;
                                                    e.target.src =
                                                        "/placeholder.svg";
                                                }}
                                            />
                                        ) : (
                                            <FaUser className="text-white text-lg" />
                                        )}
                                    </div>
                                </motion.button>

                                {/* Profile Dropdown */}
                                <AnimatePresence>
                                    {showProfileModal && (
                                        <Portal>
                                            {/* Backdrop */}
                                            <motion.div
                                                className="fixed inset-0 bg-black/20 z-[999998]"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                onClick={() =>
                                                    setShowProfileModal(false)
                                                }
                                            />
                                            {/* Modal */}
                                            <motion.div
                                                className="fixed left-52 top-16 w-80 -translate-x-1/2 bg-white

                                                rounded-2xl shadow-2xl ring-1 ring-black/10 z-[999999] border border-gray-200"
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.95,
                                                    y: -10,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                    y: 0,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.95,
                                                    y: -10,
                                                }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className="p-6 border-b border-gray-100">
                                                    <div className="flex flex-col justify-center items-center">
                                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center overflow-hidden shadow-lg ring-4 ring-white">
                                                            {auth.user &&
                                                            auth.user
                                                                .profile_image ? (
                                                                <img
                                                                    src={`/storage/${auth.user.profile_image}`}
                                                                    alt={
                                                                        auth
                                                                            .user
                                                                            .name ||
                                                                        "User"
                                                                    }
                                                                    className="w-full h-full object-cover"
                                                                    onError={(
                                                                        e
                                                                    ) => {
                                                                        e.target.onerror =
                                                                            null;
                                                                        e.target.src =
                                                                            "/placeholder.svg";
                                                                    }}
                                                                />
                                                            ) : (
                                                                <FaUser className="text-white text-2xl" />
                                                            )}
                                                        </div>

                                                        <h3 className="text-xl font-bold text-gray-900 mt-3 font-zar">
                                                            {auth.user?.name}
                                                        </h3>
                                                        <p className="text-base text-gray-600 font-zar">
                                                            {auth.user?.email}
                                                        </p>
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mt-2">
                                                            {auth.user?.role ===
                                                            "admin"
                                                                ? "اډمین"
                                                                : auth.user
                                                                      ?.role ===
                                                                  "tailor"
                                                                ? "خیاط"
                                                                : auth.user
                                                                      ?.role ===
                                                                  "shopkeeper"
                                                                ? "شرکت"
                                                                : "کارکوونکی"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <form
                                                        action={route("logout")}
                                                        method="POST"
                                                        className="w-full"
                                                        onSubmit={async (e) => {
                                                            e.preventDefault();

                                                            // Get fresh CSRF token
                                                            try {
                                                                const tokenResponse =
                                                                    await fetch(
                                                                        "/refresh-csrf"
                                                                    );
                                                                const tokenData =
                                                                    await tokenResponse.json();

                                                                const formData =
                                                                    new FormData();
                                                                formData.append(
                                                                    "_token",
                                                                    tokenData.token
                                                                );

                                                                await fetch(
                                                                    route(
                                                                        "logout"
                                                                    ),
                                                                    {
                                                                        method: "POST",
                                                                        body: formData,
                                                                        headers:
                                                                            {
                                                                                "X-Requested-With":
                                                                                    "XMLHttpRequest",
                                                                            },
                                                                    }
                                                                );

                                                                // Always redirect regardless of response
                                                                window.location.href =
                                                                    "/";
                                                            } catch (error) {
                                                                // If anything fails, just redirect
                                                                window.location.href =
                                                                    "/";
                                                            }
                                                        }}
                                                    >
                                                        <motion.button
                                                            type="submit"
                                                            className="w-full flex items-center justify-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-zar text-lg font-semibold border border-red-200 hover:border-red-300"
                                                            whileHover={{
                                                                scale: 1.02,
                                                            }}
                                                            whileTap={{
                                                                scale: 0.98,
                                                            }}
                                                        >
                                                            <FaSignOutAlt className="ml-3 text-lg" />
                                                            وتـــــــل
                                                        </motion.button>
                                                    </form>
                                                </div>
                                            </motion.div>
                                        </Portal>
                                    )}
                                </AnimatePresence>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    href="/"
                                    className="font-bold px-4 py-3 md:px-6 md:py-3 rounded-xl font-zar text-sm md:text-lg bg-gradient-to-r from-tertiary-500 to-tertiary-600 hover:from-tertiary-600 hover:to-tertiary-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 flex items-center gap-2"
                                >
                                    <FaHome className="text-base" />
                                    کـــــــور
                                </Link>
                            </motion.div>
                        </div>
                    </motion.header>

                    <motion.main
                        className="flex-1 overflow-y-auto w-full bg-gradient-to-br from-gray-50 to-gray-100 relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/20 to-secondary-50/20 pointer-events-none"></div>
                        <div className="relative z-0">{children}</div>
                    </motion.main>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default SystemLayout;

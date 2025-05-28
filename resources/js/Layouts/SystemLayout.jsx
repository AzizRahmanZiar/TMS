"use client";

import { useState, useEffect, useRef } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import ProtectedRoute from "../Components/ProtectedRoute";
import Sidebar from "../Components/Sidebar";
import {
    FaBars,
    FaUser,
    FaSignOutAlt,
    FaUserPlus,
    FaEnvelope,
    FaTimes,
    FaChevronDown,
} from "react-icons/fa";

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
            <div className="flex h-screen rtl">
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="flex w-full border-r-0.5 border-primary-500 flex-col">
                    <header className="flex w-full h-16 md:h-20 justify-between items-center bg-primary-700 px-3 md:px-6 shadow-md">
                        <button
                            className="text-white p-2 rounded-md focus:outline-none hover:bg-primary-600 transition-colors"
                            onClick={toggleSidebar}
                            aria-label="Toggle sidebar"
                        >
                            <FaBars className="text-xl" />
                        </button>

                        <div className="flex items-center space-x-4 md:space-x-4 rtl:space-x-reverse">
                            {/* User Profile Image */}
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() =>
                                        setShowProfileModal(!showProfileModal)
                                    }
                                    className="p-2 rounded-full bg-primary-600 hover:bg-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300"
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
                                </button>

                                {/* Profile Dropdown */}
                                {showProfileModal && (
                                    <div className="absolute left-2 w-72 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                                        <div className="p-4 border-b">
                                            <div className="flex flex-col justify-center items-center">
                                                <div className="w-12 h-12 rounded-full bg-primary-400 flex items-center justify-center overflow-hidden">
                                                    {auth.user &&
                                                    auth.user.profile_image ? (
                                                        <img
                                                            src={`/storage/${auth.user.profile_image}`}
                                                            alt={
                                                                auth.user
                                                                    .name ||
                                                                "User"
                                                            }
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
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

                                                <h3 className="text-xl font-medium text-gray-900">
                                                    {auth.user?.name}
                                                </h3>
                                                <p className="text-xl text-gray-500">
                                                    {auth.user?.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-2">
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

                                                        const response =
                                                            await fetch(
                                                                route("logout"),
                                                                {
                                                                    method: "POST",
                                                                    body: formData,
                                                                    headers: {
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
                                                <button
                                                    type="submit"
                                                    className="w-full text-xl flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                                >
                                                    <FaSignOutAlt className="ml-7 text-xl rtl:ml-0 rtl:mr-2" />
                                                    وتـــــــل
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="font-bold px-3 py-2 md:px-6 md:py-3 rounded-md font-zar text-sm md:text-xl bg-tertiary-500 hover:bg-tertiary-400 text-white transition-colors shadow-md"
                            >
                                کـــــــور
                            </Link>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto w-full bg-gray-50">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default SystemLayout;

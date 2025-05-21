"use client";

import { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import ProtectedRoute from "../Components/ProtectedRoute";
import Sidebar from "../Components/Sidebar";
import {
    FaBell,
    FaBars,
    FaUser,
    FaSignOutAlt,
    FaUserPlus,
    FaEnvelope,
    FaTimes,
} from "react-icons/fa";

const SystemLayout = ({ children }) => {
    const { auth } = usePage().props;
    const [notifications, setNotifications] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [notificationDropdownOpen, setNotificationDropdownOpen] =
        useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        // Debug auth user data
        console.log("Auth user data:", auth.user);

        // Fetch notifications when component mounts
        fetchNotifications();

        // Set up polling for new notifications every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);

        return () => clearInterval(interval);
    }, [auth.user]);

    // Add click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await fetch("/api/notifications");
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    const markAllNotificationsAsRead = async () => {
        try {
            await fetch("/api/notifications/mark-all-as-read", {
                method: "POST",
            });
            fetchNotifications(); // Refresh notifications
        } catch (error) {
            console.error("Error marking notifications as read:", error);
        }
    };

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
        allowedRoles = ["tailor"];
    } else if (
        currentPath.startsWith("/cloths") ||
        currentPath.startsWith("/uniform") ||
        currentPath.startsWith("/kortai") ||
        currentPath.startsWith("/sadrai") ||
        currentPath.startsWith("/adminpost")
    ) {
        allowedRoles = ["tailor"];
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleNotificationDropdown = async () => {
        const newState = !notificationDropdownOpen;
        setNotificationDropdownOpen(newState);

        // If opening the dropdown, mark all notifications as read
        if (newState) {
            await markAllNotificationsAsRead();
        }
    };

    const unreadNotifications = notifications.filter((n) => !n.read_at);

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
                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    onClick={toggleNotificationDropdown}
                                    className="p-2 rounded-full bg-primary-600 hover:bg-primary-500 transition-colors relative focus:outline-none focus:ring-2 focus:ring-primary-300"
                                    aria-label="Notifications"
                                >
                                    <FaBell className="text-primary-50 text-lg md:text-xl" />
                                    {unreadNotifications.length > 0 && (
                                        <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
                                            {unreadNotifications.length}
                                        </span>
                                    )}
                                </button>

                                {notificationDropdownOpen && (
                                    <div className="absolute left-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                        <div
                                            className="py-1 max-h-96 overflow-y-auto"
                                            role="menu"
                                        >
                                            {notifications.length === 0 ? (
                                                <div className="px-4 py-2 text-sm text-gray-500">
                                                    No notifications
                                                </div>
                                            ) : (
                                                notifications.map(
                                                    (notification) => (
                                                        <div
                                                            key={
                                                                notification.id
                                                            }
                                                            className={`px-4 py-2 hover:bg-gray-100 ${
                                                                !notification.read_at
                                                                    ? "bg-blue-50"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <div className="flex items-start">
                                                                <FaUserPlus className="mt-1 mr-2 text-primary-600" />
                                                                <div>
                                                                    <p className="text-sm text-gray-900">
                                                                        {
                                                                            notification
                                                                                .data
                                                                                .message
                                                                        }
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">
                                                                        {new Date(
                                                                            notification.created_at
                                                                        ).toLocaleString()}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

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
                                            <Link
                                                href={route("logout")}
                                                method="get"
                                                as="button"
                                                className="w-full text-xl flex items-center px-4 py-2  text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                            >
                                                <FaSignOutAlt className="ml-7 text-xl rtl:ml-0 rtl:mr-2" />
                                                وتـــــــل
                                            </Link>
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

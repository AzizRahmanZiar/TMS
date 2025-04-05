import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import ProtectedRoute from "../Components/ProtectedRoute";
import Sidebar from "../Components/Sidebar";
import { FaBell } from "react-icons/fa";

const SystemLayout = ({ children }) => {
    const { auth } = usePage().props;
    const [notifications, setNotifications] = useState([]);

    if (!auth.user) {
        return null; // ProtectedRoute will handle the redirect
    }

    return (
        <ProtectedRoute roles={["admin", "tailor"]}>
            <div className="flex h-screen rtl">
                <Sidebar />
                <main className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
                                    خیاطي مدیریت سیستم
                                </span>
                            </h1>
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                {/* Notifications */}
                                <div className="relative">
                                    <button
                                        className="p-2 rounded-full hover:bg-gray-200 transition-colors relative"
                                        aria-label="Notifications"
                                    >
                                        <FaBell className="text-gray-600 text-xl" />
                                        {notifications.length > 0 && (
                                            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                {notifications.length}
                                            </span>
                                        )}
                                    </button>
                                </div>

                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md transition-colors"
                                >
                                    وتل
                                </Link>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm min-h-[calc(100vh-12rem)]">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
};

export default SystemLayout;

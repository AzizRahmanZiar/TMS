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
            <div className="flex  h-screen rtl">
                <Sidebar />
                <div className="flex w-full border-r-0.5 border-primary-500 flex-col">
                    <header className="flex w-full h-20 justify-between items-center bg-primary-700 p-6 shadow-md">
                        <h1 className="text-3xl font-bold text-primary-50 flex items-center gap-3">
                            <span className="text-4xl font-reem">
                                خیــــــــــــاطي مدیریت سیستم
                            </span>
                        </h1>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    className="p-2 rounded-full bg-primary-600 hover:bg-primary-500 transition-colors relative focus:outline-none focus:ring-2 focus:ring-primary-300"
                                    aria-label="Notifications"
                                >
                                    <FaBell className="text-primary-50 text-xl" />
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
                                className="bg-secondary-500 hover:bg-secondary-400 text-white px-4 py-2 rounded-md transition-colors shadow-md"
                            >
                                لګاوټ
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

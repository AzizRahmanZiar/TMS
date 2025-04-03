import React from "react";
import { Link, usePage } from "@inertiajs/react";
import ProtectedRoute from "../Components/ProtectedRoute";
import Sidebar from "../Components/Sidebar";

const SystemLayout = ({ children }) => {
    const { auth } = usePage().props;

    if (!auth.user) {
        return null; // ProtectedRoute will handle the redirect
    }

    return (
        <ProtectedRoute roles={["admin", "tailor"]}>
            <div className="flex h-screen">
                <Sidebar />
                <main className="flex-1 overflow-y-auto bg-gray-100">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">
                                سیستم
                            </h1>
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-600">
                                    {auth.user?.name}
                                </span>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="text-red-600 hover:text-red-800"
                                >
                                    وتل
                                </Link>
                            </div>
                        </div>
                        {children}
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
};

export default SystemLayout;

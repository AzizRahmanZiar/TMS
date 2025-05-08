// import React, { useState } from "react";
// import { Link, usePage } from "@inertiajs/react";
// import ProtectedRoute from "../Components/ProtectedRoute";
// import Sidebar from "../Components/Sidebar";
// import { FaBell } from "react-icons/fa";

// const SystemLayout = ({ children }) => {
//     const { auth } = usePage().props;
//     const [notifications, setNotifications] = useState([]);

//     if (!auth.user) {
//         return null; // ProtectedRoute will handle the redirect
//     }

//     // Get the current path
//     const currentPath = window.location.pathname;

//     // Determine which roles can access the current path
//     let allowedRoles = [];
//     if (currentPath === "/admin") {
//         allowedRoles = ["admin"];
//     } else if (currentPath === "/dashboard") {
//         allowedRoles = ["tailor"];
//     } else if (
//         currentPath.startsWith("/cloths") ||
//         currentPath.startsWith("/uniform") ||
//         currentPath.startsWith("/kortai") ||
//         currentPath.startsWith("/sadrai") ||
//         currentPath.startsWith("/adminpost")
//     ) {
//         allowedRoles = ["tailor"];
//     }

//     return (
//         <ProtectedRoute roles={allowedRoles}>
//             <div className="flex h-screen rtl">
//                 <Sidebar />
//                 <div className="flex w-full border-r-0.5 border-primary-500 flex-col">
//                     <header className="flex w-full h-20 justify-end items-center bg-primary-700 p-6 shadow-md">
//                         <div className="flex items-center space-x-4 rtl:space-x-reverse">
//                             {/* Notifications */}
//                             <div className="relative">
//                                 <button
//                                     className="p-2 rounded-full bg-primary-600 hover:bg-primary-500 transition-colors relative focus:outline-none focus:ring-2 focus:ring-primary-300"
//                                     aria-label="Notifications"
//                                 >
//                                     <FaBell className="text-primary-50 text-xl" />
//                                     {notifications.length > 0 && (
//                                         <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                                             {notifications.length}
//                                         </span>
//                                     )}
//                                 </button>
//                             </div>

//                             <Link
//                                 href={route("logout")}
//                                 method="post"
//                                 as="button"
//                                 className="font-bold px-6 py-3 rounded-md font-zar text-xl bg-secondary-500 hover:bg-secondary-400 text-white transition-colors shadow-md "
//                             >
//                                 وتـــــــل
//                             </Link>

//                             <Link
//                                 href="/"
//                                 className="font-bold px-6 py-3 rounded-md font-zar text-xl bg-tertiary-500 hover:bg-tertiary-400 text-white transition-colors shadow-md"
//                             >
//                                 کـــــــور
//                             </Link>
//                         </div>
//                     </header>

//                     <main className="flex-1 overflow-y-auto w-full bg-gray-50">
//                         {children}
//                     </main>
//                 </div>
//             </div>
//         </ProtectedRoute>
//     );
// };

// export default SystemLayout;

"use client";

import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import ProtectedRoute from "../Components/ProtectedRoute";
import Sidebar from "../Components/Sidebar";
import { FaBell, FaBars } from "react-icons/fa";

const SystemLayout = ({ children }) => {
    const { auth } = usePage().props;
    const [notifications, setNotifications] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

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

                        <div className="flex items-center space-x-2 md:space-x-4 rtl:space-x-reverse">
                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    className="p-2 rounded-full bg-primary-600 hover:bg-primary-500 transition-colors relative focus:outline-none focus:ring-2 focus:ring-primary-300"
                                    aria-label="Notifications"
                                >
                                    <FaBell className="text-primary-50 text-lg md:text-xl" />
                                    {notifications.length > 0 && (
                                        <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
                                            {notifications.length}
                                        </span>
                                    )}
                                </button>
                            </div>

                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="font-bold px-3 py-2 md:px-6 md:py-3 rounded-md font-zar text-sm md:text-xl bg-secondary-500 hover:bg-secondary-400 text-white transition-colors shadow-md"
                            >
                                وتـــــــل
                            </Link>

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

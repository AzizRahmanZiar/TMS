import { useState } from "react";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { FaUser, FaCog, FaLock, FaTrash } from "react-icons/fa";
import SystemLayout from "@/Layouts/SystemLayout";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import DeleteUserForm from "./Partials/DeleteUserForm";

export default function Edit({ auth, mustVerifyEmail, status }) {
    const [activeTab, setActiveTab] = useState("profile");

    const tabs = [
        { id: "profile", name: "د پروفایل معلومات", icon: FaUser },
        { id: "password", name: "د پټنوم بدلول", icon: FaLock },
        { id: "delete", name: "د حساب حذف کول", icon: FaTrash },
    ];

    return (
        <SystemLayout>
            <Head title="د پروفایل تنظیمات" />

            <div className="py-12" dir="rtl">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-6 text-white shadow-lg"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                <FaCog className="text-white text-xl" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold font-zar">
                                    د پروفایل تنظیمات
                                </h1>
                                <p className="text-white/80 font-zar">
                                    خپل د حساب معلومات او تنظیمات اداره کړئ
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                    >
                        <div className="border-b border-gray-200">
                            <nav
                                className="flex space-x-8 px-6"
                                aria-label="Tabs"
                            >
                                {tabs.map((tab, index) => {
                                    const Icon = tab.icon;
                                    return (
                                        <motion.button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`py-4 px-1 border-b-2 font-medium text-sm font-zar flex items-center gap-2 transition-all duration-300 ${
                                                activeTab === tab.id
                                                    ? "border-primary-500 text-primary-600"
                                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                            }`}
                                            whileHover={{ y: -2 }}
                                            whileTap={{ y: 0 }}
                                        >
                                            <Icon className="text-sm" />
                                            {tab.name}
                                        </motion.button>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="p-6">
                            {activeTab === "profile" && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                        className="max-w-xl"
                                    />
                                </motion.div>
                            )}

                            {activeTab === "password" && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <UpdatePasswordForm className="max-w-xl" />
                                </motion.div>
                            )}

                            {activeTab === "delete" && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <DeleteUserForm className="max-w-xl" />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </SystemLayout>
    );
}

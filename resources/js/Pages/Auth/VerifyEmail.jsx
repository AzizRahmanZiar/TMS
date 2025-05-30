import { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    FaEnvelope,
    FaSpinner,
    FaCheckCircle,
    FaSignOutAlt,
} from "react-icons/fa";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <>
            <Head title="د بریښنالیک تصدیق" />

            <div
                className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8"
                dir="rtl"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full space-y-8"
                >
                    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-primary-100">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    delay: 0.2,
                                    type: "spring",
                                    stiffness: 200,
                                }}
                                className="mx-auto h-16 w-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-4"
                            >
                                <FaEnvelope className="h-8 w-8 text-white" />
                            </motion.div>
                            <h2 className="text-3xl font-bold text-gray-900 font-zar">
                                د بریښنالیک تصدیق
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 font-zar text-center leading-relaxed">
                                ستاسو د حساب د بشپړولو لپاره، مهرباني وکړئ د خپل
                                بریښنالیک د تصدیق لینک ته کلیک وکړئ چې موږ دمخه
                                ستاسو ته لیږلی دی. د تصدیق وروسته تاسو به ډشبورډ
                                ته واستول شئ.
                            </p>
                        </div>

                        {/* Status Message */}
                        {status === "verification-link-sent" && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl"
                            >
                                <div className="flex items-center">
                                    <FaCheckCircle className="h-5 w-5 text-green-500 ml-2" />
                                    <p className="text-sm text-green-800 font-zar">
                                        د تصدیق نوی لینک ستاسو بریښنالیک ته
                                        واستول شو
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* Actions */}
                        <div className="space-y-4">
                            <motion.form
                                onSubmit={submit}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-4 focus:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-zar"
                                >
                                    {processing ? (
                                        <>
                                            <FaSpinner className="animate-spin ml-2 h-4 w-4" />
                                            د لینک لیږل کیږي...
                                        </>
                                    ) : (
                                        "د تصدیق بریښنالیک بیا واستوه"
                                    )}
                                </button>
                            </motion.form>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="w-full flex justify-center items-center py-3 px-4 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-300 font-zar"
                                >
                                    <FaSignOutAlt className="ml-2 h-4 w-4" />
                                    وتل
                                </Link>
                            </motion.div>
                        </div>

                        {/* Additional Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
                        >
                            <p className="text-xs text-blue-800 font-zar text-center leading-relaxed">
                                که تاسو د تصدیق بریښنالیک نه یاست ترلاسه کړی،
                                مهرباني وکړئ خپل سپام فولډر وګورئ یا د بریښنالیک
                                بیا لیږلو لپاره پورته تنۍ ته کلیک وکړئ.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}

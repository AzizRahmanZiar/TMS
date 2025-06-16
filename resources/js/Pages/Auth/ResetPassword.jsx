import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { FaEnvelope, FaLock, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    const submit = (e) => {
        e.preventDefault();
        router.post(window.route("password.store"), data);
    };

    return (
        <GuestLayout>
            <Head title="پټنوم بیا تنظیمول" />

            <motion.div
                className="w-full max-w-sm mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div
                    className="bg-gradient-to-br from-white via-white to-primary-50/30 rounded-2xl shadow-lg p-4 border border-white/50 backdrop-blur-sm"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="text-center mb-3"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl mx-auto mb-2 flex items-center justify-center shadow-md">
                            <FaKey className="text-white text-lg" />
                        </div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 font-zar">
                            پټنوم بیا تنظیمول
                        </h1>
                        <div className="h-0.5 w-12 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-2 rounded-full"></div>
                        <p className="text-gray-600 mt-2 text-xs font-zar">
                            خپل نوی پټنوم ولیکئ
                        </p>
                    </motion.div>

                    <motion.form
                        onSubmit={submit}
                        className="space-y-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block font-zar text-sm text-gray-700 mb-1"
                            >
                                بریښنالیک
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-primary-400 text-xs" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="pl-7 w-full p-2 text-sm rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 shadow-sm"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block font-zar text-sm text-gray-700 mb-1"
                            >
                                نوی پټنوم
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                                    <FaLock className="text-primary-400 text-xs" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="pl-7 w-full p-2 text-sm rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 shadow-sm"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="block font-zar text-sm text-gray-700 mb-1"
                            >
                                پټنوم تایید کړئ
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                                    <FaLock className="text-primary-400 text-xs" />
                                </div>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="pl-7 w-full p-2 text-sm rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 shadow-sm"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            {errors.password_confirmation && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        <motion.button
                            type="submit"
                            className={`w-full justify-center py-2 font-zar text-sm rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center transform hover:scale-[1.02] ${
                                processing
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 text-white"
                            }`}
                            disabled={processing}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            whileHover={!processing ? { y: -2 } : {}}
                            whileTap={!processing ? { scale: 0.98 } : {}}
                        >
                            <span className="mx-auto flex items-center text-sm font-semibold">
                                {processing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        د تنظیم په حال کې...
                                    </>
                                ) : (
                                    <>
                                        پټنوم بیا تنظیم کړئ
                                        <FaKey className="mr-2 text-xs" />
                                    </>
                                )}
                            </span>
                        </motion.button>
                    </motion.form>
                </motion.div>
            </motion.div>
        </GuestLayout>
    );
}

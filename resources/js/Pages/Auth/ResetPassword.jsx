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
                className="w-full max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div
                    className="bg-gradient-to-br from-white via-white to-primary-50/30 rounded-3xl shadow-2xl p-8 border border-white/50 backdrop-blur-sm"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="text-center mb-8"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                            <FaKey className="text-white text-2xl" />
                        </div>
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 font-zar">
                            پټنوم بیا تنظیمول
                        </h1>
                        <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-3 rounded-full"></div>
                        <p className="text-gray-600 mt-4 text-base font-zar">
                            خپل نوی پټنوم ولیکئ
                        </p>
                    </motion.div>

                    <motion.form
                        onSubmit={submit}
                        className="space-y-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block font-amiri text-xl text-gray-700 mb-2"
                            >
                                بریښنالیک
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-primary-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="pl-10 w-full p-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 shadow-md"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block font-amiri text-xl text-gray-700 mb-2"
                            >
                                نوی پټنوم
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-primary-400" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="pl-10 w-full p-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 shadow-md"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="block font-amiri text-xl text-gray-700 mb-2"
                            >
                                پټنوم تایید کړئ
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-primary-400" />
                                </div>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="pl-10 w-full p-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 shadow-md"
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
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        <motion.button
                            type="submit"
                            className={`w-full justify-center py-4 font-zar text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center transform hover:scale-[1.02] ${
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
                            <span className="mx-auto flex items-center text-lg font-semibold">
                                {processing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                        د تنظیم په حال کې...
                                    </>
                                ) : (
                                    <>
                                        پټنوم بیا تنظیم کړئ
                                        <FaKey className="mr-3 text-base" />
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

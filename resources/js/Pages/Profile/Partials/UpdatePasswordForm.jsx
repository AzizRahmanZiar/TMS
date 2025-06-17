import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    FaLock,
    FaEye,
    FaEyeSlash,
    FaSpinner,
    FaCheckCircle,
} from "react-icons/fa";

export default function UpdatePasswordForm({ className = "" }) {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                }

                if (errors.current_password) {
                    reset("current_password");
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 font-zar">
                    د پټنوم تازه کول
                </h2>
                <p className="mt-1 text-sm text-gray-600 font-zar">
                    ډاډ ترلاسه کړئ چې ستاسو حساب د اوږد او تصادفي پټنوم څخه کار
                    اخلي ترڅو خوندي پاتې شي
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                {/* Current Password */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <label
                        htmlFor="current_password"
                        className="block text-sm font-bold text-gray-700 font-zar mb-2"
                    >
                        اوسنی پټنوم
                    </label>
                    <div className="relative">
                        <input
                            id="current_password"
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="اوسنی پټنوم"
                            name="current_password"
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                            className={`w-full px-4 py-3  pl-12 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 font-zar text-right ${
                                errors.current_password
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                    : "border-gray-300 focus:border-primary-500 focus:ring-primary-200"
                            }`}
                            autoComplete="current-password"
                        />

                        <button
                            type="button"
                            className="absolute inset-y-0 left-3 pl-3 flex items-center"
                            onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                            }
                        >
                            {showCurrentPassword ? (
                                <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            ) : (
                                <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            )}
                        </button>
                    </div>
                    {errors.current_password && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-2 text-sm text-red-600 font-zar"
                        >
                            {errors.current_password}
                        </motion.p>
                    )}
                </motion.div>

                {/* New Password */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <label
                        htmlFor="password"
                        className="block text-sm font-bold text-gray-700 font-zar mb-2"
                    >
                        نوی پټنوم
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder=" نوی پټنوم"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className={`w-full px-4 py-3  pl-12 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 font-zar text-right ${
                                errors.password
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                    : "border-gray-300 focus:border-primary-500 focus:ring-primary-200"
                            }`}
                            autoComplete="new-password"
                        />

                        <button
                            type="button"
                            className="absolute inset-y-0 left-3 pl-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            ) : (
                                <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-2 text-sm text-red-600 font-zar"
                        >
                            {errors.password}
                        </motion.p>
                    )}
                </motion.div>

                {/* Confirm Password */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <label
                        htmlFor="password_confirmation"
                        className="block text-sm font-bold text-gray-700 font-zar mb-2"
                    >
                        د پټنوم تصدیق
                    </label>
                    <div className="relative">
                        <input
                            id="password_confirmation"
                            type={
                                showPasswordConfirmation ? "text" : "password"
                            }
                            name="password_confirmation"
                            placeholder=" د پټنوم تصدیق"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className={`w-full px-4 py-3  pl-12 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 font-zar text-right ${
                                errors.password_confirmation
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                    : "border-gray-300 focus:border-primary-500 focus:ring-primary-200"
                            }`}
                            autoComplete="new-password"
                        />

                        <button
                            type="button"
                            className="absolute inset-y-0 left-3 pl-3 flex items-center"
                            onClick={() =>
                                setShowPasswordConfirmation(
                                    !showPasswordConfirmation
                                )
                            }
                        >
                            {showPasswordConfirmation ? (
                                <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            ) : (
                                <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            )}
                        </button>
                    </div>
                    {errors.password_confirmation && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-2 text-sm text-red-600 font-zar"
                        >
                            {errors.password_confirmation}
                        </motion.p>
                    )}
                </motion.div>

                {/* Submit Button and Success Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-4"
                >
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center justify-center px-6 py-3 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-4 focus:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-zar"
                    >
                        {processing ? (
                            <>
                                <FaSpinner className="animate-spin ml-2 h-4 w-4" />
                                د ساتلو په حال کې...
                            </>
                        ) : (
                            "ساتل"
                        )}
                    </button>

                    {recentlySuccessful && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-center text-sm text-green-600 font-zar"
                        >
                            <FaCheckCircle className="h-4 w-4 ml-1" />
                            ساتل شو
                        </motion.div>
                    )}
                </motion.div>
            </form>
        </section>
    );
}

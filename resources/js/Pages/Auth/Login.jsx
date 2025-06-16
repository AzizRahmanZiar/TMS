import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
    FaEnvelope,
    FaLock,
    FaArrowRight,
    FaArrowLeft,
    FaUserPlus,
    FaSignInAlt,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import Toast from "@/Components/Toast";
import { motion } from "framer-motion";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showToast, setShowToast] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Handle status changes
    useEffect(() => {
        if (status) {
            setShowToast(true);
        }
    }, [status]);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => {
                reset("password");
            },
        });
    };

    return (
        <>
            <GuestLayout>
                <Head title="داخلـــــــېدل" />

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
                            className="text-center mb-4"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl mx-auto mb-2 flex items-center justify-center shadow-md">
                                <FaSignInAlt className="text-white text-lg" />
                            </div>
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 font-zar">
                                داخلـــــــېدل
                            </h2>
                            <div className="h-0.5 w-12 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-2 rounded-full"></div>
                        </motion.div>

                        {/* Email Verification Success Message */}
                        {status && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                                <div className="flex items-center">
                                    <svg
                                        className="h-5 w-5 text-green-500 ml-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <p className="text-sm text-green-800 font-zar">
                                        {status}
                                    </p>
                                </div>
                            </div>
                        )}

                        <motion.form
                            onSubmit={submit}
                            className="space-y-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            {/* General Error Display */}
                            {Object.keys(errors).length > 0 && (
                                <motion.div
                                    className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                                <svg
                                                    className="h-4 w-4 text-red-500"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="mr-3">
                                            <h3 className="text-sm font-semibold text-red-800 font-zar">
                                                د ننوتلو کې ستونزه
                                            </h3>
                                            <div className="mt-2 text-sm text-red-700">
                                                <ul className="list-disc list-inside space-y-1">
                                                    {Object.entries(errors).map(
                                                        ([key, message]) => (
                                                            <li
                                                                key={key}
                                                                className="font-zar"
                                                            >
                                                                {message}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <label
                                    htmlFor="email"
                                    className="flex items-center text-sm font-semibold text-gray-700 mb-1 font-zar"
                                >
                                    <FaEnvelope className="ml-1 text-primary-500 text-xs" />
                                    بریښنالیک
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="text-gray-400 group-focus-within:text-primary-500 transition-colors duration-200 text-xs" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className={`pl-8 w-full text-sm p-2 rounded-lg border transition-all duration-300 shadow-sm hover:shadow-md bg-white/80 backdrop-blur-sm focus:ring-2 focus:outline-none ${
                                            errors.email
                                                ? "border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50/50"
                                                : "border-gray-200 focus:border-primary-500 focus:ring-primary-100 hover:border-gray-300"
                                        }`}
                                        autoComplete="username"
                                        autoFocus
                                        placeholder="example@email.com"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                </div>
                                {errors.email && (
                                    <motion.p
                                        className="mt-3 text-sm text-red-600 flex items-center font-zar"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">
                                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        </span>
                                        {errors.email}
                                    </motion.p>
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <label
                                    htmlFor="password"
                                    className="flex items-center text-sm font-semibold text-gray-700 mb-1 font-zar"
                                >
                                    <FaLock className="ml-1 text-primary-500 text-xs" />
                                    پټنوم
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="text-gray-400 group-focus-within:text-primary-500 transition-colors duration-200 text-xs" />
                                    </div>
                                    <input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        value={data.password}
                                        className={`pl-8 pr-8 w-full text-sm p-2 rounded-lg border transition-all duration-300 shadow-sm hover:shadow-md bg-white/80 backdrop-blur-sm focus:ring-2 focus:outline-none ${
                                            errors.password
                                                ? "border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50/50"
                                                : "border-gray-200 focus:border-primary-500 focus:ring-primary-100 hover:border-gray-300"
                                        }`}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-primary-500 transition-colors duration-200 text-xs"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <motion.p
                                        className="mt-3 text-sm text-red-600 flex items-center font-zar"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">
                                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        </span>
                                        {errors.password}
                                    </motion.p>
                                )}
                            </motion.div>

                            <motion.div
                                className="flex items-center justify-between"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <label className="flex items-center group cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked
                                                )
                                            }
                                            className="w-5 h-5 rounded-lg border-2 border-gray-300 text-primary-600 shadow-sm focus:ring-primary-500 focus:ring-2 transition-all duration-200"
                                        />
                                    </div>
                                    <span className="mr-3 text-base text-gray-600 font-zar group-hover:text-gray-800 transition-colors duration-200">
                                        ما په یاد ولره
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-base text-gray-600 hover:text-primary-600 transition-colors duration-200 font-zar hover:underline"
                                    >
                                        پټنوم مو هیر شوی؟
                                    </Link>
                                )}
                            </motion.div>

                            <motion.div
                                className="flex flex-col space-y-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            >
                                <motion.button
                                    type="submit"
                                    className={`w-full justify-center py-2 font-zar text-sm rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center transform hover:scale-[1.02] ${
                                        processing
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-secondary-500 to-primary-600 hover:from-secondary-600 hover:to-primary-700 text-white"
                                    }`}
                                    disabled={processing}
                                    whileHover={!processing ? { y: -2 } : {}}
                                    whileTap={
                                        !processing ? { scale: 0.98 } : {}
                                    }
                                >
                                    <span className="mx-auto text-sm flex items-center font-semibold">
                                        {processing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                د داخلیدو په حال کې...
                                            </>
                                        ) : (
                                            <>
                                                داخل شئ
                                                <FaSignInAlt className="mr-2 text-xs" />
                                            </>
                                        )}
                                    </span>
                                </motion.button>

                                <motion.div
                                    className="text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-200"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs">
                                            <span className="px-2 bg-white text-gray-500 font-zar">
                                                یا
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex items-center justify-center text-xs font-zar">
                                        <span className="text-gray-600">
                                            که حساب نه لرئ،
                                        </span>
                                        <Link
                                            href={route("register")}
                                            className="text-primary-600 hover:text-primary-700 font-semibold mr-1 hover:underline transition-all duration-200"
                                        >
                                            نو ځان ثبت کړئ
                                        </Link>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.form>
                    </motion.div>
                </motion.div>
            </GuestLayout>

            {showToast && (
                <Toast
                    message={status}
                    type="success"
                    onClose={() => setShowToast(false)}
                    duration={3000}
                />
            )}
        </>
    );
}

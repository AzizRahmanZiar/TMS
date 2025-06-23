import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FaEnvelope, FaPaperPlane, FaKey } from "react-icons/fa";
import { router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ensureFreshCSRFToken } from "@/Utils/csrfUtils";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = async (e) => {
        e.preventDefault();

        // Ensure we have a fresh CSRF token before submitting
        await ensureFreshCSRFToken();

        router.post(route("password.email"), data, {
            preserveState: false,
            onError: (errors) => {
                // If it's a CSRF error, refresh the page to get a new token
                if (errors.message && errors.message.includes("419")) {
                    window.location.reload();
                }
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="پټنوم بیا تنظیمول" />

            <motion.div
                className="w-full max-w-sm mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
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
                    </motion.div>

                    <motion.div
                        className="mb-4 p-3 bg-blue-50/80 backdrop-blur-sm rounded-lg text-gray-700 text-xs leading-relaxed border border-blue-100 shadow-sm font-zar"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className="flex items-start">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                                <FaKey className="text-blue-600 text-xs" />
                            </div>
                            <div>
                                <p className="font-semibold text-blue-800 mb-1 text-xs">
                                    پټنوم مو هیر شوی؟
                                </p>
                                <p className="text-blue-700 text-xs">
                                    موږ به تاسو ته د بریښنالیک لینک واستوو چې
                                    تاسو کولی شئ پټنوم بیا تنظیم کړئ.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {status && (
                        <motion.div
                            className="mb-6 p-4 bg-green-50 rounded-xl text-green-700 font-medium border border-green-200 shadow-sm font-zar"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center">
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                </div>
                                {status}
                            </div>
                        </motion.div>
                    )}

                    <motion.form
                        onSubmit={submit}
                        className="space-y-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
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
                                    className="mt-1 text-xs text-red-600 flex items-center font-zar"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <span className="w-3 h-3 bg-red-100 rounded-full flex items-center justify-center mr-1">
                                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                    </span>
                                    {errors.email}
                                </motion.p>
                            )}
                        </motion.div>

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
                                        د لیږلو په حال کې...
                                    </>
                                ) : (
                                    <>
                                        د پټنوم بیا تنظیمولو لینک واستوئ
                                        <FaPaperPlane className="mr-2 text-xs" />
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

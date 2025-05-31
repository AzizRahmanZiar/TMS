import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FaEnvelope, FaPaperPlane, FaKey } from "react-icons/fa";
import { router } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
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
                    </motion.div>

                    <motion.div
                        className="mb-8 p-6 bg-blue-50/80 backdrop-blur-sm rounded-xl text-gray-700 text-base leading-relaxed border border-blue-100 shadow-sm font-zar"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className="flex items-start">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                                <FaKey className="text-blue-600 text-sm" />
                            </div>
                            <div>
                                <p className="font-semibold text-blue-800 mb-1">
                                    پټنوم مو هیر شوی؟
                                </p>
                                <p className="text-blue-700">
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
                        className="space-y-6"
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
                                className="flex items-center text-lg font-semibold text-gray-700 mb-3 font-zar"
                            >
                                <FaEnvelope className="ml-2 text-primary-500" />
                                بریښنالیک
                            </label>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-400 group-focus-within:text-primary-500 transition-colors duration-200" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className={`pl-12 w-full text-lg p-4 rounded-xl border-2 transition-all duration-300 shadow-sm hover:shadow-md bg-white/80 backdrop-blur-sm focus:ring-4 focus:outline-none ${
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
                                        د لیږلو په حال کې...
                                    </>
                                ) : (
                                    <>
                                        د پټنوم بیا تنظیمولو لینک واستوئ
                                        <FaPaperPlane className="mr-3 text-base" />
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

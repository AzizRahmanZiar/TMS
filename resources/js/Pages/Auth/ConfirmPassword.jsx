import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FaLock, FaEye, FaEyeSlash, FaSpinner, FaShieldAlt } from 'react-icons/fa';

export default function ConfirmPassword() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="د پټنوم تصدیق" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
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
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="mx-auto h-16 w-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-4"
                            >
                                <FaShieldAlt className="h-8 w-8 text-white" />
                            </motion.div>
                            <h2 className="text-3xl font-bold text-gray-900 font-zar">
                                د پټنوم تصدیق
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 font-zar text-center leading-relaxed">
                                د دې عمل د بشپړولو لپاره، مهرباني وکړئ خپل پټنوم تصدیق کړئ
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <label htmlFor="password" className="block text-sm font-bold text-gray-700 font-zar mb-2">
                                    پټنوم
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={`w-full px-4 py-3 pr-12 pl-12 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 font-zar text-right ${
                                            errors.password
                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                                : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'
                                        }`}
                                        placeholder="خپل پټنوم دننه کړئ"
                                        required
                                        autoFocus
                                        autoComplete="current-password"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center"
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

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-4 focus:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-zar"
                                >
                                    {processing ? (
                                        <>
                                            <FaSpinner className="animate-spin ml-2 h-4 w-4" />
                                            د تصدیق په حال کې...
                                        </>
                                    ) : (
                                        'پټنوم تصدیق کړه'
                                    )}
                                </button>
                            </motion.div>
                        </form>

                        {/* Security Note */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
                        >
                            <p className="text-xs text-yellow-800 font-zar text-center leading-relaxed">
                                د امنیت لپاره، دا یو حساس عمل دی چې ستاسو د پټنوم تصدیق ته اړتیا لري
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}

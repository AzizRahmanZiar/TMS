import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    FaTrash,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaSpinner,
    FaExclamationTriangle,
} from "react-icons/fa";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-bold text-gray-900 font-zar">
                    د حساب حذف کول
                </h2>
                <p className="mt-1 text-sm text-gray-600 font-zar">
                    یوځل چې ستاسو حساب حذف شي، د دې ټول سرچینې او ډیټا د تل
                    لپاره حذف کیږي. د خپل حساب د حذف کولو دمخه، مهرباني وکړئ هر
                    ډول ډیټا یا معلومات ډاونلوډ کړئ چې تاسو غواړئ وساتئ.
                </p>
            </header>

            <motion.button
                onClick={confirmUserDeletion}
                className="flex items-center justify-center px-6 py-3 bg-red-600 border border-transparent gap-2 rounded-xl font-bold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 font-zar"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <FaTrash className="ml-2 h-4 w-4" />
                حساب حذف کړه
            </motion.button>

            {/* Confirmation Modal */}
            {confirmingUserDeletion && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] overflow-y-auto"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            aria-hidden="true"
                        ></div>

                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 relative z-[10000]"
                            dir="rtl"
                        >
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <FaExclamationTriangle
                                        className="h-6 w-6 text-red-600"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:mr-4 sm:text-right">
                                    <h3
                                        className="text-lg leading-6 font-bold text-gray-900 font-zar"
                                        id="modal-title"
                                    >
                                        د حساب حذف کول
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 font-zar">
                                            آیا تاسو ډاډه یاست چې غواړئ خپل حساب
                                            حذف کړئ؟ یوځل چې ستاسو حساب حذف شي،
                                            د دې ټول سرچینې او ډیټا د تل لپاره
                                            حذف کیږي. د تصدیق لپاره خپل پټنوم
                                            دننه کړئ.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={deleteUser} className="mt-6">
                                <div className="mb-6">
                                    <label
                                        htmlFor="password"
                                        className="sr-only"
                                    >
                                        پټنوم
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full px-4 py-3  border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 font-zar text-right ${
                                                errors.password
                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                    : "border-gray-300 focus:border-red-500 focus:ring-red-200"
                                            }`}
                                            placeholder="پټنوم"
                                            autoFocus
                                        />

                                        <button
                                            type="button"
                                            className="absolute inset-y-0 left-3 pl-3 flex items-center"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            ) : (
                                                <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600 font-zar">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        className="flex-1 bg-white py-2 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 font-zar"
                                        onClick={closeModal}
                                    >
                                        لغوه کول
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed font-zar"
                                    >
                                        {processing ? (
                                            <>
                                                <FaSpinner className="animate-spin ml-2 h-4 w-4" />
                                                د حذف کولو په حال کې...
                                            </>
                                        ) : (
                                            "حساب حذف کړه"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </section>
    );
}

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaTimes, FaExclamationTriangle } from "react-icons/fa";

const DeleteModal = ({ isOpen, onClose, onConfirm, title, message, isLoading = false }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Backdrop */}
                <motion.div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                    dir="rtl"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                    <FaExclamationTriangle className="text-white text-xl" />
                                </div>
                                <h2 className="text-xl font-bold font-zar">
                                    {title || "د ریکارډ حذف کول"}
                                </h2>
                            </div>
                            <motion.button
                                onClick={onClose}
                                className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaTimes className="text-white text-sm" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaTrash className="text-red-600 text-2xl" />
                            </div>
                            <p className="text-gray-700 font-zar text-lg leading-relaxed">
                                {message || "آیا تاسو ډاډه یاست چې غواړئ دا ریکارډ حذف کړئ؟ دا عمل نشي بیرته کیدی."}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-center">
                            <motion.button
                                onClick={onClose}
                                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-zar font-semibold transition-all duration-300 flex items-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isLoading}
                            >
                                <FaTimes className="text-sm" />
                                لغوه کول
                            </motion.button>
                            
                            <motion.button
                                onClick={onConfirm}
                                disabled={isLoading}
                                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-zar font-semibold transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={!isLoading ? { scale: 1.02 } : {}}
                                whileTap={!isLoading ? { scale: 0.98 } : {}}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        په حذفولو کې...
                                    </>
                                ) : (
                                    <>
                                        <FaTrash className="text-sm" />
                                        حذف کول
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DeleteModal;

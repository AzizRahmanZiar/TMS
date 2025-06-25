import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaChevronDown } from "react-icons/fa";
import DownloadModal from "./DownloadModal";

const DownloadButton = ({ onDownload, className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedType, setSelectedType] = useState(null);

    const options = [
        { value: "total", label: "ټول", icon: "📊" },
        { value: "active", label: "فعال", icon: "✅" },
        { value: "disabled", label: "بشپړ شوي", icon: "✔️" }
    ];

    const handleOptionClick = (value) => {
        setSelectedType(value);
        setIsOpen(false);
        setShowModal(true);
    };

    const handleModalDownload = (type, format) => {
        onDownload(type, format);
        setShowModal(false);
    };

    return (
        <motion.div
            className={`relative ${className}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
        >
            {/* Main Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="px-6 py-3 rounded-xl font-semibold font-zar transition-all duration-300 bg-gradient-to-r from-primary-600 via-secondary-600 to-tertiary-600 hover:from-primary-700 hover:via-secondary-700 hover:to-tertiary-700 text-white shadow-lg hover:shadow-xl border border-white/20 backdrop-blur-sm flex items-center gap-3 min-w-[160px] justify-between group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                title="ډاونلوډ راپور"
            >
                <div className="flex items-center gap-2">
                    <FaDownload className="text-sm group-hover:animate-bounce" />
                    <span>ډاونلوډ راپور</span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <FaChevronDown className="text-xs" />
                </motion.div>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-20 backdrop-blur-sm"
                        >
                            {options.map((option, index) => (
                                <motion.button
                                    key={option.value}
                                    onClick={() => handleOptionClick(option.value)}
                                    className="w-full px-4 py-3 text-right font-zar font-medium text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-700 transition-all duration-200 flex items-center justify-between group border-b border-gray-100 last:border-b-0"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ x: 5 }}
                                >
                                    <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                                        {option.icon}
                                    </span>
                                    <span className="flex-1 text-center">{option.label}</span>
                                    <div className="w-6"></div>
                                </motion.button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Download Modal */}
            <DownloadModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onDownload={handleModalDownload}
                reportType={selectedType}
            />
        </motion.div>
    );
};

export default DownloadButton;

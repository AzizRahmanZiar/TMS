import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilePdf, FaFileExcel, FaTimes, FaDownload } from "react-icons/fa";

const DownloadModal = ({ isOpen, onClose, onDownload, reportType }) => {
    const getReportTypeLabel = () => {
        switch (reportType) {
            case 'total':
                return 'ټول ریکارډونه';
            case 'active':
                return 'فعال ریکارډونه';
            case 'disabled':
                return 'بشپړ شوي ریکارډونه';
            default:
                return 'راپور';
        }
    };

    const handleFormatSelect = (format) => {
        onDownload(reportType, format);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 max-w-md w-full mx-4 overflow-hidden"
                    >
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-tertiary-50 opacity-50" />
                        
                        {/* Content */}
                        <div className="relative">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg">
                                        <FaDownload className="text-white text-lg" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 font-zar">
                                            د فایل ډول غوره کړئ
                                        </h3>
                                        <p className="text-sm text-gray-600 font-zar">
                                            {getReportTypeLabel()}
                                        </p>
                                    </div>
                                </div>
                                <motion.button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaTimes className="text-gray-500" />
                                </motion.button>
                            </div>

                            {/* Format Options */}
                            <div className="space-y-4">
                                {/* PDF Option */}
                                <motion.button
                                    onClick={() => handleFormatSelect('pdf')}
                                    className="w-full p-4 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 border-2 border-red-200 hover:border-red-300 rounded-xl transition-all duration-300 group"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-red-500 rounded-lg group-hover:bg-red-600 transition-colors duration-300">
                                            <FaFilePdf className="text-white text-2xl" />
                                        </div>
                                        <div className="text-right flex-1">
                                            <h4 className="text-lg font-bold text-red-700 font-zar">
                                                PDF فایل
                                            </h4>
                                            <p className="text-sm text-red-600 font-zar">
                                                د چاپولو او لیدلو لپاره غوره
                                            </p>
                                        </div>
                                        <div className="text-red-500 group-hover:translate-x-1 transition-transform duration-300">
                                            <FaDownload />
                                        </div>
                                    </div>
                                </motion.button>

                                {/* Excel Option */}
                                <motion.button
                                    onClick={() => handleFormatSelect('excel')}
                                    className="w-full p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-2 border-green-200 hover:border-green-300 rounded-xl transition-all duration-300 group"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-green-500 rounded-lg group-hover:bg-green-600 transition-colors duration-300">
                                            <FaFileExcel className="text-white text-2xl" />
                                        </div>
                                        <div className="text-right flex-1">
                                            <h4 className="text-lg font-bold text-green-700 font-zar">
                                                Excel فایل
                                            </h4>
                                            <p className="text-sm text-green-600 font-zar">
                                                د ډیټا تحلیل او سمولو لپاره غوره
                                            </p>
                                        </div>
                                        <div className="text-green-500 group-hover:translate-x-1 transition-transform duration-300">
                                            <FaDownload />
                                        </div>
                                    </div>
                                </motion.button>


                            </div>

                            {/* Footer */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <p className="text-xs text-gray-500 text-center font-zar">
                                    د فایل ډاونلوډ به په څو ثانیو کې پیل شي
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default DownloadModal;

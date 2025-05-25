import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const Toast = ({ message, type = "info", onClose, duration = 3000 }) => {
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const getTypeStyles = () => {
        switch (type) {
            case "success":
                return "bg-green-500 text-white";
            case "error":
                return "bg-red-500 text-white";
            case "warning":
                return "bg-yellow-500 text-white";
            default:
                return "bg-blue-500 text-white";
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg ${getTypeStyles()} z-50`}
            >
                <div className="flex items-center">
                    <span className="mr-2">
                        {type === "success" && "✓"}
                        {type === "error" && "✕"}
                        {type === "warning" && "⚠"}
                    </span>
                    <p className="font-medium">{message}</p>
                    <button
                        onClick={onClose}
                        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
                    >
                        ✕
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Toast; 
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaBell,
    FaEnvelope,
    FaShoppingCart,
    FaUserPlus,
    FaTimes,
    FaCheck,
} from "react-icons/fa";
import { useNotifications } from "../Hooks/useNotifications";
import Portal from "./Portal";

const NotificationDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const {
        notifications,
        unreadCount,
        loading,
        error,
        markAsRead,
        markAllAsRead,
        fetchNotifications,
    } = useNotifications();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Auto-refresh notifications when dropdown opens
    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen]);

    const getNotificationIcon = (type) => {
        switch (type) {
            case "order":
                return <FaShoppingCart className="text-blue-500" />;
            case "message":
                return <FaEnvelope className="text-green-500" />;
            case "registration":
                return <FaUserPlus className="text-purple-500" />;
            default:
                return <FaBell className="text-gray-500" />;
        }
    };

    const handleNotificationClick = (notification) => {
        if (!notification.read_at) {
            markAsRead(notification.id);
        }
        // You can add navigation logic here based on notification type
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Notification Bell Button */}
            <motion.button
                className="relative text-white p-4 rounded-xl hover:bg-white/10 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/20"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <FaBell className="text-lg" />
                {unreadCount > 0 && (
                    <motion.span
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                    >
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </motion.span>
                )}
            </motion.button>

            {/* Notification Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <Portal>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/20 z-[999998]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />
                        {/* Modal */}
                        <motion.div
                            className="fixed left-[17rem] top-16 w-96 -translate-x-1/2 bg-white rounded-2xl shadow-2xl ring-1 ring-black/10 z-[999999] border border-gray-200 max-h-96 overflow-hidden"
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-gray-200/50 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-900 font-zar">
                                    خبرتیاوې
                                </h3>
                                <div className="flex items-center gap-2">
                                    {unreadCount > 0 && (
                                        <motion.button
                                            onClick={markAllAsRead}
                                            className="text-xs text-blue-600 hover:text-blue-800 font-zar flex items-center gap-1"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <FaCheck className="text-xs" />
                                            ټول لوستل شوي
                                        </motion.button>
                                    )}
                                    <motion.button
                                        onClick={fetchNotifications}
                                        className="text-xs text-gray-600 hover:text-gray-800 font-zar flex items-center gap-1"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        disabled={loading}
                                    >
                                        <motion.div
                                            animate={
                                                loading ? { rotate: 360 } : {}
                                            }
                                            transition={
                                                loading
                                                    ? {
                                                          duration: 1,
                                                          repeat: Infinity,
                                                          ease: "linear",
                                                      }
                                                    : {}
                                            }
                                        >
                                            🔄
                                        </motion.div>
                                        تازه کول
                                    </motion.button>
                                    <motion.button
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <FaTimes className="text-sm" />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Notifications List */}
                            <div className="max-h-80 overflow-y-auto">
                                {error ? (
                                    <div className="p-4 text-center">
                                        <div className="text-red-500 text-2xl mb-2">
                                            ⚠️
                                        </div>
                                        <p className="text-red-600 font-zar text-sm">
                                            د خبرتیاوو په بارولو کې ستونزه
                                        </p>
                                        <button
                                            onClick={fetchNotifications}
                                            className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-zar"
                                        >
                                            بیا هڅه وکړئ
                                        </button>
                                    </div>
                                ) : loading ? (
                                    <div className="p-4 text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
                                        <p className="text-gray-500 mt-2 font-zar">
                                            د خبرتیاوو بارول...
                                        </p>
                                    </div>
                                ) : notifications.length === 0 ? (
                                    <div className="p-8 text-center">
                                        <FaBell className="text-4xl text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500 font-zar">
                                            هیڅ خبرتیا نشته
                                        </p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-100">
                                        {notifications.map(
                                            (notification, index) => (
                                                <motion.div
                                                    key={notification.id}
                                                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                                                        !notification.read_at
                                                            ? "bg-blue-50/50"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handleNotificationClick(
                                                            notification
                                                        )
                                                    }
                                                    initial={{
                                                        opacity: 0,
                                                        y: 10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        delay: index * 0.05,
                                                    }}
                                                    whileHover={{ x: 2 }}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                            {getNotificationIcon(
                                                                notification
                                                                    .data.type
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-semibold text-gray-900 font-zar">
                                                                {
                                                                    notification
                                                                        .data
                                                                        .title
                                                                }
                                                            </p>
                                                            <p className="text-sm text-gray-600 mt-1 font-zar line-clamp-2">
                                                                {
                                                                    notification
                                                                        .data
                                                                        .message
                                                                }
                                                            </p>
                                                            <p className="text-xs text-gray-400 mt-2">
                                                                {
                                                                    notification.time_ago
                                                                }
                                                            </p>
                                                        </div>
                                                        {!notification.read_at && (
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {notifications.length > 0 && (
                                <div className="p-3 border-t border-gray-200/50 text-center">
                                    <button className="text-sm text-blue-600 hover:text-blue-800 font-zar">
                                        ټولې خبرتیاوې وګورئ
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </Portal>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationDropdown;

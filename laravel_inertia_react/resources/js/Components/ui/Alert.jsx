import React, { useState, useEffect } from "react";
import {
    FaCheckCircle,
    FaExclamationCircle,
    FaInfoCircle,
    FaExclamationTriangle,
    FaTimes,
} from "react-icons/fa";

const variants = {
    success: {
        icon: FaCheckCircle,
        classes: "bg-green-50 text-green-800 border-green-200",
        iconClass: "text-green-400",
    },
    error: {
        icon: FaExclamationCircle,
        classes: "bg-red-50 text-red-800 border-red-200",
        iconClass: "text-red-400",
    },
    warning: {
        icon: FaExclamationTriangle,
        classes: "bg-yellow-50 text-yellow-800 border-yellow-200",
        iconClass: "text-yellow-400",
    },
    info: {
        icon: FaInfoCircle,
        classes: "bg-blue-50 text-blue-800 border-blue-200",
        iconClass: "text-blue-400",
    },
};

const Alert = ({
    variant = "info",
    title,
    message,
    onClose,
    autoClose = false,
    autoCloseDelay = 5000,
    className = "",
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const { icon: Icon, classes, iconClass } = variants[variant];

    useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(() => {
                handleClose();
            }, autoCloseDelay);

            return () => clearTimeout(timer);
        }
    }, [autoClose, autoCloseDelay]);

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) {
            onClose();
        }
    };

    if (!isVisible) return null;

    return (
        <div
            className={`
                flex items-start p-4 mb-4 rounded-lg border
                ${classes}
                ${className}
            `}
            role="alert"
        >
            <Icon className={`w-5 h-5 ${iconClass} mt-0.5`} />

            <div className="ml-3 flex-1">
                {title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
                <div className="text-sm">{message}</div>
            </div>

            {onClose && (
                <button
                    type="button"
                    onClick={handleClose}
                    className={`
                        ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5
                        inline-flex h-8 w-8
                        focus:outline-none focus:ring-2 focus:ring-offset-2
                        ${
                            variant === "success"
                                ? "focus:ring-green-500 hover:bg-green-100"
                                : variant === "error"
                                ? "focus:ring-red-500 hover:bg-red-100"
                                : variant === "warning"
                                ? "focus:ring-yellow-500 hover:bg-yellow-100"
                                : "focus:ring-blue-500 hover:bg-blue-100"
                        }
                    `}
                >
                    <span className="sr-only">Close</span>
                    <FaTimes className="w-5 h-5" />
                </button>
            )}
        </div>
    );
};

export default Alert;

import React from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const SystemButtons = ({
    type,
    onClick,
    isActive = false,
    className = "",
    disabled = false,
    icon = false,
    title = "",
}) => {
    const getButtonContent = () => {
        switch (type) {
            case "add":
                return "نوی ریکارډ";
            case "all":
                return "ټول";
            case "active":
                return "فعال";
            case "completed":
                return "بشپړ شوي";
            case "edit":
                return icon ? <FaEdit className="h-5 w-5" /> : "سمول";
            case "delete":
                return icon ? <FaTrash className="h-5 w-5" /> : "حذف کول";
            case "submit":
                return icon ? <FaCheck className="h-5 w-5" /> : "ثبت کول";
            case "cancel":
                return icon ? <FaTimes className="h-5 w-5" /> : "لغو کول";
            default:
                return "";
        }
    };

    const getButtonStyles = () => {
        const baseStyles =
            "px-4 py-2 rounded-lg transition-colors font-amiri text-xl duration-300";

        switch (type) {
            case "add":
                return `${baseStyles} font-bold px-6 py-3 rounded-md font-zar text-xl bg-tertiary-700 hover:bg-tertiary-800 text-white flex items-center transition-colors duration-300 shadow-md`;
            case "all":
                return `${baseStyles} ${
                    isActive
                        ? "font-bold px-6 py-3 rounded-md font-zar text-xl bg-secondary-800 text-white"
                        : "font-bold px-6 py-3 rounded-md font-zar text-xl bg-gray-200 text-gray-00"
                }`;
            case "active":
                return `${baseStyles} ${
                    isActive
                        ? "font-bold px-6 py-3 rounded-md font-zar text-xl bg-secondary-800 text-white"
                        : "font-bold px-6 py-3 rounded-md font-zar text-xl bg-gray-200 text-gray-00"
                }`;
            case "completed":
                return `${baseStyles} ${
                    isActive
                        ? "font-bold px-6 py-3 rounded-md font-zar text-xl bg-secondary-900 text-white"
                        : "font-bold px-6 py-3 rounded-md font-zar text-xl bg-gray-200 text-gray-700"
                }`;
            case "edit":
                return `${baseStyles} ${
                    icon
                        ? "text-purple-600 hover:text-purple-900 p-1 rounded-full hover:bg-purple-100"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                }`;
            case "delete":
                return `${baseStyles} ${
                    icon
                        ? " text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100"
                        : "bg-red-600 hover:bg-red-700 text-white"
                }`;
            case "submit":
                return `${baseStyles} font-bold px-6 py-3 rounded-md font-zar text-xl bg-tertiary-700 hover:bg-tertiary-800 text-white`;
            case "cancel":
                return `${baseStyles} font-bold px-6 py-3 rounded-md font-zar text-xl bg-secondary-600 hover:bg-secondary-700 text-white`;
            default:
                return baseStyles;
        }
    };

    return (
        <button
            onClick={onClick}
            className={`${getButtonStyles()} ${className} ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={disabled}
            title={title}
        >
            {getButtonContent()}
        </button>
    );
};

export default SystemButtons;

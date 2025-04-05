import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "@inertiajs/react";

const positions = {
    "bottom-left": "bottom-0 left-0 transform translate-y-full",
    "bottom-right": "bottom-0 right-0 transform translate-y-full",
    "top-left": "top-0 left-0 transform -translate-y-full",
    "top-right": "top-0 right-0 transform -translate-y-full",
};

const Dropdown = ({
    trigger,
    items,
    position = "bottom-left",
    width = "w-48",
    className = "",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            return () => document.removeEventListener("keydown", handleKeyDown);
        }
    }, [isOpen]);

    const positionClasses = positions[position];

    return (
        <div className={`relative inline-block ${className}`} ref={dropdownRef}>
            {/* Trigger */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
            >
                {trigger}
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div
                    className={`
                        absolute z-50 mt-2
                        ${width}
                        ${positionClasses}
                        bg-white rounded-lg shadow-lg
                        border border-gray-200
                        py-1
                    `}
                >
                    {items.map((item, index) => (
                        <DropdownItem key={index} {...item} />
                    ))}
                </div>
            )}
        </div>
    );
};

const DropdownItem = ({
    label,
    icon: Icon,
    href,
    onClick,
    disabled = false,
    danger = false,
    divider = false,
}) => {
    if (divider) {
        return <hr className="my-1 border-gray-200" />;
    }

    const baseClasses = `
        w-full px-4 py-2 text-sm
        flex items-center
        ${
            disabled
                ? "text-gray-400 cursor-not-allowed"
                : danger
                ? "text-red-600 hover:bg-red-50 focus:bg-red-50"
                : "text-gray-700 hover:bg-gray-50 focus:bg-gray-50"
        }
        focus:outline-none
    `;

    if (href && !disabled) {
        return (
            <Link href={href} className={baseClasses}>
                {Icon && <Icon className="w-4 h-4 mr-2" />}
                {label}
            </Link>
        );
    }

    return (
        <button onClick={onClick} disabled={disabled} className={baseClasses}>
            {Icon && <Icon className="w-4 h-4 mr-2" />}
            {label}
        </button>
    );
};

// Default trigger button
export const DropdownButton = ({
    children,
    variant = "primary",
    size = "md",
    className = "",
}) => {
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-600 text-white hover:bg-gray-700",
        white: "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300",
    };

    const sizes = {
        sm: "px-2.5 py-1.5 text-sm",
        md: "px-4 py-2",
        lg: "px-5 py-2.5 text-lg",
    };

    return (
        <button
            className={`
                inline-flex items-center justify-center
                rounded-lg font-medium
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `}
        >
            {children}
            <FaChevronDown
                className={`ml-2 ${
                    size === "sm"
                        ? "w-3 h-3"
                        : size === "lg"
                        ? "w-5 h-5"
                        : "w-4 h-4"
                }`}
            />
        </button>
    );
};

export default Dropdown;

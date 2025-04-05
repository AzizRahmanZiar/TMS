import React from "react";
import { Link } from "@inertiajs/react";
import { theme } from "@/theme";

const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    success: "bg-success-600 hover:bg-success-700 text-white",
    danger: "bg-danger-600 hover:bg-danger-700 text-white",
    warning: "bg-warning-500 hover:bg-warning-600 text-white",
    info: "bg-info-500 hover:bg-info-600 text-white",
    ghost: "hover:bg-gray-100 text-gray-700",
    link: "text-primary-600 hover:text-primary-700 underline",
};

const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
};

const Button = ({
    children,
    variant = "primary",
    size = "md",
    type = "button",
    href,
    icon,
    iconPosition = "left",
    disabled = false,
    loading = false,
    className = "",
    onClick,
    ...props
}) => {
    const baseClasses = `
        inline-flex items-center justify-center
        font-medium rounded-lg
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
    `;

    const variantClasses = variants[variant];
    const sizeClasses = sizes[size];
    const iconClasses = icon ? (iconPosition === "left" ? "mr-2" : "ml-2") : "";

    const content = (
        <>
            {loading && (
                <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            )}
            {!loading && icon && iconPosition === "left" && (
                <span className={iconClasses}>{icon}</span>
            )}
            {children}
            {!loading && icon && iconPosition === "right" && (
                <span className={iconClasses}>{icon}</span>
            )}
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
                {...props}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {content}
        </button>
    );
};

export default Button;

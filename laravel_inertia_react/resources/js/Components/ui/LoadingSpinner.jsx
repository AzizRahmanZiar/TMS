import React from "react";

const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
};

const variants = {
    primary: "text-blue-600",
    secondary: "text-gray-600",
    success: "text-green-600",
    danger: "text-red-600",
    warning: "text-yellow-600",
    info: "text-cyan-600",
    light: "text-gray-200",
    dark: "text-gray-800",
};

const LoadingSpinner = ({
    size = "md",
    variant = "primary",
    className = "",
    fullScreen = false,
}) => {
    const sizeClass = sizes[size];
    const variantClass = variants[variant];

    const spinner = (
        <div
            className={`
                inline-block animate-spin rounded-full
                border-2 border-solid
                border-current border-r-transparent
                align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]
                ${sizeClass}
                ${variantClass}
                ${className}
            `}
            role="status"
        >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                {spinner}
            </div>
        );
    }

    return spinner;
};

// Loading overlay component for use with Suspense
export const LoadingOverlay = ({ message = "Loading..." }) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-90">
            <LoadingSpinner size="xl" />
            <p className="mt-4 text-gray-600">{message}</p>
        </div>
    );
};

// Loading button component
export const LoadingButton = ({
    children,
    loading = false,
    disabled = false,
    spinnerSize = "sm",
    spinnerVariant = "light",
    className = "",
    ...props
}) => {
    return (
        <button
            disabled={loading || disabled}
            className={`
                inline-flex items-center justify-center
                relative
                ${loading ? "cursor-not-allowed" : ""}
                ${className}
            `}
            {...props}
        >
            {loading && (
                <LoadingSpinner
                    size={spinnerSize}
                    variant={spinnerVariant}
                    className="absolute"
                />
            )}
            <span className={loading ? "invisible" : ""}>{children}</span>
        </button>
    );
};

export default LoadingSpinner;

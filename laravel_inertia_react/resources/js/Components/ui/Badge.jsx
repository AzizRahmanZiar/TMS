import React from "react";

const variants = {
    primary: {
        solid: "bg-blue-600 text-white",
        soft: "bg-blue-100 text-blue-800",
        outline: "border border-blue-600 text-blue-600",
    },
    secondary: {
        solid: "bg-gray-600 text-white",
        soft: "bg-gray-100 text-gray-800",
        outline: "border border-gray-600 text-gray-600",
    },
    success: {
        solid: "bg-green-600 text-white",
        soft: "bg-green-100 text-green-800",
        outline: "border border-green-600 text-green-600",
    },
    danger: {
        solid: "bg-red-600 text-white",
        soft: "bg-red-100 text-red-800",
        outline: "border border-red-600 text-red-600",
    },
    warning: {
        solid: "bg-yellow-600 text-white",
        soft: "bg-yellow-100 text-yellow-800",
        outline: "border border-yellow-600 text-yellow-600",
    },
    info: {
        solid: "bg-cyan-600 text-white",
        soft: "bg-cyan-100 text-cyan-800",
        outline: "border border-cyan-600 text-cyan-600",
    },
};

const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-base",
};

const shapes = {
    rounded: "rounded-md",
    pill: "rounded-full",
};

const Badge = ({
    children,
    variant = "primary",
    style = "solid",
    size = "md",
    shape = "rounded",
    icon,
    className = "",
    ...props
}) => {
    const Icon = icon;
    const variantClasses = variants[variant]?.[style] || variants.primary.solid;
    const sizeClasses = sizes[size] || sizes.md;
    const shapeClasses = shapes[shape] || shapes.rounded;

    return (
        <span
            className={`
                inline-flex items-center font-medium
                ${variantClasses}
                ${sizeClasses}
                ${shapeClasses}
                ${className}
            `}
            {...props}
        >
            {icon && (
                <Icon
                    className={`${
                        size === "sm"
                            ? "w-3 h-3"
                            : size === "lg"
                            ? "w-5 h-5"
                            : "w-4 h-4"
                    } ${children ? "mr-1" : ""}`}
                />
            )}
            {children}
        </span>
    );
};

// Status badge component
export const StatusBadge = ({ status, ...props }) => {
    const statusConfig = {
        active: { variant: "success", label: "Active" },
        inactive: { variant: "secondary", label: "Inactive" },
        pending: { variant: "warning", label: "Pending" },
        error: { variant: "danger", label: "Error" },
        processing: { variant: "info", label: "Processing" },
    };

    const config = statusConfig[status] || statusConfig.inactive;

    return (
        <Badge variant={config.variant} style="soft" {...props}>
            {props.children || config.label}
        </Badge>
    );
};

// Counter badge component
export const CounterBadge = ({ count, max = 99, ...props }) => {
    const displayCount = count > max ? `${max}+` : count;

    return (
        <Badge variant="danger" size="sm" shape="pill" {...props}>
            {displayCount}
        </Badge>
    );
};

export default Badge;

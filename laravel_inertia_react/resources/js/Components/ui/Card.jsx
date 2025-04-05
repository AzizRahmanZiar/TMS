import React from "react";

const Card = ({
    children,
    className = "",
    title,
    subtitle,
    footer,
    header,
    variant = "default",
    ...props
}) => {
    const variants = {
        default: "bg-white",
        primary: "bg-blue-50",
        secondary: "bg-gray-50",
        success: "bg-green-50",
        danger: "bg-red-50",
        warning: "bg-yellow-50",
        info: "bg-cyan-50",
    };

    const baseClasses =
        "rounded-lg shadow-sm border border-gray-200 overflow-hidden";
    const variantClasses = variants[variant];
    const classes = `${baseClasses} ${variantClasses} ${className}`;

    return (
        <div className={classes} {...props}>
            {header && (
                <div className="px-6 py-4 border-b border-gray-200">
                    {header}
                </div>
            )}
            {(title || subtitle) && (
                <div className="px-6 py-4 border-b border-gray-200">
                    {title && (
                        <h3 className="text-lg font-semibold text-gray-900">
                            {title}
                        </h3>
                    )}
                    {subtitle && (
                        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
                    )}
                </div>
            )}
            <div className="p-6">{children}</div>
            {footer && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;

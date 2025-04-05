import React from "react";
import { theme } from "@/theme";

const FormGroup = ({
    label,
    name,
    error,
    required,
    children,
    className = "",
    labelClassName = "",
    helpText,
    ...props
}) => {
    return (
        <div className={`space-y-1 ${className}`} {...props}>
            {label && (
                <label
                    htmlFor={name}
                    className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
                >
                    {label}
                    {required && (
                        <span className="text-danger-500 ml-1">*</span>
                    )}
                </label>
            )}
            {children}
            {error && <p className="mt-1 text-sm text-danger-600">{error}</p>}
            {helpText && !error && (
                <p className="mt-1 text-sm text-gray-500">{helpText}</p>
            )}
        </div>
    );
};

export default FormGroup;

import React from "react";

const TextInput = ({
    id,
    name,
    value,
    onChange,
    onBlur,
    type = "text",
    placeholder = "",
    className = "",
    error,
    disabled = false,
    autoComplete,
    autoFocus = false,
    ...props
}) => {
    const baseClass = "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200";
    
    const getInputClass = () => {
        if (error) {
            return `${baseClass} border-red-500 bg-red-50 focus:ring-red-200`;
        } else if (value && value.length > 0) {
            return `${baseClass} border-green-500 bg-green-50 focus:ring-green-200`;
        }
        return `${baseClass} border-gray-300 focus:ring-primary-200`;
    };

    return (
        <div className="w-full">
            <input
                id={id}
                name={name}
                type={type}
                value={value || ""}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                className={`${getInputClass()} ${className}`}
                disabled={disabled}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
};

export default TextInput;

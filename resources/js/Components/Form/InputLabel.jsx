import React from "react";

const InputLabel = ({
    htmlFor,
    value,
    children,
    className = "",
    required = false,
    ...props
}) => {
    const baseClass = "block text-xl font-medium text-gray-700 mb-2";

    return (
        <label
            htmlFor={htmlFor}
            className={`${baseClass} ${className}`}
            {...props}
        >
            {value || children}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    );
};

export default InputLabel;

import React from "react";

const InputLabel = ({ value, className = "", children, ...props }) => {
    return (
        <label
            {...props}
            className={`block font-medium text-sm text-gray-700 ${className}`}
        >
            {value ? value : children}
        </label>
    );
};

export default InputLabel;

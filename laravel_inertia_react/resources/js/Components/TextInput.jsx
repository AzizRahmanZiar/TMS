import React from "react";

const TextInput = ({
    type = "text",
    className = "",
    isFocused = false,
    ...props
}) => {
    return (
        <input
            {...props}
            type={type}
            className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className}`}
            autoFocus={isFocused}
        />
    );
};

export default TextInput;

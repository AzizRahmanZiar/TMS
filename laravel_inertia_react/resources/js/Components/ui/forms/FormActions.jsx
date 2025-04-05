import React from "react";
import { theme } from "@/theme";

const FormActions = ({ children, className = "", ...props }) => {
    return (
        <div
            className={`flex items-center justify-end space-x-3 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default FormActions;

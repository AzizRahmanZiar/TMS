import React from "react";
import FormField from "./FormField";
import FormGroup from "./FormGroup";
import FormActions from "./FormActions";

const Form = ({
    children,
    onSubmit,
    className = "",
    layout = "default",
    ...props
}) => {
    const layouts = {
        default: "space-y-4",
        horizontal: "grid grid-cols-1 md:grid-cols-3 gap-4",
        inline: "flex items-center space-x-4",
    };

    return (
        <form
            onSubmit={onSubmit}
            className={`${layouts[layout]} ${className}`}
            {...props}
        >
            {children}
        </form>
    );
};

Form.Field = FormField;
Form.Group = FormGroup;
Form.Actions = FormActions;

export default Form;

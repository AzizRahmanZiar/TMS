import React from "react";
import { theme } from "@/theme";

const FormField = ({
    type,
    label,
    name,
    value,
    onChange,
    error,
    touched,
    required,
    options,
    placeholder,
    className = "",
    ...props
}) => {
    const baseInputClasses = `
        w-full px-3 py-2
        border rounded-lg
        focus:outline-none focus:ring-2 focus:ring-primary-500
        disabled:bg-gray-100 disabled:cursor-not-allowed
        ${error && touched ? "border-danger-500" : "border-gray-300"}
    `;

    const renderField = () => {
        switch (type) {
            case "select":
                return (
                    <select
                        name={name}
                        value={value}
                        onChange={onChange}
                        className={`${baseInputClasses} ${className}`}
                        {...props}
                    >
                        <option value="">
                            {placeholder || "Select an option"}
                        </option>
                        {options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case "textarea":
                return (
                    <textarea
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={`${baseInputClasses} min-h-[100px] ${className}`}
                        {...props}
                    />
                );

            case "checkbox":
                return (
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name={name}
                            checked={value}
                            onChange={onChange}
                            className={`w-4 h-4 text-primary-600 border-gray-300 rounded
                                focus:ring-primary-500 ${className}`}
                            {...props}
                        />
                        <span className="ml-2 text-gray-700">{label}</span>
                    </div>
                );

            case "radio":
                return (
                    <div className="space-y-2">
                        {options?.map((option) => (
                            <div
                                key={option.value}
                                className="flex items-center"
                            >
                                <input
                                    type="radio"
                                    name={name}
                                    value={option.value}
                                    checked={value === option.value}
                                    onChange={onChange}
                                    className={`w-4 h-4 text-primary-600 border-gray-300
                                        focus:ring-primary-500 ${className}`}
                                    {...props}
                                />
                                <span className="ml-2 text-gray-700">
                                    {option.label}
                                </span>
                            </div>
                        ))}
                    </div>
                );

            default:
                return (
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={`${baseInputClasses} ${className}`}
                        {...props}
                    />
                );
        }
    };

    return (
        <div className="mb-4">
            {type !== "checkbox" && (
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    {label}
                    {required && (
                        <span className="text-danger-500 ml-1">*</span>
                    )}
                </label>
            )}
            {renderField()}
            {error && touched && (
                <p className="mt-1 text-sm text-danger-500">{error}</p>
            )}
        </div>
    );
};

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

Form.Field = FormField;
Form.Group = FormGroup;
Form.Actions = FormActions;

export default Form;

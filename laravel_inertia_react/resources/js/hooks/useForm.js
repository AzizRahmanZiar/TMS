import { useState, useCallback } from "react";

const useForm = (initialValues = {}, validationRules = {}) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = useCallback(
        (e) => {
            const { name, value, type, checked } = e.target;
            const newValue = type === "checkbox" ? checked : value;

            setValues((prev) => ({
                ...prev,
                [name]: newValue,
            }));

            setTouched((prev) => ({
                ...prev,
                [name]: true,
            }));

            // Validate on change if field has been touched
            if (touched[name]) {
                validateField(name, newValue);
            }
        },
        [touched]
    );

    const validateField = useCallback(
        (name, value) => {
            const rules = validationRules[name];
            if (!rules) return;

            let fieldErrors = [];

            if (rules.required && !value) {
                fieldErrors.push("This field is required");
            }

            if (rules.minLength && value.length < rules.minLength) {
                fieldErrors.push(`Minimum length is ${rules.minLength}`);
            }

            if (rules.maxLength && value.length > rules.maxLength) {
                fieldErrors.push(`Maximum length is ${rules.maxLength}`);
            }

            if (rules.pattern && !rules.pattern.test(value)) {
                fieldErrors.push(rules.message || "Invalid format");
            }

            if (rules.custom && typeof rules.custom === "function") {
                const customError = rules.custom(value);
                if (customError) {
                    fieldErrors.push(customError);
                }
            }

            setErrors((prev) => ({
                ...prev,
                [name]: fieldErrors,
            }));

            return fieldErrors.length === 0;
        },
        [validationRules]
    );

    const validateForm = useCallback(() => {
        let isValid = true;
        const newErrors = {};

        Object.keys(validationRules).forEach((field) => {
            const fieldIsValid = validateField(field, values[field]);
            if (!fieldIsValid) {
                isValid = false;
            }
        });

        return isValid;
    }, [values, validationRules, validateField]);

    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    }, [initialValues]);

    const setFieldValue = useCallback((name, value) => {
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    return {
        values,
        errors,
        touched,
        handleChange,
        validateForm,
        resetForm,
        setFieldValue,
        setValues,
    };
};

export default useForm;

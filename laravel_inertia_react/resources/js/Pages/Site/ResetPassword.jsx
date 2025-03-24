"use client";

import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage, route } from "@inertiajs/inertia-react";
import { FaLock, FaCheck, FaEnvelope } from "react-icons/fa";

const ResetPassword = () => {
    const { email, token, errors: serverErrors } = usePage().props;

    const [values, setValues] = useState({
        token: token,
        email: email || "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    // Sync server errors with local errors
    useEffect(() => {
        if (Object.keys(serverErrors).length > 0) {
            setErrors(serverErrors);
        }
    }, [serverErrors]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newErrors = { ...errors };

        // Password validation
        if (name === "password") {
            if (!value) {
                newErrors.password = "پټنوم ضروري دی";
            } else if (value.length < 8) {
                newErrors.password = "پټنوم باید لږ تر لږه ۸ حروف ولري";
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                newErrors.password =
                    "پټنوم باید لوی حروف، کوچني حروف او عددونه ولري";
            } else {
                newErrors.password = null;
            }

            // Also check confirm password match if it has a value
            if (
                values.password_confirmation &&
                value !== values.password_confirmation
            ) {
                newErrors.password_confirmation = "پټنومونه سره سمون نه خوري";
            } else if (values.password_confirmation) {
                newErrors.password_confirmation = null;
            }
        }

        // Confirm password validation
        if (name === "password_confirmation") {
            if (!value) {
                newErrors.password_confirmation = "د پټنوم تایید ضروري دی";
            } else if (value !== values.password) {
                newErrors.password_confirmation = "پټنومونه سره سمون نه خوري";
            } else {
                newErrors.password_confirmation = null;
            }
        }

        setValues((values) => ({
            ...values,
            [name]: value,
        }));

        setErrors(newErrors);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!values.password) {
            newErrors.password = "پټنوم ضروري دی";
        } else if (values.password.length < 8) {
            newErrors.password = "پټنوم باید لږ تر لږه ۸ حروف ولري";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(values.password)) {
            newErrors.password =
                "پټنوم باید لوی حروف، کوچني حروف او عددونه ولري";
        }

        if (!values.password_confirmation) {
            newErrors.password_confirmation = "د پټنوم تایید ضروري دی";
        } else if (values.password !== values.password_confirmation) {
            newErrors.password_confirmation = "پټنومونه سره سمون نه خوري";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setProcessing(true);

            Inertia.post(route("password.update"), values, {
                onError: (errors) => {
                    setErrors(errors);
                    setProcessing(false);
                },
                onSuccess: () => {
                    // Redirect is handled automatically by Inertia
                },
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10">
            <div
                className="max-w-md mx-auto p-8 bg-white rounded-2xl border"
                dir="rtl"
            >
                <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 border-b pb-4">
                    د پټنوم بدلول
                </h2>

                <p className="text-gray-600 mb-6 text-center">
                    مهرباني وکړئ خپل نوی پټنوم ولیکئ.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Hidden email field if not shown in the form */}
                    {!email && (
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                <FaEnvelope className="inline ml-2 text-blue-600" />
                                بریښنالیک
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                                    errors.email
                                        ? "border-red-500 bg-red-50"
                                        : "border-gray-300"
                                }`}
                                placeholder="بریښنالیک ولیکئ"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    )}

                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            <FaLock className="inline ml-2 text-blue-600" />
                            نوی پټنوم
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                                errors.password
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-300"
                            }`}
                            placeholder="نوی پټنوم ولیکئ"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                        <p className="text-gray-500 text-sm mt-1">
                            پټنوم باید لږ تر لږه ۸ حروف، لوی حروف، کوچني حروف او
                            عددونه ولري.
                        </p>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            <FaLock className="inline ml-2 text-blue-600" />د
                            نوي پټنوم تایید
                        </label>
                        <input
                            type="password"
                            name="password_confirmation"
                            value={values.password_confirmation}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                                errors.password_confirmation
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-300"
                            }`}
                            placeholder="نوی پټنوم بیا ولیکئ"
                        />
                        {errors.password_confirmation && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-10 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:-translate-y-1 flex justify-center items-center"
                    >
                        {processing ? (
                            <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                        ) : (
                            <FaCheck className="inline ml-2" />
                        )}
                        {processing ? "د بدلولو په حال کې..." : "پټنوم بدل کړئ"}
                    </button>

                    <div className="text-center mt-6">
                        <Link
                            href={route("login")}
                            className="text-blue-600 hover:underline"
                        >
                            د ننوتلو پاڼې ته ستنیدل
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;

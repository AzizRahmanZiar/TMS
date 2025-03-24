"use client";

import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import {
    FaEnvelope,
    FaLock,
    FaSignInAlt,
    FaFacebook,
    FaGoogle,
} from "react-icons/fa";

const Login = () => {
    const { route } = usePage().props;
    const [values, setValues] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newErrors = { ...errors };

        if (type === "checkbox") {
            setValues((values) => ({
                ...values,
                [name]: checked,
            }));
        } else {
            // Email validation
            if (name === "email" && value.trim() !== "") {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    newErrors.email = "بریښنالیک ناسم دی";
                } else {
                    newErrors.email = null;
                }
            } else if (name === "email" && value.trim() === "") {
                newErrors.email = "بریښنالیک ضروري دی";
            }

            // Password validation
            if (name === "password" && value.trim() === "") {
                newErrors.password = "پټنوم ضروري دی";
            } else {
                newErrors.password = null;
            }

            setValues((values) => ({
                ...values,
                [name]: value,
            }));
        }

        setErrors(newErrors);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!values.email.trim()) {
            newErrors.email = "بریښنالیک ضروري دی";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            newErrors.email = "بریښنالیک ناسم دی";
        }

        if (!values.password) {
            newErrors.password = "پټنوم ضروري دی";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setProcessing(true);

            Inertia.post(route("login"), values, {
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
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 border-b pb-4">
                    ننوتل
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
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

                    <div>
                        <div className="flex justify-between mb-2">
                            <Link
                                href={route("password.request")}
                                className="text-blue-600 text-sm hover:underline"
                            >
                                پټنوم مو هیر شوی؟
                            </Link>
                            <label className="font-medium text-gray-700">
                                <FaLock className="inline ml-2 text-blue-600" />
                                پټنوم
                            </label>
                        </div>
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
                            placeholder="پټنوم ولیکئ"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="remember"
                            id="remember"
                            checked={values.remember}
                            onChange={handleChange}
                            className="rounded text-blue-500 focus:ring-2 focus:ring-blue-300 ml-2"
                        />
                        <label htmlFor="remember" className="text-gray-700">
                            ما په یاد ولره
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-10 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:-translate-y-1 flex justify-center items-center"
                    >
                        {processing ? (
                            <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                        ) : (
                            <FaSignInAlt className="inline ml-2" />
                        )}
                        {processing ? "د ننوتلو په حال کې..." : "ننوتل"}
                    </button>

                    <div className="relative flex items-center justify-center mt-6">
                        <div className="border-t border-gray-300 absolute w-full"></div>
                        <div className="bg-white px-4 relative z-10 text-gray-500 text-sm">
                            یا ننوتل د لارې
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <a
                            href={route("login.facebook")}
                            className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <FaFacebook className="text-[#1877F2] ml-2" />
                            <span>فیسبوک</span>
                        </a>
                        <a
                            href={route("login.google")}
                            className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <FaGoogle className="text-[#DB4437] ml-2" />
                            <span>ګوګل</span>
                        </a>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            حساب نلرئ؟{" "}
                            <Link
                                href={route("register")}
                                className="text-blue-600 hover:underline"
                            >
                                ثبت نام وکړئ
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

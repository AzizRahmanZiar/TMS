"use client";

import { useState } from "react";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value);
        setError("");
    };

    const validateForm = () => {
        if (!email.trim()) {
            setError("بریښنالیک ضروري دی");
            return false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setError("بریښنالیک ناسم دی");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Form is valid, proceed with submission
            console.log("Forgot password form submitted:", email);
            // Here you would typically call an API to send a reset password email
            setIsSubmitted(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 flex items-center justify-center">
            <div
                className="max-w-md w-full mx-auto p-8 bg-white rounded-2xl border shadow-sm"
                dir="rtl"
            >
                <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
                    د پټنوم بیا ترلاسه کول
                </h2>
                <p className="text-gray-600 text-center mb-8 border-b pb-4">
                    خپل بریښنالیک ولیکئ او موږ به تاسو ته د پټنوم د بیا تنظیم
                    لینک درولیږو
                </p>

                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                <FaEnvelope className="inline ml-2 text-blue-600" />
                                بریښنالیک
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                                    error
                                        ? "border-red-500 bg-red-50"
                                        : "border-gray-300"
                                }`}
                                placeholder="بریښنالیک ولیکئ"
                            />
                            {error && (
                                <p className="text-red-500 text-sm mt-1">
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:-translate-y-1"
                        >
                            د بیا تنظیم لینک ولیږئ
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-8">
                        <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6">
                            د پټنوم د بیا تنظیم لینک ستاسو بریښنالیک ته ولیږل
                            شو. مهرباني وکړئ خپل بریښنالیک وګورئ.
                        </div>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                        >
                            بل بریښنالیک ولیږئ
                        </button>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    >
                        <FaArrowLeft className="ml-2" />
                        بیرته ننوتلو ته ستانه شئ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

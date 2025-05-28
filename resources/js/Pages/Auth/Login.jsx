import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
    FaEnvelope,
    FaLock,
    FaArrowRight,
    FaArrowLeft,
    FaUserPlus,
    FaSignInAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import Toast from "@/Components/Toast";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showToast, setShowToast] = useState(false);

    // Handle status changes
    useEffect(() => {
        if (status) {
            setShowToast(true);
        }
    }, [status]);

    const submit = (e) => {
        e.preventDefault();

        console.log("Submitting login with data:", data);
        console.log(
            "CSRF token:",
            document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content")
        );

        post(route("login"), {
            onFinish: () => {
                reset("password");
            },
            onSuccess: () => {
                console.log("Login successful!");
            },
            onError: (errors) => {
                console.log("Login failed with errors:", errors);
            },
        });
    };

    return (
        <>
            <GuestLayout>
                <Head title="داخلـــــــېدل" />

                <div className="w-full max-w-md mx-auto">
                    <div className="bg-gradient-to-br from-white to-primary-50 rounded-2xl shadow-lg p-8 border border-primary-100">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                                داخلـــــــېدل
                            </h2>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* General Error Display */}
                            {Object.keys(errors).length > 0 && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg
                                                className="h-5 w-5 text-red-400"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div className="mr-3">
                                            <h3 className="text-sm font-medium text-red-800">
                                                د ننوتلو کې ستونزه
                                            </h3>
                                            <div className="mt-2 text-sm text-red-700">
                                                <ul className="list-disc list-inside space-y-1">
                                                    {Object.entries(errors).map(
                                                        ([key, message]) => (
                                                            <li key={key}>
                                                                {message}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-2xl text-gray-700 mb-2"
                                >
                                    بریښنالیک
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="text-primary-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className={`pl-10 w-full text-xl p-3 rounded-lg border transition-all duration-200 shadow-md focus:ring-2 focus:outline-none ${
                                            errors.email
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-200 bg-red-50"
                                                : "border-gray-200 focus:border-primary-500 focus:ring-primary-200"
                                        }`}
                                        autoComplete="username"
                                        autoFocus
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-2xl text-gray-700 mb-2"
                                >
                                    پټنوم
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="text-primary-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className={`pl-10 w-full text-xl p-3 rounded-lg border transition-all duration-200 shadow-md focus:ring-2 focus:outline-none ${
                                            errors.password
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-200 bg-red-50"
                                                : "border-gray-200 focus:border-primary-500 focus:ring-primary-200"
                                        }`}
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                </div>
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                        className="rounded border-gray-300 text-primary-600 shadow-sm focus:ring-primary-500"
                                    />
                                    <span className="mr-2 text-lg text-gray-600">
                                        زه یادولئ
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-lg text-gray-600 hover:text-primary-600 transition-colors duration-200"
                                    >
                                        پټنوم مو هیر شوی؟
                                    </Link>
                                )}
                            </div>

                            <div className="flex flex-col space-y-4">
                                <button
                                    type="submit"
                                    className={`w-full justify-center py-3 font-amiri text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center ${
                                        processing
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-secondary-500 to-primary-600 hover:from-secondary-600 hover:to-primary-700 text-white"
                                    }`}
                                    disabled={processing}
                                >
                                    <span className="mx-auto text-xl flex items-center">
                                        {processing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                د داخلیدو په حال کې...
                                            </>
                                        ) : (
                                            <>
                                                داخل شئ
                                                <FaSignInAlt className="mr-2 text-sm" />
                                            </>
                                        )}
                                    </span>
                                </button>

                                <div className="flex items-center justify-center text-lg">
                                    که حساب نه لرئ،
                                    <Link
                                        href={route("register")}
                                        className="text-primary-600 hover:text-primary-700 font-medium mr-1"
                                    >
                                        <span>نو ځان ثبت کړئ</span>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </GuestLayout>

            {showToast && (
                <Toast
                    message={status}
                    type="success"
                    onClose={() => setShowToast(false)}
                    duration={3000}
                />
            )}
        </>
    );
}

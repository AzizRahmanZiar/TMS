import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { FaEnvelope, FaLock, FaArrowRight, FaArrowLeft, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import Toast from "@/Components/Toast";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
    });

    const [showToast, setShowToast] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle status changes
    useEffect(() => {
        if (status) {
            setShowToast(true);
            if (status === "You have been successfully logged out.") {
                window.location.reload();
            }
        }
    }, [status]);

    const validateForm = () => {
        const newErrors = {};

        if (!data.email.trim()) {
            newErrors.email = "بریښنالیک اړین دی";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)
        ) {
            newErrors.email = "بریښنالیک ناسم دی";
        }

        if (!data.password) {
            newErrors.password = "پټنوم اړین دی";
        }

        return newErrors;
    };

    const submit = (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            return;
        }

        post(route("login"), {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => reset("password"),
            onSuccess: () => {
                // The redirection will be handled by the LoginController
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
                                        className="pl-10 w-full text-xl p-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 shadow-md"
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
                                        className="pl-10 w-full text-xl p-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 shadow-md"
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

                            <div className="flex flex-col space-y-4">
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-lg text-gray-600 hover:text-primary-600 transition-colors duration-200"
                                    >
                                        پټنوم مو هیر شوی؟
                                    </Link>
                                )}

                                <button
                                    type="submit"
                                    className="w-full justify-center py-3 font-amiri text-lg bg-gradient-to-r from-secondary-500 to-primary-600 hover:from-secondary-600 hover:to-primary-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                                    disabled={isSubmitted}
                                >
                                    <span className="mx-auto text-xl flex items-center">
                                        {isSubmitted ? (
                                            "د داخلیدو په حال کې..."
                                        ) : (
                                            <>
                                                داخل شئ
                                                <FaSignInAlt className="mr-2 text-sm" />
                                            </>
                                        )}
                                    </span>
                                </button>

                                <div className='flex items-center justify-center text-lg'>
                                    که حساب نه لرئ، 
                                    <Link
                                        href={route("register")}
                                        className="text-primary-600 hover:text-primary-700 font-medium mr-1"
                                    >
                                        <span>
                                            نو ځان ثبت کړئ
                                        </span>
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

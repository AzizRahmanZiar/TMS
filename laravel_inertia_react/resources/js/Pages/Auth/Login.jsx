import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

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
            onFinish: () => reset("password"),
            onSuccess: (page) => {
                const userRole = page.props.auth.user?.role;
                if (userRole === "admin") {
                    router.visit(route("dashboard"));
                } else if (userRole === "tailor") {
                    router.visit(route("dashboard"));
                } else {
                    router.visit(route("home"));
                }
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="ننوتل" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <label
                        htmlFor="email"
                        className="block font-medium text-sm text-gray-700"
                    >
                        بریښنالیک
                    </label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    {errors.email && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="password"
                        className="block font-medium text-sm text-gray-700"
                    >
                        پټنوم
                    </label>

                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    {errors.password && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.password}
                        </p>
                    )}
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                        />
                        <span className="mr-2 text-sm text-gray-600">
                            ما په یاد ولره
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            پټنوم مو هیر شوی؟
                        </Link>
                    )}
                    <PrimaryButton className="ml-4" disabled={processing}>
                        {processing ? "د ننوتلو په حال کې..." : "ننوتل"}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

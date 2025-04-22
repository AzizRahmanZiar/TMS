import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
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
            preserveScroll: true,
            preserveState: true,
            onFinish: () => reset("password"),
            onSuccess: () => {
                // The redirection will be handled by the LoginController
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
            <h1 className="text-center font-amiri text-2xl">داخلـــــــېدل</h1>
            <form onSubmit={submit} className="px-6 py-10 h-[30rem]">
                <div>
                    <label
                        htmlFor="email"
                        className="block  font-amiri text-xl text-gray-700"
                    >
                        بریښنالیک
                    </label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full outline-none focus:border-primary-500 border-b"
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
                        className="block font-amiri text-xl text-gray-700"
                    >
                        پټنوم
                    </label>

                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full outline-none  focus:border-primary-500  border-b"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    {errors.password && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.password}
                        </p>
                    )}
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
                    <PrimaryButton
                        className="ml-4 font-amiri"
                        disabled={processing}
                    >
                        {processing ? "د ننوتلو په حال کې..." : "داخل سئ"}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

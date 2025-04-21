import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="پټنوم بیا تنظیمول" />

            <div className="mb-4 text-sm text-gray-600">
                پټنوم مو هیر شوی؟ موږ به تاسو ته د بریښنالیک لینک واستوو چې تاسو کولی شئ پټنوم بیا تنظیم کړئ.
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="px-6 py-10">
                <div>
                    <label
                        htmlFor="email"
                        className="block font-amiri text-xl text-gray-700"
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

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton
                        className="font-amiri"
                        disabled={processing}
                    >
                        د پټنوم بیا تنظیمولو لینک واستوئ
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
} 
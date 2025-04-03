import React from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
            onSuccess: (page) => {
                const userRole = page.props.auth.user?.role;
                if (userRole === "admin") {
                    router.visit(route("admin.dashboard"));
                } else if (userRole === "tailor") {
                    router.visit(route("tailor.dashboard"));
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
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} dir="rtl">
                <div>
                    <InputLabel htmlFor="email" value="بریښنالیک" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="پټنوم" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
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
                    {/* <Link href={route("registration")}>رجستر</Link> */}
                    <PrimaryButton className="ml-4" disabled={processing}>
                        {processing ? "د ننوتلو په حال کې..." : "ننوتل"}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { router } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        router.post(route("password.email"), data, {
            preserveState: false,
            onError: (errors) => {
                // If it's a CSRF error, refresh the page to get a new token
                if (errors.message && errors.message.includes("419")) {
                    window.location.reload();
                }
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="پټنوم بیا تنظیمول" />

            <div className="w-full max-w-md mx-auto">
                <div className="bg-gradient-to-br from-white to-primary-50 rounded-2xl shadow-lg p-8 border border-primary-100">
                    <div className="text-center mb-6">
                        <h1 className="font-amiri text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                            پټنوم بیا تنظیمول
                        </h1>
                        <div className="h-1 w-16 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-2 rounded-full"></div>
                    </div>

                    <div className="mb-6 p-4 bg-white bg-opacity-70 rounded-lg text-gray-600 text-sm leading-relaxed border border-gray-100 shadow-sm">
                        پټنوم مو هیر شوی؟ موږ به تاسو ته د بریښنالیک لینک واستوو
                        چې تاسو کولی شئ پټنوم بیا تنظیم کړئ.
                    </div>

                    {status && (
                        <div className="mb-6 p-4 bg-green-50 rounded-lg text-green-600 font-medium">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block font-amiri text-xl text-gray-700 mb-2"
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
                                    className="pl-10 w-full p-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 shadow-md"
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

                        <button
                            type="submit"
                            className="w-full justify-center py-3 font-amiri text-lg bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                            disabled={processing}
                        >
                            <span className="mx-auto flex items-center">
                                {processing ? (
                                    "د لیږلو په حال کې..."
                                ) : (
                                    <>
                                        د پټنوم بیا تنظیمولو لینک واستوئ
                                        <FaPaperPlane className="mr-2 text-sm" />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}

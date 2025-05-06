// import React from "react";
// import PrimaryButton from "@/Components/PrimaryButton";
// import GuestLayout from "@/Layouts/GuestLayout";
// import { Head, Link, useForm, router } from "@inertiajs/react";

// export default function Login({ status, canResetPassword }) {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         email: "",
//         password: "",
//     });

//     const validateForm = () => {
//         const newErrors = {};

//         if (!data.email.trim()) {
//             newErrors.email = "بریښنالیک اړین دی";
//         } else if (
//             !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)
//         ) {
//             newErrors.email = "بریښنالیک ناسم دی";
//         }

//         if (!data.password) {
//             newErrors.password = "پټنوم اړین دی";
//         }

//         return newErrors;
//     };

//     const submit = (e) => {
//         e.preventDefault();

//         const formErrors = validateForm();
//         if (Object.keys(formErrors).length > 0) {
//             return;
//         }

//         post(route("login"), {
//             preserveScroll: true,
//             preserveState: true,
//             onFinish: () => reset("password"),
//             onSuccess: () => {
//                 // The redirection will be handled by the LoginController
//             },
//         });
//     };

//     return (
//         <GuestLayout>
//             <Head title="ننوتل" />

//             {status && (
//                 <div className="mb-4 font-medium text-sm text-green-600">
//                     {status}
//                 </div>
//             )}
//             <h1 className="text-center font-amiri text-2xl">داخلـــــــېدل</h1>
//             <form onSubmit={submit} className="px-6 py-10">
//                 <div>
//                     <label
//                         htmlFor="email"
//                         className="block  font-amiri text-xl text-gray-700"
//                     >
//                         بریښنالیک
//                     </label>

//                     <input
//                         id="email"
//                         type="email"
//                         name="email"
//                         value={data.email}
//                         className="mt-1 block w-full outline-none focus:border-primary-500 border-b"
//                         autoComplete="username"
//                         autoFocus
//                         onChange={(e) => setData("email", e.target.value)}
//                     />

//                     {errors.email && (
//                         <p className="mt-2 text-sm text-red-600">
//                             {errors.email}
//                         </p>
//                     )}
//                 </div>

//                 <div className="mt-4">
//                     <label
//                         htmlFor="password"
//                         className="block font-amiri text-xl text-gray-700"
//                     >
//                         پټنوم
//                     </label>

//                     <input
//                         id="password"
//                         type="password"
//                         name="password"
//                         value={data.password}
//                         className="mt-1 block w-full outline-none  focus:border-primary-500  border-b"
//                         autoComplete="current-password"
//                         onChange={(e) => setData("password", e.target.value)}
//                     />

//                     {errors.password && (
//                         <p className="mt-2 text-sm text-red-600">
//                             {errors.password}
//                         </p>
//                     )}
//                 </div>

//                 <div className="mt-4 flex flex-col items-start gap-5">
//                     {canResetPassword && (
//                         <Link
//                             href={route("password.request")}
//                             className="text-xl font-amiri text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                         >
//                             پټنوم مو هیر شوی؟
//                         </Link>
//                     )}
//                     <PrimaryButton
//                         className="ml-4 font-amiri"
//                         disabled={processing}
//                     >
//                         {processing ? "د داخلېدو په حال کې..." : "داخل سئ"}
//                     </PrimaryButton>
//                 </div>
//             </form>
//         </GuestLayout>
//     );
// }

import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

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

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-soft max-w-md w-full mx-auto"
            >
                {status && (
                    <div className="mb-4 p-4 bg-green-50 rounded-lg text-green-600 font-medium text-sm">
                        {status}
                    </div>
                )}

                <h1 className="text-center font-amiri text-3xl mb-8 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-700">
                    داخلـــــــېدل
                </h1>

                <form onSubmit={submit} className="space-y-6">
                    <div className="relative">
                        <label
                            htmlFor="email"
                            className="block font-amiri text-xl text-gray-700 mb-2"
                        >
                            بریښنالیک
                        </label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="pl-10 w-full p-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                        </div>
                        {errors.email && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2 text-sm text-red-600"
                            >
                                {errors.email}
                            </motion.p>
                        )}
                    </div>

                    <div className="relative">
                        <label
                            htmlFor="password"
                            className="block font-amiri text-xl text-gray-700 mb-2"
                        >
                            پټنوم
                        </label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="pl-10 w-full p-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                        </div>
                        {errors.password && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2 text-sm text-red-600"
                            >
                                {errors.password}
                            </motion.p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-4">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-lg font-amiri text-gray-600 hover:text-primary-600 transition-colors duration-200"
                            >
                                پټنوم مو هیر شوی؟
                            </Link>
                        )}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <PrimaryButton
                                className="w-full justify-center py-3 font-amiri text-lg bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
                                disabled={processing}
                            >
                                {processing
                                    ? "د داخلېدو په حال کې..."
                                    : "داخل سئ"}
                            </PrimaryButton>
                        </motion.div>
                    </div>
                </form>
            </motion.div>
        </GuestLayout>
    );
}

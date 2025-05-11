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

// import React from "react";
// import PrimaryButton from "@/Components/PrimaryButton";
// import GuestLayout from "@/Layouts/GuestLayout";
// import { Head, Link, useForm, router } from "@inertiajs/react";
// import { FaEnvelope, FaLock } from "react-icons/fa";
// import { motion } from "framer-motion";

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

//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-white p-8 rounded-2xl shadow-soft max-w-md w-full mx-auto"
//             >
//                 {status && (
//                     <div className="mb-4 p-4 bg-green-50 rounded-lg text-green-600 font-medium text-sm">
//                         {status}
//                     </div>
//                 )}

//                 <h1 className="text-center font-amiri text-3xl mb-8 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-700">
//                     داخلـــــــېدل
//                 </h1>

//                 <form onSubmit={submit} className="space-y-6">
//                     <div className="relative">
//                         <label
//                             htmlFor="email"
//                             className="block font-amiri text-xl text-gray-700 mb-2"
//                         >
//                             بریښنالیک
//                         </label>
//                         <div className="relative">
//                             <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                             <input
//                                 id="email"
//                                 type="email"
//                                 name="email"
//                                 value={data.email}
//                                 className="pl-10 w-full p-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
//                                 autoComplete="username"
//                                 autoFocus
//                                 onChange={(e) =>
//                                     setData("email", e.target.value)
//                                 }
//                             />
//                         </div>
//                         {errors.email && (
//                             <motion.p
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 className="mt-2 text-sm text-red-600"
//                             >
//                                 {errors.email}
//                             </motion.p>
//                         )}
//                     </div>

//                     <div className="relative">
//                         <label
//                             htmlFor="password"
//                             className="block font-amiri text-xl text-gray-700 mb-2"
//                         >
//                             پټنوم
//                         </label>
//                         <div className="relative">
//                             <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                             <input
//                                 id="password"
//                                 type="password"
//                                 name="password"
//                                 value={data.password}
//                                 className="pl-10 w-full p-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
//                                 autoComplete="current-password"
//                                 onChange={(e) =>
//                                     setData("password", e.target.value)
//                                 }
//                             />
//                         </div>
//                         {errors.password && (
//                             <motion.p
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 className="mt-2 text-sm text-red-600"
//                             >
//                                 {errors.password}
//                             </motion.p>
//                         )}
//                     </div>

//                     <div className="flex flex-col space-y-4">
//                         {canResetPassword && (
//                             <Link
//                                 href={route("password.request")}
//                                 className="text-lg font-amiri text-gray-600 hover:text-primary-600 transition-colors duration-200"
//                             >
//                                 پټنوم مو هیر شوی؟
//                             </Link>
//                         )}
//                         <motion.div
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                         >
//                             <PrimaryButton
//                                 className="w-full justify-center py-3 font-amiri text-lg bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
//                                 disabled={processing}
//                             >
//                                 {processing
//                                     ? "د داخلېدو په حال کې..."
//                                     : "داخل سئ"}
//                             </PrimaryButton>
//                         </motion.div>
//                     </div>
//                 </form>
//             </motion.div>
//         </GuestLayout>
//     );
// }

"use client";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

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

            <div className="w-full max-w-md mx-auto">
                <div className="bg-gradient-to-br from-white to-primary-50 rounded-2xl shadow-lg p-8 border border-primary-100">
                    {status && (
                        <div className="mb-6 p-4 bg-primary-50 rounded-lg text-primary-700 font-medium text-sm">
                            {status}
                        </div>
                    )}

                    <div className="text-center mb-8">
                        <h1 className="font-amiri text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                            داخلـــــــېدل
                        </h1>
                        <div className="h-1 w-16 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-2 rounded-full"></div>
                    </div>

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

                        <div>
                            <label
                                htmlFor="password"
                                className="block font-amiri text-xl text-gray-700 mb-2"
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
                                    className="pl-10 w-full p-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 shadow-md"
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
                                    className="text-lg font-amiri text-gray-600 hover:text-primary-600 transition-colors duration-200"
                                >
                                    پټنوم مو هیر شوی؟
                                </Link>
                            )}
                            <button
                                type="submit"
                                className="w-full justify-center py-3 font-amiri text-lg bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                                disabled={processing}
                            >
                                <span className="mx-auto flex items-center">
                                    {processing ? (
                                        "د داخلېدو په حال کې..."
                                    ) : (
                                        <>
                                            داخل سئ
                                            <FaArrowRight className="mr-2 text-sm" />
                                        </>
                                    )}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}

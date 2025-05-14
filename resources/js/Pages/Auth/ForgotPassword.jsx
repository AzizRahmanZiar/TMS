// import React from "react";
// import PrimaryButton from "@/Components/PrimaryButton";
// import GuestLayout from "@/Layouts/GuestLayout";
// import { Head, useForm } from "@inertiajs/react";

// export default function ForgotPassword({ status }) {
//     const { data, setData, post, processing, errors } = useForm({
//         email: "",
//     });

//     const submit = (e) => {
//         e.preventDefault();

//         post(route("password.email"));
//     };

//     return (
//         <GuestLayout>
//             <Head title="پټنوم بیا تنظیمول" />

//             <div className="mb-4 text-sm text-gray-600">
//                 پټنوم مو هیر شوی؟ موږ به تاسو ته د بریښنالیک لینک واستوو چې تاسو کولی شئ پټنوم بیا تنظیم کړئ.
//             </div>

//             {status && (
//                 <div className="mb-4 font-medium text-sm text-green-600">
//                     {status}
//                 </div>
//             )}

//             <form onSubmit={submit} className="px-6 py-10">
//                 <div>
//                     <label
//                         htmlFor="email"
//                         className="block font-amiri text-xl text-gray-700"
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

//                 <div className="mt-4 flex items-center justify-end">
//                     <PrimaryButton
//                         className="font-amiri"
//                         disabled={processing}
//                     >
//                         د پټنوم بیا تنظیمولو لینک واستوئ
//                     </PrimaryButton>
//                 </div>
//             </form>
//         </GuestLayout>
//     );
// }

// import React from "react";
// import PrimaryButton from "@/Components/PrimaryButton";
// import GuestLayout from "@/Layouts/GuestLayout";
// import { Head, useForm } from "@inertiajs/react";
// import { FaEnvelope } from "react-icons/fa";
// import { motion } from "framer-motion";

// export default function ForgotPassword({ status }) {
//     const { data, setData, post, processing, errors } = useForm({
//         email: "",
//     });

//     const submit = (e) => {
//         e.preventDefault();
//         post(route("password.email"));
//     };

//     return (
//         <GuestLayout>
//             <Head title="پټنوم بیا تنظیمول" />

//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-white p-8 rounded-2xl shadow-soft max-w-md w-full mx-auto"
//             >
//                 <div className="mb-6 text-gray-600 bg-gray-50 p-4 rounded-lg">
//                     پټنوم مو هیر شوی؟ موږ به تاسو ته د بریښنالیک لینک واستوو چې
//                     تاسو کولی شئ پټنوم بیا تنظیم کړئ.
//                 </div>

//                 {status && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="mb-6 p-4 bg-green-50 rounded-lg text-green-600 font-medium"
//                     >
//                         {status}
//                     </motion.div>
//                 )}

//                 <form onSubmit={submit} className="space-y-6">
//                     <div>
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

//                     <motion.div
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         className="flex justify-end"
//                     >
//                         <PrimaryButton
//                             className="w-full justify-center py-3 font-amiri text-lg bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
//                             disabled={processing}
//                         >
//                             د پټنوم بیا تنظیمولو لینک واستوئ
//                         </PrimaryButton>
//                     </motion.div>
//                 </form>
//             </motion.div>
//         </GuestLayout>
//     );
// }

"use client";
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
        router.post(route("password.email"), data);
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

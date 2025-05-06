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

import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

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

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-soft max-w-md w-full mx-auto"
            >
                <div className="mb-6 text-gray-600 bg-gray-50 p-4 rounded-lg">
                    پټنوم مو هیر شوی؟ موږ به تاسو ته د بریښنالیک لینک واستوو چې
                    تاسو کولی شئ پټنوم بیا تنظیم کړئ.
                </div>

                {status && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-6 p-4 bg-green-50 rounded-lg text-green-600 font-medium"
                    >
                        {status}
                    </motion.div>
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

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex justify-end"
                    >
                        <PrimaryButton
                            className="w-full justify-center py-3 font-amiri text-lg bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
                            disabled={processing}
                        >
                            د پټنوم بیا تنظیمولو لینک واستوئ
                        </PrimaryButton>
                    </motion.div>
                </form>
            </motion.div>
        </GuestLayout>
    );
}

// import React from "react";
// import PrimaryButton from "@/Components/PrimaryButton";
// import GuestLayout from "@/Layouts/GuestLayout";
// import { Head, useForm } from "@inertiajs/react";
// import InputError from "@/Components/InputError";
// import InputLabel from "@/Components/InputLabel";
// import TextInput from "@/Components/TextInput";

// export default function ResetPassword({ token, email }) {
//     const { data, setData, post, processing, errors } = useForm({
//         token: token,
//         email: email,
//         password: "",
//         password_confirmation: "",
//     });

//     const submit = (e) => {
//         e.preventDefault();

//         post(route("password.store"));
//     };

//     return (
//         <GuestLayout>
//             <Head title="پټنوم بیا تنظیمول" />

//             <form onSubmit={submit} className="px-6 py-10">
//                 <div>
//                     <InputLabel htmlFor="email" value="بریښنالیک" />

//                     <TextInput
//                         id="email"
//                         type="email"
//                         name="email"
//                         value={data.email}
//                         className="mt-1 block w-full"
//                         autoComplete="username"
//                         onChange={(e) => setData("email", e.target.value)}
//                     />

//                     <InputError message={errors.email} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel htmlFor="password" value="نوی پټنوم" />

//                     <TextInput
//                         id="password"
//                         type="password"
//                         name="password"
//                         value={data.password}
//                         className="mt-1 block w-full"
//                         autoComplete="new-password"
//                         onChange={(e) => setData("password", e.target.value)}
//                     />

//                     <InputError message={errors.password} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel
//                         htmlFor="password_confirmation"
//                         value="پټنوم تایید کړئ"
//                     />

//                     <TextInput
//                         id="password_confirmation"
//                         type="password"
//                         name="password_confirmation"
//                         value={data.password_confirmation}
//                         className="mt-1 block w-full"
//                         autoComplete="new-password"
//                         onChange={(e) =>
//                             setData("password_confirmation", e.target.value)
//                         }
//                     />

//                     <InputError
//                         message={errors.password_confirmation}
//                         className="mt-2"
//                     />
//                 </div>

//                 <div className="mt-4 flex items-center justify-end">
//                     <PrimaryButton
//                         className="font-amiri"
//                         disabled={processing}
//                     >
//                         پټنوم بیا تنظیم کړئ
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
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.store"));
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
                <h1 className="text-center font-amiri text-3xl mb-8 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-700">
                    پټنوم بیا تنظیمول
                </h1>

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

                    <div>
                        <label
                            htmlFor="password"
                            className="block font-amiri text-xl text-gray-700 mb-2"
                        >
                            نوی پټنوم
                        </label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="pl-10 w-full p-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                                autoComplete="new-password"
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

                    <div>
                        <label
                            htmlFor="password_confirmation"
                            className="block font-amiri text-xl text-gray-700 mb-2"
                        >
                            پټنوم تایید کړئ
                        </label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="pl-10 w-full p-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        {errors.password_confirmation && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2 text-sm text-red-600"
                            >
                                {errors.password_confirmation}
                            </motion.p>
                        )}
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <PrimaryButton
                            className="w-full justify-center py-3 font-amiri text-lg bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
                            disabled={processing}
                        >
                            پټنوم بیا تنظیم کړئ
                        </PrimaryButton>
                    </motion.div>
                </form>
            </motion.div>
        </GuestLayout>
    );
}

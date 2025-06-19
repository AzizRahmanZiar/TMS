import { useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    FaUser,
    FaEnvelope,
    FaSpinner,
    FaCheckCircle,
    FaExclamationTriangle,
    FaCamera,
    FaTrash,
} from "react-icons/fa";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const [previewImage, setPreviewImage] = useState(null);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            profile_image: null,
            _method: "PATCH",
        });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("profile_image", file);

            // Create preview URL
            const reader = new FileReader();
            reader.onload = (e) => setPreviewImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData("profile_image", null);
        setPreviewImage(null);
        // Reset file input
        const fileInput = document.getElementById("profile_image");
        if (fileInput) fileInput.value = "";
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("profile.update"), {
            forceFormData: true,
        });
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 font-zar">
                    د پروفایل معلومات
                </h2>
                <p className="mt-1 text-sm text-gray-600 font-zar">
                    خپل د حساب پروفایل معلومات او بریښنالیک پته تازه کړئ
                </p>
            </header>

            <form onSubmit={submit} className="space-y-6">
                {/* Profile Image Upload */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                >
                    <label className="block text-sm font-bold text-gray-700 font-zar mb-4">
                        د پروفایل انځور
                    </label>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        {/* Current/Preview Image */}
                        <div className="w-24 mr-3 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-gray-200">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-full h-full"
                                />
                            ) : user.profile_image ? (
                                <img
                                    src={`/storage/${user.profile_image}`}
                                    alt={user.name}
                                    className="w-full h-full"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/placeholder.svg";
                                    }}
                                />
                            ) : (
                                <FaUser className="text-gray-400 text-3xl" />
                            )}
                        </div>

                        {/* Upload Controls */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <label
                                    htmlFor="profile_image"
                                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus-within:ring-2 gap-3 focus-within:ring-primary-500 focus-within:border-primary-500 transition-all duration-200"
                                >
                                    <FaCamera className="ml-2 h-4 w-4" />
                                    انځور غوره کړئ
                                    <input
                                        id="profile_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="sr-only"
                                    />
                                </label>

                                {(previewImage || user.profile_image) && (
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="inline-flex items-center px-3 py-2 border border-red-300 rounded-lg shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:ring-2 focus:ring-red-500 gap-2 focus:border-red-500 transition-all duration-200"
                                    >
                                        <FaTrash className="ml-1 h-3 w-3" />
                                        لرې کړئ
                                    </button>
                                )}
                            </div>
                            <p className="mt-2 text-xs text-gray-500 font-zar">
                                PNG, JPG, GIF تر 2MB پورې
                            </p>
                            {errors.profile_image && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-2 text-sm text-red-600 font-zar"
                                >
                                    {errors.profile_image}
                                </motion.p>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Name Field */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <label
                        htmlFor="name"
                        className="block text-sm font-bold text-gray-700 font-zar mb-2"
                    >
                        نوم
                    </label>
                    <div className="relative">
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 font-zar text-right ${
                                errors.name
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                    : "border-gray-300 focus:border-primary-500 focus:ring-primary-200"
                            }`}
                            required
                            autoComplete="name"
                        />
                    </div>
                    {errors.name && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-2 text-sm text-red-600 font-zar"
                        >
                            {errors.name}
                        </motion.p>
                    )}
                </motion.div>

                {/* Email Field */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <label
                        htmlFor="email"
                        className="block text-sm font-bold text-gray-700 font-zar mb-2"
                    >
                        بریښنالیک
                    </label>
                    <div className="relative">
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 font-zar text-right ${
                                errors.email
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                    : "border-gray-300 focus:border-primary-500 focus:ring-primary-200"
                            }`}
                            required
                            autoComplete="username"
                        />
                    </div>
                    {errors.email && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-2 text-sm text-red-600 font-zar"
                        >
                            {errors.email}
                        </motion.p>
                    )}
                </motion.div>

                {/* Email Verification Notice */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
                    >
                        <div className="flex items-start">
                            <FaExclamationTriangle className="h-5 w-5 text-yellow-500 mt-0.5 ml-2" />
                            <div className="flex-1">
                                <p className="text-sm text-yellow-800 font-zar mb-2">
                                    ستاسو بریښنالیک پته تصدیق شوې نده.
                                </p>
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                    className="text-sm text-yellow-800 underline hover:text-yellow-900 font-zar"
                                >
                                    د تصدیق بریښنالیک بیا واستوه
                                </Link>
                            </div>
                        </div>

                        {status === "verification-link-sent" && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2 text-sm text-green-600 font-zar"
                            >
                                د تصدیق نوی لینک ستاسو بریښنالیک ته واستول شو.
                            </motion.p>
                        )}
                    </motion.div>
                )}

                {/* Submit Button and Success Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-4"
                >
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center justify-center px-6 py-3 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-4 focus:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-zar"
                    >
                        {processing ? (
                            <>
                                <FaSpinner className="animate-spin ml-2 h-4 w-4" />
                                د ساتلو په حال کې...
                            </>
                        ) : (
                            "ساتل"
                        )}
                    </button>

                    {recentlySuccessful && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-center text-sm text-green-600 font-zar"
                        >
                            <FaCheckCircle className="h-4 w-4 ml-1" />
                            ساتل شو
                        </motion.div>
                    )}
                </motion.div>
            </form>
        </section>
    );
}

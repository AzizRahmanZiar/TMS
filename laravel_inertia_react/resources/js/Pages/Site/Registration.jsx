"use client";

import { useReg } from "@/Contexts/RegContext";
import { useState } from "react";
import {
    FaImage,
    FaUser,
    FaEnvelope,
    FaLock,
    FaUserTie,
    FaBriefcase,
    FaCertificate,
    FaTools,
    FaClock,
    FaStore,
    FaMapMarkerAlt,
    FaUsers,
    FaCalendarAlt,
    FaPhone,
    FaCreditCard,
    FaFacebook,
    FaInstagram,
    FaTelegram,
} from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";

const Registration = () => {
    const { setReg } = useReg(); // Access context
    // Form state
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: "",
        profileImage: null,
        experience: "",
        career: "",
        previousWork: "",
        certifications: "",
        skills: "",
        workAvailability: "",
        addShop: false,
        tailoringName: "",
        tailoringAddress: "",
        tailorCount: "",
        publishedYear: "",
        contactNumber: "",
        shopEmail: "",
        workingHours: "",
        services: "",
        paymentMethods: [],
        shopImages: [],
        socialLinks: {
            facebook: "",
            instagram: "",
            telegram: "",
        },
    });

    // Add profileImagePreview state to store the preview URL
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [shopImagesPreview, setShopImagesPreview] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "file") {
            if (name === "shopImages") {
                const fileArray = Array.from(files);
                setFormData({ ...formData, [name]: fileArray });

                // Create preview URLs for shop images
                const previewUrls = [];
                fileArray.forEach((file) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        previewUrls.push(reader.result);
                        if (previewUrls.length === fileArray.length) {
                            setShopImagesPreview(previewUrls);
                        }
                    };
                    reader.readAsDataURL(file);
                });
            } else if (name === "profileImage") {
                setFormData({ ...formData, [name]: files[0] });
                // Create preview URL for profile image
                if (files[0]) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setProfileImagePreview(reader.result);
                    };
                    reader.readAsDataURL(files[0]);
                } else {
                    setProfileImagePreview(null);
                }
            } else {
                setFormData({ ...formData, [name]: files[0] });
            }
        } else if (type === "checkbox") {
            if (name === "addShop") {
                setFormData({ ...formData, addShop: checked });
            } else if (checked) {
                setFormData({
                    ...formData,
                    paymentMethods: [...formData.paymentMethods, value],
                });
            } else {
                setFormData({
                    ...formData,
                    paymentMethods: formData.paymentMethods.filter(
                        (method) => method !== value
                    ),
                });
            }
        } else if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData({
                ...formData,
                [parent]: { ...formData[parent], [child]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }

        // Clear error when field is edited
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        // User information validation
        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.role) {
            newErrors.role = "Role selection is required";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        // Tailor information validation
        if (formData.role === "Tailor") {
            if (!formData.experience) {
                newErrors.experience = "Experience is required";
            }
            if (!formData.career) {
                newErrors.career = "Career field is required";
            }
            if (!formData.workAvailability) {
                newErrors.workAvailability = "Work availability is required";
            }
        }
        // Shop information validation
        if (formData.role === "Tailor" && formData.addShop) {
            if (!formData.tailoringName) {
                newErrors.tailoringName = "Shop name is required";
            }
            if (!formData.tailoringAddress) {
                newErrors.tailoringAddress = "Shop address is required";
            }
            if (!formData.contactNumber) {
                newErrors.contactNumber = "Contact number is required";
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Form is valid, proceed with submission
            console.log("Form submitted:", formData);
            // Store the form data in context
            setReg((prevReg) => [...prevReg, formData]); // Store form data in the reg array
            setIsSubmitted(true);
        } else {
            console.log("Form has errors");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10">
            <div
                className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl"
                dir="rtl"
            >
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 border-b pb-4">
                    ثبت نام
                </h2>

                {isSubmitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-green-700 mb-2">
                            ثبت نام بریالی شو!
                        </h3>
                        <p className="text-green-600 mb-6">
                            ستاسو معلومات په بریالیتوب سره ثبت شول.
                        </p>

                        {profileImagePreview && (
                            <div className="mb-6">
                                <h4 className="text-lg font-semibold mb-2">
                                    د پروفایل انځور:
                                </h4>
                                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-green-200">
                                    <img
                                        src={
                                            profileImagePreview ||
                                            "/placeholder.svg"
                                        }
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => {
                                setFormData({
                                    username: "",
                                    email: "",
                                    role: "",
                                    password: "",
                                    confirmPassword: "",
                                    profileImage: null,
                                    experience: "",
                                    career: "",
                                    previousWork: "",
                                    certifications: "",
                                    skills: "",
                                    workAvailability: "",
                                    addShop: false,
                                    tailoringName: "",
                                    tailoringAddress: "",
                                    tailorCount: "",
                                    publishedYear: "",
                                    contactNumber: "",
                                    shopEmail: "",
                                    workingHours: "",
                                    services: "",
                                    paymentMethods: [],
                                    shopImages: [],
                                    socialLinks: {
                                        facebook: "",
                                        instagram: "",
                                        telegram: "",
                                    },
                                });
                                setProfileImagePreview(null);
                                setShopImagesPreview([]);
                                setIsSubmitted(false);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                        >
                            نوی ثبت نام
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Section 1: User Information */}
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 inline-flex items-center justify-center ml-2">
                                    1
                                </span>
                                د کارکوونکي معلومات
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaUser className="inline ml-2 text-blue-600" />
                                        نوم
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                                            errors.username
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        placeholder=" نوم ولیکئ"
                                    />
                                    {errors.username && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.username}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaEnvelope className="inline ml-2 text-blue-600" />
                                        بریښنالیک
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                                            errors.email
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        placeholder="بریښنالیک ولیکئ"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaUserTie className="inline ml-2 text-blue-600" />
                                        رول
                                    </label>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                                            errors.role
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        <option value="">رول وټاکئ</option>
                                        <option value="Admin">مدیر</option>
                                        <option value="Tailor">خیاط</option>
                                        <option value="Customer">مشتری</option>
                                    </select>
                                    {errors.role && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.role}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaLock className="inline ml-2 text-blue-600" />
                                        پټنوم
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                                            errors.password
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        placeholder="پټنوم ولیکئ"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaLock className="inline ml-2 text-blue-600" />
                                        پټنوم تایید کړئ
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                                            errors.confirmPassword
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        placeholder="پټنوم بیا ولیکئ"
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Tailor Information (conditional) */}
                        {formData.role === "Tailor" && (
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                                    <span className="bg-green-100 text-green-600 rounded-full w-8 h-8 inline-flex items-center justify-center ml-2">
                                        2
                                    </span>
                                    د خیاط معلومات
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2 flex flex-col items-center">
                                        <label className="block mb-2 font-medium text-gray-700 self-center">
                                            <FaUser className="inline ml-2 text-green-600" />
                                            د خیاط پروفایل انځور
                                        </label>
                                        <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-full border-4 border-green-100 group">
                                            {profileImagePreview ? (
                                                <img
                                                    src={
                                                        profileImagePreview ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt="Profile Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <FaUser className="text-gray-400 text-4xl" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <FaImage className="text-white text-2xl" />
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                name="profileImage"
                                                onChange={handleChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                                accept=".jpg,.jpeg,.png"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            <FaBriefcase className="inline ml-2 text-amber-600" />
                                            تجربه (کلونه)
                                        </label>
                                        <input
                                            type="number"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all ${
                                                errors.experience
                                                    ? "border-red-500 bg-red-50"
                                                    : "border-gray-300"
                                            }`}
                                            placeholder="د تجربې کلونه"
                                            min="0"
                                        />
                                        {errors.experience && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.experience}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            <FaUserTie className="inline ml-2 text-indigo-600" />
                                            مسلک/تخصص
                                        </label>
                                        <input
                                            type="text"
                                            name="career"
                                            value={formData.career}
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all ${
                                                errors.career
                                                    ? "border-red-500 bg-red-50"
                                                    : "border-gray-300"
                                            }`}
                                            placeholder="لکه: دSuit, د واده کالي, ترمیمات"
                                        />
                                        {errors.career && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.career}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            <FaUserTie className="inline ml-2 text-indigo-600" />
                                            مخکیني کارونه
                                        </label>
                                        <input
                                            type="text"
                                            name="previousWork"
                                            value={formData.previousWork}
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all ${
                                                errors.previousWork
                                                    ? "border-red-500 bg-red-50"
                                                    : "border-gray-300"
                                            }`}
                                            placeholder="مخکیني کارونه"
                                        />
                                        {errors.previousWork && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.previousWork}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            <FaCertificate className="inline ml-2 text-yellow-600" />
                                            تصدیقنامې
                                        </label>
                                        <input
                                            type="text"
                                            name="certifications"
                                            value={formData.certifications}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all"
                                            placeholder="تصدیقنامې یا ډیپلومونه"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            <FaTools className="inline ml-2 text-gray-600" />
                                            مهارتونه
                                        </label>
                                        <input
                                            type="text"
                                            name="skills"
                                            value={formData.skills}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all"
                                            placeholder="لکه: د ګلدوزۍ, د نمونې جوړول"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            <MdWorkOutline className="inline ml-2 text-orange-600" />
                                            د کار موجودیت
                                        </label>
                                        <select
                                            name="workAvailability"
                                            value={formData.workAvailability}
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all ${
                                                errors.workAvailability
                                                    ? "border-red-500 bg-red-50"
                                                    : "border-gray-300"
                                            }`}
                                        >
                                            <option value="">
                                                د موجودیت انتخاب
                                            </option>
                                            <option value="Full-time">
                                                مکمل وخت
                                            </option>
                                            <option value="Part-time">
                                                نیم وخت
                                            </option>
                                            <option value="Freelance">
                                                فریلانس
                                            </option>
                                        </select>
                                        {errors.workAvailability && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.workAvailability}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="flex items-center cursor-pointer p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                        <input
                                            type="checkbox"
                                            name="addShop"
                                            checked={formData.addShop}
                                            onChange={handleChange}
                                            className="rounded text-green-500 focus:ring-2 focus:ring-green-300 ml-2"
                                        />
                                        <span className="text-gray-700 font-medium">
                                            زه غواړم چې خیاطي اضافه کړم
                                        </span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Section 3: Tailor Shop Information (conditional) */}
                        {formData.role === "Tailor" && formData.addShop && (
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                                    <span className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 inline-flex items-center justify-center ml-2">
                                        3
                                    </span>
                                    د خیاطۍ معلومات
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            <FaStore className="inline ml-2 text-indigo-600" />
                                            د خیاطۍ نوم
                                        </label>
                                        <input
                                            type="text"
                                            name="tailoringName"
                                            value={formData.tailoringName}
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all ${
                                                errors.tailoringName
                                                    ? "border-red-500 bg-red-50"
                                                    : "border-gray-300"
                                            }`}
                                            placeholder="د خیاطۍ نوم"
                                        />
                                        {errors.tailoringName && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.tailoringName}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            <FaMapMarkerAlt className="inline ml-2 text-red-600" />
                                            پته
                                        </label>
                                        <input
                                            type="text"
                                            name="tailoringAddress"
                                            value={formData.tailoringAddress}
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all ${
                                                errors.tailoringAddress
                                                    ? "border-red-500 bg-red-50"
                                                    : "border-gray-300"
                                            }`}
                                            placeholder="مکمل پته"
                                        />
                                        {errors.tailoringAddress && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.tailoringAddress}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            <FaUsers className="inline ml-2 text-blue-600" />
                                            د خیاطانو شمیر
                                        </label>
                                        <input
                                            type="number"
                                            name="tailorCount"
                                            value={formData.tailorCount}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                                            placeholder="د کار کوونکو خیاطان شمېر"
                                            min="1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            <FaCalendarAlt className="inline ml-2 text-teal-600" />
                                            د تاسیس کال
                                        </label>
                                        <input
                                            type="number"
                                            name="publishedYear"
                                            value={formData.publishedYear}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                                            placeholder="کله خیاطي تاسیس شوی"
                                            min="1900"
                                            max={new Date().getFullYear()}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            <FaPhone className="inline ml-2 text-green-600" />
                                            د اړیکو شمیره
                                        </label>
                                        <input
                                            type="tel"
                                            name="contactNumber"
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all ${
                                                errors.contactNumber
                                                    ? "border-red-500 bg-red-50"
                                                    : "border-gray-300"
                                            }`}
                                            placeholder="د خیاطۍ د اړیکي شمیره"
                                        />
                                        {errors.contactNumber && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.contactNumber}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            <FaEnvelope className="inline ml-2 text-blue-600" />
                                            د خیاطۍ ایمیل پته
                                        </label>
                                        <input
                                            type="email"
                                            name="shopEmail"
                                            value={formData.shopEmail}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                                            placeholder="د خیاطۍ ایمیل پته"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            <FaClock className="inline ml-2 text-orange-600" />
                                            د کار ساعتونه
                                        </label>
                                        <input
                                            type="text"
                                            name="workingHours"
                                            value={formData.workingHours}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                                            placeholder="لکه: دوشنبه-جمعه: 9AM-6PM"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            <FaTools className="inline ml-2 text-gray-600" />
                                            وړاندې شوي خدمتونه
                                        </label>
                                        <input
                                            type="text"
                                            name="services"
                                            value={formData.services}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                                            placeholder="لکه: دSuit, ترمیمات, د ښځو کالي"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block mb-2 font-medium text-gray-700">
                                            <FaCreditCard className="inline ml-2 text-slate-600" />
                                            د تادیې میتودونه
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    name="paymentMethods"
                                                    value="Cash"
                                                    checked={formData.paymentMethods.includes(
                                                        "Cash"
                                                    )}
                                                    onChange={handleChange}
                                                    className="rounded text-purple-500 focus:ring-2 focus:ring-purple-300 ml-2"
                                                />
                                                <span className="text-gray-700">
                                                    نقد
                                                </span>
                                            </label>
                                            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    name="paymentMethods"
                                                    value="USDT"
                                                    checked={formData.paymentMethods.includes(
                                                        "USDT"
                                                    )}
                                                    onChange={handleChange}
                                                    className="rounded text-purple-500 focus:ring-2 focus:ring-purple-300 ml-2"
                                                />
                                                <span className="text-gray-700">
                                                    کریپټو (USDT)
                                                </span>
                                            </label>
                                            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    name="paymentMethods"
                                                    value="Bitcoin"
                                                    checked={formData.paymentMethods.includes(
                                                        "Bitcoin"
                                                    )}
                                                    onChange={handleChange}
                                                    className="rounded text-purple-500 focus:ring-2 focus:ring-purple-300 ml-2"
                                                />
                                                <span className="text-gray-700">
                                                    بټ کوین
                                                </span>
                                            </label>
                                            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    name="paymentMethods"
                                                    value="Bank Transfer"
                                                    checked={formData.paymentMethods.includes(
                                                        "Bank Transfer"
                                                    )}
                                                    onChange={handleChange}
                                                    className="rounded text-purple-500 focus:ring-2 focus:ring-purple-300 ml-2"
                                                />
                                                <span className="text-gray-700">
                                                    د بانک لیږد
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block mb-2 font-medium text-gray-700">
                                            <FaImage className="inline ml-2 text-violet-600" />
                                            د خیاطۍ تصویرونه
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                name="shopImages"
                                                onChange={handleChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all file:ml-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                                                accept=".jpg,.jpeg,.png"
                                                multiple
                                            />
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            د خپل دوکان تصویرونه اپلوډ کړئ (ډیر
                                            تصویری اجازه لري)
                                        </p>

                                        {/* Shop Images Preview */}
                                        {shopImagesPreview.length > 0 && (
                                            <div className="mt-4 grid grid-cols-3 gap-3">
                                                {shopImagesPreview.map(
                                                    (url, index) => (
                                                        <div
                                                            key={index}
                                                            className="relative h-24 rounded-lg overflow-hidden border border-purple-200"
                                                        >
                                                            <img
                                                                src={
                                                                    url ||
                                                                    "/placeholder.svg"
                                                                }
                                                                alt={`Shop image ${
                                                                    index + 1
                                                                }`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            <FaFacebook className="inline ml-2 text-[#1877F2]" />
                                            د فیسبوک لینک
                                        </label>
                                        <input
                                            type="url"
                                            name="socialLinks.facebook"
                                            value={
                                                formData.socialLinks.facebook
                                            }
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                                            placeholder="د فیسبوک پاڼه URL"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            <FaInstagram className="inline ml-2 text-[#E1306C]" />
                                            د انستګرام لینک
                                        </label>
                                        <input
                                            type="url"
                                            name="socialLinks.instagram"
                                            value={
                                                formData.socialLinks.instagram
                                            }
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                                            placeholder="د انستګرام پروفایل URL"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            <FaTelegram className="inline ml-2 text-[#0088cc]" />
                                            د ټلګرام لینک
                                        </label>
                                        <input
                                            type="url"
                                            name="socialLinks.telegram"
                                            value={
                                                formData.socialLinks.telegram
                                            }
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                                            placeholder="د ټلګرام چینل URL"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-start">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-10 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:-translate-y-1"
                            >
                                ثبت کول
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Registration;

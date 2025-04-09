import React from "react";
import { useForm } from "@inertiajs/react";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
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

export default function Register({ roles = {} }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
        profile_image: null,
        experience: "",
        career: "",
        previous_work: "",
        certifications: "",
        skills: "",
        work_availability: "",
        addShop: false,
        tailoring_name: "",
        tailoring_address: "",
        tailor_count: "",
        published_year: "",
        contact_number: "",
        shop_email: "",
        working_hours: "",
        services: "",
        payment_methods: [],
        shop_images: [],
        social_links: {
            facebook: "",
            instagram: "",
            telegram: "",
        },
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10">
                <div
                    className="max-w-4xl mx-auto p-8 bg-white rounded-2xl border"
                    dir="rtl"
                >
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 border-b pb-4">
                        ثبت نام
                    </h2>

                    <form onSubmit={submit} className="space-y-8">
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
                                    <label
                                        htmlFor="name"
                                        className="block font-medium text-sm text-gray-700"
                                    >
                                        <FaUser className="inline ml-2 text-blue-600" />
                                        نوم
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                        autoComplete="name"
                                        autoFocus
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block font-medium text-sm text-gray-700"
                                    >
                                        <FaEnvelope className="inline ml-2 text-blue-600" />
                                        بریښنالیک
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                        autoComplete="username"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block font-medium text-sm text-gray-700"
                                    >
                                        <FaLock className="inline ml-2 text-blue-600" />
                                        پټنوم
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="password_confirmation"
                                        className="block font-medium text-sm text-gray-700"
                                    >
                                        <FaLock className="inline ml-2 text-blue-600" />
                                        پټنوم تایید کړئ
                                    </label>
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.password_confirmation && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.password_confirmation}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="role"
                                        className="block font-medium text-sm text-gray-700"
                                    >
                                        <FaUserTie className="inline ml-2 text-blue-600" />
                                        رول
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={data.role}
                                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                        onChange={(e) =>
                                            setData("role", e.target.value)
                                        }
                                    >
                                        <option value="">رول وټاکئ</option>
                                        {Object.entries(roles).map(
                                            ([value, label]) => (
                                                <option
                                                    key={value}
                                                    value={value}
                                                >
                                                    {label}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    {errors.role && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.role}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="profile_image"
                                        className="block font-medium text-sm text-gray-700"
                                    >
                                        <FaUser className="inline ml-2 text-blue-600" />
                                        پروفایل
                                    </label>
                                    <input
                                        type="file"
                                        id="profile_image"
                                        name="profile_image"
                                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                        onChange={(e) =>
                                            setData(
                                                "profile_image",
                                                e.target.files[0]
                                            )
                                        }
                                    />
                                    {errors.profile_image && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.profile_image}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Tailor Information */}
                        {data.role === "tailor" && (
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                                    <span className="bg-green-100 text-green-600 rounded-full w-8 h-8 inline-flex items-center justify-center ml-2">
                                        2
                                    </span>
                                    د خیاط معلومات
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="experience"
                                            className="block font-medium text-sm text-gray-700"
                                        >
                                            <FaBriefcase className="inline ml-2 text-amber-600" />
                                            تجربه (کلونه)
                                        </label>
                                        <input
                                            id="experience"
                                            type="number"
                                            name="experience"
                                            value={data.experience}
                                            className="mt-1 block w-full border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData(
                                                    "experience",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.experience && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.experience}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="career"
                                            className="block font-medium text-sm text-gray-700"
                                        >
                                            <FaUserTie className="inline ml-2 text-indigo-600" />
                                            مسلک/تخصص
                                        </label>
                                        <input
                                            id="career"
                                            type="text"
                                            name="career"
                                            value={data.career}
                                            className="mt-1 block w-full border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData(
                                                    "career",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.career && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.career}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="previous_work"
                                            className="block font-medium text-sm text-gray-700"
                                        >
                                            <FaUserTie className="inline ml-2 text-indigo-600" />
                                            مخکیني کارونه
                                        </label>
                                        <input
                                            id="previous_work"
                                            type="text"
                                            name="previous_work"
                                            value={data.previous_work}
                                            className="mt-1 block w-full border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData(
                                                    "previous_work",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.previous_work && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.previous_work}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="certifications"
                                            className="block font-medium text-sm text-gray-700"
                                        >
                                            <FaCertificate className="inline ml-2 text-yellow-600" />
                                            تصدیقنامې
                                        </label>
                                        <input
                                            id="certifications"
                                            type="text"
                                            name="certifications"
                                            value={data.certifications}
                                            className="mt-1 block w-full border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData(
                                                    "certifications",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.certifications && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.certifications}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="skills"
                                            className="block font-medium text-sm text-gray-700"
                                        >
                                            <FaTools className="inline ml-2 text-gray-600" />
                                            مهارتونه
                                        </label>
                                        <input
                                            id="skills"
                                            type="text"
                                            name="skills"
                                            value={data.skills}
                                            className="mt-1 block w-full border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData(
                                                    "skills",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.skills && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.skills}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="work_availability"
                                            className="block font-medium text-sm text-gray-700"
                                        >
                                            <MdWorkOutline className="inline ml-2 text-orange-600" />
                                            د کار وخت
                                        </label>
                                        <select
                                            id="work_availability"
                                            name="work_availability"
                                            value={data.work_availability}
                                            className="mt-1 block w-full border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData(
                                                    "work_availability",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                وخت انتخاب کړئ
                                            </option>
                                            <option value="Full-time">
                                                مکمل وخت
                                            </option>
                                            <option value="Part-time">
                                                نیم وخت
                                            </option>
                                        </select>
                                        {errors.work_availability && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.work_availability}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="flex items-center cursor-pointer p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                        <input
                                            type="checkbox"
                                            name="addShop"
                                            checked={data.addShop}
                                            onChange={(e) =>
                                                setData(
                                                    "addShop",
                                                    e.target.checked
                                                )
                                            }
                                            className="rounded text-green-500 focus:ring-2 focus:ring-green-300 ml-2"
                                        />
                                        <span className="text-gray-700 font-medium">
                                            زه غواړم چې خیاطي اضافه کړم
                                        </span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Section 3: Shop Information */}
                        {data.role === "tailor" && data.addShop && (
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                                    <span className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 inline-flex items-center justify-center ml-2">
                                        3
                                    </span>
                                    د خیاطۍ معلومات
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="tailoring_name"
                                            className="block font-medium text-sm text-gray-700"
                                        >
                                            <FaStore className="inline ml-2 text-indigo-600" />
                                            د خیاطۍ نوم
                                        </label>
                                        <input
                                            id="tailoring_name"
                                            type="text"
                                            name="tailoring_name"
                                            value={data.tailoring_name}
                                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData(
                                                    "tailoring_name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.tailoring_name && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.tailoring_name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="tailoring_address"
                                            className="block font-medium text-sm text-gray-700"
                                        >
                                            <FaMapMarkerAlt className="inline ml-2 text-red-600" />
                                            آدرس
                                        </label>
                                        <input
                                            id="tailoring_address"
                                            type="text"
                                            name="tailoring_address"
                                            value={data.tailoring_address}
                                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData(
                                                    "tailoring_address",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.tailoring_address && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.tailoring_address}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="tailor_count"
                                            className="block font-medium text-sm text-gray-700"
                                        >
                                            <FaUsers className="inline ml-2 text-blue-600" />
                                            د خیاطانو شمیر
                                        </label>
                                        <input
                                            id="tailor_count"
                                            type="number"
                                            name="tailor_count"
                                            value={data.tailor_count}
                                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData(
                                                    "tailor_count",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.tailor_count && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.tailor_count}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="published_year"
                                            className="block font-medium text-sm text-gray-700"
                                        >
                                            <FaCalendarAlt className="inline ml-2 text-teal-600" />
                                            د تاسیس کال
                                        </label>
                                        <input
                                            id="published_year"
                                            type="number"
                                            name="published_year"
                                            value={data.published_year}
                                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData(
                                                    "published_year",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.published_year && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.published_year}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="contact_number"
                                            className="block font-medium text-sm text-gray-700"
                                        >
                                            <FaPhone className="inline ml-2 text-green-600" />
                                            د اړیکو شمیره
                                        </label>
                                        <input
                                            id="contact_number"
                                            type="text"
                                            name="contact_number"
                                            value={data.contact_number}
                                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData(
                                                    "contact_number",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.contact_number && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.contact_number}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="shop_email"
                                            className="block font-medium text-sm text-gray-700"
                                        >
                                            <FaEnvelope className="inline ml-2 text-blue-600" />
                                            د خیاطۍ ایمیل
                                        </label>
                                        <input
                                            id="shop_email"
                                            type="email"
                                            name="shop_email"
                                            value={data.shop_email}
                                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData(
                                                    "shop_email",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.shop_email && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.shop_email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="working_hours"
                                            className="block font-medium text-sm text-gray-700"
                                        >
                                            <FaClock className="inline ml-2 text-orange-600" />
                                            د کار ساعتونه
                                        </label>
                                        <input
                                            id="working_hours"
                                            type="text"
                                            name="working_hours"
                                            value={data.working_hours}
                                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData(
                                                    "working_hours",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.working_hours && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.working_hours}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="services"
                                            className="block font-medium text-sm text-gray-700"
                                        >
                                            <FaTools className="inline ml-2 text-gray-600" />
                                            وړاندې شوي خدمتونه
                                        </label>
                                        <input
                                            id="services"
                                            type="text"
                                            name="services"
                                            value={data.services}
                                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData(
                                                    "services",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.services && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.services}
                                            </p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block font-medium text-sm text-gray-700">
                                            <FaCreditCard className="inline ml-2 text-slate-600" />
                                            د تادیې میتودونه
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    name="payment_methods"
                                                    value="Cash"
                                                    checked={data.payment_methods.includes(
                                                        "Cash"
                                                    )}
                                                    onChange={(e) => {
                                                        const methods = [
                                                            ...data.payment_methods,
                                                        ];
                                                        if (e.target.checked) {
                                                            methods.push(
                                                                "Cash"
                                                            );
                                                        } else {
                                                            const index =
                                                                methods.indexOf(
                                                                    "Cash"
                                                                );
                                                            if (index > -1) {
                                                                methods.splice(
                                                                    index,
                                                                    1
                                                                );
                                                            }
                                                        }
                                                        setData(
                                                            "payment_methods",
                                                            methods
                                                        );
                                                    }}
                                                    className="rounded text-purple-500 focus:ring-2 focus:ring-purple-300 ml-2"
                                                />
                                                <span className="text-gray-700">
                                                    نقد
                                                </span>
                                            </label>

                                            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    name="payment_methods"
                                                    value="Bank Transfer"
                                                    checked={data.payment_methods.includes(
                                                        "Bank Transfer"
                                                    )}
                                                    onChange={(e) => {
                                                        const methods = [
                                                            ...data.payment_methods,
                                                        ];
                                                        if (e.target.checked) {
                                                            methods.push(
                                                                "Bank Transfer"
                                                            );
                                                        } else {
                                                            const index =
                                                                methods.indexOf(
                                                                    "Bank Transfer"
                                                                );
                                                            if (index > -1) {
                                                                methods.splice(
                                                                    index,
                                                                    1
                                                                );
                                                            }
                                                        }
                                                        setData(
                                                            "payment_methods",
                                                            methods
                                                        );
                                                    }}
                                                    className="rounded text-purple-500 focus:ring-2 focus:ring-purple-300 ml-2"
                                                />
                                                <span className="text-gray-700">
                                                    د بانک لیږد
                                                </span>
                                            </label>
                                        </div>
                                        {errors.payment_methods && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.payment_methods}
                                            </p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block font-medium text-sm text-gray-700">
                                            <FaImage className="inline ml-2 text-violet-600" />
                                            د خیاطۍ تصویر
                                        </label>
                                        <input
                                            type="file"
                                            id="shop_images"
                                            name="shop_images"
                                            multiple
                                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData(
                                                    "shop_images",
                                                    Array.from(e.target.files)
                                                )
                                            }
                                        />
                                        {errors.shop_images && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.shop_images}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="social_links.facebook"
                                            className="block font-medium text-sm text-gray-700"
                                        >
                                            <FaFacebook className="inline ml-2 text-[#1877F2]" />
                                            د فیسبوک لینک
                                        </label>
                                        <input
                                            id="social_links.facebook"
                                            type="text"
                                            name="social_links.facebook"
                                            value={data.social_links.facebook}
                                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData("social_links", {
                                                    ...data.social_links,
                                                    facebook: e.target.value,
                                                })
                                            }
                                        />
                                        {errors["social_links.facebook"] && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {
                                                    errors[
                                                        "social_links.facebook"
                                                    ]
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="social_links.instagram"
                                            className="block font-medium text-sm text-gray-700"
                                        >
                                            <FaInstagram className="inline ml-2 text-[#E1306C]" />
                                            د انستګرام لینک
                                        </label>
                                        <input
                                            id="social_links.instagram"
                                            type="text"
                                            name="social_links.instagram"
                                            value={data.social_links.instagram}
                                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData("social_links", {
                                                    ...data.social_links,
                                                    instagram: e.target.value,
                                                })
                                            }
                                        />
                                        {errors["social_links.instagram"] && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {
                                                    errors[
                                                        "social_links.instagram"
                                                    ]
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="social_links.telegram"
                                            className="block font-medium text-sm text-gray-700"
                                        >
                                            <FaTelegram className="inline ml-2 text-[#0088cc]" />
                                            د ټلګرام لینک
                                        </label>
                                        <input
                                            id="social_links.telegram"
                                            type="text"
                                            name="social_links.telegram"
                                            value={data.social_links.telegram}
                                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData("social_links", {
                                                    ...data.social_links,
                                                    telegram: e.target.value,
                                                })
                                            }
                                        />
                                        {errors["social_links.telegram"] && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {
                                                    errors[
                                                        "social_links.telegram"
                                                    ]
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-start">
                            <PrimaryButton
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-10 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:-translate-y-1"
                                disabled={processing}
                            >
                                {processing
                                    ? "د راجستر په حال کې..."
                                    : "راجستر"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}

import React from "react";
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
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
        post(route("register.store"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
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
                                <label className="block mb-2 font-medium text-gray-700">
                                    <FaUser className="inline ml-2 text-blue-600" />
                                    نوم
                                </label>
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                                        errors.name
                                            ? "border-red-500 bg-red-50"
                                            : "border-gray-300"
                                    }`}
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    <FaEnvelope className="inline ml-2 text-blue-600" />
                                    بریښنالیک
                                </label>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                                        errors.email
                                            ? "border-red-500 bg-red-50"
                                            : "border-gray-300"
                                    }`}
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    <FaLock className="inline ml-2 text-blue-600" />
                                    پټنوم
                                </label>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                                        errors.password
                                            ? "border-red-500 bg-red-50"
                                            : "border-gray-300"
                                    }`}
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    <FaLock className="inline ml-2 text-blue-600" />
                                    پټنوم تایید کړئ
                                </label>
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                                        errors.password_confirmation
                                            ? "border-red-500 bg-red-50"
                                            : "border-gray-300"
                                    }`}
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    <FaUserTie className="inline ml-2 text-blue-600" />
                                    رول
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={data.role}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                                        errors.role
                                            ? "border-red-500 bg-red-50"
                                            : "border-gray-300"
                                    }`}
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                >
                                    <option value="">رول وټاکئ</option>
                                    {Object.entries(roles).map(
                                        ([value, label]) => (
                                            <option key={value} value={value}>
                                                {label}
                                            </option>
                                        )
                                    )}
                                </select>
                                <InputError
                                    message={errors.role}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    <FaUser className="inline ml-2 text-blue-600" />
                                    پروفایل
                                </label>
                                <input
                                    type="file"
                                    id="profile_image"
                                    name="profile_image"
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                                        errors.profile_image
                                            ? "border-red-500 bg-red-50"
                                            : "border-gray-300"
                                    }`}
                                    onChange={(e) =>
                                        setData(
                                            "profile_image",
                                            e.target.files[0]
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.profile_image}
                                    className="mt-2"
                                />
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
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaBriefcase className="inline ml-2 text-amber-600" />
                                        تجربه (کلونه)
                                    </label>
                                    <TextInput
                                        id="experience"
                                        type="number"
                                        name="experience"
                                        value={data.experience}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all ${
                                            errors.experience
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        onChange={(e) =>
                                            setData(
                                                "experience",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.experience}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaUserTie className="inline ml-2 text-indigo-600" />
                                        مسلک/تخصص
                                    </label>
                                    <TextInput
                                        id="career"
                                        name="career"
                                        value={data.career}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all ${
                                            errors.career
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        onChange={(e) =>
                                            setData("career", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.career}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaUserTie className="inline ml-2 text-indigo-600" />
                                        مخکیني کارونه
                                    </label>
                                    <TextInput
                                        id="previous_work"
                                        name="previous_work"
                                        value={data.previous_work}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all ${
                                            errors.previous_work
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        onChange={(e) =>
                                            setData(
                                                "previous_work",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.previous_work}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaCertificate className="inline ml-2 text-yellow-600" />
                                        تصدیقنامې
                                    </label>
                                    <TextInput
                                        id="certifications"
                                        name="certifications"
                                        value={data.certifications}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all ${
                                            errors.certifications
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        onChange={(e) =>
                                            setData(
                                                "certifications",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.certifications}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaTools className="inline ml-2 text-gray-600" />
                                        مهارتونه
                                    </label>
                                    <TextInput
                                        id="skills"
                                        name="skills"
                                        value={data.skills}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all ${
                                            errors.skills
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        onChange={(e) =>
                                            setData("skills", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.skills}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <MdWorkOutline className="inline ml-2 text-orange-600" />
                                        د کار وخت
                                    </label>
                                    <select
                                        id="work_availability"
                                        name="work_availability"
                                        value={data.work_availability}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all ${
                                            errors.work_availability
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        onChange={(e) =>
                                            setData(
                                                "work_availability",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">وخت انتخاب کړئ</option>
                                        <option value="Full-time">
                                            مکمل وخت
                                        </option>
                                        <option value="Part-time">
                                            نیم وخت
                                        </option>
                                    </select>
                                    <InputError
                                        message={errors.work_availability}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="flex items-center cursor-pointer p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                    <input
                                        type="checkbox"
                                        name="addShop"
                                        checked={data.addShop}
                                        onChange={(e) =>
                                            setData("addShop", e.target.checked)
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
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaStore className="inline ml-2 text-indigo-600" />
                                        د خیاطۍ نوم
                                    </label>
                                    <TextInput
                                        id="tailoring_name"
                                        name="tailoring_name"
                                        value={data.tailoring_name}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all ${
                                            errors.tailoring_name
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        onChange={(e) =>
                                            setData(
                                                "tailoring_name",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.tailoring_name}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaMapMarkerAlt className="inline ml-2 text-red-600" />
                                        آدرس
                                    </label>
                                    <TextInput
                                        id="tailoring_address"
                                        name="tailoring_address"
                                        value={data.tailoring_address}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all ${
                                            errors.tailoring_address
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        onChange={(e) =>
                                            setData(
                                                "tailoring_address",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.tailoring_address}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaUsers className="inline ml-2 text-blue-600" />
                                        د خیاطانو شمیر
                                    </label>
                                    <TextInput
                                        id="tailor_count"
                                        type="number"
                                        name="tailor_count"
                                        value={data.tailor_count}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all ${
                                            errors.tailor_count
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        onChange={(e) =>
                                            setData(
                                                "tailor_count",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.tailor_count}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaCalendarAlt className="inline ml-2 text-teal-600" />
                                        د تاسیس کال
                                    </label>
                                    <TextInput
                                        id="published_year"
                                        type="number"
                                        name="published_year"
                                        value={data.published_year}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all ${
                                            errors.published_year
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        onChange={(e) =>
                                            setData(
                                                "published_year",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.published_year}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaPhone className="inline ml-2 text-green-600" />
                                        د اړیکو شمیره
                                    </label>
                                    <TextInput
                                        id="contact_number"
                                        name="contact_number"
                                        value={data.contact_number}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all ${
                                            errors.contact_number
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        onChange={(e) =>
                                            setData(
                                                "contact_number",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.contact_number}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaEnvelope className="inline ml-2 text-blue-600" />
                                        د خیاطۍ ایمیل
                                    </label>
                                    <TextInput
                                        id="shop_email"
                                        type="email"
                                        name="shop_email"
                                        value={data.shop_email}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all ${
                                            errors.shop_email
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        onChange={(e) =>
                                            setData(
                                                "shop_email",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.shop_email}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaClock className="inline ml-2 text-orange-600" />
                                        د کار ساعتونه
                                    </label>
                                    <TextInput
                                        id="working_hours"
                                        name="working_hours"
                                        value={data.working_hours}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all ${
                                            errors.working_hours
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        onChange={(e) =>
                                            setData(
                                                "working_hours",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.working_hours}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaTools className="inline ml-2 text-gray-600" />
                                        وړاندې شوي خدمتونه
                                    </label>
                                    <TextInput
                                        id="services"
                                        name="services"
                                        value={data.services}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all ${
                                            errors.services
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        onChange={(e) =>
                                            setData("services", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.services}
                                        className="mt-2"
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
                                                        methods.push("Cash");
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
                                    <InputError
                                        message={errors.payment_methods}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaImage className="inline ml-2 text-violet-600" />
                                        د خیاطۍ تصویر
                                    </label>
                                    <input
                                        type="file"
                                        id="shop_images"
                                        name="shop_images"
                                        multiple
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all file:ml-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 ${
                                            errors.shop_images
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        onChange={(e) =>
                                            setData(
                                                "shop_images",
                                                Array.from(e.target.files)
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.shop_images}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaFacebook className="inline ml-2 text-[#1877F2]" />
                                        د فیسبوک لینک
                                    </label>
                                    <TextInput
                                        id="social_links.facebook"
                                        name="social_links.facebook"
                                        value={data.social_links.facebook}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                                        onChange={(e) =>
                                            setData("social_links", {
                                                ...data.social_links,
                                                facebook: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError
                                        message={
                                            errors["social_links.facebook"]
                                        }
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaInstagram className="inline ml-2 text-[#E1306C]" />
                                        د انستګرام لینک
                                    </label>
                                    <TextInput
                                        id="social_links.instagram"
                                        name="social_links.instagram"
                                        value={data.social_links.instagram}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                                        onChange={(e) =>
                                            setData("social_links", {
                                                ...data.social_links,
                                                instagram: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError
                                        message={
                                            errors["social_links.instagram"]
                                        }
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaTelegram className="inline ml-2 text-[#0088cc]" />
                                        د ټلګرام لینک
                                    </label>
                                    <TextInput
                                        id="social_links.telegram"
                                        name="social_links.telegram"
                                        value={data.social_links.telegram}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                                        onChange={(e) =>
                                            setData("social_links", {
                                                ...data.social_links,
                                                telegram: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError
                                        message={
                                            errors["social_links.telegram"]
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-start">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-10 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:-translate-y-1"
                            disabled={processing}
                        >
                            ثبت کول
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

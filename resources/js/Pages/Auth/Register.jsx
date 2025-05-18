import { useState } from "react";
import { useReg } from "@/Contexts/RegContext";
import { router } from "@inertiajs/react";
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
    FaUserPlus,
} from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";

const Registration = () => {
    const { setReg } = useReg();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
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

    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [shopImagesPreview, setShopImagesPreview] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "file") {
            if (name === "shop_images") {
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
            } else if (name === "profile_image") {
                if (files[0]) {
                    setFormData({ ...formData, [name]: files[0] });

                    // Create preview URL for profile image
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setProfileImagePreview(reader.result);
                    };
                    reader.readAsDataURL(files[0]);
                } else {
                    setProfileImagePreview(null);
                    setFormData({ ...formData, [name]: null });
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
                    payment_methods: [...formData.payment_methods, value],
                });
            } else {
                setFormData({
                    ...formData,
                    payment_methods: formData.payment_methods.filter(
                        (method) => method !== value
                    ),
                });
            }
        } else if (name.includes(".")) {
            // Handle nested objects like social_links
            const [parent, child] = name.split(".");
            setFormData({
                ...formData,
                [parent]: { ...formData[parent], [child]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData object to handle file uploads
        const formDataToSubmit = new FormData();

        // Add basic user information
        formDataToSubmit.append("name", formData.name);
        formDataToSubmit.append("email", formData.email);
        formDataToSubmit.append("password", formData.password);
        formDataToSubmit.append("role", formData.role);

        // Add profile image if exists
        if (formData.profile_image) {
            formDataToSubmit.append("profile_image", formData.profile_image);
        }

        // Add tailor-specific information if role is tailor
        if (formData.role === "tailor") {
            formDataToSubmit.append("experience", formData.experience);
            formDataToSubmit.append("career", formData.career);
            formDataToSubmit.append("previous_work", formData.previous_work);
            formDataToSubmit.append("certifications", formData.certifications);
            formDataToSubmit.append("skills", formData.skills);
            formDataToSubmit.append(
                "work_availability",
                formData.work_availability
            );

            // Add shop information if addShop is true
            if (formData.addShop) {
                formDataToSubmit.append(
                    "tailoring_name",
                    formData.tailoring_name
                );
                formDataToSubmit.append(
                    "tailoring_address",
                    formData.tailoring_address
                );
                formDataToSubmit.append("tailor_count", formData.tailor_count);
                formDataToSubmit.append(
                    "published_year",
                    formData.published_year
                );
                formDataToSubmit.append(
                    "contact_number",
                    formData.contact_number
                );
                formDataToSubmit.append("shop_email", formData.shop_email);
                formDataToSubmit.append(
                    "working_hours",
                    formData.working_hours
                );
                formDataToSubmit.append("services", formData.services);
                formDataToSubmit.append(
                    "payment_methods",
                    JSON.stringify(formData.payment_methods)
                );

                // Add shop images if exists
                if (formData.shop_images && formData.shop_images.length > 0) {
                    formData.shop_images.forEach((image, index) => {
                        formDataToSubmit.append(`shop_images[${index}]`, image);
                    });
                }

                formDataToSubmit.append(
                    "social_links",
                    JSON.stringify(formData.social_links)
                );
            }
        }

        // Submit the form using Inertia
        router.post("/register", formDataToSubmit, {
            onSuccess: () => {
                // Redirect to login page after successful registration
                router.visit("/login");
            },
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-secondary-50 py-10">
            <div
                className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white to-primary-50 rounded-2xl shadow-lg border border-primary-100"
                dir="rtl"
            >
                <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 border-b pb-4">
                    ثبت نام
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Section 1: User Information */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                            <span className="bg-gradient-to-r from-primary-100 to-primary-200 text-primary-600 rounded-full w-8 h-8 inline-flex items-center justify-center ml-2">
                                1
                            </span>
                            د کارکوونکي معلومات
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-2xl mb-2 font-medium text-gray-700">
                                    <FaUser className="inline ml-2 text-primary-600" />
                                    نوم
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full p-3 border text-xl rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-all shadow-input ${
                                        errors.name
                                            ? "border-red-500 bg-red-50"
                                            : "border-gray-200"
                                    }`}
                                    placeholder=" نوم ولیکئ"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 text-2xl font-medium text-gray-700">
                                    <FaEnvelope className="inline ml-2 text-primary-600" />
                                    بریښنالیک
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full p-3 border text-xl rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-all shadow-input ${
                                        errors.email
                                            ? "border-red-500 bg-red-50"
                                            : "border-gray-200"
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
                                <label className="block mb-2 text-2xl font-medium text-gray-700">
                                    <FaUserTie className="inline ml-2 text-primary-600" />
                                    رول
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className={`w-full p-3 text-xl border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-all shadow-input ${
                                        errors.role
                                            ? "border-red-500 bg-red-50"
                                            : "border-gray-200"
                                    }`}
                                >
                                    <option value="">رول وټاکئ</option>
                                    <option value="admin">مدیر</option>
                                    <option value="tailor">خیاط</option>
                                    <option value="customer">مشتری</option>
                                </select>
                                {errors.role && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.role}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-2xl mb-2 font-medium text-gray-700">
                                    <FaUser className="inline ml-2 text-primary-600" />
                                    پروفایل
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        name="profile_image"
                                        onChange={handleChange}
                                        className={`w-full p-2 border text-xl rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 ${
                                            errors.profile_image
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-200"
                                        }`}
                                        accept=".jpg,.jpeg,.png"
                                        aria-label="Profile image upload"
                                    />
                                </div>
                                {errors.profile_image && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.profile_image}
                                    </p>
                                )}
                                {profileImagePreview && (
                                    <div className="mt-2 h-16 w-16 rounded-full overflow-hidden border border-gray-200">
                                        <img
                                            src={
                                                profileImagePreview ||
                                                "/placeholder.svg" ||
                                                "/placeholder.svg"
                                            }
                                            alt="Profile preview"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-2xl mb-2 font-medium text-gray-700">
                                    <FaLock className="inline ml-2 text-primary-600" />
                                    پټنوم
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-all shadow-input ${
                                        errors.password
                                            ? "border-red-500 bg-red-50"
                                            : "border-gray-200"
                                    }`}
                                    placeholder="پټنوم ولیکئ"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Tailor Information (conditional) */}
                    {formData.role === "tailor" && (
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                                <span className="bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-600 rounded-full w-8 h-8 inline-flex items-center justify-center ml-2">
                                    2
                                </span>
                                د خیاط معلومات
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-2xl mb-2 font-medium text-gray-700">
                                        <FaBriefcase className="inline ml-2 text-accent-600" />
                                        تجربه (کلونه)
                                    </label>
                                    <input
                                        type="number"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className={`w-full p-3 border text-xl rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-accent-500 transition-all shadow-input ${
                                            errors.experience
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-200"
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
                                    <label className="block text-2xl mb-2 font-medium text-gray-700">
                                        <FaUserTie className="inline ml-2 text-accent-600" />
                                        مسلک/تخصص
                                    </label>
                                    <input
                                        type="text"
                                        name="career"
                                        value={formData.career}
                                        onChange={handleChange}
                                        className={`w-full p-3 text-xl border rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-accent-500 transition-all shadow-input ${
                                            errors.career
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-200"
                                        }`}
                                        placeholder="جامې ..."
                                    />
                                    {errors.career && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.career}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-2xl mb-2 font-medium text-gray-700">
                                        <FaUserTie className="inline ml-2 text-accent-600" />
                                        مخکیني کارونه
                                    </label>
                                    <input
                                        type="text"
                                        name="previous_work"
                                        value={formData.previous_work}
                                        onChange={handleChange}
                                        className={`w-full p-3 border text-xl rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-accent-500 transition-all shadow-input ${
                                            errors.previous_work
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-200"
                                        }`}
                                        placeholder="مخکیني کار"
                                    />
                                    {errors.previous_work && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.previous_work}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-2xl mb-2 font-medium text-gray-700">
                                        <FaCertificate className="inline ml-2 text-accent-600" />
                                        تصدیقنامې
                                    </label>
                                    <input
                                        type="text"
                                        name="certifications"
                                        value={formData.certifications}
                                        onChange={handleChange}
                                        className={`w-full p-3 border text-xl rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-accent-500 transition-all shadow-input ${
                                            errors.certifications
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-200"
                                        }`}
                                        placeholder="تصدیقنامې یا ډیپلومونه"
                                    />
                                    {errors.certifications && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.certifications}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-2xl mb-2 font-medium text-gray-700">
                                        <FaTools className="inline ml-2 text-accent-600" />
                                        مهارتونه
                                    </label>
                                    <input
                                        type="text"
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        className={`w-full p-3 text-xl border rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-accent-500 transition-all shadow-input ${
                                            errors.skills
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-200"
                                        }`}
                                        placeholder="ګلدوزي ..."
                                    />
                                    {errors.skills && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.skills}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-2xl mb-2 font-medium text-gray-700">
                                        <MdWorkOutline className="inline ml-2 text-accent-600" />
                                        د کار وخت
                                    </label>
                                    <select
                                        name="work_availability"
                                        value={formData.work_availability}
                                        onChange={handleChange}
                                        className={`w-full p-3 border text-xl rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-accent-500 transition-all shadow-input ${
                                            errors.work_availability
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-200"
                                        }`}
                                    >
                                        <option value="">وخت انتخاب کړئ</option>
                                        <option value="Full-time">
                                            مکمل وخت
                                        </option>
                                        <option value="Part-time">
                                            نیم وخت
                                        </option>
                                    </select>
                                    {errors.work_availability && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.work_availability}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-6">
                                    <label className="flex items-center cursor-pointer p-3 bg-accent-50 rounded-lg hover:bg-accent-100 transition-colors">
                                        <input
                                            type="checkbox"
                                            name="addShop"
                                            checked={formData.addShop}
                                            onChange={handleChange}
                                            className="rounded text-accent-500 focus:ring-2 focus:ring-accent-300 ml-2"
                                        />
                                        <span className="text-gray-700 text-2xl font-medium">
                                            زه غواړم چې خیاطي اضافه کړم
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 3: Tailor Shop Information (conditional) */}
                    {formData.role === "tailor" && formData.addShop && (
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                                <span className="bg-gradient-to-r from-accent-100 to-accent-200 text-accent-600 rounded-full w-8 h-8 inline-flex items-center justify-center ml-2">
                                    3
                                </span>
                                د خیاطۍ معلومات
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-2xl mb-2 font-medium text-gray-700">
                                        <FaStore className="inline ml-2 text-secondary-600" />
                                        د خیاطۍ نوم
                                    </label>
                                    <input
                                        type="text"
                                        name="tailoring_name"
                                        value={formData.tailoring_name}
                                        onChange={handleChange}
                                        className={`w-full p-3 border text-xl rounded-lg focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 transition-all shadow-input ${
                                            errors.tailoring_name
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-200"
                                        }`}
                                        placeholder="د خیاطۍ نوم"
                                    />
                                    {errors.tailoring_name && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.tailoring_name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-2xl mb-2 font-medium text-gray-700">
                                        <FaMapMarkerAlt className="inline ml-2 text-secondary-600" />
                                        آدرس
                                    </label>
                                    <input
                                        type="text"
                                        name="tailoring_address"
                                        value={formData.tailoring_address}
                                        onChange={handleChange}
                                        className={`w-full p-3 text-xl border rounded-lg focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 transition-all shadow-input ${
                                            errors.tailoring_address
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-200"
                                        }`}
                                        placeholder="مکمل آدرس"
                                    />
                                    {errors.tailoring_address && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.tailoring_address}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-2xl mb-2 font-medium text-gray-700">
                                        <FaUsers className="inline ml-2 text-secondary-600" />
                                        د خیاطانو شمیر
                                    </label>
                                    <input
                                        type="number"
                                        name="tailor_count"
                                        value={formData.tailor_count}
                                        onChange={handleChange}
                                        className={`w-full p-3 text-xl border rounded-lg focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 transition-all shadow-input ${
                                            errors.tailor_count
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-200"
                                        }`}
                                        placeholder="د کار کوونکو خیاطان شمېر"
                                        min="1"
                                    />
                                    {errors.tailor_count && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.tailor_count}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-2xl mb-2 font-medium text-gray-700">
                                        <FaCalendarAlt className="inline ml-2 text-secondary-600" />
                                        د تاسیس کال
                                    </label>
                                    <input
                                        type="number"
                                        name="published_year"
                                        value={formData.published_year}
                                        onChange={handleChange}
                                        className={`w-full p-3 text-xl border rounded-lg focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 transition-all shadow-input ${
                                            errors.published_year
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-200"
                                        }`}
                                        placeholder="کله خیاطي تاسیس شوی"
                                        min="1900"
                                        max={new Date().getFullYear()}
                                    />
                                    {errors.published_year && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.published_year}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-2xl mb-2 font-medium text-gray-700">
                                        <FaPhone className="inline ml-2 text-secondary-600" />
                                        د اړیکو شمیره
                                    </label>
                                    <input
                                        type="tel"
                                        name="contact_number"
                                        value={formData.contact_number}
                                        onChange={handleChange}
                                        className={`w-full p-3 text-xl border rounded-lg focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 transition-all shadow-input ${
                                            errors.contact_number
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-200"
                                        }`}
                                        placeholder="د خیاطۍ د اړیکي شمیره"
                                    />
                                    {errors.contact_number && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.contact_number}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-2xl mb-2 font-medium text-gray-700">
                                        <FaEnvelope className="inline ml-2 text-secondary-600" />
                                        د خیاطۍ ایمیل
                                    </label>
                                    <input
                                        type="email"
                                        name="shop_email"
                                        value={formData.shop_email}
                                        onChange={handleChange}
                                        className={`w-full text-xl p-3 border rounded-lg focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 transition-all shadow-input ${
                                            errors.shop_email
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-200"
                                        }`}
                                        placeholder="د خیاطۍ ایمیل آدرس"
                                    />
                                    {errors.shop_email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.shop_email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-2xl mb-2 font-medium text-gray-700">
                                        <FaClock className="inline ml-2 text-secondary-600" />
                                        د کار ساعتونه
                                    </label>
                                    <input
                                        type="text"
                                        name="working_hours"
                                        value={formData.working_hours}
                                        onChange={handleChange}
                                        className={`w-full p-3 text-xl border rounded-lg focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 transition-all shadow-input ${
                                            errors.working_hours
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-200"
                                        }`}
                                        placeholder="لکه: دوشنبه-جمعه: 9AM-6PM"
                                    />
                                    {errors.working_hours && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.working_hours}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-2xl mb-2 font-medium text-gray-700">
                                        <FaTools className="inline ml-2 text-secondary-600" />
                                        وړاندې شوي خدمتونه
                                    </label>
                                    <input
                                        type="text"
                                        name="services"
                                        value={formData.services}
                                        onChange={handleChange}
                                        className={`w-full text-xl p-3 border rounded-lg focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 transition-all shadow-input ${
                                            errors.services
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-200"
                                        }`}
                                        placeholder="صدر, کورتی ..."
                                    />
                                    {errors.services && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.services}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-2xl mb-2 font-medium text-gray-700">
                                        <FaCreditCard className="inline ml-2 text-secondary-600" />
                                        د تادیې میتودونه
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <label className="flex text-2xl items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-secondary-50 transition-colors">
                                            <input
                                                type="checkbox"
                                                name="payment_methods"
                                                value="Cash"
                                                checked={formData.payment_methods.includes(
                                                    "Cash"
                                                )}
                                                onChange={handleChange}
                                                className="rounded text-xl text-secondary-500 focus:ring-2 focus:ring-secondary-300 ml-2"
                                            />
                                            <span className="text-gray-700">
                                                نقد
                                            </span>
                                        </label>

                                        <label className="flex text-2xl items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-secondary-50 transition-colors">
                                            <input
                                                type="checkbox"
                                                name="payment_methods"
                                                value="Bank Transfer"
                                                checked={formData.payment_methods.includes(
                                                    "Bank Transfer"
                                                )}
                                                onChange={handleChange}
                                                className="rounded text-xl text-secondary-500 focus:ring-2 focus:ring-secondary-300 ml-2"
                                            />
                                            <span className="text-gray-700">
                                                د بانک لیږد
                                            </span>
                                        </label>
                                    </div>
                                    {errors.payment_methods && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.payment_methods}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-2xl mb-2 font-medium text-gray-700">
                                        <FaImage className="inline ml-2 text-secondary-600" />
                                        د خیاطۍ تصویر
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            name="shop_images"
                                            onChange={handleChange}
                                            className={`w-full text-xl p-3 border rounded-lg focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 transition-all file:ml-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-secondary-50 file:text-secondary-700 hover:file:bg-secondary-100 ${
                                                errors.shop_images
                                                    ? "border-red-500 bg-red-50"
                                                    : "border-gray-200"
                                            }`}
                                            accept=".jpg,.jpeg,.png"
                                            multiple
                                            aria-label="Shop images upload"
                                        />
                                    </div>
                                    {errors.shop_images && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.shop_images}
                                        </p>
                                    )}
                                    <h3 className="text-sm text-xl text-gray-500 mt-1">
                                        د خپل دوکان تصویرونه اپلوډ کړئ
                                    </h3>

                                    {/* Shop Images Preview */}
                                    {shopImagesPreview.length > 0 && (
                                        <div className="mt-4 grid grid-cols-3 gap-3">
                                            {shopImagesPreview.map(
                                                (url, index) => (
                                                    <div
                                                        key={index}
                                                        className="relative h-24 rounded-lg overflow-hidden border border-secondary-200"
                                                    >
                                                        <img
                                                            src={
                                                                url ||
                                                                "/placeholder.svg" ||
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
                                    <label className="block text-2xl mb-2 font-medium text-gray-700">
                                        <FaFacebook className="inline ml-2 text-[#1877F2]" />
                                        د فیسبوک لینک
                                    </label>
                                    <input
                                        type="url"
                                        name="social_links.facebook"
                                        value={formData.social_links.facebook}
                                        onChange={handleChange}
                                        className="w-full p-3 border text-xl border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 transition-all shadow-input"
                                        placeholder="د فیسبوک پاڼه URL"
                                    />
                                    {errors["social_links.facebook"] && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors["social_links.facebook"]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-2xl mb-2 font-medium text-gray-700">
                                        <FaInstagram className="inline ml-2 text-[#E1306C]" />
                                        د انستګرام لینک
                                    </label>
                                    <input
                                        type="url"
                                        name="social_links.instagram"
                                        value={formData.social_links.instagram}
                                        onChange={handleChange}
                                        className="w-full text-xl p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 transition-all shadow-input"
                                        placeholder="د انستګرام پروفایل URL"
                                    />
                                    {errors["social_links.instagram"] && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors["social_links.instagram"]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-2xl mb-2 font-medium text-gray-700">
                                        <FaTelegram className="inline ml-2 text-[#0088cc]" />
                                        د ټلګرام لینک
                                    </label>
                                    <input
                                        type="url"
                                        name="social_links.telegram"
                                        value={formData.social_links.telegram}
                                        onChange={handleChange}
                                        className="w-full text-xl p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 transition-all shadow-input"
                                        placeholder="د ټلګرام چینل URL"
                                    />
                                    {errors["social_links.telegram"] && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors["social_links.telegram"]}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-start">
                        <button
                            type="submit"
                            className="flex text-xl items-center bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 text-white font-medium py-3 px-10 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                        >
                            
                            ثبت کول
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;

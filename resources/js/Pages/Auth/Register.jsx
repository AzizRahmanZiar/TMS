import { useState, useEffect } from "react";
import { useReg } from "@/Contexts/RegContext";
import { router, Link } from "@inertiajs/react";
import Toast from "@/Components/Toast";
import { motion } from "framer-motion";
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
    FaFacebook,
    FaInstagram,
    FaTelegram,
    FaUserPlus,
    FaSignInAlt,
} from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";

const Registration = ({ hasAdmin }) => {
    const { setReg } = useReg();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
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
                setToastMessage("ثبت نام مو په بریالیتوب سره وشو!");
                setShowToast(true);
                // Redirect to login page after successful registration
                setTimeout(() => {
                    router.visit("/login");
                }, 2000);
            },
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-10">
                <motion.div
                    className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white via-white to-primary-50/30 rounded-3xl shadow-2xl border border-white/50 backdrop-blur-sm"
                    dir="rtl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="text-center mb-10"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                            <FaUserPlus className="text-white text-3xl" />
                        </div>
                        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 font-zar mb-4">
                            ثبت نام
                        </h2>
                        <div className="h-1 w-32 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
                        <p className="text-gray-600 mt-4 text-lg font-zar">
                            د خپل حساب جوړولو لپاره لاندې معلومات ډک کړئ
                        </p>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        {/* Section 1: User Information */}
                        <motion.div
                            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            whileHover={{ y: -2 }}
                        >
                            <h3 className="text-2xl font-bold mb-8 text-gray-800 flex items-center font-zar">
                                <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full w-10 h-10 inline-flex items-center justify-center ml-3 shadow-lg">
                                    1
                                </span>
                                د کارکوونکي معلومات
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                >
                                    <label className="flex items-center text-lg font-semibold text-gray-700 mb-3 font-zar">
                                        <FaUser className="ml-2 text-primary-600" />
                                        نوم
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full p-4 border-2 text-lg rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md bg-white/80 backdrop-blur-sm ${
                                                errors.name
                                                    ? "border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50/50"
                                                    : "border-gray-200 focus:border-primary-500 focus:ring-primary-100 hover:border-gray-300"
                                            }`}
                                            placeholder="نوم ولیکئ"
                                        />
                                    </div>
                                    {errors.name && (
                                        <motion.p
                                            className="mt-3 text-sm text-red-600 flex items-center font-zar"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">
                                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                            </span>
                                            {errors.name}
                                        </motion.p>
                                    )}
                                </motion.div>

                                <div>
                                    <label className="block mb-2 text-xl font-medium text-gray-700">
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
                                    <label className="block mb-2 text-xl font-medium text-gray-700">
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
                                        {!hasAdmin && (
                                            <option value="admin">مدیر</option>
                                        )}
                                        <option value="tailor">خیاط</option>
                                        <option value="shopkeeper">
                                            دوکاندار
                                        </option>
                                        <option value="customer">مشتری</option>
                                    </select>
                                    {errors.role && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.role}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xl mb-2 font-medium text-gray-700">
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
                                        <div className="mt-2 h-24 w-24 rounded-full overflow-hidden border border-gray-200">
                                            <img
                                                src={
                                                    profileImagePreview ||
                                                    "/placeholder.svg" ||
                                                    "/placeholder.svg"
                                                }
                                                alt="Profile preview"
                                                className="h-full w-full"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xl mb-2 font-medium text-gray-700">
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
                        </motion.div>

                        {/* Section 2: Tailor Information (conditional) */}
                        {formData.role === "tailor" && (
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-xl md:text-xl font-semibold mb-6 text-gray-800 flex items-center">
                                    <span className="bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-600 rounded-full w-8 h-8 inline-flex items-center justify-center ml-2">
                                        2
                                    </span>
                                    د خیاط معلومات
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xl mb-2 font-medium text-gray-700">
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
                                        <label className="block text-xl mb-2 font-medium text-gray-700">
                                            <FaUserTie className="inline ml-2 text-accent-600" />
                                            مسلک
                                        </label>
                                        <select
                                            name="career"
                                            value={formData.career}
                                            onChange={handleChange}
                                            className={`w-full p-3 text-xl border rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-accent-500 transition-all shadow-input ${
                                                errors.career
                                                    ? "border-red-500 bg-red-50"
                                                    : "border-gray-200"
                                            }`}
                                        >
                                            <option value="">
                                                مسلک انتخاب کړئ
                                            </option>
                                            <option value="جامې">جامې</option>
                                            <option value="یونیفورم">
                                                یونیفورم
                                            </option>
                                            <option value="صدری">صدری</option>
                                            <option value="کورتی">کورتی</option>
                                        </select>
                                        {errors.career && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.career}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xl mb-2 font-medium text-gray-700">
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
                                        <label className="block text-xl mb-2 font-medium text-gray-700">
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
                                        <label className="block text-xl mb-2 font-medium text-gray-700">
                                            <FaTools className="inline ml-2 text-accent-600" />
                                            مهارتونه
                                        </label>
                                        <select
                                            name="skills"
                                            value={formData.skills}
                                            onChange={handleChange}
                                            className={`w-full p-3 text-xl border rounded-lg focus:ring-2 focus:ring-accent-100 focus:border-accent-500 transition-all shadow-input ${
                                                errors.skills
                                                    ? "border-red-500 bg-red-50"
                                                    : "border-gray-200"
                                            }`}
                                        >
                                            <option value="">
                                                ټول تخصصونه
                                            </option>
                                            <option value="جامې">جامې</option>
                                            <option value="یونیفورم">
                                                یونیفورم
                                            </option>
                                            <option value="صدری">صدری</option>
                                            <option value="کورتی">کورتی</option>
                                        </select>
                                        {errors.skills && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.skills}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xl mb-2 font-medium text-gray-700">
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
                                            <span className="text-gray-700 text-xl font-medium">
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
                                <h3 className="text-xl md:text-xl font-semibold mb-6 text-gray-800 flex items-center">
                                    <span className="bg-gradient-to-r from-accent-100 to-accent-200 text-accent-600 rounded-full w-8 h-8 inline-flex items-center justify-center ml-2">
                                        3
                                    </span>
                                    د خیاطۍ معلومات
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xl mb-2 font-medium text-gray-700">
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
                                        <label className="block text-xl mb-2 font-medium text-gray-700">
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
                                        <label className="block text-xl mb-2 font-medium text-gray-700">
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
                                        <label className="block text-xl mb-2 font-medium text-gray-700">
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
                                        <label className="block text-xl mb-2 font-medium text-gray-700">
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
                                        <label className="block text-xl mb-2 font-medium text-gray-700">
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
                                        <label className="block text-xl mb-2 font-medium text-gray-700">
                                            <FaClock className="inline ml-2 text-secondary-600" />
                                            د کار ساعتونه
                                        </label>
                                        <select
                                            name="working_hours"
                                            value={formData.working_hours}
                                            onChange={handleChange}
                                            className={`w-full p-3 text-xl border rounded-lg focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 transition-all shadow-input ${
                                                errors.working_hours
                                                    ? "border-red-500 bg-red-50"
                                                    : "border-gray-200"
                                            }`}
                                        >
                                            <option value="">
                                                د کار ساعتونه انتخاب کړئ
                                            </option>
                                            <option value="د ۸:۰۰ سهار څخه تر ۱۲:۰۰ ماسپښین پورې">
                                                د ۸:۰۰ سهار څخه تر ۱۲:۰۰ ماسپښین
                                                پورې
                                            </option>
                                            <option value="د ۸:۰۰ سهار څخه تر ۴:۰۰ ماسپښین پورې">
                                                د ۸:۰۰ سهار څخه تر ۴:۰۰ ماسپښین
                                                پورې
                                            </option>
                                        </select>
                                        {errors.working_hours && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.working_hours}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xl mb-2 font-medium text-gray-700">
                                            <FaTools className="inline ml-2 text-secondary-600" />
                                            وړاندې شوي خدمتونه
                                        </label>
                                        <select
                                            name="services"
                                            value={formData.services}
                                            onChange={handleChange}
                                            className={`w-full text-xl p-3 border rounded-lg focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 transition-all shadow-input ${
                                                errors.services
                                                    ? "border-red-500 bg-red-50"
                                                    : "border-gray-200"
                                            }`}
                                        >
                                            <option value="">
                                                خدماتو انتخاب کړئ
                                            </option>
                                            <option value="جامې">جامې</option>
                                            <option value="یونیفورم">
                                                یونیفورم
                                            </option>
                                            <option value="صدری">صدری</option>
                                            <option value="کورتی">کورتی</option>
                                        </select>
                                        {errors.services && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.services}
                                            </p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-xl mb-2 font-medium text-gray-700">
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
                                        <h3 className="text-sm text-gray-500 mt-1">
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
                                                                className="w-full h-full"
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xl mb-2 font-medium text-gray-700">
                                            <FaFacebook className="inline ml-2 text-[#1877F2]" />
                                            د فیسبوک لینک
                                        </label>
                                        <input
                                            type="url"
                                            name="social_links.facebook"
                                            value={
                                                formData.social_links.facebook
                                            }
                                            onChange={handleChange}
                                            className="w-full p-3 border text-xl border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 transition-all shadow-input"
                                            placeholder="د فیسبوک پاڼه URL"
                                        />
                                        {errors["social_links.facebook"] && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors[
                                                        "social_links.facebook"
                                                    ]
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xl mb-2 font-medium text-gray-700">
                                            <FaInstagram className="inline ml-2 text-[#E1306C]" />
                                            د انستګرام لینک
                                        </label>
                                        <input
                                            type="url"
                                            name="social_links.instagram"
                                            value={
                                                formData.social_links.instagram
                                            }
                                            onChange={handleChange}
                                            className="w-full text-xl p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 transition-all shadow-input"
                                            placeholder="د انستګرام پروفایل URL"
                                        />
                                        {errors["social_links.instagram"] && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors[
                                                        "social_links.instagram"
                                                    ]
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xl mb-2 font-medium text-gray-700">
                                            <FaTelegram className="inline ml-2 text-[#0088cc]" />
                                            د ټلګرام لینک
                                        </label>
                                        <input
                                            type="url"
                                            name="social_links.telegram"
                                            value={
                                                formData.social_links.telegram
                                            }
                                            onChange={handleChange}
                                            className="w-full text-xl p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-100 focus:border-secondary-500 transition-all shadow-input"
                                            placeholder="د ټلګرام چینل URL"
                                        />
                                        {errors["social_links.telegram"] && (
                                            <p className="text-red-500 text-sm mt-1">
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

                        <motion.div
                            className="flex flex-col space-y-6 mt-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            <motion.button
                                type="submit"
                                className={`w-full justify-center py-4 font-zar text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center transform hover:scale-[1.02] ${
                                    isSubmitted
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-secondary-500 to-primary-600 hover:from-secondary-600 hover:to-primary-700 text-white"
                                }`}
                                disabled={isSubmitted}
                                whileHover={!isSubmitted ? { y: -2 } : {}}
                                whileTap={!isSubmitted ? { scale: 0.98 } : {}}
                            >
                                <span className="mx-auto text-lg flex items-center font-semibold">
                                    {isSubmitted ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                            د ثبت نام په حال کې...
                                        </>
                                    ) : (
                                        <>
                                            ثبت کړئ
                                            <FaUserPlus className="mr-3 text-base" />
                                        </>
                                    )}
                                </span>
                            </motion.button>

                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.9, duration: 0.5 }}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500 font-zar">
                                            یا
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-center text-base font-zar">
                                    <span className="text-gray-600">
                                        که مخکې حساب لرئ،
                                    </span>
                                    <Link
                                        href={route("login")}
                                        className="text-primary-600 hover:text-primary-700 font-semibold mr-2 hover:underline transition-all duration-200"
                                    >
                                        نو داخل شئ
                                    </Link>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </div>

            {showToast && (
                <Toast
                    message={toastMessage}
                    type="success"
                    onClose={() => setShowToast(false)}
                    duration={2000}
                />
            )}
        </>
    );
};

export default Registration;

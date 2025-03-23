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
    const { setReg } = useReg();
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

    // Update the handleChange function to show errors in real-time when invalid characters are entered
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        const newErrors = { ...errors };

        if (type === "file") {
            // File handling code with additional validation for image types
            if (name === "shopImages") {
                const fileArray = Array.from(files);

                // Validate file types for shop images
                const invalidFiles = fileArray.filter(
                    (file) =>
                        !["image/jpeg", "image/jpg", "image/png"].includes(
                            file.type
                        )
                );

                if (invalidFiles.length > 0) {
                    newErrors.shopImages =
                        "فقط JPG، JPEG، او PNG فایلونه اجازه لري";
                } else {
                    newErrors.shopImages = null;
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
                }
            } else if (name === "profileImage") {
                if (files[0]) {
                    // Validate profile image file type
                    if (
                        !["image/jpeg", "image/jpg", "image/png"].includes(
                            files[0].type
                        )
                    ) {
                        newErrors.profileImage =
                            "فقط JPG، JPEG، او PNG فایلونه اجازه لري";
                    } else {
                        newErrors.profileImage = null;
                        setFormData({ ...formData, [name]: files[0] });

                        // Create preview URL for profile image
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setProfileImagePreview(reader.result);
                        };
                        reader.readAsDataURL(files[0]);
                    }
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
            // Handle nested objects like socialLinks
            const [parent, child] = name.split(".");
            setFormData({
                ...formData,
                [parent]: { ...formData[parent], [child]: value },
            });
        } else {
            // Handle different input types with specific validation
            let newValue = value;

            // For text fields that should only contain letters and spaces
            if (
                (name === "username" ||
                    name === "career" ||
                    name === "previousWork" ||
                    name === "tailoringName") &&
                type === "text"
            ) {
                // Check if the input contains anything other than letters and spaces
                if (/[^A-Za-z\s]/.test(value)) {
                    newErrors[name] = "فقط حروف او ځایونه اجازه لري";
                } else if (value.trim().length > 0 && value.trim().length < 3) {
                    newErrors[name] = "لږ تر لږه ۳ حروف باید وي";
                } else {
                    newErrors[name] = null;
                }
                // Filter out non-letters and spaces
                newValue = value.replace(/[^A-Za-z\s]/g, "");
            }

            // For fields that should only contain letters, spaces, and commas
            if (
                (name === "certifications" ||
                    name === "skills" ||
                    name === "services") &&
                type === "text"
            ) {
                // Check if the input contains anything other than letters, spaces, and commas
                if (/[^A-Za-z\s,]/.test(value)) {
                    newErrors[name] = "فقط حروف، ځایونه، او کامه اجازه لري";
                } else if (value.trim().length > 0 && value.trim().length < 3) {
                    newErrors[name] = "لږ تر لږه ۳ حروف باید وي";
                } else {
                    newErrors[name] = null;
                }
                // Filter out non-letters, spaces, and commas
                newValue = value.replace(/[^A-Za-z\s,]/g, "");
            }

            // For address field - allow more characters but still require minimum length
            if (name === "tailoringAddress" && type === "text") {
                if (value.trim().length > 0 && value.trim().length < 3) {
                    newErrors[name] = "لږ تر لږه ۳ حروف باید وي";
                } else {
                    newErrors[name] = null;
                }
            }

            // For number fields
            if (type === "number") {
                if (!/^\d*$/.test(value)) {
                    newErrors[name] = "فقط عددونه اجازه لري";
                } else {
                    newErrors[name] = null;
                }
            }

            // For contact number
            if (name === "contactNumber") {
                if (/[^0-9+\s]/.test(value)) {
                    newErrors[name] = "فقط عددونه، +، او ځایونه اجازه لري";
                } else {
                    newErrors[name] = null;
                }
                // Filter out non-numbers, +, and spaces
                newValue = value.replace(/[^0-9+\s]/g, "");
            }

            setFormData({ ...formData, [name]: newValue });
        }

        setErrors(newErrors);
    };

    // Update the validateForm function to make all fields required
    const validateForm = () => {
        const newErrors = {};

        // User information validation - stricter rules
        if (!formData.username.trim()) {
            newErrors.username = "د کارمند نوم ضروري دی";
        } else if (!/^[A-Za-z\s]+$/.test(formData.username)) {
            newErrors.username = "د کارمند نوم باید ��وازې حروف او ځایونه ولري";
        } else if (formData.username.trim().length < 3) {
            newErrors.username = "د کارمند نوم باید لږ تر لږه ۳ حروف ولري";
        }

        if (!formData.email.trim()) {
            newErrors.email = "بریښنالیک ضروري دی";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
        ) {
            newErrors.email = "بریښنالیک ناسم دی";
        }

        if (!formData.role) {
            newErrors.role = "د رول انتخاب ضروري دی";
        }

        if (!formData.password) {
            newErrors.password = "پټنوم ضروري دی";
        } else if (formData.password.length < 8) {
            newErrors.password = "پټنوم باید لږ تر لږه ۸ حروف ولري";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password =
                "پټنوم باید لوی حروف، کوچني حروف او عددونه ولري";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "د پټنوم تایید ضروري دی";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "پټنومونه سره سمون نه خوري";
        }

        if (!formData.profileImage) {
            newErrors.profileImage = "د پروفایل تصویر ضروري دی";
        }

        // Tailor information validation
        if (formData.role === "Tailor") {
            if (!formData.experience) {
                newErrors.experience = "تجربه ضروري ده";
            } else if (
                !/^\d+$/.test(formData.experience) ||
                Number(formData.experience) < 0
            ) {
                newErrors.experience = "تجربه باید مثبت عدد وي";
            }

            if (!formData.career) {
                newErrors.career = "د مسلک ساحه ضروري ده";
            } else if (!/^[A-Za-z\s]+$/.test(formData.career)) {
                newErrors.career = "د مسلک ساحه باید یوازې حروف او ځایونه ولري";
            } else if (formData.career.trim().length < 3) {
                newErrors.career = "د مسلک ساحه باید لږ تر لږه ۳ حروف ولري";
            }

            if (!formData.previousWork) {
                newErrors.previousWork = "مخکینی کار ضروري دی";
            } else if (!/^[A-Za-z\s]+$/.test(formData.previousWork)) {
                newErrors.previousWork =
                    "مخکینی کار باید یوازې حروف او ځایونه ولري";
            } else if (formData.previousWork.trim().length < 3) {
                newErrors.previousWork =
                    "مخکینی کار باید لږ تر لږه ۳ حروف ولري";
            }

            if (!formData.certifications) {
                newErrors.certifications = "تصدیقونه ضروري دي";
            } else if (!/^[A-Za-z\s,]+$/.test(formData.certifications)) {
                newErrors.certifications =
                    "تصدیقونه باید یوازې حروف، ځایونه، او کامه ولري";
            } else if (formData.certifications.trim().length < 3) {
                newErrors.certifications =
                    "تصدیقونه باید لږ تر لږه ۳ حروف ولري";
            }

            if (!formData.skills) {
                newErrors.skills = "مهارتونه ضروري دي";
            } else if (!/^[A-Za-z\s,]+$/.test(formData.skills)) {
                newErrors.skills =
                    "مهارتونه باید یوازې حروف، ځایونه، او کامه ولري";
            } else if (formData.skills.trim().length < 3) {
                newErrors.skills = "مهارتونه باید لږ تر لږه ۳ حروف ولري";
            }

            if (!formData.workAvailability) {
                newErrors.workAvailability = "د کار شتون ضروري دی";
            }
        }

        // Shop information validation
        if (formData.role === "Tailor" && formData.addShop) {
            if (!formData.tailoringName) {
                newErrors.tailoringName = "د دوکان نوم ضروري دی";
            } else if (!/^[A-Za-z\s]+$/.test(formData.tailoringName)) {
                newErrors.tailoringName =
                    "د دوکان نوم باید یوازې حروف او ځایونه ولري";
            } else if (formData.tailoringName.trim().length < 3) {
                newErrors.tailoringName =
                    "د دوکان نوم باید لږ تر لږه ۳ حروف ولري";
            }

            if (!formData.tailoringAddress) {
                newErrors.tailoringAddress = "د دوکان پته ضروري ده";
            } else if (formData.tailoringAddress.trim().length < 3) {
                newErrors.tailoringAddress =
                    "د دوکان پته باید لږ تر لږه ۳ حروف ولري";
            }

            if (!formData.contactNumber) {
                newErrors.contactNumber = "د اړیکې شمېره ضروري ده";
            } else if (
                !/^\+?[0-9]+$/.test(formData.contactNumber.replace(/\s/g, ""))
            ) {
                newErrors.contactNumber =
                    "د اړیکې شمېره باید یوازې عددونه او + نښه ولري";
            }

            if (!formData.shopEmail) {
                newErrors.shopEmail = "د دوکان بریښنالیک ضروري دی";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                    formData.shopEmail
                )
            ) {
                newErrors.shopEmail = "د دوکان بریښنالیک ناسم دی";
            }

            if (!formData.publishedYear) {
                newErrors.publishedYear = "د تاسیس کال ضروري دی";
            } else if (!/^\d+$/.test(formData.publishedYear)) {
                newErrors.publishedYear = "کال باید یوازې عددونه ولري";
            } else if (
                Number(formData.publishedYear) < 2000 ||
                Number(formData.publishedYear) > new Date().getFullYear()
            ) {
                newErrors.publishedYear = "مهرباني وکړئ یوه معتبر کال ولیکئ";
            }

            if (!formData.tailorCount) {
                newErrors.tailorCount = "د خیاطانو شمیر ضروري دی";
            } else if (!/^\d+$/.test(formData.tailorCount)) {
                newErrors.tailorCount = "د خیاطانو شمیر باید یوازې عددونه ولري";
            } else if (Number(formData.tailorCount) < 1) {
                newErrors.tailorCount = "د خیاطانو شمیر باید لږ تر لږه ۱ وي";
            }

            if (!formData.workingHours) {
                newErrors.workingHours = "د کار ساعتونه ضروري دي";
            }

            if (!formData.services) {
                newErrors.services = "خدمات ضروري دي";
            } else if (!/^[A-Za-z\s,]+$/.test(formData.services)) {
                newErrors.services =
                    "خدمات باید یوازې حروف، ځایونه، او کامه ولري";
            } else if (formData.services.trim().length < 3) {
                newErrors.services = "خدمات باید لږ تر لږه ۳ حروف ولري";
            }

            if (formData.paymentMethods.length === 0) {
                newErrors.paymentMethods = "یو تادیه میتود باید موجود وي";
            }

            if (!formData.shopImages || formData.shopImages.length === 0) {
                newErrors.shopImages = "د دوکان تصویرونه ضروري دي";
            }

            // Validate URLs and make them required
            if (!formData.socialLinks.facebook) {
                newErrors["socialLinks.facebook"] = "د فیسبوک لینک ضروري دی";
            }

            if (!formData.socialLinks.instagram) {
                newErrors["socialLinks.instagram"] =
                    "د انستاگرام لینک ضروري دی";
            }

            if (!formData.socialLinks.telegram) {
                newErrors["socialLinks.telegram"] = "د ټلګرام لینک ضروري دی";
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
            console.log("د فورم کې خطاوي موجودې دي");
        }
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
                                </select>
                                {errors.role && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.role}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">
                                    <FaUser className="inline ml-2 text-blue-600" />
                                    پروفایل
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        name="profileImage"
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                                            errors.profileImage
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        accept=".jpg,.jpeg,.png"
                                        aria-label="Profile image upload"
                                    />
                                </div>
                                {errors.profileImage && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.profileImage}
                                    </p>
                                )}
                                {profileImagePreview && (
                                    <div className="mt-2 h-16 w-16 rounded-full overflow-hidden border border-gray-200">
                                        <img
                                            src={
                                                profileImagePreview ||
                                                "/placeholder.svg" ||
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
                                        placeholder="جامې ..."
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
                                        placeholder="مخکیني کار"
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
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all ${
                                            errors.certifications
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
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
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaTools className="inline ml-2 text-gray-600" />
                                        مهارتونه
                                    </label>
                                    <input
                                        type="text"
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all ${
                                            errors.skills
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
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
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <MdWorkOutline className="inline ml-2 text-orange-600" />
                                        د کار وخت
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
                                        <option value="">وخت انتخاب کړئ</option>
                                        <option value="Full-time">
                                            مکمل وخت
                                        </option>
                                        <option value="Part-time">
                                            نیم وخت
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
                                        آدرس
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
                                        placeholder="مکمل آدرس"
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
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all ${
                                            errors.tailorCount
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        placeholder="د کار کوونکو خیاطان شمېر"
                                        min="1"
                                    />
                                    {errors.tailorCount && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.tailorCount}
                                        </p>
                                    )}
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
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all ${
                                            errors.publishedYear
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        placeholder="کله خیاطي تاسیس شوی"
                                        min="1900"
                                        max={new Date().getFullYear()}
                                    />
                                    {errors.publishedYear && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.publishedYear}
                                        </p>
                                    )}
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
                                        د خیاطۍ ایمیل
                                    </label>
                                    <input
                                        type="email"
                                        name="shopEmail"
                                        value={formData.shopEmail}
                                        onChange={handleChange}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all ${
                                            errors.shopEmail
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        placeholder="د خیاطۍ ایمیل آدرس"
                                    />
                                    {errors.shopEmail && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.shopEmail}
                                        </p>
                                    )}
                                </div>
                                {/* Add error display for working hours */}
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
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all ${
                                            errors.workingHours
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        placeholder="لکه: دوشنبه-جمعه: 9AM-6PM"
                                    />
                                    {errors.workingHours && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.workingHours}
                                        </p>
                                    )}
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
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all ${
                                            errors.services
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        placeholder="صدر, کورتی ..."
                                    />
                                    {errors.services && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.services}
                                        </p>
                                    )}
                                </div>

                                {/* Add error display for payment methods */}
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
                                    {errors.paymentMethods && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.paymentMethods}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaImage className="inline ml-2 text-violet-600" />
                                        د خیاطۍ تصویر
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            name="shopImages"
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all file:ml-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 ${
                                                errors.shopImages
                                                    ? "border-red-500 bg-red-50"
                                                    : "border-gray-300"
                                            }`}
                                            accept=".jpg,.jpeg,.png"
                                            multiple
                                            aria-label="Shop images upload"
                                        />
                                    </div>
                                    {errors.shopImages && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.shopImages}
                                        </p>
                                    )}
                                    <p className="text-sm text-gray-500 mt-1">
                                        د خپل دوکان تصویرونه اپلوډ کړئ
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
                                                                "/placeholder.svg" ||
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
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaFacebook className="inline ml-2 text-[#1877F2]" />
                                        د فیسبوک لینک
                                    </label>
                                    <input
                                        type="url"
                                        name="socialLinks.facebook"
                                        value={formData.socialLinks.facebook}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                                        placeholder="د فیسبوک پاڼه URL"
                                    />
                                    {errors["socialLinks.facebook"] && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors["socialLinks.facebook"]}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaInstagram className="inline ml-2 text-[#E1306C]" />
                                        د انستګرام لینک
                                    </label>
                                    <input
                                        type="url"
                                        name="socialLinks.instagram"
                                        value={formData.socialLinks.instagram}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                                        placeholder="د انستګرام پروفایل URL"
                                    />
                                    {errors["socialLinks.instagram"] && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors["socialLinks.instagram"]}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        <FaTelegram className="inline ml-2 text-[#0088cc]" />
                                        د ټلګرام لینک
                                    </label>
                                    <input
                                        type="url"
                                        name="socialLinks.telegram"
                                        value={formData.socialLinks.telegram}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                                        placeholder="د ټلګرام چینل URL"
                                    />
                                    {errors["socialLinks.telegram"] && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors["socialLinks.telegram"]}
                                        </p>
                                    )}
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
            </div>
        </div>
    );
};

export default Registration;

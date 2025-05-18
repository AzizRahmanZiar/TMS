import Map from "../../Components/Map";
import { useState } from "react";
import SiteLayout from "../../Layouts/SiteLayout";
import { motion } from "framer-motion";
import {
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaClock,
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
} from "react-icons/fa";
import { router, usePage } from "@inertiajs/react";
import { useMessages } from "../../Contexts/MessagesContext";

const Contact = () => {
    const { flash } = usePage().props;
    const { messages, setMessages } = useMessages();
    // State for form
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    // State for form errors
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    // Update the patterns object to have more precise patterns for English and Pashto
    const patterns = {
        // Patterns for text fields (name, subject, message)
        englishText: /^[a-zA-Z\s]+$/, // Only English letters and spaces
        pashtoText: /^[\u0600-\u06FF\s]+$/, // Only Pashto/Arabic characters and spaces

        // Patterns for phone numbers
        englishPhone: /^[\d\s+-]+$/, // Only English digits and some symbols
        pashtoPhone: /^[\u06F0-\u06F9\s+-]+$/, // Only Pashto digits and some symbols

        // Email pattern remains the same
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    };

    // Update error messages to be more specific
    const errorMessages = {
        required: "دا ساحه اړینه ده",
        invalidText:
            "یوازې انګلیسي یا پښتو متن اجازه لري، مخلوط متن اجازه نلري",
        invalidEmail: "د بریښنالیک بڼه سمه نه ده",
        invalidPhone:
            "یوازې انګلیسي یا پښتو شمیرې اجازه لري، مخلوط شمیرې اجازه نلري",
        minLength: "لږترلږه ۳ توري اړین دي",
        mixedScript: "د انګلیسي او پښتو ګډول اجازه نلري",
    };

    // Update the validateField function with more precise validation
    const validateField = (name, value) => {
        let error = "";

        if (!value.trim()) {
            error = errorMessages.required;
        } else {
            switch (name) {
                case "name":
                case "subject":
                case "message":
                    // Check if it contains ONLY English text OR ONLY Pashto text
                    const isEnglishText = patterns.englishText.test(value);
                    const isPashtoText = patterns.pashtoText.test(value);

                    if (!(isEnglishText || isPashtoText)) {
                        error = errorMessages.invalidText;
                    } else if (name !== "message" && value.trim().length < 3) {
                        error = errorMessages.minLength;
                    } else if (name === "message" && value.trim().length < 10) {
                        error = "لږترلږه ۱۰ توري اړین دي";
                    }
                    break;

                case "email":
                    if (!patterns.email.test(value)) {
                        error = errorMessages.invalidEmail;
                    }
                    break;

                case "phone":
                    if (value) {
                        // Check if it contains ONLY English digits OR ONLY Pashto digits
                        const isEnglishPhone =
                            patterns.englishPhone.test(value);
                        const isPashtoPhone = patterns.pashtoPhone.test(value);

                        if (!(isEnglishPhone || isPashtoPhone)) {
                            error = errorMessages.invalidPhone;
                        }
                    }
                    break;

                default:
                    break;
            }
        }

        return error;
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Validate on change
        setErrors({
            ...errors,
            [name]: validateField(name, value),
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {};
        let hasError = false;

        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            newErrors[key] = error;
            if (error) hasError = true;
        });

        setErrors(newErrors);

        // If no errors, submit the form
        if (!hasError) {
            // Add message to context
            const newMessage = {
                ...formData,
                id: Date.now(),
                created_at: new Date().toISOString()
            };
            setMessages([...messages, newMessage]);
            
            // Reset form
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });
            setErrors({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });
        }
    };

    // Contact information
    const contactInfo = [
        {
            icon: <FaMapMarkerAlt className="text-indigo-600" />,
            title: "زموږ موقعیت",
            details: [
                "۱۲۳ارګ بازار",
                "خیـــــــــــاطی",
                "کــــــــــــندهار، افغانستان",
            ],
        },
        {
            icon: <FaPhone className="text-indigo-600" />,
            title: "د تلیفون شمیره",
            details: ["+93 70 123 4567", "+93 70 987 6543"],
        },
        {
            icon: <FaEnvelope className="text-indigo-600" />,
            title: "بریښنالیک",
            details: ["info@tailormaster.com", "support@tailormaster.com"],
        },
        {
            icon: <FaClock className="text-indigo-600" />,
            title: "د کار ساعتونه",
            details: [
                "دوشنبه - جمعه: ۹ بجې - ۶ بجې",
                "شنبه: ۱۰ بجې - ۴ بجې",
                "یکشنبه: تړلی",
            ],
        },
    ];

    // Social media links
    const socialLinks = [
        {
            icon: <FaFacebook className="text-blue-600 hover:text-white" />,
            url: "#",
            name: "فیسبوک",
        },
        {
            icon: <FaTwitter className="text-black hover:text-white" />,
            url: "#",
            name: "ټویټر",
        },
        {
            icon: <FaInstagram className="text-red-700 hover:text-white" />,
            url: "#",
            name: "انسټاګرام",
        },
        {
            icon: <FaLinkedin className="text-blue-600 hover:text-white" />,
            url: "#",
            name: "لینکډین",
        },
    ];

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <SiteLayout title="اړیکه - خیاط ماسټر">
            {/* Hero Section */}
            <motion.section
                className="bg-gradient-to-r from-primary-50 to-primary-100 text-primary-900 py-20"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="mx-auto px-4 ">
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold font-zar max-w-3xl mx-auto  mb-4"
                        variants={fadeIn}
                    >
                        زموږ سره اړیکه
                    </motion.h1>
                    <motion.p
                        className="text-xl font-zar md:text-2xl max-w-3xl mx-auto"
                        variants={fadeIn}
                    >
                        پوښتنې لرئ یا مرستې ته اړتیا لرئ؟ موږ دلته یو چې مرسته
                        وکړو. زموږ ټیم سره اړیکه ونیسئ.
                    </motion.p>
                </div>
            </motion.section>

            {/* Contact Information */}
            <section className="py-16" dir="ltr">
                <div className="mx-auto px-4">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-lg border border-primary-100 hover:border-primary-300 transition-all duration-300"
                                variants={fadeIn}
                                whileHover={{
                                    scale: 1.03,
                                    transition: { duration: 0.2 },
                                }}
                            >
                                <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4 mx-auto">
                                    {info.icon}
                                </div>
                                <h3 className="text-2xl font-zar font-bold text-tertiary-800 mb-3 text-center">
                                    {info.title}
                                </h3>
                                <div className="text-primary-600 text-center">
                                    {info.details.map((detail, idx) => (
                                        <p key={idx} className="mb-1">
                                            {detail}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Contact Form and Map */}
            <section className="py-16 bg-gradient-to-b from-primary-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Contact Form */}
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold font-zar text-primary-800  mb-6">
                                موږ ته پیغام ولیږئ
                            </h2>
                            <form
                                onSubmit={handleSubmit}
                                className="bg-white p-6 rounded-lg shadow-lg border border-primary-100"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label
                                            className="block text-primary-700 mb-2"
                                            htmlFor="name"
                                        >
                                            بشپړ نوم
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full p-3 border outline-none rounded-md focus:ring-2 focus:ring-primary-300 transition-all ${
                                                errors.name
                                                    ? "border-red-500"
                                                    : "border-primary-300"
                                            }`}
                                            placeholder="ستاسو بشپړ نوم"
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            className="block text-primary-700 mb-2"
                                            htmlFor="email"
                                        >
                                            بریښنالیک
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full p-3 border outline-none rounded-md focus:ring-2 focus:ring-primary-300 transition-all ${
                                                errors.email
                                                    ? "border-red-500"
                                                    : "border-primary-300"
                                            }`}
                                            placeholder="ستاسو بریښنالیک"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label
                                            className="block text-primary-700 mb-2"
                                            htmlFor="phone"
                                        >
                                            د تلیفون شمیره
                                        </label>
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`w-full p-3 border outline-none rounded-md focus:ring-2 focus:ring-primary-300 transition-all ${
                                                errors.phone
                                                    ? "border-red-500"
                                                    : "border-primary-300"
                                            }`}
                                            placeholder="ستاسو د تلیفون شمیره"
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            className="block text-primary-700 mb-2"
                                            htmlFor="subject"
                                        >
                                            موضوع
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className={`w-full p-3 border outline-none rounded-md focus:ring-2 focus:ring-primary-300 transition-all ${
                                                errors.subject
                                                    ? "border-red-500"
                                                    : "border-primary-300"
                                            }`}
                                            placeholder="د پیغام موضوع"
                                        />
                                        {errors.subject && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.subject}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label
                                        className="block text-primary-700 mb-2"
                                        htmlFor="message"
                                    >
                                        پیغام
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`w-full p-3 border outline-none rounded-md focus:ring-2 focus:ring-primary-300 transition-all ${
                                            errors.message
                                                ? "border-red-500"
                                                : "border-primary-300"
                                        }`}
                                        placeholder="ستاسو پیغام"
                                        rows="5"
                                    ></textarea>
                                    {errors.message && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                <motion.button
                                    type="submit"
                                    className="font-bold px-6 py-3 rounded-md font-zar text-xl bg-secondary-700  text-white  hover:bg-secondary-800 transition-all duration-300 shadow-md hover:shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    پیغام ولیږئ
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Map */}
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold font-zar text-primary-800 mb-6">
                                زموږ موقعیت
                            </h2>
                            <div className="rounded-lg overflow-hidden shadow-lg border border-primary-100">
                                <Map />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Social Media */}
            <section className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <motion.h2
                        className="text-3xl font-bold font-zar text-primary-800  mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        زموږ سره وصل شئ
                    </motion.h2>
                    <motion.div
                        className="flex justify-center gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.url}
                                className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-2xl hover:bg-secondary-700 transition-all duration-300 shadow-md"
                                aria-label={social.name}
                                variants={fadeIn}
                                whileHover={{
                                    scale: 1.2,
                                    rotate: 5,
                                    backgroundColor: "#4F46E5",
                                    color: "#FFFFFF",
                                }}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Live Chat */}
            <motion.section
                className="py-16 bg-gradient-to-b from-white to-primary-50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold font-zar text-primary-800 mb-4">
                        سمدستي مرستې ته اړتیا لرئ؟
                    </h2>
                    <p className="text-primary-600 mb-8 max-w-2xl text-xl font-zar md:text-2xl mx-auto">
                        زموږ د پیرودونکو د ملاتړ ټیم ستاسو د هر ډول پوښتنو یا
                        اندیښنو په اړه د مرستې لپاره شتون لري.
                    </p>
                    <motion.button
                        className="font-bold px-6 py-3 rounded-md font-zar text-xl bg-secondary-700 text-white  hover:bg-secondary-800 transition-all duration-300 shadow-lg"
                        whileHover={{
                            scale: 1.05,
                            boxShadow:
                                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ژوندی چیټ پیل کړئ
                    </motion.button>
                </div>
            </motion.section>
        </SiteLayout>
    );
};

export default Contact;

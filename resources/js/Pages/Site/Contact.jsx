import Map from "../../Components/Map";
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
import { router, usePage, useForm } from "@inertiajs/react";

const Contact = () => {
    const { auth } = usePage().props;

    // Use Inertia form
    const { data, setData, post, processing, errors, reset } = useForm({
        phone: "",
        subject: "",
        message: "",
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if user is authenticated
        if (!auth.user) {
            router.visit("/login");
            return;
        }

        post(route("messages.store"), {
            onSuccess: () => {
                // Reset form
                reset();
            },
        });
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
                className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20 relative overflow-hidden"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
                    <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full"></div>
                    <div className="absolute bottom-20 left-32 w-12 h-12 bg-white rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold font-zar mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        زموږ سره اړیکه
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-primary-100 font-zar max-w-4xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        پوښتنې لرئ یا مرستې ته اړتیا لرئ؟ موږ دلته یو چې مرسته
                        وکړو. زموږ ټیم سره اړیکه ونیسئ او د خپلو اړتیاوو لپاره
                        غوره حل ومومئ.
                    </motion.p>
                </div>
            </motion.section>

            {/* Contact Information */}
            <section
                className="py-20 bg-gradient-to-b from-gray-50 to-white"
                dir="ltr"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold font-zar text-primary-800 mb-4">
                            د اړیکو معلومات
                        </h2>
                        <p className="text-lg text-primary-600 font-zar max-w-2xl mx-auto">
                            موږ سره د مختلفو لارو څخه اړیکه ونیسئ
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-primary-100 hover:border-primary-300 transition-all duration-500 overflow-hidden"
                                variants={fadeIn}
                                whileHover={{
                                    scale: 1.05,
                                    y: -5,
                                    transition: { duration: 0.3 },
                                }}
                            >
                                {/* Background Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <div className="text-white text-xl">
                                            {info.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-zar font-bold text-primary-800 mb-4 text-center group-hover:text-primary-600 transition-colors duration-300">
                                        {info.title}
                                    </h3>
                                    <div className="text-primary-600 text-center space-y-2">
                                        {info.details.map((detail, idx) => (
                                            <p
                                                key={idx}
                                                className="text-sm leading-relaxed"
                                            >
                                                {detail}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                {/* Floating decoration */}
                                <div className="absolute top-4 right-4 w-3 h-3 bg-primary-400 rounded-full opacity-60 group-hover:animate-pulse"></div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Contact Form and Map */}
            <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Contact Form */}
                        <motion.div
                            className="order-2 lg:order-1"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold font-zar text-primary-800 mb-4">
                                    موږ ته پیغام ولیږئ
                                </h2>
                                <p className="text-lg text-primary-600 font-zar">
                                    ستاسو نظرونه او پوښتنې زموږ لپاره مهم دي
                                </p>
                            </div>
                            {!auth.user ? (
                                <motion.div
                                    className="bg-gradient-to-br from-white to-primary-50 p-8 rounded-2xl shadow-xl border border-primary-200 text-center"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <FaUser className="text-white text-xl" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-800 mb-4 font-zar">
                                        د پیغام د لېږلو لپاره ننوتل اړین دي
                                    </h3>
                                    <p className="text-primary-600 mb-6 font-zar">
                                        لومړی باید خپل حساب ته ننوتل شئ
                                    </p>
                                    <motion.button
                                        onClick={() => router.visit("/login")}
                                        className="bg-gradient-to-r from-secondary-600 to-secondary-700 text-white px-8 py-4 rounded-xl font-bold font-zar text-lg hover:from-secondary-700 hover:to-secondary-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        ننوتل
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    onSubmit={handleSubmit}
                                    className="bg-gradient-to-br from-white to-primary-50 p-8 rounded-2xl shadow-xl border border-primary-200"
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            <label
                                                className="block text-primary-800 mb-3 font-semibold font-zar"
                                                htmlFor="phone"
                                            >
                                                <FaPhone className="inline ml-2 text-primary-600" />
                                                د تلیفون شمیره
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="phone"
                                                    name="phone"
                                                    value={data.phone}
                                                    onChange={handleChange}
                                                    className={`w-full p-4 border-2 outline-none rounded-xl focus:ring-4 focus:ring-primary-200 transition-all duration-300 bg-white/80 backdrop-blur-sm font-zar ${
                                                        errors.phone
                                                            ? "border-red-500 focus:border-red-500"
                                                            : "border-primary-200 focus:border-primary-500"
                                                    }`}
                                                    placeholder="د بیلګې په توګه: 0701234567"
                                                />
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FaPhone className="h-5 w-5 text-primary-400" />
                                                </div>
                                            </div>
                                            {errors.phone && (
                                                <motion.p
                                                    className="text-red-500 text-sm mt-2 font-zar"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                >
                                                    {errors.phone}
                                                </motion.p>
                                            )}
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                            viewport={{ once: true }}
                                        >
                                            <label
                                                className="block text-primary-800 mb-3 font-semibold font-zar"
                                                htmlFor="subject"
                                            >
                                                <FaEnvelope className="inline ml-2 text-primary-600" />
                                                موضوع
                                            </label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={data.subject}
                                                onChange={handleChange}
                                                className={`w-full p-4 border-2 outline-none rounded-xl focus:ring-4 focus:ring-primary-200 transition-all duration-300 bg-white/80 backdrop-blur-sm font-zar ${
                                                    errors.subject
                                                        ? "border-red-500 focus:border-red-500"
                                                        : "border-primary-200 focus:border-primary-500"
                                                }`}
                                                placeholder="د پیغام موضوع"
                                            />
                                            {errors.subject && (
                                                <motion.p
                                                    className="text-red-500 text-sm mt-2 font-zar"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                >
                                                    {errors.subject}
                                                </motion.p>
                                            )}
                                        </motion.div>
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
                                            value={data.message}
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
                                        disabled={processing}
                                        className={`font-bold px-6 py-3 rounded-md font-zar text-xl transition-all duration-300 shadow-md hover:shadow-lg ${
                                            processing
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-secondary-700 text-white hover:bg-secondary-800"
                                        }`}
                                        whileHover={
                                            !processing ? { scale: 1.05 } : {}
                                        }
                                        whileTap={
                                            !processing ? { scale: 0.95 } : {}
                                        }
                                    >
                                        {processing
                                            ? "لیږل کیږي..."
                                            : "پیغام ولیږئ"}
                                    </motion.button>
                                </motion.form>
                            )}
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

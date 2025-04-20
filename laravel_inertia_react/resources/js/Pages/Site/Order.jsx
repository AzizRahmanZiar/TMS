import React, { useState } from "react";
import SiteLayout from "../../Layouts/SiteLayout";
import { motion } from "framer-motion";
import {
    FaRuler,
    FaShoppingBag,
    FaTshirt,
    FaClipboardCheck,
} from "react-icons/fa";

const Order = () => {
    // State for form
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        clothingType: "",
        fabric: "",
        color: "",
        size: "",
        height: "",
        chest: "",
        waist: "",
        hips: "",
        shoulders: "",
        sleeves: "",
        inseam: "",
        deliveryDate: "",
        specialInstructions: "",
        tailor: "",
        shop: "",
    });

    // Sample data for tailors and shops
    const tailors = [
        { id: 1, name: "احمد رحیمي" },
        { id: 2, name: "محمد کریمي" },
        { id: 3, name: "فاطمه احمدي" },
        { id: 4, name: "یوسف حکیمي" },
        { id: 5, name: "زینب نوري" },
    ];

    const shops = [
        { id: 1, name: "د احمد خیاطي" },
        { id: 2, name: "د کریمي خیاطي" },
        { id: 3, name: "د واده جامو مرکز" },
        { id: 4, name: "عصري فیشن" },
        { id: 5, name: "د ماشومانو جامې" },
    ];

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log("Form submitted:", formData);
        alert("ستاسو فرمایش په بریالیتوب سره ثبت شو!");
        // Reset form or redirect
    };

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
                staggerChildren: 0.1,
            },
        },
    };

    const formAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", damping: 15 },
        },
    };

    return (
        <SiteLayout title="فرمایش - خیاط ماسټر">
            {/* Hero Section */}
            <motion.section
                className="bg-primary-50 text-primary-900 py-12"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className=" mx-auto px-4">
                    <motion.h1
                        className="text-3xl md:text-4xl max-w-3xl mx-auto  font-bold mb-4"
                        variants={fadeIn}
                    >
                        فرمایش ورکړئ
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl max-w-3xl mx-auto"
                        variants={fadeIn}
                    >
                        د خپلې خوښې جامې فرمایش ورکړئ. موږ به یې ستاسو د اندازو
                        سره سم جوړې کړو.
                    </motion.p>
                </div>
            </motion.section>

            {/* Order Form */}
            <section className="py-12">
                <div className="mx-auto px-4">
                    <motion.div
                        className="max-w-4xl mx-auto bg-white p-8 rounded-lg border shadow-lg"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", damping: 15 }}
                        viewport={{ once: true }}
                    >
                        <motion.h2
                            className="text-2xl font-bold mb-6 text-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            د فرمایش فورمه
                        </motion.h2>

                        <motion.form
                            onSubmit={handleSubmit}
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {/* Personal Information */}
                            <motion.div
                                className="mb-8"
                                variants={formAnimation}
                            >
                                <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
                                    شخصي معلومات
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                        }}
                                    >
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="name"
                                        >
                                            نوم
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full p-3 border outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-secondary-300 focus:border-secondary-500 transition-all"
                                            required
                                        />
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                        }}
                                    >
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="phone"
                                        >
                                            د تلیفون شمیره
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full p-3 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary-300 focus:border-secondary-500 transition-all"
                                            required
                                        />
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                        }}
                                    >
                                        <label
                                            className="block text-gray-700 mb-2"
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
                                            className="w-full p-3 border outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-secondary-300 focus:border-secondary-500 transition-all"
                                        />
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                        }}
                                    >
                                        <label
                                            className="block text-gray-700 mb-2"
                                            htmlFor="address"
                                        >
                                            آدرس
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full p-3 border outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-secondary-300 focus:border-secondary-500 transition-all"
                                            required
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <button
                                    type="submit"
                                    className="bg-secondary-600 text-white py-3 px-8 rounded-md font-medium hover:bg-secondary-700 transition shadow-md"
                                >
                                    فرمایش ثبت کړئ
                                </button>
                            </motion.div>
                        </motion.form>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-2xl font-bold text-center mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        عمومي پوښتنې
                    </motion.h2>
                    <motion.div
                        className="max-w-3xl mx-auto"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="mb-6 bg-white p-6 rounded-lg shadow-md"
                            variants={fadeIn}
                            whileHover={{
                                y: -5,
                                boxShadow:
                                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                            }}
                        >
                            <h3 className="text-lg font-semibold mb-2">
                                د فرمایش ورکولو وروسته څومره وخت نیسي؟
                            </h3>
                            <p className="text-gray-700">
                                د جامو د ډول او پیچلتیا په اساس، معمولاً د ۷-۱۴
                                ورځو پورې وخت نیسي. د واده جامې ممکن تر ۳۰ ورځو
                                پورې وخت ونیسي.
                            </p>
                        </motion.div>

                        <motion.div
                            className="mb-6 bg-white p-6 rounded-lg shadow-md"
                            variants={fadeIn}
                            whileHover={{
                                y: -5,
                                boxShadow:
                                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                            }}
                        >
                            <h3 className="text-lg font-semibold mb-2">
                                آیا تاسو د رسولو خدمت لرئ؟
                            </h3>
                            <p className="text-gray-700">
                                هو، موږ د ښار په دننه کې وړیا رسول لرو. د ښار
                                څخه بهر رسول د واټن په اساس اضافي لګښت لري.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-md"
                            variants={fadeIn}
                            whileHover={{
                                y: -5,
                                boxShadow:
                                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                            }}
                        >
                            <h3 className="text-lg font-semibold mb-2">
                                که چیرې جامې زما په اندازه برابرې نه وي څه به
                                وشي؟
                            </h3>
                            <p className="text-gray-700">
                                موږ د کیفیت تضمین وړاندې کوو. که چیرې جامې ستاسو
                                په اندازه برابرې نه وي، موږ به یې وړیا بدل کړو.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </SiteLayout>
    );
};

export default Order;

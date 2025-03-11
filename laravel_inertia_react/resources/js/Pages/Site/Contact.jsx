import Map from "../../Components/Map";
import { useState } from "react";
import SiteLayout from "../../Layouts/SiteLayout";
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

const Contact = () => {
    // State for form
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

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
        alert("پیغام په بریالیتوب سره ولیږل شو!");
        // Reset form
        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        });
    };

    // Contact information
    const contactInfo = [
        {
            icon: <FaMapMarkerAlt className="text-indigo-600" />,
            title: "زموږ موقعیت",
            details: ["۱۲۳ د خیاط سړک", "د فیشن سیمه", "کابل، افغانستان"],
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

    return (
        <SiteLayout title="اړیکه - خیاط ماسټر">
            {/* Hero Section */}
            <section className="bg-primary-50 text-primary-900 py-20 m">
                <div className=" mx-auto px-4 text-center ">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        زموږ سره اړیکه
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">
                        پوښتنې لرئ یا مرستې ته اړتیا لرئ؟ موږ دلته یو چې مرسته
                        وکړو. زموږ ټیم سره اړیکه ونیسئ.
                    </p>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-16">
                <div className=" mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-lg border"
                            >
                                <div className="w-12  h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                                    {info.icon}
                                </div>
                                <h3 className="text-xl text-tertiary-800 font-bold mb-3">
                                    {info.title}
                                </h3>
                                <div className="text-primary-600">
                                    {info.details.map((detail, idx) => (
                                        <p key={idx} className="mb-1">
                                            {detail}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form and Map */}
            <section className="py-16 bg-primary-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Contact Form */}
                        <div className="lg:w-1/2 ">
                            <h2 className="text-2xl text-primary-800 font-bold mb-6">
                                موږ ته پیغام ولیږئ
                            </h2>
                            <form
                                onSubmit={handleSubmit}
                                className="bg-white p-6 rounded-lg border"
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
                                            className="w-full p-3 border border-primary-300 rounded-md"
                                            placeholder="ستاسو بشپړ نوم"
                                            required
                                        />
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
                                            className="w-full p-3 border border-primary-300 rounded-md"
                                            placeholder="ستاسو بریښنالیک"
                                            required
                                        />
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
                                            className="w-full p-3 border border-primary-300 rounded-md"
                                            placeholder="ستاسو د تلیفون شمیره"
                                        />
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
                                            className="w-full p-3 border border-primary-300 rounded-md"
                                            placeholder="د پیغام موضوع"
                                            required
                                        />
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
                                        className="w-full p-3 border border-primary-300 rounded-md"
                                        placeholder="ستاسو پیغام"
                                        rows="5"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="bg-secondary-700 text-white py-3 px-6 rounded-md font-medium hover:bg-secondary-800 transition"
                                >
                                    پیغام ولیږئ
                                </button>
                            </form>
                        </div>

                        {/* Map */}
                        <div className="lg:w-1/2">
                            <h2 className="text-2xl text-primary-800 font-bold mb-6">
                                زموږ موقعیت
                            </h2>
                            <Map />
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Media */}
            <section className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl text-primary-800 font-bold mb-8">
                        زموږ سره وصل شئ
                    </h2>
                    <div className="flex justify-center gap-6">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                className="w-14 h-14 rounded-full bg-primary-100  flex items-center justify-center text-2xl hover:bg-secondary-700  transition"
                                aria-label={social.name}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Live Chat */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl text-primary-800 font-bold mb-4">
                        سمدستي مرستې ته اړتیا لرئ؟
                    </h2>
                    <p className="text-primary-600 mb-8 max-w-2xl mx-auto">
                        زموږ د پیرودونکو د ملاتړ ټیم ستاسو د هر ډول پوښتنو یا
                        اندیښنو په اړه د مرستې لپاره شتون لري.
                    </p>
                    <button className="bg-secondary-700 text-white py-3 px-8 rounded-md font-medium hover:bg-secondary-800 transition">
                        ژوندی چیټ پیل کړئ
                    </button>
                </div>
            </section>
        </SiteLayout>
    );
};

export default Contact;

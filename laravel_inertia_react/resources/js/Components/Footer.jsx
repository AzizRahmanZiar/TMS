import React from "react";
import { Link } from "@inertiajs/react";
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-tertiary-950 text-white pt-12 pb-8" dir="rtl">
            <div className="md:px-20 mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl text-primary-50 font-bold mb-4">
                            خیاط ماسټر
                        </h3>
                        <p className="text-primary-50 mb-4">
                            موږ د تجربه لرونکو مسلکي کسانو سره د لوړ کیفیت خیاطۍ
                            خدمتونه وړاندې کوو ترڅو ستاسو د جامو ټولې اړتیاوې
                            پوره کړو.
                        </p>
                        <div className="flex gap-5 ">
                            <a
                                href="#"
                                className="text-primary-50 hover:text-white transition"
                            >
                                <FaFacebook size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-primary-50 hover:text-white transition"
                            >
                                <FaTwitter size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-primary-50 hover:text-white transition"
                            >
                                <FaInstagram size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-primary-50 hover:text-white transition"
                            >
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">چټک لینکونه</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="text-primary-50 hover:text-white transition"
                                >
                                    کور
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tailors"
                                    className="text-primary-50 hover:text-white transition"
                                >
                                    خیاطان
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tailoring-shop"
                                    className="text-primary-50 hover:text-white transition"
                                >
                                    دوکانونه
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/post"
                                    className="text-primary-50 hover:text-white transition"
                                >
                                    پوسټونه
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-primary-50 hover:text-white transition"
                                >
                                    زموږ په اړه
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-primary-50 hover:text-white transition"
                                >
                                    اړیکه
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">خدمتونه</h3>
                        <ul className="space-y-2">
                            <li className="text-primary-50 hover:text-white transition">
                                ځانګړي خیاطي
                            </li>
                            <li className="text-primary-50 hover:text-white transition">
                                بدلونونه
                            </li>
                            <li className="text-primary-50 hover:text-white transition">
                                د واده جامې
                            </li>
                            <li className="text-primary-50 hover:text-white transition">
                                دودیزې جامې
                            </li>
                            <li className="text-primary-50 hover:text-white transition">
                                عصري فیشن
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">
                            زموږ سره اړیکه
                        </h3>
                        <ul className="space-y-2">
                            <li className="flex items-center text-primary-50">
                                <FaMapMarkerAlt className="ml-2" />
                                ۱۲۳ د خیاط سړک، فیشن ښار
                            </li>
                            <li className="flex items-center text-primary-50">
                                <FaPhone className="ml-2" />
                                +123 456 7890
                            </li>
                            <li className="flex items-center text-primary-50">
                                <FaEnvelope className="ml-2" />
                                info@tailormaster.com
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-primary-50">
                    <p>
                        د چاپ حق © {new Date().getFullYear()} خیاط ماسټر. ټول
                        حقوق خوندي دي.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

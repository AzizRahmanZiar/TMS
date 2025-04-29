import { motion } from "framer-motion";
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
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 10 },
        },
    };

    const linkVariants = {
        hover: {
            scale: 1.05,
            color: "#ffffff",
            transition: { type: "spring", stiffness: 300, damping: 10 },
        },
        tap: { scale: 0.95 },
    };

    const socialIconVariants = {
        hover: {
            scale: 1.2,
            rotate: 5,
            color: "#ffffff",
            transition: { type: "spring", stiffness: 500, damping: 10 },
        },
        tap: { scale: 0.9 },
    };

    return (
        <motion.footer
            className="bg-tertiary-950 text-white pt-12 pb-8"
            dir="rtl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="md:px-20 mx-auto px-4">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {/* About Section */}
                    <motion.div variants={itemVariants}>
                        <motion.h3
                            className="text-2xl text-primary-50 font-bold font-zar mb-4"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            خیاط ماسټر
                        </motion.h3>
                        <motion.p
                            className="text-primary-50 font-zar text-xl mb-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            موږ د تجربه لرونکو مسلکي کسانو سره د لوړ کیفیت خیاطۍ
                            خدمتونه وړاندې کوو ترڅو ستاسو د جامو ټولې اړتیاوې
                            پوره کړو.
                        </motion.p>
                        <motion.div
                            className="flex gap-5"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <motion.a
                                href="#"
                                className="text-primary-50 hover:text-white transition"
                                variants={socialIconVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <FaFacebook size={20} />
                            </motion.a>
                            <motion.a
                                href="#"
                                className="text-primary-50 hover:text-white transition"
                                variants={socialIconVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <FaTwitter size={20} />
                            </motion.a>
                            <motion.a
                                href="#"
                                className="text-primary-50 hover:text-white transition"
                                variants={socialIconVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <FaInstagram size={20} />
                            </motion.a>
                            <motion.a
                                href="#"
                                className="text-primary-50 hover:text-white transition"
                                variants={socialIconVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <FaLinkedin size={20} />
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <motion.h3
                            className="text-2xl font-zar font-bold mb-4"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            چټک لینکونه
                        </motion.h3>
                        <motion.ul
                            className="space-y-2"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4, staggerChildren: 0.1 }}
                            viewport={{ once: true }}
                        >
                            {[
                                { href: "/", text: "کور" },
                                { href: "/tailor", text: "خیاطان" },
                                { href: "/tailoring-shop", text: "دوکانونه" },
                                { href: "/post", text: "پوسټونه" },
                                { href: "/about", text: "زموږ په اړه" },
                                { href: "/contact", text: "اړیکه" },
                            ].map((link, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + index * 0.05 }}
                                    viewport={{ once: true }}
                                >
                                    <motion.div
                                        variants={linkVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <Link
                                            href={link.href}
                                            className="text-primary-50 text-xl font-zar hover:text-white transition"
                                        >
                                            {link.text}
                                        </Link>
                                    </motion.div>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div variants={itemVariants}>
                        <motion.h3
                            className="text-2xl font-zar mb-4"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            خدمتونه
                        </motion.h3>
                        <motion.ul
                            className="space-y-2"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            viewport={{ once: true }}
                        >
                            {[
                                "ځانګړي خیاطي",
                                "بدلونونه",
                                "د واده جامې",
                                "دودیزې جامې",
                                "عصري فیشن",
                            ].map((service, index) => (
                                <motion.li
                                    key={index}
                                    className="text-primary-50 font-zar text-xl hover:text-white transition"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + index * 0.05 }}
                                    viewport={{ once: true }}
                                    whileHover={{ x: 5 }}
                                >
                                    {service}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants}>
                        <motion.h3
                            className="text-2xl font-zar mb-4"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            viewport={{ once: true }}
                        >
                            زموږ سره اړیکه
                        </motion.h3>
                        <motion.ul
                            className="space-y-2"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <motion.li
                                className="flex items-center font-zar text-xl text-primary-50"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                viewport={{ once: true }}
                                whileHover={{ x: 5 }}
                            >
                                <FaMapMarkerAlt className="ml-2" />
                                ۱۲۳ د خیاط سړک، فیشن ښار
                            </motion.li>
                            <motion.li
                                className="flex items-center font-zar text-xl text-primary-50"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.65 }}
                                viewport={{ once: true }}
                                whileHover={{ x: 5 }}
                            >
                                <FaPhone className="ml-2" />
                                +123 456 7890
                            </motion.li>
                            <motion.li
                                className="flex items-center font-zar text-xl text-primary-50"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 }}
                                viewport={{ once: true }}
                                whileHover={{ x: 5 }}
                            >
                                <FaEnvelope className="ml-2" />
                                info@tailormaster.com
                            </motion.li>
                        </motion.ul>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="border-t border-gray-800 mt-8 pt-6 text-center text-primary-50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        viewport={{ once: true }}
                    >
                        د چاپ حق © {new Date().getFullYear()} خیاط ماسټر. ټول
                        حقوق خوندي دي.
                    </motion.p>
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default Footer;

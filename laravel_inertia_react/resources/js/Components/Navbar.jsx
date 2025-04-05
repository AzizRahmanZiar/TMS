import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePage } from "@inertiajs/react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { url, auth } = usePage().props;
    const user = auth?.user;

    // Function to check if a link is active
    const isActive = (path) => {
        // Check if url is defined
        if (!url || !path) return false;

        // Remove trailing slash for comparison
        const currentPath =
            url.endsWith("/") && url !== "/" ? url.slice(0, -1) : url;
        const linkPath =
            path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;

        return currentPath === linkPath;
    };

    // Animation variants
    const navbarVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const linkVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
        hover: {
            scale: 1.05,

            transition: { type: "spring", stiffness: 300, damping: 10 },
        },
        tap: { scale: 0.95 },
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
            transition: { type: "spring", stiffness: 400, damping: 10 },
        },
        tap: { scale: 0.95 },
    };

    const mobileMenuVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                staggerChildren: 0.05,
                delayChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                when: "afterChildren",
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    };

    const mobileItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    };

    const scissorsVariants = {
        initial: { rotate: 0 },
        animate: {
            rotate: [0, -10, 0, 10, 0],
            scale: [1, 1.1, 1, 1.1, 1],
            transition: {
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
            },
        },
        hover: {
            rotate: [0, -15, 0, 15, 0],
            scale: [1, 1.2, 1, 1.2, 1],
            transition: {
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
            },
        },
    };

    return (
        <motion.nav
            className="bg-primary-900 shadow-md py-4"
            variants={navbarVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo with animated scissors */}
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Link href="/" className="text-2xl font-bold">
                            <div className="flex items-end space-x-2 rtl:space-x-reverse">
                                <motion.span
                                    className="text-primary-50"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    ماسټر خیاط
                                </motion.span>
                                <motion.span
                                    variants={scissorsVariants}
                                    initial="initial"
                                    animate="animate"
                                    whileHover="hover"
                                >
                                    <FaScissors className="text-primary-50" />
                                </motion.span>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <motion.div
                        className="hidden md:flex items-center gap-8 rtl:gap-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {[
                            { href: "/", text: "کور" },
                            { href: "/about", text: "زموږ په اړه" },
                            { href: "/post", text: "پوسټونه" },
                            { href: "/order", text: "فرمایش" },
                            { href: "/shop", text: "دوکانونه" },
                            { href: "/contact", text: "اړیکه" },
                            { href: "/tailor", text: "خیاطان" },
                        ].map((link, index) => (
                            <motion.div
                                key={index}
                                variants={linkVariants}
                                whileHover="hover"
                                whileTap="tap"
                                custom={index}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.05 }}
                            >
                                <Link
                                    href={link.href}
                                    className={`font-semibold transition ${
                                        isActive(link.href)
                                            ? "text-secondary-400"
                                            : "text-primary-50 hover:text-primary-400"
                                    }`}
                                >
                                    {link.text}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right side buttons */}
                    <motion.div
                        className="hidden md:flex items-center gap-8 rtl:gap-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {user && (
                            <motion.div
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <Link
                                    href="./dashboard"
                                    className={`font-semibold px-4 py-2 rounded-md transition text-center ${
                                        isActive("./dashboard") ||
                                        isActive("/dashboard")
                                            ? "bg-secondary-700 text-primary-50"
                                            : "bg-secondary-600 text-primary-50 hover:bg-secondary-700"
                                    }`}
                                >
                                    Dashboard
                                </Link>
                            </motion.div>
                        )}
                        <motion.div
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Link
                                href="/login"
                                className={`font-semibold px-4 py-2 rounded-md transition ${
                                    isActive("./login") || isActive("/login")
                                        ? "bg-white text-primary-900"
                                        : "bg-primary-50 text-primary-900 hover:bg-white"
                                }`}
                            >
                                <FaUser className="inline ml-2" />
                                ننوتل
                            </Link>
                        </motion.div>
                        <motion.div
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Link
                                href="./register"
                                className={`font-semibold px-4 py-2 rounded-md transition ${
                                    isActive("./register") ||
                                    isActive("/register")
                                        ? "bg-secondary-700 text-primary-50"
                                        : "bg-secondary-600 text-primary-50 hover:bg-secondary-700"
                                }`}
                            >
                                ثبت نام
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Mobile menu button */}
                    <motion.div
                        className="md:hidden flex items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-primary-50"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <FaTimes size={24} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <FaBars size={24} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </motion.div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="md:hidden mt-4 pb-4 overflow-hidden"
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <motion.div
                                className="flex flex-col space-y-4"
                                dir="rtl"
                            >
                                {[
                                    { href: "/", text: "کور" },
                                    { href: "/shop", text: "دوکانونه" },
                                    { href: "/post", text: "پوسټونه" },
                                    { href: "/order", text: "فرمایش" },
                                    { href: "/about", text: "زموږ په اړه" },
                                    { href: "/contact", text: "اړیکه" },
                                    { href: "/tailor", text: "خیاطان" },
                                ].map((link, index) => (
                                    <motion.div
                                        key={index}
                                        variants={mobileItemVariants}
                                        custom={index}
                                        whileHover={{ x: 5 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={`font-semibold transition py-2 block ${
                                                isActive(link.href)
                                                    ? "text-secondary-400"
                                                    : "text-primary-50 hover:text-primary-400"
                                            }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.text}
                                        </Link>
                                    </motion.div>
                                ))}
                                {user && (
                                    <motion.div
                                        variants={mobileItemVariants}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Link
                                            href="/dashboard"
                                            className={`font-semibold px-4 py-2 rounded-md transition text-center block ${
                                                isActive("/dashboard")
                                                    ? "bg-secondary-700 text-primary-50"
                                                    : "bg-secondary-600 text-primary-50 hover:bg-secondary-700"
                                            }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                    </motion.div>
                                )}
                                <motion.div
                                    variants={mobileItemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Link
                                        href="/login"
                                        className={`font-semibold px-4 py-2 rounded-md transition text-center block ${
                                            isActive("./login") ||
                                            isActive("/login")
                                                ? "bg-secondary-700 text-primary-50"
                                                : "bg-secondary-600 text-primary-50 hover:bg-secondary-700"
                                        }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <FaUser className="inline ml-2" />
                                        ننوتل
                                    </Link>
                                </motion.div>
                                <motion.div
                                    variants={mobileItemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Link
                                        href="/register"
                                        className={`font-semibold px-4 py-2 rounded-md transition text-center block ${
                                            isActive("/register")
                                                ? "bg-secondary-700 text-primary-50"
                                                : "bg-secondary-600 text-primary-50 hover:bg-secondary-700"
                                        }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        ثبت نام
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;

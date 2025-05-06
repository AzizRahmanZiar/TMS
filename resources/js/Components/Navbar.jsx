import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePage } from "@inertiajs/react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { url, auth } = usePage().props;
    const user = auth?.user;

    // Load active path from localStorage
    const [activePath, setActivePath] = useState(
        localStorage.getItem("activeNavbarPath") || "/"
    );

    useEffect(() => {
        // Save to localStorage whenever activePath changes
        localStorage.setItem("activeNavbarPath", activePath);
    }, [activePath]);

    // Function to check if a link is active
    const isActive = (path) => {
        return activePath === path;
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
            

                    <div>
                        <Link href="/" className="text-2xl font-bold">
                            <div className="flex items-center rotate-180 space-x-2">
                                {/* Moving Scissors */}
                                <motion.span
                                    whileHover={{ x: "2rem" }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut",
                                    }}
                                    className="z-10"
                                >
                                    <FaScissors className="text-white h-10 w-10" />
                                </motion.span>
                            </div>
                        </Link>
                    </div>

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
                                    onClick={() => setActivePath(link.href)}
                                    className={`font-bold font-zar text-xl transition-all duration-300 ${
                                        isActive(link.href)
                                            ? "text-secondary-400"
                                            : "text-primary-50 hover:text-primary-400 hover:bg-primary-600/30"
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
                        {user ? (
                            <>
                                {(user.role === "admin" ||
                                    user.role === "tailor") && (
                                    <motion.div
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <Link
                                            href={route("dashboard")}
                                            className={`font-bold font-zar text-xl px-4 py-2 rounded-md transition text-center ${
                                                isActive(route("dashboard"))
                                                    ? "bg-secondary-700 text-primary-50"
                                                    : "bg-secondary-600 text-primary-50 hover:bg-secondary-700"
                                            }`}
                                        >
                                            ډشبورډ
                                        </Link>
                                    </motion.div>
                                )}
                                <motion.div
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="font-bold font-zar text-xl px-4 py-2 rounded-md transition bg-primary-50 text-primary-900 hover:bg-white"
                                    >
                                        وتل
                                    </Link>
                                </motion.div>
                            </>
                        ) : (
                            <>
                                <motion.div
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <Link
                                        href={route("login")}
                                        className={`font-bold font-zar text-2xl px-4 py-2 rounded-md transition ${
                                            isActive(route("login"))
                                                ? "bg-white text-primary-900"
                                                : "bg-primary-50 text-primary-900 hover:bg-white"
                                        }`}
                                    >
                                        داخلېدل
                                    </Link>
                                </motion.div>
                                <motion.div
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <Link
                                        href={route("register")}
                                        className={`font-blod font-zar text-2xl px-4 py-2 rounded-md transition ${
                                            isActive(route("register"))
                                                ? "bg-secondary-700 text-primary-50"
                                                : "bg-secondary-600 text-primary-50 hover:bg-secondary-700"
                                        }`}
                                    >
                                        ثبت نام
                                    </Link>
                                </motion.div>
                            </>
                        )}
                    </motion.div>

                    {/* Mobile menu button */}
                    <motion.div
                        className="md:hidden flex items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-primary-50 hover:text-primary-400 focus:outline-none"
                        >
                            {isOpen ? (
                                <FaTimes className="h-6 w-6" />
                            ) : (
                                <FaBars className="h-6 w-6" />
                            )}
                        </button>
                    </motion.div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="md:hidden mt-4"
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="flex flex-col space-y-4 rtl:space-y-4">
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
                                        variants={mobileItemVariants}
                                        custom={index}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setActivePath(link.href)}
                                            className={`block px-4 py-2 font-bold font-zar text-xl transition-all duration-300 ${
                                                isActive(link.href)
                                                    ? "text-secondary-400"
                                                    : "text-primary-50 hover:text-primary-400 hover:bg-primary-600/30"
                                            }`}
                                        >
                                            {link.text}
                                        </Link>
                                    </motion.div>
                                ))}
                                {user ? (
                                    <>
                                        {(user.role === "admin" ||
                                            user.role === "tailor") && (
                                            <motion.div
                                                variants={mobileItemVariants}
                                            >
                                                <Link
                                                    href={route("dashboard")}
                                                    className={`font-bold font-zar text-xl px-4 py-2 rounded-md transition text-center ${
                                                        isActive(
                                                            route("dashboard")
                                                        )
                                                            ? "bg-secondary-700 text-primary-50"
                                                            : "bg-secondary-600 text-primary-50 hover:bg-secondary-700"
                                                    }`}
                                                >
                                                    ډشبورډ
                                                </Link>
                                            </motion.div>
                                        )}
                                        <motion.div
                                            variants={mobileItemVariants}
                                        >
                                            <Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                                className="font-bold font-zar text-xl px-7 py-2 rounded-md transition bg-primary-50 text-primary-900 hover:bg-white"
                                            >
                                                وتل
                                            </Link>
                                        </motion.div>
                                    </>
                                ) : (
                                    <>
                                        <motion.div
                                            variants={mobileItemVariants}
                                        >
                                            <Link
                                                href={route("login")}
                                                className={`font-bold font-zar text-2xl px-6 py-2 rounded-md transition ${
                                                    isActive(route("login"))
                                                        ? "bg-white text-primary-900"
                                                        : "bg-primary-50 text-primary-900 hover:bg-white"
                                                }`}
                                            >
                                                ننوتل
                                            </Link>
                                        </motion.div>
                                        <motion.div
                                            variants={mobileItemVariants}
                                        >
                                            <Link
                                                href={route("register")}
                                                className={`font-blod  font-zar text-2xl px-4 py-2 rounded-md transition ${
                                                    isActive(route("register"))
                                                        ? "bg-secondary-700 text-primary-50"
                                                        : "bg-secondary-600 text-primary-50 hover:bg-secondary-700"
                                                }`}
                                            >
                                                ثبت نام
                                            </Link>
                                        </motion.div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;

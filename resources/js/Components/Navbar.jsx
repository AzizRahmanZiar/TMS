import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePage } from "@inertiajs/react";
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaBell } from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { url, auth } = usePage().props;
    const user = auth?.user;
    const [showProfileModal, setShowProfileModal] = useState(false);
    const profileRef = useRef(null);

    // Load active path from localStorage
    const [activePath, setActivePath] = useState(
        localStorage.getItem("activeNavbarPath") || "/"
    );

    useEffect(() => {
        // Save to localStorage whenever activePath changes
        localStorage.setItem("activeNavbarPath", activePath);
    }, [activePath]);

    // Add click outside handler for profile modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setShowProfileModal(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                                            : "text-primary-50 hover:text-secondary-400"
                                    }`}
                                >
                                    {link.text}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right side buttons */}
                    <motion.div
                        className="hidden md:flex items-center gap-4 rtl:gap-4"
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
                                {/* Profile Section */}
                                {user && (
                                    <div className="relative" ref={profileRef}>
                                        <button
                                            onClick={() =>
                                                setShowProfileModal(!showProfileModal)
                                            }
                                            className="p-2 rounded-full bg-primary-600 hover:bg-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-primary-400 flex items-center justify-center overflow-hidden">
                                                {user?.profile_image ? (
                                                    <img
                                                        src={`/storage/${user.profile_image}`}
                                                        alt={user.name || "User"}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            console.error(
                                                                "Profile image failed to load:",
                                                                user.profile_image
                                                            );
                                                            e.target.onerror = null;
                                                            e.target.src =
                                                                "/placeholder.svg";
                                                        }}
                                                    />
                                                ) : (
                                                    <FaUser className="text-white text-lg" />
                                                )}
                                            </div>
                                        </button>

                                        {/* Profile Dropdown */}
                                        {showProfileModal && (
                                            <div className="absolute left-2 w-72 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                                                <div className="p-4 border-b">
                                                    <div className="flex flex-col justify-center items-center">
                                                        <div className="w-12 h-12 rounded-full bg-primary-400 flex items-center justify-center overflow-hidden">
                                                            {user?.profile_image ? (
                                                                <img
                                                                    src={`/storage/${user.profile_image}`}
                                                                    alt={
                                                                        user.name || "User"
                                                                    }
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        e.target.onerror =
                                                                            null;
                                                                        e.target.src =
                                                                            "/placeholder.svg";
                                                                    }}
                                                                />
                                                            ) : (
                                                                <FaUser className="text-white text-2xl" />
                                                            )}
                                                        </div>

                                                        <h3 className="text-xl font-medium text-gray-900 mt-2">
                                                            {user?.name}
                                                        </h3>
                                                        <p className="text-xl text-gray-500">
                                                            {user?.email}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="p-2">
                                                    <Link
                                                        href={route("logout")}
                                                        method="get"
                                                        as="button"
                                                        onClick={() =>
                                                            setShowProfileModal(false)
                                                        }
                                                        className="w-full text-xl flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                                    >
                                                        <FaSignOutAlt className="ml-7 text-xl rtl:ml-0 rtl:mr-2" />
                                                        وتـــــــل
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
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
                                            onClick={() => {
                                                setActivePath(link.href);
                                                setIsOpen(false);
                                            }}
                                            className={`block px-4 py-2 font-bold font-zar text-xl transition-all duration-300 ${
                                                isActive(link.href)
                                                    ? "text-secondary-400"
                                                    : "text-primary-50 hover:text-secondary-400"
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
                                                className="mt-2"
                                            >
                                                <Link
                                                    href={route("dashboard")}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block w-full text-center font-bold font-zar text-xl px-4 py-2 rounded-md transition bg-secondary-600 text-primary-50 hover:bg-secondary-700"
                                                >
                                                    ډشبورډ
                                                </Link>
                                            </motion.div>
                                        )}
                                        <motion.div
                                            variants={mobileItemVariants}
                                            className="mt-2"
                                        >
                                            <div className="flex items-center justify-between px-4 py-2">
                                                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                                    <div className="w-10 h-10 rounded-full bg-primary-400 flex items-center justify-center overflow-hidden">
                                                        {user?.profile_image ? (
                                                            <img
                                                                src={`/storage/${user.profile_image}`}
                                                                alt={user.name || "User"}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = "/placeholder.svg";
                                                                }}
                                                            />
                                                        ) : (
                                                            <FaUser className="text-white text-xl" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-primary-50">{user.name}</p>
                                                        <p className="text-sm text-primary-200">{user.email}</p>
                                                    </div>
                                                </div>
                                                <Link
                                                    href={route("logout")}
                                                    method="get"
                                                    as="button"
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-center space-x-2 rtl:space-x-reverse text-primary-50 hover:text-secondary-400"
                                                >
                                                    <FaSignOutAlt className="text-xl" />
                                                    <span className="font-bold font-zar text-xl">وتل</span>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </>
                                ) : (
                                    <>
                                        <motion.div
                                            variants={mobileItemVariants}
                                            className="mt-2"
                                        >
                                            <Link
                                                href={route("login")}
                                                onClick={() => setIsOpen(false)}
                                                className="block w-full text-center font-bold font-zar text-xl px-4 py-2 rounded-md transition bg-primary-50 text-primary-900 hover:bg-white"
                                            >
                                                داخلېدل
                                            </Link>
                                        </motion.div>
                                        <motion.div
                                            variants={mobileItemVariants}
                                        >
                                            <Link
                                                href={route("register")}
                                                onClick={() => setIsOpen(false)}
                                                className="block w-full text-center font-bold font-zar text-xl px-4 py-2 rounded-md transition bg-secondary-600 text-primary-50 hover:bg-secondary-700"
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

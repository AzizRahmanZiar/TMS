import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePage } from "@inertiajs/react";
import {
    FaBars,
    FaTimes,
    FaUser,
    FaSignOutAlt,
    FaHome,
    FaInfoCircle,
    FaBlog,
    FaShoppingCart,
    FaStore,
    FaBullhorn,
    FaPhone,
    FaCut,
} from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { url, auth } = usePage().props;
    const user = auth?.user;
    const [showProfileModal, setShowProfileModal] = useState(false);
    const profileRef = useRef(null);

    // Load active path from current URL
    const [activePath, setActivePath] = useState(window.location.pathname);

    useEffect(() => {
        // Update active path when URL changes (Inertia navigation)
        setActivePath(window.location.pathname);
        // Save to localStorage whenever activePath changes
        localStorage.setItem("activeNavbarPath", window.location.pathname);
    }, [url]);

    useEffect(() => {
        // Set initial active path from current URL
        setActivePath(window.location.pathname);

        // Listen for URL changes (for SPA navigation)
        const handleLocationChange = () => {
            setActivePath(window.location.pathname);
            localStorage.setItem("activeNavbarPath", window.location.pathname);
        };

        // Listen for popstate events (back/forward navigation)
        window.addEventListener("popstate", handleLocationChange);

        return () => {
            window.removeEventListener("popstate", handleLocationChange);
        };
    }, []);

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
            className="bg-primary-900 shadow-lg sticky top-0 z-[999999] backdrop-blur-sm"
            variants={navbarVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-20">
                    {/* Logo Section */}
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
                                    <FaScissors className="text-white h-8 w-8 lg:h-10 lg:w-10 drop-shadow-lg" />
                                </motion.span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <motion.div
                        className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {[
                            { href: "/", text: "کور" },
                            {
                                href: "/about",
                                text: "زموږ په اړه",
                            },
                            { href: "/post", text: "پوسټونه" },
                            {
                                href: "/order",
                                text: "فرمایش",
                            },
                            { href: "/shop", text: "دوکانونه" },
                            { href: "/adv", text: "اعلانات" },
                            { href: "/contact", text: "اړیکه" },
                            { href: "/tailor", text: "خیاطان" },
                        ].map((link, index) => {
                            const isActiveLink = isActive(link.href);

                            return (
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
                                        className={`group relative flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg font-zar font-bold lg:text-xl transition-all duration-300 ${
                                            isActiveLink
                                                ? "bg-secondary-600 text-white shadow-lg"
                                                : "text-gray-200 hover:text-white hover:bg-primary-700/50"
                                        }`}
                                    >
                                        <span>{link.text}</span>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Right side buttons */}
                    <motion.div
                        className="hidden md:flex items-center space-x-3 rtl:space-x-reverse"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {user ? (
                            <>
                                {(user.role === "admin" ||
                                    user.role === "tailor" ||
                                    user.role === "shopkeeper") && (
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
                                                setShowProfileModal(
                                                    !showProfileModal
                                                )
                                            }
                                            className="p-2 rounded-full bg-primary-600 hover:bg-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-primary-400 flex items-center justify-center overflow-hidden">
                                                {user?.profile_image ? (
                                                    <img
                                                        src={`/storage/${user.profile_image}`}
                                                        alt={
                                                            user.name || "User"
                                                        }
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            console.error(
                                                                "Profile image failed to load:",
                                                                user.profile_image
                                                            );
                                                            e.target.onerror =
                                                                null;
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
                                                                        user.name ||
                                                                        "User"
                                                                    }
                                                                    className="w-full h-full object-cover"
                                                                    onError={(
                                                                        e
                                                                    ) => {
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
                                                    <form
                                                        action={route("logout")}
                                                        method="POST"
                                                        className="w-full"
                                                        onSubmit={async (e) => {
                                                            e.preventDefault();
                                                            setShowProfileModal(
                                                                false
                                                            );

                                                            // Get fresh CSRF token
                                                            try {
                                                                const tokenResponse =
                                                                    await fetch(
                                                                        "/refresh-csrf"
                                                                    );
                                                                const tokenData =
                                                                    await tokenResponse.json();

                                                                const formData =
                                                                    new FormData();
                                                                formData.append(
                                                                    "_token",
                                                                    tokenData.token
                                                                );

                                                                const response =
                                                                    await fetch(
                                                                        route(
                                                                            "logout"
                                                                        ),
                                                                        {
                                                                            method: "POST",
                                                                            body: formData,
                                                                            headers:
                                                                                {
                                                                                    "X-Requested-With":
                                                                                        "XMLHttpRequest",
                                                                                },
                                                                        }
                                                                    );

                                                                // Always redirect regardless of response
                                                                window.location.href =
                                                                    "/";
                                                            } catch (error) {
                                                                // If anything fails, just redirect
                                                                window.location.href =
                                                                    "/";
                                                            }
                                                        }}
                                                    >
                                                        <button
                                                            type="submit"
                                                            className="w-full text-xl flex items-center px-4 py-2 gap-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                                        >
                                                            <FaSignOutAlt className="ml-7 text-xl rtl:ml-0 rtl:mr-2 " />
                                                            وتـــــــل
                                                        </button>
                                                    </form>
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
                        className="lg:hidden flex items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 transition-colors duration-200"
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
                            className="lg:hidden bg-primary-800 shadow-lg border-t border-primary-700"
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="px-4 py-4 space-y-2">
                                {[
                                    {
                                        href: "/",
                                        text: "کور",
                                    },
                                    {
                                        href: "/about",
                                        text: "زموږ په اړه",
                                    },
                                    {
                                        href: "/post",
                                        text: "پوسټونه",
                                    },
                                    {
                                        href: "/order",
                                        text: "فرمایش",
                                    },
                                    {
                                        href: "/shop",
                                        text: "دوکانونه",
                                    },
                                    {
                                        href: "/adv",
                                        text: "اعلانات",
                                    },
                                    {
                                        href: "/contact",
                                        text: "اړیکه",
                                    },
                                    {
                                        href: "/tailor",
                                        text: "خیاطان",
                                    },
                                ].map((link, index) => {
                                    const isActiveLink = isActive(link.href);

                                    return (
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
                                                className={`flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg font-zar font-semibold text-xl transition-all duration-300 ${
                                                    isActiveLink
                                                        ? "bg-secondary-600 text-white"
                                                        : "text-gray-200 hover:text-white hover:bg-primary-700"
                                                }`}
                                            >
                                                <span>{link.text}</span>
                                            </Link>
                                        </motion.div>
                                    );
                                })}

                                {user ? (
                                    <>
                                        {(user.role === "admin" ||
                                            user.role === "tailor" ||
                                            user.role === "shopkeeper") && (
                                            <motion.div
                                                variants={mobileItemVariants}
                                                className="mt-2"
                                            >
                                                <Link
                                                    href={route("dashboard")}
                                                    onClick={() =>
                                                        setIsOpen(false)
                                                    }
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
                                                                alt={
                                                                    user.name ||
                                                                    "User"
                                                                }
                                                                className="w-full h-full object-cover"
                                                                onError={(
                                                                    e
                                                                ) => {
                                                                    e.target.onerror =
                                                                        null;
                                                                    e.target.src =
                                                                        "/placeholder.svg";
                                                                }}
                                                            />
                                                        ) : (
                                                            <FaUser className="text-white text-xl" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-primary-50">
                                                            {user.name}
                                                        </p>
                                                        <p className="text-sm text-primary-200">
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                                <form
                                                    action={route("logout")}
                                                    method="POST"
                                                    onSubmit={async (e) => {
                                                        e.preventDefault();
                                                        setIsOpen(false);

                                                        // Get fresh CSRF token
                                                        try {
                                                            const tokenResponse =
                                                                await fetch(
                                                                    "/refresh-csrf"
                                                                );
                                                            const tokenData =
                                                                await tokenResponse.json();

                                                            const formData =
                                                                new FormData();
                                                            formData.append(
                                                                "_token",
                                                                tokenData.token
                                                            );

                                                            const response =
                                                                await fetch(
                                                                    route(
                                                                        "logout"
                                                                    ),
                                                                    {
                                                                        method: "POST",
                                                                        body: formData,
                                                                        headers:
                                                                            {
                                                                                "X-Requested-With":
                                                                                    "XMLHttpRequest",
                                                                            },
                                                                    }
                                                                );

                                                            // Always redirect regardless of response
                                                            window.location.href =
                                                                "/";
                                                        } catch (error) {
                                                            // If anything fails, just redirect
                                                            window.location.href =
                                                                "/";
                                                        }
                                                    }}
                                                >
                                                    <button
                                                        type="submit"
                                                        className="flex items-center space-x-2 rtl:space-x-reverse text-primary-50 hover:text-secondary-400"
                                                    >
                                                        <FaSignOutAlt className="text-xl" />
                                                        <span className="font-bold font-zar text-xl">
                                                            وتل
                                                        </span>
                                                    </button>
                                                </form>
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

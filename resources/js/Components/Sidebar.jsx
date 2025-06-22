import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { IoMdArrowDropleft } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaUserShield,
    FaTachometerAlt,
    FaTshirt,
    FaUserTie,
    FaUserGraduate,
    FaUserTag,
    FaBlog,
    FaTimes,
    FaEnvelope,
    FaBullhorn,
    FaCog,
    FaCut,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { auth } = usePage().props;
    const user = auth.user;

    // Load active path from current URL
    const [activePath, setActivePath] = useState(window.location.pathname);

    useEffect(() => {
        // Set initial active path from current URL
        setActivePath(window.location.pathname);
        // Save to localStorage whenever activePath changes
        localStorage.setItem("activeSidebarPath", window.location.pathname);

        // Listen for URL changes (for SPA navigation)
        const handleLocationChange = () => {
            setActivePath(window.location.pathname);
            localStorage.setItem("activeSidebarPath", window.location.pathname);
        };

        // Listen for popstate events (back/forward navigation)
        window.addEventListener("popstate", handleLocationChange);

        return () => {
            window.removeEventListener("popstate", handleLocationChange);
        };
    }, []);

    // Add this useEffect to handle window resize
    useEffect(() => {
        const handleResize = () => {
            // Force re-render to update sidebar width calculations
            setActivePath(activePath);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [activePath]);

    // Define menu items with their required roles and icons
    const menuItems = [
        {
            title: "اډمیــــــــــــــن",
            href: "/admin",
            roles: ["admin"],
            icon: <FaUserShield className="text-xl md:text-2xl" />,
        },
        {
            title: "پیغامــــــــــــــونه",
            href: "/messages",
            roles: ["admin"],
            icon: <FaEnvelope className="text-xl md:text-2xl" />,
        },
        {
            title: "ډشبــــــــــــــورډ",
            href: "/dashboard",
            roles: ["tailor", "shopkeeper"],
            icon: <FaTachometerAlt className="text-xl md:text-2xl" />,
        },
        {
            title: "اعلانــــــــــــــات",
            href: "/advertisements",
            roles: ["shopkeeper"],
            icon: <FaBullhorn className="text-xl md:text-2xl" />,
        },
        {
            title: "جامــــــــــــــې",
            href: "/cloths",
            roles: ["tailor"],
            icon: <FaTshirt className="text-xl md:text-2xl" />,
        },
        {
            title: "درشــــــــــــــي",
            href: "/uniforms",
            roles: ["tailor"],
            icon: <FaUserTie className="text-xl md:text-2xl" />,
        },
        {
            title: "کــــــــــــــورتۍ",
            href: "/kortai",
            roles: ["tailor"],
            icon: <FaUserGraduate className="text-xl md:text-2xl" />,
        },
        {
            title: "صــــــــــــــدرۍ",
            href: "/sadrai",
            roles: ["tailor"],
            icon: <FaUserTag className="text-xl md:text-2xl" />,
        },
        {
            title: "پوســــــــــــــټ",
            href: "/tailor-posts",
            roles: ["tailor"],
            icon: <FaBlog className="text-xl md:text-2xl" />,
        },

        {
            title: "پرمــــــــــــایش",
            href: "/customerorder",
            roles: ["tailor"],
            icon: <FiSend className="text-xl md:text-2xl" />,
        },
        {
            title: "تنظیمــــــــــــات",
            href: "/settings",
            roles: ["tailor"],
            icon: <FaCog className="text-xl md:text-2xl" />,
        },
    ];

    // Filter menu items based on user role
    const filteredMenuItems = menuItems.filter((item) => {
        if (!user) return false;
        return item.roles.includes(user.role);
    });

    // Handle link click on mobile
    const handleLinkClick = (href) => {
        setActivePath(href);
        if (window.innerWidth < 768) {
            toggleSidebar();
        }
    };

    return (
        <>
            {/* Mobile overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-20"
                        onClick={toggleSidebar}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    ></motion.div>
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <AnimatePresence>
                <motion.div
                    className={`fixed md:relative z-20 flex flex-col h-screen overflow-hidden bg-gradient-to-br from-secondary-900 via-tertiary-800 to-secondary-950 text-white rtl shadow-2xl border-r border-tertiary-700/50`}
                    initial={{
                        width: isOpen
                            ? "18rem"
                            : window.innerWidth < 768
                            ? "0"
                            : "4.5rem",
                    }}
                    animate={{
                        width: isOpen
                            ? "18rem"
                            : window.innerWidth < 768
                            ? "0"
                            : "4.5rem",
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full -translate-x-16 -translate-y-16"></div>
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-tertiary-400 to-primary-400 rounded-full translate-x-12 translate-y-12"></div>
                        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-br from-secondary-400 to-tertiary-400 rounded-full -translate-x-10 -translate-y-10"></div>
                    </div>

                    {/* Close button for mobile */}
                    <AnimatePresence>
                        {isOpen && window.innerWidth < 768 && (
                            <motion.button
                                className="absolute top-4 right-4 text-white p-2 rounded-xl hover:bg-white/10 transition-all duration-300  shadow-lg backdrop-blur-sm border border-white/20"
                                onClick={toggleSidebar}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaTimes className="text-lg" />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    <motion.div
                        className="flex items-center justify-center h-20 md:h-24  border-primary-600/30    px-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="w-full flex justify-center">
                            <Link
                                href={
                                    user?.role === "admin"
                                        ? "/admin"
                                        : "/dashboard"
                                }
                                className="flex items-center justify-center group p-2"
                                onClick={() =>
                                    handleLinkClick(
                                        user?.role === "admin"
                                            ? "/admin"
                                            : "/dashboard"
                                    )
                                }
                            >
                                <motion.div
                                    className="relative"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    {/* Main Icon */}
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <FaCut className="text-white text-xl md:text-2xl" />
                                    </div>
                                </motion.div>
                            </Link>
                        </div>
                    </motion.div>

                    <div className="flex-1 overflow-y-auto py-4 flex flex-col items-center">
                        <ul
                            className={`space-y-2 w-full flex flex-col ${
                                isOpen
                                    ? "items-center px-3"
                                    : "items-center px-0"
                            }`}
                        >
                            {filteredMenuItems.map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: index * 0.05,
                                        duration: 0.15,
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() =>
                                            handleLinkClick(item.href)
                                        }
                                        className={`font-bold font-zar text-base md:text-lg flex items-center rounded-xl transition-all duration-300 group relative overflow-hidden ${
                                            isOpen
                                                ? "justify-between p-3 w-full"
                                                : "justify-center p-2 w-12 h-12 mx-auto"
                                        } ${
                                            activePath === item.href
                                                ? "text-white bg-gradient-to-r from-secondary-500 to-secondary-600 shadow-lg"
                                                : "text-primary-100 hover:text-white hover:bg-white/10 hover:shadow-md"
                                        }`}
                                    >
                                        {/* Background gradient for active item */}
                                        {activePath === item.href && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-secondary-400/20 to-secondary-600/20 rounded-xl"
                                                layoutId="activeBackground"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 30,
                                                }}
                                            />
                                        )}

                                        {/* Icon - always visible */}
                                        <motion.div
                                            className={`flex items-center justify-center relative ${
                                                isOpen
                                                    ? "min-w-[28px] mr-3 text-lg"
                                                    : "w-full h-full text-lg"
                                            }`}
                                            whileHover={{ scale: 1.1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                            }}
                                        >
                                            {item.icon}
                                        </motion.div>

                                        {/* Text and arrow - only when open */}
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    className="flex items-center justify-between flex-1 relative"
                                                    initial={{
                                                        opacity: 0,
                                                        width: 0,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        width: "auto",
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        width: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.1,
                                                    }}
                                                >
                                                    <span className="truncate text-right flex-1">
                                                        {item.title}
                                                    </span>
                                                    <motion.span
                                                        className="ml-2"
                                                        animate={{
                                                            x:
                                                                activePath ===
                                                                item.href
                                                                    ? 0
                                                                    : -5,
                                                            opacity:
                                                                activePath ===
                                                                item.href
                                                                    ? 1
                                                                    : 0.7,
                                                        }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 500,
                                                        }}
                                                    >
                                                        <IoMdArrowDropleft className="text-lg flex-shrink-0" />
                                                    </motion.span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    );
};

export default Sidebar;

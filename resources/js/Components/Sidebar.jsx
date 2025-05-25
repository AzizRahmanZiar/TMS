import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { IoMdArrowDropleft } from "react-icons/io";
import { GiSewingMachine } from "react-icons/gi";
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
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { auth } = usePage().props;
    const user = auth.user;

    // Load active path from localStorage
    const [activePath, setActivePath] = useState(
        localStorage.getItem("activeSidebarPath") ||
            (user?.role === "admin" ? "/admin" : "/dashboard")
    );

    useEffect(() => {
        // Save to localStorage whenever activePath changes
        localStorage.setItem("activeSidebarPath", activePath);
    }, [activePath]);

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
            roles: ["tailor"],
            icon: <FaTachometerAlt className="text-xl md:text-2xl" />,
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
            title: "پرمـــــــــــایش",
            href: "/customerorder",
            roles: ["tailor"],
            icon: <FiSend className="text-xl md:text-2xl" />,
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
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <AnimatePresence>
                <motion.div
                    className={`fixed md:relative z-30 flex flex-col h-screen overflow-hidden border-primary-300 bg-primary-700 text-white rtl`}
                    initial={{
                        width: isOpen
                            ? "16rem"
                            : window.innerWidth < 768
                            ? "0"
                            : "4rem",
                    }}
                    animate={{
                        width: isOpen
                            ? "16rem"
                            : window.innerWidth < 768
                            ? "0"
                            : "4rem",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {/* Close button for mobile */}
                    {isOpen && window.innerWidth < 768 && (
                        <button
                            className="absolute top-4 right-4 text-white p-1"
                            onClick={toggleSidebar}
                        >
                            <FaTimes className="text-xl" />
                        </button>
                    )}

                    <div className="flex items-center justify-center h-20 space-x-2 rtl:space-x-reverse">
                        <Link
                            href={
                                user?.role === "admin" ? "/admin" : "/dashboard"
                            }
                            className="text-2xl font-bold flex items-center justify-center"
                            onClick={() =>
                                handleLinkClick(
                                    user?.role === "admin"
                                        ? "/admin"
                                        : "/dashboard"
                                )
                            }
                        >
                            <GiSewingMachine className="text-secondary-400 h-12 w-12 md:h-16 md:w-16" />
                        </Link>
                    </div>

                    <ul className="w-full border-t-0.5 pt-6 border-primary-500 pr-0">
                        {filteredMenuItems.map((item, index) => (
                            <motion.li
                                key={index}
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={() => handleLinkClick(item.href)}
                                    className={`font-bold font-zar text-lg md:text-2xl flex flex-row items-center p-4 text-right transition-all duration-300 ${
                                        activePath === item.href
                                            ? "text-secondary-400 "
                                            : "text-primary-50 hover:text-secondary-400"
                                    }`}
                                >
                                    {isOpen && (
                                        <span className="flex items-center w-full justify-between gap-2">
                                            {item.title}
                                            <motion.span
                                                animate={{
                                                    x:
                                                        activePath === item.href
                                                            ? 0
                                                            : -5,
                                                    opacity:
                                                        activePath === item.href
                                                            ? 1
                                                            : 0.7,
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                }}
                                            >
                                                <IoMdArrowDropleft className="text-lg" />
                                            </motion.span>
                                        </span>
                                    )}

                                    <div className="flex items-center justify-center min-w-[24px] mr-3">
                                        {item.icon}
                                    </div>
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </AnimatePresence>
        </>
    );
};

export default Sidebar;

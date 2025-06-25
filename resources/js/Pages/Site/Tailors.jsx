import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SiteLayout from "../../Layouts/SiteLayout";
import {
    FaSearch,
    FaFilter,
    FaUser,
    FaEnvelope,
    FaBriefcase,
    FaGraduationCap,
    FaTools,
    FaClock,
    FaStore,
    FaChevronLeft,
    FaChevronRight,
    FaShoppingBag,
} from "react-icons/fa";
import { Head, router } from "@inertiajs/react";

const Tailors = ({ tailors }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [career, setCareer] = useState("");
    const [processedTailors, setProcessedTailors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTailor, setSelectedTailor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const itemsPerPage = 4;

    // Function to translate work availability to Pashto
    const translateWorkAvailability = (availability) => {
        const translations = {
            "Full-time": "مکمل وخت",
            "Part-time": "نیم وخت",
            "مکمل وخت": "مکمل وخت",
            "نیم وخت": "نیم وخت",
        };
        return translations[availability] || availability;
    };

    // Process tailor data
    useEffect(() => {
        if (tailors && tailors.length > 0) {
            setProcessedTailors(tailors);
        }
    }, [tailors]);

    // Auto-filter when search term or career changes
    useEffect(() => {
        handleFilter();
    }, [searchTerm, career, tailors]);

    // Function to handle filtering
    const handleFilter = () => {
        if (!tailors) return;

        let filtered = tailors;

        if (searchTerm) {
            filtered = filtered.filter(
                (tailor) =>
                    (tailor.name &&
                        tailor.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())) ||
                    (tailor.email &&
                        tailor.email
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()))
            );
        }

        if (career) {
            filtered = filtered.filter(
                (tailor) =>
                    tailor.career &&
                    tailor.career.toLowerCase() === career.toLowerCase()
            );
        }

        setProcessedTailors(filtered);
        setCurrentPage(1);
    };

    // Function to reset filters
    const resetFilters = () => {
        setSearchTerm("");
        setCareer("");
        setProcessedTailors(tailors);
        setCurrentPage(1);
    };

    // Pagination logic
    const paginatedTailors = processedTailors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(processedTailors.length / itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Modal functions
    const openModal = (tailor) => {
        setSelectedTailor(tailor);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTailor(null);
        setIsModalOpen(false);
    };

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.6 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
        hover: {
            y: -10,
            boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
    };

    return (
        <SiteLayout title="د خیاطانو پروفایلونه - خیاط ماسټر">
            <Head title="Tailors" />
            {/* Hero Section */}
            <motion.section
                className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="mx-auto px-4">
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold font-zar max-w-3xl mx-auto  mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        د خیاطانو پروفایلونه
                    </motion.h1>
                    <motion.p
                        className="text-xl font-zar md:text-2xl max-w-3xl mx-auto opacity-90"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        د خپلو اړتیاوو لپاره غوره خیاط ومومئ. زموږ خیاطان د لوړ
                        کیفیت خیاطۍ مهارتونه لري.
                    </motion.p>
                </div>
            </motion.section>

            {/* Filter section */}
            <motion.section
                className="py-8 bg-white shadow-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        className="bg-white p-6 rounded-xl border"
                        whileHover={{
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex flex-1 items-center gap-2 border border-primary-200 p-3 rounded-lg bg-white">
                                <FaSearch className="text-primary-400" />
                                <input
                                    type="text"
                                    placeholder="د خیاط نوم یا بریښنالیک ولټوئ..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="flex-1 outline-none"
                                />
                            </div>
                            <div className="flex flex-1 items-center gap-2 border border-primary-200 p-3 rounded-lg bg-white">
                                <FaFilter className="text-primary-400" />
                                <select
                                    value={career}
                                    onChange={(e) => setCareer(e.target.value)}
                                    className="flex-1 outline-none bg-transparent"
                                >
                                    <option value="">ټول تخصصونه</option>
                                    <option value="جامې">جامې</option>
                                    <option value="یونیفورم">یونیفورم</option>
                                    <option value="صدری">صدری</option>
                                    <option value="کورتی">کورتی</option>
                                </select>
                            </div>

                            <motion.button
                                onClick={resetFilters}
                                className="font-bold px-6 py-3 rounded-md font-zar text-xl bg-primary-500 hover:bg-primary-600 text-white  transition duration-200 shadow-md"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                ریسیټ
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Tailors list */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <motion.div
                            className="flex justify-center items-center py-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-500"></div>
                        </motion.div>
                    ) : (
                        <>
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1,
                                        },
                                    },
                                }}
                            >
                                {paginatedTailors.length > 0 ? (
                                    paginatedTailors.map((tailor, index) => (
                                        <motion.div
                                            key={index}
                                            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 backdrop-blur-sm"
                                            variants={cardVariants}
                                            whileHover="hover"
                                            custom={index}
                                        >
                                            {/* Modern Gradient Background */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 opacity-60"></div>

                                            {/* Profile Image Section - Modern */}
                                            <div className="relative h-40 bg-gradient-to-br from-primary-400 via-primary-500 to-secondary-500 overflow-hidden">
                                                {/* Animated Background Pattern */}
                                                <div className="absolute inset-0 opacity-20">
                                                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full -translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                                                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-500"></div>
                                                </div>

                                                {/* Profile Image Container */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="relative">
                                                        <div className="w-24 h-24 rounded-2xl border-4 border-white/30 overflow-hidden shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 bg-white/95 backdrop-blur-sm">
                                                            {tailor.profile_photo_url ? (
                                                                <img
                                                                    src={
                                                                        tailor.profile_photo_url
                                                                    }
                                                                    alt={
                                                                        tailor.name
                                                                    }
                                                                    className="w-full h-full "
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                                                                    <FaUser className="text-2xl text-primary-500" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        {/* Floating Badge */}
                                                        {tailor.has_shop && (
                                                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-full flex items-center justify-center shadow-lg">
                                                                <FaStore className="text-white text-xs" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content Section - Modern */}
                                            <div className="relative p-6 bg-white/80 backdrop-blur-sm">
                                                {/* Name and Title */}
                                                <div className="text-center mb-4">
                                                    <h3 className="text-xl font-bold font-zar text-gray-800 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors duration-300">
                                                        {tailor.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 font-medium mb-3">
                                                        {tailor.career}
                                                    </p>

                                                    {/* Modern Rating & Credibility Badges */}
                                                    <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
                                                        {tailor.rating_percentage >
                                                            0 && (
                                                            <div
                                                                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm ${
                                                                    tailor.rating_percentage >=
                                                                    80
                                                                        ? "bg-gradient-to-r from-green-100 to-green-200 text-green-700"
                                                                        : tailor.rating_percentage >=
                                                                          60
                                                                        ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700"
                                                                        : "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700"
                                                                }`}
                                                            >
                                                                <span>⭐</span>
                                                                {
                                                                    tailor.rating_percentage
                                                                }
                                                                %
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Contact Info Cards */}
                                                <div className="space-y-2 mb-4">
                                                    <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50/80 hover:bg-gray-100/80 transition-colors duration-200">
                                                        <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                                                            <FaEnvelope className="text-primary-600 text-xs" />
                                                        </div>
                                                        <span className="text-xs text-gray-700 line-clamp-1 flex-1">
                                                            {tailor.email}
                                                        </span>
                                                    </div>

                                                    {tailor.work_availability && (
                                                        <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50/80 hover:bg-gray-100/80 transition-colors duration-200">
                                                            <div className="w-8 h-8 rounded-lg bg-secondary-100 flex items-center justify-center">
                                                                <FaClock className="text-secondary-600 text-xs" />
                                                            </div>
                                                            <span className="text-xs text-gray-700 line-clamp-1 flex-1">
                                                                {translateWorkAvailability(
                                                                    tailor.work_availability
                                                                )}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Order Statistics */}
                                                {tailor.order_statistics && (
                                                    <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                                                        <div className="text-center mb-2">
                                                            <h4 className="text-xs font-bold text-gray-700 font-zar">
                                                                د فرمایشونو حالت
                                                            </h4>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="text-center">
                                                                <div
                                                                    className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 ${
                                                                        tailor
                                                                            .order_statistics
                                                                            .can_accept_orders
                                                                            ? "bg-green-500"
                                                                            : "bg-red-500"
                                                                    }`}
                                                                >
                                                                    <span className="text-white text-xs font-bold">
                                                                        {
                                                                            tailor
                                                                                .order_statistics
                                                                                .remaining_capacity
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs text-gray-600 font-zar">
                                                                    پاتې
                                                                </p>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-1">
                                                                    <span className="text-white text-xs font-bold">
                                                                        {
                                                                            tailor
                                                                                .order_statistics
                                                                                .current_week_orders
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs text-gray-600 font-zar">
                                                                    دا اونۍ
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {!tailor
                                                            .order_statistics
                                                            .can_accept_orders && (
                                                            <div className="mt-2 text-center">
                                                                <span className="text-xs text-red-600 font-zar">
                                                                    حد ته رسیدلی
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Modern Action Buttons */}
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => {
                                                            router.visit(
                                                                route("order", {
                                                                    tailorId:
                                                                        tailor.id,
                                                                    tailorName:
                                                                        tailor.name,
                                                                })
                                                            );
                                                        }}
                                                        disabled={
                                                            tailor.order_statistics &&
                                                            !tailor
                                                                .order_statistics
                                                                .can_accept_orders
                                                        }
                                                        className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                                                            tailor.order_statistics &&
                                                            !tailor
                                                                .order_statistics
                                                                .can_accept_orders
                                                                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                                                                : "bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 text-white hover:from-primary-600 hover:via-primary-700 hover:to-secondary-600"
                                                        }`}
                                                    >
                                                        <FaShoppingBag className="text-sm" />
                                                        <span>
                                                            {tailor.order_statistics &&
                                                            !tailor
                                                                .order_statistics
                                                                .can_accept_orders
                                                                ? "حد ته رسیدلی"
                                                                : "فرمایش"}
                                                        </span>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openModal(tailor)
                                                        }
                                                        className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-4 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                                    >
                                                        <FaUser className="text-sm" />
                                                        <span>نور</span>
                                                    </button>
                                                </div>

                                                {/* Floating Status Indicator */}
                                                <div className="absolute top-4 right-4">
                                                    <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg animate-pulse"></div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        className="col-span-3 text-center py-16"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <motion.div
                                            className="bg-white p-8 rounded-xl border max-w-lg mx-auto"
                                            initial={{ scale: 0.9 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <motion.div
                                                className="text-primary-400 text-6xl mb-4"
                                                initial={{ y: -20 }}
                                                animate={{ y: 0 }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: 0.2,
                                                }}
                                            >
                                                <FaUser className="mx-auto" />
                                            </motion.div>
                                            <motion.h3
                                                className="text-2xl font-zar font-bold text-primary-700 mb-2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: 0.3,
                                                }}
                                            >
                                                هیڅ خیاط ونه موندل شو
                                            </motion.h3>
                                            <motion.p
                                                className="text-primary-500 mb-6 text-xl font-zar md:text-2xl"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: 0.4,
                                                }}
                                            >
                                                په دې وخت کې هیڅ خیاط نشته یا
                                                ستاسو د لټون معیارونه هیڅ پایله
                                                نلري.
                                            </motion.p>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* Pagination */}
                            {processedTailors.length > itemsPerPage && (
                                <motion.div
                                    className="mt-12 flex justify-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                >
                                    <nav className="flex items-center gap-1">
                                        <motion.button
                                            onClick={() =>
                                                goToPage(currentPage - 1)
                                            }
                                            disabled={currentPage === 1}
                                            className={`font-bold px-6 py-3 rounded-md font-zar text-xl ${
                                                currentPage === 1
                                                    ? "text-primary-400 cursor-not-allowed"
                                                    : "text-primary-700 hover:bg-primary-100"
                                            }`}
                                            whileHover={
                                                currentPage !== 1
                                                    ? {
                                                          scale: 1.1,
                                                          backgroundColor:
                                                              "rgba(0,0,0,0.05)",
                                                      }
                                                    : {}
                                            }
                                            whileTap={
                                                currentPage !== 1
                                                    ? { scale: 0.95 }
                                                    : {}
                                            }
                                        >
                                            <FaChevronRight className="h-5 w-5" />
                                        </motion.button>

                                        {[...Array(totalPages)].map((_, i) => {
                                            if (
                                                i === 0 ||
                                                i === totalPages - 1 ||
                                                (i >= currentPage - 2 &&
                                                    i <= currentPage + 2)
                                            ) {
                                                return (
                                                    <motion.button
                                                        key={i}
                                                        onClick={() =>
                                                            goToPage(i + 1)
                                                        }
                                                        className={`font-bold px-6 py-3 rounded-md font-zar text-xl ${
                                                            currentPage ===
                                                            i + 1
                                                                ? "bg-secondary-600 text-white"
                                                                : "text-primary-700 hover:bg-primary-100"
                                                        }`}
                                                        whileHover={{
                                                            scale: 1.1,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                        initial={{
                                                            opacity: 0,
                                                            y: 10,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        transition={{
                                                            delay:
                                                                0.8 + i * 0.05,
                                                        }}
                                                    >
                                                        {i + 1}
                                                    </motion.button>
                                                );
                                            } else if (
                                                i === currentPage - 3 ||
                                                i === currentPage + 3
                                            ) {
                                                return (
                                                    <motion.span
                                                        key={i}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{
                                                            delay:
                                                                0.8 + i * 0.05,
                                                        }}
                                                    >
                                                        ...
                                                    </motion.span>
                                                );
                                            }
                                            return null;
                                        })}

                                        <motion.button
                                            onClick={() =>
                                                goToPage(currentPage + 1)
                                            }
                                            disabled={
                                                currentPage === totalPages
                                            }
                                            className={`font-bold px-6 py-3 rounded-md font-zar text-xl ${
                                                currentPage === totalPages
                                                    ? "text-primary-400 cursor-not-allowed"
                                                    : "text-primary-700 hover:bg-primary-100"
                                            }`}
                                            whileHover={
                                                currentPage !== totalPages
                                                    ? {
                                                          scale: 1.1,
                                                          backgroundColor:
                                                              "rgba(0,0,0,0.05)",
                                                      }
                                                    : {}
                                            }
                                            whileTap={
                                                currentPage !== totalPages
                                                    ? { scale: 0.95 }
                                                    : {}
                                            }
                                        >
                                            <FaChevronLeft className="h-5 w-5" />
                                        </motion.button>
                                    </nav>
                                </motion.div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Tailor Details Modal */}
            {isModalOpen && selectedTailor && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6 rounded-t-2xl">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold font-zar">
                                    د خیاط بشپړ معلومات
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="text-white hover:text-gray-200 transition-colors duration-200"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6" dir="rtl">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Profile Section */}
                                <div className="lg:col-span-1">
                                    <div className="text-center mb-6">
                                        <div className="w-32 h-32 rounded-full border-4 border-primary-200 overflow-hidden shadow-lg mx-auto mb-4">
                                            {selectedTailor.profile_photo_url ? (
                                                <img
                                                    src={
                                                        selectedTailor.profile_photo_url
                                                    }
                                                    alt={selectedTailor.name}
                                                    className="w-full h-full"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                    <FaUser className="text-4xl text-gray-400" />
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-2xl font-bold font-zar text-gray-800 mb-2">
                                            {selectedTailor.name}
                                        </h3>
                                        <div className="flex justify-center gap-2 mb-4 flex-wrap">
                                            {selectedTailor.rating_percentage >
                                                0 && (
                                                <span
                                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                                                        selectedTailor.rating_percentage >=
                                                        80
                                                            ? "bg-green-100 text-green-700"
                                                            : selectedTailor.rating_percentage >=
                                                              60
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-orange-100 text-orange-700"
                                                    }`}
                                                >
                                                    <span>⭐</span>
                                                    <span className="font-semibold">
                                                        {
                                                            selectedTailor.rating_percentage
                                                        }
                                                        %
                                                    </span>
                                                    د پیرودونکو خوښۍ
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div className="lg:col-span-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Personal Information */}
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                                <FaUser className="text-primary-500 mr-2" />
                                                شخصي معلومات
                                            </h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <span className="text-sm text-gray-500">
                                                        بریښنالیک:
                                                    </span>
                                                    <p className="font-medium">
                                                        {selectedTailor.email}
                                                    </p>
                                                </div>

                                                <div>
                                                    <span className="text-sm text-gray-500">
                                                        مسلک:
                                                    </span>
                                                    <p className="font-medium">
                                                        {selectedTailor.career}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-sm text-gray-500">
                                                        د کار شتون:
                                                    </span>
                                                    <p className="font-medium">
                                                        {translateWorkAvailability(
                                                            selectedTailor.work_availability
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Professional Information */}
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                                <FaBriefcase className="text-secondary-500 mr-2" />
                                                مسلکي معلومات
                                            </h4>
                                            <div className="space-y-3">
                                                {selectedTailor.previous_work && (
                                                    <div>
                                                        <span className="text-sm text-gray-500">
                                                            پخوانی کار:
                                                        </span>
                                                        <p className="font-medium">
                                                            {
                                                                selectedTailor.previous_work
                                                            }
                                                        </p>
                                                    </div>
                                                )}
                                                {selectedTailor.certifications && (
                                                    <div>
                                                        <span className="text-sm text-gray-500">
                                                            سندونه:
                                                        </span>
                                                        <p className="font-medium">
                                                            {
                                                                selectedTailor.certifications
                                                            }
                                                        </p>
                                                    </div>
                                                )}
                                                {selectedTailor.skills && (
                                                    <div>
                                                        <span className="text-sm text-gray-500">
                                                            مهارتونه:
                                                        </span>
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {selectedTailor.skills
                                                                .split(",")
                                                                .map(
                                                                    (
                                                                        skill,
                                                                        i
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                i
                                                                            }
                                                                            className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                                                                        >
                                                                            {skill.trim()}
                                                                        </span>
                                                                    )
                                                                )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-6 flex gap-4">
                                        <button
                                            onClick={() => {
                                                router.visit(
                                                    route("order", {
                                                        tailorId:
                                                            selectedTailor.id,
                                                        tailorName:
                                                            selectedTailor.name,
                                                    })
                                                );
                                                closeModal();
                                            }}
                                            className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-6 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                                        >
                                            <FaShoppingBag className="text-sm" />
                                            فرمایش ورکړئ
                                        </button>
                                        <button
                                            onClick={closeModal}
                                            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 font-medium"
                                        >
                                            تړل
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </SiteLayout>
    );
};

export default Tailors;

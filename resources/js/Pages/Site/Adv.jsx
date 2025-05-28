import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import SiteLayout from "@/Layouts/SiteLayout";
import {
    FaCalendarAlt,
    FaUser,
    FaEye,
    FaBuilding,
    FaImage,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

const Adv = ({ advertisements }) => {
    // All advertisements are now displayed on site, no filtering needed
    const filteredAdvertisements = advertisements;

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
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
            y: -8,
            scale: 1.02,
            boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
    };

    // Pagination logic
    const paginatedAdvertisements = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredAdvertisements.slice(
            startIndex,
            startIndex + itemsPerPage
        );
    }, [filteredAdvertisements, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredAdvertisements.length / itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <SiteLayout>
            <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
                {/* Header Section */}
                <motion.div
                    className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20 relative overflow-hidden"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
                        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full"></div>
                        <div className="absolute bottom-20 left-32 w-12 h-12 bg-white rounded-full"></div>
                        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold mb-6 font-zar"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            اعلانات
                        </motion.h1>
                        <motion.p
                            className="text-xl md:text-2xl text-primary-100 font-zar max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            د شرکتونو اعلانات وګورئ او د خپلو اړتیاوو لپاره غوره
                            انتخاب وکړئ
                        </motion.p>
                    </div>
                </motion.div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {/* Advertisements Grid */}
                    {filteredAdvertisements.length > 0 ? (
                        <>
                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                {paginatedAdvertisements.map((ad, index) => (
                                    <motion.div
                                        key={ad.id}
                                        className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/50 backdrop-blur-sm"
                                        variants={cardVariants}
                                        whileHover="hover"
                                        custom={index}
                                    >
                                        {/* Modern Gradient Background */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 opacity-40"></div>

                                        {/* Image Section - Compact */}
                                        <div className="relative h-32 bg-gradient-to-br from-primary-400 via-primary-500 to-secondary-500 overflow-hidden">
                                            {ad.image ? (
                                                <div className="relative h-full">
                                                    <img
                                                        src={ad.image}
                                                        alt={ad.title}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                                </div>
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-12 h-12 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                        <FaImage className="text-lg text-primary-500" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Section - Compact */}
                                        <div className="relative p-4 bg-white/90 backdrop-blur-sm">
                                            {/* Title */}
                                            <div className="mb-3">
                                                <h3 className="text-sm font-bold font-zar text-gray-800 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors duration-300">
                                                    {ad.title}
                                                </h3>

                                                {/* Company Badge */}
                                                <div className="px-2 py-1 bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-700 rounded-full text-xs font-semibold inline-flex items-center gap-1 shadow-sm">
                                                    <FaBuilding className="text-xs" />
                                                    <span className="text-xs">
                                                        اعلان
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            {ad.description && (
                                                <div className="mb-3">
                                                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                                        {ad.description}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Meta Information - Compact */}
                                            <div className="space-y-1.5 mb-3">
                                                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-gray-50/80">
                                                    <div className="w-6 h-6 rounded-md bg-primary-100 flex items-center justify-center">
                                                        <FaUser className="text-primary-600 text-xs" />
                                                    </div>
                                                    <span className="text-xs text-gray-700 line-clamp-1 flex-1">
                                                        {ad.shopkeeper_name}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-gray-50/80">
                                                    <div className="w-6 h-6 rounded-md bg-secondary-100 flex items-center justify-center">
                                                        <FaCalendarAlt className="text-secondary-600 text-xs" />
                                                    </div>
                                                    <span className="text-xs text-gray-700 line-clamp-1 flex-1">
                                                        {ad.created_at}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Compact Action Button */}
                                            <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-3 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                                <FaEye className="text-xs" />
                                                <span>لیدل</span>
                                            </button>

                                            {/* Floating Status Indicator */}
                                            <div className="absolute top-2 right-2">
                                                <div className="w-2 h-2 bg-green-400 rounded-full shadow-sm animate-pulse"></div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Pagination */}
                            {filteredAdvertisements.length > itemsPerPage && (
                                <motion.div
                                    className="mt-16 flex justify-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                >
                                    <nav className="flex items-center gap-2">
                                        <motion.button
                                            onClick={() =>
                                                goToPage(currentPage - 1)
                                            }
                                            disabled={currentPage === 1}
                                            className={`font-bold px-4 py-3 rounded-xl font-zar text-lg transition-all duration-300 ${
                                                currentPage === 1
                                                    ? "text-primary-400 cursor-not-allowed bg-gray-100"
                                                    : "text-primary-700 hover:bg-primary-100 bg-white shadow-md hover:shadow-lg"
                                            }`}
                                            whileHover={
                                                currentPage !== 1
                                                    ? {
                                                          scale: 1.05,
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
                                            <FaChevronRight className="h-4 w-4" />
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
                                                        className={`font-bold px-4 py-3 rounded-xl font-zar text-lg transition-all duration-300 ${
                                                            currentPage ===
                                                            i + 1
                                                                ? "bg-gradient-to-r from-secondary-600 to-primary-600 text-white shadow-lg"
                                                                : "text-primary-700 hover:bg-primary-100 bg-white shadow-md hover:shadow-lg"
                                                        }`}
                                                        whileHover={{
                                                            scale: 1.05,
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
                                                        className="px-2 text-primary-500"
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
                                            className={`font-bold px-4 py-3 rounded-xl font-zar text-lg transition-all duration-300 ${
                                                currentPage === totalPages
                                                    ? "text-primary-400 cursor-not-allowed bg-gray-100"
                                                    : "text-primary-700 hover:bg-primary-100 bg-white shadow-md hover:shadow-lg"
                                            }`}
                                            whileHover={
                                                currentPage !== totalPages
                                                    ? {
                                                          scale: 1.05,
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
                                            <FaChevronLeft className="h-4 w-4" />
                                        </motion.button>
                                    </nav>
                                </motion.div>
                            )}
                        </>
                    ) : (
                        <motion.div
                            className="text-center py-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                className="bg-white rounded-2xl shadow-xl p-12 max-w-lg mx-auto border border-primary-100"
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div
                                    className="text-primary-400 text-6xl mb-6"
                                    initial={{ y: -20 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <FaImage className="mx-auto" />
                                </motion.div>
                                <motion.h3
                                    className="text-2xl font-zar font-bold text-primary-700 mb-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    هیڅ اعلان ونه موندل شو
                                </motion.h3>
                                <motion.p
                                    className="text-primary-500 text-lg font-zar leading-relaxed"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    دا وخت کوم اعلان شتون نلري. وروسته بیا هڅه
                                    وکړئ یا د نورو برخو څخه کتنه وکړئ.
                                </motion.p>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Statistics Section */}
                    {advertisements.length > 0 && (
                        <motion.div
                            className="mt-20 bg-gradient-to-br from-white to-primary-50 rounded-2xl shadow-xl p-8 border border-primary-100"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <motion.h2
                                className="text-3xl font-bold text-gray-800 mb-8 text-center font-zar"
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                د اعلاناتو احصائیې
                            </motion.h2>
                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <motion.div
                                    className="text-center p-8 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-200"
                                    variants={cardVariants}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <FaImage className="text-white text-xl" />
                                    </div>
                                    <div className="text-4xl font-bold text-primary-600 mb-2 font-zar">
                                        {advertisements.length}
                                    </div>
                                    <div className="text-gray-700 font-medium font-zar">
                                        ټول اعلانات
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="text-center p-8 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-secondary-200"
                                    variants={cardVariants}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <FaEye className="text-white text-xl" />
                                    </div>
                                    <div className="text-4xl font-bold text-secondary-600 mb-2 font-zar">
                                        {advertisements.length}
                                    </div>
                                    <div className="text-gray-700 font-medium font-zar">
                                        فعال اعلانات
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-200"
                                    variants={cardVariants}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <FaBuilding className="text-white text-xl" />
                                    </div>
                                    <div className="text-4xl font-bold text-green-600 mb-2 font-zar">
                                        {
                                            new Set(
                                                advertisements.map(
                                                    (ad) => ad.shopkeeper_name
                                                )
                                            ).size
                                        }
                                    </div>
                                    <div className="text-gray-700 font-medium font-zar">
                                        شرکتونه
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>
        </SiteLayout>
    );
};

export default Adv;

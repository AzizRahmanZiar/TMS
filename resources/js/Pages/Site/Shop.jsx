import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import SiteLayout from "../../Layouts/SiteLayout";
import {
    FaSearch,
    FaFilter,
    FaMapMarkerAlt,
    FaPhone,
    FaFacebook,
    FaInstagram,
    FaTelegram,
    FaStore,
    FaUsers,
    FaCalendarAlt,
    FaEnvelope,
    FaClock,
    FaTools,
    FaCreditCard,
    FaChevronLeft,
    FaChevronRight,
    FaUser,
} from "react-icons/fa";
import { Head } from "@inertiajs/react";

const Shop = ({ shops }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [processedShops, setProcessedShops] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedShop, setSelectedShop] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const itemsPerPage = 9;

    // Process shop data
    useEffect(() => {
        if (shops && shops.length > 0) {
            console.log("Raw shop data:", shops[0]); // Debug: Log first shop's data
            const processed = shops.map((shop) => {
                // Create a new object with all the shop properties
                const processedShop = { ...shop };

                // Process shop images if they exist
                if (shop.shop_images) {
                    try {
                        console.log("Raw shop_images:", shop.shop_images); // Debug: Log raw shop_images
                        let images;
                        // Check if shop_images is already an array (from JSON column)
                        if (Array.isArray(shop.shop_images)) {
                            images = shop.shop_images;
                        } else {
                            // Try to parse as JSON
                            try {
                                images = JSON.parse(shop.shop_images);
                            } catch (e) {
                                // If parsing fails, treat as a single image path
                                images = [shop.shop_images];
                            }
                        }
                        console.log("Processed images:", images); // Debug: Log processed images
                        processedShop.shopImageUrls = images.map(
                            (image) => `/storage/${image}`
                        );
                        console.log(
                            "Final image URLs:",
                            processedShop.shopImageUrls
                        ); // Debug: Log final URLs
                    } catch (e) {
                        console.error("Error processing shop images:", e); // Debug: Log processing errors
                        processedShop.shopImageUrls = [];
                    }
                } else {
                    console.log(
                        "No shop_images found for shop:",
                        shop.tailoring_name
                    ); // Debug: Log missing images
                    processedShop.shopImageUrls = [];
                }

                // Process social links if they exist
                if (shop.social_links) {
                    try {
                        processedShop.socialLinks = JSON.parse(
                            shop.social_links
                        );
                    } catch (e) {
                        processedShop.socialLinks = {};
                    }
                } else {
                    processedShop.socialLinks = {};
                }

                return processedShop;
            });

            setProcessedShops(processed);
        }
    }, [shops]);

    // Function to handle filtering
    const handleFilter = () => {
        if (!shops) return;

        let filtered = shops;

        if (searchTerm) {
            filtered = filtered.filter(
                (shop) =>
                    (shop.tailoring_name &&
                        shop.tailoring_name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())) ||
                    (shop.tailoring_address &&
                        shop.tailoring_address
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()))
            );
        }

        if (specialization) {
            filtered = filtered.filter(
                (shop) =>
                    shop.services &&
                    shop.services
                        .toLowerCase()
                        .includes(specialization.toLowerCase())
            );
        }

        if (priceRange) {
            // This is a placeholder since we don't have actual price data
            // In a real app, you would filter by price range
            filtered = filtered.filter(() => true);
        }

        setProcessedShops(filtered);
        setCurrentPage(1);
    };

    // Function to reset filters
    const resetFilters = () => {
        setSearchTerm("");
        setSpecialization("");
        setPriceRange("");

        if (shops) {
            setProcessedShops(shops);
        }
        setCurrentPage(1);
    };

    // Pagination logic
    const paginatedShops = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return processedShops.slice(startIndex, startIndex + itemsPerPage);
    }, [processedShops, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(processedShops.length / itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Modal functions
    const openModal = (shop) => {
        setSelectedShop(shop);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedShop(null);
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

    const fadeInUp = {
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

    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.95 },
    };

    return (
        <SiteLayout title="د خیاطۍ دوکانونه - خیاط ماسټر">
            <Head title="Shops" />
            {/* Hero Section */}
            <motion.section
                className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className=" mx-auto px-4 ">
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold font-zar max-w-3xl mx-auto  mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        د خیاطۍ دوکانونه
                    </motion.h1>
                    <motion.p
                        className="text-xl font-zar md:text-2xl max-w-3xl mx-auto opacity-90"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        د خپلو اړتیاوو لپاره غوره دوکان ومومئ. زموږ دوکانونه د
                        لوړ کیفیت خیاطۍ خدمتونه وړاندې کوي.
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
                                    placeholder="د دوکان نوم یا آدرس ولټوئ..."
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
                                    value={specialization}
                                    onChange={(e) =>
                                        setSpecialization(e.target.value)
                                    }
                                    className="flex-1 outline-none bg-transparent"
                                >
                                    <option value="">ټول تخصصونه</option>
                                    <option value="Wedding">د واده جامې</option>
                                    <option value="Traditional">
                                        دودیز جامې
                                    </option>
                                    <option value="Modern">مدرن جامې</option>
                                </select>
                            </div>
                            <motion.button
                                onClick={handleFilter}
                                className="font-bold px-6 py-3 rounded-md font-zar text-xl bg-secondary-600 hover:bg-secondary-700 text-white  transition duration-200 shadow-md"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                لټون
                            </motion.button>
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

            {/* Shops list */}
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
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                            >
                                {paginatedShops.length > 0 ? (
                                    paginatedShops.map((shop, index) => (
                                        <motion.div
                                            key={index}
                                            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 backdrop-blur-sm"
                                            variants={cardVariants}
                                            whileHover="hover"
                                            custom={index}
                                        >
                                            {/* Modern Gradient Background */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-secondary-50 via-white to-primary-50 opacity-60"></div>

                                            {/* Shop Images Section - Modern */}
                                            <div className="relative h-40 bg-gradient-to-br from-secondary-400 via-secondary-500 to-primary-500 overflow-hidden">
                                                {/* Animated Background Pattern */}
                                                <div className="absolute inset-0 opacity-20">
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-500"></div>
                                                </div>

                                                {/* Shop Image Container */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    {shop.shopImageUrls &&
                                                    shop.shopImageUrls.length >
                                                        0 ? (
                                                        <div className="w-full h-full transform group-hover:scale-110 transition-transform duration-500">
                                                            <img
                                                                src={
                                                                    shop
                                                                        .shopImageUrls[0]
                                                                }
                                                                alt={
                                                                    shop.tailoring_name
                                                                }
                                                                className="w-full h-full object-cover"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                                        </div>
                                                    ) : (
                                                        <div className="relative">
                                                            <div className="w-24 h-24 rounded-2xl border-4 border-white/30 overflow-hidden shadow-2xl transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 bg-white/95 backdrop-blur-sm flex items-center justify-center">
                                                                <FaStore className="text-3xl text-secondary-500" />
                                                            </div>
                                                            {/* Floating Badge */}
                                                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full flex items-center justify-center shadow-lg">
                                                                <FaStore className="text-white text-xs" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Content Section - Modern */}
                                            <div className="relative p-6 bg-white/80 backdrop-blur-sm">
                                                {/* Shop Name and Title */}
                                                <div className="text-center mb-4">
                                                    <h3 className="text-xl font-bold font-zar text-gray-800 mb-2 line-clamp-1 group-hover:text-secondary-600 transition-colors duration-300">
                                                        {shop.tailoring_name}
                                                    </h3>
                                                    <div className="px-3 py-1.5 bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-700 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm mb-3">
                                                        <FaStore className="text-xs" />
                                                        د خیاطۍ دوکان
                                                    </div>

                                                    {/* Business Info Badges */}
                                                    <div className="flex items-center justify-center gap-2 mb-4">
                                                        {shop.tailor_count && (
                                                            <div className="px-3 py-1.5 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                                                                <FaUsers className="text-xs" />
                                                                {
                                                                    shop.tailor_count
                                                                }{" "}
                                                                خیاطان
                                                            </div>
                                                        )}
                                                        {shop.published_year && (
                                                            <div className="px-3 py-1.5 bg-gradient-to-r from-green-100 to-green-200 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                                                                <FaCalendarAlt className="text-xs" />
                                                                {
                                                                    shop.published_year
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Contact Info Cards */}
                                                <div className="space-y-2 mb-4">
                                                    <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50/80 hover:bg-gray-100/80 transition-colors duration-200">
                                                        <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                                                            <FaMapMarkerAlt className="text-primary-600 text-xs" />
                                                        </div>
                                                        <span className="text-xs text-gray-700 line-clamp-1 flex-1">
                                                            {
                                                                shop.tailoring_address
                                                            }
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50/80 hover:bg-gray-100/80 transition-colors duration-200">
                                                        <div className="w-8 h-8 rounded-lg bg-secondary-100 flex items-center justify-center">
                                                            <FaPhone className="text-secondary-600 text-xs" />
                                                        </div>
                                                        <span className="text-xs text-gray-700 line-clamp-1 flex-1">
                                                            {
                                                                shop.contact_number
                                                            }
                                                        </span>
                                                    </div>

                                                    {shop.services && (
                                                        <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50/80 hover:bg-gray-100/80 transition-colors duration-200">
                                                            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                                                                <FaTools className="text-green-600 text-xs" />
                                                            </div>
                                                            <span className="text-xs text-gray-700 line-clamp-1 flex-1">
                                                                {shop.services
                                                                    .split(
                                                                        ","
                                                                    )[0]
                                                                    .trim()}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Modern Social Links */}
                                                {shop.socialLinks &&
                                                    Object.keys(
                                                        shop.socialLinks
                                                    ).length > 0 && (
                                                        <div className="flex justify-center gap-2 mb-4">
                                                            {shop.socialLinks
                                                                .facebook && (
                                                                <a
                                                                    href={
                                                                        shop
                                                                            .socialLinks
                                                                            .facebook
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 hover:from-blue-200 hover:to-blue-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-110"
                                                                >
                                                                    <FaFacebook className="text-sm" />
                                                                </a>
                                                            )}
                                                            {shop.socialLinks
                                                                .instagram && (
                                                                <a
                                                                    href={
                                                                        shop
                                                                            .socialLinks
                                                                            .instagram
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="w-8 h-8 rounded-xl bg-gradient-to-r from-pink-100 to-pink-200 flex items-center justify-center text-pink-600 hover:from-pink-200 hover:to-pink-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-110"
                                                                >
                                                                    <FaInstagram className="text-sm" />
                                                                </a>
                                                            )}
                                                            {shop.socialLinks
                                                                .telegram && (
                                                                <a
                                                                    href={
                                                                        shop
                                                                            .socialLinks
                                                                            .telegram
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 hover:from-blue-200 hover:to-blue-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-110"
                                                                >
                                                                    <FaTelegram className="text-sm" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    )}

                                                {/* Modern Action Buttons */}
                                                <div className="flex gap-3">
                                                    <button className="flex-1 bg-gradient-to-r from-secondary-500 via-secondary-600 to-primary-500 text-white py-3 px-4 rounded-xl hover:from-secondary-600 hover:via-secondary-700 hover:to-primary-600 transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                                        <FaStore className="text-sm" />
                                                        <span>دوکان</span>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openModal(shop)
                                                        }
                                                        className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-4 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                                    >
                                                        <FaUser className="text-sm" />
                                                        <span>نور</span>
                                                    </button>
                                                </div>

                                                {/* Floating Status Indicator */}
                                                <div className="absolute top-4 right-4">
                                                    <div className="w-3 h-3 bg-blue-400 rounded-full shadow-lg animate-pulse"></div>
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
                                                <FaStore className="mx-auto" />
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
                                                هیڅ دوکان ونه موندل شو
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
                                                په دې وخت کې هیڅ دوکان نشته یا
                                                ستاسو د لټون معیارونه هیڅ پایله
                                                نلري.
                                            </motion.p>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* Pagination */}
                            {processedShops.length > itemsPerPage && (
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
                                            // Show limited page numbers with ellipsis
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

            {/* Shop Details Modal */}
            {isModalOpen && selectedShop && (
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
                                    د دوکان بشپړ معلومات
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
                                {/* Shop Images Section */}
                                <div className="lg:col-span-1">
                                    <div className="text-center mb-6">
                                        <div className="w-full h-48 rounded-xl border-4 border-primary-200 overflow-hidden shadow-lg mb-4">
                                            {selectedShop.shopImageUrls &&
                                            selectedShop.shopImageUrls.length >
                                                0 ? (
                                                <img
                                                    src={
                                                        selectedShop
                                                            .shopImageUrls[0]
                                                    }
                                                    alt={
                                                        selectedShop.tailoring_name
                                                    }
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                    <FaStore className="text-6xl text-gray-400" />
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-2xl font-bold font-zar text-gray-800 mb-2">
                                            {selectedShop.tailoring_name}
                                        </h3>
                                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-100 text-secondary-700 text-sm font-medium">
                                            <FaStore className="text-sm" />د
                                            خیاطۍ دوکان
                                        </span>
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div className="lg:col-span-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Contact Information */}
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                                <FaPhone className="text-primary-500 mr-2" />
                                                د اړیکو معلومات
                                            </h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <span className="text-sm text-gray-500">
                                                        پته:
                                                    </span>
                                                    <p className="font-medium">
                                                        {
                                                            selectedShop.tailoring_address
                                                        }
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-sm text-gray-500">
                                                        د اړیکو شمیره:
                                                    </span>
                                                    <p className="font-medium">
                                                        {
                                                            selectedShop.contact_number
                                                        }
                                                    </p>
                                                </div>
                                                {selectedShop.shop_email && (
                                                    <div>
                                                        <span className="text-sm text-gray-500">
                                                            بریښنالیک:
                                                        </span>
                                                        <p className="font-medium">
                                                            {
                                                                selectedShop.shop_email
                                                            }
                                                        </p>
                                                    </div>
                                                )}
                                                <div>
                                                    <span className="text-sm text-gray-500">
                                                        د کار وختونه:
                                                    </span>
                                                    <p className="font-medium">
                                                        {
                                                            selectedShop.working_hours
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Business Information */}
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                                <FaStore className="text-secondary-500 mr-2" />
                                                د سوداګرۍ معلومات
                                            </h4>
                                            <div className="space-y-3">
                                                {selectedShop.tailor_count && (
                                                    <div>
                                                        <span className="text-sm text-gray-500">
                                                            د خیاطانو شمیر:
                                                        </span>
                                                        <p className="font-medium">
                                                            {
                                                                selectedShop.tailor_count
                                                            }{" "}
                                                            خیاطان
                                                        </p>
                                                    </div>
                                                )}
                                                {selectedShop.published_year && (
                                                    <div>
                                                        <span className="text-sm text-gray-500">
                                                            د پیل کال:
                                                        </span>
                                                        <p className="font-medium">
                                                            {
                                                                selectedShop.published_year
                                                            }
                                                        </p>
                                                    </div>
                                                )}
                                                {selectedShop.payment_methods && (
                                                    <div>
                                                        <span className="text-sm text-gray-500">
                                                            د تادیې طریقې:
                                                        </span>
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {JSON.parse(
                                                                selectedShop.payment_methods
                                                            ).map(
                                                                (method, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                                                                    >
                                                                        {method}
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Services Information */}
                                    {selectedShop.services && (
                                        <div className="mt-6 bg-gradient-to-r from-secondary-50 to-primary-50 p-6 rounded-xl border border-secondary-200">
                                            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                                <FaTools className="text-secondary-500 mr-2" />
                                                خدمتونه
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedShop.services
                                                    .split(",")
                                                    .map((service, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-3 py-2 bg-white text-gray-700 rounded-lg text-sm border"
                                                        >
                                                            {service.trim()}
                                                        </span>
                                                    ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Social Links */}
                                    {selectedShop.socialLinks &&
                                        Object.keys(selectedShop.socialLinks)
                                            .length > 0 && (
                                            <div className="mt-6">
                                                <h4 className="text-lg font-bold text-gray-800 mb-4">
                                                    ټولنیزې اړیکې
                                                </h4>
                                                <div className="flex gap-4">
                                                    {selectedShop.socialLinks
                                                        .facebook && (
                                                        <a
                                                            href={
                                                                selectedShop
                                                                    .socialLinks
                                                                    .facebook
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors duration-200"
                                                        >
                                                            <FaFacebook className="text-xl" />
                                                        </a>
                                                    )}
                                                    {selectedShop.socialLinks
                                                        .instagram && (
                                                        <a
                                                            href={
                                                                selectedShop
                                                                    .socialLinks
                                                                    .instagram
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 hover:bg-pink-200 transition-colors duration-200"
                                                        >
                                                            <FaInstagram className="text-xl" />
                                                        </a>
                                                    )}
                                                    {selectedShop.socialLinks
                                                        .telegram && (
                                                        <a
                                                            href={
                                                                selectedShop
                                                                    .socialLinks
                                                                    .telegram
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors duration-200"
                                                        >
                                                            <FaTelegram className="text-xl" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                    {/* Action Buttons */}
                                    <div className="mt-6 flex gap-4">
                                        <button className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-6 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-medium flex items-center justify-center gap-2">
                                            <FaStore className="text-sm" />
                                            دوکان ته ورشئ
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

export default Shop;

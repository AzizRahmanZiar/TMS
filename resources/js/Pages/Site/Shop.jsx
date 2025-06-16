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
    FaCut,
    FaImage,
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
    const [selectedTailor, setSelectedTailor] = useState(null);
    const [isTailorModalOpen, setIsTailorModalOpen] = useState(false);
    const itemsPerPage = 4;

    // Debug: Log all shops data on component mount
    useEffect(() => {
        console.log("=== SHOP DEBUG INFO ===");
        console.log("Total shops received:", shops?.length || 0);
        console.log("All shops data:", shops);
        if (shops && shops.length > 0) {
            shops.forEach((shop, index) => {
                console.log(`Shop ${index + 1}:`, {
                    name: shop.tailoring_name,
                    shop_images: shop.shop_images,
                    shop_images_type: typeof shop.shop_images,
                    shop_images_length: Array.isArray(shop.shop_images)
                        ? shop.shop_images.length
                        : "Not array",
                });
            });
        }
        console.log("=== END SHOP DEBUG ===");
    }, []);

    // Process shop data - now handled in handleFilter
    useEffect(() => {
        // Data processing is now handled in handleFilter function
    }, [shops]);

    // Auto-filter when search term or specialization changes
    useEffect(() => {
        handleFilter();
    }, [searchTerm, specialization, priceRange, shops]);

    // Function to handle filtering
    const handleFilter = () => {
        if (!shops) return;

        // First process the shops to add shopImageUrls and socialLinks
        const processed = shops.map((shop) => {
            const processedShop = { ...shop };

            // Process shop images
            if (shop.shop_images) {
                try {
                    let images = [];
                    if (Array.isArray(shop.shop_images)) {
                        if (shop.shop_images.length > 0) {
                            const firstElement = shop.shop_images[0];
                            if (typeof firstElement === "string") {
                                try {
                                    images = JSON.parse(firstElement);
                                } catch (e) {
                                    images = [firstElement];
                                }
                            } else {
                                images = shop.shop_images;
                            }
                        }
                    } else if (typeof shop.shop_images === "string") {
                        try {
                            images = JSON.parse(shop.shop_images);
                        } catch (e) {
                            images = [shop.shop_images];
                        }
                    } else {
                        images = [shop.shop_images];
                    }

                    processedShop.shopImageUrls = images.map((image) => {
                        const cleanImage = image.replace(/^\/storage\//, "");
                        return `/storage/${cleanImage}`;
                    });
                } catch (e) {
                    processedShop.shopImageUrls = [];
                }
            } else {
                processedShop.shopImageUrls = [];
            }

            // Process social links
            if (shop.social_links && typeof shop.social_links === "object") {
                processedShop.socialLinks = shop.social_links;
            } else if (
                shop.social_links &&
                typeof shop.social_links === "string"
            ) {
                try {
                    processedShop.socialLinks = JSON.parse(shop.social_links);
                } catch (e) {
                    processedShop.socialLinks = {};
                }
            } else {
                processedShop.socialLinks = {};
            }

            return processedShop;
        });

        // Then apply filters to the processed data
        let filtered = processed;

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
        setCurrentPage(1);

        // Trigger handleFilter to reprocess and show all shops
        handleFilter();
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

    const openTailorModal = (shop) => {
        setSelectedTailor(shop);
        setIsTailorModalOpen(true);
    };

    const closeTailorModal = () => {
        setSelectedTailor(null);
        setIsTailorModalOpen(false);
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
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
                                                                onError={(
                                                                    e
                                                                ) => {
                                                                    e.target.style.display =
                                                                        "none";
                                                                }}
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
                                                {/* Shop Name */}
                                                <div className="text-center mb-4">
                                                    <h3 className="text-xl font-bold font-zar text-gray-800 mb-2 line-clamp-1 group-hover:text-secondary-600 transition-colors duration-300">
                                                        {shop.tailoring_name}
                                                    </h3>
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

                                                {/* Modern Action Buttons */}
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() =>
                                                            openTailorModal(
                                                                shop
                                                            )
                                                        }
                                                        className="flex-1 bg-gradient-to-r from-secondary-500 via-secondary-600 to-primary-500 text-white py-3 px-4 rounded-xl hover:from-secondary-600 hover:via-secondary-700 hover:to-primary-600 transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                                    >
                                                        <FaUser className="text-sm" />
                                                        <span>خیاط</span>
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

            {/* Shop Details Modal - Compact Design */}
            {isModalOpen && selectedShop && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {/* Modal Header - Compact */}
                        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6 rounded-t-2xl">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <FaStore className="text-xl text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold font-zar">
                                            د دوکان بشپړ معلومات
                                        </h2>
                                        <p className="text-white/80 text-sm">
                                            {selectedShop.tailoring_name ||
                                                selectedShop.name}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-200"
                                >
                                    <svg
                                        className="w-5 h-5 text-white"
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

                        {/* Modal Content - Compact */}
                        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                            <div className="p-6" dir="rtl">
                                {/* د خیاطۍ تصویر - Always Show */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-gray-800 font-zar mb-3 flex items-center gap-2">
                                        <FaImage className="text-primary-600" />
                                        د خیاطۍ تصویر
                                    </h3>
                                    {selectedShop.shopImageUrls &&
                                    selectedShop.shopImageUrls.length > 0 ? (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {selectedShop.shopImageUrls.map(
                                                (imageUrl, index) => (
                                                    <div
                                                        key={index}
                                                        className="aspect-video rounded-lg overflow-hidden shadow-md"
                                                    >
                                                        <img
                                                            src={imageUrl}
                                                            alt={`${
                                                                selectedShop.tailoring_name
                                                            } - تصویر ${
                                                                index + 1
                                                            }`}
                                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                            onError={(e) => {
                                                                e.target.style.display =
                                                                    "none";
                                                                e.target.nextSibling.style.display =
                                                                    "flex";
                                                            }}
                                                        />
                                                        <div
                                                            className="w-full h-full bg-gray-100 flex items-center justify-center"
                                                            style={{
                                                                display: "none",
                                                            }}
                                                        >
                                                            <FaImage className="text-2xl text-gray-400" />
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <div className="bg-gray-100 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                                            <FaImage className="text-4xl text-gray-400 mx-auto mb-3" />
                                            <p className="text-gray-500 font-medium">
                                                د خیاطۍ تصویرونه شتون نلري
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* د خیاطۍ معلومات - Complete Information */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h3 className="text-xl font-bold text-gray-800 font-zar mb-6 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-600 rounded-full flex items-center justify-center">
                                            <FaStore className="text-sm" />
                                        </div>
                                        د خیاطۍ معلومات
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* د خیاطۍ نوم */}
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                                <FaStore className="text-secondary-600" />
                                                د خیاطۍ نوم:
                                            </label>
                                            <p className="font-medium text-gray-800 mt-1">
                                                {selectedShop.tailoring_name ||
                                                    "معلومات شتون نلري"}
                                            </p>
                                        </div>

                                        {/* آدرس */}
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                                <FaMapMarkerAlt className="text-secondary-600" />
                                                آدرس:
                                            </label>
                                            <p className="font-medium text-gray-800 mt-1">
                                                {selectedShop.tailoring_address ||
                                                    "معلومات شتون نلري"}
                                            </p>
                                        </div>

                                        {/* د خیاطانو شمیر */}
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                                <FaUsers className="text-secondary-600" />
                                                د خیاطانو شمیر:
                                            </label>
                                            <p className="font-medium text-gray-800 mt-1">
                                                {selectedShop.tailor_count
                                                    ? `${selectedShop.tailor_count} خیاطان`
                                                    : "معلومات شتون نلري"}
                                            </p>
                                        </div>

                                        {/* د تاسیس کال */}
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                                <FaCalendarAlt className="text-secondary-600" />
                                                د تاسیس کال:
                                            </label>
                                            <p className="font-medium text-gray-800 mt-1">
                                                {selectedShop.published_year ||
                                                    "معلومات شتون نلري"}
                                            </p>
                                        </div>

                                        {/* د اړیکو شمیره */}
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                                <FaPhone className="text-secondary-600" />
                                                د اړیکو شمیره:
                                            </label>
                                            <p className="font-medium text-gray-800 mt-1">
                                                {selectedShop.contact_number ||
                                                    "معلومات شتون نلري"}
                                            </p>
                                        </div>

                                        {/* د خیاطۍ ایمیل */}
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                                <FaEnvelope className="text-secondary-600" />
                                                د خیاطۍ ایمیل:
                                            </label>
                                            <p className="font-medium text-gray-800 mt-1">
                                                {selectedShop.shop_email ||
                                                    "معلومات شتون نلري"}
                                            </p>
                                        </div>

                                        {/* د کار ساعتونه */}
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                                <FaClock className="text-secondary-600" />
                                                د کار ساعتونه:
                                            </label>
                                            <p className="font-medium text-gray-800 mt-1">
                                                {selectedShop.working_hours ||
                                                    "معلومات شتون نلري"}
                                            </p>
                                        </div>

                                        {/* وړاندې شوي خدمتونه */}
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                                <FaTools className="text-secondary-600" />
                                                وړاندې شوي خدمتونه:
                                            </label>
                                            <p className="font-medium text-gray-800 mt-1">
                                                {selectedShop.services ||
                                                    "معلومات شتون نلري"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Social Media Links - Always Show */}
                                    <div className="mt-6">
                                        <h4 className="text-lg font-bold text-gray-800 font-zar mb-4 flex items-center gap-2">
                                            <FaFacebook className="text-blue-600" />
                                            ټولنیزو رسنیو معلومات
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {/* د فیسبوک لینک */}
                                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                                <label className="text-sm font-semibold text-blue-600 flex items-center gap-2 mb-2">
                                                    <FaFacebook />
                                                    {"د فیسبوک لینک:"}
                                                </label>
                                                {selectedShop.socialLinks
                                                    ?.facebook ? (
                                                    <a
                                                        href={
                                                            selectedShop
                                                                .socialLinks
                                                                .facebook
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                                                    >
                                                        <FaFacebook />
                                                        لیدل
                                                    </a>
                                                ) : (
                                                    <p className="text-gray-500 text-sm">
                                                        معلومات شتون نلري
                                                    </p>
                                                )}
                                            </div>

                                            {/* د انستګرام لینک */}
                                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                                <label className="text-sm font-semibold text-pink-600 flex items-center gap-2 mb-2">
                                                    <FaInstagram />
                                                    {"د انستګرام لینک:"}
                                                </label>
                                                {selectedShop.socialLinks
                                                    ?.instagram ? (
                                                    <a
                                                        href={
                                                            selectedShop
                                                                .socialLinks
                                                                .instagram
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-3 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200 text-sm font-medium"
                                                    >
                                                        <FaInstagram />
                                                        لیدل
                                                    </a>
                                                ) : (
                                                    <p className="text-gray-500 text-sm">
                                                        معلومات شتون نلري
                                                    </p>
                                                )}
                                            </div>

                                            {/* د ټلګرام لینک */}
                                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                                <label className="text-sm font-semibold text-sky-600 flex items-center gap-2 mb-2">
                                                    <FaTelegram />
                                                    {"د ټلګرام لینک:"}
                                                </label>
                                                {selectedShop.socialLinks
                                                    ?.telegram ? (
                                                    <a
                                                        href={
                                                            selectedShop
                                                                .socialLinks
                                                                .telegram
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-3 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors duration-200 text-sm font-medium"
                                                    >
                                                        <FaTelegram />
                                                        لیدل
                                                    </a>
                                                ) : (
                                                    <p className="text-gray-500 text-sm">
                                                        معلومات شتون نلري
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                    </motion.div>
                </div>
            )}

            {/* Tailor Details Modal */}
            {isTailorModalOpen && selectedTailor && (
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
                                    onClick={closeTailorModal}
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
                                {/* Tailor Profile Section */}
                                <div className="lg:col-span-1">
                                    <div className="text-center mb-6">
                                        <div className="w-48 h-48 mx-auto rounded-xl border-4 border-primary-200 overflow-hidden shadow-lg mb-4">
                                            {selectedTailor.profile_image ? (
                                                <img
                                                    src={`/storage/${selectedTailor.profile_image}`}
                                                    alt={selectedTailor.name}
                                                    className="w-full h-full"
                                                    onError={(e) => {
                                                        e.target.style.display =
                                                            "none";
                                                        e.target.nextSibling.style.display =
                                                            "flex";
                                                    }}
                                                />
                                            ) : null}
                                            <div
                                                className="w-full h-full bg-gray-100 flex items-center justify-center"
                                                style={{
                                                    display:
                                                        selectedTailor.profile_image
                                                            ? "none"
                                                            : "flex",
                                                }}
                                            >
                                                <FaUser className="text-6xl text-gray-400" />
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold font-zar text-gray-800 mb-2">
                                            {selectedTailor.name}
                                        </h3>
                                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
                                            <FaUser className="text-sm" />
                                            خیاط
                                        </span>
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div className="lg:col-span-2">
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                        {/* Personal Information */}
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                                <FaUser className="text-primary-500 mr-2" />
                                                شخصي معلومات
                                            </h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <span className="text-sm text-gray-500">
                                                        نوم:
                                                    </span>
                                                    <p className="font-medium">
                                                        {selectedTailor.name}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-sm text-gray-500">
                                                        بریښنالیک:
                                                    </span>
                                                    <p className="font-medium">
                                                        {selectedTailor.email}
                                                    </p>
                                                </div>
                                                {/*
                                                <div>
                                                    <span className="text-sm text-gray-500">
                                                        تجربه:
                                                    </span>
                                                    <p className="font-medium">
                                                        {
                                                            selectedTailor.experience
                                                        }
                                                        کلونه
                                                    </p>
                                                </div> */}

                                                {/* {selectedTailor.career && (
                                                    <div>
                                                        <span className="text-sm text-gray-500">
                                                            مسلک:
                                                        </span>
                                                        <p className="font-medium">
                                                            {
                                                                selectedTailor.career
                                                            }
                                                        </p>
                                                    </div>
                                                )} */}
                                            </div>
                                        </div>

                                        {/* Professional Information */}
                                        {/* <div className="bg-gray-50 p-4 rounded-xl">
                                            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                                <FaTools className="text-secondary-500 mr-2" />
                                                مسلکي معلومات
                                            </h4>
                                            <div className="space-y-3">
                                                {selectedTailor.skills && (
                                                    <div>
                                                        <span className="text-sm text-gray-500">
                                                            مهارتونه:
                                                        </span>
                                                        <p className="font-medium">
                                                            {
                                                                selectedTailor.skills
                                                            }
                                                        </p>
                                                    </div>
                                                )}
                                                {selectedTailor.work_availability && (
                                                    <div>
                                                        <span className="text-sm text-gray-500">
                                                            د کار شتون:
                                                        </span>
                                                        <p className="font-medium">
                                                            {
                                                                selectedTailor.work_availability
                                                            }
                                                        </p>
                                                    </div>
                                                )}
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
                                            </div>
                                        </div> */}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-6 flex gap-4">
                                        <button
                                            onClick={closeTailorModal}
                                            className="px-6 w-full py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 font-medium"
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

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
} from "react-icons/fa";
import { Head } from "@inertiajs/react";

const Shop = ({ shops }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [processedShops, setProcessedShops] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Process shop data
    useEffect(() => {
        if (shops && shops.length > 0) {
            console.log('Raw shop data:', shops[0]); // Debug: Log first shop's data
            const processed = shops.map((shop) => {
                // Create a new object with all the shop properties
                const processedShop = { ...shop };

                // Process shop images if they exist
                if (shop.shop_images) {
                    try {
                        console.log('Raw shop_images:', shop.shop_images); // Debug: Log raw shop_images
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
                        console.log('Processed images:', images); // Debug: Log processed images
                        processedShop.shopImageUrls = images.map(
                            (image) => `/storage/${image}`
                        );
                        console.log('Final image URLs:', processedShop.shopImageUrls); // Debug: Log final URLs
                    } catch (e) {
                        console.error('Error processing shop images:', e); // Debug: Log processing errors
                        processedShop.shopImageUrls = [];
                    }
                } else {
                    console.log('No shop_images found for shop:', shop.tailoring_name); // Debug: Log missing images
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
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                            >
                                {paginatedShops.length > 0 ? (
                                    paginatedShops.map((shop, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-white rounded-xl overflow-hidden shadow-lg border border-primary-100 hover:shadow-xl transition duration-300 group"
                                            variants={cardVariants}
                                            whileHover="hover"
                                            custom={index}
                                        >
                                            {/* Shop Images Section */}
                                            <div className="relative h-48 bg-gradient-to-br from-primary-500 to-secondary-500">
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    {shop.shopImageUrls && shop.shopImageUrls.length > 0 ? (
                                                        <div className="w-full h-full transform group-hover:scale-110 transition-transform duration-300">
                                                            <img
                                                                src={shop.shopImageUrls[0]}
                                                                alt={shop.tailoring_name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white/90 flex items-center justify-center">
                                                            <FaStore className="text-5xl text-primary-500" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-6">
                                                {/* Shop Name and Badge */}
                                                <div className="text-center mb-6">
                                                    <motion.h2
                                                        className="text-3xl font-bold font-zar text-primary-800 mb-2"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.3 + index * 0.05 }}
                                                    >
                                                        {shop.tailoring_name}
                                                    </motion.h2>
                                                    <motion.div
                                                        className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary-100 text-secondary-700 text-sm font-medium"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.4 + index * 0.05 }}
                                                    >
                                                        <FaStore className="text-sm" />
                                                        <span>د خیاطۍ دوکان</span>
                                                    </motion.div>
                                                </div>

                                                {/* Services Tags */}
                                                {shop.services && (
                                                    <div className="mb-6">
                                                        <h3 className="text-sm font-medium text-gray-500 mb-2">خدمتونه</h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            {shop.services.split(',').map((service, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
                                                                >
                                                                    {service.trim()}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Contact Info */}
                                                <motion.div
                                                    className="space-y-3"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.4 + index * 0.05 }}
                                                >
                                                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                                        <FaMapMarkerAlt className="text-primary-500 flex-shrink-0" />
                                                        <p className="text-sm text-gray-600">{shop.tailoring_address}</p>
                                                    </div>

                                                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                                        <FaPhone className="text-secondary-500 flex-shrink-0" />
                                                        <p className="text-sm text-gray-600">{shop.contact_number}</p>
                                                    </div>

                                                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                                        <FaEnvelope className="text-tertiary-500 flex-shrink-0" />
                                                        <p className="text-sm text-gray-600">{shop.shop_email}</p>
                                                    </div>

                                                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                                        <FaClock className="text-secondary-600 flex-shrink-0" />
                                                        <p className="text-sm text-gray-600">{shop.working_hours}</p>
                                                    </div>

                                                    {shop.payment_methods && (
                                                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                                            <FaCreditCard className="text-primary-600 flex-shrink-0" />
                                                            <p className="text-sm text-gray-600">{shop.payment_methods}</p>
                                                        </div>
                                                    )}
                                                </motion.div>

                                                {/* Social Links */}
                                                {shop.socialLinks && (
                                                    <motion.div
                                                        className="mt-6 flex justify-center gap-4"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.5 + index * 0.05 }}
                                                    >
                                                        {shop.socialLinks.facebook && (
                                                            <a
                                                                href={shop.socialLinks.facebook}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors duration-200"
                                                            >
                                                                <FaFacebook className="text-xl" />
                                                            </a>
                                                        )}
                                                        {shop.socialLinks.instagram && (
                                                            <a
                                                                href={shop.socialLinks.instagram}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 hover:bg-pink-200 transition-colors duration-200"
                                                            >
                                                                <FaInstagram className="text-xl" />
                                                            </a>
                                                        )}
                                                        {shop.socialLinks.telegram && (
                                                            <a
                                                                href={shop.socialLinks.telegram}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors duration-200"
                                                            >
                                                                <FaTelegram className="text-xl" />
                                                            </a>
                                                        )}
                                                    </motion.div>
                                                )}

                                                {/* View Shop Button */}
                                                <motion.div
                                                    className="mt-6"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.5 + index * 0.05 }}
                                                >
                                                    <button className="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform hover:scale-[1.02]">
                                                        دوکان وګورئ
                                                    </button>
                                                </motion.div>
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
        </SiteLayout>
    );
};

export default Shop;

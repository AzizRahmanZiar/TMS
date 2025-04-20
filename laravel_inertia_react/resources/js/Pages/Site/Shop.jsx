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
import { useReg } from "@/Contexts/RegContext";

const Shop = () => {
    const { reg } = useReg(); // Access the reg context
    const [searchTerm, setSearchTerm] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [shops, setShops] = useState([]);
    const [processedShops, setProcessedShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Extract shops from reg data on component mount
    useEffect(() => {
        if (reg && reg.length > 0) {
            // Filter only users with role "Tailor" and addShop=true
            const shopsList = reg.filter(
                (user) => user.role === "Tailor" && user.addShop
            );
            setShops(shopsList);
        } else {
            setShops([]);
        }
        setLoading(false);
    }, [reg]);

    // Process shop images
    useEffect(() => {
        const processShopImages = async () => {
            const processed = shops.map((shop) => {
                // Create a new object with all the shop properties
                const processedShop = { ...shop };

                // Process shop images if they exist
                if (shop.shopImages && shop.shopImages.length > 0) {
                    processedShop.shopImageUrls = shop.shopImages
                        .map((image) => {
                            if (image instanceof File) {
                                return URL.createObjectURL(image);
                            }
                            return null;
                        })
                        .filter(Boolean);
                } else {
                    processedShop.shopImageUrls = [];
                }

                return processedShop;
            });

            setProcessedShops(processed);
        };

        processShopImages();

        // Cleanup function to revoke object URLs
        return () => {
            processedShops.forEach((shop) => {
                if (shop.shopImageUrls) {
                    shop.shopImageUrls.forEach((url) => {
                        if (url) URL.revokeObjectURL(url);
                    });
                }
            });
        };
    }, [shops]);

    // Function to handle filtering
    const handleFilter = () => {
        if (!reg) return;

        let filtered = reg.filter(
            (user) => user.role === "Tailor" && user.addShop
        );

        if (searchTerm) {
            filtered = filtered.filter(
                (shop) =>
                    (shop.tailoringName &&
                        shop.tailoringName
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())) ||
                    (shop.tailoringAddress &&
                        shop.tailoringAddress
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

        setShops(filtered);
        setCurrentPage(1);
    };

    // Function to reset filters
    const resetFilters = () => {
        setSearchTerm("");
        setSpecialization("");
        setPriceRange("");

        if (reg) {
            const shopsList = reg.filter(
                (user) => user.role === "Tailor" && user.addShop
            );
            setShops(shopsList);
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
            {/* Hero Section */}
            <motion.section
                className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className=" mx-auto px-4 ">
                    <motion.h1
                        className="text-3xl md:text-5xl max-w-3xl mx-auto font-bold mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        د خیاطۍ دوکانونه
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl max-w-3xl mx-auto opacity-90"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        د خپلو اړتیاوو لپاره غوره دوکان ومومئ. زموږ دوکانونه د
                        لوړ کیفیت خیاطۍ خدمتونه وړاندې کوي.
                    </motion.p>
                </div>
            </motion.section>

            {/* Search and Filter Section */}
            <motion.section
                className="py-10 bg-primary-50 top-0 z-20 border"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        className="bg-white p-6 rounded-xl border"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.01 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10,
                                }}
                            >
                                <input
                                    type="text"
                                    placeholder="د نوم یا موقعیت له مخې لټون"
                                    className="w-full p-3 border border-primary-200 outline-none rounded-lg pr-10 focus:ring-2 focus:ring-secondary-300 focus:border-secondary-500 transition-all"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400" />
                            </motion.div>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleFilter}
                                    className="flex-1 bg-secondary-600 text-white px-3 py-4 rounded-lg hover:bg-secondary-700 transition duration-300 shadow-md flex items-center justify-center"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <FaFilter className="ml-2" /> فیلټر
                                </button>
                                <button
                                    onClick={resetFilters}
                                    className="flex-1 bg-tertiary-600 text-white px-3 py-4 rounded-lg hover:bg-tertiary-700 transition duration-300 shadow-md"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    بیا تنظیم
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Shops Listing */}
            <section className="py-12 bg-primary-50">
                <div className="mx-auto px-4">
                    {loading ? (
                        <motion.div
                            className="flex justify-center items-center py-20"
                            animate={{ rotate: 360 }}
                            transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 1,
                                ease: "linear",
                            }}
                        >
                            <div className="rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-500"></div>
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
                                            className="bg-white rounded-xl overflow-hidden shadow-lg border border-primary-100 transition duration-300"
                                            variants={cardVariants}
                                            whileHover="hover"
                                            custom={index}
                                        >
                                            <div className="relative h-44 bg-gradient-to-r from-primary-100 to-secondary-100">
                                                {shop.shopImageUrls &&
                                                shop.shopImageUrls.length >
                                                    0 ? (
                                                    <motion.img
                                                        src={
                                                            shop
                                                                .shopImageUrls[0] ||
                                                            "/placeholder.svg"
                                                        }
                                                        alt={shop.tailoringName}
                                                        className="w-full h-full object-cover"
                                                        initial={{ scale: 1.1 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{
                                                            duration: 0.5,
                                                        }}
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                    />
                                                ) : (
                                                    <motion.div
                                                        className="w-full h-full flex items-center justify-center"
                                                        whileHover={{
                                                            backgroundColor:
                                                                "#f0f9ff",
                                                        }}
                                                    >
                                                        <FaStore className="text-6xl text-primary-300" />
                                                    </motion.div>
                                                )}

                                                <motion.div
                                                    className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black to-transparent p-4"
                                                    initial={{
                                                        opacity: 0,
                                                        y: 10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        delay: 0.2,
                                                        duration: 0.4,
                                                    }}
                                                >
                                                    <h3 className="text-white text-xl font-bold">
                                                        {shop.tailoringName ||
                                                            "خیاطي دوکان"}
                                                    </h3>
                                                </motion.div>
                                            </div>

                                            <div className="p-6">
                                                <motion.div
                                                    className="space-y-3 mb-6"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{
                                                        delay: 0.3,
                                                        duration: 0.5,
                                                    }}
                                                >
                                                    <div className="grid grid-cols-2 gap-2 mb-10">
                                                        <motion.div
                                                            className="flex items-start"
                                                            whileHover={{
                                                                x: 3,
                                                            }}
                                                            transition={{
                                                                type: "spring",
                                                                stiffness: 400,
                                                                damping: 10,
                                                            }}
                                                        >
                                                            <FaMapMarkerAlt className="text-secondary-500 mt-1 ml-2 flex-shrink-0" />
                                                            <div className="flex gap-2 items-center">
                                                                <p className="text-sm text-primary-500">
                                                                    پته:
                                                                </p>
                                                                <p className="font-medium">
                                                                    {shop.tailoringAddress ||
                                                                        "نامعلوم"}
                                                                </p>
                                                            </div>
                                                        </motion.div>

                                                        <motion.div
                                                            className="flex items-start"
                                                            whileHover={{
                                                                x: 3,
                                                            }}
                                                            transition={{
                                                                type: "spring",
                                                                stiffness: 400,
                                                                damping: 10,
                                                            }}
                                                        >
                                                            <FaUsers className="text-tertiary-500 mt-1 ml-2 flex-shrink-0" />
                                                            <div className="flex gap-2 items-center">
                                                                <p className="text-sm text-primary-500">
                                                                    د خیاطانو
                                                                    شمیر:
                                                                </p>
                                                                <p className="font-medium">
                                                                    {shop.tailorCount ||
                                                                        "نامعلوم"}
                                                                </p>
                                                            </div>
                                                        </motion.div>

                                                        <motion.div
                                                            className="flex items-start"
                                                            whileHover={{
                                                                x: 3,
                                                            }}
                                                            transition={{
                                                                type: "spring",
                                                                stiffness: 400,
                                                                damping: 10,
                                                            }}
                                                        >
                                                            <FaCalendarAlt className="text-secondary-500 mt-1 ml-2 flex-shrink-0" />
                                                            <div className="flex gap-2 items-center">
                                                                <p className="text-sm text-primary-500">
                                                                    تاسیس:
                                                                </p>
                                                                <p className="font-medium">
                                                                    {shop.publishedYear ||
                                                                        "نامعلوم"}
                                                                </p>
                                                            </div>
                                                        </motion.div>

                                                        <motion.div
                                                            className="flex items-start"
                                                            whileHover={{
                                                                x: 3,
                                                            }}
                                                            transition={{
                                                                type: "spring",
                                                                stiffness: 400,
                                                                damping: 10,
                                                            }}
                                                        >
                                                            <FaPhone className="text-tertiary-500 mt-1 ml-2 flex-shrink-0" />
                                                            <div className="flex gap-2 items-center">
                                                                <p className="text-sm text-primary-500">
                                                                    تماس نمبر:
                                                                </p>
                                                                <p className="font-medium">
                                                                    {shop.contactNumber ||
                                                                        "نامعلوم"}
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                    </div>

                                                    {shop.shopEmail && (
                                                        <motion.div
                                                            className="flex items-start"
                                                            whileHover={{
                                                                x: 3,
                                                            }}
                                                            transition={{
                                                                type: "spring",
                                                                stiffness: 400,
                                                                damping: 10,
                                                            }}
                                                        >
                                                            <FaEnvelope className="text-secondary-500 mt-1 ml-2 flex-shrink-0" />
                                                            <div className="flex gap-2 items-center">
                                                                <p className="text-sm text-primary-500">
                                                                    بریښنالیک:
                                                                </p>
                                                                <p className="font-medium">
                                                                    {
                                                                        shop.shopEmail
                                                                    }
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {shop.workingHours && (
                                                        <motion.div
                                                            className="flex items-start"
                                                            whileHover={{
                                                                x: 3,
                                                            }}
                                                            transition={{
                                                                type: "spring",
                                                                stiffness: 400,
                                                                damping: 10,
                                                            }}
                                                        >
                                                            <FaClock className="text-tertiary-500 mt-1 ml-2 flex-shrink-0" />
                                                            <div className="flex gap-2 items-center">
                                                                <p className="text-sm text-primary-500">
                                                                    کاري
                                                                    ساعتونه:
                                                                </p>
                                                                <p className="font-medium">
                                                                    {
                                                                        shop.workingHours
                                                                    }
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </motion.div>

                                                {shop.services && (
                                                    <motion.div
                                                        className="mb-4 flex items-center gap-2 rounded-lg"
                                                        initial={{
                                                            opacity: 0,
                                                            y: 10,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        transition={{
                                                            delay: 0.4,
                                                            duration: 0.5,
                                                        }}
                                                    >
                                                        <h4 className="font-semibold text-primary-700 flex items-center">
                                                            <FaTools className="ml-1" />{" "}
                                                            خدمتونه:
                                                        </h4>
                                                        <p className="text-primary-700">
                                                            {shop.services}
                                                        </p>
                                                    </motion.div>
                                                )}

                                                {shop.paymentMethods &&
                                                    shop.paymentMethods.length >
                                                        0 && (
                                                        <motion.div
                                                            className="mb-4 flex gap-3"
                                                            initial={{
                                                                opacity: 0,
                                                                y: 10,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                y: 0,
                                                            }}
                                                            transition={{
                                                                delay: 0.5,
                                                                duration: 0.5,
                                                            }}
                                                        >
                                                            <h4 className="font-semibold text-primary-700 mb-2 flex items-center">
                                                                <FaCreditCard className="ml-1" />{" "}
                                                                د تادیاتو طریقې:
                                                            </h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {shop.paymentMethods.map(
                                                                    (
                                                                        method,
                                                                        idx
                                                                    ) => (
                                                                        <motion.span
                                                                            key={
                                                                                idx
                                                                            }
                                                                            className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                                                                            whileHover={{
                                                                                backgroundColor:
                                                                                    "#e0f2fe",
                                                                                scale: 1.05,
                                                                            }}
                                                                        >
                                                                            {
                                                                                method
                                                                            }
                                                                        </motion.span>
                                                                    )
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                {shop.socialLinks && (
                                                    <motion.div
                                                        className="mb-6 flex gap-3"
                                                        initial={{
                                                            opacity: 0,
                                                            y: 10,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        transition={{
                                                            delay: 0.6,
                                                            duration: 0.5,
                                                        }}
                                                    >
                                                        <h4 className="font-semibold text-primary-700 mb-2">
                                                            ټولنیزې شبکې:
                                                        </h4>
                                                        <div className="flex gap-4">
                                                            {shop.socialLinks
                                                                .facebook && (
                                                                <motion.a
                                                                    href={
                                                                        shop
                                                                            .socialLinks
                                                                            .facebook
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-2xl text-primary-600 hover:text-primary-700 transition"
                                                                    whileHover={{
                                                                        scale: 1.2,
                                                                        rotate: 5,
                                                                    }}
                                                                    whileTap={{
                                                                        scale: 0.9,
                                                                    }}
                                                                >
                                                                    <FaFacebook />
                                                                </motion.a>
                                                            )}
                                                            {shop.socialLinks
                                                                .instagram && (
                                                                <motion.a
                                                                    href={
                                                                        shop
                                                                            .socialLinks
                                                                            .instagram
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-2xl text-secondary-600 hover:text-secondary-700 transition"
                                                                    whileHover={{
                                                                        scale: 1.2,
                                                                        rotate: 5,
                                                                    }}
                                                                    whileTap={{
                                                                        scale: 0.9,
                                                                    }}
                                                                >
                                                                    <FaInstagram />
                                                                </motion.a>
                                                            )}
                                                            {shop.socialLinks
                                                                .telegram && (
                                                                <motion.a
                                                                    href={
                                                                        shop
                                                                            .socialLinks
                                                                            .telegram
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-2xl text-tertiary-600 hover:text-tertiary-700 transition"
                                                                    whileHover={{
                                                                        scale: 1.2,
                                                                        rotate: 5,
                                                                    }}
                                                                    whileTap={{
                                                                        scale: 0.9,
                                                                    }}
                                                                >
                                                                    <FaTelegram />
                                                                </motion.a>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        className="col-span-3 text-center py-16"
                                        variants={fadeInUp}
                                    >
                                        <motion.div
                                            className="bg-white p-8 rounded-xl border max-w-lg mx-auto"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <motion.div
                                                className="text-primary-400 text-6xl mb-4"
                                                animate={{
                                                    rotateY: [0, 180, 360],
                                                    scale: [1, 1.1, 1],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    ease: "easeInOut",
                                                    times: [0, 0.5, 1],
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    repeatDelay: 3,
                                                }}
                                            >
                                                <FaStore className="mx-auto" />
                                            </motion.div>
                                            <motion.h3
                                                className="text-xl font-bold text-primary-700 mb-2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{
                                                    delay: 0.3,
                                                    duration: 0.5,
                                                }}
                                            >
                                                هیڅ دوکان ونه موندل شو
                                            </motion.h3>
                                            <motion.p
                                                className="text-primary-500 mb-6"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{
                                                    delay: 0.5,
                                                    duration: 0.5,
                                                }}
                                            >
                                                ستاسو د معیارونو سره سم هیڅ
                                                دوکان ونه موندل شو یا په دې وخت
                                                کې هیڅ دوکان نشته.
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
                                    transition={{ delay: 0.7, duration: 0.5 }}
                                >
                                    <nav className="flex items-center gap-1">
                                        <motion.button
                                            onClick={() =>
                                                goToPage(currentPage - 1)
                                            }
                                            disabled={currentPage === 1}
                                            className={`p-2 rounded-md ${
                                                currentPage === 1
                                                    ? "text-primary-400 cursor-not-allowed"
                                                    : "text-primary-700 hover:bg-primary-100"
                                            }`}
                                            whileHover={
                                                currentPage !== 1
                                                    ? {
                                                          scale: 1.1,
                                                          backgroundColor:
                                                              "#e0f2fe",
                                                      }
                                                    : {}
                                            }
                                            whileTap={
                                                currentPage !== 1
                                                    ? { scale: 0.9 }
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
                                                        className={`w-10 h-10 rounded-md ${
                                                            currentPage ===
                                                            i + 1
                                                                ? "bg-secondary-600 text-white"
                                                                : "text-primary-700 hover:bg-primary-100"
                                                        }`}
                                                        whileHover={
                                                            currentPage !==
                                                            i + 1
                                                                ? { scale: 1.1 }
                                                                : {}
                                                        }
                                                        whileTap={{
                                                            scale: 0.9,
                                                        }}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{
                                                            delay: 0.1 * i,
                                                            duration: 0.3,
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
                                                            delay: 0.1 * i,
                                                            duration: 0.3,
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
                                            className={`p-2 rounded-md ${
                                                currentPage === totalPages
                                                    ? "text-primary-400 cursor-not-allowed"
                                                    : "text-primary-700 hover:bg-primary-100"
                                            }`}
                                            whileHover={
                                                currentPage !== totalPages
                                                    ? {
                                                          scale: 1.1,
                                                          backgroundColor:
                                                              "#e0f2fe",
                                                      }
                                                    : {}
                                            }
                                            whileTap={
                                                currentPage !== totalPages
                                                    ? { scale: 0.9 }
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

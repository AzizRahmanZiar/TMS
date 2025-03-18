"use client";

import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import SiteLayout from "../../Layouts/SiteLayout";
import {
    FaStar,
    FaStarHalfAlt,
    FaRegStar,
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

    // Extract shops from reg data on component mount
    useEffect(() => {
        if (reg && reg.length > 0) {
            // Filter only users with role "Tailor" and addShop=true
            const shopsList = reg.filter(
                (user) => user.role === "Tailor" && user.addShop
            );

            // Add random ratings for demo purposes
            const shopsWithRatings = shopsList.map((shop) => ({
                ...shop,
                rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3.0 and 5.0
            }));

            setShops(shopsWithRatings);
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

        // Add random ratings for demo purposes
        const filteredWithRatings = filtered.map((shop) => ({
            ...shop,
            rating: shop.rating || (Math.random() * 2 + 3).toFixed(1),
        }));

        setShops(filteredWithRatings);
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
            const shopsWithRatings = shopsList.map((shop) => ({
                ...shop,
                rating: (Math.random() * 2 + 3).toFixed(1),
            }));
            setShops(shopsWithRatings);
        }
    };

    // Function to render star ratings
    const renderRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(
                    <FaStarHalfAlt key={i} className="text-yellow-400" />
                );
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-400" />);
            }
        }

        return <div className="flex">{stars}</div>;
    };

    return (
        <SiteLayout title="د خیاطۍ دوکانونه - خیاط ماسټر">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-6">
                        د خیاطۍ دوکانونه
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
                        د خپلو اړتیاوو لپاره غوره دوکان ومومئ. زموږ دوکانونه د
                        لوړ کیفیت خیاطۍ خدمتونه وړاندې کوي.
                    </p>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-10 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="د نوم یا موقعیت له مخې لټون"
                                    className="w-full p-3 border border-gray-300 rounded-lg pr-10 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>

                            <select
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all"
                                value={specialization}
                                onChange={(e) =>
                                    setSpecialization(e.target.value)
                                }
                            >
                                <option value="">ټول تخصصونه</option>
                                <option value="رسمي جامې">رسمي جامې</option>
                                <option value="دودیزې جامې">دودیزې جامې</option>
                                <option value="د واده جامې">د واده جامې</option>
                                <option value="عصري فیشن">عصري فیشن</option>
                                <option value="د ماشومانو جامې">
                                    د ماشومانو جامې
                                </option>
                            </select>

                            <select
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                            >
                                <option value="">ټول قیمتونه</option>
                                <option value="$">$ (ارزانه)</option>
                                <option value="$$">$$ (معیاري)</option>
                                <option value="$$$">$$$ (لوکس)</option>
                            </select>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleFilter}
                                    className="flex-1 bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md flex items-center justify-center"
                                >
                                    <FaFilter className="ml-2" /> فیلټر
                                </button>
                                <button
                                    onClick={resetFilters}
                                    className="flex-1 bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300 shadow-md"
                                >
                                    بیا تنظیم
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shops Listing */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {processedShops.length > 0 ? (
                                processedShops.map((shop, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                                    >
                                        <div className="relative h-64 bg-gradient-to-r from-indigo-100 to-purple-100">
                                            {shop.shopImageUrls &&
                                            shop.shopImageUrls.length > 0 ? (
                                                <img
                                                    src={
                                                        shop.shopImageUrls[0] ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt={shop.tailoringName}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <FaStore className="text-6xl text-gray-300" />
                                                </div>
                                            )}
                                            <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black to-transparent p-4">
                                                <h3 className="text-white text-xl font-bold">
                                                    {shop.tailoringName ||
                                                        "خیاطي دوکان"}
                                                </h3>
                                                <div className="flex items-center text-white">
                                                    {renderRating(shop.rating)}
                                                    <span className="mr-2">
                                                        {shop.rating}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="space-y-3 mb-6">
                                                <div className="flex items-start">
                                                    <FaMapMarkerAlt className="text-red-500 mt-1 ml-2 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            پته
                                                        </p>
                                                        <p className="font-medium">
                                                            {shop.tailoringAddress ||
                                                                "نامعلوم"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start">
                                                    <FaUsers className="text-blue-500 mt-1 ml-2 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            د خیاطانو شمیر
                                                        </p>
                                                        <p className="font-medium">
                                                            {shop.tailorCount ||
                                                                "نامعلوم"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start">
                                                    <FaCalendarAlt className="text-green-500 mt-1 ml-2 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            تاسیس
                                                        </p>
                                                        <p className="font-medium">
                                                            {shop.publishedYear ||
                                                                "نامعلوم"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start">
                                                    <FaPhone className="text-indigo-500 mt-1 ml-2 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            تماس نمبر
                                                        </p>
                                                        <p className="font-medium">
                                                            {shop.contactNumber ||
                                                                "نامعلوم"}
                                                        </p>
                                                    </div>
                                                </div>

                                                {shop.shopEmail && (
                                                    <div className="flex items-start">
                                                        <FaEnvelope className="text-purple-500 mt-1 ml-2 flex-shrink-0" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">
                                                                بریښنالیک
                                                            </p>
                                                            <p className="font-medium">
                                                                {shop.shopEmail}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {shop.workingHours && (
                                                    <div className="flex items-start">
                                                        <FaClock className="text-orange-500 mt-1 ml-2 flex-shrink-0" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">
                                                                کاري ساعتونه
                                                            </p>
                                                            <p className="font-medium">
                                                                {
                                                                    shop.workingHours
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {shop.services && (
                                                <div className="mb-4 bg-indigo-50 p-3 rounded-lg">
                                                    <h4 className="font-semibold text-indigo-700 mb-2 flex items-center">
                                                        <FaTools className="ml-1" />{" "}
                                                        خدمتونه
                                                    </h4>
                                                    <p className="text-gray-700">
                                                        {shop.services}
                                                    </p>
                                                </div>
                                            )}

                                            {shop.paymentMethods &&
                                                shop.paymentMethods.length >
                                                    0 && (
                                                    <div className="mb-4">
                                                        <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                                                            <FaCreditCard className="ml-1" />{" "}
                                                            د تادیاتو طریقې
                                                        </h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {shop.paymentMethods.map(
                                                                (
                                                                    method,
                                                                    idx
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            idx
                                                                        }
                                                                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                                                    >
                                                                        {method}
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                            {shop.socialLinks && (
                                                <div className="mb-6">
                                                    <h4 className="font-semibold text-gray-700 mb-2">
                                                        ټولنیزې شبکې
                                                    </h4>
                                                    <div className="flex gap-4">
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
                                                                className="text-2xl text-blue-600 hover:text-blue-700 transition"
                                                            >
                                                                <FaFacebook />
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
                                                                className="text-2xl text-pink-600 hover:text-pink-700 transition"
                                                            >
                                                                <FaInstagram />
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
                                                                className="text-2xl text-blue-400 hover:text-blue-500 transition"
                                                            >
                                                                <FaTelegram />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/tailoring-shop/${index}`}
                                                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg text-center hover:from-indigo-700 hover:to-purple-700 transition duration-300 shadow-md"
                                                >
                                                    جزئیات وګورئ
                                                </Link>
                                                {shop.contactNumber && (
                                                    <a
                                                        href={`tel:${shop.contactNumber}`}
                                                        className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                                                    >
                                                        <FaPhone />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-3 text-center py-16">
                                    <div className="bg-white p-8 rounded-xl shadow-md max-w-lg mx-auto">
                                        <div className="text-gray-400 text-6xl mb-4">
                                            <FaStore className="mx-auto" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-700 mb-2">
                                            هیڅ دوکان ونه موندل شو
                                        </h3>
                                        <p className="text-gray-500 mb-6">
                                            ستاسو د معیارونو سره سم هیڅ دوکان
                                            ونه موندل شو یا په دې وخت کې هیڅ
                                            دوکان نشته.
                                        </p>
                                        <button
                                            onClick={resetFilters}
                                            className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
                                        >
                                            فیلټرونه بیا تنظیم کړئ
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </SiteLayout>
    );
};

export default Shop;

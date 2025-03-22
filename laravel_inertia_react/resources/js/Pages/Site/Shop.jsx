import { useState, useEffect, useMemo } from "react";
import { Link } from "@inertiajs/react";
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

    return (
        <SiteLayout title="د خیاطۍ دوکانونه - خیاط ماسټر">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
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
            <section className="py-10 bg-primary-50 top-0 z-20 border">
                <div className="container mx-auto px-4">
                    <div className="bg-white p-6 rounded-xl border">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="د نوم یا موقعیت له مخې لټون"
                                    className="w-full p-3 border border-primary-200 rounded-lg pr-10 focus:ring-2 focus:ring-secondary-300 focus:border-secondary-500 transition-all"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400" />
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleFilter}
                                    className="flex-1 bg-secondary-600 text-white p-3 rounded-lg hover:bg-secondary-700 transition duration-300 shadow-md flex items-center justify-center"
                                >
                                    <FaFilter className="ml-2" /> فیلټر
                                </button>
                                <button
                                    onClick={resetFilters}
                                    className="flex-1 bg-tertiary-600 text-white p-3 rounded-lg hover:bg-tertiary-700 transition duration-300 shadow-md"
                                >
                                    بیا تنظیم
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shops Listing */}
            <section className="py-12 bg-primary-50">
                <div className=" mx-auto px-4">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className=" rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-500"></div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {paginatedShops.length > 0 ? (
                                    paginatedShops.map((shop, index) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded-xl overflow-hidden shadow-lg border border-primary-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                                        >
                                            <div className="relative h-44 bg-gradient-to-r from-primary-100 to-secondary-100">
                                                {shop.shopImageUrls &&
                                                shop.shopImageUrls.length >
                                                    0 ? (
                                                    <img
                                                        src={
                                                            shop
                                                                .shopImageUrls[0] ||
                                                            "/placeholder.svg"
                                                        }
                                                        alt={shop.tailoringName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <FaStore className="text-6xl text-primary-300" />
                                                    </div>
                                                )}

                                                <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black to-transparent p-4">
                                                    <h3 className="text-white text-xl font-bold">
                                                        {shop.tailoringName ||
                                                            "خیاطي دوکان"}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <div className="space-y-3  mb-6">
                                                    <div className="grid grid-cols-2 gap-2 mb-10">
                                                        <div className="flex items-start">
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
                                                        </div>

                                                        <div className="flex items-start">
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
                                                        </div>

                                                        <div className="flex items-start">
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
                                                        </div>

                                                        <div className="flex items-start">
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
                                                        </div>
                                                    </div>

                                                    {shop.shopEmail && (
                                                        <div className="flex items-start">
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
                                                        </div>
                                                    )}

                                                    {shop.workingHours && (
                                                        <div className="flex items-start">
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
                                                        </div>
                                                    )}
                                                </div>

                                                {shop.services && (
                                                    <div className="mb-4 flex items-center gap-2 rounded-lg">
                                                        <h4 className="font-semibold text-primary-700 flex items-center">
                                                            <FaTools className="ml-1" />{" "}
                                                            خدمتونه:
                                                        </h4>
                                                        <p className="text-primary-700">
                                                            {shop.services}
                                                        </p>
                                                    </div>
                                                )}

                                                {shop.paymentMethods &&
                                                    shop.paymentMethods.length >
                                                        0 && (
                                                        <div className="mb-4 flex gap-3">
                                                            <h4 className="font-semibold  text-primary-700 mb-2 flex items-center">
                                                                <FaCreditCard className="ml-1" />{" "}
                                                                د تادیاتو طریقې:
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
                                                                            className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                                                                        >
                                                                            {
                                                                                method
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                {shop.socialLinks && (
                                                    <div className="mb-6 flex gap-3">
                                                        <h4 className="font-semibold text-primary-700 mb-2">
                                                            ټولنیزې شبکې:
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
                                                                    className="text-2xl text-primary-600 hover:text-primary-700 transition"
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
                                                                    className="text-2xl text-secondary-600 hover:text-secondary-700 transition"
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
                                                                    className="text-2xl text-tertiary-600 hover:text-tertiary-700 transition"
                                                                >
                                                                    <FaTelegram />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-3 text-center py-16">
                                        <div className="bg-white p-8 rounded-xl border max-w-lg mx-auto">
                                            <div className="text-primary-400 text-6xl mb-4">
                                                <FaStore className="mx-auto" />
                                            </div>
                                            <h3 className="text-xl font-bold text-primary-700 mb-2">
                                                هیڅ دوکان ونه موندل شو
                                            </h3>
                                            <p className="text-primary-500 mb-6">
                                                ستاسو د معیارونو سره سم هیڅ
                                                دوکان ونه موندل شو یا په دې وخت
                                                کې هیڅ دوکان نشته.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {processedShops.length > itemsPerPage && (
                                <div className="mt-12 flex justify-center">
                                    <nav className="flex items-center gap-1">
                                        <button
                                            onClick={() =>
                                                goToPage(currentPage - 1)
                                            }
                                            disabled={currentPage === 1}
                                            className={`p-2 rounded-md ${
                                                currentPage === 1
                                                    ? "text-primary-400 cursor-not-allowed"
                                                    : "text-primary-700 hover:bg-primary-100"
                                            }`}
                                        >
                                            <FaChevronRight className="h-5 w-5" />
                                        </button>

                                        {[...Array(totalPages)].map((_, i) => {
                                            // Show limited page numbers with ellipsis
                                            if (
                                                i === 0 ||
                                                i === totalPages - 1 ||
                                                (i >= currentPage - 2 &&
                                                    i <= currentPage + 2)
                                            ) {
                                                return (
                                                    <button
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
                                                    >
                                                        {i + 1}
                                                    </button>
                                                );
                                            } else if (
                                                i === currentPage - 3 ||
                                                i === currentPage + 3
                                            ) {
                                                return <span key={i}>...</span>;
                                            }
                                            return null;
                                        })}

                                        <button
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
                                        >
                                            <FaChevronLeft className="h-5 w-5" />
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </SiteLayout>
    );
};

export default Shop;

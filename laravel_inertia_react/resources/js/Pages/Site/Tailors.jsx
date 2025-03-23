import { useState, useEffect, useMemo } from "react";
import {
    FaSearch,
    FaUser,
    FaBriefcase,
    FaCertificate,
    FaTools,
    FaHistory,
    FaClock,
    FaChevronLeft,
    FaChevronRight,
    FaStar,
    FaStarHalfAlt,
    FaRegStar,
    FaHeart,
} from "react-icons/fa";
import SiteLayout from "../../Layouts/SiteLayout";
import { useReg } from "@/Contexts/RegContext";
import { useRate } from "@/Contexts/RatingContext";
import { usePosts } from "@/Contexts/PostContext";

const Tailors = () => {
    const { reg } = useReg();
    const { rate } = useRate();
    const { posts } = usePosts();

    const [tailors, setTailors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [processedTailors, setProcessedTailors] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const itemsPerPage = 9;

    // Calculate tailor ratings based on post ratings
    const getTailorRatings = useMemo(() => {
        const tailorRatings = {};

        // Go through all ratings
        rate.forEach((rating) => {
            // Find the post this rating belongs to
            const post = posts.find((post) => post.id === rating.postId);

            if (post) {
                // Get the author of the post (tailor name)
                const tailorName = post.author;

                // If this tailor doesn't have ratings yet, initialize
                if (!tailorRatings[tailorName]) {
                    tailorRatings[tailorName] = {
                        totalRating: 0,
                        count: 0,
                    };
                }

                // Add this rating to the tailor's total
                tailorRatings[tailorName].totalRating += rating.rating;
                tailorRatings[tailorName].count += 1;
            }
        });

        // Calculate average ratings
        const averageRatings = {};
        Object.keys(tailorRatings).forEach((tailorName) => {
            const { totalRating, count } = tailorRatings[tailorName];
            averageRatings[tailorName] = count > 0 ? totalRating / count : 0;
        });

        return averageRatings;
    }, [rate, posts]);

    // Filter tailors from reg data
    useEffect(() => {
        if (reg && reg.length > 0) {
            // Filter only users with role "Tailor"
            const tailorsList = reg.filter((user) => user.role === "Tailor");
            setTailors(tailorsList);
        } else {
            setTailors([]);
        }
        setLoading(false);
    }, [reg]);

    // Process images when tailors change
    useEffect(() => {
        const processTailorImages = async () => {
            const processed = tailors.map((tailor) => {
                // Create a new object with all the tailor properties
                const processedTailor = { ...tailor };

                // Process profile image if it exists and is a File
                if (tailor.profileImage instanceof File) {
                    processedTailor.profileImageUrl = URL.createObjectURL(
                        tailor.profileImage
                    );
                }

                // Add rating from our calculated ratings
                processedTailor.rating = getTailorRatings[tailor.username] || 0;

                return processedTailor;
            });

            setProcessedTailors(processed);
        };

        processTailorImages();

        // Cleanup function to revoke object URLs
        return () => {
            processedTailors.forEach((tailor) => {
                if (tailor.profileImageUrl) {
                    URL.revokeObjectURL(tailor.profileImageUrl);
                }
            });
        };
    }, [tailors, getTailorRatings]);

    // Filter function
    const handleFilter = () => {
        if (!reg) return;

        let filtered = reg.filter((user) => user.role === "Tailor");

        if (searchTerm) {
            filtered = filtered.filter(
                (tailor) =>
                    tailor.username
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    (tailor.career &&
                        tailor.career
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()))
            );
        }
        setTailors(filtered);
        setCurrentPage(1);
    };

    // Reset filters
    const resetFilters = () => {
        setSearchTerm("");
        if (reg) {
            setTailors(reg.filter((user) => user.role === "Tailor"));
        }
        setCurrentPage(1);
    };

    // Pagination logic
    const paginatedTailors = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return processedTailors.slice(startIndex, startIndex + itemsPerPage);
    }, [processedTailors, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(processedTailors.length / itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Toggle favorite
    const toggleFavorite = (tailorId) => {
        if (favorites.includes(tailorId)) {
            setFavorites(favorites.filter((id) => id !== tailorId));
        } else {
            setFavorites([...favorites, tailorId]);
        }
    };

    // Function to render star ratings
    const renderRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(
                    <FaStar key={i} className="text-yellow-400 w-5 h-5" />
                );
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(
                    <FaStarHalfAlt
                        key={i}
                        className="text-yellow-400 w-5 h-5"
                    />
                );
            } else {
                stars.push(
                    <FaRegStar key={i} className="text-yellow-400 w-5 h-5" />
                );
            }
        }

        return <div className="flex">{stars}</div>;
    };

    return (
        <SiteLayout>
            {/* Hero Section */}
            <section className="text-primary-900 py-10 lg:px-10 flex flex-col md:flex-row items-center">
                <div className="mx-auto px-4 text-start md:w-1/2">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        زموږ ماهر خیاطان
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto mb-4">
                        د خپلو اړتیاوو لپاره غوره خیاط ومومئ. زموږ مسلکي کسان د
                        کلونو تجربه لري او په بیلابیلو سټایلونو کې تخصص لري.
                        زموږ هدف د دې لپاره دی چې تاسو ته ځانګړي او د کیفیت
                        لرونکي لباسونه وړاندې کړو، چې ستاسو د شخصیت او سټایل سره
                        سمون خوري. د خیاطۍ هره پروژه د دقیقیت او خلاقیت سره
                        ترسره کیږي، ترڅو تاسو تل خوشحاله او راضي پاتې شئ.
                    </p>
                </div>
                <div className="md:w-1/2">
                    <img
                        src="./imgs/ilus-2.jpg"
                        className="transform scale-x-[-1] p-10"
                        alt="tailor"
                    />
                </div>
            </section>

            {/* Filter section */}
            <section className="py-8 bg-primary-50  top-0 z-20 border">
                <div className="container mx-auto px-4">
                    <div className="bg-white p-6 rounded-xl border">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex flex-1 items-center gap-2 border border-primary-200 p-3 rounded-lg bg-white">
                                <FaSearch className="text-primary-400" />
                                <input
                                    type="text"
                                    placeholder="د خیاط نوم یا تخصص ولیکئ..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="flex-1 outline-none"
                                />
                            </div>
                            <button
                                onClick={handleFilter}
                                className="bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-6 rounded-lg transition duration-200 shadow-md"
                            >
                                لټون
                            </button>
                            <button
                                onClick={resetFilters}
                                className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg transition duration-200 shadow-md"
                            >
                                ریسیټ
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tailors list */}
            <section className="py-12 bg-primary-50">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-500"></div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {paginatedTailors.length > 0 ? (
                                    paginatedTailors.map((tailor, index) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded-xl overflow-hidden shadow-lg border border-primary-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                                        >
                                            <div className="relative">
                                                <div className="h-32 bg-gradient-to-r from-secondary-400 to-tertiary-400"></div>
                                                <button
                                                    onClick={() =>
                                                        toggleFavorite(index)
                                                    }
                                                    className="absolute top-2 right-2 p-2 border bg-opacity-70 rounded-full"
                                                >
                                                    <FaHeart
                                                        className={`text-xl ${
                                                            favorites.includes(
                                                                index
                                                            )
                                                                ? "text-secondary-800"
                                                                : "text-primary-50"
                                                        }`}
                                                    />
                                                </button>
                                                <div className="absolute -bottom-10 inset-x-0 flex justify-center">
                                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-white flex items-center justify-center shadow-lg">
                                                        {tailor.profileImageUrl ? (
                                                            <img
                                                                src={
                                                                    tailor.profileImageUrl ||
                                                                    "/placeholder.svg" ||
                                                                    "/placeholder.svg"
                                                                }
                                                                alt={
                                                                    tailor.username
                                                                }
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <FaUser className="text-primary-300 text-4xl" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-12 p-6">
                                                <div className="text-center mb-4">
                                                    <h2 className="text-xl font-bold text-primary-800">
                                                        {tailor.username}
                                                    </h2>
                                                    <p className="text-secondary-600 font-medium">
                                                        {tailor.career ||
                                                            "خیاط"}
                                                    </p>

                                                    <div className="flex items-center justify-center mt-2">
                                                        {renderRating(
                                                            tailor.rating
                                                        )}
                                                        {tailor.rating > 0 && (
                                                            <span className="mr-1 text-sm text-primary-600">
                                                                (
                                                                {tailor.rating.toFixed(
                                                                    1
                                                                )}
                                                                )
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="space-y-3 mb-6">
                                                    <div className="flex items-start">
                                                        <FaBriefcase className="text-secondary-500 mt-1 ml-2 flex-shrink-0" />
                                                        <div className="flex gap-2 items-center">
                                                            <p className="text-sm text-primary-500">
                                                                تجربه:
                                                            </p>
                                                            <p className="font-medium">
                                                                {tailor.experience
                                                                    ? `${tailor.experience} کاله`
                                                                    : "نامعلوم"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start">
                                                        <FaTools className="text-tertiary-600 mt-1 ml-2 flex-shrink-0" />
                                                        <div className="flex gap-2 items-center">
                                                            <p className="text-sm text-primary-500">
                                                                مهارتونه:
                                                            </p>
                                                            <p className="font-medium">
                                                                {tailor.skills ||
                                                                    "هیڅ مهارت نشته"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start">
                                                        <FaCertificate className="text-secondary-400 mt-1 ml-2 flex-shrink-0" />
                                                        <div className="flex gap-2 items-center">
                                                            <p className="text-sm text-primary-500">
                                                                تصدیق‌نامه:
                                                            </p>
                                                            <p className="font-medium">
                                                                {tailor.certifications ||
                                                                    "هیڅ معلومات نشته"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start">
                                                        <FaHistory className="text-tertiary-500 mt-1 ml-2 flex-shrink-0" />
                                                        <div className="flex gap-2 items-center">
                                                            <p className="text-sm text-primary-500">
                                                                مخکیني کارونه:
                                                            </p>
                                                            <p className="font-medium">
                                                                {tailor.previousWork ||
                                                                    "هیڅ معلومات نشته"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start">
                                                        <FaClock className="text-secondary-600 mt-1 ml-2 flex-shrink-0" />
                                                        <div className="flex gap-2 items-center">
                                                            <p className="text-sm text-primary-500">
                                                                کاري شتون:
                                                            </p>
                                                            <p className="font-medium">
                                                                {tailor.workAvailability ||
                                                                    "نامعلوم"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-3 text-center py-16">
                                        <div className="bg-white p-8 rounded-xl border max-w-lg mx-auto">
                                            <div className="text-primary-400 text-6xl mb-4">
                                                <FaUser className="mx-auto" />
                                            </div>
                                            <h3 className="text-xl font-bold text-primary-700 mb-2">
                                                هیڅ خیاط ونه موندل شو
                                            </h3>
                                            <p className="text-primary-500 mb-6">
                                                په دې وخت کې هیڅ خیاط نشته یا
                                                ستاسو د لټون معیارونه هیڅ پایله
                                                نلري.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {processedTailors.length > itemsPerPage && (
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

export default Tailors;

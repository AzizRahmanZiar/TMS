// import { useState, useEffect, useMemo } from "react";
// import {
//     FaSearch,
//     FaUser,
//     FaBriefcase,
//     FaCertificate,
//     FaTools,
//     FaHistory,
//     FaClock,
//     FaChevronLeft,
//     FaChevronRight,
//     FaEnvelope,
// } from "react-icons/fa";
// import SiteLayout from "../../Layouts/SiteLayout";
// import { useReg } from "@/Contexts/RegContext";
// import { useRate } from "@/Contexts/RatingContext";
// import { usePosts } from "@/Contexts/PostContext";

// const Tailors = () => {
//     const { reg } = useReg();
//     const { rate } = useRate();
//     const { posts } = usePosts();

//     const [tailors, setTailors] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [processedTailors, setProcessedTailors] = useState([]);
//     const [favorites, setFavorites] = useState([]);
//     const itemsPerPage = 9;

//     // Calculate tailor ratings based on post ratings
//     const getTailorRatings = useMemo(() => {
//         const tailorRatings = {};

//         // Go through all ratings
//         rate.forEach((rating) => {
//             // Find the post this rating belongs to
//             const post = posts.find((post) => post.id === rating.postId);

//             if (post) {
//                 // Get the author of the post (tailor name)
//                 const tailorName = post.author;
//                 const tailorEmail = post.email; // Get email from post if available

//                 // Create a unique key using both name and email when available
//                 const tailorKey = tailorEmail
//                     ? `${tailorName}:${tailorEmail}`
//                     : tailorName;

//                 // If this tailor doesn't have ratings yet, initialize
//                 if (!tailorRatings[tailorKey]) {
//                     tailorRatings[tailorKey] = {
//                         totalRating: 0,
//                         count: 0,
//                     };
//                 }

//                 // Add this rating to the tailor's total
//                 tailorRatings[tailorKey].totalRating += rating.rating;
//                 tailorRatings[tailorKey].count += 1;
//             }
//         });

//         // Calculate average ratings
//         const averageRatings = {};
//         Object.keys(tailorRatings).forEach((tailorKey) => {
//             const { totalRating, count } = tailorRatings[tailorKey];
//             averageRatings[tailorKey] = count > 0 ? totalRating / count : 0;
//         });

//         return averageRatings;
//     }, [rate, posts]);

//     // Filter tailors from reg data
//     useEffect(() => {
//         if (reg && reg.length > 0) {
//             // Filter only users with role "Tailor"
//             const tailorsList = reg.filter((user) => user.role === "Tailor");
//             setTailors(tailorsList);
//         } else {
//             setTailors([]);
//         }
//         setLoading(false);
//     }, [reg]);

//     // Process images when tailors change
//     useEffect(() => {
//         const processTailorImages = async () => {
//             const processed = tailors.map((tailor) => {
//                 // Create a new object with all the tailor properties
//                 const processedTailor = { ...tailor };

//                 // Process profile image if it exists and is a File
//                 if (tailor.profileImage instanceof File) {
//                     processedTailor.profileImageUrl = URL.createObjectURL(
//                         tailor.profileImage
//                     );
//                 }

//                 // Create the same key format used in getTailorRatings
//                 const tailorKey = tailor.email
//                     ? `${tailor.username}:${tailor.email}`
//                     : tailor.username;

//                 // Add rating from our calculated ratings
//                 processedTailor.rating = getTailorRatings[tailorKey] || 0;

//                 return processedTailor;
//             });

//             setProcessedTailors(processed);
//         };

//         processTailorImages();

//         // Cleanup function to revoke object URLs
//         return () => {
//             processedTailors.forEach((tailor) => {
//                 if (tailor.profileImageUrl) {
//                     URL.revokeObjectURL(tailor.profileImageUrl);
//                 }
//             });
//         };
//     }, [tailors, getTailorRatings]);

//     // Filter function
//     const handleFilter = () => {
//         if (!reg) return;

//         let filtered = reg.filter((user) => user.role === "Tailor");

//         if (searchTerm) {
//             filtered = filtered.filter(
//                 (tailor) =>
//                     tailor.username
//                         .toLowerCase()
//                         .includes(searchTerm.toLowerCase()) ||
//                     (tailor.career &&
//                         tailor.career
//                             .toLowerCase()
//                             .includes(searchTerm.toLowerCase())) ||
//                     (tailor.email &&
//                         tailor.email
//                             .toLowerCase()
//                             .includes(searchTerm.toLowerCase()))
//             );
//         }
//         setTailors(filtered);
//         setCurrentPage(1);
//     };

//     // Reset filters
//     const resetFilters = () => {
//         setSearchTerm("");
//         if (reg) {
//             setTailors(reg.filter((user) => user.role === "Tailor"));
//         }
//         setCurrentPage(1);
//     };

//     // Pagination logic
//     const paginatedTailors = useMemo(() => {
//         const startIndex = (currentPage - 1) * itemsPerPage;
//         return processedTailors.slice(startIndex, startIndex + itemsPerPage);
//     }, [processedTailors, currentPage, itemsPerPage]);

//     const totalPages = Math.ceil(processedTailors.length / itemsPerPage);

//     const goToPage = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//             window.scrollTo({ top: 0, behavior: "smooth" });
//         }
//     };

//     // Function to render percentage-based rating
//     const renderRatingPercentage = (rating) => {
//         // Convert 5-star rating to percentage (0-100%)
//         const percentage = (rating / 5) * 100;

//         return (
//             <div className="w-full">
//                 <div className="flex justify-between text-xs mb-1">
//                     <span className="font-medium text-primary-700">
//                         درجه بندي
//                     </span>
//                     <span className="font-bold text-primary-900">
//                         {percentage.toFixed(0)}%
//                     </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2.5">
//                     <div
//                         className="bg-secondary-500 h-2.5 rounded-full"
//                         style={{ width: `${percentage}%` }}
//                     ></div>
//                 </div>
//                 <div className="text-xs text-right mt-1 text-primary-600">
//                     {getTailorRatings[
//                         tailor.email
//                             ? `${tailor.username}:${tailor.email}`
//                             : tailor.username
//                     ]?.count || 0}{" "}
//                     کاروونکي
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <SiteLayout>
//             {/* Hero Section */}
//             <section className="text-primary-900 py-10 lg:px-10 flex flex-col md:flex-row items-center">
//                 <div className="mx-auto px-4 text-start md:w-1/2">
//                     <h1 className="text-3xl md:text-4xl font-bold mb-4">
//                         زموږ ماهر خیاطان
//                     </h1>
//                     <p className="text-lg md:text-xl max-w-3xl mx-auto mb-4">
//                         د خپلو اړتیاوو لپاره غوره خیاط ومومئ. زموږ مسلکي کسان د
//                         کلونو تجربه لري او په بیلابیلو سټایلونو کې تخصص لري.
//                     </p>
//                 </div>
//                 <div className="md:w-1/2">
//                     <img
//                         src="./imgs/ilus-2.jpg"
//                         className="transform scale-x-[-1] p-10"
//                         alt="tailor"
//                     />
//                 </div>
//             </section>

//             {/* Filter section */}
//             <section className="py-8 bg-primary-50  top-0 z-20 border">
//                 <div className="container mx-auto px-4">
//                     <div className="bg-white p-6 rounded-xl border">
//                         <div className="flex flex-col md:flex-row gap-4">
//                             <div className="flex flex-1 items-center gap-2 border border-primary-200 p-3 rounded-lg bg-white">
//                                 <FaSearch className="text-primary-400" />
//                                 <input
//                                     type="text"
//                                     placeholder="د خیاط نوم، تخصص یا ایمیل ولیکئ..."
//                                     value={searchTerm}
//                                     onChange={(e) =>
//                                         setSearchTerm(e.target.value)
//                                     }
//                                     className="flex-1 outline-none"
//                                 />
//                             </div>
//                             <button
//                                 onClick={handleFilter}
//                                 className="bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-6 rounded-lg transition duration-200 shadow-md"
//                             >
//                                 لټون
//                             </button>
//                             <button
//                                 onClick={resetFilters}
//                                 className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg transition duration-200 shadow-md"
//                             >
//                                 ریسیټ
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Tailors list */}
//             <section className="py-12 bg-primary-50">
//                 <div className="container mx-auto px-4">
//                     {loading ? (
//                         <div className="flex justify-center items-center py-20">
//                             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-500"></div>
//                         </div>
//                     ) : (
//                         <>
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                                 {paginatedTailors.length > 0 ? (
//                                     paginatedTailors.map((tailor, index) => (
//                                         <div
//                                             key={index}
//                                             className="bg-white rounded-xl overflow-hidden shadow-lg border border-primary-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
//                                         >
//                                             <div className="relative">
//                                                 <div className="h-32 bg-gradient-to-r from-secondary-400 to-tertiary-400"></div>

//                                                 <div className="absolute -bottom-10 inset-x-0 flex justify-center">
//                                                     <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-white flex items-center justify-center shadow-lg">
//                                                         {tailor.profileImageUrl ? (
//                                                             <img
//                                                                 src={
//                                                                     tailor.profileImageUrl ||
//                                                                     "/placeholder.svg" ||
//                                                                     "/placeholder.svg" ||
//                                                                     "/placeholder.svg"
//                                                                 }
//                                                                 alt={
//                                                                     tailor.username
//                                                                 }
//                                                                 className="w-full h-full object-cover"
//                                                             />
//                                                         ) : (
//                                                             <FaUser className="text-primary-300 text-4xl" />
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             <div className="pt-12 p-6">
//                                                 <div className="text-center mb-4">
//                                                     <h2 className="text-xl font-bold text-primary-800">
//                                                         {tailor.username}
//                                                     </h2>
//                                                     <p className="text-secondary-600 font-medium">
//                                                         {tailor.career ||
//                                                             "خیاط"}
//                                                     </p>

//                                                     <div className="mt-4 px-4">
//                                                         {/* Replace star rating with percentage-based rating */}
//                                                         <div className="w-full">
//                                                             <div className="flex justify-between text-xs mb-1">
//                                                                 <span className="font-medium text-primary-700">
//                                                                     درجه بندي
//                                                                 </span>
//                                                                 <span className="font-bold text-primary-900">
//                                                                     {tailor.rating >
//                                                                     0
//                                                                         ? (
//                                                                               (tailor.rating /
//                                                                                   5) *
//                                                                               100
//                                                                           ).toFixed(
//                                                                               0
//                                                                           )
//                                                                         : 0}
//                                                                     %
//                                                                 </span>
//                                                             </div>
//                                                             <div className="w-full bg-gray-200 rounded-full h-2.5">
//                                                                 <div
//                                                                     className="bg-secondary-500 h-2.5 rounded-full"
//                                                                     style={{
//                                                                         width: `${
//                                                                             tailor.rating >
//                                                                             0
//                                                                                 ? (tailor.rating /
//                                                                                       5) *
//                                                                                   100
//                                                                                 : 0
//                                                                         }%`,
//                                                                     }}
//                                                                 ></div>
//                                                             </div>
//                                                             <div className="text-xs text-right mt-1 text-primary-600">
//                                                                 {(() => {
//                                                                     const tailorKey =
//                                                                         tailor.email
//                                                                             ? `${tailor.username}:${tailor.email}`
//                                                                             : tailor.username;
//                                                                     const ratingInfo =
//                                                                         Object.entries(
//                                                                             getTailorRatings
//                                                                         ).find(
//                                                                             ([
//                                                                                 key,
//                                                                             ]) =>
//                                                                                 key ===
//                                                                                 tailorKey
//                                                                         );
//                                                                     return ratingInfo
//                                                                         ? ratingInfo[1]
//                                                                             ? ratingInfo[1]
//                                                                                   .count
//                                                                             : 0
//                                                                         : 0;
//                                                                 })()}{" "}
//                                                                 کاروونکي
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 <div className="space-y-3 mb-6">
//                                                     <div className="flex items-start">
//                                                         <FaBriefcase className="text-secondary-500 mt-1 ml-2 flex-shrink-0" />
//                                                         <div className="flex gap-2 items-center">
//                                                             <p className="text-sm text-primary-500">
//                                                                 تجربه:
//                                                             </p>
//                                                             <p className="font-medium">
//                                                                 {tailor.experience
//                                                                     ? `${tailor.experience} کاله`
//                                                                     : "نامعلوم"}
//                                                             </p>
//                                                         </div>
//                                                     </div>

//                                                     <div className="flex items-start">
//                                                         <FaTools className="text-tertiary-600 mt-1 ml-2 flex-shrink-0" />
//                                                         <div className="flex gap-2 items-center">
//                                                             <p className="text-sm text-primary-500">
//                                                                 مهارتونه:
//                                                             </p>
//                                                             <p className="font-medium">
//                                                                 {tailor.skills ||
//                                                                     "هیڅ مهارت نشته"}
//                                                             </p>
//                                                         </div>
//                                                     </div>

//                                                     <div className="flex items-start">
//                                                         <FaCertificate className="text-secondary-400 mt-1 ml-2 flex-shrink-0" />
//                                                         <div className="flex gap-2 items-center">
//                                                             <p className="text-sm text-primary-500">
//                                                                 تصدیق‌نامه:
//                                                             </p>
//                                                             <p className="font-medium">
//                                                                 {tailor.certifications ||
//                                                                     "هیڅ معلومات نشته"}
//                                                             </p>
//                                                         </div>
//                                                     </div>

//                                                     <div className="flex items-start">
//                                                         <FaHistory className="text-tertiary-500 mt-1 ml-2 flex-shrink-0" />
//                                                         <div className="flex gap-2 items-center">
//                                                             <p className="text-sm text-primary-500">
//                                                                 مخکیني کارونه:
//                                                             </p>
//                                                             <p className="font-medium">
//                                                                 {tailor.previousWork ||
//                                                                     "هیڅ معلومات نشته"}
//                                                             </p>
//                                                         </div>
//                                                     </div>

//                                                     <div className="flex items-start">
//                                                         <FaClock className="text-secondary-600 mt-1 ml-2 flex-shrink-0" />
//                                                         <div className="flex gap-2 items-center">
//                                                             <p className="text-sm text-primary-500">
//                                                                 کاري شتون:
//                                                             </p>
//                                                             <p className="font-medium">
//                                                                 {tailor.workAvailability ||
//                                                                     "نامعلوم"}
//                                                             </p>
//                                                         </div>
//                                                     </div>

//                                                     <div className="flex items-start">
//                                                         <FaEnvelope className="text-tertiary-500 mt-1 ml-2 flex-shrink-0" />
//                                                         <div className="flex gap-2 items-center">
//                                                             <p className="text-sm text-primary-500">
//                                                                 ایمیل:
//                                                             </p>
//                                                             <p className="font-medium">
//                                                                 {tailor.email ||
//                                                                     "هیڅ معلومات نشته"}
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <div className="col-span-3 text-center py-16">
//                                         <div className="bg-white p-8 rounded-xl border max-w-lg mx-auto">
//                                             <div className="text-primary-400 text-6xl mb-4">
//                                                 <FaUser className="mx-auto" />
//                                             </div>
//                                             <h3 className="text-xl font-bold text-primary-700 mb-2">
//                                                 هیڅ خیاط ونه موندل شو
//                                             </h3>
//                                             <p className="text-primary-500 mb-6">
//                                                 په دې وخت کې هیڅ خیاط نشته یا
//                                                 ستاسو د لټون معیارونه هیڅ پایله
//                                                 نلري.
//                                             </p>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Pagination */}
//                             {processedTailors.length > itemsPerPage && (
//                                 <div className="mt-12 flex justify-center">
//                                     <nav className="flex items-center gap-1">
//                                         <button
//                                             onClick={() =>
//                                                 goToPage(currentPage - 1)
//                                             }
//                                             disabled={currentPage === 1}
//                                             className={`p-2 rounded-md ${
//                                                 currentPage === 1
//                                                     ? "text-primary-400 cursor-not-allowed"
//                                                     : "text-primary-700 hover:bg-primary-100"
//                                             }`}
//                                         >
//                                             <FaChevronRight className="h-5 w-5" />
//                                         </button>

//                                         {[...Array(totalPages)].map((_, i) => {
//                                             // Show limited page numbers with ellipsis
//                                             if (
//                                                 i === 0 ||
//                                                 i === totalPages - 1 ||
//                                                 (i >= currentPage - 2 &&
//                                                     i <= currentPage + 2)
//                                             ) {
//                                                 return (
//                                                     <button
//                                                         key={i}
//                                                         onClick={() =>
//                                                             goToPage(i + 1)
//                                                         }
//                                                         className={`w-10 h-10 rounded-md ${
//                                                             currentPage ===
//                                                             i + 1
//                                                                 ? "bg-secondary-600 text-white"
//                                                                 : "text-primary-700 hover:bg-primary-100"
//                                                         }`}
//                                                     >
//                                                         {i + 1}
//                                                     </button>
//                                                 );
//                                             } else if (
//                                                 i === currentPage - 3 ||
//                                                 i === currentPage + 3
//                                             ) {
//                                                 return <span key={i}>...</span>;
//                                             }
//                                             return null;
//                                         })}

//                                         <button
//                                             onClick={() =>
//                                                 goToPage(currentPage + 1)
//                                             }
//                                             disabled={
//                                                 currentPage === totalPages
//                                             }
//                                             className={`p-2 rounded-md ${
//                                                 currentPage === totalPages
//                                                     ? "text-primary-400 cursor-not-allowed"
//                                                     : "text-primary-700 hover:bg-primary-100"
//                                             }`}
//                                         >
//                                             <FaChevronLeft className="h-5 w-5" />
//                                         </button>
//                                     </nav>
//                                 </div>
//                             )}
//                         </>
//                     )}
//                 </div>
//             </section>
//         </SiteLayout>
//     );
// };

// export default Tailors;

"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
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
    FaEnvelope,
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

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } },
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
        hover: {
            y: -12,
            boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
    };

    const progressBarVariants = {
        hidden: { width: 0 },
        visible: (percentage) => ({
            width: `${percentage}%`,
            transition: {
                duration: 1,
                ease: "easeOut",
                delay: 0.3,
            },
        }),
    };

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
                const tailorEmail = post.email; // Get email from post if available

                // Create a unique key using both name and email when available
                const tailorKey = tailorEmail
                    ? `${tailorName}:${tailorEmail}`
                    : tailorName;

                // If this tailor doesn't have ratings yet, initialize
                if (!tailorRatings[tailorKey]) {
                    tailorRatings[tailorKey] = {
                        totalRating: 0,
                        count: 0,
                    };
                }

                // Add this rating to the tailor's total
                tailorRatings[tailorKey].totalRating += rating.rating;
                tailorRatings[tailorKey].count += 1;
            }
        });

        // Calculate average ratings
        const averageRatings = {};
        Object.keys(tailorRatings).forEach((tailorKey) => {
            const { totalRating, count } = tailorRatings[tailorKey];
            averageRatings[tailorKey] = count > 0 ? totalRating / count : 0;
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

                // Create the same key format used in getTailorRatings
                const tailorKey = tailor.email
                    ? `${tailor.username}:${tailor.email}`
                    : tailor.username;

                // Add rating from our calculated ratings
                processedTailor.rating = getTailorRatings[tailorKey] || 0;

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
                            .includes(searchTerm.toLowerCase())) ||
                    (tailor.email &&
                        tailor.email
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

    return (
        <SiteLayout>
            {/* Hero Section */}
            <section className="text-primary-900 py-10 lg:px-10 flex flex-col md:flex-row items-center">
                <motion.div
                    className="mx-auto px-4 text-start md:w-1/2"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <motion.h1
                        className="text-3xl md:text-4xl font-bold mb-4"
                        variants={fadeInUp}
                    >
                        زموږ ماهر خیاطان
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl max-w-3xl mx-auto mb-4"
                        variants={fadeInUp}
                    >
                        د خپلو اړتیاوو لپاره غوره خیاط ومومئ. زموږ مسلکي کسان د
                        کلونو تجربه لري او په بیلابیلو سټایلونو کې تخصص لري.
                    </motion.p>
                </motion.div>
                <motion.div
                    className="md:w-1/2"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <motion.img
                        src="./imgs/ilus-2.jpg"
                        className="transform scale-x-[-1] p-10"
                        alt="tailor"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                </motion.div>
            </section>

            {/* Filter section */}
            <motion.section
                className="py-8 bg-primary-50 top-0 z-20 border"
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
                                    placeholder="د خیاط نوم، تخصص یا ایمیل ولیکئ..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="flex-1 outline-none"
                                />
                            </div>
                            <motion.button
                                onClick={handleFilter}
                                className="bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-6 rounded-lg transition duration-200 shadow-md"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                لټون
                            </motion.button>
                            <motion.button
                                onClick={resetFilters}
                                className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg transition duration-200 shadow-md"
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
            <section className="py-12 bg-primary-50">
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
                                {paginatedTailors.length > 0 ? (
                                    paginatedTailors.map((tailor, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-white rounded-xl overflow-hidden shadow-lg border border-primary-100 hover:shadow-xl transition duration-300"
                                            variants={cardVariants}
                                            whileHover="hover"
                                            custom={index}
                                        >
                                            <div className="relative">
                                                <motion.div
                                                    className="h-32 bg-gradient-to-r from-secondary-400 to-tertiary-400"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{
                                                        duration: 0.5,
                                                    }}
                                                ></motion.div>

                                                <div className="absolute -bottom-10 inset-x-0 flex justify-center">
                                                    <motion.div
                                                        className="w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-white flex items-center justify-center shadow-lg"
                                                        initial={{
                                                            scale: 0,
                                                            opacity: 0,
                                                        }}
                                                        animate={{
                                                            scale: 1,
                                                            opacity: 1,
                                                        }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 260,
                                                            damping: 20,
                                                            delay:
                                                                0.2 +
                                                                index * 0.05,
                                                        }}
                                                    >
                                                        {tailor.profileImageUrl ? (
                                                            <motion.img
                                                                src={
                                                                    tailor.profileImageUrl ||
                                                                    "/placeholder.svg"
                                                                }
                                                                alt={
                                                                    tailor.username
                                                                }
                                                                className="w-full h-full object-cover"
                                                                whileHover={{
                                                                    scale: 1.1,
                                                                }}
                                                                transition={{
                                                                    duration: 0.3,
                                                                }}
                                                            />
                                                        ) : (
                                                            <FaUser className="text-primary-300 text-4xl" />
                                                        )}
                                                    </motion.div>
                                                </div>
                                            </div>

                                            <div className="pt-12 p-6">
                                                <div className="text-center mb-4">
                                                    <motion.h2
                                                        className="text-xl font-bold text-primary-800"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{
                                                            delay:
                                                                0.3 +
                                                                index * 0.05,
                                                        }}
                                                    >
                                                        {tailor.username}
                                                    </motion.h2>
                                                    <motion.p
                                                        className="text-secondary-600 font-medium"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{
                                                            delay:
                                                                0.4 +
                                                                index * 0.05,
                                                        }}
                                                    >
                                                        {tailor.career ||
                                                            "خیاط"}
                                                    </motion.p>

                                                    <motion.div
                                                        className="mt-4 px-4"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{
                                                            delay:
                                                                0.5 +
                                                                index * 0.05,
                                                        }}
                                                    >
                                                        {/* Percentage-based rating with animation */}
                                                        <div className="w-full">
                                                            <div className="flex justify-between text-xs mb-1">
                                                                <span className="font-medium text-primary-700">
                                                                    درجه بندي
                                                                </span>
                                                                <motion.span
                                                                    className="font-bold text-primary-900"
                                                                    initial={{
                                                                        opacity: 0,
                                                                    }}
                                                                    animate={{
                                                                        opacity: 1,
                                                                    }}
                                                                    transition={{
                                                                        delay:
                                                                            0.6 +
                                                                            index *
                                                                                0.05,
                                                                    }}
                                                                >
                                                                    {tailor.rating >
                                                                    0
                                                                        ? (
                                                                              (tailor.rating /
                                                                                  5) *
                                                                              100
                                                                          ).toFixed(
                                                                              0
                                                                          )
                                                                        : 0}
                                                                    %
                                                                </motion.span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                                <motion.div
                                                                    className="bg-secondary-500 h-2.5 rounded-full"
                                                                    variants={
                                                                        progressBarVariants
                                                                    }
                                                                    initial="hidden"
                                                                    animate="visible"
                                                                    custom={
                                                                        tailor.rating >
                                                                        0
                                                                            ? (tailor.rating /
                                                                                  5) *
                                                                              100
                                                                            : 0
                                                                    }
                                                                ></motion.div>
                                                            </div>
                                                            <motion.div
                                                                className="text-xs text-right mt-1 text-primary-600"
                                                                initial={{
                                                                    opacity: 0,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                }}
                                                                transition={{
                                                                    delay:
                                                                        0.7 +
                                                                        index *
                                                                            0.05,
                                                                }}
                                                            >
                                                                {(() => {
                                                                    const tailorKey =
                                                                        tailor.email
                                                                            ? `${tailor.username}:${tailor.email}`
                                                                            : tailor.username;
                                                                    const ratingInfo =
                                                                        Object.entries(
                                                                            getTailorRatings
                                                                        ).find(
                                                                            ([
                                                                                key,
                                                                            ]) =>
                                                                                key ===
                                                                                tailorKey
                                                                        );
                                                                    return ratingInfo
                                                                        ? ratingInfo[1]
                                                                            ? ratingInfo[1]
                                                                                  .count
                                                                            : 0
                                                                        : 0;
                                                                })()}{" "}
                                                                کاروونکي
                                                            </motion.div>
                                                        </div>
                                                    </motion.div>
                                                </div>

                                                <motion.div
                                                    className="space-y-3 mb-6"
                                                    initial={{
                                                        opacity: 0,
                                                        y: 20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        delay:
                                                            0.6 + index * 0.05,
                                                    }}
                                                >
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

                                                    <div className="flex items-start">
                                                        <FaEnvelope className="text-tertiary-500 mt-1 ml-2 flex-shrink-0" />
                                                        <div className="flex gap-2 items-center">
                                                            <p className="text-sm text-primary-500">
                                                                ایمیل:
                                                            </p>
                                                            <p className="font-medium">
                                                                {tailor.email ||
                                                                    "هیڅ معلومات نشته"}
                                                            </p>
                                                        </div>
                                                    </div>
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
                                                <FaUser className="mx-auto" />
                                            </motion.div>
                                            <motion.h3
                                                className="text-xl font-bold text-primary-700 mb-2"
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
                                                className="text-primary-500 mb-6"
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
                                                        className={`w-10 h-10 rounded-md ${
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

export default Tailors;

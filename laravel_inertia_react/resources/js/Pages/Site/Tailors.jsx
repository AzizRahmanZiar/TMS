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
    FaHeart,
} from "react-icons/fa";
import { Link } from "@inertiajs/react";
import SiteLayout from "../../Layouts/SiteLayout";
import { useReg } from "@/Contexts/RegContext";

const Tailors = () => {
    const { reg } = useReg();
    const [tailors, setTailors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [processedTailors, setProcessedTailors] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [ratings, setRatings] = useState({});
    const itemsPerPage = 9;

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
    }, [tailors]);

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

    // Handle rating click
    const handleRatingClick = (tailorId, rating) => {
        setRatings({
            ...ratings,
            [tailorId]: rating,
        });
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
                                    paginatedTailors.map((tailor, index) => {
                                        const tailorRating =
                                            ratings[index] || 0;
                                        return (
                                            <div
                                                key={index}
                                                className="bg-white rounded-xl overflow-hidden shadow-lg border border-primary-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                                            >
                                                <div className="relative">
                                                    <div className="h-32 bg-gradient-to-r from-secondary-400 to-tertiary-400"></div>
                                                    <button
                                                        onClick={() =>
                                                            toggleFavorite(
                                                                index
                                                            )
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
                                                            {[...Array(5)].map(
                                                                (_, i) => (
                                                                    <button
                                                                        key={i}
                                                                        onClick={() =>
                                                                            handleRatingClick(
                                                                                index,
                                                                                i +
                                                                                    1
                                                                            )
                                                                        }
                                                                        className="focus:outline-none mx-0.5"
                                                                    >
                                                                        <FaStar
                                                                            className={`w-5 h-5 ${
                                                                                i <
                                                                                tailorRating
                                                                                    ? "text-yellow-400"
                                                                                    : "text-primary-200"
                                                                            }`}
                                                                        />
                                                                    </button>
                                                                )
                                                            )}
                                                            {tailorRating >
                                                                0 && (
                                                                <span className="mr-1 text-sm text-primary-600">
                                                                    (
                                                                    {
                                                                        tailorRating
                                                                    }
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
                                                                    مخکیني
                                                                    کارونه:
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
                                        );
                                    })
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

// "use client";

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
//     FaStar,
//     FaHeart,
//     FaTimes,
// } from "react-icons/fa";
// import SiteLayout from "../../Layouts/SiteLayout";
// import { useReg } from "@/Contexts/RegContext";

// // RatingModal component defined inside tailors.jsx
// const RatingModal = ({
//     isOpen,
//     onClose,
//     tailorName,
//     onSubmit,
//     initialRating = 0,
// }) => {
//     const [formData, setFormData] = useState({
//         userImage: null,
//         username: "",
//         email: "",
//         password: "",
//         tailorName: tailorName || "",
//         comment: "",
//         rating: initialRating,
//     });

//     const [userImagePreview, setUserImagePreview] = useState(null);
//     const [errors, setErrors] = useState({});

//     // Update tailor name when prop changes
//     useEffect(() => {
//         setFormData((prev) => ({
//             ...prev,
//             tailorName: tailorName || "",
//         }));
//     }, [tailorName]);

//     // Update rating when initialRating changes
//     useEffect(() => {
//         setFormData((prev) => ({
//             ...prev,
//             rating: initialRating,
//         }));
//     }, [initialRating]);

//     const handleChange = (e) => {
//         const { name, value, type, files } = e.target;

//         if (type === "file") {
//             if (files[0]) {
//                 // Validate file type
//                 if (
//                     !["image/jpeg", "image/jpg", "image/png"].includes(
//                         files[0].type
//                     )
//                 ) {
//                     setErrors({
//                         ...errors,
//                         userImage: "فقط JPG، JPEG، او PNG فایلونه اجازه لري",
//                     });
//                     return;
//                 }

//                 setFormData({
//                     ...formData,
//                     userImage: files[0],
//                 });

//                 // Create preview URL
//                 const reader = new FileReader();
//                 reader.onloadend = () => {
//                     setUserImagePreview(reader.result);
//                 };
//                 reader.readAsDataURL(files[0]);

//                 // Clear error if exists
//                 if (errors.userImage) {
//                     const newErrors = { ...errors };
//                     delete newErrors.userImage;
//                     setErrors(newErrors);
//                 }
//             }
//         } else {
//             setFormData({
//                 ...formData,
//                 [name]: value,
//             });
//         }
//     };

//     const handleRatingChange = (newRating) => {
//         setFormData({
//             ...formData,
//             rating: newRating,
//         });
//     };

//     const validateForm = () => {
//         const newErrors = {};

//         if (!formData.username.trim()) {
//             newErrors.username = "نوم ضروري دی";
//         }

//         if (!formData.email.trim()) {
//             newErrors.email = "بریښنالیک ضروري دی";
//         } else if (
//             !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
//         ) {
//             newErrors.email = "بریښنالیک ناسم دی";
//         }

//         if (!formData.password) {
//             newErrors.password = "پټنوم ضروري دی";
//         } else if (formData.password.length < 6) {
//             newErrors.password = "پټنوم باید لږ تر لږه ۶ حروف ولري";
//         }

//         if (!formData.comment.trim()) {
//             newErrors.comment = "نظر ضروري دی";
//         }

//         if (formData.rating === 0) {
//             newErrors.rating = "درجه بندي ضروري ده";
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (validateForm()) {
//             onSubmit(formData);
//             onClose();
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
//             dir="rtl"
//         >
//             <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-y-auto">
//                 <div className=" p-4 border-b">
//                     <button
//                         onClick={onClose}
//                         className="text-gray-500 hover:text-gray-700 transition-colors"
//                     >
//                         <FaTimes className="text-xl" />
//                     </button>
//                 </div>

//                 <form
//                     onSubmit={handleSubmit}
//                     className="p-6 grid grid-cols-2 gap-5"
//                 >
//                     {/* User Image */}
//                     <div>
//                         <label className="block mb-2 font-medium text-sm text-gray-700">
//                             د کارمند تصویر
//                         </label>
//                         <div className="flex items-center space-x-4 space-x-reverse">
//                             <div className="flex-1">
//                                 <input
//                                     type="file"
//                                     name="userImage"
//                                     onChange={handleChange}
//                                     className="w-full p-2 border text-xs rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
//                                     accept=".jpg,.jpeg,.png"
//                                 />
//                                 {errors.userImage && (
//                                     <p className="text-red-500 text-sm mt-1">
//                                         {errors.userImage}
//                                     </p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Username */}
//                     <div>
//                         <label className="block mb-2 font-medium text-sm text-gray-700">
//                             نوم
//                         </label>
//                         <input
//                             type="text"
//                             name="username"
//                             value={formData.username}
//                             onChange={handleChange}
//                             className={`w-full p-3 border text-xs rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
//                                 errors.username
//                                     ? "border-red-500 bg-red-50"
//                                     : "border-gray-300"
//                             }`}
//                             placeholder="خپل نوم ولیکئ"
//                         />
//                         {errors.username && (
//                             <p className="text-red-500 text-sm mt-1">
//                                 {errors.username}
//                             </p>
//                         )}
//                     </div>

//                     {/* Email */}
//                     <div>
//                         <label className="block mb-2 font-medium text-sm text-gray-700">
//                             بریښنالیک
//                         </label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             className={`w-full p-3 border text-xs rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
//                                 errors.email
//                                     ? "border-red-500 bg-red-50"
//                                     : "border-gray-300"
//                             }`}
//                             placeholder="خپل بریښنالیک ولیکئ"
//                         />
//                         {errors.email && (
//                             <p className="text-red-500 text-sm mt-1">
//                                 {errors.email}
//                             </p>
//                         )}
//                     </div>

//                     {/* Password */}
//                     <div>
//                         <label className="block mb-2 font-medium text-sm text-gray-700">
//                             پټنوم
//                         </label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             className={`w-full p-3 border text-xs rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
//                                 errors.password
//                                     ? "border-red-500 bg-red-50"
//                                     : "border-gray-300"
//                             }`}
//                             placeholder="خپل پټنوم ولیکئ"
//                         />
//                         {errors.password && (
//                             <p className="text-red-500 text-sm mt-1">
//                                 {errors.password}
//                             </p>
//                         )}
//                     </div>

//                     {/* Tailor Name (Read-only) */}
//                     <div>
//                         <label className="block mb-2 font-medium text-sm text-gray-700">
//                             د خیاط نوم
//                         </label>
//                         <input
//                             type="text"
//                             name="tailorName"
//                             value={formData.tailorName}
//                             readOnly
//                             className="w-full p-3 border text-xs border-gray-300 rounded-lg bg-gray-50"
//                         />
//                     </div>

//                     {/* Rating */}
//                     <div>
//                         <label className="block mb-2 font-medium text-sm text-gray-700">
//                             درجه بندي
//                         </label>
//                         <div className="flex items-center ">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                                 <button
//                                     key={star}
//                                     type="button"
//                                     onClick={() => handleRatingChange(star)}
//                                     className="focus:outline-none mx-1 "
//                                 >
//                                     <FaStar
//                                         className={`w-8 h-8  ${
//                                             star <= formData.rating
//                                                 ? "text-yellow-400"
//                                                 : "text-gray-300"
//                                         }`}
//                                     />
//                                 </button>
//                             ))}
//                         </div>
//                         {errors.rating && (
//                             <p className="text-red-500 text-sm mt-1">
//                                 {errors.rating}
//                             </p>
//                         )}
//                     </div>

//                     {/* Comment */}
//                     <div>
//                         <label className="block mb-2 font-medium text-sm text-gray-700">
//                             نظر
//                         </label>
//                         <textarea
//                             name="comment"
//                             value={formData.comment}
//                             onChange={handleChange}
//                             rows="4"
//                             className={`w-full p-3 text-xs border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
//                                 errors.comment
//                                     ? "border-red-500 bg-red-50"
//                                     : "border-gray-300"
//                             }`}
//                             placeholder="خپل نظر ولیکئ..."
//                         ></textarea>
//                         {errors.comment && (
//                             <p className="text-red-500 text-sm mt-1">
//                                 {errors.comment}
//                             </p>
//                         )}
//                     </div>

//                     {/* Submit Button */}
//                     <div className="flex items-end mb-2 justify-end">
//                         <button
//                             type="submit"
//                             className=" bg-secondary-600 hover:bg-secondary-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md"
//                         >
//                             ثبت کول
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// const Tailors = () => {
//     const { reg } = useReg();
//     const [tailors, setTailors] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [processedTailors, setProcessedTailors] = useState([]);
//     const [favorites, setFavorites] = useState([]);
//     const [ratings, setRatings] = useState({});
//     const [ratingCounts, setRatingCounts] = useState({});
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedTailor, setSelectedTailor] = useState(null);
//     const [selectedRating, setSelectedRating] = useState(0);
//     const itemsPerPage = 9;

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
//     }, [tailors]);

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

//     // Toggle favorite
//     const toggleFavorite = (tailorId) => {
//         if (favorites.includes(tailorId)) {
//             setFavorites(favorites.filter((id) => id !== tailorId));
//         } else {
//             setFavorites([...favorites, tailorId]);
//         }
//     };

//     // Handle rating click
//     const handleRatingClick = (tailorId, rating) => {
//         setSelectedTailor(tailorId);
//         setSelectedRating(rating);
//         setIsModalOpen(true);
//     };

//     // Handle rating submission
//     const handleRatingSubmit = (formData) => {
//         const tailorId = selectedTailor;
//         const newRating = formData.rating;

//         // Update the ratings state
//         setRatings({
//             ...ratings,
//             [tailorId]: newRating,
//         });

//         // Update rating counts
//         setRatingCounts({
//             ...ratingCounts,
//             [tailorId]: (ratingCounts[tailorId] || 0) + 1,
//         });

//         // Here you would typically send the rating data to your backend
//         console.log("Rating submitted:", formData);
//     };

//     // Calculate average rating
//     const getAverageRating = (tailorId) => {
//         if (!ratingCounts[tailorId] || ratingCounts[tailorId] === 0) {
//             return ratings[tailorId] || 0;
//         }
//         return ratings[tailorId] || 0;
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
//                         زموږ هدف د دې لپاره دی چې تاسو ته ځانګړي او د کیفیت
//                         لرونکي لباسونه وړاندې کړو، چې ستاسو د شخصیت او سټایل سره
//                         سمون خوري. د خیاطۍ هره پروژه د دقیقیت او خلاقیت سره
//                         ترسره کیږي، ترڅو تاسو تل خوشحاله او راضي پاتې شئ.
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
//                                     placeholder="د خیاط نوم یا تخصص ولیکئ..."
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
//                                     paginatedTailors.map((tailor, index) => {
//                                         const tailorRating =
//                                             getAverageRating(index);
//                                         return (
//                                             <div
//                                                 key={index}
//                                                 className="bg-white rounded-xl overflow-hidden shadow-lg border border-primary-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
//                                             >
//                                                 <div className="relative">
//                                                     <div className="h-32 bg-gradient-to-r from-secondary-400 to-tertiary-400"></div>
//                                                     <button
//                                                         onClick={() =>
//                                                             toggleFavorite(
//                                                                 index
//                                                             )
//                                                         }
//                                                         className="absolute top-2 right-2 p-2 border bg-opacity-70 rounded-full"
//                                                     >
//                                                         <FaHeart
//                                                             className={`text-xl ${
//                                                                 favorites.includes(
//                                                                     index
//                                                                 )
//                                                                     ? "text-secondary-800"
//                                                                     : "text-primary-50"
//                                                             }`}
//                                                         />
//                                                     </button>
//                                                     <div className="absolute -bottom-10 inset-x-0 flex justify-center">
//                                                         <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-white flex items-center justify-center shadow-lg">
//                                                             {tailor.profileImageUrl ? (
//                                                                 <img
//                                                                     src={
//                                                                         tailor.profileImageUrl ||
//                                                                         "/placeholder.svg" ||
//                                                                         "/placeholder.svg"
//                                                                     }
//                                                                     alt={
//                                                                         tailor.username
//                                                                     }
//                                                                     className="w-full h-full object-cover"
//                                                                 />
//                                                             ) : (
//                                                                 <FaUser className="text-primary-300 text-4xl" />
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 <div className="pt-12 p-6">
//                                                     <div className="text-center mb-4">
//                                                         <h2 className="text-xl font-bold text-primary-800">
//                                                             {tailor.username}
//                                                         </h2>
//                                                         <p className="text-secondary-600 font-medium">
//                                                             {tailor.career ||
//                                                                 "خیاط"}
//                                                         </p>

//                                                         <div className="flex items-center justify-center mt-2">
//                                                             {[...Array(5)].map(
//                                                                 (_, i) => (
//                                                                     <button
//                                                                         key={i}
//                                                                         onClick={() =>
//                                                                             handleRatingClick(
//                                                                                 index,
//                                                                                 i +
//                                                                                     1
//                                                                             )
//                                                                         }
//                                                                         className="focus:outline-none mx-0.5"
//                                                                     >
//                                                                         <FaStar
//                                                                             className={`w-5 h-5 ${
//                                                                                 i <
//                                                                                 tailorRating
//                                                                                     ? "text-yellow-400"
//                                                                                     : "text-primary-200"
//                                                                             }`}
//                                                                         />
//                                                                     </button>
//                                                                 )
//                                                             )}
//                                                             {tailorRating >
//                                                                 0 && (
//                                                                 <span className="mr-1 text-sm text-primary-600">
//                                                                     (
//                                                                     {
//                                                                         tailorRating
//                                                                     }
//                                                                     )
//                                                                 </span>
//                                                             )}
//                                                         </div>
//                                                     </div>

//                                                     <div className="space-y-3 mb-6">
//                                                         <div className="flex items-start">
//                                                             <FaBriefcase className="text-secondary-500 mt-1 ml-2 flex-shrink-0" />
//                                                             <div className="flex gap-2 items-center">
//                                                                 <p className="text-sm text-primary-500">
//                                                                     تجربه:
//                                                                 </p>
//                                                                 <p className="font-medium">
//                                                                     {tailor.experience
//                                                                         ? `${tailor.experience} کاله`
//                                                                         : "نامعلوم"}
//                                                                 </p>
//                                                             </div>
//                                                         </div>

//                                                         <div className="flex items-start">
//                                                             <FaTools className="text-tertiary-600 mt-1 ml-2 flex-shrink-0" />
//                                                             <div className="flex gap-2 items-center">
//                                                                 <p className="text-sm text-primary-500">
//                                                                     مهارتونه:
//                                                                 </p>
//                                                                 <p className="font-medium">
//                                                                     {tailor.skills ||
//                                                                         "هیڅ مهارت نشته"}
//                                                                 </p>
//                                                             </div>
//                                                         </div>

//                                                         <div className="flex items-start">
//                                                             <FaCertificate className="text-secondary-400 mt-1 ml-2 flex-shrink-0" />
//                                                             <div className="flex gap-2 items-center">
//                                                                 <p className="text-sm text-primary-500">
//                                                                     تصدیق‌نامه:
//                                                                 </p>
//                                                                 <p className="font-medium">
//                                                                     {tailor.certifications ||
//                                                                         "هیڅ معلومات نشته"}
//                                                                 </p>
//                                                             </div>
//                                                         </div>

//                                                         <div className="flex items-start">
//                                                             <FaHistory className="text-tertiary-500 mt-1 ml-2 flex-shrink-0" />
//                                                             <div className="flex gap-2 items-center">
//                                                                 <p className="text-sm text-primary-500">
//                                                                     مخکیني
//                                                                     کارونه:
//                                                                 </p>
//                                                                 <p className="font-medium">
//                                                                     {tailor.previousWork ||
//                                                                         "هیڅ معلومات نشته"}
//                                                                 </p>
//                                                             </div>
//                                                         </div>

//                                                         <div className="flex items-start">
//                                                             <FaClock className="text-secondary-600 mt-1 ml-2 flex-shrink-0" />
//                                                             <div className="flex gap-2 items-center">
//                                                                 <p className="text-sm text-primary-500">
//                                                                     کاري شتون:
//                                                                 </p>
//                                                                 <p className="font-medium">
//                                                                     {tailor.workAvailability ||
//                                                                         "نامعلوم"}
//                                                                 </p>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         );
//                                     })
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

//             {/* Rating Modal */}
//             {selectedTailor !== null && (
//                 <RatingModal
//                     isOpen={isModalOpen}
//                     onClose={() => setIsModalOpen(false)}
//                     tailorName={
//                         paginatedTailors[selectedTailor]?.username || ""
//                     }
//                     initialRating={selectedRating}
//                     onSubmit={handleRatingSubmit}
//                 />
//             )}
//         </SiteLayout>
//     );
// };

// export default Tailors;

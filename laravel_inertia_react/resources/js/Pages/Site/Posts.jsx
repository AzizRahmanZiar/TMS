// import React, { useState, useEffect } from "react";
// import { Link } from "@inertiajs/react";
// import SiteLayout from "../../Layouts/SiteLayout";
// import {
//     FaCalendarAlt,
//     FaUser,
//     FaComment,
//     FaSearch,
//     FaArrowRight,
// } from "react-icons/fa";
// import { usePosts } from "@/Contexts/PostContext";

// const Post = () => {
//     const { posts, setPosts } = usePosts();

//     const [searchTerm, setSearchTerm] = useState("");
//     const [category, setCategory] = useState("");

//     // د فلټر بېرته تنظیم کولو لپاره اصلي پوسټونه ذخیره کوو
//     const [originalPosts, setOriginalPosts] = useState([]);

//     // کله چې Component ماؤنټ شي، نو اصلي پوسټونه ذخیره کوو
//     useEffect(() => {
//         setOriginalPosts(posts);
//     }, [posts]);

//     // Get unique categories
//     const categories = [...new Set(originalPosts.map((post) => post.category))];

//     // Function to handle filtering
//     const handleFilter = () => {
//         let filtered = originalPosts;

//         if (searchTerm) {
//             filtered = filtered.filter(
//                 (post) =>
//                     post.title
//                         .toLowerCase()
//                         .includes(searchTerm.toLowerCase()) ||
//                     post.description
//                         .toLowerCase()
//                         .includes(searchTerm.toLowerCase()) ||
//                     post.author.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         if (category) {
//             filtered = filtered.filter((post) => post.category === category);
//         }

//         setPosts(filtered);
//     };

//     // Function to reset filters
//     const resetFilters = () => {
//         setSearchTerm("");
//         setCategory("");
//         setPosts(originalPosts);
//     };

//     return (
//         <SiteLayout title="پوسټونه - خیاط ماسټر">
//             {/* Hero Section */}
//             <section className="text-primary-900 py-10 lg:px-10 flex flex-col md:flex-row items-center">
//                 <div className="container mx-auto px-4 text-center w-1/2">
//                     <h1 className="text-3xl md:text-4xl font-bold mb-4">
//                         زموږ بلاګ
//                     </h1>
//                     <p className="text-lg md:text-xl max-w-3xl mx-auto">
//                         د خیاطۍ، فیشن او د جامو په اړه تازه مقالې او معلومات
//                         ترلاسه کړئ.
//                     </p>
//                 </div>
//                 <div className="w-1/2">
//                     <img src="./imgs/blog.jpg" alt="posts" />
//                 </div>
//             </section>

//             {/* Search and Filter Section */}
//             <section className="py-8 bg-gray-100">
//                 <div className="container mx-auto px-4">
//                     <div className="bg-white p-6 rounded-lg border">
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             <div className="relative">
//                                 <input
//                                     type="text"
//                                     placeholder="د عنوان یا لیکوال له مخې لټون"
//                                     className="w-full p-3 border border-gray-300 rounded-md pr-10"
//                                     value={searchTerm}
//                                     onChange={(e) =>
//                                         setSearchTerm(e.target.value)
//                                     }
//                                 />
//                                 <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400" />
//                             </div>

//                             <select
//                                 className="w-full p-3 border border-gray-300  rounded-md"
//                                 value={category}
//                                 onChange={(e) => setCategory(e.target.value)}
//                             >
//                                 <option value="">ټولې کټګورۍ</option>
//                                 {categories.map((cat, index) => (
//                                     <option key={index} value={cat}>
//                                         {cat}
//                                     </option>
//                                 ))}
//                             </select>

//                             <div className="flex gap-2">
//                                 <button
//                                     onClick={handleFilter}
//                                     className="flex-1 bg-secondary-600 text-primary-50 p-3 rounded-md hover:bg-secondary-700 transition"
//                                 >
//                                     لټون
//                                 </button>
//                                 <button
//                                     onClick={resetFilters}
//                                     className="flex-1 bg-tertiary-600 text-primary-50 p-3 rounded-md hover:bg-tertiary-700 transition"
//                                 >
//                                     بیا تنظیم
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Posts Listing */}
//             <section className="py-12">
//                 <div className="container mx-auto px-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {posts.map((post) => (
//                             <div
//                                 key={post.id}
//                                 className="bg-primary-50 rounded-lg border overflow-hidden"
//                             >
//                                 <img
//                                     src={post.image}
//                                     alt={post.title}
//                                     className="w-full h-64"
//                                 />
//                                 <div className="p-6">
//                                     <div className="flex justify-between items-center text-sm text-primary-500 mb-3">
//                                         <div className="flex items-center">
//                                             <FaCalendarAlt className="ml-1" />
//                                             {post.date}
//                                         </div>
//                                         <div className="flex items-center">
//                                             <FaUser className="ml-1" />
//                                             {post.author}
//                                         </div>
//                                         <div className="flex items-center">
//                                             <FaComment className="ml-1" />
//                                             {post.comments}
//                                         </div>
//                                     </div>

//                                     <h3 className="font-bold text-tertiary-700 text-xl mb-2">
//                                         {post.title}
//                                     </h3>
//                                     <p className="text-primary-700 mb-4">
//                                         {post.description}
//                                     </p>

//                                     <Link
//                                         href="#"
//                                         className="text-secondary-600 font-medium flex items-center hover:text-secondary-700 transition"
//                                     >
//                                         نور ولولئ
//                                         <FaArrowRight className="mr-2" />
//                                     </Link>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {posts.length === 0 && (
//                         <div className="text-center py-12">
//                             <p className="text-xl text-gray-600">
//                                 ستاسو د معیارونو سره سم هیڅ پوسټ ونه موندل شو.
//                             </p>
//                             <button
//                                 onClick={resetFilters}
//                                 className="mt-4 bg-secondary-600 text-primary-50 py-2 px-6 rounded hover:bg-secondary-700 transition"
//                             >
//                                 فیلټرونه بیا تنظیم کړئ
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </section>
//         </SiteLayout>
//     );
// };

// export default Post;

"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import SiteLayout from "../../Layouts/SiteLayout";
import {
    FaCalendarAlt,
    FaUser,
    FaStar,
    FaSearch,
    FaArrowRight,
    FaUpload,
} from "react-icons/fa";
import { usePosts } from "@/Contexts/PostContext";

const Post = () => {
    const { posts, setPosts } = usePosts();

    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [originalPosts, setOriginalPosts] = useState([]);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedRating, setSelectedRating] = useState(0);

    // Form state
    const [formData, setFormData] = useState({
        username: "",
        userEmail: "",
        comment: "",
    });

    // Form validation state
    const [errors, setErrors] = useState({});

    // File input ref
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        setOriginalPosts(posts);
    }, [posts]);

    // Get unique categories
    const categories = [...new Set(originalPosts.map((post) => post.category))];

    // Function to handle filtering
    const handleFilter = () => {
        let filtered = originalPosts;

        if (searchTerm) {
            filtered = filtered.filter(
                (post) =>
                    post.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    post.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    post.author.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (category) {
            filtered = filtered.filter((post) => post.category === category);
        }

        setPosts(filtered);
    };

    // Function to reset filters
    const resetFilters = () => {
        setSearchTerm("");
        setCategory("");
        setPosts(originalPosts);
    };

    // Function to handle star click
    const handleStarClick = (post, rating) => {
        setSelectedPost(post);
        setSelectedRating(rating);
        setShowModal(true);
    };

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear error for this field when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null,
            });
        }
    };

    // Function to handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Validate file type
            const validTypes = [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp",
            ];
            if (!validTypes.includes(file.type)) {
                setErrors({
                    ...errors,
                    userImage:
                        "یوازې د انځور فایلونه (JPG, PNG, GIF, WEBP) اجازه لري",
                });
                return;
            }

            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                setErrors({
                    ...errors,
                    userImage: "د انځور اندازه باید له 2MB څخه کمه وي",
                });
                return;
            }

            setSelectedFile(file);
            setErrors({
                ...errors,
                userImage: null,
            });

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "نوم اړین دی";
        } else if (formData.username.trim().length < 3) {
            newErrors.username = "نوم باید لږ تر لږه 3 توري ولري";
        }

        if (!formData.userEmail.trim()) {
            newErrors.userEmail = "برېښنالیک اړین دی";
        } else if (!/\S+@\S+\.\S+/.test(formData.userEmail)) {
            newErrors.userEmail = "د برېښنالیک بڼه سمه نه ده";
        }

        if (!formData.comment.trim()) {
            newErrors.comment = "نظر اړین دی";
        } else if (formData.comment.trim().length < 10) {
            newErrors.comment = "نظر باید لږ تر لږه 10 توري ولري";
        }

        if (!selectedFile) {
            newErrors.userImage = "انځور اړین دی";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Function to handle form submission
    const handleSubmitRating = (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Update only the rating on the post
        const updatedPosts = posts.map((post) => {
            if (post.id === selectedPost.id) {
                return {
                    ...post,
                    rating: selectedRating,
                };
            }
            return post;
        });

        // Update posts state
        setPosts(updatedPosts);

        // Also update original posts to maintain consistency
        setOriginalPosts(updatedPosts);

        // Reset form and close modal
        setFormData({
            username: "",
            userEmail: "",
            comment: "",
        });
        setSelectedFile(null);
        setPreviewUrl(null);
        setShowModal(false);
    };

    // Function to close modal and reset form
    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
            username: "",
            userEmail: "",
            comment: "",
        });
        setSelectedFile(null);
        setPreviewUrl(null);
        setErrors({});
    };

    // Function to render star ratings (clickable)
    const renderStarRating = (post, currentRating, isClickable = false) => {
        const stars = [];
        const maxRating = 5;

        for (let i = 1; i <= maxRating; i++) {
            stars.push(
                <FaStar
                    key={i}
                    className={`${
                        i <= currentRating ? "text-yellow-500" : "text-gray-300"
                    } ${
                        isClickable
                            ? "cursor-pointer hover:text-yellow-400"
                            : ""
                    }`}
                    onClick={
                        isClickable ? () => handleStarClick(post, i) : undefined
                    }
                />
            );
        }

        return <div className="flex">{stars}</div>;
    };

    // Function to render modal form
    const renderRatingModal = () => {
        if (!showModal || !selectedPost) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-6 max-w-3xl w-full">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">ارزونه ورکړئ</h3>
                    </div>

                    <form onSubmit={handleSubmitRating}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2 font-medium">
                                        د پوسټ لیکوال
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        value={selectedPost.author}
                                        disabled
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium">
                                        ستاسو نوم{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        className={`w-full p-2 border ${
                                            errors.username
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md`}
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.username && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.username}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium">
                                        ستاسو برېښنالیک{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="userEmail"
                                        className={`w-full p-2 border ${
                                            errors.userEmail
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md`}
                                        value={formData.userEmail}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.userEmail && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.userEmail}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium">
                                        درجه{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                className={
                                                    star <= selectedRating
                                                        ? "text-yellow-500 text-2xl cursor-pointer"
                                                        : "text-gray-300 text-2xl cursor-pointer"
                                                }
                                                onClick={() =>
                                                    setSelectedRating(star)
                                                }
                                            />
                                        ))}
                                        <span className="mr-2">
                                            ({selectedRating}/5)
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2 font-medium">
                                        ستاسو انځور{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex flex-col">
                                        <div className="flex items-center">
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                            <button
                                                type="button"
                                                className={`flex items-center justify-center p-2 border ${
                                                    errors.userImage
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                } rounded-md w-full`}
                                                onClick={() =>
                                                    fileInputRef.current.click()
                                                }
                                            >
                                                <FaUpload className="mr-2" />
                                                انځور پورته کړئ
                                            </button>
                                        </div>
                                        {errors.userImage && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.userImage}
                                            </p>
                                        )}
                                        {previewUrl && (
                                            <div className="mt-2">
                                                <img
                                                    src={
                                                        previewUrl ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt="Preview"
                                                    className="h-24 w-24 object-cover rounded-md"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium">
                                        نظر{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="comment"
                                        className={`w-full p-2 border ${
                                            errors.comment
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md min-h-[120px]`}
                                        value={formData.comment}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                    {errors.comment && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.comment}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                type="button"
                                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                                onClick={handleCloseModal}
                            >
                                لغو کول
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-secondary-600 text-white rounded-md hover:bg-secondary-700 transition"
                            >
                                ارزونه ثبت کړئ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <SiteLayout title="پوسټونه - خیاط ماسټر">
            {/* Hero Section */}
            <section className="text-primary-900 py-10 lg:px-10 flex flex-col md:flex-row items-center">
                <div className="container mx-auto px-4 text-center w-1/2">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        زموږ بلاګ
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">
                        د خیاطۍ، فیشن او د جامو په اړه تازه مقالې او معلومات
                        ترلاسه کړئ.
                    </p>
                </div>
                <div className="w-1/2">
                    <img src="./imgs/blog.jpg" alt="posts" />
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-8 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="bg-white p-6 rounded-lg border">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="د عنوان یا لیکوال له مخې لټون"
                                    className="w-full p-3 border border-gray-300 rounded-md pr-10"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400" />
                            </div>

                            <select
                                className="w-full p-3 border border-gray-300 rounded-md"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">ټولې کټګورۍ</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleFilter}
                                    className="flex-1 bg-secondary-600 text-primary-50 p-3 rounded-md hover:bg-secondary-700 transition"
                                >
                                    لټون
                                </button>
                                <button
                                    onClick={resetFilters}
                                    className="flex-1 bg-tertiary-600 text-primary-50 p-3 rounded-md hover:bg-tertiary-700 transition"
                                >
                                    بیا تنظیم
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Posts Listing */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-primary-50 rounded-lg border overflow-hidden"
                            >
                                <img
                                    src={post.image || "/placeholder.svg"}
                                    alt={post.title}
                                    className="w-full h-64"
                                />
                                <div className="p-6">
                                    <div className="flex flex-col space-y-3 mb-4">
                                        <div className="flex items-center">
                                            <span className="font-medium ml-2">
                                                نېټه:
                                            </span>
                                            <FaCalendarAlt className="ml-1 text-primary-500" />
                                            <span>{post.date}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-medium ml-2">
                                                لیکوال:
                                            </span>
                                            <FaUser className="ml-1 text-primary-500" />
                                            <span>{post.author}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-medium ml-2">
                                                درجه:
                                            </span>
                                            {renderStarRating(
                                                post,
                                                post.rating || 0,
                                                true
                                            )}
                                            <span className="mr-2">
                                                ({post.rating || 0}/5)
                                            </span>
                                        </div>
                                        {post.category && (
                                            <div className="flex items-center">
                                                <span className="font-medium ml-2">
                                                    کټګوري:
                                                </span>
                                                <span className="bg-tertiary-100 text-tertiary-700 px-2 py-1 rounded-md">
                                                    {post.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="font-bold text-tertiary-700 text-xl mb-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-primary-700 mb-4">
                                        {post.description}
                                    </p>

                                    <Link
                                        href="#"
                                        className="text-secondary-600 font-medium flex items-center hover:text-secondary-700 transition"
                                    >
                                        نور ولولئ
                                        <FaArrowRight className="mr-2" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {posts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-600">
                                ستاسو د معیارونو سره سم هیڅ پوسټ ونه موندل شو.
                            </p>
                            <button
                                onClick={resetFilters}
                                className="mt-4 bg-secondary-600 text-primary-50 py-2 px-6 rounded hover:bg-secondary-700 transition"
                            >
                                فیلټرونه بیا تنظیم کړئ
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Rating Modal */}
            {renderRatingModal()}
        </SiteLayout>
    );
};

export default Post;

import { useState, useEffect, useRef } from "react";
import SiteLayout from "../../Layouts/SiteLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaCalendarAlt,
    FaUser,
    FaStar,
    FaSearch,
    FaUpload,
} from "react-icons/fa";
import { usePosts } from "@/Contexts/PostContext";
import { useRate } from "@/Contexts/RatingContext";

const Post = () => {
    const { rate, setRating } = useRate();
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

        if (!formData.comment.trim()) {
            newErrors.comment = "نظر اړین دی";
        } else if (formData.comment.trim().length < 10) {
            newErrors.comment = "نظر باید لږ تر لږه 10 توري ولري";
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

        // Create a new rating object
        const newRating = {
            id: Date.now(), // Generate a unique ID
            author: selectedPost.author, // Save the post author as the author
            comment: formData.comment,
            rating: selectedRating,
            postId: selectedPost.id, // Reference to the original post
            date: new Date().toISOString().split("T")[0], // Current date
        };

        // Update the rating in the context
        setRating([...rate, newRating]);

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
                <motion.div
                    key={i}
                    whileHover={isClickable ? { scale: 1.3 } : {}}
                    whileTap={isClickable ? { scale: 0.9 } : {}}
                >
                    <FaStar
                        className={`${
                            i <= currentRating
                                ? "text-yellow-500"
                                : "text-gray-300"
                        } ${
                            isClickable
                                ? "cursor-pointer hover:text-yellow-400"
                                : ""
                        }`}
                        onClick={
                            isClickable
                                ? () => handleStarClick(post, i)
                                : undefined
                        }
                    />
                </motion.div>
            );
        }

        return <div className="flex">{stars}</div>;
    };

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5 },
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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
        hover: {
            y: -10,
            boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: { duration: 0.3 },
        },
    };

    // Function to render modal form
    const renderRatingModal = () => {
        if (!showModal || !selectedPost) return null;

        return (
            <AnimatePresence>
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-lg p-6 max-w-3xl w-full"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 20 }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-zar font-bold">
                                ارزونه ورکړئ
                            </h3>
                        </div>

                        <form onSubmit={handleSubmitRating}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <label className="block mb-2 font-medium">
                                            د پوسټ لیکوال
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedPost.author}
                                            disabled
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <label className="block mb-2 font-medium">
                                            نظر{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
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
                                    </motion.div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-4">
                                    <motion.div
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <label className="block mb-2 font-medium">
                                            ستاسو انځور{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
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
                                                <motion.button
                                                    type="button"
                                                    className={`font-bold px-6 py-3 rounded-md font-zar text-xl flex items-center justify-center p-2 border ${
                                                        errors.userImage
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                    } rounded-md w-full`}
                                                    onClick={() =>
                                                        fileInputRef.current.click()
                                                    }
                                                    whileHover={{
                                                        backgroundColor:
                                                            "#f3f4f6",
                                                    }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <FaUpload className="mr-2" />
                                                    انځور پورته کړئ
                                                </motion.button>
                                            </div>
                                            {errors.userImage && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.userImage}
                                                </p>
                                            )}
                                            {previewUrl && (
                                                <motion.div
                                                    className="mt-2"
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.8,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    transition={{
                                                        type: "spring",
                                                        damping: 15,
                                                    }}
                                                >
                                                    <img
                                                        src={
                                                            previewUrl ||
                                                            "/placeholder.svg" ||
                                                            "/placeholder.svg" ||
                                                            "/placeholder.svg"
                                                        }
                                                        alt="Preview"
                                                        className="h-24 w-24 object-cover rounded-md"
                                                    />
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            <motion.div
                                className="flex justify-end gap-4 mt-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <motion.button
                                    type="button"
                                    className="font-bold px-6 py-3 rounded-md font-zar text-xl border border-gray-300  hover:bg-gray-100 transition"
                                    onClick={handleCloseModal}
                                    whileHover={{ backgroundColor: "#f3f4f6" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    لغو کول
                                </motion.button>
                                <motion.button
                                    type="submit"
                                    className="font-bold px-6 py-3 rounded-md font-zar text-xl  bg-secondary-600 text-white  hover:bg-secondary-700 transition"
                                    whileHover={{ backgroundColor: "#4338ca" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    ارزونه ثبت کړئ
                                </motion.button>
                            </motion.div>
                        </form>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        );
    };

    return (
        <SiteLayout title="پوسټونه - خیاط ماسټر">
            {/* Hero Section */}
            <motion.section
                className="text-primary-900 py-10 lg:px-10 flex flex-col md:flex-row items-center"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <motion.div className=" mx-auto px-4  w-1/2" variants={fadeIn}>
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold font-zar mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        زموږ بلاګ
                    </motion.h1>
                    <motion.p
                        className="text-xl font-zar md:text-2xl  max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        د خیاطۍ، فیشن او د جامو په اړه تازه معلومات ترلاسه کړئ.
                    </motion.p>
                </motion.div>
                <motion.div
                    className="w-1/2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", damping: 15 }}
                >
                    <img src="./imgs/blog.jpg" alt="posts" />
                </motion.div>
            </motion.section>

            {/* Search and Filter Section */}
            <motion.section
                className="py-8 bg-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        className="bg-white p-6 rounded-lg border"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <input
                                    type="text"
                                    placeholder="د عنوان یا لیکوال له مخې لټون"
                                    className="w-full p-3 border border-gray-300 outline-none rounded-md pr-10 focus:ring-2 focus:ring-secondary-300 focus:border-secondary-500 transition-all"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400" />
                            </motion.div>

                            <motion.select
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary-300 focus:border-secondary-500 transition-all"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <option value="">ټولې کټګورۍ</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </motion.select>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleFilter}
                                    className="font-bold px-6 py-3 rounded-md font-zar text-xl flex-1 bg-secondary-600 text-primary-50  hover:bg-secondary-700 transition"
                                >
                                    لټون
                                </button>
                                <button
                                    onClick={resetFilters}
                                    className="font-bold px-6 py-3 rounded-md font-zar text-xl flex-1 bg-tertiary-600 text-primary-50  hover:bg-tertiary-700 transition"
                                >
                                    بیا تنظیم
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Posts Listing */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {posts.map((post) => (
                            <motion.div
                                key={post.id}
                                className="bg-primary-50 w-96 rounded-lg border overflow-hidden"
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <motion.img
                                    src={post.image || "/placeholder.svg"}
                                    alt={post.title}
                                    className="w-full h-44 object-cover"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <div className="p-6">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <motion.div
                                            className="flex items-center"
                                            whileHover={{ x: 5 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                            }}
                                        >
                                            <FaUser className="ml-1 text-primary-500" />

                                            <span className="font-medium ml-2">
                                                خیاط:
                                            </span>
                                            <span>{post.author}</span>
                                        </motion.div>
                                        <motion.div
                                            className="flex items-center"
                                            whileHover={{ x: 5 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                            }}
                                        >
                                            <FaCalendarAlt className="ml-1 text-primary-500" />
                                            <span className="font-medium ml-2">
                                                نېټه:
                                            </span>

                                            <span>{post.date}</span>
                                        </motion.div>

                                        <motion.div
                                            className="flex items-center"
                                            whileHover={{ x: 5 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                            }}
                                        >
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
                                        </motion.div>
                                        {post.category && (
                                            <motion.div
                                                className="flex items-center"
                                                whileHover={{ x: 5 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                }}
                                            >
                                                <span className="font-medium ml-2">
                                                    کټګوري:
                                                </span>
                                                <span className=" text-tertiary-700 px-2 py-1 rounded-md">
                                                    {post.category}
                                                </span>
                                            </motion.div>
                                        )}
                                    </div>

                                    <motion.h3
                                        className="text-2xl font-zar font-bold text-tertiary-700 mb-2"
                                        whileHover={{ x: 5 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                        }}
                                    >
                                        {post.title}:
                                    </motion.h3>
                                    <motion.p
                                        className="text-primary-700 mb-4"
                                        initial={{ opacity: 0.8 }}
                                        whileHover={{ opacity: 1 }}
                                    >
                                        {post.description}
                                    </motion.p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {posts.length === 0 && (
                        <motion.div
                            className="text-center py-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <p className="text-xl md:text-2xl text-gray-600">
                                ستاسو د معیارونو سره سم هیڅ پوسټ ونه موندل شو.
                            </p>
                            <button
                                onClick={resetFilters}
                                className="font-bold px-6 py-3 rounded-md font-zar text-xl mt-4 bg-secondary-600 text-primary-50  hover:bg-secondary-700 transition"
                            >
                                فیلټرونه بیا تنظیم کړئ
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Rating Modal */}
            {renderRatingModal()}
        </SiteLayout>
    );
};

export default Post;

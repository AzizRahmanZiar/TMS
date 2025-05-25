import { useState, useEffect, useRef } from "react";
import SiteLayout from "../../Layouts/SiteLayout";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaUser, FaStar, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRate } from "@/Contexts/RatingContext";
import { usePage, router } from "@inertiajs/react";
import Toast from "@/Components/Toast";

const Post = () => {
    const { rate, setRating } = useRate();
    const { props } = usePage();
    const [posts, setPosts] = useState(props.tailorPosts || []);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [originalPosts, setOriginalPosts] = useState(props.tailorPosts || []);
    const [ratedPosts, setRatedPosts] = useState(new Set());
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("info");
    // Add pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    // Check for pending rating after registration
    useEffect(() => {
        if (props.auth?.user) {
            const pendingRating = sessionStorage.getItem('pendingRating');
            if (pendingRating) {
                const { postId, rating } = JSON.parse(pendingRating);
                const post = posts.find(p => p.id === postId);
                if (post) {
                    setSelectedPost(post);
                    setSelectedRating(rating);
                    setShowModal(true);
                }
                // Clear the pending rating
                sessionStorage.removeItem('pendingRating');
            }
        }
    }, [props.auth?.user]);

    // Update posts when tailorPosts prop changes
    useEffect(() => {
        if (props.tailorPosts) {
            setPosts(props.tailorPosts);
            setOriginalPosts(props.tailorPosts);
        }
    }, [props.tailorPosts]);

    // Update error and success messages when flash messages change
    useEffect(() => {
        if (props.flash) {
            setError(props.flash.error || "");
            setSuccess(props.flash.success || "");
        }
    }, [props.flash]);

    // Add console log before rendering posts
    console.log('Current posts state:', posts);

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

    // Get unique categories
    const categories = [...new Set(originalPosts.map((post) => post.category))];

    // Function to show toast
    const displayToast = (message, type = "info") => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
    };

    // Function to handle filtering
    const handleFilter = () => {
        let filtered = originalPosts;

        if (searchTerm) {
            filtered = filtered.filter(
                (post) =>
                    post.author.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (category) {
            filtered = filtered.filter((post) => post.category === category);
        }

        setPosts(filtered);
        setCurrentPage(1); // Reset to first page when filtering
    };

    // Function to reset filters
    const resetFilters = () => {
        setSearchTerm("");
        setCategory("");
        setPosts(originalPosts);
        setCurrentPage(1); // Reset to first page when resetting filters
    };

    // Calculate pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    // Pagination controls
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    // Function to handle star click
    const handleStarClick = (post, rating) => {
        // Check if user is authenticated
        if (!props.auth?.user) {
            // Store the post and rating in session storage for after registration
            sessionStorage.setItem('pendingRating', JSON.stringify({
                postId: post.id,
                rating: rating
            }));
            // Redirect to register page
            router.visit(route('register'));
            return;
        }

        if (ratedPosts.has(post.id)) {
            displayToast("You have already rated this post", "warning");
            return;
        }
        setError("");
        setSuccess("");
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

    const handleRatingSubmit = (postId, rating, comment) => {
        if (ratedPosts.has(postId)) {
            displayToast("You have already rated this post", "warning");
            return;
        }

        if (!comment || comment.length < 10) {
            setError("Please provide a comment with at least 10 characters");
            return;
        }

        router.post(route('post.rate', postId), {
            rating,
            comment
        }, {
            onSuccess: () => {
                // Add post to rated posts
                setRatedPosts(prev => new Set([...prev, postId]));

                // Update the current post's rating in the posts array
                setPosts(currentPosts => 
                    currentPosts.map(post => 
                        post.id === postId 
                            ? {
                                ...post,
                                rating: rating,
                                comments: (post.comments || 0) + 1
                            }
                            : post
                    )
                );

                // Update originalPosts as well to maintain consistency
                setOriginalPosts(currentOriginalPosts => 
                    currentOriginalPosts.map(post => 
                        post.id === postId 
                            ? {
                                ...post,
                                rating: rating,
                                comments: (post.comments || 0) + 1
                            }
                            : post
                    )
                );

                // Close modal and reset form
                setShowModal(false);
                setFormData({ comment: "" });
                setSelectedRating(0);
                setError("");
                displayToast("Thank you for your rating!", "success");
            },
            onError: (errors) => {
                const errorMessage = errors.rating || errors.comment || "Failed to submit rating. Please try again.";
                setError(errorMessage);
                displayToast(errorMessage, "error");
            }
        });
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
        const hasRated = ratedPosts.has(post.id);
        const rating = post.rating || 0;

        for (let i = 1; i <= maxRating; i++) {
            stars.push(
                <motion.div
                    key={i}
                    whileHover={isClickable && !hasRated ? { scale: 1.3 } : {}}
                    whileTap={isClickable && !hasRated ? { scale: 0.9 } : {}}
                >
                    <FaStar
                        className={`${
                            i <= rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                        } ${
                            isClickable && !hasRated
                                ? "cursor-pointer hover:text-yellow-400"
                                : ""
                        }`}
                        onClick={
                            isClickable && !hasRated
                                ? () => handleStarClick(post, i)
                                : undefined
                        }
                    />
                </motion.div>
            );
        }

        return (
            <div className="flex items-center">
                <div className="flex">{stars}</div>
            </div>
        );
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

                        {error && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                                {success}
                            </div>
                        )}

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleRatingSubmit(selectedPost.id, selectedRating, formData.comment);
                        }}>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-4">
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <label className="block mb-2 font-medium">
                                            نظر
                                        </label>
                                        <textarea
                                            name="comment"
                                            className={`w-full p-2 border ${
                                                error ? "border-red-500" : "border-gray-300"
                                            } rounded-md min-h-[120px]`}
                                            value={formData.comment}
                                            onChange={(e) => {
                                                setFormData({ ...formData, comment: e.target.value });
                                                setError("");
                                            }}
                                            required
                                        ></textarea>
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
                                    className="font-bold px-6 py-3 rounded-md font-zar text-xl border border-gray-300 hover:bg-gray-100 transition"
                                    onClick={() => {
                                        setShowModal(false);
                                        setError("");
                                        setFormData({ comment: "" });
                                        setSelectedRating(0);
                                    }}
                                    whileHover={{ backgroundColor: "#f3f4f6" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    لغو کول
                                </motion.button>
                                <motion.button
                                    type="submit"
                                    className="font-bold px-6 py-3 rounded-md font-zar text-xl bg-secondary-600 text-white hover:bg-secondary-700 transition"
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
                                    placeholder="د خیاط نوم له مخې لټون"
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

            {/* Posts Grid */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentPosts.map((post) => (
                        <motion.div
                            key={post.id}
                            className="bg-primary-50 w-96 rounded-lg border overflow-hidden"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <motion.img
                                src={post.image || "/placeholder.svg"}
                                alt={post.description}
                                className="w-full h-44 object-cover"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <motion.div
                                        className="flex items-center gap-2 text-gray-600"
                                        whileHover={{ x: 5 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                        }}
                                    >
                                        <FaUser className="text-primary-600" />
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
                                        <span>{new Date(post.date).toLocaleDateString()}</span>
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
                                            ({post.rating ? post.rating.toFixed(1) : 0}/5)
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
                                            <span className="text-tertiary-700 px-2 py-1 rounded-md">
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
                                    {post.category}:
                                </motion.h3>
                                <motion.p
                                    className="text-primary-700 mb-4"
                                    initial={{ opacity: 0.8 }}
                                    whileHover={{ opacity: 1 }}
                                >
                                    {post.description}
                                </motion.p>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Comments: {post.comments}</span>
                                    <span>Views: {post.views}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-8 gap-2">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-md ${
                                currentPage === 1
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-secondary-600 text-white hover:bg-secondary-700'
                            }`}
                        >
                            <FaChevronLeft />
                        </button>
                        
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={`px-4 py-2 rounded-md ${
                                    currentPage === index + 1
                                        ? 'bg-secondary-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-md ${
                                currentPage === totalPages
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-secondary-600 text-white hover:bg-secondary-700'
                            }`}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                )}
            </div>

            {/* Rating Modal */}
            {renderRatingModal()}

            {/* Toast Notification */}
            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}
        </SiteLayout>
    );
};

export default Post;

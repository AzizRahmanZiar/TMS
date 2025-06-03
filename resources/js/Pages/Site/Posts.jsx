import { useState, useEffect } from "react";
import SiteLayout from "../../Layouts/SiteLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaCalendarAlt,
    FaUser,
    FaStar,
    FaSearch,
    FaChevronLeft,
    FaChevronRight,
    FaTrash,
    FaFilter,
} from "react-icons/fa";
import { useRate } from "@/Contexts/RatingContext";
import { usePage, router, useForm } from "@inertiajs/react";
import Toast from "@/Components/Toast";
import DeleteModal from "@/Components/DeleteModal";

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
            const pendingRating = sessionStorage.getItem("pendingRating");
            if (pendingRating) {
                const { postId, rating } = JSON.parse(pendingRating);
                const post = posts.find((p) => p.id === postId);
                if (post) {
                    setSelectedPost(post);
                    setSelectedRating(rating);
                    setShowModal(true);
                }
                // Clear the pending rating
                sessionStorage.removeItem("pendingRating");
            }
        }
    }, [props.auth?.user]);

    // Update posts when tailorPosts prop changes and initialize rated posts
    useEffect(() => {
        if (props.tailorPosts) {
            setPosts(props.tailorPosts);
            setOriginalPosts(props.tailorPosts);

            // Initialize rated posts from backend data (posts that user has already rated)
            if (props.auth?.user) {
                const userRatedPostIds = new Set();

                // Add from props.userRatedPosts if available
                if (props.userRatedPosts) {
                    props.userRatedPosts.forEach((postId) =>
                        userRatedPostIds.add(postId)
                    );
                }

                // Add from posts that have user_has_rated property
                props.tailorPosts.forEach((post) => {
                    if (post.user_has_rated) {
                        userRatedPostIds.add(post.id);
                    }
                });

                setRatedPosts(userRatedPostIds);
            }
        }
    }, [props.tailorPosts, props.userRatedPosts, props.auth?.user]);

    // Update error and success messages when flash messages change
    useEffect(() => {
        if (props.flash) {
            setError(props.flash.error || "");
            setSuccess(props.flash.success || "");
        }
    }, [props.flash]);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedRating, setSelectedRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(0);
    const [justRatedPosts, setJustRatedPosts] = useState(new Set());

    // Delete modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Form state using Inertia useForm
    const { data, setData, post, processing, errors, reset } = useForm({
        rating: 0,
        comment: "",
    });

    // Get unique categories
    const categories = [...new Set(originalPosts.map((post) => post.category))];

    // Function to show toast
    const displayToast = (message, type = "info") => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
    };

    // Auto-filter when search term or category changes
    useEffect(() => {
        handleFilter();
    }, [searchTerm, category, originalPosts]);

    // Function to handle filtering
    const handleFilter = () => {
        let filtered = originalPosts;

        if (searchTerm) {
            filtered = filtered.filter((post) =>
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
    const nextPage = () =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    // Function to handle star click
    const handleStarClick = (post, rating) => {
        // Check if user is authenticated
        if (!props.auth?.user) {
            // Store the post and rating in session storage for after registration
            sessionStorage.setItem(
                "pendingRating",
                JSON.stringify({
                    postId: post.id,
                    rating: rating,
                })
            );
            // Redirect to register page
            router.visit(route("register"));
            return;
        }

        // Check if user has already rated this post (multiple sources)
        const hasAlreadyRated =
            ratedPosts.has(post.id) ||
            post.user_has_rated ||
            justRatedPosts.has(post.id);

        if (hasAlreadyRated) {
            displayToast(
                "تاسو دمخه دا پوسټ ریټ کړی دی! بیا ریټنګ نشئ ورکولی.",
                "error"
            );
            return;
        }
        setError("");
        setSuccess("");
        setSelectedPost(post);
        setSelectedRating(rating);
        setShowModal(true);
    };

    const handleRatingSubmit = (e) => {
        e.preventDefault();

        // IMMEDIATE PREVENTION - Add to justRatedPosts right away
        setJustRatedPosts((prev) => {
            const newSet = new Set([...prev, selectedPost.id]);
            return newSet;
        });

        // Double-check if user has already rated this post
        const hasAlreadyRated =
            ratedPosts.has(selectedPost.id) ||
            selectedPost.user_has_rated ||
            justRatedPosts.has(selectedPost.id);

        if (hasAlreadyRated) {
            displayToast(
                "تاسو دمخه دا پوسټ ریټ کړی دی! بیا ریټنګ نشئ ورکولی.",
                "error"
            );
            setShowModal(false);
            return;
        }

        // Validate rating and comment
        if (!selectedRating || selectedRating === 0) {
            setError("مهرباني وکړئ لومړی ریټنګ ورکړئ");
            // Remove from justRatedPosts if validation fails
            setJustRatedPosts((prev) => {
                const newSet = new Set(prev);
                newSet.delete(selectedPost.id);
                return newSet;
            });
            return;
        }

        if (!data.comment || data.comment.trim().length < 10) {
            setError("نظر باید لږترلږه 10 توري ولري");
            // Remove from justRatedPosts if validation fails
            setJustRatedPosts((prev) => {
                const newSet = new Set(prev);
                newSet.delete(selectedPost.id);
                return newSet;
            });
            return;
        }

        // Clear any previous errors
        setError("");

        // Prevent multiple submissions
        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        // Use router.post directly with explicit data
        router.post(
            route("post.rate", selectedPost.id),
            {
                rating: selectedRating,
                comment: data.comment.trim(),
            },
            {
                onSuccess: (response) => {
                    // Add post to rated posts immediately - CRITICAL for preventing multiple ratings
                    setRatedPosts((prev) => {
                        const newSet = new Set([...prev, selectedPost.id]);
                        return newSet;
                    });

                    // Also add to justRatedPosts for immediate prevention
                    setJustRatedPosts((prev) => {
                        const newSet = new Set([...prev, selectedPost.id]);
                        return newSet;
                    });

                    // Update the current post's rating in the posts array
                    setPosts((currentPosts) => {
                        const updatedPosts = currentPosts.map((post) =>
                            post.id === selectedPost.id
                                ? {
                                      ...post,
                                      rating: selectedRating,
                                      comments: (post.comments || 0) + 1,
                                      user_has_rated: true, // Mark as rated by current user
                                  }
                                : post
                        );
                        return updatedPosts;
                    });

                    // Update originalPosts as well to maintain consistency
                    setOriginalPosts((currentOriginalPosts) =>
                        currentOriginalPosts.map((post) =>
                            post.id === selectedPost.id
                                ? {
                                      ...post,
                                      rating: selectedRating,
                                      comments: (post.comments || 0) + 1,
                                      user_has_rated: true, // Mark as rated by current user
                                  }
                                : post
                        )
                    );

                    // Close modal and reset form
                    setShowModal(false);
                    reset();
                    setSelectedRating(0);
                    setSelectedPost(null); // Clear selected post
                    setError("");
                    setIsSubmitting(false); // Reset submission state
                    setForceUpdate((prev) => prev + 1); // Force re-render

                    // Show success toast message for first-time rating
                    displayToast(
                        "ستاسو ریټنګ بریالۍ ثبت شو! ستاسو د نظر او ریټنګ لپاره مننه.",
                        "success"
                    );
                },
                onError: (errors) => {
                    setIsSubmitting(false); // Reset submission state on error

                    // Remove from justRatedPosts on error so user can try again
                    setJustRatedPosts((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(selectedPost.id);
                        return newSet;
                    });

                    const errorMessage =
                        errors.rating ||
                        errors.comment ||
                        "د ریټنګ ثبت کولو کې ستونزه رامنځته شوه. بیا هڅه وکړئ.";
                    setError(errorMessage);
                    displayToast(errorMessage, "error");
                },
            }
        );
    };

    // Function to render star ratings (clickable)
    const renderStarRating = (post, currentRating, isClickable = false) => {
        const stars = [];
        const maxRating = 5;
        // Check all sources for rated status
        const hasRated =
            ratedPosts.has(post.id) ||
            post.user_has_rated ||
            justRatedPosts.has(post.id);
        const rating = post.rating || 0;

        for (let i = 1; i <= maxRating; i++) {
            stars.push(
                <motion.div
                    key={i}
                    whileHover={!hasRated ? { scale: 1.3 } : {}}
                    whileTap={!hasRated ? { scale: 0.9 } : {}}
                >
                    <FaStar
                        className={`${
                            i <= rating ? "text-yellow-500" : "text-gray-300"
                        } ${
                            isClickable && !hasRated
                                ? "cursor-pointer hover:text-yellow-400"
                                : hasRated
                                ? "cursor-not-allowed"
                                : ""
                        }`}
                        onClick={
                            isClickable && !hasRated
                                ? () => handleStarClick(post, i)
                                : hasRated
                                ? () => handleStarClick(post, i)
                                : undefined
                        }
                        title={
                            hasRated
                                ? "تاسو دمخه دا پوسټ ریټ کړی دی"
                                : isClickable
                                ? "د ریټنګ ورکولو لپاره کلیک وکړئ"
                                : ""
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

    // Function to handle clearing rating and comment
    const handleClearRating = (post) => {
        if (!props.auth?.user) {
            displayToast("د ریټنګ حذف کولو لپاره لومړی لاګ ان شئ", "error");
            return;
        }

        // Check if user has rated this post
        const hasRated =
            ratedPosts.has(post.id) ||
            post.user_has_rated ||
            justRatedPosts.has(post.id);

        if (!hasRated) {
            displayToast("تاسو دا پوسټ ریټ نه یاست کړی", "error");
            return;
        }

        // Show delete modal
        setPostToDelete(post);
        setShowDeleteModal(true);
    };

    // Function to handle delete confirmation
    const handleDeleteConfirm = () => {
        if (!postToDelete) return;

        setIsDeleting(true);

        // Use router.delete to send DELETE request
        router.delete(route("post.rate.delete", postToDelete.id), {
            onSuccess: (response) => {
                // Remove post from rated posts
                setRatedPosts((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(postToDelete.id);
                    return newSet;
                });

                // Remove from justRatedPosts as well
                setJustRatedPosts((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(postToDelete.id);
                    return newSet;
                });

                // Update the post in the posts array
                setPosts((currentPosts) => {
                    const updatedPosts = currentPosts.map((p) =>
                        p.id === postToDelete.id
                            ? {
                                  ...p,
                                  rating: 0,
                                  comments: Math.max((p.comments || 1) - 1, 0),
                                  user_has_rated: false,
                              }
                            : p
                    );
                    return updatedPosts;
                });

                // Update originalPosts as well
                setOriginalPosts((currentOriginalPosts) =>
                    currentOriginalPosts.map((p) =>
                        p.id === postToDelete.id
                            ? {
                                  ...p,
                                  rating: 0,
                                  comments: Math.max((p.comments || 1) - 1, 0),
                                  user_has_rated: false,
                              }
                            : p
                    )
                );

                displayToast(
                    "ستاسو ریټنګ او نظر په بریالیتوب سره حذف شو!",
                    "success"
                );

                // Close modal and reset state
                setShowDeleteModal(false);
                setPostToDelete(null);
                setIsDeleting(false);
            },
            onError: (errors) => {
                const errorMessage =
                    errors.error ||
                    "د ریټنګ حذف کولو کې ستونزه رامنځته شوه. بیا هڅه وکړئ.";
                displayToast(errorMessage, "error");
                setIsDeleting(false);
            },
        });
    };

    // Function to cancel delete
    const cancelDelete = () => {
        setShowDeleteModal(false);
        setPostToDelete(null);
        setIsDeleting(false);
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
                        className="bg-white/95 backdrop-blur-sm rounded-3xl p-4 sm:p-6 lg:p-8 max-w-3xl w-full mx-4 shadow-2xl border border-white/30"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 20 }}
                    >
                        <div className="flex justify-between items-center mb-6 sm:mb-8">
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-zar font-bold bg-gradient-to-r from-primary-800 via-secondary-600 to-tertiary-600 bg-clip-text text-transparent">
                                ارزونه ورکړئ
                            </h3>
                            <motion.button
                                type="button"
                                onClick={() => {
                                    setShowModal(false);
                                    setError("");
                                    reset();
                                    setSelectedRating(0);
                                }}
                                className="text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl p-2 rounded-full hover:bg-gray-100 transition-colors"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                ×
                            </motion.button>
                        </div>

                        {error && (
                            <motion.div
                                className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-100 text-red-700 rounded-2xl border border-red-200"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {error}
                            </motion.div>
                        )}

                        {success && (
                            <motion.div
                                className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-100 text-green-700 rounded-2xl border border-green-200"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {success}
                            </motion.div>
                        )}

                        <form onSubmit={handleRatingSubmit}>
                            <div className="space-y-6 sm:space-y-8">
                                {/* Rating Display */}
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 sm:p-6 rounded-2xl border border-primary-200"
                                >
                                    <label className="block mb-3 sm:mb-4 font-medium text-base sm:text-lg font-zar">
                                        ستاسو ریټنګ: {selectedRating}/5
                                    </label>
                                    <div className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <motion.div
                                                key={star}
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <FaStar
                                                    className={`text-2xl sm:text-3xl cursor-pointer ${
                                                        star <= selectedRating
                                                            ? "text-yellow-500"
                                                            : "text-gray-300"
                                                    } hover:text-yellow-400 transition-colors`}
                                                    onClick={() => {
                                                        setSelectedRating(star);
                                                        setError("");
                                                    }}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Comment Section */}
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <label className="block mb-3 sm:mb-4 font-medium text-base sm:text-lg font-zar">
                                        نظر (لږترلږه 10 توري)
                                    </label>
                                    <textarea
                                        name="comment"
                                        className={`w-full p-3 sm:p-4 border ${
                                            errors.comment
                                                ? "border-red-500 focus:ring-red-300"
                                                : "border-gray-300 focus:ring-secondary-300"
                                        } rounded-2xl min-h-[120px] sm:min-h-[140px] focus:ring-2 focus:border-secondary-500 transition-all bg-white/90 backdrop-blur-sm text-sm sm:text-base`}
                                        value={data.comment}
                                        onChange={(e) => {
                                            setData("comment", e.target.value);
                                            setError("");
                                        }}
                                        placeholder="دلته خپل نظر ولیکئ..."
                                        required
                                    ></textarea>
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="text-xs sm:text-sm text-gray-500">
                                            {data.comment.length}/1000 توري
                                        </div>
                                        <div
                                            className={`text-xs sm:text-sm ${
                                                data.comment.length >= 10
                                                    ? "text-green-600"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {data.comment.length >= 10
                                                ? "✓ کافي"
                                                : `${
                                                      10 - data.comment.length
                                                  } نور توري ته اړتیا`}
                                        </div>
                                    </div>
                                    {errors.comment && (
                                        <motion.p
                                            className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg"
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            {errors.comment}
                                        </motion.p>
                                    )}
                                </motion.div>
                            </div>

                            <motion.div
                                className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-8 sm:mt-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <motion.button
                                    type="button"
                                    className="font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-zar text-base sm:text-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-300 order-2 sm:order-1"
                                    onClick={() => {
                                        setShowModal(false);
                                        setError("");
                                        reset();
                                        setSelectedRating(0);
                                    }}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    لغو کول
                                </motion.button>
                                <motion.button
                                    type="submit"
                                    disabled={processing || isSubmitting}
                                    className={`font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-zar text-base sm:text-lg transition-all duration-300 order-1 sm:order-2 ${
                                        processing || isSubmitting
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-secondary-600 to-tertiary-600 text-white hover:from-secondary-700 hover:to-tertiary-700 shadow-xl hover:shadow-2xl"
                                    }`}
                                    whileHover={
                                        !processing && !isSubmitting
                                            ? { scale: 1.02, y: -2 }
                                            : {}
                                    }
                                    whileTap={
                                        !processing && !isSubmitting
                                            ? { scale: 0.98 }
                                            : {}
                                    }
                                >
                                    {processing || isSubmitting
                                        ? "ثبتیږي..."
                                        : "ارزونه ثبت کړئ"}
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
            {/* Enhanced Hero Section */}
            <motion.section
                className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-10 left-10 w-48 sm:w-72 h-48 sm:h-72   mix-blend-multiply filter blur-xl opacity-70"
                        animate={{
                            x: [0, 50, 0],
                            y: [0, -50, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                    <motion.div
                        className="absolute bottom-10 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                        animate={{
                            x: [0, -60, 0],
                            y: [0, 60, 0],
                            scale: [1, 0.9, 1],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                        <motion.div
                            className="lg:w-1/2 text-center lg:text-right"
                            variants={fadeIn}
                        >
                            <motion.h1
                                className="text-4xl py-3 sm:text-5xl md:text-6xl lg:text-7xl font-bold font-zar mb-4 sm:mb-6 bg-gradient-to-r from-primary-800 via-secondary-600 to-tertiary-600 bg-clip-text text-transparent leading-tight"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                زموږ بلاګ
                            </motion.h1>
                            <motion.p
                                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-zar text-primary-700 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                د خیاطۍ، فیشن او د جامو په اړه تازه معلومات
                                ترلاسه کړئ.
                            </motion.p>
                        </motion.div>
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                delay: 0.4,
                                type: "spring",
                                damping: 15,
                            }}
                        >
                            {/* Clean Image Only */}
                            <motion.img
                                src="./imgs/blog.jpg"
                                alt="posts"
                                className="w-full h-auto"
                                whileHover={{ scale: 1.02 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                }}
                            />
                        </motion.div>
                    </div>
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
                                    placeholder="د خیاط نوم له مخې لټون..."
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
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="flex-1 outline-none bg-transparent"
                                >
                                    <option value="">ټولې کټګورۍ</option>
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat}>
                                            {cat === "Cloths"
                                                ? "جامې"
                                                : cat === "Uniform"
                                                ? "یونیفورم"
                                                : cat === "Kortai"
                                                ? "کورتی"
                                                : cat === "Sadrai"
                                                ? "صدری"
                                                : cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

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

            {/* Enhanced Posts Grid */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {currentPosts.map((post) => (
                        <motion.div
                            key={post.id}
                            className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/40 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 max-w-sm mx-auto w-full"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="relative overflow-hidden">
                                <motion.img
                                    src={post.image || "/placeholder.svg"}
                                    alt={post.description}
                                    className="w-full h-36 sm:h-40 object-cover"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                            </div>
                            <div className="p-3 sm:p-4">
                                {/* Compact Header */}
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-1">
                                        <FaUser className="text-primary-600 text-xs" />
                                        <span className="text-xs font-medium text-gray-700">
                                            {post.author}
                                        </span>
                                    </div>
                                    {post.category && (
                                        <span className="bg-gradient-to-r from-tertiary-100 to-secondary-100 text-tertiary-700 px-2 py-1 rounded-full text-xs font-medium">
                                            {post.category === "Cloths"
                                                ? "جامې"
                                                : post.category === "Uniform"
                                                ? "یونیفورم"
                                                : post.category === "Kortai"
                                                ? "کورتی"
                                                : post.category === "Sadrai"
                                                ? "صدری"
                                                : post.category}
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h3 className="text-sm sm:text-base font-zar font-bold text-tertiary-700 mb-2 line-clamp-2">
                                    {post.category === "Cloths"
                                        ? "جامې"
                                        : post.category === "Uniform"
                                        ? "یونیفورم"
                                        : post.category === "Kortai"
                                        ? "کورتی"
                                        : post.category === "Sadrai"
                                        ? "صدری"
                                        : post.category}
                                </h3>

                                {/* Description */}
                                <p className="text-primary-700 mb-3 text-xs sm:text-sm leading-relaxed line-clamp-2">
                                    {post.description}
                                </p>

                                {/* Footer */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <div className="flex items-center gap-1 text-gray-500">
                                            <FaCalendarAlt className="text-primary-500 text-xs" />
                                            <span className="text-xs">
                                                {new Date(
                                                    post.date
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="flex items-center gap-1"
                                                key={`rating-${post.id}-${forceUpdate}`}
                                            >
                                                {renderStarRating(
                                                    post,
                                                    post.rating || 0,
                                                    true
                                                )}
                                                {justRatedPosts.has(
                                                    post.id
                                                ) && (
                                                    <span className="text-xs text-green-600 font-medium">
                                                        ✓ ریټ شوی
                                                    </span>
                                                )}
                                                <span className="text-xs text-gray-600">
                                                    (
                                                    {post.rating
                                                        ? post.rating.toFixed(1)
                                                        : 0}
                                                    )
                                                </span>
                                            </div>
                                            <span className="flex items-center gap-1 text-xs text-gray-500">
                                                <span className="bg-secondary-100 text-secondary-700 px-1.5 py-0.5 rounded-full text-xs">
                                                    {post.comments}
                                                </span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Clear Rating Button - Only show if user has rated this post */}
                                    {props.auth?.user &&
                                        (ratedPosts.has(post.id) ||
                                            post.user_has_rated ||
                                            justRatedPosts.has(post.id)) && (
                                            <motion.button
                                                onClick={() =>
                                                    handleClearRating(post)
                                                }
                                                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg border border-red-200 hover:border-red-300 transition-all duration-200 text-xs font-medium"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                title="د خپل ریټنګ او نظر حذف کول"
                                            >
                                                <FaTrash className="text-xs" />
                                                <span className="font-zar">
                                                    ریټنګ او نظر حذف کړئ
                                                </span>
                                            </motion.button>
                                        )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Enhanced Pagination Controls */}
                {totalPages > 1 && (
                    <motion.div
                        className="flex justify-center items-center mt-12 sm:mt-16 gap-2 sm:gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`p-2 sm:p-3 rounded-2xl transition-all duration-300 ${
                                currentPage === 1
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-gradient-to-r from-secondary-600 to-tertiary-600 text-white hover:from-secondary-700 hover:to-tertiary-700 shadow-lg hover:shadow-xl"
                            }`}
                            whileHover={
                                currentPage !== 1 ? { scale: 1.05, y: -2 } : {}
                            }
                            whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                        >
                            <FaChevronLeft className="text-sm sm:text-base" />
                        </motion.button>

                        <div className="flex gap-1 sm:gap-2 max-w-xs overflow-x-auto">
                            {[...Array(totalPages)].map((_, index) => (
                                <motion.button
                                    key={index + 1}
                                    onClick={() => paginate(index + 1)}
                                    className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl transition-all duration-300 text-sm sm:text-base font-medium ${
                                        currentPage === index + 1
                                            ? "bg-gradient-to-r from-secondary-600 to-tertiary-600 text-white shadow-lg"
                                            : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-100 border border-gray-200"
                                    }`}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {index + 1}
                                </motion.button>
                            ))}
                        </div>

                        <motion.button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={`p-2 sm:p-3 rounded-2xl transition-all duration-300 ${
                                currentPage === totalPages
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-gradient-to-r from-secondary-600 to-tertiary-600 text-white hover:from-secondary-700 hover:to-tertiary-700 shadow-lg hover:shadow-xl"
                            }`}
                            whileHover={
                                currentPage !== totalPages
                                    ? { scale: 1.05, y: -2 }
                                    : {}
                            }
                            whileTap={
                                currentPage !== totalPages
                                    ? { scale: 0.95 }
                                    : {}
                            }
                        >
                            <FaChevronRight className="text-sm sm:text-base" />
                        </motion.button>
                    </motion.div>
                )}
            </div>

            {/* Rating Modal */}
            {renderRatingModal()}

            {/* Delete Modal */}
            <DeleteModal
                isOpen={showDeleteModal}
                onClose={cancelDelete}
                onConfirm={handleDeleteConfirm}
                title="د ریټنګ او نظر حذف کول"
                message="آیا تاسو ډاډه یاست چې غواړئ خپل ریټنګ او نظر حذف کړئ؟"
                isLoading={isDeleting}
            />

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

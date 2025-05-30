import { Link, usePage } from "@inertiajs/react";
import SiteLayout from "../../Layouts/SiteLayout";
import { useRate } from "@/Contexts/RatingContext";
import { usePosts } from "@/Contexts/PostContext";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
    FaStar,
    FaUser,
    FaCalendarAlt,
    FaArrowRight,
    FaCheckCircle,
    FaCut,
    FaTshirt,
    FaAward,
    FaShoppingBag,
    FaHeart,
    FaQuoteLeft,
    FaPlay,
    FaGem,
    FaMagic,
    FaCrown,
} from "react-icons/fa";

const Home = () => {
    const { props } = usePage();
    const { rate, setRating } = useRate();
    const { posts, setPosts } = usePosts();
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const testimonialRef = useRef(null);

    // Initialize data from props
    useEffect(() => {
        if (props.posts) {
            setPosts(props.posts);
        }
        if (props.ratings) {
            setRating(props.ratings);
        }
    }, [props.posts, props.ratings]);

    // Function to get all ratings for a post
    const getPostRatings = (postId) => {
        return rate.filter((rating) => rating.postId === postId);
    };

    // Function to get ratings with comments for a post
    const getPostCommentRatings = (postId) => {
        return rate.filter(
            (rating) =>
                rating.postId === postId &&
                rating.comment &&
                rating.comment.trim() !== ""
        );
    };

    // Function to get average rating for a post (from all ratings)
    const getPostRating = (postId) => {
        const postRatings = getPostRatings(postId);
        if (postRatings.length === 0) return 0;

        const sum = postRatings.reduce(
            (total, rating) => total + rating.rating,
            0
        );
        return sum / postRatings.length;
    };

    // Function to get average rating from comments for a post
    const getPostCommentRating = (postId) => {
        const commentRatings = getPostCommentRatings(postId);
        if (commentRatings.length === 0) return 0;

        const sum = commentRatings.reduce(
            (total, rating) => total + rating.rating,
            0
        );
        return sum / commentRatings.length;
    };

    // Create an array of posts with their ratings
    const postsWithRatings = posts.map((post) => {
        const postRatings = getPostRatings(post.id);
        const commentRatings = getPostCommentRatings(post.id);

        return {
            ...post,
            ratings: postRatings,
            commentRatings: commentRatings,
            hasRatings: postRatings.length > 0,
            hasCommentRatings: commentRatings.length > 0,
            averageRating: getPostRating(post.id),
            averageCommentRating: getPostCommentRating(post.id),
        };
    });

    // Filter posts that have at least one rating
    const ratedPosts = postsWithRatings.filter((post) => post.hasRatings);

    // Sort by rating (highest first) and take top 10
    const topDesigns = ratedPosts
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 10);

    // Modify the testimonials data preparation to:
    // 1. Limit to 15 testimonials
    // 2. Sort by newest first (assuming newer ratings have higher IDs)
    const testimonialsWithComments = rate
        .filter((rating) => rating.comment && rating.comment.trim() !== "")
        .sort((a, b) => b.id - a.id) // Sort by newest first (assuming higher ID = newer)
        .slice(0, 15); // Limit to 15 testimonials

    // Handle testimonial navigation
    const nextTestimonial = () => {
        setCurrentTestimonial((prev) =>
            prev === testimonialsWithComments.length - 1 ? 0 : prev + 1
        );
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) =>
            prev === 0 ? testimonialsWithComments.length - 1 : prev - 1
        );
    };

    // Continuous auto-scroll testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            nextTestimonial();
        }, 3000); // Faster transition every 3 seconds for continuous movement

        return () => clearInterval(interval);
    }, [testimonialsWithComments.length]);

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

    return (
        <SiteLayout>
            {/* Modern Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br from-secondary-200 to-tertiary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                        animate={{
                            x: [0, 50, 0],
                            y: [0, -50, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                    <motion.div
                        className="absolute top-20 sm:top-40 right-10 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                        animate={{
                            x: [0, -60, 0],
                            y: [0, 60, 0],
                            scale: [1, 0.8, 1],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                    <motion.div
                        className="absolute bottom-10 sm:bottom-20 left-1/2 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-br from-tertiary-200 to-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                        animate={{
                            x: [0, 40, 0],
                            y: [0, -40, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left Content */}
                        <motion.div
                            className="lg:w-1/2 text-center lg:text-right"
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            {/* Badge */}
                            <motion.div
                                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg mb-6 sm:mb-8 border border-white/20"
                                variants={fadeInUp}
                            >
                                <FaCrown className="text-secondary-500 text-sm sm:text-base" />
                                <span className="text-xs sm:text-sm font-semibold text-primary-600 uppercase tracking-wider">
                                    د افغانستان غوره خیاط
                                </span>
                                <FaGem className="text-tertiary-500 text-sm sm:text-base" />
                            </motion.div>

                            {/* Main Heading */}
                            <motion.h1
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-zar mb-4 sm:mb-6 bg-gradient-to-r from-primary-800 via-secondary-600 to-tertiary-600 bg-clip-text text-transparent leading-tight"
                                variants={fadeInUp}
                            >
                                ماسټر خیاط
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 font-zar text-primary-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 px-4 lg:px-0"
                                variants={fadeInUp}
                            >
                                ستاسو د خوښې لباسونه دلته دي، د خیاطۍ خدمات په
                                غوره بیه
                            </motion.p>

                            {/* Features */}
                            <motion.div
                                className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-4 mb-8 sm:mb-10"
                                variants={fadeInUp}
                            >
                                {[
                                    {
                                        icon: FaCheckCircle,
                                        text: "د کیفیت تضمین",
                                    },
                                    { icon: FaCut, text: "مسلکي خیاطي" },
                                    {
                                        icon: FaAward,
                                        text: "د پیرودونکو اطمینان",
                                    },
                                ].map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-md border border-white/30"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                        }}
                                    >
                                        <feature.icon className="text-secondary-500 text-sm sm:text-base" />
                                        <span className="text-xs sm:text-sm font-semibold text-primary-700 font-zar">
                                            {feature.text}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                                variants={fadeInUp}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href="/tailor"
                                        className="group bg-gradient-to-r from-secondary-600 to-tertiary-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-zar text-lg sm:text-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 justify-center min-w-[200px]"
                                    >
                                        <FaShoppingBag className="group-hover:rotate-12 transition-transform duration-300 text-sm sm:text-base" />
                                        خیاط ومومئ
                                        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300 text-sm sm:text-base" />
                                    </Link>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href="/post"
                                        className="group bg-white/80 backdrop-blur-sm text-primary-700 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-zar text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 justify-center border border-white/30 min-w-[200px]"
                                    >
                                        <FaHeart className="group-hover:text-red-500 transition-colors duration-300 text-sm sm:text-base" />
                                        ډیزاینونه وګورئ
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Right Content - Enhanced Image */}
                        <motion.div
                            className="lg:w-1/2 relative"
                            initial={{ opacity: 0, x: 100, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            {/* Decorative Elements */}
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary-400/20 to-tertiary-400/20 rounded-3xl transform rotate-6 scale-105"></div>
                            <div className="absolute inset-0 bg-gradient-to-tl from-primary-400/20 to-secondary-400/20 rounded-3xl transform -rotate-3 scale-110"></div>

                            {/* Main Image Container */}
                            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30">
                                <motion.img
                                    src="./imgs/ilus-3.jpg"
                                    className="w-full h-auto transform scale-x-[-1] rounded-2xl shadow-lg"
                                    alt="Master Tailor"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                />

                                {/* Floating Elements */}
                                <motion.div
                                    className="absolute -top-4 -right-4 bg-gradient-to-br from-secondary-500 to-tertiary-500 text-white p-4 rounded-2xl shadow-xl"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                    }}
                                >
                                    <FaTshirt className="text-2xl" />
                                </motion.div>

                                <motion.div
                                    className="absolute -bottom-4 -left-4 bg-gradient-to-br from-primary-500 to-secondary-500 text-white p-4 rounded-2xl shadow-xl"
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                    }}
                                >
                                    <FaCut className="text-2xl" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-primary-400 rounded-full mt-2"></div>
                    </div>
                </motion.div>
            </section>

            {/* Enhanced Top Designs Section */}
            {topDesigns.length > 0 && (
                <section className="py-24 bg-gradient-to-br from-white via-primary-25 to-secondary-25 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}
                        />
                    </div>

                    <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
                        <motion.div
                            className="max-w-4xl mx-auto text-center mb-20"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={staggerContainer}
                        >
                            {/* Section Badge */}
                            <motion.div
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-100 to-tertiary-100 px-6 py-3 rounded-full shadow-lg mb-8 border border-secondary-200"
                                variants={fadeInUp}
                            >
                                <FaMagic className="text-secondary-600" />
                                <span className="text-sm font-semibold text-secondary-700 uppercase tracking-wider">
                                    د ماسټرانو کارونه
                                </span>
                                <FaGem className="text-tertiary-600" />
                            </motion.div>

                            {/* Enhanced Heading */}
                            <motion.h2
                                className="text-4xl md:text-6xl lg:text-7xl font-bold font-zar mb-6 bg-gradient-to-r from-primary-800 via-secondary-600 to-tertiary-600 bg-clip-text text-transparent leading-tight"
                                variants={fadeInUp}
                            >
                                غوره ۱۰ ډیزاینونه
                            </motion.h2>

                            {/* Decorative Line */}
                            <motion.div
                                className="flex items-center justify-center gap-4 mb-8"
                                variants={fadeInUp}
                            >
                                <div className="h-px bg-gradient-to-r from-transparent via-secondary-400 to-transparent flex-1 max-w-32"></div>
                                <div className="w-4 h-4 bg-gradient-to-r from-secondary-500 to-tertiary-500 rounded-full"></div>
                                <div className="h-px bg-gradient-to-r from-transparent via-tertiary-400 to-transparent flex-1 max-w-32"></div>
                            </motion.div>

                            <motion.p
                                className="text-xl md:text-2xl lg:text-3xl font-zar text-primary-700 leading-relaxed max-w-3xl mx-auto"
                                variants={fadeInUp}
                            >
                                زموږ تر ټولو مشهور او غوره ډیزاینونه وګورئ چې د
                                زموږ ماسټر خیاطانو لخوا جوړ شوي
                            </motion.p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            {topDesigns.map((design, index) => (
                                <motion.div
                                    key={design.id}
                                    className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20"
                                    variants={cardVariants}
                                    whileHover="hover"
                                >
                                    {/* Rank Badge */}
                                    <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-secondary-500 to-tertiary-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                                        {index + 1}
                                    </div>

                                    {/* Image Container */}
                                    <div className="relative overflow-hidden">
                                        <motion.img
                                            src={design.image}
                                            alt={design.title}
                                            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                                            whileHover={{ scale: 1.1 }}
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        {/* Rating Badge */}
                                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-1 shadow-lg">
                                            <FaStar className="text-yellow-500 text-sm" />
                                            <span className="font-bold text-sm text-gray-800">
                                                {design.averageRating.toFixed(
                                                    1
                                                )}
                                            </span>
                                        </div>

                                        {/* Hover Overlay with View Button */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                                            <motion.button
                                                className="bg-white/90 backdrop-blur-sm text-primary-700 px-6 py-2 rounded-full font-semibold text-sm shadow-lg hover:bg-white transition-colors duration-200"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                تفصیلات وګورئ
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold font-zar mb-3 text-primary-800 group-hover:text-secondary-600 transition-colors duration-300">
                                            {design.title}
                                        </h3>
                                        <p className="text-gray-600 font-zar mb-4 line-clamp-2 leading-relaxed">
                                            {design.description}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-gradient-to-r from-secondary-400 to-tertiary-400 rounded-full flex items-center justify-center">
                                                    <FaUser className="text-white text-xs" />
                                                </div>
                                                <span className="text-sm text-gray-600 font-zar font-medium">
                                                    {design.author}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-500">
                                                <FaCalendarAlt className="text-xs" />
                                                <span className="text-xs font-zar">
                                                    {new Date(
                                                        design.created_at
                                                    ).toLocaleDateString(
                                                        "fa-AF"
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative Corner */}
                                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-secondary-100 to-transparent rounded-tl-3xl opacity-50"></div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Testimonials Section - Modern Design */}
            {testimonialsWithComments.length > 0 && (
                <section className="py-20 bg-gradient-to-br from-primary-50 via-tertiary-50 to-secondary-50 relative overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-secondary-400 to-tertiary-500 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-tertiary-400 to-primary-500 rounded-full blur-3xl"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            className="max-w-4xl mx-auto text-center mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeInUp}
                        >
                            <motion.div
                                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6"
                                variants={fadeInUp}
                            >
                                <div className="w-2 h-2 bg-gradient-to-r from-secondary-500 to-tertiary-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
                                    د پیرودونکو تجربې
                                </span>
                                <div className="w-2 h-2 bg-gradient-to-r from-tertiary-500 to-secondary-500 rounded-full animate-pulse"></div>
                            </motion.div>

                            <motion.h2
                                className="text-4xl md:text-5xl font-bold font-zar bg-gradient-to-r from-primary-800 via-primary-900 to-primary-950 bg-clip-text text-transparent mb-6"
                                variants={fadeInUp}
                            >
                                زموږ د پیرودونکو نظرونه
                            </motion.h2>

                            <motion.div
                                className="flex items-center justify-center gap-4 mb-6"
                                variants={fadeInUp}
                            >
                                <div className="h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent flex-1 max-w-20"></div>
                                <div className="w-3 h-3 bg-gradient-to-r from-secondary-500 to-tertiary-500 rounded-full"></div>
                                <div className="h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent flex-1 max-w-20"></div>
                            </motion.div>

                            <motion.p
                                className="text-xl md:text-2xl font-zar text-primary-600 max-w-2xl mx-auto"
                                variants={fadeInUp}
                            >
                                وګورئ چې زموږ پیرودونکي د زموږ خدماتو په اړه څه
                                وايي
                            </motion.p>
                        </motion.div>

                        {/* Modern Testimonial Display */}
                        <div className="max-w-6xl mx-auto">
                            {testimonialsWithComments.length > 0 &&
                                testimonialsWithComments[
                                    currentTestimonial
                                ] && (
                                    <motion.div
                                        className="relative"
                                        key={currentTestimonial}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            ease: "easeOut",
                                        }}
                                    >
                                        {/* Main testimonial card */}
                                        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                                            <div className="flex flex-col lg:flex-row">
                                                {/* Left side - Enhanced User info */}
                                                <div className="lg:w-2/5 bg-gradient-to-br from-secondary-600 via-tertiary-600 to-primary-600 p-8 lg:p-12 text-white relative overflow-hidden">
                                                    {/* Background pattern */}
                                                    <div className="absolute inset-0 opacity-20">
                                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                                                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                                                    </div>

                                                    <div className="relative z-10 flex flex-col items-center text-center h-full justify-center">
                                                        {/* Enhanced avatar */}
                                                        <div className="relative mb-6">
                                                            <div className="w-28 h-28 rounded-full border-4 border-white/30 overflow-hidden shadow-2xl backdrop-blur-sm">
                                                                <img
                                                                    src={
                                                                        testimonialsWithComments[
                                                                            currentTestimonial
                                                                        ]
                                                                            ?.user_image ||
                                                                        "./imgs/avatar-placeholder.jpg"
                                                                    }
                                                                    alt={
                                                                        testimonialsWithComments[
                                                                            currentTestimonial
                                                                        ]
                                                                            ?.user_name ||
                                                                        "User"
                                                                    }
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            {/* Decorative ring */}
                                                            <div className="absolute -inset-2 rounded-full border-2 border-white/20 animate-pulse"></div>
                                                        </div>

                                                        <h3 className="font-bold text-2xl mb-3 text-white drop-shadow-lg">
                                                            {testimonialsWithComments[
                                                                currentTestimonial
                                                            ]?.user_name ||
                                                                "Anonymous"}
                                                        </h3>

                                                        {/* Enhanced rating stars */}
                                                        <div className="flex justify-center gap-1 mb-6">
                                                            {[
                                                                1, 2, 3, 4, 5,
                                                            ].map((star) => (
                                                                <motion.div
                                                                    key={star}
                                                                    initial={{
                                                                        scale: 0,
                                                                        rotate: -180,
                                                                    }}
                                                                    animate={{
                                                                        scale: 1,
                                                                        rotate: 0,
                                                                    }}
                                                                    transition={{
                                                                        delay:
                                                                            star *
                                                                            0.1,
                                                                        duration: 0.3,
                                                                    }}
                                                                >
                                                                    <FaStar
                                                                        className={`h-6 w-6 ${
                                                                            star <=
                                                                            (testimonialsWithComments[
                                                                                currentTestimonial
                                                                            ]
                                                                                ?.rating ||
                                                                                0)
                                                                                ? "text-yellow-300 drop-shadow-lg"
                                                                                : "text-white/30"
                                                                        }`}
                                                                    />
                                                                </motion.div>
                                                            ))}
                                                        </div>

                                                        {/* Rating number */}
                                                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                                            <span className="text-lg font-bold">
                                                                {testimonialsWithComments[
                                                                    currentTestimonial
                                                                ]?.rating || 0}
                                                                /5
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right side - Enhanced content */}
                                                <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center relative">
                                                    {/* Large quote icon */}
                                                    <div className="absolute top-6 right-6 text-primary-200">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="60"
                                                            height="60"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            className="opacity-50"
                                                        >
                                                            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                                                        </svg>
                                                    </div>

                                                    {/* Testimonial text */}
                                                    <motion.p
                                                        className="text-primary-700 text-xl md:text-2xl leading-relaxed font-bold font-zar mb-8 relative z-10"
                                                        initial={{
                                                            opacity: 0,
                                                            y: 20,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        transition={{
                                                            delay: 0.3,
                                                            duration: 0.6,
                                                        }}
                                                    >
                                                        "
                                                        {testimonialsWithComments[
                                                            currentTestimonial
                                                        ]?.comment ||
                                                            "No comment available"}
                                                        "
                                                    </motion.p>

                                                    {/* Enhanced decorative elements */}
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-px bg-gradient-to-r from-secondary-500 to-tertiary-500 flex-1"></div>
                                                        <div className="w-3 h-3 bg-gradient-to-r from-secondary-500 to-tertiary-500 rounded-full"></div>
                                                        <div className="h-px bg-gradient-to-r from-tertiary-500 to-primary-500 flex-1"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                            {/* Enhanced Navigation Controls */}
                            <div className="flex justify-between items-center mt-12">
                                <motion.button
                                    onClick={prevTestimonial}
                                    className="group bg-white/80 backdrop-blur-sm w-14 h-14 rounded-full shadow-xl border border-white/20 flex items-center justify-center hover:bg-gradient-to-r hover:from-secondary-500 hover:to-tertiary-500 transition-all duration-300 hover:scale-110"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="Previous testimonial"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-primary-600 group-hover:text-white transition-colors duration-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </motion.button>

                                {/* Enhanced Dots Indicator */}
                                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20">
                                    {testimonialsWithComments.map(
                                        (_, index) => (
                                            <motion.button
                                                key={index}
                                                onClick={() =>
                                                    setCurrentTestimonial(index)
                                                }
                                                className={`rounded-full transition-all duration-300 ${
                                                    index === currentTestimonial
                                                        ? "w-8 h-3 bg-gradient-to-r from-secondary-500 to-tertiary-500"
                                                        : "w-3 h-3 bg-primary-300 hover:bg-primary-400"
                                                }`}
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                                aria-label={`Go to testimonial ${
                                                    index + 1
                                                }`}
                                            />
                                        )
                                    )}
                                </div>

                                <motion.button
                                    onClick={nextTestimonial}
                                    className="group bg-white/80 backdrop-blur-sm w-14 h-14 rounded-full shadow-xl border border-white/20 flex items-center justify-center hover:bg-gradient-to-r hover:from-tertiary-500 hover:to-primary-500 transition-all duration-300 hover:scale-110"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="Next testimonial"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-primary-600 group-hover:text-white transition-colors duration-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </SiteLayout>
    );
};

export default Home;

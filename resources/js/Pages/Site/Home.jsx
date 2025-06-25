"use client";

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
    FaHeart,
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
            {/* Modern Clean Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                {/* Simplified Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-5 sm:top-10 md:top-20 left-2 sm:left-5 md:left-20 w-24 sm:w-32 md:w-48 lg:w-72 h-24 sm:h-32 md:h-48 lg:h-72 bg-gradient-to-br from-secondary-200/30 to-primary-200/30 rounded-full filter blur-3xl"
                        animate={{
                            x: [0, 15, 0],
                            y: [0, -15, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                    <motion.div
                        className="absolute bottom-5 sm:bottom-10 md:bottom-20 right-2 sm:right-5 md:right-20 w-32 sm:w-40 md:w-64 lg:w-96 h-32 sm:h-40 md:h-64 lg:h-96 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 rounded-full filter blur-3xl"
                        animate={{
                            x: [0, -20, 0],
                            y: [0, 20, 0],
                            scale: [1, 0.9, 1],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                </div>

                <div className="container mx-auto relative z-10 max-w-7xl">
                    <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-16">
                        {/* Left Content - Simplified */}
                        <motion.div
                            className="w-full lg:w-1/2 text-center lg:text-right"
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            {/* Main Heading */}
                            <motion.h1
                                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold font-zar mb-3 sm:mb-4 md:mb-6 lg:mb-8 bg-gradient-to-r from-primary-800 via-secondary-600 to-primary-700 bg-clip-text text-transparent leading-tight"
                                variants={fadeInUp}
                            >
                                خیاط ماسټر
                            </motion.h1>

                            {/* Clean Subtitle */}
                            <motion.p
                                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl mb-4 sm:mb-6 md:mb-8 lg:mb-12 font-zar text-primary-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 px-2 sm:px-4 lg:px-0"
                                variants={fadeInUp}
                            >
                                ستاسو د خوښې لباسونه دلته دي، د خیاطۍ خدمات په
                                غوره بیه
                            </motion.p>

                            {/* Clean CTA Buttons */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start px-2 sm:px-4 lg:px-0"
                                variants={fadeInUp}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full sm:w-auto"
                                >
                                    <Link
                                        href="/tailor"
                                        className="group bg-gradient-to-r from-secondary-600 to-primary-600 text-white font-bold px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl font-zar text-sm sm:text-base md:text-lg lg:text-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 sm:gap-3 justify-center w-full sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px]"
                                    >
                                        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                                        خیاط ومومئ
                                    </Link>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full sm:w-auto"
                                >
                                    <Link
                                        href="/post"
                                        className="group bg-white/90 backdrop-blur-sm text-primary-700 font-bold px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl font-zar text-sm sm:text-base md:text-lg lg:text-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 sm:gap-3 justify-center border border-primary-200 w-full sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px]"
                                    >
                                        ډیزاینونه وګورئ
                                        <FaHeart className="group-hover:text-red-500 transition-colors duration-300" />
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Right Content - Clean Image */}
                        <motion.div
                            className="w-full lg:w-1/2 relative mt-6 sm:mt-8 lg:mt-0"
                            initial={{ opacity: 0, x: 100, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            {/* Clean Image Only */}
                            <img
                                src="./imgs/ilus-3.jpg"
                                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full mx-auto transform scale-x-[-1]"
                                alt="Master Tailor"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Enhanced Top Designs Section */}
            {topDesigns.length > 0 && (
                <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-primary-100 to-secondary-25 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}
                        />
                    </div>

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
                        <motion.div
                            className="max-w-4xl mx-auto text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={staggerContainer}
                        >
                            {/* Enhanced Heading */}
                            <motion.h2
                                className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-zar mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-primary-800 via-secondary-600 to-tertiary-600 bg-clip-text text-transparent leading-tight px-2 sm:px-4 md:px-0"
                                variants={fadeInUp}
                            >
                                غوره ۱۰ ډیزاینونه
                            </motion.h2>

                            {/* Decorative Line */}
                            <motion.div
                                className="flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4 md:mb-6 lg:mb-8 px-4"
                                variants={fadeInUp}
                            >
                                <div className="h-px bg-gradient-to-r from-transparent via-secondary-400 to-transparent flex-1 max-w-8 sm:max-w-16 md:max-w-32"></div>
                                <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-gradient-to-r from-secondary-500 to-tertiary-500 rounded-full"></div>
                                <div className="h-px bg-gradient-to-r from-transparent via-tertiary-400 to-transparent flex-1 max-w-8 sm:max-w-16 md:max-w-32"></div>
                            </motion.div>

                            <motion.p
                                className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl font-zar text-primary-700 leading-relaxed max-w-3xl mx-auto px-2 sm:px-4 md:px-0"
                                variants={fadeInUp}
                            >
                                زموږ تر ټولو مشهور او غوره ډیزاینونه وګورئ چې د
                                زموږ ماسټر خیاطانو لخوا جوړ شوي
                            </motion.p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            {topDesigns.map((design, index) => (
                                <motion.div
                                    key={design.id}
                                    className="group relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20"
                                    variants={cardVariants}
                                    whileHover="hover"
                                >
                                    {/* Rank Badge */}
                                    <div className="absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4 z-20 bg-gradient-to-r from-secondary-500 to-tertiary-500 text-white w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg">
                                        {index + 1}
                                    </div>

                                    {/* Image Container */}
                                    <div className="relative overflow-hidden">
                                        <motion.img
                                            src={design.image}
                                            alt={design.title}
                                            className="w-full h-40 sm:h-48 md:h-52 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                                            whileHover={{ scale: 1.1 }}
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        {/* Rating Badge */}
                                        <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 bg-white/95 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-full flex items-center gap-1 shadow-lg">
                                            <FaStar className="text-yellow-500 text-xs sm:text-sm" />
                                            <span className="font-bold text-xs sm:text-sm text-gray-800">
                                                {design.averageRating.toFixed(
                                                    1
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-3 sm:p-4 lg:p-6">
                                        <h3 className="text-sm sm:text-base lg:text-xl font-bold font-zar mb-2 sm:mb-3 text-primary-800 group-hover:text-secondary-600 transition-colors duration-300">
                                            {design.title}
                                        </h3>
                                        <p className="text-gray-600 font-zar mb-3 sm:mb-4 line-clamp-2 leading-relaxed text-xs sm:text-sm">
                                            {design.description}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="flex justify-between items-center pt-2 sm:pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-1 sm:gap-2">
                                                <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-secondary-400 to-tertiary-400 rounded-full flex items-center justify-center">
                                                    <FaUser className="text-white text-xs" />
                                                </div>
                                                <span className="text-xs sm:text-sm text-gray-600 font-zar font-medium">
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
                                    <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-tl from-secondary-100 to-transparent rounded-tl-2xl sm:rounded-tl-3xl opacity-50"></div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Testimonials Section - Modern Design */}
            {testimonialsWithComments.length > 0 && (
                <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary-50 via-tertiary-50 to-secondary-50 relative overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-secondary-400 to-tertiary-500 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-tertiary-400 to-primary-500 rounded-full blur-3xl"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 sm:w-60 h-40 sm:h-60 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            className="max-w-4xl mx-auto text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeInUp}
                        >
                            <motion.h2
                                className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-zar bg-gradient-to-r from-primary-800 via-primary-900 to-primary-950 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 px-2 sm:px-4 md:px-0 py-1 sm:py-2 md:py-3"
                                variants={fadeInUp}
                            >
                                زموږ د پیرودونکو نظرونه
                            </motion.h2>

                            <motion.div
                                className="flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4 md:mb-6 px-4"
                                variants={fadeInUp}
                            >
                                <div className="h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent flex-1 max-w-6 sm:max-w-12 md:max-w-20"></div>
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-gradient-to-r from-secondary-500 to-tertiary-500 rounded-full"></div>
                                <div className="h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent flex-1 max-w-6 sm:max-w-12 md:max-w-20"></div>
                            </motion.div>

                            <motion.p
                                className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-zar text-primary-600 max-w-2xl mx-auto px-2 sm:px-4 md:px-0"
                                variants={fadeInUp}
                            >
                                وګورئ چې زموږ پیرودونکي د زموږ خدماتو په اړه څه
                                وايي
                            </motion.p>
                        </motion.div>

                        {/* Modern Testimonial Display */}
                        <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-0">
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
                                        <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                                            <div className="flex flex-col lg:flex-row">
                                                {/* Left side - Enhanced User info */}
                                                <div className="lg:w-2/5 bg-gradient-to-br from-secondary-600 via-tertiary-600 to-primary-600 p-4 sm:p-6 md:p-8 lg:p-12 text-white relative overflow-hidden">
                                                    {/* Background pattern */}
                                                    <div className="absolute inset-0 opacity-20">
                                                        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"></div>
                                                        <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-white rounded-full translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12"></div>
                                                    </div>

                                                    <div className="relative z-10 flex flex-col items-center text-center h-full justify-center">
                                                        {/* Enhanced avatar */}
                                                        <div className="relative mb-4 sm:mb-6">
                                                            <div className="w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 rounded-full border-2 sm:border-4 border-white/30 overflow-hidden shadow-2xl backdrop-blur-sm">
                                                                <img
                                                                    src={
                                                                        testimonialsWithComments[
                                                                            currentTestimonial
                                                                        ]
                                                                            ?.user_image ||
                                                                        "./imgs/avatar-placeholder.jpg" ||
                                                                        "/placeholder.svg"
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
                                                            <div className="absolute -inset-1 sm:-inset-2 rounded-full border border-white/20 animate-pulse"></div>
                                                        </div>

                                                        <h3 className="font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 text-white drop-shadow-lg">
                                                            {testimonialsWithComments[
                                                                currentTestimonial
                                                            ]?.user_name ||
                                                                "Anonymous"}
                                                        </h3>

                                                        {/* Enhanced rating stars */}
                                                        <div className="flex justify-center gap-1 mb-4 sm:mb-6">
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
                                                                        className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${
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
                                                        <div className="bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full">
                                                            <span className="text-sm sm:text-base md:text-lg font-bold">
                                                                {testimonialsWithComments[
                                                                    currentTestimonial
                                                                ]?.rating || 0}
                                                                /5
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right side - Enhanced content */}
                                                <div className="lg:w-3/5 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center relative">
                                                    {/* Large quote icon */}
                                                    <div className="absolute top-3 sm:top-6 right-3 sm:right-6 text-primary-200">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="40"
                                                            height="40"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            className="opacity-50"
                                                        >
                                                            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                                                        </svg>
                                                    </div>

                                                    {/* Testimonial text */}
                                                    <motion.p
                                                        className="text-primary-700 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed font-bold font-zar mb-6 sm:mb-8 relative z-10"
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
                                                    <div className="flex items-center gap-2 sm:gap-4">
                                                        <div className="h-px bg-gradient-to-r from-secondary-500 to-tertiary-500 flex-1"></div>
                                                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-secondary-500 to-tertiary-500 rounded-full"></div>
                                                        <div className="h-px bg-gradient-to-r from-tertiary-500 to-primary-500 flex-1"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                            {/* Enhanced Navigation Controls */}
                            <div className="flex justify-between items-center mt-8 sm:mt-12">
                                <motion.button
                                    onClick={prevTestimonial}
                                    className="group bg-white/80 backdrop-blur-sm w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full shadow-xl border border-white/20 flex items-center justify-center hover:bg-gradient-to-r hover:from-secondary-500 hover:to-tertiary-500 transition-all duration-300 hover:scale-110"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="Previous testimonial"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary-600 group-hover:text-white transition-colors duration-300"
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
                                <div className="hidden sm:flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg border border-white/20">
                                    {testimonialsWithComments.map(
                                        (_, index) => (
                                            <motion.button
                                                key={index}
                                                onClick={() =>
                                                    setCurrentTestimonial(index)
                                                }
                                                className={`rounded-full transition-all duration-300 ${
                                                    index === currentTestimonial
                                                        ? "w-6 sm:w-8 h-2 sm:h-3 bg-gradient-to-r from-secondary-500 to-tertiary-500"
                                                        : "w-2 sm:w-3 h-2 sm:h-3 bg-primary-300 hover:bg-primary-400"
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
                                    className="group bg-white/80 backdrop-blur-sm w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full shadow-xl border border-white/20 flex items-center justify-center hover:bg-gradient-to-r hover:from-tertiary-500 hover:to-primary-500 transition-all duration-300 hover:scale-110"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="Next testimonial"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary-600 group-hover:text-white transition-colors duration-300"
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

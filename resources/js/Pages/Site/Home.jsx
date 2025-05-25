import { Link, usePage } from "@inertiajs/react";
import SiteLayout from "../../Layouts/SiteLayout";
import { useRate } from "@/Contexts/RatingContext";
import { usePosts } from "@/Contexts/PostContext";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FaStar, FaUser, FaCalendarAlt } from "react-icons/fa";

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

    // Debug logs
    console.log('Rate data:', rate);
    console.log('Posts data:', posts);

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

    // Debug logs
    console.log('Posts with ratings:', postsWithRatings);

    // Filter posts that have at least one rating
    const ratedPosts = postsWithRatings.filter((post) => post.hasRatings);

    // Debug logs
    console.log('Rated posts:', ratedPosts);

    // Sort by rating (highest first) and take top 10
    const topDesigns = ratedPosts
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 10);

    // Debug logs
    console.log('Top designs:', topDesigns);

    // Modify the testimonials data preparation to:
    // 1. Limit to 15 testimonials
    // 2. Sort by newest first (assuming newer ratings have higher IDs)
    const testimonialsWithComments = rate
        .filter((rating) => rating.comment && rating.comment.trim() !== "")
        .sort((a, b) => b.id - a.id) // Sort by newest first (assuming higher ID = newer)
        .slice(0, 15); // Limit to 15 testimonials

    // Debug logs
    console.log('Testimonials with comments:', testimonialsWithComments);

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

    // Auto-scroll testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            nextTestimonial();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

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
            {/* Hero Section */}
            <section className="text-primary-900 py-10 lg:px-10 flex flex-col md:flex-row items-center">
                <motion.div
                    className="mx-auto px-4 text-start md:w-1/2"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold font-zar mb-4"
                        variants={fadeInUp}
                    >
                        ماسټر خیاط
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl mb-8 font-zar"
                        variants={fadeInUp}
                    >
                        ستاسو د خوښې لباسونه دلته دي، د خیاطۍ خدمات په غوره بیه،
                        زموږ موخه ستاسو د خوښۍ او اطمینان تضمین دی. موږ د کیفیت
                        او سټایل په اړه ژمن یو، ترڅو تاسو تل په زړه پورې ښکاره
                        شئ.
                    </motion.p>
                    <motion.div
                        variants={fadeInUp}
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 1 }}
                    >
                        <Link
                            href="/tailor"
                            className="bg-secondary-600 text-primary-50 font-bold px-6 py-3 rounded-md font-zar text-xl hover:bg-secondary-700 transition"
                        >
                            خیاط ومومئ
                        </Link>
                    </motion.div>
                </motion.div>
                <motion.div
                    className="md:w-1/2"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <img
                        src="./imgs/ilus-3.jpg"
                        className="p-10 transform scale-x-[-1]"
                        alt="hero"
                    />
                </motion.div>
            </section>

            {/* Top 10 Designs Section - Only show if there are rated designs */}
            {topDesigns.length > 0 && (
                <section className="py-20 bg-gradient-to-b from-primary-50 to-primary-100">
                    <div className="container mx-auto px-4 md:px-8 lg:px-12">
                        <motion.div
                            className="max-w-3xl mx-auto text-center mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeInUp}
                        >
                            <motion.h2
                                className="text-3xl font-bold font-zar text-primary-900 mb-4"
                                variants={fadeInUp}
                            >
                                غوره ۱۰ ډیزاینونه
                            </motion.h2>
                            <motion.div
                                className="w-24 h-1 bg-secondary-500 mx-auto mb-6"
                                initial={{ width: 0 }}
                                whileInView={{ width: 96 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            ></motion.div>
                            <motion.p
                                className="text-xl md:text-2xl font-zar text-primary-700"
                                variants={fadeInUp}
                            >
                                زموږ تر ټولو مشهور او غوره ډیزاینونه وګورئ
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
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                                    variants={cardVariants}
                                    whileHover="hover"
                                >
                                    <div className="relative">
                                        <img
                                            src={design.image}
                                            alt={design.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center">
                                            <FaStar className="text-yellow-500 mr-1" />
                                            <span className="font-bold">{design.averageRating.toFixed(1)}</span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold font-zar mb-2">{design.title}</h3>
                                        <p className="text-gray-600 font-zar mb-3">{design.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500 font-zar">
                                                <FaUser className="inline mr-1" />
                                                {design.author}
                                            </span>
                                            <span className="text-sm text-gray-500 font-zar">
                                                <FaCalendarAlt className="inline mr-1" />
                                                {new Date(design.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Testimonials Section - Simple Reliable Carousel */}
            {testimonialsWithComments.length > 0 && (
                <section className="py-20 bg-gradient-to-br from-tertiary-50 to-tertiary-100">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h2 className="text-3xl font-bold font-zar  text-primary-900 mb-4">
                                زموږ د پیرودونکو نظرونه
                            </h2>
                            <div className="w-24 h-1 bg-secondary-500 mx-auto mb-6"></div>
                            <p className="text-xl md:text-2xl font-zar text-primary-700">
                                وګورئ چې زموږ پیرودونکي د زموږ خدماتو په اړه څه
                                وايي
                            </p>
                        </div>

                        {/* Simple Testimonial Display */}
                        <div className="max-w-4xl mx-auto">
                            {/* Current Testimonial */}
                            {testimonialsWithComments.length > 0 && testimonialsWithComments[currentTestimonial] && (
                                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                                    <div className="flex flex-col md:flex-row">
                                        {/* Left side - User info */}
                                        <div className="md:w-1/3 bg-gradient-to-br from-tertiary-600 to-tertiary-800 p-8 text-white flex flex-col justify-center items-center">
                                            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg mb-4">
                                                <img 
                                                    src={testimonialsWithComments[currentTestimonial]?.user_image || "./imgs/avatar-placeholder.jpg"}
                                                    alt={testimonialsWithComments[currentTestimonial]?.user_name || "User"}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <h3 className="font-bold text-xl mb-2 text-center">
                                                {testimonialsWithComments[currentTestimonial]?.user_name || "Anonymous"}
                                            </h3>

                                            {/* Rating stars */}
                                            <div className="flex justify-center mt-2 mb-4">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg
                                                        key={star}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className={`h-5 w-5 ${
                                                            star <= (testimonialsWithComments[currentTestimonial]?.rating || 0)
                                                                ? "text-yellow-300"
                                                                : "text-gray-400"
                                                        }`}
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>

                                            {/* Small decorative element */}
                                            <div className="w-12 h-1 bg-white opacity-50 rounded-full"></div>
                                        </div>

                                        {/* Right side - Testimonial content */}
                                        <div className="md:w-2/3 p-8 md:p-10 flex flex-col justify-center">
                                            {/* Quote icon */}
                                            <div className="text-tertiary-400 mb-6">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="40"
                                                    height="40"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                                                </svg>
                                            </div>

                                            {/* Testimonial text */}
                                            <p className="text-primary-700 text-lg md:text-xl leading-relaxed mb-8 font-bold font-zar">
                                                {testimonialsWithComments[currentTestimonial]?.comment || "No comment available"}
                                            </p>

                                            {/* Decorative line */}
                                            <div className="w-16 h-1 bg-tertiary-500 rounded-full mt-auto"></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Controls */}
                            <div className="flex justify-between items-center mt-8">
                                <button
                                    onClick={prevTestimonial}
                                    className="group bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-tertiary-500 transition-colors duration-300"
                                    aria-label="Previous testimonial"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-tertiary-500 group-hover:text-white transition-colors duration-300"
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
                                </button>

                                {/* Dots Indicator */}
                                <div className="flex items-center gap-3">
                                    {testimonialsWithComments.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentTestimonial(index)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                index === currentTestimonial
                                                    ? "bg-tertiary-500 w-6"
                                                    : "bg-tertiary-300 hover:bg-tertiary-400"
                                            }`}
                                            aria-label={`Go to testimonial ${index + 1}`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={nextTestimonial}
                                    className="group bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-tertiary-500 transition-colors duration-300"
                                    aria-label="Next testimonial"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-tertiary-500 group-hover:text-white transition-colors duration-300"
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
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Special Offers Section */}
            <motion.section
                className="py-16 bg-tertiary-700 text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className=" mx-auto px-4 text-center">
                    <motion.h2
                        className="text-3xl font-bold font-zar mb-6"
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        ځانګړي وړاندیزونه
                    </motion.h2>
                    <motion.p
                        className="text-xl md:text-2xl font-zar  mb-8 max-w-3xl mx-auto"
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        په خپل لومړي فرمایش کې ۲۰٪ تخفیف ترلاسه کړئ او د نویو
                        پیرودونکو لپاره د محدود وخت وړاندیز.
                    </motion.p>
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href="/order"
                            className="font-bold px-6 py-3 rounded-md font-zar text-xl bg-white text-primary-900  hover:bg-primary-100 transition inline-block"
                        >
                            اوس فرمایش ورکړئ
                        </Link>
                    </motion.div>
                </div>
            </motion.section>
        </SiteLayout>
    );
};

export default Home;

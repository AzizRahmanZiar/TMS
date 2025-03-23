import { Link } from "@inertiajs/react";
import SiteLayout from "../../Layouts/SiteLayout";
import { FaStar, FaStarHalfAlt, FaRegStar, FaInfoCircle } from "react-icons/fa";
import { useRate } from "@/Contexts/RatingContext";
import { usePosts } from "@/Contexts/PostContext";

const Home = () => {
    const { rate } = useRate();
    const { posts } = usePosts();

    // Function to get average rating for a post
    const getPostRating = (postId) => {
        const postRatings = rate.filter((rating) => rating.postId === postId);
        if (postRatings.length === 0) return 0;

        const sum = postRatings.reduce(
            (total, rating) => total + rating.rating,
            0
        );
        return sum / postRatings.length;
    };

    // Create an array of posts with their ratings
    const postsWithRatings = posts.map((post) => ({
        ...post,
        averageRating: getPostRating(post.id),
    }));

    // Sort by rating (highest first) and take top 10
    const topDesigns = postsWithRatings
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 10);

    // Function to render star ratings
    const renderRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(
                    <FaStarHalfAlt key={i} className="text-yellow-400" />
                );
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-400" />);
            }
        }

        return <div className="flex">{stars}</div>;
    };

    return (
        <SiteLayout>
            {/* Hero Section */}
            <section className="text-primary-900 py-10 lg:px-10 flex flex-col md:flex-row items-center">
                <div className=" mx-auto px-4 text-start md:w-1/2">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        ماسټر خیاط
                    </h1>
                    <p className="text-xl md:text-2xl mb-8">
                        ستاسو د خوښې لباسونه دلته دي، زموږ ماهر خیاطان د ځانګړو
                        پیښو لپاره ځانګړي لباسونه جوړوي، چې د هر ډول مناسبت
                        لپاره مناسب وي. د خیاطۍ خدمات په غوره بیه، زموږ موخه
                        ستاسو د خوښۍ او اطمینان تضمین دی. موږ د کیفیت او سټایل
                        په اړه ژمن یو، ترڅو تاسو تل په زړه پورې ښکاره شئ.
                    </p>
                    <div>
                        <Link
                            href="/tailor"
                            className="bg-secondary-600 text-primary-50 px-6 py-3 rounded-md font-medium hover:bg-secondary-700 transition"
                        >
                            خیاط ومومئ
                        </Link>
                    </div>
                </div>
                <div className=" md:w-1/2">
                    <img
                        src="./imgs/ilus-3.jpg"
                        className="p-10 transform scale-x-[-1]"
                        alt="hero"
                    />
                </div>
            </section>

            {/* Top 10 Designs Section */}

            <section className="py-20 bg-gradient-to-b from-primary-50 to-primary-100">
                <div className="container mx-auto px-4 md:px-8 lg:px-12">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-4xl font-bold text-primary-900 mb-4">
                            غوره ۱۰ ډیزاینونه
                        </h2>
                        <div className="w-24 h-1 bg-secondary-500 mx-auto mb-6"></div>
                        <p className="text-lg text-primary-700">
                            زموږ تر ټولو مشهور او غوره ډیزاینونه وګورئ
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {topDesigns.map((design) => (
                            <div
                                key={design.id}
                                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                {/* Image container with overlay effect */}
                                <div className="relative overflow-hidden">
                                    <img
                                        src={
                                            design.image ||
                                            `https://via.placeholder.com/300x400?text=${
                                                design.title || "Design"
                                            }`
                                        }
                                        alt={design.title}
                                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Category badge */}
                                    {design.category && (
                                        <div className="absolute top-3 right-3">
                                            <span className="bg-secondary-500 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-lg">
                                                {design.category}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="font-bold text-primary-900 text-lg mb-2 line-clamp-1">
                                        {design.title}
                                    </h3>

                                    <div className="flex justify-between items-center">
                                        {/* Rating */}
                                        <div className="flex items-center bg-primary-50 px-2 py-1 rounded-lg">
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg
                                                        key={star}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className={`h-4 w-4 ${
                                                            star <=
                                                            Math.floor(
                                                                design.averageRating
                                                            )
                                                                ? "text-yellow-400"
                                                                : star <=
                                                                      Math.ceil(
                                                                          design.averageRating
                                                                      ) &&
                                                                  star -
                                                                      design.averageRating <
                                                                      1
                                                                ? "text-yellow-400"
                                                                : "text-gray-300"
                                                        }`}
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        {star <=
                                                            Math.floor(
                                                                design.averageRating
                                                            ) ||
                                                        (star <=
                                                            Math.ceil(
                                                                design.averageRating
                                                            ) &&
                                                            star -
                                                                design.averageRating <
                                                                1) ? (
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        ) : (
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        )}
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="mr-1 text-sm font-medium text-primary-900">
                                                {design.averageRating.toFixed(
                                                    1
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-gradient-to-b from-primary-50 to-primary-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-4xl font-bold text-primary-900 mb-4">
                            زموږ د پیرودونکو نظرونه
                        </h2>
                        <div className="w-24 h-1 bg-secondary-500 mx-auto mb-6"></div>
                        <p className="text-lg text-primary-700">
                            وګورئ چې زموږ پیرودونکي د زموږ خدماتو په اړه څه وايي
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rate.slice(0, 6).map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                            >
                                <div className="relative">
                                    {/* Decorative top bar */}
                                    <div className="h-3 bg-gradient-to-r from-secondary-400 to-tertiary-500"></div>

                                    {/* Quote icon */}
                                    <div className="absolute -bottom-6 right-6 w-12 h-12 rounded-full bg-tertiary-500 flex items-center justify-center shadow-md">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                <div className="p-6 pt-10">
                                    {/* User info */}
                                    <div className="flex items-center">
                                        <img
                                            src={
                                                testimonial.userImage ||
                                                "./imgs/avatar-placeholder.jpg"
                                            }
                                            alt={testimonial.username}
                                            className="w-12 h-12 rounded-full border-2 border-secondary-400 object-cover mr-4"
                                        />
                                        <div>
                                            <h3 className="font-bold text-primary-900">
                                                {testimonial.username}
                                            </h3>
                                        </div>
                                    </div>
                                    {/* Testimonial text */}
                                    <p className="text-primary-700 mb-6 text-lg leading-relaxed">
                                        "{testimonial.comment}"
                                    </p>

                                    {/* Divider */}
                                    <div className="w-16 h-0.5 bg-primary-200 mb-4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Special Offers Section */}
            <section className="py-16 bg-tertiary-700 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        ځانګړي وړاندیزونه
                    </h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto">
                        په خپل لومړي فرمایش کې ۲۰٪ تخفیف ترلاسه کړئ! د نویو
                        پیرودونکو لپاره د محدود وخت وړاندیز.
                    </p>
                    <Link
                        href="/order"
                        className="bg-white text-primary-900 px-6 py-3 rounded-md font-medium hover:bg-primary-100 transition inline-block"
                    >
                        اوس فرمایش ورکړئ
                    </Link>
                </div>
            </section>
        </SiteLayout>
    );
};

export default Home;

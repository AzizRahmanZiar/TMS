import React from "react";
import { Link } from "@inertiajs/react";
import SiteLayout from "../../Layouts/SiteLayout";
import {
    FaStar,
    FaStarHalfAlt,
    FaRegStar,
    FaInfoCircle,
    FaArrowRight,
} from "react-icons/fa";

const Home = () => {
    // Sample data for top designs
    const topDesigns = [
        {
            id: 1,
            name: "عصري دریشي",
            rating: 4.8,
            image: "./imgs/6.jpg",
        },
        {
            id: 2,
            name: "دودیزې جامې",
            rating: 4.7,
            image: "./imgs/2.jpg",
        },
        {
            id: 3,
            name: "د واده جامې",
            rating: 4.9,
            image: "./imgs/3.jpg",
        },
        {
            id: 4,
            name: "عادي جامې",
            rating: 4.5,
            image: "./imgs/4.jpg",
        },
        {
            id: 5,
            name: "د کار جامې",
            rating: 4.6,
            image: "./imgs/5.jpg",
        },
        {
            id: 6,
            name: "د ماښام جامې",
            rating: 4.8,
            image: "./imgs/6.jpg",
        },
        {
            id: 7,
            name: "د اوړي کلکسیون",
            rating: 4.4,
            image: "./imgs/1.jpg",
        },
        {
            id: 8,
            name: "د ژمي کلکسیون",
            rating: 4.7,
            image: "./imgs/2.jpg",
        },
        {
            id: 9,
            name: "رسمي جامې",
            rating: 4.6,
            image: "./imgs/3.jpg",
        },
        {
            id: 10,
            name: "قومي ډیزاین",
            rating: 4.9,
            image: "./imgs/6.jpg",
        },
    ];

    // Sample testimonials
    const testimonials = [
        {
            id: 1,
            name: "احمد خان",
            comment:
                "ډیر ښه خدمت او د لوړ کیفیت خیاطي. زه د خپلې دریشۍ څخه ډیر راضي یم.",
            rating: 5,
        },
        {
            id: 2,
            name: "سارا احمد",
            comment:
                "د جزئیاتو ته پاملرنه حیرانوونکې ده. زما جامې په کامل ډول برابرې دي!",
            rating: 4.5,
        },
        {
            id: 3,
            name: "محمد علي",
            comment: "مسلکي خیاطان چې پوهیږي مشتریان څه غواړي.",
            rating: 5,
        },
    ];

    // Sample recent posts
    const recentPosts = [
        {
            id: 1,
            title: "د اوړي فیشن میلانونه",
            excerpt:
                "د اوړي د وروستي فیشن میلانونو په اړه معلومات ترلاسه کړئ...",
            image: "./imgs/4.jpg",
            date: "2023-06-15",
        },
        {
            id: 2,
            title: "د واده موسم ځانګړی",
            excerpt: "د واده موسم لپاره ځانګړي وړاندیزونه...",
            image: "./imgs/5.jpg",
            date: "2023-06-10",
        },
        {
            id: 3,
            title: "څنګه سم ټوکر غوره کړو",
            excerpt: "د خپلو جامو لپاره د مناسب ټوکر د غوره کولو لارښوونې...",
            image: "./imgs/3.jpg",
            date: "2023-06-05",
        },
    ];

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
                        د خیاطۍ د ماهرانو او استادانو سره ستاسو د خوښې جامې
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            href="/tailor"
                            className="bg-secondary-600 text-primary-50 px-6 py-3 rounded-md font-medium hover:bg-secondary-700 transition"
                        >
                            خیاط ومومئ
                        </Link>
                        <Link
                            href="/order"
                            className="bg-transparent border-2 border-primary-700 hover:border-primary-900 text-primary-900 px-6 py-3 rounded-md font-medium hover:bg-primary-600 hover:text-white transition"
                        >
                            فرمایش ورکړئ
                        </Link>
                    </div>
                </div>
                <div className=" md:w-1/2">
                    <img src="./imgs/heroI.jpg" alt="hero" />
                </div>
            </section>

            {/* Top 10 Designs Section */}
            <section className="py-16 bg-primary-50">
                <div className="container mx-auto  px-20">
                    <h2 className="text-3xl font-bold text-primary-900 text-center mb-12">
                        غوره ۱۰ ډیزاینونه
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {topDesigns.map((design) => (
                            <div
                                key={design.id}
                                className="bg-white rounded-lg border overflow-hidden transition transform hover:-translate-y-1 hover:shadow-xl"
                            >
                                <img
                                    src={
                                        design.image ||
                                        `https://via.placeholder.com/300x400?text=${design.name}`
                                    }
                                    alt={design.name}
                                    className="w-full h-48"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold text-primary-900 text-lg mb-2">
                                        {design.name}
                                    </h3>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            {renderRating(design.rating)}
                                            <span className="mr-2 text-primary-900">
                                                {design.rating}
                                            </span>
                                        </div>
                                        <button className="text-primary-900">
                                            <FaInfoCircle size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-primary-900 text-center mb-12">
                        د پیرودونکو نظرونه
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="bg-gray-50 p-6 rounded-lg border"
                            >
                                <p className="font-semibold">
                                    {testimonial.name}
                                </p>
                                <p className="text-gray-700 mb-4">
                                    "{testimonial.comment}"
                                </p>

                                <div className="mb-4">
                                    {renderRating(testimonial.rating)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recent Posts Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-primary-900 text-center mb-12">
                        تازه پوسټونه
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {recentPosts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white rounded-lg border overflow-hidden"
                            >
                                <img
                                    src={
                                        post.image ||
                                        `https://via.placeholder.com/600x400?text=${post.title}`
                                    }
                                    alt={post.title}
                                    className="w-full h-48 "
                                />
                                <div className="p-6">
                                    <h3 className="font-bold text-secondary-600 text-xl mb-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-tertiary-900 mb-4">
                                        {post.excerpt}
                                    </p>
                                    <p className="text-primary-800 text-sm mb-2">
                                        {post.date}
                                    </p>
                                    <Link
                                        href={`/post/${post.id}`}
                                        className="text-secondary-800 font-medium flex items-center hover:text-secondary-900"
                                    >
                                        نور ولولئ{" "}
                                        <FaArrowRight className="mr-2" />
                                    </Link>
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

// <section className="text-primary-900 py-10 lg:px-10 flex flex-col md:flex-row items-center">
// <div className="mx-auto px-4 text-start md:w-1/2">
//     <h1 className="text-3xl md:text-4xl font-bold mb-4">
//         زموږ ماهر خیاطان
//     </h1>
//     <p className="text-lg md:text-xl max-w-3xl mx-auto">
//         د خپلو اړتیاوو لپاره غوره خیاط ومومئ. زموږ مسلکي کسان د
//         کلونو تجربه لري او په بیلابیلو سټایلونو کې تخصص لري.
//     </p>
// </div>
// <div className=" md:w-1/2">
//     <img src="./imgs/tailor-1.jpg" alt="tailor" />
// </div>
// </section>

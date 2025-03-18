// import React, { useState } from "react";
// import { Link } from "@inertiajs/react";
// import SiteLayout from "../../Layouts/SiteLayout";
// import {
//     FaCalendarAlt,
//     FaUser,
//     FaComment,
//     FaSearch,
//     FaTags,
//     FaArrowRight,
// } from "react-icons/fa";
// import { usePosts } from "@/Contexts/PostContext";

// const Post = () => {
//     // Sample data for posts
//     const allPosts = [
//         {
//             id: 1,
//             title: "د اوړي فیشن میلانونه",
//             description:
//                 "د اوړي د وروستي فیشن میلانونو په اړه معلومات ترلاسه کړئ.",
//             image: "./imgs/2.jpg",
//             date: "۱۴۰۲/۰۳/۲۵",
//             author: "احمد کریمي",
//             category: "فیشن",
//             comments: 8,
//         },
//         {
//             id: 2,
//             title: "د واده موسم ځانګړی",
//             description:
//                 "د واده موسم لپاره ځانګړي وړاندیزونه او د واده جامو نوي ډیزاینونه.",

//             image: "./imgs/4.jpg",
//             date: "۱۴۰۲/۰۳/۲۰",
//             author: "خیبر",
//             category: "واده",

//             comments: 12,
//         },
//         {
//             id: 3,
//             title: "څنګه سم ټوکر غوره کړو",
//             description: "د خپلو جامو لپاره د مناسب ټوکر د غوره کولو لارښوونې.",

//             image: "./imgs/6.jpg",
//             date: "۱۴۰۲/۰۳/۱۵",
//             author: "محمد حسیني",
//             category: "ټوکر",

//             comments: 5,
//         },
//         {
//             id: 4,
//             title: "د خیاطۍ اساسي مهارتونه",
//             description: "د خیاطۍ اساسي مهارتونه چې هر څوک یې باید زده کړي.",

//             image: "./imgs/1.jpg",
//             date: "۱۴۰۲/۰۳/۱۰",
//             author: " بلال",
//             category: "زده کړه",

//             comments: 10,
//         },
//         {
//             id: 5,
//             title: "د ژمي لپاره غوره جامې",
//             description:
//                 "د ژمي لپاره د غوره جامو په اړه وړاندیزونه او لارښوونې.",

//             image: "./imgs/5.jpg",
//             date: "۱۴۰۲/۰۳/۰۵",
//             author: "یوسف حکیمي",
//             category: "فیشن",

//             comments: 7,
//         },
//         {
//             id: 6,
//             title: "د ماشومانو جامو ډیزاین",
//             description:
//                 "د ماشومانو لپاره د راحته او ښکلو جامو ډیزاین کولو لارښوونې.",

//             image: "./imgs/3.jpg",
//             date: "۱۴۰۲/۰۳/۰۱",
//             author: "خان ",
//             category: "ماشومان",

//             comments: 9,
//         },
//     ];

//     const { posts, setPosts } = usePosts();
//     // State for search and filters

//     const [searchTerm, setSearchTerm] = useState("");
//     const [category, setCategory] = useState("");
//     // const [posts, setPosts] = useState(allPosts);

//     // Get unique categories
//     const categories = [...new Set(allPosts.map((post) => post.category))];

//     // Function to handle filtering
//     const handleFilter = () => {
//         let filtered = allPosts;

//         if (searchTerm) {
//             filtered = filtered.filter(
//                 (post) =>
//                     post.title
//                         .toLowerCase()
//                         .includes(searchTerm.toLowerCase()) ||
//                     post.excerpt
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
//         setPosts(allPosts);
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

//             {/* Newsletter Section */}
//             <section className="py-20 bg-secondary-50">
//                 <div className="container mx-auto px-4 text-center">
//                     <h2 className="text-2xl text-primary-900 font-bold mb-6">
//                         زموږ خبرلیک کې ګډون وکړئ
//                     </h2>
//                     <p className="text-primary-700 mb-8 max-w-2xl mx-auto">
//                         د خیاطۍ، فیشن او د جامو په اړه تازه مقالې او معلومات
//                         ترلاسه کړئ.
//                     </p>
//                     <div className="max-w-md mx-auto flex">
//                         <input
//                             type="email"
//                             placeholder="ستاسو بریښنالیک"
//                             className="flex-1 p-3 border border-gray-300 rounded-r-md focus:outline-none"
//                         />
//                         <button className="bg-tertiary-800 text-primary-50 p-3 rounded-l-md hover:bg-tertiary-900 transition">
//                             ګډون وکړئ
//                         </button>
//                     </div>
//                 </div>
//             </section>
//         </SiteLayout>
//     );
// };

// export default Post;

import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import SiteLayout from "../../Layouts/SiteLayout";
import {
    FaCalendarAlt,
    FaUser,
    FaComment,
    FaSearch,
    FaArrowRight,
} from "react-icons/fa";
import { usePosts } from "@/Contexts/PostContext";

const Post = () => {
    const { posts, setPosts } = usePosts(); // د Context څخه posts ترلاسه کول

    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");

    // د فلټر بېرته تنظیم کولو لپاره اصلي پوسټونه ذخیره کوو
    const [originalPosts, setOriginalPosts] = useState([]);

    // کله چې Component ماؤنټ شي، نو اصلي پوسټونه ذخیره کوو
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
                                className="w-full p-3 border border-gray-300  rounded-md"
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
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-64"
                                />
                                <div className="p-6">
                                    <div className="flex justify-between items-center text-sm text-primary-500 mb-3">
                                        <div className="flex items-center">
                                            <FaCalendarAlt className="ml-1" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center">
                                            <FaUser className="ml-1" />
                                            {post.author}
                                        </div>
                                        <div className="flex items-center">
                                            <FaComment className="ml-1" />
                                            {post.comments}
                                        </div>
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
        </SiteLayout>
    );
};

export default Post;

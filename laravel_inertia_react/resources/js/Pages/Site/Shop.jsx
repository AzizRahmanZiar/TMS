import { useState } from "react";
import { Link } from "@inertiajs/react";
import SiteLayout from "../../Layouts/SiteLayout";
import {
    FaStar,
    FaStarHalfAlt,
    FaRegStar,
    FaSearch,
    FaFilter,
    FaMapMarkerAlt,
    FaPhone,
} from "react-icons/fa";

const Shop = () => {
    // Sample data for shops
    const allShops = [
        {
            id: 1,
            name: "د احمد خیاطي",
            established: "۱۳۸۵",
            specialization: "رسمي جامې",
            rating: 4.8,
            price: "$$",
            address: "کابل، ۱۰ ناحیه، اصلي سړک",
            image: "/images/shops/shop1.jpg",
            tailors: 8,
            services: ["د ځانګړو جامو جوړول", "بدلونونه", "د ټوکر پلور"],
        },
        {
            id: 2,
            name: "د کریمي خیاطي",
            established: "۱۳۹۰",
            specialization: "دودیزې جامې",
            rating: 4.5,
            price: "$",
            address: "هرات، مرکزي سیمه، د بازار سړک",
            image: "/images/shops/shop2.jpg",
            tailors: 5,
            services: ["د دودیزو جامو جوړول", "بدلونونه", "د ټوکر پلور"],
        },
        {
            id: 3,
            name: "د واده جامو مرکز",
            established: "۱۳۸۸",
            specialization: "د واده جامې",
            rating: 4.9,
            price: "$$$",
            address: "مزار شریف، ۵ ناحیه، د واده مارکیټ",
            image: "/images/shops/shop3.jpg",
            tailors: 12,
            services: ["د واده جامو جوړول", "د واده جامو کرایه", "د ټوکر پلور"],
        },
        {
            id: 4,
            name: "عصري فیشن",
            established: "۱۳۹۵",
            specialization: "عصري فیشن",
            rating: 4.3,
            price: "$$",
            address: "کندهار، اصلي سړک، د فیشن مارکیټ",
            image: "/images/shops/shop4.jpg",
            tailors: 6,
            services: ["د عصري جامو جوړول", "بدلونونه", "د ټوکر پلور"],
        },
        {
            id: 5,
            name: "د ماشومانو جامې",
            established: "۱۳۹۲",
            specialization: "د ماشومانو جامې",
            rating: 4.7,
            price: "$$",
            address: "جلال آباد، ۳ ناحیه، د ماشومانو مارکیټ",
            image: "/images/shops/shop5.jpg",
            tailors: 4,
            services: ["د ماشومانو جامو جوړول", "بدلونونه", "د ټوکر پلور"],
        },
        {
            id: 6,
            name: "د ماشومانو جامې",
            established: "۱۳۹۲",
            specialization: "د ماشومانو جامې",
            rating: 4.7,
            price: "$$",
            address: "جلال آباد، ۳ ناحیه، د ماشومانو مارکیټ",
            image: "/images/shops/shop5.jpg",
            tailors: 4,
            services: ["د ماشومانو جامو جوړول", "بدلونونه", "د ټوکر پلور"],
        },
    ];

    // State for search and filters
    const [searchTerm, setSearchTerm] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [shops, setShops] = useState(allShops);

    // Function to handle filtering
    const handleFilter = () => {
        let filtered = allShops;

        if (searchTerm) {
            filtered = filtered.filter(
                (shop) =>
                    shop.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    shop.address
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
        }

        if (specialization) {
            filtered = filtered.filter((shop) =>
                shop.specialization.includes(specialization)
            );
        }

        if (priceRange) {
            filtered = filtered.filter((shop) => shop.price === priceRange);
        }

        setShops(filtered);
    };

    // Function to reset filters
    const resetFilters = () => {
        setSearchTerm("");
        setSpecialization("");
        setPriceRange("");
        setShops(allShops);
    };

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
        <SiteLayout title="د خیاطۍ دوکانونه - خیاط ماسټر">
            {/* Hero Section */}
            <section className="bg-indigo-600 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        د خیاطۍ دوکانونه
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">
                        د خپلو اړتیاوو لپاره غوره دوکان ومومئ. زموږ دوکانونه د
                        لوړ کیفیت خیاطۍ خدمتونه وړاندې کوي.
                    </p>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-8 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="د نوم یا موقعیت له مخې لټون"
                                    className="w-full p-3 border border-gray-300 rounded-md pr-10"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>

                            <select
                                className="w-full p-3 border border-gray-300 rounded-md"
                                value={specialization}
                                onChange={(e) =>
                                    setSpecialization(e.target.value)
                                }
                            >
                                <option value="">ټول تخصصونه</option>
                                <option value="رسمي جامې">رسمي جامې</option>
                                <option value="دودیزې جامې">دودیزې جامې</option>
                                <option value="د واده جامې">د واده جامې</option>
                                <option value="عصري فیشن">عصري فیشن</option>
                                <option value="د ماشومانو جامې">
                                    د ماشومانو جامې
                                </option>
                            </select>

                            <select
                                className="w-full p-3 border border-gray-300 rounded-md"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                            >
                                <option value="">ټول قیمتونه</option>
                                <option value="$">$ (ارزانه)</option>
                                <option value="$$">$$ (معیاري)</option>
                                <option value="$$$">$$$ (لوکس)</option>
                            </select>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleFilter}
                                    className="flex-1 bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition flex items-center justify-center"
                                >
                                    <FaFilter className="ml-2" /> فیلټر
                                </button>
                                <button
                                    onClick={resetFilters}
                                    className="flex-1 bg-gray-200 text-gray-800 p-3 rounded-md hover:bg-gray-300 transition"
                                >
                                    بیا تنظیم
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shops Listing */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {shops.map((shop) => (
                            <div
                                key={shop.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <div className="relative">
                                    <img
                                        src={
                                            shop.image ||
                                            `https://via.placeholder.com/400x300?text=${shop.name}`
                                        }
                                        alt={shop.name}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black to-transparent p-4">
                                        <h3 className="text-white text-xl font-bold">
                                            {shop.name}
                                        </h3>
                                        <div className="flex text-white">
                                            {renderRating(shop.rating)}
                                            <span className="mr-2">
                                                {shop.rating}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="mb-4">
                                        <p className="text-gray-700">
                                            <strong>تاسیس:</strong>{" "}
                                            {shop.established}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>تخصص:</strong>{" "}
                                            {shop.specialization}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>د قیمت حد:</strong>{" "}
                                            {shop.price}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>د خیاطانو شمیر:</strong>{" "}
                                            {shop.tailors}
                                        </p>
                                        <p className="text-gray-700 flex items-start">
                                            <FaMapMarkerAlt className="mt-1 ml-1 text-indigo-600" />
                                            <span>{shop.address}</span>
                                        </p>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="font-semibold text-lg mb-2">
                                            خدمتونه
                                        </h4>
                                        <ul className="list-disc list-inside text-gray-700">
                                            {shop.services.map(
                                                (service, index) => (
                                                    <li key={index}>
                                                        {service}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={`/tailoring-shop/${shop.id}`}
                                            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded text-center hover:bg-indigo-700 transition"
                                        >
                                            جزئیات وګورئ
                                        </Link>
                                        <button className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
                                            <FaPhone />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {shops.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-600">
                                ستاسو د معیارونو سره سم هیڅ دوکان ونه موندل شو.
                            </p>
                            <button
                                onClick={resetFilters}
                                className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700 transition"
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

export default Shop;

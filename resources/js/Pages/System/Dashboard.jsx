import React from "react";
import { motion } from "framer-motion";
import {
    FaCalendarWeek,
    FaCalendarAlt,
    FaCalendarDay,
    FaChartBar,
    FaTrophy,
    FaChartPie,
    FaDollarSign,
    FaTachometerAlt,
    FaBullhorn,
    FaArrowUp,
    FaArrowDown,
    FaEye,
    FaUsers,
    FaChartLine,
    FaCog,
    FaStar,
} from "react-icons/fa";
import {
    GiClothes,
    GiArmoredPants,
    GiMonclerJacket,
    GiChestArmor,
} from "react-icons/gi";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement,
} from "chart.js";
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";
import SystemLayout from "@/Layouts/SystemLayout";
import { usePage, Link } from "@inertiajs/react";

// Register ChartJS components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title
);

const Dashboard = () => {
    const {
        auth,
        cloths = [],
        uniforms = [],
        kortais = [],
        sadrais = [],
        advertisements = [],
        advertisementStats = {},
        monthlyData = [],
        weeklyData = [],
        growthStats = {},
        recentAds = [],
        userRole,
    } = usePage().props;
    const user = auth.user;

    // Redirect admin users to admin page
    if (user?.role === "admin") {
        window.location.href = "/admin";
        return null;
    }

    // If user is shopkeeper, show modern advertisement analytics dashboard
    if (userRole === "shopkeeper") {
        // Prepare chart data
        const monthlyChartData = {
            labels: monthlyData.map((item) => item.monthPashto),
            datasets: [
                {
                    label: "اعلانات",
                    data: monthlyData.map((item) => item.count),
                    borderColor: "rgb(59, 130, 246)",
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: "rgb(59, 130, 246)",
                    pointBorderColor: "#fff",
                    pointBorderWidth: 2,
                    pointRadius: 6,
                },
            ],
        };

        const weeklyChartData = {
            labels: weeklyData.map((item) => item.weekPashto),
            datasets: [
                {
                    label: "اعلانات",
                    data: weeklyData.map((item) => item.count),
                    backgroundColor: [
                        "rgba(34, 197, 94, 0.8)",
                        "rgba(59, 130, 246, 0.8)",
                        "rgba(249, 115, 22, 0.8)",
                        "rgba(168, 85, 247, 0.8)",
                    ],
                    borderColor: [
                        "rgb(34, 197, 94)",
                        "rgb(59, 130, 246)",
                        "rgb(249, 115, 22)",
                        "rgb(168, 85, 247)",
                    ],
                    borderWidth: 2,
                },
            ],
        };

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        font: {
                            size: 14,
                            weight: "bold",
                        },
                    },
                },
                tooltip: {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    titleColor: "#fff",
                    bodyColor: "#fff",
                    borderColor: "rgba(59, 130, 246, 0.5)",
                    borderWidth: 1,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: "rgba(0, 0, 0, 0.1)",
                    },
                    ticks: {
                        font: {
                            size: 12,
                        },
                    },
                },
                x: {
                    grid: {
                        color: "rgba(0, 0, 0, 0.1)",
                    },
                    ticks: {
                        font: {
                            size: 12,
                        },
                    },
                },
            },
        };

        return (
            <SystemLayout>
                <div className="p-6 bg-gray-50 min-h-screen" dir="rtl">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            د اعلاناتو ډشبورډ
                        </h1>
                        <p className="text-gray-600 text-lg">
                            د خپلو اعلاناتو بشپړ تحلیل او احصائیې
                        </p>
                    </div>

                    {/* Main Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Total Ads */}
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-bold mb-2 opacity-90">
                                        ټول اعلانات
                                    </h3>
                                    <p className="text-4xl font-bold">
                                        {advertisementStats.total || 0}
                                    </p>
                                </div>
                                <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                                    <FaBullhorn className="w-8 h-8" />
                                </div>
                            </div>
                        </div>

                        {/* This Month */}
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-bold mb-2 opacity-90">
                                        د دغه میاشتې
                                    </h3>
                                    <p className="text-4xl font-bold">
                                        {advertisementStats.thisMonth || 0}
                                    </p>
                                    {growthStats.monthlyGrowth !==
                                        undefined && (
                                        <div className="flex items-center mt-2">
                                            {growthStats.monthlyGrowth >= 0 ? (
                                                <FaArrowUp className="w-4 h-4 mr-1" />
                                            ) : (
                                                <FaArrowDown className="w-4 h-4 mr-1" />
                                            )}
                                            <span className="text-sm font-medium">
                                                {Math.abs(
                                                    growthStats.monthlyGrowth
                                                ).toFixed(1)}
                                                %
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                                    <FaCalendarAlt className="w-8 h-8" />
                                </div>
                            </div>
                        </div>

                        {/* This Week */}
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-bold mb-2 opacity-90">
                                        د دغه اونۍ
                                    </h3>
                                    <p className="text-4xl font-bold">
                                        {advertisementStats.thisWeek || 0}
                                    </p>
                                    {growthStats.weeklyGrowth !== undefined && (
                                        <div className="flex items-center mt-2">
                                            {growthStats.weeklyGrowth >= 0 ? (
                                                <FaArrowUp className="w-4 h-4 mr-1" />
                                            ) : (
                                                <FaArrowDown className="w-4 h-4 mr-1" />
                                            )}
                                            <span className="text-sm font-medium">
                                                {Math.abs(
                                                    growthStats.weeklyGrowth
                                                ).toFixed(1)}
                                                %
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                                    <FaCalendarWeek className="w-8 h-8" />
                                </div>
                            </div>
                        </div>

                        {/* Today */}
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-bold mb-2 opacity-90">
                                        نن
                                    </h3>
                                    <p className="text-4xl font-bold">
                                        {advertisementStats.today || 0}
                                    </p>
                                </div>
                                <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                                    <FaCalendarDay className="w-8 h-8" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Monthly Trend Chart */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-800">
                                    میاشتنۍ بهیر
                                </h3>
                                <div className="bg-blue-100 p-3 rounded-xl">
                                    <FaChartLine className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                            <div className="h-80">
                                <Line
                                    data={monthlyChartData}
                                    options={chartOptions}
                                />
                            </div>
                        </div>

                        {/* Weekly Distribution Chart */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-800">
                                    اونیزه ویش
                                </h3>
                                <div className="bg-green-100 p-3 rounded-xl">
                                    <FaChartBar className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                            <div className="h-80">
                                <Bar
                                    data={weeklyChartData}
                                    options={chartOptions}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Recent Advertisements */}
                    <div className="mb-8">
                        {/* Recent Ads */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-800">
                                    وروستي اعلانات
                                </h3>
                                <div className="bg-purple-100 p-3 rounded-xl">
                                    <FaEye className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                {recentAds.length > 0 ? (
                                    recentAds.map((ad) => (
                                        <div
                                            key={ad.id}
                                            className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                                        >
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                                                {ad.image ? (
                                                    <img
                                                        src={ad.image}
                                                        alt={ad.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <FaBullhorn className="w-6 h-6 text-gray-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-800 mb-1">
                                                    {ad.title}
                                                </h4>
                                                <p className="text-gray-600 text-sm line-clamp-1">
                                                    {ad.description}
                                                </p>
                                                <p className="text-gray-400 text-xs mt-1">
                                                    {ad.created_at_human}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <FaBullhorn className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500">
                                            هیڅ اعلان ونه موندل شو
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </SystemLayout>
        );
    }

    // Calculate total money for each category
    const totalClothsMoney = cloths.reduce(
        (acc, item) => acc + Number.parseFloat(item.money || 0),
        0
    );
    const totalSadraiMoney = sadrais.reduce(
        (acc, item) => acc + Number.parseFloat(item.money || 0),
        0
    );
    const totalUniformMoney = uniforms.reduce(
        (acc, item) => acc + Number.parseFloat(item.money || 0),
        0
    );
    const totalKortaiMoney = kortais.reduce(
        (acc, item) => acc + Number.parseFloat(item.money || 0),
        0
    );

    // Calculate total quantity for each category
    const totalClothsTedad = cloths.reduce(
        (acc, item) => acc + Number.parseInt(item.tidad || 0, 10),
        0
    );
    const totalSadraiTedad = sadrais.reduce(
        (acc, item) => acc + Number.parseInt(item.tidad || 0, 10),
        0
    );
    const totalUniformTedad = uniforms.reduce(
        (acc, item) => acc + Number.parseInt(item.tidad || 0, 10),
        0
    );
    const totalKortaiTedad = kortais.reduce(
        (acc, item) => acc + Number.parseInt(item.tidad || 0, 10),
        0
    );

    // Calculate total revenue
    const totalRevenue =
        totalClothsMoney +
        totalUniformMoney +
        totalSadraiMoney +
        totalKortaiMoney;

    // Calculate time-based benefits
    const dailyRevenue = totalRevenue;
    const weeklyRevenue = totalRevenue * 7;
    const monthlyRevenue = totalRevenue * 30;
    const yearlyRevenue = totalRevenue * 365;

    // Create aggregated category data
    const categoryData = [
        {
            name: "جامې",
            value: totalClothsTedad,
            money: totalClothsMoney,
            color: "#f59e0b",
            bgColor: "bg-amber-500",
            icon: GiClothes,
            items: cloths.length,
        },
        {
            name: "درشی",
            value: totalUniformTedad,
            money: totalUniformMoney,
            color: "#10b981",
            bgColor: "bg-emerald-500",
            icon: GiArmoredPants,
            items: uniforms.length,
        },
        {
            name: "صدری",
            value: totalSadraiTedad,
            money: totalSadraiMoney,
            color: "#a855f7",
            bgColor: "bg-purple-500",
            icon: GiChestArmor,
            items: sadrais.length,
        },
        {
            name: "کورتی",
            value: totalKortaiTedad,
            money: totalKortaiMoney,
            color: "#ef4444",
            bgColor: "bg-red-500",
            icon: GiMonclerJacket,
            items: kortais.length,
        },
    ];

    // Sort by quantity (tedad) in descending order
    const categoriesByQuantity = [...categoryData].sort(
        (a, b) => b.value - a.value
    );

    // Sort by money (profit) in descending order
    const categoriesByProfit = [...categoryData].sort(
        (a, b) => b.money - a.money
    );

    // Find the maximum value for scaling
    const maxQuantity = Math.max(...categoryData.map((item) => item.value));
    const maxProfitValue = Math.max(...categoryData.map((item) => item.money));

    // Pie chart data for revenue distribution
    const pieChartData = {
        labels: categoryData.map((item) => item.name),
        datasets: [
            {
                data: categoryData.map((item) => item.money),
                backgroundColor: categoryData.map((item) => item.color),
                borderColor: categoryData.map((item) => item.color),
                borderWidth: 1,
            },
        ],
    };

    // Bar chart data for quantity comparison
    const barChartData = {
        labels: categoryData.map((item) => item.name),
        datasets: [
            {
                label: "تعداد",
                data: categoryData.map((item) => item.value),
                backgroundColor: categoryData.map((item) => item.color),
                borderColor: categoryData.map((item) => item.color),
                borderWidth: 1,
            },
        ],
    };

    // Function to format numbers with commas
    const formatNumber = (num) => {
        return num.toLocaleString();
    };

    // Calculate overall statistics
    const totalOrders =
        cloths.length + uniforms.length + kortais.length + sadrais.length;
    const completedOrders = [
        ...cloths,
        ...uniforms,
        ...kortais,
        ...sadrais,
    ].filter(
        (item) => item.tasleem_tareekh !== null && item.tasleem_tareekh !== ""
    ).length;
    const pendingOrders = totalOrders - completedOrders;
    const totalQuantity =
        totalClothsTedad +
        totalUniformTedad +
        totalKortaiTedad +
        totalSadraiTedad;

    return (
        <SystemLayout>
            <div
                className="p-6 bg-gradient-to-br from-gray-50 to-primary-25 min-h-screen"
                dir="rtl"
            >
                {/* Modern Header */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 text-white shadow-2xl">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center gap-4 mb-4 md:mb-0">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                    <FaTachometerAlt className="text-white text-2xl" />
                                </div>
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold font-zar mb-2">
                                        ډشبورډ
                                    </h1>
                                    <p className="text-white/80 text-lg font-zar">
                                        د خپل کاروبار بشپړ لید
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                                    <span className="text-white font-zar font-semibold">
                                        ښه راغلاست، {user?.name}
                                    </span>
                                </div>
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                    <FaStar className="text-yellow-300 text-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Overall Statistics */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <motion.div
                        className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-zar font-bold mb-1 opacity-90">
                                    ټول آرډرونه
                                </h3>
                                <p className="text-3xl font-zar font-bold">
                                    {formatNumber(totalOrders)}
                                </p>
                                <div className="flex items-center mt-2">
                                    <FaArrowUp className="w-4 h-4 mr-1 text-green-300" />
                                    <span className="text-sm font-medium text-green-300">
                                        فعال
                                    </span>
                                </div>
                            </div>
                            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                                <FaChartBar className="w-8 h-8" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-zar font-bold mb-1 opacity-90">
                                    بشپړ شوي
                                </h3>
                                <p className="text-3xl font-zar font-bold">
                                    {formatNumber(completedOrders)}
                                </p>
                                <div className="flex items-center mt-2">
                                    <FaTrophy className="w-4 h-4 mr-1 text-yellow-300" />
                                    <span className="text-sm font-medium text-green-200">
                                        {totalOrders > 0
                                            ? (
                                                  (completedOrders /
                                                      totalOrders) *
                                                  100
                                              ).toFixed(1)
                                            : 0}
                                        %
                                    </span>
                                </div>
                            </div>
                            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                                <FaTrophy className="w-8 h-8" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-zar font-bold mb-1 opacity-90">
                                    پاتې دي
                                </h3>
                                <p className="text-3xl font-zar font-bold">
                                    {formatNumber(pendingOrders)}
                                </p>
                                <div className="flex items-center mt-2">
                                    <FaCalendarAlt className="w-4 h-4 mr-1 text-orange-200" />
                                    <span className="text-sm font-medium text-orange-200">
                                        په انتظار کې
                                    </span>
                                </div>
                            </div>
                            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                                <FaCalendarAlt className="w-8 h-8" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-zar font-bold mb-1 opacity-90">
                                    ټول تعداد
                                </h3>
                                <p className="text-3xl font-zar font-bold">
                                    {formatNumber(totalQuantity)}
                                </p>
                                <div className="flex items-center mt-2">
                                    <FaChartPie className="w-4 h-4 mr-1 text-purple-200" />
                                    <span className="text-sm font-medium text-purple-200">
                                        ټولې توکي
                                    </span>
                                </div>
                            </div>
                            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                                <FaChartPie className="w-8 h-8" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Category Stats */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {categoryData.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <motion.div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-primary-100 overflow-hidden group"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                whileHover={{ scale: 1.02, y: -8 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div
                                    className={`${category.bgColor} p-6 flex justify-between items-center relative overflow-hidden`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
                                    <div className="text-white relative z-10">
                                        <h2 className="text-2xl font-bold font-zar mb-1">
                                            {category.name}
                                        </h2>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                                            <span className="text-white/80 text-sm font-zar">
                                                کټګورۍ
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-white bg-white/20 p-4 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-8 h-8" />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-primary-25 to-secondary-25 rounded-xl">
                                            <span className="text-gray-700 font-zar font-semibold">
                                                جمله عاید:
                                            </span>
                                            <span className="text-primary-700 font-zar font-bold text-lg">
                                                {formatNumber(category.money)}{" "}
                                                افغانۍ
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                                            <span className="text-gray-700 font-zar font-semibold">
                                                تعداد:
                                            </span>
                                            <span className="text-gray-800 font-zar font-bold text-lg">
                                                {formatNumber(category.value)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                                            <span className="text-gray-700 font-zar font-semibold">
                                                آرډرونه:
                                            </span>
                                            <span className="text-gray-800 font-zar font-bold text-lg">
                                                {formatNumber(category.items)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Total Revenue Card */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <motion.div
                        className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-2xl overflow-hidden"
                        whileHover={{ scale: 1.01, y: -5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-8 flex flex-col md:flex-row justify-between items-center">
                            <div className="text-white mb-6 md:mb-0">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                        <FaDollarSign className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-bold font-zar mb-1">
                                            مجموعي ټول عاید
                                        </h2>
                                        <p className="text-green-100 text-lg font-zar">
                                            د ټولو کټګوریو څخه
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                                    <div className="flex items-center gap-3">
                                        <FaArrowUp className="w-8 h-8 text-green-200" />
                                        <div>
                                            <span className="font-zar font-bold text-4xl text-white block">
                                                {formatNumber(totalRevenue)}
                                            </span>
                                            <span className="text-green-100 font-zar font-bold text-xl">
                                                افغانۍ
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                                    <FaChartLine className="w-8 h-8 text-white mx-auto mb-2" />
                                    <div className="text-white font-zar font-bold text-sm">
                                        د نن ورځې عاید
                                    </div>
                                    <div className="text-white font-zar font-bold text-lg">
                                        {formatNumber(totalRevenue)}
                                    </div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                                    <FaStar className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                                    <div className="text-white font-zar font-bold text-sm">
                                        د کټګوریو شمیر
                                    </div>
                                    <div className="text-white font-zar font-bold text-lg">
                                        {categoryData.length}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Completion Rate Section */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="bg-white rounded-3xl shadow-2xl border border-primary-100 overflow-hidden">
                        <div className="p-6 bg-gradient-to-r from-primary-600 to-secondary-600 flex justify-between items-center">
                            <div className="text-white">
                                <h2 className="text-3xl font-bold font-zar mb-2">
                                    د بشپړولو کچه
                                </h2>
                                <p className="text-white/80 font-zar">
                                    د هرې کټګورۍ د بشپړولو فیصدي
                                </p>
                            </div>
                            <div className="text-white bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                                <FaTrophy className="w-8 h-8" />
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {categoryData.map((category, index) => {
                                    let categoryItems = [];
                                    if (index === 0) categoryItems = cloths;
                                    else if (index === 1)
                                        categoryItems = uniforms;
                                    else if (index === 2)
                                        categoryItems = sadrais;
                                    else if (index === 3)
                                        categoryItems = kortais;

                                    const completedItems = categoryItems.filter(
                                        (item) =>
                                            item.tasleem_tareekh !== null &&
                                            item.tasleem_tareekh !== ""
                                    ).length;

                                    const completionRate =
                                        category.items > 0
                                            ? (completedItems /
                                                  category.items) *
                                              100
                                            : 0;

                                    return (
                                        <motion.div
                                            key={index}
                                            className="text-center"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: index * 0.1,
                                            }}
                                        >
                                            <div className="mb-6">
                                                <motion.div
                                                    className={`w-20 h-20 mx-auto rounded-2xl ${category.bgColor} flex items-center justify-center mb-4 shadow-lg`}
                                                    whileHover={{
                                                        scale: 1.1,
                                                        rotate: 5,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                    }}
                                                >
                                                    <category.icon className="w-10 h-10 text-white" />
                                                </motion.div>
                                                <h3 className="font-zar font-bold text-xl text-gray-800 mb-2">
                                                    {category.name}
                                                </h3>
                                                <div className="text-sm text-gray-600 font-zar">
                                                    {completedItems} /{" "}
                                                    {category.items} بشپړ شوي
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                                                    <motion.div
                                                        className="h-4 rounded-full"
                                                        style={{
                                                            backgroundColor:
                                                                category.color,
                                                        }}
                                                        initial={{ width: 0 }}
                                                        animate={{
                                                            width: `${completionRate}%`,
                                                        }}
                                                        transition={{
                                                            duration: 1,
                                                            delay: index * 0.2,
                                                        }}
                                                    ></motion.div>
                                                </div>
                                                <motion.p
                                                    className="font-zar font-bold text-2xl"
                                                    style={{
                                                        color: category.color,
                                                    }}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay:
                                                            index * 0.2 + 0.5,
                                                    }}
                                                >
                                                    {completionRate.toFixed(1)}%
                                                </motion.p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Time-based Revenue Section */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <motion.div
                            className="bg-white rounded-2xl shadow-lg border border-primary-100 hover:shadow-2xl transition-all duration-300 p-6 group"
                            whileHover={{ scale: 1.02, y: -5 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <FaCalendarDay className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <p className="text-lg font-zar text-gray-600 mb-1 font-semibold">
                                        ورځنی عاید
                                    </p>
                                    <p className="text-2xl font-zar text-gray-800 font-bold">
                                        {formatNumber(dailyRevenue)}
                                    </p>
                                    <p className="text-sm font-zar text-blue-600 font-medium">
                                        افغانۍ
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-white rounded-2xl shadow-lg border border-primary-100 hover:shadow-2xl transition-all duration-300 p-6 group"
                            whileHover={{ scale: 1.02, y: -5 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <FaCalendarWeek className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <p className="text-lg font-zar text-gray-600 mb-1 font-semibold">
                                        هفتنی عاید
                                    </p>
                                    <p className="text-2xl font-zar text-gray-800 font-bold">
                                        {formatNumber(weeklyRevenue)}
                                    </p>
                                    <p className="text-sm font-zar text-indigo-600 font-medium">
                                        افغانۍ
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-white rounded-2xl shadow-lg border border-primary-100 hover:shadow-2xl transition-all duration-300 p-6 group"
                            whileHover={{ scale: 1.02, y: -5 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <FaCalendarAlt className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <p className="text-lg font-zar text-gray-600 mb-1 font-semibold">
                                        میاشتنۍ عاید
                                    </p>
                                    <p className="text-2xl font-zar text-gray-800 font-bold">
                                        {formatNumber(monthlyRevenue)}
                                    </p>
                                    <p className="text-sm font-zar text-purple-600 font-medium">
                                        افغانۍ
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-white rounded-2xl shadow-lg border border-primary-100 hover:shadow-2xl transition-all duration-300 p-6 group"
                            whileHover={{ scale: 1.02, y: -5 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <FaCalendarAlt className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <p className="text-lg font-zar text-gray-600 mb-1 font-semibold">
                                        کلنۍ عاید
                                    </p>
                                    <p className="text-2xl font-zar text-gray-800 font-bold">
                                        {formatNumber(yearlyRevenue)}
                                    </p>
                                    <p className="text-sm font-zar text-green-600 font-medium">
                                        افغانۍ
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Quick Access Section for Tailors */}
                {userRole === "tailor" && (
                    <div className="mb-8">
                        <div className="bg-white rounded-2xl border border-primary-200 hover:shadow-xl transition-all duration-300 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 font-zar mb-2">
                                        ګړندی لاسرسی
                                    </h2>
                                    <p className="text-gray-600 font-zar">
                                        ستاسو د کار تنظیمات او ظرفیت کنټرول
                                    </p>
                                </div>
                                <div className="bg-primary-100 p-4 rounded-xl">
                                    <FaCog className="h-8 w-8 text-primary-600" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Link
                                    href="/settings"
                                    className="group bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-xl p-6 hover:from-primary-100 hover:to-secondary-100 transition-all duration-300 hover:shadow-lg"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <FaCog className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800 font-zar mb-1">
                                                د فرمایشونو حد تنظیم کړئ
                                            </h3>
                                            <p className="text-sm text-gray-600 font-zar">
                                                د خپل د کار د ظرفیت له مخې د
                                                اونۍ حد وټاکئ
                                            </p>
                                        </div>
                                    </div>
                                </Link>

                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                            <FaCalendarWeek className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800 font-zar mb-1">
                                                اوسنی حد:{" "}
                                                {user.weekly_order_limit || 5}
                                            </h3>
                                            <p className="text-sm text-gray-600 font-zar">
                                                د دغه اونۍ فرمایشونه
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Pie Chart - Revenue Distribution */}
                    <div className="bg-white rounded-2xl border border-primary-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 flex justify-between items-center">
                            <div className="text-white">
                                <h2 className="text-3xl font-bold font-zar">
                                    د عاید وېش د خیاطي ډول پر اساس
                                </h2>
                            </div>
                            <div className="text-white bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                <FaChartPie className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="p-6" style={{ height: "300px" }}>
                            <Pie
                                data={pieChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: "bottom",
                                            labels: {
                                                padding: 20,
                                                font: {
                                                    size: 12,
                                                },
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>

                    {/* Bar Chart - Quantity Comparison */}
                    <div className="bg-white rounded-2xl border border-primary-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="p-4 bg-gradient-to-r from-indigo-600 to-blue-600 flex justify-between items-center">
                            <div className="text-white">
                                <h2 className="text-3xl font-bold font-zar">
                                    د توکو تعداد مقایسه
                                </h2>
                            </div>
                            <div className="text-white bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                <FaChartBar className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="p-6" style={{ height: "300px" }}>
                            <Bar
                                data={barChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            grid: {
                                                color: "rgba(0, 0, 0, 0.1)",
                                            },
                                        },
                                        x: {
                                            grid: {
                                                display: false,
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Most Profitable Categories */}
                <div className="mb-8">
                    <div className="bg-white rounded-2xl border border-primary-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 flex justify-between items-center">
                            <div className="text-white">
                                <h2 className="text-3xl font-bold font-zar">
                                    ترټولو ډېره ګټه لرونکي کټګورۍ
                                </h2>
                            </div>
                            <div className="text-white bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                <FaTrophy className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="p-6">
                            {categoriesByProfit.map((category, index) => {
                                const Icon = category.icon;
                                const percentage =
                                    maxProfitValue === 0
                                        ? 0
                                        : (category.money / maxProfitValue) *
                                          100;
                                return (
                                    <div
                                        key={index}
                                        className="bg-gray-50 rounded-xl border border-primary-200 p-5 mb-4 hover:shadow-md transition-all duration-300 last:mb-0"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <div className="flex items-center mb-4 md:mb-0">
                                                <div
                                                    className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                                                        index === 0
                                                            ? "bg-yellow-100"
                                                            : index === 1
                                                            ? "bg-gray-200"
                                                            : index === 2
                                                            ? "bg-amber-100"
                                                            : "bg-gray-100"
                                                    }`}
                                                >
                                                    <span
                                                        className={`font-zar font-bold text-xl ${
                                                            index === 0
                                                                ? "text-yellow-600"
                                                                : index === 1
                                                                ? "text-gray-600"
                                                                : index === 2
                                                                ? "text-amber-600"
                                                                : "text-gray-500"
                                                        }`}
                                                    >
                                                        {index + 1}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <div
                                                        className="w-10 h-10 rounded-xl flex items-center justify-center mr-3"
                                                        style={{
                                                            backgroundColor:
                                                                category.color +
                                                                "20",
                                                        }}
                                                    >
                                                        <Icon
                                                            className="w-5 h-5"
                                                            style={{
                                                                color: category.color,
                                                            }}
                                                        />
                                                    </div>
                                                    <h3 className="text-2xl font-zar font-bold text-gray-800 ">
                                                        {category.name}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-6 md:ml-auto">
                                                <div className="text-center">
                                                    <div className="font-zar font-bold text-gray-500 mb-1">
                                                        تعداد
                                                    </div>
                                                    <div className="font-zar font-bold text-gray-800">
                                                        {formatNumber(
                                                            category.value
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="font-zar font-bold text-gray-500 mb-1">
                                                        ټوله ګټه
                                                    </div>
                                                    <div className="font-zar font-bold text-gray-800">
                                                        {formatNumber(
                                                            category.money
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className="h-2.5 rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${percentage}%`,
                                                        backgroundColor:
                                                            category.color,
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <span className="font-zar font-bold text-xl text-gray-500">
                                                    اوسط ګټه:
                                                    {formatNumber(
                                                        category.value === 0
                                                            ? 0
                                                            : (
                                                                  category.money /
                                                                  category.value
                                                              ).toFixed(0)
                                                    )}{" "}
                                                    افغانۍ
                                                </span>
                                                <span
                                                    className="font-zar font-bold text-xl"
                                                    style={{
                                                        color: category.color,
                                                    }}
                                                >
                                                    {percentage.toFixed(0)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </SystemLayout>
    );
};

export default Dashboard;

import React from "react";
import {
    FaCalendarWeek,
    FaCalendarAlt,
    FaCalendarDay,
    FaChartBar,
    FaTrophy,
    FaChartPie,
    FaDollarSign,
} from "react-icons/fa";
import {
    GiClothes,
    GiArmoredPants,
    GiMonclerJacket,
    GiChestArmor,
} from "react-icons/gi";
import { useCloths } from "@/Contexts/ClothsContext";
import { useUniform } from "@/Contexts/UniformContext";
import { useKortai } from "@/Contexts/KortaiContext";
import { useSadrai } from "@/Contexts/SadraiContext";
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
import { Pie, Bar } from "react-chartjs-2";
import SystemLayout from "@/Layouts/SystemLayout";
import { usePage } from "@inertiajs/react";

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
    const { auth } = usePage().props;
    const user = auth.user;

    // Redirect admin users to admin page
    if (user?.role === "admin") {
        window.location.href = "/admin";
        return null;
    }

    const { cloths } = useCloths();
    const { uniform } = useUniform();
    const { kortai } = useKortai();
    const { sadrai } = useSadrai();

    // Calculate total money for each category
    const totalClothsMoney = cloths.reduce(
        (acc, item) => acc + Number.parseFloat(item.money || 0),
        0
    );
    const totalKortaiMoney = kortai.reduce(
        (acc, item) => acc + Number.parseFloat(item.money || 0),
        0
    );
    const totalSadraiMoney = sadrai.reduce(
        (acc, item) => acc + Number.parseFloat(item.money || 0),
        0
    );
    const totalUniformMoney = uniform.reduce(
        (acc, item) => acc + Number.parseFloat(item.money || 0),
        0
    );

    // Calculate total quantity for each category
    const totalClothsTedad = cloths.reduce(
        (acc, item) => acc + Number.parseInt(item.tidad || 0, 10),
        0
    );
    const totalSadraiTedad = sadrai.reduce(
        (acc, item) => acc + Number.parseInt(item.tidad || 0, 10),
        0
    );
    const totalKortaiTedad = kortai.reduce(
        (acc, item) => acc + Number.parseInt(item.tidad || 0, 10),
        0
    );
    const totalUniformTedad = uniform.reduce(
        (acc, item) => acc + Number.parseInt(item.tidad || 0, 10),
        0
    );

    // Calculate total revenue
    const totalRevenue =
        totalClothsMoney +
        totalUniformMoney +
        totalKortaiMoney +
        totalSadraiMoney;

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
            items: uniform.length,
        },
        {
            name: "کورتی",
            value: totalKortaiTedad,
            money: totalKortaiMoney,
            color: "#f43f5e",
            bgColor: "bg-rose-500",
            icon: GiMonclerJacket,
            items: kortai.length,
        },
        {
            name: "صدری",
            value: totalSadraiTedad,
            money: totalSadraiMoney,
            color: "#a855f7",
            bgColor: "bg-purple-500",
            icon: GiChestArmor,
            items: sadrai.length,
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

    return (
        <SystemLayout>
            <div className="p-6" dir="rtl">
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {categoryData.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl  hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] border border-primary-200 overflow-hidden group"
                            >
                                <div
                                    className={`${category.bgColor} p-4 flex justify-between items-center relative overflow-hidden`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
                                    <div className="text-white relative z-10">
                                        <h2 className="text-3xl font-bold font-zar">
                                            {category.name}
                                        </h2>
                                    </div>
                                    <div className="text-white bg-white/20 p-3 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-gray-600 font-zar font-bold text-xl">
                                            جمله عاید:
                                        </span>
                                        <span className=" text-gray-800 font-zar font-bold text-xl">
                                            {formatNumber(category.money)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Total Revenue Card */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl transition-all duration-300 overflow-hidden">
                        <div className="p-6 flex justify-between items-center">
                            <div className="text-white">
                                <h2 className="text-3xl font-bold font-zar mb-1">
                                    مجموعي ټول عاید
                                </h2>
                                <p className="text-green-100 text-xl font-zar md:text-2xl">
                                    د ټولو کټګوریو څخه
                                </p>
                            </div>
                            <div className="text-white bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                                <FaDollarSign className="w-8 h-8" />
                            </div>
                        </div>
                        <div className="p-6 bg-white/10 backdrop-blur-sm">
                            <span className="font-zar font-bold text-xl text-white">
                                {formatNumber(totalRevenue)}
                            </span>
                            <span className="text-green-100 ml-2 font-zar font-bold text-xl">
                                افغانۍ
                            </span>
                        </div>
                    </div>
                </div>

                {/* Time-based Revenue Section */}
                <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white rounded-2xl border border-primary-200 hover:shadow-xl transition-all duration-300 p-6 flex items-center space-x-4 rtl:space-x-reverse group">
                            <div className="bg-blue-100 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <FaCalendarDay className="h-7 w-7 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xl font-zar md:text-2xl text-gray-500 mb-1">
                                    ورځنی عاید
                                </p>
                                <p className="text-xl font-zar md:text-2xl text-gray-800">
                                    {formatNumber(dailyRevenue)}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-primary-200 hover:shadow-xl transition-all duration-300 p-6 flex items-center space-x-4 rtl:space-x-reverse group">
                            <div className="bg-indigo-100 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <FaCalendarWeek className="h-7 w-7 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-xl font-zar md:text-2xl text-gray-500 mb-1">
                                    هفتنی عاید
                                </p>
                                <p className="text-xl font-zar md:text-2xl text-gray-800">
                                    {formatNumber(weeklyRevenue)}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-primary-200 hover:shadow-xl transition-all duration-300 p-6 flex items-center space-x-4 rtl:space-x-reverse group">
                            <div className="bg-purple-100 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <FaCalendarAlt className="h-7 w-7 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-xl font-zar md:text-2xl text-gray-500 mb-1">
                                    میاشتنۍ عاید
                                </p>
                                <p className="text-xl font-zar md:text-2xl text-gray-800">
                                    {formatNumber(monthlyRevenue)}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-primary-200 hover:shadow-xl transition-all duration-300 p-6 flex items-center space-x-4 rtl:space-x-reverse group">
                            <div className="bg-green-100 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <FaCalendarAlt className="h-7 w-7 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xl font-zar md:text-2xl text-gray-500 mb-1">
                                    کلنۍ عاید
                                </p>
                                <p className="text-xl font-zar md:text-2xl text-gray-800">
                                    {formatNumber(yearlyRevenue)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

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
                                    maxProfitValue === 0 ? 0 : (category.money / maxProfitValue) * 100;
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
                                                        category.value === 0 ? 0 : (category.money / category.value).toFixed(0)
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

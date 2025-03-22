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
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
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

export default function Dashboard() {
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
        <AuthenticatedLayout>
            <div className="p-4 md:p-6 bg-gray-50">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    خیاطي مدیریت سیستم
                </h1>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {categoryData.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                            >
                                <div
                                    className={`${category.bgColor} p-3 flex justify-between items-center`}
                                >
                                    <div className="text-white">
                                        <h2 className="text-lg font-semibold">
                                            {category.name}
                                        </h2>
                                    </div>
                                    <div className="text-white bg-white/20 p-2 rounded-lg">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 text-sm">
                                            جمله عاید:
                                        </span>
                                        <span className="font-bold text-gray-800">
                                            {formatNumber(category.money)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-gray-600 text-sm">
                                            تعداد:
                                        </span>
                                        <span className="font-bold text-gray-800">
                                            {formatNumber(category.value)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Total Revenue Card */}
                <div className="mb-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
                        <div className="bg-green-600 p-4 flex justify-between items-center">
                            <div className="text-white">
                                <h2 className="text-lg font-semibold">
                                    مجموعي ټول عاید
                                </h2>
                            </div>
                            <div className="text-white bg-white/20 p-3 rounded-lg">
                                <FaDollarSign className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="p-6 text-center">
                            <span className="text-3xl font-bold text-gray-800">
                                {formatNumber(totalRevenue)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Time-based Revenue Section */}
                <div className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <FaCalendarDay className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    ورځنی عاید
                                </p>
                                <p className="text-xl font-bold text-gray-800">
                                    {formatNumber(dailyRevenue)}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <FaCalendarWeek className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    هفتنی عاید
                                </p>
                                <p className="text-xl font-bold text-gray-800">
                                    {formatNumber(weeklyRevenue)}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="bg-purple-100 p-3 rounded-full">
                                <FaCalendarAlt className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    میاشتنۍ عاید
                                </p>
                                <p className="text-xl font-bold text-gray-800">
                                    {formatNumber(monthlyRevenue)}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="bg-green-100 p-3 rounded-full">
                                <FaCalendarAlt className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    کلنۍ عاید
                                </p>
                                <p className="text-xl font-bold text-gray-800">
                                    {formatNumber(yearlyRevenue)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Pie Chart - Revenue Distribution */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 bg-purple-600 flex justify-between items-center">
                            <div className="text-purple-50">
                                <h2 className="text-lg font-semibold">
                                    د عاید وېش د خیاطي ډول پر اساس
                                </h2>
                            </div>
                            <div className="text-purple-50 bg-white/20 p-3 rounded-lg">
                                <FaChartPie className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="p-4" style={{ height: "300px" }}>
                            <Pie
                                data={pieChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: "bottom",
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>

                    {/* Bar Chart - Quantity Comparison */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 bg-indigo-500 flex justify-between items-center">
                            <div className="text-indigo-50">
                                <h2 className="text-lg font-semibold">
                                    د توکو تعداد مقایسه
                                </h2>
                            </div>
                            <div className="text-indigo-50 bg-white/20 p-3 rounded-lg">
                                <FaChartBar className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="p-4" style={{ height: "300px" }}>
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
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Most Profitable Categories */}
                <div className="mb-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 bg-green-600 flex justify-between items-center">
                            <div className="text-green-50">
                                <h2 className="text-lg font-semibold">
                                    ترټوډېره ګټه لرونکي کټګورۍ
                                </h2>
                            </div>
                            <div className="text-green-50 bg-white/20 p-3 rounded-lg">
                                <FaTrophy className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="p-4">
                            {categoriesByProfit.map((category, index) => {
                                const Icon = category.icon;
                                const percentage =
                                    (category.money / maxProfitValue) * 100;
                                return (
                                    <div
                                        key={index}
                                        className="bg-gray-50 rounded-lg p-4 mb-3 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <div className="flex items-center mb-3 md:mb-0">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
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
                                                        className={`text-lg font-bold ${
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
                                                        className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                                                        style={{
                                                            backgroundColor:
                                                                category.color +
                                                                "20",
                                                        }}
                                                    >
                                                        <Icon
                                                            className="w-4 h-4"
                                                            style={{
                                                                color: category.color,
                                                            }}
                                                        />
                                                    </div>
                                                    <h3 className="font-medium text-gray-800">
                                                        {category.name}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-4 md:ml-auto">
                                                <div className="text-center">
                                                    <div className="text-xs text-gray-500">
                                                        تعداد
                                                    </div>
                                                    <div className="font-medium">
                                                        {formatNumber(
                                                            category.value
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-xs text-gray-500">
                                                        ټوله ګټه
                                                    </div>
                                                    <div className="font-bold text-gray-800">
                                                        {formatNumber(
                                                            category.money
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="h-2 rounded-full"
                                                    style={{
                                                        width: `${percentage}%`,
                                                        backgroundColor:
                                                            category.color,
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between mt-1">
                                                <span className="text-xs text-gray-500">
                                                    اوسط ګټه:
                                                    {formatNumber(
                                                        (
                                                            category.money /
                                                            (category.value ||
                                                                1)
                                                        ).toFixed(0)
                                                    )}{" "}
                                                    افغانۍ
                                                </span>
                                                <span className="text-xs text-gray-500">
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
        </AuthenticatedLayout>
    );
}

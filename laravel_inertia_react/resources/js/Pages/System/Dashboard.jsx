import {
    FaCalendarWeek,
    FaCalendarAlt,
    FaCalendarDay,
    FaChartBar,
    FaTrophy,
    FaMoneyBillWave,
    FaChartPie,
    FaChartLine,
    FaStar,
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
import { useEffect, useRef, useState } from "react";
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
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
);

export default function Dashboard() {
    const { cloths } = useCloths();
    const { uniform } = useUniform();
    const { kortai } = useKortai();
    const { sadrai } = useSadrai();
    const chartRef = useRef(null);
    const [activeTimeFrame, setActiveTimeFrame] = useState("daily");

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
    const totalbenifit =
        totalClothsMoney +
        totalUniformMoney +
        totalKortaiMoney +
        totalSadraiMoney;

    // Calculate time-based benefits
    const dailyBenefit = totalbenifit;
    const weeklyBenefit = totalbenifit * 7;
    const monthlyBenefit = totalbenifit * 30;
    const yearlyBenefit = totalbenifit * 365;

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

    // Sort by quantity (tidad) in descending order
    const categoriesByQuantity = [...categoryData].sort(
        (a, b) => b.value - a.value
    );

    // Sort by money (profit) in descending order
    const categoriesByProfit = [...categoryData].sort(
        (a, b) => b.money - a.money
    );

    // Find the maximum value for scaling
    const maxQuantity = Math.max(...categoryData.map((item) => item.value));

    // Find the maximum profit value for scaling
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

    // Mock monthly data for line chart
    // In a real app, you would calculate this from your actual data
    const months = [
        "جنوری",
        "فبروری",
        "مارچ",
        "اپریل",
        "می",
        "جون",
        "جولای",
        "اګست",
        "سپتمبر",
        "اکتوبر",
        "نومبر",
        "دسمبر",
    ];

    // Generate some sample monthly data
    const generateMonthlyData = () => {
        const baseValue = totalbenifit / 12;
        return months.map((_, index) => {
            // Create some variation in the data
            const randomFactor = 0.5 + Math.random();
            return baseValue * randomFactor;
        });
    };

    const monthlyData = generateMonthlyData();

    // Find the most profitable month
    const mostProfitableMonthIndex = monthlyData.indexOf(
        Math.max(...monthlyData)
    );
    const mostProfitableMonth = months[mostProfitableMonthIndex];
    const mostProfitableMonthValue = monthlyData[mostProfitableMonthIndex];

    // Line chart data for monthly revenue
    const lineChartData = {
        labels: months,
        datasets: [
            {
                label: "میاشتنی عاید",
                data: monthlyData,
                fill: false,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.4,
            },
        ],
    };

    // Line chart options
    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "د میاشتني عاید بدلون",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // Draw the bar chart when component mounts or data changes
    useEffect(() => {
        if (chartRef.current && categoriesByQuantity.length > 0) {
            const ctx = chartRef.current.getContext("2d");
            const width = chartRef.current.width;
            const height = chartRef.current.height;
            const barWidth = 40;
            const spacing = 30;
            const startX = 60;
            const startY = height - 40;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Draw axes
            ctx.beginPath();
            ctx.strokeStyle = "#94a3b8";
            ctx.lineWidth = 2;
            ctx.moveTo(40, 20);
            ctx.lineTo(40, startY);
            ctx.lineTo(width - 20, startY);
            ctx.stroke();

            // Draw bars and labels
            categoriesByQuantity.forEach((item, index) => {
                const x = startX + index * (barWidth + spacing);
                const barHeight = (item.value / maxQuantity) * (startY - 60);

                // Draw bar
                ctx.fillStyle = item.color;
                ctx.fillRect(x, startY - barHeight, barWidth, barHeight);

                // Draw value on top of bar
                ctx.fillStyle = "#1e293b";
                ctx.font = "12px Arial";
                ctx.textAlign = "center";
                ctx.fillText(
                    item.value,
                    x + barWidth / 2,
                    startY - barHeight - 10
                );

                // Draw category name below x-axis
                ctx.fillStyle = "#64748b";
                ctx.font = "14px Arial";
                ctx.textAlign = "center";
                ctx.fillText(item.name, x + barWidth / 2, startY + 20);
            });
        }
    }, [categoriesByQuantity, chartRef]);

    // Function to handle time frame selection
    const handleTimeFrameChange = (timeFrame) => {
        setActiveTimeFrame(timeFrame);
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">خیاطي مدیریت سیستم</h1>

                {/* Category Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categoryData.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
                            >
                                <div
                                    className={`${category.bgColor} p-2 flex justify-between items-center`}
                                >
                                    <div className="text-white">
                                        <h2 className="text-lg font-semibold">
                                            {category.name}
                                        </h2>
                                    </div>
                                    <div className="text-white bg-white/20 p-1 rounded-lg">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50">
                                    <div className="flex items-center text-gray-600">
                                        <span className="font-semibold text-sm">
                                            جمله عاید:
                                        </span>
                                        <span className="ml-2 font-semibold text-sm">
                                            {category.money}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Total Revenue Card */}
                <div className="my-10">
                    <div className="bg-white rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
                        <div className="bg-green-600 p-4 flex justify-between items-center">
                            <div className="text-indigo-50">
                                <h2 className="text-lg font-semibold">
                                    مجموعي ټول عاید
                                </h2>
                            </div>
                            <div className="text-indigo-50 bg-white/20 p-3 rounded-lg">
                                <FaDollarSign className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50">
                            <div className="flex items-center text-gray-600">
                                <span className="ml-2 font-medium text-xl">
                                    {totalbenifit}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Time-based Revenue Section */}
                <div className="my-10">
                    <h2 className="text-xl font-bold text-primary-900 mb-4">
                        ورځنی، میاشتنی، او کلنی عاید
                    </h2>
                    <div className="bg-white rounded-xl border overflow-hidden">
                        <div className="p-4 bg-blue-500 flex justify-between items-center">
                            <div className="text-blue-50">
                                <h2 className="text-lg font-semibold">
                                    د وخت پر اساس عاید
                                </h2>
                            </div>
                            <div className="flex  gap-3">
                                <button
                                    className={`px-3 font-semibold py-2 rounded-md text-sm ${
                                        activeTimeFrame === "daily"
                                            ? "bg-white text-blue-600"
                                            : "bg-blue-700 text-white"
                                    }`}
                                    onClick={() =>
                                        handleTimeFrameChange("daily")
                                    }
                                >
                                    ورځنی
                                </button>
                                <button
                                    className={`px-3 font-semibold py-2 rounded-md text-sm ${
                                        activeTimeFrame === "weekly"
                                            ? "bg-white text-blue-600"
                                            : "bg-blue-700 text-white"
                                    }`}
                                    onClick={() =>
                                        handleTimeFrameChange("weekly")
                                    }
                                >
                                    اونیز
                                </button>
                                <button
                                    className={`px-3 font-semibold py-2 rounded-md text-sm ${
                                        activeTimeFrame === "monthly"
                                            ? "bg-white text-blue-600"
                                            : "bg-blue-700 text-white"
                                    }`}
                                    onClick={() =>
                                        handleTimeFrameChange("monthly")
                                    }
                                >
                                    میاشتنی
                                </button>
                                <button
                                    className={`px-3 font-semibold py-2 rounded-md text-sm ${
                                        activeTimeFrame === "yearly"
                                            ? "bg-white text-blue-600"
                                            : "bg-blue-700 text-white"
                                    }`}
                                    onClick={() =>
                                        handleTimeFrameChange("yearly")
                                    }
                                >
                                    کلنی
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse">
                            <div className="p-6 flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <FaCalendarDay className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        ورځنی عاید
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {dailyBenefit.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <FaCalendarAlt className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        میاشتنۍ عاید
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {monthlyBenefit.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <FaCalendarWeek className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        کلنۍ عاید
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {yearlyBenefit.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-2.5 rounded-full"
                                    style={{
                                        width:
                                            activeTimeFrame === "daily"
                                                ? "33%"
                                                : activeTimeFrame === "weekly"
                                                ? "66%"
                                                : activeTimeFrame === "monthly"
                                                ? "85%"
                                                : "100%",
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Most Profitable Month */}
                <div className="my-10">
                    <div className="bg-white rounded-xl border overflow-hidden">
                        <div className="p-4 bg-yellow-500 flex justify-between items-center">
                            <div className="text-yellow-50">
                                <h2 className="text-lg font-semibold">
                                    تر ټولو ګټوره میاشت
                                </h2>
                            </div>
                            <div className="text-yellow-50 bg-white/20 p-3 rounded-lg">
                                <FaStar className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="p-6 flex flex-col md:flex-row items-center justify-between">
                            <div className="flex items-center mb-4 md:mb-0">
                                <div className="bg-yellow-100 p-4 rounded-full">
                                    <FaCalendarAlt className="h-8 w-8 text-yellow-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-gray-500">
                                        میاشت
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {mostProfitableMonth}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-green-100 p-4 rounded-full">
                                    <FaMoneyBillWave className="h-8 w-8 text-green-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-gray-500">
                                        عاید
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {mostProfitableMonthValue.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="my-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Pie Chart - Revenue Distribution */}
                    <div className="bg-white rounded-xl border overflow-hidden">
                        <div className="p-4 bg-purple-600 flex justify-between items-center">
                            <div className="text-purple-50">
                                <h2 className="text-lg font-semibold">
                                    د عاید وېش د خیاطي ډول پر اساس
                                </h2>
                                <p className="text-sm opacity-80">
                                    دایروي چارټ (Pie Chart)
                                </p>
                            </div>
                            <div className="text-purple-50 bg-white/20 p-3 rounded-lg">
                                <FaChartPie className="w-6 h-6" />
                            </div>
                        </div>
                        <div
                            className="p-4 flex justify-center"
                            style={{ height: "300px" }}
                        >
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

                    {/* Line Chart - Monthly Revenue */}
                    <div className="bg-white rounded-xl border overflow-hidden">
                        <div className="p-4 bg-blue-600 flex justify-between items-center">
                            <div className="text-blue-50">
                                <h2 className="text-lg font-semibold">
                                    د میاشتني عاید بدلون
                                </h2>
                                <p className="text-sm opacity-80">
                                    کرښې چارټ (Line Chart)
                                </p>
                            </div>
                            <div className="text-blue-50 bg-white/20 p-3 rounded-lg">
                                <FaChartLine className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="p-4" style={{ height: "300px" }}>
                            <Line
                                data={lineChartData}
                                options={{
                                    ...lineChartOptions,
                                    maintainAspectRatio: false,
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Most Sold Products Section */}
                <div className="my-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Most Sold Categories */}
                    <div className="bg-white rounded-xl border overflow-hidden">
                        <div className="p-4 bg-indigo-500 flex justify-between items-center">
                            <div className="text-indigo-50">
                                <h2 className="text-lg font-semibold">
                                    ترټوډېر پلورل سوي توکي
                                </h2>
                                <p className="text-sm opacity-80">
                                    د پلور شویو توکو د شمیر له مخې
                                </p>
                            </div>
                            <div className="text-indigo-50 bg-white/20 p-3 rounded-lg">
                                <FaChartBar className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex flex-col space-y-4">
                                {categoriesByQuantity.map((category, index) => {
                                    const Icon = category.icon;
                                    const percentage =
                                        (category.value / maxQuantity) * 100;
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center"
                                        >
                                            <div
                                                className="w-8 h-8 flex items-center justify-center rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        category.color + "20",
                                                }}
                                            >
                                                <Icon
                                                    className="w-5 h-5"
                                                    style={{
                                                        color: category.color,
                                                    }}
                                                />
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium">
                                                        {category.name}
                                                    </span>
                                                    <span className="text-sm font-medium">
                                                        {category.value} توکي
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className="h-2.5 rounded-full"
                                                        style={{
                                                            width: `${percentage}%`,
                                                            backgroundColor:
                                                                category.color,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Most Profitable Categories */}
                    <div className="bg-white rounded-xl border overflow-hidden">
                        <div className="p-4 bg-green-600 flex justify-between items-center">
                            <div className="text-green-50">
                                <h2 className="text-lg font-semibold">
                                    ترټوډېره ګټه لرونکي کټګورۍ
                                </h2>
                                <p className="text-sm opacity-80">
                                    د ګټې له مخې
                                </p>
                            </div>
                            <div className="text-green-50 bg-white/20 p-3 rounded-lg">
                                <FaMoneyBillWave className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex flex-col space-y-4">
                                {categoriesByProfit.map((category, index) => {
                                    const Icon = category.icon;
                                    const percentage =
                                        (category.money / maxProfitValue) * 100;
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center"
                                        >
                                            <div
                                                className="w-8 h-8 flex items-center justify-center rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        category.color + "20",
                                                }}
                                            >
                                                <Icon
                                                    className="w-5 h-5"
                                                    style={{
                                                        color: category.color,
                                                    }}
                                                />
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium">
                                                        {category.name}
                                                    </span>
                                                    <span className="text-sm font-medium">
                                                        {category.money.toLocaleString()}{" "}
                                                        افغانۍ
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className="h-2.5 rounded-full"
                                                        style={{
                                                            width: `${percentage}%`,
                                                            backgroundColor:
                                                                category.color,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Most Profitable Products - Aggregated by Category */}
                <div className="mt-6">
                    <div className="bg-white rounded-xl border overflow-hidden">
                        <div className="p-4 bg-yellow-500 flex justify-between items-center">
                            <div className="text-yellow-50">
                                <h2 className="text-lg font-semibold">
                                    تر ټولو زیات ګټه لرونکي توکي
                                </h2>
                                <p className="text-sm opacity-80">
                                    د کټګورۍ له مخې ټولې ګټې
                                </p>
                            </div>
                            <div className="text-yellow-50 bg-white/20 p-3 rounded-lg">
                                <FaTrophy className="w-6 h-6" />
                            </div>
                        </div>

                        <div className="p-4">
                            {categoriesByProfit.map((category, index) => {
                                const Icon = category.icon;
                                const profit = category.money;
                                const maxProfit = categoriesByProfit[0].money;
                                const percentage = (profit / maxProfit) * 100;

                                return (
                                    <div
                                        key={index}
                                        className="bg-gray-50 rounded-lg p-4 mb-3 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center">
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
                                            <div className="flex-1">
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

                                            <div className="flex gap-5">
                                                <div className="text-right ">
                                                    <div className="text-sm text-gray-500">
                                                        نمبر
                                                    </div>
                                                    <div className="font-medium">
                                                        {category.items}
                                                    </div>
                                                </div>
                                                <div className="text-right ml-6">
                                                    <div className="text-sm text-gray-500">
                                                        ټول شمیر
                                                    </div>
                                                    <div className="font-medium">
                                                        {category.value}
                                                    </div>
                                                </div>
                                                <div className="text-right ml-6">
                                                    <div className="text-sm text-gray-500">
                                                        ټوله ګټه
                                                    </div>
                                                    <div className="font-bold text-gray-800">
                                                        {profit.toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="my-5">
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
                                                    اوسط ګټه:{" "}
                                                    {(
                                                        profit /
                                                        (category.items || 1)
                                                    ).toFixed(0)}{" "}
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

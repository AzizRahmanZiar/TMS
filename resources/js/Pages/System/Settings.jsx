import React, { useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import SystemLayout from "@/Layouts/SystemLayout";
import { motion } from "framer-motion";
import {
    FaCog,
    FaCalendarWeek,
    FaChartBar,
    FaSave,
    FaRedo,
    FaInfoCircle,
    FaCheckCircle,
    FaExclamationTriangle,
} from "react-icons/fa";
import { MdCheck, MdClose } from "react-icons/md";

const Settings = () => {
    const { user, orderStatistics, availableLimits, flash } = usePage().props;
    const [selectedLimit, setSelectedLimit] = useState(
        user?.weekly_order_limit || 5
    );

    const { setData, put, processing, errors } = useForm({
        weekly_order_limit: user?.weekly_order_limit || 5,
    });

    const { post: resetPost, processing: resetProcessing } = useForm();

    // Toast notification state
    const [toastState, setToastState] = useState({
        visible: false,
        message: "",
        type: "success",
    });

    const showToast = (message, type = "success") => {
        setToastState({ visible: true, message, type });
        setTimeout(() => {
            setToastState({ visible: false, message: "", type: "success" });
        }, 3000);
    };

    // Show flash messages
    React.useEffect(() => {
        if (flash?.success) {
            showToast(flash.success, "success");
        }
        if (flash?.error) {
            showToast(flash.error, "error");
        }
    }, [flash]);

    const handleLimitChange = (limit) => {
        setSelectedLimit(limit);
        setData("weekly_order_limit", limit);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put("/settings/order-limit", {
            onSuccess: () => {
                showToast("تنظیمات په بریالیتوب سره خوندي شول", "success");
            },
            onError: () => {
                showToast("د تنظیماتو خوندي کولو کې ستونزه", "error");
            },
        });
    };

    const handleResetWeeklyCount = () => {
        if (
            confirm(
                "ایا تاسو ډاډه یاست چې غواړئ د دغه اونۍ د فرمایشونو شمیرنه بیا تنظیم کړئ؟"
            )
        ) {
            resetPost("/settings/reset-weekly-count", {
                onSuccess: () => {
                    showToast("د اونۍ شمیرنه بیا تنظیم شوه", "success");
                },
                onError: () => {
                    showToast("د بیا تنظیم کولو کې ستونزه", "error");
                },
            });
        }
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    return (
        <SystemLayout>
            <Head title="تنظیمات - خیاط ماسټر" />

            <div className="p-6 max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    className="mb-8"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                            <FaCog className="text-white text-xl" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 font-zar">
                                تنظیمات
                            </h1>
                            <p className="text-gray-600 font-zar">
                                ستاسو د کار د ظرفیت تنظیمات
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Current Statistics */}
                    <motion.div className="lg:col-span-1" variants={fadeIn}>
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <FaChartBar className="text-blue-500 text-xl" />
                                <h2 className="text-xl font-bold text-gray-800 font-zar">
                                    اوسنی حالت
                                </h2>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600 mb-1">
                                            {orderStatistics?.current_week_orders ||
                                                0}
                                        </div>
                                        <div className="text-sm text-gray-600 font-zar">
                                            د دغه اونۍ فرمایشونه
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600 mb-1">
                                            {orderStatistics?.remaining_capacity ||
                                                0}
                                        </div>
                                        <div className="text-sm text-gray-600 font-zar">
                                            پاتې ظرفیت
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600 mb-1">
                                            {orderStatistics?.weekly_limit ||
                                                user?.weekly_order_limit ||
                                                5}
                                        </div>
                                        <div className="text-sm text-gray-600 font-zar">
                                            اوسنی حد
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`p-4 rounded-xl border ${
                                        orderStatistics?.can_accept_orders
                                            ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                                            : "bg-gradient-to-r from-red-50 to-rose-50 border-red-200"
                                    }`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        {orderStatistics?.can_accept_orders ? (
                                            <>
                                                <FaCheckCircle className="text-green-500" />
                                                <span className="text-green-700 font-zar text-sm">
                                                    فرمایش منل کولی شي
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <FaExclamationTriangle className="text-red-500" />
                                                <span className="text-red-700 font-zar text-sm">
                                                    حد ته رسیدلی
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Reset Button */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <button
                                    onClick={handleResetWeeklyCount}
                                    disabled={resetProcessing}
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-zar flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    <FaRedo
                                        className={
                                            resetProcessing
                                                ? "animate-spin"
                                                : ""
                                        }
                                    />
                                    {resetProcessing
                                        ? "لږ صبر وکړئ..."
                                        : "د اونۍ شمیرنه بیا تنظیم کړئ"}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Order Limit Settings */}
                    <motion.div className="lg:col-span-2" variants={fadeIn}>
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <FaCalendarWeek className="text-primary-500 text-xl" />
                                <h2 className="text-xl font-bold text-gray-800 font-zar">
                                    د اونۍ د فرمایشونو حد
                                </h2>
                            </div>

                            {/* Week Date Range Display */}
                            {orderStatistics?.week_start_date &&
                                orderStatistics?.week_end_date && (
                                    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                                        <div className="flex items-center gap-3 mb-2">
                                            <FaCalendarWeek className="text-blue-500" />
                                            <h3 className="text-lg font-bold text-blue-700 font-zar">
                                                د اوسنۍ اونۍ نیټې
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-white p-3 rounded-lg border border-blue-100">
                                                <div className="text-sm text-gray-600 font-zar mb-1">
                                                    د اونۍ پیل
                                                </div>
                                                <div className="text-lg font-bold text-blue-600">
                                                    {
                                                        orderStatistics.week_start_date
                                                    }
                                                </div>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg border border-blue-100">
                                                <div className="text-sm text-gray-600 font-zar mb-1">
                                                    د اونۍ پای
                                                </div>
                                                <div className="text-lg font-bold text-blue-600">
                                                    {
                                                        orderStatistics.week_end_date
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <FaInfoCircle className="text-blue-500 mt-1" />
                                    <div className="text-sm text-blue-700 font-zar">
                                        <p className="font-semibold mb-1">
                                            د حد تنظیم کول:
                                        </p>
                                        <p className="mb-2">
                                            تاسو کولی شئ د خپل د کار د ظرفیت له
                                            مخې د اونۍ د فرمایشونو حد وټاکئ. که
                                            چیرې تاسو ډیر بوخت یاست، ټیټ حد
                                            وټاکئ، او که چیرې تاسو ډیر کار کولی
                                            شئ، لوړ حد وټاکئ.
                                        </p>
                                        <p className="text-sm font-semibold text-blue-800">
                                            یادونه: هر پیرودونکی د اونۍ په اوږدو
                                            کې یوازې یو فرمایش ورکولی شي.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label className="block text-lg font-bold text-gray-700 mb-4 font-zar">
                                        د اونۍ د فرمایشونو حد وټاکئ:
                                    </label>

                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                        {availableLimits.map((limit) => (
                                            <button
                                                key={limit}
                                                type="button"
                                                onClick={() =>
                                                    handleLimitChange(limit)
                                                }
                                                className={`p-4 rounded-xl border-2 transition-all duration-300 font-zar font-bold ${
                                                    selectedLimit === limit
                                                        ? "border-primary-500 bg-primary-50 text-primary-700 shadow-lg scale-105"
                                                        : "border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-25"
                                                }`}
                                            >
                                                <div className="text-2xl mb-1">
                                                    {limit}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    فرمایشونه
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    {errors.weekly_order_limit && (
                                        <p className="mt-2 text-sm text-red-600 font-zar">
                                            {errors.weekly_order_limit}
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        type="submit"
                                        disabled={
                                            processing ||
                                            selectedLimit ===
                                                user?.weekly_order_limit
                                        }
                                        className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-6 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 font-zar font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FaSave
                                            className={
                                                processing
                                                    ? "animate-pulse"
                                                    : ""
                                            }
                                        />
                                        {processing
                                            ? "خوندي کیږي..."
                                            : "تنظیمات خوندي کړئ"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Toast Notification */}
            {toastState.visible && (
                <div
                    className={`fixed bottom-4 left-10 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center ${
                        toastState.type === "success"
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                    }`}
                >
                    {toastState.type === "success" ? (
                        <MdCheck className="mr-2 h-5 w-5" />
                    ) : (
                        <MdClose className="mr-2 h-5 w-5" />
                    )}
                    <span>{toastState.message}</span>
                </div>
            )}
        </SystemLayout>
    );
};

export default Settings;

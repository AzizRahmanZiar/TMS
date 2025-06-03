import React, { useState, useEffect } from "react";
import SiteLayout from "../../Layouts/SiteLayout";
import { motion } from "framer-motion";
import {
    FaRuler,
    FaShoppingBag,
    FaTshirt,
    FaClipboardCheck,
    FaArrowRight,
    FaPhone,
    FaMapMarkerAlt,
    FaUser,
    FaPaperPlane,
    FaCheckCircle,
} from "react-icons/fa";
import { useOrder } from "@/Contexts/OrderContext";
import { usePage, router, useForm } from "@inertiajs/react";
import axios from "axios";
import { toast } from "react-hot-toast";

// Add CSRF token to Axios defaults
axios.defaults.headers.common["X-CSRF-TOKEN"] = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");

const Order = () => {
    const { order = [], setOrder } = useOrder() || {
        order: [],
        setOrder: () => {},
    };
    const { props } = usePage();
    const [selectedTailor, setSelectedTailor] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        phone: "",
        address: "",
        tailor_id: props.tailorId || "",
        status: "pending",
    });

    // Check if user has already ordered this week
    const userHasOrderedThisWeek = props.userHasOrderedThisWeek;

    useEffect(() => {
        // Check if user is authenticated
        if (!props.auth?.user) {
            // Store tailor data in session storage before redirecting
            if (props.tailorId && props.tailorName) {
                sessionStorage.setItem(
                    "selectedTailor",
                    JSON.stringify({
                        id: props.tailorId,
                        name: props.tailorName,
                    })
                );
            }
            router.visit(route("register"));
            return;
        }

        // Get tailor data from props
        const tailorId = props.tailorId;
        const tailorName = props.tailorName;

        console.log("Order Page Props:", { tailorId, tailorName, props }); // Debug log

        if (tailorId && tailorName) {
            setSelectedTailor({
                id: tailorId,
                name: tailorName,
            });
            // Set the tailor_id in form data
            setData((prev) => ({
                ...prev,
                tailor_id: tailorId,
            }));
        } else {
            // If no tailor is selected, redirect to tailors page
            router.visit(route("tailors"));
        }
    }, [props.auth?.user, props.tailorId, props.tailorName]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedTailor) {
            router.visit(route("tailors"));
            return;
        }

        if (!props.auth?.user) {
            router.visit(route("login"));
            return;
        }

        // Check if user has already ordered this week
        if (userHasOrderedThisWeek) {
            toast.error(
                "تاسو د دغه اونۍ لپاره دمخه یو فرمایش ورکړی دی. هره اونۍ یوازې یو فرمایش ورکولی شئ."
            );
            return;
        }

        // Use Inertia's post method
        post(route("customer.orders.store"), {
            onSuccess: () => {
                toast.success("ستاسو فرمایش په بریالیتوب سره ثبت شو");
                // Redirect to home page after successful order
                router.visit(route("home"));
            },
        });
    };

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
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

    // If no tailor is selected, show message and redirect button
    if (!selectedTailor) {
        return (
            <SiteLayout title="فرمایش - خیاط ماسټر">
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
                        <h2 className="text-2xl font-bold font-zar mb-4">
                            لطفاً لومړی یو خیاط وټاکئ
                        </h2>
                        <p className="text-gray-600 mb-6">
                            د فرمایش ورکولو لپاره تاسو باید لومړی یو خیاط وټاکئ
                        </p>
                        <button
                            onClick={() => router.visit(route("tailors"))}
                            className="inline-flex items-center px-6 py-3 bg-secondary-600 text-white rounded-md hover:bg-secondary-700 transition"
                        >
                            د خیاطانو لیدنه
                            <FaArrowRight className="mr-2" />
                        </button>
                    </div>
                </div>
            </SiteLayout>
        );
    }

    return (
        <SiteLayout title="فرمایش - خیاط ماسټر">
            {/* Hero Section */}
            <motion.section
                className="relative bg-gradient-to-br from-primary-50 via-secondary-50 to-tertiary-50 text-primary-900 py-16 overflow-hidden"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-secondary-300 rounded-full"></div>
                    <div className="absolute top-32 right-20 w-16 h-16 bg-primary-300 rounded-full"></div>
                    <div className="absolute bottom-20 left-32 w-12 h-12 bg-tertiary-300 rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 bg-secondary-200 rounded-full"></div>
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold font-zar mb-4 bg-gradient-to-r from-primary-800 to-secondary-700 bg-clip-text text-transparent"
                        variants={fadeIn}
                    >
                        د فرمایش فورمه
                    </motion.h1>
                </div>

                {/* Order Form */}
                <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", damping: 15 }}
                            viewport={{ once: true }}
                        >
                            {/* Form Card */}
                            <motion.div
                                className="bg-gradient-to-br from-white to-primary-50 rounded-3xl shadow-2xl border border-primary-200 overflow-hidden"
                                whileHover={{ y: -8, scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {/* Selected Tailor Info */}
                                <div className="bg-gradient-to-r from-primary-100 to-secondary-100 p-8 border-b border-primary-200">
                                    <div className="flex items-center justify-center">
                                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                            <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg">
                                                <FaUser className="text-white text-xl" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm text-primary-700 font-zar mb-1">
                                                    ستاسو غوره شوی خیاط
                                                </p>
                                                <p className="text-2xl font-bold text-primary-900 font-zar">
                                                    {selectedTailor.name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Statistics */}
                                {props.orderStatistics && (
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border-b border-primary-200">
                                        <div className="text-center mb-6">
                                            <h3 className="text-xl font-bold text-primary-900 font-zar mb-2">
                                                د خیاط د فرمایشونو حالت
                                            </h3>
                                            <p className="text-sm text-primary-600 font-zar">
                                                د دغه اونۍ د فرمایشونو تفصیلات
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                                            <div className="text-center p-4 bg-white/80 rounded-2xl shadow-sm">
                                                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                                                    <span className="text-white font-bold text-lg">
                                                        {
                                                            props
                                                                .orderStatistics
                                                                .remaining_capacity
                                                        }
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700 font-zar font-semibold">
                                                    پاتې ظرفیت
                                                </p>
                                            </div>
                                            <div className="text-center p-4 bg-white/80 rounded-2xl shadow-sm">
                                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                                                    <span className="text-white font-bold text-lg">
                                                        {
                                                            props
                                                                .orderStatistics
                                                                .current_week_orders
                                                        }
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700 font-zar font-semibold">
                                                    د دغه اونۍ فرمایشونه
                                                </p>
                                            </div>
                                            <div className="text-center p-4 bg-white/80 rounded-2xl shadow-sm">
                                                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                                                    <span className="text-white font-bold text-lg">
                                                        {
                                                            props
                                                                .orderStatistics
                                                                .weekly_limit
                                                        }
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700 font-zar font-semibold">
                                                    د اونۍ حد
                                                </p>
                                            </div>
                                            <div className="text-center p-4 bg-white/80 rounded-2xl shadow-sm">
                                                <div
                                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg ${
                                                        props.orderStatistics
                                                            .can_accept_orders
                                                            ? "bg-gradient-to-br from-green-500 to-green-600"
                                                            : "bg-gradient-to-br from-red-500 to-red-600"
                                                    }`}
                                                >
                                                    <span className="text-white font-bold text-xl">
                                                        {props.orderStatistics
                                                            .can_accept_orders
                                                            ? "✓"
                                                            : "✗"}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700 font-zar font-semibold">
                                                    {props.orderStatistics
                                                        .can_accept_orders
                                                        ? "فرمایش منل کولی شي"
                                                        : "فرمایش نشي منلی"}
                                                </p>
                                            </div>
                                        </div>
                                        {!props.orderStatistics
                                            .can_accept_orders && (
                                            <div className="mt-6 p-4 bg-gradient-to-r from-red-100 to-red-50 border-2 border-red-200 rounded-2xl">
                                                <p className="text-red-700 text-center font-zar text-sm leading-relaxed">
                                                    دا خیاط د دغه اونۍ لپاره خپل
                                                    حد ته رسیدلی. مهرباني وکړئ
                                                    بل خیاط وټاکئ یا راتلونکې
                                                    اونۍ هڅه وکړئ.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Weekly Order Status */}
                                {userHasOrderedThisWeek ? (
                                    <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 border-b border-red-200">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                <span className="text-white font-bold text-sm">
                                                    ✕
                                                </span>
                                            </div>
                                            <div className="text-red-800 font-zar">
                                                <h3 className="font-bold text-lg mb-2">
                                                    د اونۍ فرمایش مکمل شوی
                                                </h3>
                                                <p className="text-sm leading-relaxed">
                                                    تاسو د دغه اونۍ لپاره دمخه
                                                    یو فرمایش ورکړی دی. هر
                                                    پیرودونکی د اونۍ په اوږدو کې
                                                    یوازې{" "}
                                                    <strong>یو فرمایش</strong>{" "}
                                                    ورکولی شي. د راتلونکې اونۍ
                                                    لپاره بیا هڅه وکړئ.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 border-b border-amber-200">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                <span className="text-white font-bold text-sm">
                                                    !
                                                </span>
                                            </div>
                                            <div className="text-amber-800 font-zar">
                                                <h3 className="font-bold text-lg mb-2">
                                                    د اونۍ د فرمایش حد
                                                </h3>
                                                <p className="text-sm leading-relaxed">
                                                    هر پیرودونکی د اونۍ په اوږدو
                                                    کې یوازې{" "}
                                                    <strong>یو فرمایش</strong>{" "}
                                                    ورکولی شي. که چیرې تاسو د
                                                    دغه اونۍ لپاره دمخه فرمایش
                                                    ورکړی وي، نو تاسو نشئ کولی
                                                    بل فرمایش ورکړئ.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Form */}
                                <form
                                    onSubmit={handleSubmit}
                                    className={`p-8 md:p-10 space-y-8 ${
                                        userHasOrderedThisWeek
                                            ? "opacity-50 pointer-events-none"
                                            : ""
                                    }`}
                                >
                                    {/* Phone Field */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <label
                                            htmlFor="phone"
                                            className="block text-lg font-bold text-primary-900 mb-3 font-zar"
                                        >
                                            <FaPhone className="inline ml-2 text-secondary-600" />
                                            د تلیفون شمیره
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                id="phone"
                                                value={data.phone}
                                                onChange={(e) =>
                                                    setData(
                                                        "phone",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-6 py-5 text-lg border-2 border-primary-200 rounded-2xl focus:border-secondary-500 focus:ring-4 focus:ring-secondary-100 transition-all duration-300 bg-white/90 backdrop-blur-sm font-zar text-right shadow-sm hover:shadow-md"
                                                placeholder="د بیلګې په توګه: 0701234567"
                                                required
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaPhone className="h-5 w-5 text-primary-400" />
                                            </div>
                                        </div>
                                        {errors.phone && (
                                            <motion.p
                                                className="mt-2 text-sm text-red-600 font-zar"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                {errors.phone}
                                            </motion.p>
                                        )}
                                    </motion.div>

                                    {/* Address Field */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        viewport={{ once: true }}
                                    >
                                        <label
                                            htmlFor="address"
                                            className="block text-lg font-bold text-primary-900 mb-3 font-zar"
                                        >
                                            <FaMapMarkerAlt className="inline ml-2 text-secondary-600" />
                                            ستاسو آدرس
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                id="address"
                                                value={data.address}
                                                onChange={(e) =>
                                                    setData(
                                                        "address",
                                                        e.target.value
                                                    )
                                                }
                                                rows="5"
                                                className="w-full px-6 py-5 text-lg border-2 border-primary-200 rounded-2xl focus:border-secondary-500 focus:ring-4 focus:ring-secondary-100 transition-all duration-300 bg-white/90 backdrop-blur-sm resize-none font-zar text-right shadow-sm hover:shadow-md"
                                                placeholder="ستاسو بشپړ آدرس دلته ولیکئ..."
                                                required
                                            />
                                            <div className="absolute top-4 left-3 pointer-events-none">
                                                <FaMapMarkerAlt className="h-5 w-5 text-primary-400" />
                                            </div>
                                        </div>
                                        {errors.address && (
                                            <motion.p
                                                className="mt-2 text-sm text-red-600 font-zar"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                {errors.address}
                                            </motion.p>
                                        )}
                                    </motion.div>

                                    {/* Submit Button */}
                                    <motion.div
                                        className="pt-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        viewport={{ once: true }}
                                    >
                                        <motion.button
                                            type="submit"
                                            disabled={
                                                processing ||
                                                userHasOrderedThisWeek ||
                                                (props.orderStatistics &&
                                                    !props.orderStatistics
                                                        .can_accept_orders)
                                            }
                                            className={`w-full font-bold py-5 px-8 rounded-2xl text-xl font-zar shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 rtl:space-x-reverse ${
                                                userHasOrderedThisWeek ||
                                                (props.orderStatistics &&
                                                    !props.orderStatistics
                                                        .can_accept_orders)
                                                    ? "bg-gradient-to-r from-gray-400 to-gray-500 text-gray-600"
                                                    : "bg-gradient-to-r from-secondary-500 via-secondary-600 to-primary-500 hover:from-secondary-600 hover:via-secondary-700 hover:to-primary-600 text-white"
                                            }`}
                                            whileHover={{
                                                scale:
                                                    processing ||
                                                    userHasOrderedThisWeek ||
                                                    (props.orderStatistics &&
                                                        !props.orderStatistics
                                                            .can_accept_orders)
                                                        ? 1
                                                        : 1.03,
                                                y:
                                                    processing ||
                                                    userHasOrderedThisWeek ||
                                                    (props.orderStatistics &&
                                                        !props.orderStatistics
                                                            .can_accept_orders)
                                                        ? 0
                                                        : -2,
                                            }}
                                            whileTap={{
                                                scale:
                                                    processing ||
                                                    userHasOrderedThisWeek ||
                                                    (props.orderStatistics &&
                                                        !props.orderStatistics
                                                            .can_accept_orders)
                                                        ? 1
                                                        : 0.97,
                                            }}
                                        >
                                            {processing ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                                    <span>لږ صبر وکړئ...</span>
                                                </>
                                            ) : userHasOrderedThisWeek ? (
                                                <>
                                                    <span>
                                                        تاسو د دغه اونۍ فرمایش
                                                        ورکړی دی
                                                    </span>
                                                </>
                                            ) : props.orderStatistics &&
                                              !props.orderStatistics
                                                  .can_accept_orders ? (
                                                <>
                                                    <span>
                                                        خیاط د دغه اونۍ حد ته
                                                        رسیدلی
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaPaperPlane className="text-lg" />
                                                    <span>فرمایش ولیږئ</span>
                                                </>
                                            )}
                                        </motion.button>
                                    </motion.div>
                                </form>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </motion.section>

            {/* FAQ Section */}
            <section className="py-16 bg-gradient-to-b from-primary-50 to-secondary-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-tertiary-500 to-tertiary-600 rounded-full mb-4 shadow-lg">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold font-zar mb-2 text-primary-900">
                            عمومي پوښتنې
                        </h2>
                        <p className="text-lg text-primary-600 font-zar">
                            د فرمایش په اړه ستاسو ټولې پوښتنې
                        </p>
                    </motion.div>

                    <motion.div
                        className="max-w-4xl mx-auto grid gap-6 md:gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl p-8 shadow-lg border border-primary-100 hover:shadow-xl transition-all duration-300"
                            variants={fadeIn}
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            <div className="flex items-start space-x-4 rtl:space-x-reverse">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl md:text-2xl font-zar font-bold mb-3 text-primary-900">
                                        د فرمایش ورکولو وروسته څومره وخت نیسي؟
                                    </h3>
                                    <p className="text-primary-700 font-zar text-lg leading-relaxed">
                                        د جامو د ډول او پیچلتیا په اساس، معمولاً
                                        د ۷-۱۴ ورځو پورې وخت نیسي. د واده جامې
                                        ممکن تر ۳۰ ورځو پورې وخت ونیسي.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-white rounded-2xl p-8 shadow-lg border border-primary-100 hover:shadow-xl transition-all duration-300"
                            variants={fadeIn}
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            <div className="flex items-start space-x-4 rtl:space-x-reverse">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-tertiary-500 to-tertiary-600 rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl md:text-2xl font-zar font-bold mb-3 text-primary-900">
                                        آیا تاسو د رسولو خدمت لرئ؟
                                    </h3>
                                    <p className="text-primary-700 font-zar text-lg leading-relaxed">
                                        هو، موږ د ښار په دننه کې وړیا رسول لرو.
                                        د ښار څخه بهر رسول د واټن په اساس اضافي
                                        لګښت لري.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-white rounded-2xl p-8 shadow-lg border border-primary-100 hover:shadow-xl transition-all duration-300"
                            variants={fadeIn}
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            <div className="flex items-start space-x-4 rtl:space-x-reverse">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl md:text-2xl font-zar font-bold mb-3 text-primary-900">
                                        که چیرې جامې زما په اندازه برابرې نه وي
                                        څه به وشي؟
                                    </h3>
                                    <p className="text-primary-700 font-zar text-lg leading-relaxed">
                                        موږ د کیفیت تضمین وړاندې کوو. که چیرې
                                        جامې ستاسو په اندازه برابرې نه وي، موږ
                                        به یې وړیا بدل کړو.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </SiteLayout>
    );
};

export default Order;

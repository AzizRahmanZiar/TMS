import React, { useState, useEffect } from "react";
import SiteLayout from "../../Layouts/SiteLayout";
import { motion } from "framer-motion";
import {
    FaRuler,
    FaShoppingBag,
    FaTshirt,
    FaClipboardCheck,
    FaArrowRight,
} from "react-icons/fa";
import { useOrder } from "@/Contexts/OrderContext";
import { usePage, router, useForm } from "@inertiajs/react";
import axios from "axios";
import { toast } from "react-hot-toast";

// Add CSRF token to Axios defaults
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

const Order = () => {
    const { order = [], setOrder } = useOrder() || { order: [], setOrder: () => {} };
    const { props } = usePage();
    const [selectedTailor, setSelectedTailor] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        phone: "",
        address: "",
        tailor_id: props.tailorId || "",
        status: "pending"
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is authenticated
        if (!props.auth?.user) {
            // Store tailor data in session storage before redirecting
            if (props.tailorId && props.tailorName) {
                sessionStorage.setItem('selectedTailor', JSON.stringify({
                    id: props.tailorId,
                    name: props.tailorName
                }));
            }
            router.visit(route('register'));
            return;
        }

        // Get tailor data from props
        const tailorId = props.tailorId;
        const tailorName = props.tailorName;

        console.log('Order Page Props:', { tailorId, tailorName, props }); // Debug log

        if (tailorId && tailorName) {
            setSelectedTailor({
                id: tailorId,
                name: tailorName
            });
            // Set the tailor_id in form data
            setData(prev => ({
                ...prev,
                tailor_id: tailorId
            }));
        } else {
            // If no tailor is selected, redirect to tailors page
            router.visit(route('tailors'));
        }
    }, [props.auth?.user, props.tailorId, props.tailorName]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            if (!selectedTailor) {
                setError('لطفاً خیاط وټاکئ');
                router.visit(route('tailors'));
                return;
            }

            if (!props.auth?.user) {
                setError('د فرمایش لپاره لومړی لاګ ان شئ');
                router.visit(route('login'));
                return;
            }

            // Validate form data
            if (!data.phone || !data.address) {
                setError('لطفاً ټول معلومات ډک کړئ');
                setSubmitting(false);
                return;
            }

            // Ensure we have the correct tailor_id
            if (!selectedTailor.id) {
                setError('د خیاط معلومات ناسم دي');
                setSubmitting(false);
                return;
            }

            const orderData = {
                phone: data.phone,
                address: data.address,
                tailor_id: selectedTailor.id,
                user_id: props.auth.user.id,
                status: 'pending'
            };

            console.log('Submitting order with data:', {
                ...orderData,
                selectedTailor,
                currentUser: props.auth.user
            });

            // Use Inertia's post method instead of axios
            post(route('customer.orders.store'), {
                onSuccess: () => {
                    toast.success('ستاسو فرمایش په بریالیتوب سره ثبت شو');
                    // Reset form but keep the tailor_id
                    setData({
                        phone: '',
                        address: '',
                        tailor_id: selectedTailor.id
                    });
                    // Redirect to home page after successful order
                    router.visit(route('home'));
                },
                onError: (errors) => {
                    if (errors) {
                        // Handle validation errors
                        const errorMessages = Object.values(errors).flat();
                        setError(errorMessages[0] || 'د فرمایش ثبت کولو کې ستونزه راغله');
                    } else {
                        setError('د فرمایش ثبت کولو کې ستونزه راغله');
                    }
                }
            });
        } catch (err) {
            console.error('Order submission error:', err);
            setError('د فرمایش ثبت کولو کې ستونزه راغله');
        } finally {
            setSubmitting(false);
        }
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

    const formAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", damping: 15 },
        },
    };

    // If no tailor is selected, show message and redirect button
    if (!selectedTailor) {
        return (
            <SiteLayout title="فرمایش - خیاط ماسټر">
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
                        <h2 className="text-2xl font-bold font-zar mb-4">لطفاً لومړی یو خیاط وټاکئ</h2>
                        <p className="text-gray-600 mb-6">د فرمایش ورکولو لپاره تاسو باید لومړی یو خیاط وټاکئ</p>
                        <button
                            onClick={() => router.visit(route('tailors'))}
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
                className="bg-primary-50 text-primary-900 py-12"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="mx-auto px-4">
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold font-zar max-w-3xl mx-auto mb-4"
                        variants={fadeIn}
                    >
                        فرمایش ورکړئ
                    </motion.h1>
                    <motion.p
                        className="text-xl font-zar md:text-2xl max-w-3xl mx-auto"
                        variants={fadeIn}
                    >
                        د {selectedTailor.name} لپاره فرمایش ورکړئ
                    </motion.p>
                </div>
            </motion.section>

            {/* Order Form */}
            <section className="py-12">
                <div className="mx-auto px-4">
                    <motion.div
                        className="max-w-4xl mx-auto bg-white p-8 rounded-lg border shadow-lg"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", damping: 15 }}
                        viewport={{ once: true }}
                    >
                        <motion.h2
                            className="text-3xl font-bold font-zar mb-6 text-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            د فرمایش فورمه
                        </motion.h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    تلیفون
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="address"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    آدرس
                                </label>
                                <textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                {errors.address && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.address}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                >
                                    {processing ? "لږ صبر..." : "فرمایش کول"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-3xl font-bold font-zar text-center mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        عمومي پوښتنې
                    </motion.h2>
                    <motion.div
                        className="max-w-3xl mx-auto"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="mb-6 bg-white p-6 rounded-lg shadow-md"
                            variants={fadeIn}
                            whileHover={{
                                y: -5,
                                boxShadow:
                                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                            }}
                        >
                            <h3 className="text-2xl font-zar font-bold mb-2">
                                د فرمایش ورکولو وروسته څومره وخت نیسي؟
                            </h3>
                            <p className="text-gray-700 font-zar text-xl md:text-2xl">
                                د جامو د ډول او پیچلتیا په اساس، معمولاً د ۷-۱۴
                                ورځو پورې وخت نیسي. د واده جامې ممکن تر ۳۰ ورځو
                                پورې وخت ونیسي.
                            </p>
                        </motion.div>

                        <motion.div
                            className="mb-6 bg-white p-6 rounded-lg shadow-md"
                            variants={fadeIn}
                            whileHover={{
                                y: -5,
                                boxShadow:
                                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                            }}
                        >
                            <h3 className="text-2xl font-zar font-bold mb-2">
                                آیا تاسو د رسولو خدمت لرئ؟
                            </h3>
                            <p className="text-gray-700 font-zar text-xl md:text-2xl">
                                هو، موږ د ښار په دننه کې وړیا رسول لرو. د ښار
                                څخه بهر رسول د واټن په اساس اضافي لګښت لري.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-md"
                            variants={fadeIn}
                            whileHover={{
                                y: -5,
                                boxShadow:
                                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                            }}
                        >
                            <h3 className="text-2xl font-zar font-bold mb-2">
                                که چیرې جامې زما په اندازه برابرې نه وي څه به
                                وشي؟
                            </h3>
                            <p className="text-gray-700 font-zar text-xl md:text-2xl">
                                موږ د کیفیت تضمین وړاندې کوو. که چیرې جامې ستاسو
                                په اندازه برابرې نه وي، موږ به یې وړیا بدل کړو.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </SiteLayout>
    );
};

export default Order;

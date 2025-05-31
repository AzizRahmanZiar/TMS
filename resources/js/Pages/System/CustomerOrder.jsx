import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SystemLayout from "@/Layouts/SystemLayout";
import { usePage, router } from "@inertiajs/react";
import {
    FaTrash,
    FaArrowRight,
    FaEye,
    FaUser,
    FaPhone,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaCog,
} from "react-icons/fa";
import SearchBar from "@/Components/SearchBar";
import DeleteModal from "@/Components/DeleteModal";
import { toast } from "react-hot-toast";

const CustomerOrder = ({ orders, order, message }) => {
    const { props } = usePage();
    const user = props.auth.user;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOrders, setFilteredOrders] = useState(orders || []);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (searchTerm) {
            const filtered = orders?.filter(
                (order) =>
                    order.user?.name
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    order.user?.email
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    order.phone
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
            setFilteredOrders(filtered);
        } else {
            setFilteredOrders(orders);
        }
    }, [searchTerm, orders]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handleDelete = (order) => {
        setOrderToDelete(order);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!orderToDelete) return;

        setIsDeleting(true);
        router.delete(route("customer.orders.destroy", orderToDelete.id), {
            onSuccess: () => {
                toast.success("فرمایش په بریالیتوب سره حذف شو");
                setShowDeleteModal(false);
                setOrderToDelete(null);
                setIsDeleting(false);
                // Refresh the page after successful deletion
                window.location.reload();
            },
            onError: (errors) => {
                toast.error("د فرمایش حذف کولو کې ستونزه رامنځته شوه");
                setIsDeleting(false);
                console.error("Error deleting order:", errors);
            },
        });
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setOrderToDelete(null);
        setIsDeleting(false);
    };

    const handleViewOrder = (orderId) => {
        router.visit(route("customer.orders.show", orderId));
    };

    // If we have a single order, show the detail view
    if (order) {
        return (
            <SystemLayout>
                <div className="p-3 md:p-6" dir="rtl">
                    <div className="bg-white rounded-2xl border-0.5 border-tertiary-200 p-3 md:p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-xl md:text-3xl font-bold text-gray-800">
                                د فرمایش تفصیلات
                            </h1>
                            <a
                                href={route("customerorder")}
                                className="flex items-center text-primary-600 hover:text-primary-800"
                            >
                                <FaArrowRight className="ml-2" />
                                شاته
                            </a>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold mb-4">
                                    د پیرودونکي معلومات
                                </h2>
                                <div className="space-y-2">
                                    <p>
                                        <span className="font-semibold">
                                            نوم:
                                        </span>{" "}
                                        {order.user?.name}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            بریښنالیک:
                                        </span>{" "}
                                        {order.user?.email}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            تلیفون:
                                        </span>{" "}
                                        {order.phone}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            آدرس:
                                        </span>{" "}
                                        {order.address}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold mb-4">
                                    د فرمایش معلومات
                                </h2>
                                <div className="space-y-2">
                                    <p>
                                        <span className="font-semibold">
                                            د فرمایش شمیره:
                                        </span>{" "}
                                        {order.id}
                                    </p>

                                    <p>
                                        <span className="font-semibold">
                                            د ثبت نیټه:
                                        </span>{" "}
                                        {new Date(
                                            order.created_at
                                        ).toLocaleString("fa-IR")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SystemLayout>
        );
    }

    // Otherwise show the list view
    return (
        <SystemLayout>
            <div className="p-3 md:p-6" dir="rtl">
                <div className="bg-white rounded-2xl border-0.5 border-tertiary-200 p-3 md:p-6">
                    {message && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                            {message}
                        </div>
                    )}
                    {/* Header Section */}
                    <motion.div
                        className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-6 mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <FaCog className="text-white text-xl" />
                                </div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white font-zar">
                                    د فرمایشونو لیست
                                </h1>
                            </div>
                            <div className="w-full md:w-96">
                                <SearchBar
                                    placeholder="د نوم، بریښنالیک یا تلیفون په اساس لټون..."
                                    onSearch={handleSearch}
                                    initialValue={searchTerm}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Modern Table */}
                    <motion.div
                        className="bg-white rounded-2xl shadow-lg border border-primary-100 overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gradient-to-r from-primary-50 to-secondary-50">
                                    <tr>
                                        <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                            <div className="flex items-center justify-end gap-2">
                                                <span>شمیره</span>
                                                <FaCog className="text-primary-600" />
                                            </div>
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                            <div className="flex items-center justify-end gap-2">
                                                <span>د پیرودونکي نوم</span>
                                                <FaUser className="text-primary-600" />
                                            </div>
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                            <div className="flex items-center justify-end gap-2">
                                                <span>تلیفون</span>
                                                <FaPhone className="text-primary-600" />
                                            </div>
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200 hidden lg:table-cell">
                                            <div className="flex items-center justify-end gap-2">
                                                <span>آدرس</span>
                                                <FaMapMarkerAlt className="text-primary-600" />
                                            </div>
                                        </th>

                                        <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200 hidden md:table-cell">
                                            <div className="flex items-center justify-end gap-2">
                                                <span>د ثبت نیټه</span>
                                                <FaCalendarAlt className="text-primary-600" />
                                            </div>
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                            <div className="flex items-center justify-end gap-2">
                                                <span>عملیات</span>
                                                <FaEye className="text-primary-600" />
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {filteredOrders.length > 0 ? (
                                        filteredOrders.map((order, index) => (
                                            <motion.tr
                                                key={order.id}
                                                className="hover:bg-primary-25 transition-all duration-300 border-b border-gray-100"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: index * 0.05,
                                                }}
                                                whileHover={{ scale: 1.01 }}
                                            >
                                                <td className="px-4 md:px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end">
                                                        <span className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                            {index + 1}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 md:px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <div>
                                                            <div className="font-zar text-sm md:text-base font-semibold text-gray-900">
                                                                {
                                                                    order.user
                                                                        ?.name
                                                                }
                                                            </div>
                                                            <div className="font-zar text-xs text-gray-500">
                                                                {
                                                                    order.user
                                                                        ?.email
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                                            <FaUser className="text-primary-600 text-sm" />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 md:px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <span className="font-zar text-sm md:text-base text-gray-900 font-medium">
                                                            {order.phone}
                                                        </span>
                                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                            <FaPhone className="text-green-600 text-xs" />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 md:px-6 py-4 text-right hidden lg:table-cell">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <span className="font-zar text-sm text-gray-700 max-w-xs truncate">
                                                            {order.address}
                                                        </span>
                                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                            <FaMapMarkerAlt className="text-blue-600 text-xs" />
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-4 md:px-6 py-4 text-right hidden md:table-cell">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <span className="font-zar text-sm text-gray-600">
                                                            {new Date(
                                                                order.created_at
                                                            ).toLocaleDateString(
                                                                "fa-IR"
                                                            )}
                                                        </span>
                                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                            <FaCalendarAlt className="text-purple-600 text-xs" />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 md:px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <motion.button
                                                            onClick={() =>
                                                                handleViewOrder(
                                                                    order.id
                                                                )
                                                            }
                                                            className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-lg text-xs font-bold font-zar transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
                                                            whileHover={{
                                                                scale: 1.05,
                                                            }}
                                                            whileTap={{
                                                                scale: 0.95,
                                                            }}
                                                        >
                                                            <FaEye className="text-xs" />
                                                            لیدل
                                                        </motion.button>
                                                        <motion.button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    order
                                                                )
                                                            }
                                                            className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs transition-all duration-300 shadow-md hover:shadow-lg"
                                                            whileHover={{
                                                                scale: 1.05,
                                                            }}
                                                            whileTap={{
                                                                scale: 0.95,
                                                            }}
                                                        >
                                                            <FaTrash className="text-xs" />
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-6 py-12 text-center"
                                            >
                                                <motion.div
                                                    className="flex flex-col items-center justify-center gap-4"
                                                    initial={{
                                                        opacity: 0,
                                                        y: 20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.5,
                                                    }}
                                                >
                                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                        <FaCog className="text-gray-400 text-2xl" />
                                                    </div>
                                                    <div className="text-center">
                                                        <h3 className="text-lg font-bold text-gray-600 font-zar mb-2">
                                                            هیڅ فرمایش ونه موندل
                                                            شو
                                                        </h3>
                                                        <p className="text-sm text-gray-500 font-zar">
                                                            د لټون شرایط بدل کړئ
                                                            یا نوی فرمایش انتظار
                                                            وکړئ
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Delete Modal */}
                    <DeleteModal
                        isOpen={showDeleteModal}
                        onClose={cancelDelete}
                        onConfirm={confirmDelete}
                        title="د فرمایش حذف کول"
                        message={`آیا تاسو ډاډه یاست چې غواړئ د "${orderToDelete?.user?.name}" فرمایش حذف کړئ؟ دا عمل نشي بیرته کیدی.`}
                        isLoading={isDeleting}
                    />
                </div>
            </div>
        </SystemLayout>
    );
};

export default CustomerOrder;

import { useState, useEffect } from "react";
import SystemLayout from "@/Layouts/SystemLayout";
import { usePage, router } from "@inertiajs/react";
import { FaTrash, FaArrowRight } from "react-icons/fa";
import SearchBar from "@/Components/SearchBar";

const CustomerOrder = ({ orders, order, message }) => {
    const { props } = usePage();
    const user = props.auth.user;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOrders, setFilteredOrders] = useState(orders || []);

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

    const handleDelete = (id) => {
        if (window.confirm("آیا تاسو غواړئ دا فرمایش حذف کړئ؟")) {
            router.delete(route("customer.orders.destroy", id), {
                onSuccess: () => {
                    // Refresh the page after successful deletion
                    window.location.reload();
                },
                onError: (errors) => {
                    console.error("Error deleting order:", errors);
                },
            });
        }
    };

    const handleAcceptOrder = (orderId) => {
        router.put(route("customer.orders.update", orderId), {
            status: "accepted",
        });
    };

    const handleRejectOrder = (orderId) => {
        router.delete(route("customer.orders.destroy", orderId));
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
                                            حالت:
                                        </span>
                                        <span
                                            className={`ml-2 px-3 py-1 rounded-full text-sm ${
                                                order.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : order.status ===
                                                      "accepted"
                                                    ? "bg-green-100 text-green-800"
                                                    : order.status ===
                                                      "completed"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {order.status === "pending"
                                                ? "په انتظار کې"
                                                : order.status === "accepted"
                                                ? "منل شوی"
                                                : order.status === "completed"
                                                ? "مکمل شوی"
                                                : "په پروسه کې"}
                                        </span>
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
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <div className="relative flex-1">
                            <SearchBar
                                placeholder="د نوم، بریښنالیک یا تلیفون په اساس لټون..."
                                onSearch={handleSearch}
                                initialValue={searchTerm}
                                className="w-full"
                            />
                        </div>
                        <h1 className="text-xl md:text-3xl font-bold text-gray-800">
                            د فرمایشونو لیست
                        </h1>
                    </div>

                    <div className="overflow-x-auto border-0.5 border-tertiary-200 rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        د فرمایش شمیره
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        د پیرودونکي نوم
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        تلیفون
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        آدرس
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        حالت
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                        د ثبت نیټه
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        عملې
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order, index) => (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-3 md:px-6 py-4 text-right whitespace-nowrap">
                                                <div className="font-zar text-sm md:text-xl text-gray-900">
                                                    {index + 1}
                                                </div>
                                            </td>
                                            <td className="px-3 md:px-6 py-4 text-right whitespace-nowrap">
                                                <div className="font-zar text-sm md:text-xl text-gray-900">
                                                    {order.user?.name}
                                                </div>
                                            </td>
                                            <td className="px-3 md:px-6 py-4 text-right whitespace-nowrap">
                                                <div className="font-zar text-sm md:text-xl text-gray-900">
                                                    {order.phone}
                                                </div>
                                            </td>
                                            <td className="px-3 md:px-6 py-4 text-right whitespace-nowrap">
                                                <div className="font-zar text-sm md:text-xl text-gray-900">
                                                    {order.address}
                                                </div>
                                            </td>
                                            <td className="px-3 md:px-6 py-4 text-right whitespace-nowrap">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-zar ${
                                                        order.status ===
                                                        "pending"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : order.status ===
                                                              "accepted"
                                                            ? "bg-green-100 text-green-800"
                                                            : order.status ===
                                                              "completed"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {order.status === "pending"
                                                        ? "په انتظار کې"
                                                        : order.status ===
                                                          "accepted"
                                                        ? "منل شوی"
                                                        : order.status ===
                                                          "completed"
                                                        ? "مکمل شوی"
                                                        : "په پروسه کې"}
                                                </span>
                                            </td>
                                            <td className="px-3 md:px-6 py-4 whitespace-nowrap font-zar text-sm md:text-xl text-gray-500 hidden md:table-cell">
                                                {new Date(
                                                    order.created_at
                                                ).toLocaleDateString("fa-IR")}
                                            </td>
                                            <td className="px-3 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {order.status === "pending" ? (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() =>
                                                                handleAcceptOrder(
                                                                    order.id
                                                                )
                                                            }
                                                            className="text-green-600 hover:text-green-900"
                                                        >
                                                            منل
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleRejectOrder(
                                                                    order.id
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            ردول
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                order.id
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <FaTrash className="inline-block" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-6 py-4 text-center text-gray-500 font-zar"
                                        >
                                            هیڅ فرمایش ونه موندل شو
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </SystemLayout>
    );
};

export default CustomerOrder;

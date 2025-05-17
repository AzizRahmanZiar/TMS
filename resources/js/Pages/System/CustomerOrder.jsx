import { useState, useEffect } from "react";
import SystemLayout from "@/Layouts/SystemLayout";
import { usePage, router } from "@inertiajs/react";
import { FaTrash } from "react-icons/fa";
import SearchBar from "@/Components/SearchBar";
import { useOrder } from "@/Contexts/OrderContext";

const CustomerOrder = () => {
    const { order } = useOrder();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOrders, setFilteredOrders] = useState(order || []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = order.filter(
                (ord) =>
                    ord.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    ord.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredOrders(filtered);
        } else {
            setFilteredOrders(order);
        }
    }, [searchTerm, order]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handleDelete = (id) => {
        if (window.confirm("آیا تاسو غواړئ دا فرمایش حذف کړئ؟")) {
            router.delete(route("order.destroy", id), {
                onSuccess: () => {
                    alert("فرمایش په بریالیتوب سره حذف شو");
                },
            });
        }
    };

    return (
        <SystemLayout>
            <div className="p-3 md:p-6" dir="rtl">
                <div className="bg-white rounded-2xl border-0.5 border-tertiary-200 p-3 md:p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <div className="relative flex-1">
                            <SearchBar
                                placeholder="د نوم یا بریښنالیک په اساس لټون..."
                                onSearch={handleSearch}
                                initialValue={searchTerm}
                                className="w-full"
                            />
                        </div>
                        <h1 className="text-xl md:text-3xl font-bold text-gray-800">
                            دآرډرونو لیست
                        </h1>
                    </div>

                    <div className="overflow-x-auto border-0.5 border-tertiary-200 rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        نوم
                                    </th>
                                    <th className="px-3 md:pl-20 py-3 text-left font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        بریښنالیک
                                    </th>

                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        مبایل
                                    </th>

                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        ادرس
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
                                    filteredOrders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-3 md:pl-20 py-4 text-right whitespace-nowrap">
                                                <div className="font-zar text-sm md:text-xl text-gray-900 truncate max-w-[100px] md:max-w-none">
                                                    {order.name}
                                                </div>
                                            </td>
                                            <td className="px-3 md:pl-20 py-4 text-left whitespace-nowrap">
                                                <div className="font-zar text-sm md:text-xl text-gray-900 truncate max-w-[100px] md:max-w-none">
                                                    {order.email}
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
                                            <td className="px-3 md:px-6 py-4 whitespace-nowrap font-zar text-sm md:text-xl text-gray-500 hidden md:table-cell">
                                                {new Date(
                                                    order.created_at
                                                ).toLocaleDateString("fa-IR")}
                                            </td>

                                            <td className="px-3 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(order.id)
                                                    }
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <FaTrash className="inline-block" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
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

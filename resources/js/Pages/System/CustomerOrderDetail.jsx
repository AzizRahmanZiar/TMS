import SystemLayout from "@/Layouts/SystemLayout";
import { usePage } from "@inertiajs/react";
import { FaArrowRight } from "react-icons/fa";

const CustomerOrderDetail = ({ order }) => {
    const { auth } = usePage().props;

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
                            <h2 className="text-lg font-semibold mb-4">د پیرودونکي معلومات</h2>
                            <div className="space-y-2">
                                <p><span className="font-semibold">نوم:</span> {order.user?.name}</p>
                                <p><span className="font-semibold">بریښنالیک:</span> {order.user?.email}</p>
                                <p><span className="font-semibold">تلیفون:</span> {order.phone}</p>
                                <p><span className="font-semibold">آدرس:</span> {order.address}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h2 className="text-lg font-semibold mb-4">د فرمایش معلومات</h2>
                            <div className="space-y-2">
                                <p><span className="font-semibold">د فرمایش شمیره:</span> #{order.id}</p>
                                <p><span className="font-semibold">حالت:</span> 
                                    <span className={`ml-2 px-3 py-1 rounded-full text-sm ${
                                        order.status === "pending"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : order.status === "accepted"
                                            ? "bg-green-100 text-green-800"
                                            : order.status === "completed"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-100 text-gray-800"
                                    }`}>
                                        {order.status === "pending"
                                            ? "په انتظار کې"
                                            : order.status === "accepted"
                                            ? "منل شوی"
                                            : order.status === "completed"
                                            ? "مکمل شوی"
                                            : "په پروسه کې"}
                                    </span>
                                </p>
                                <p><span className="font-semibold">د ثبت نیټه:</span> {new Date(order.created_at).toLocaleString('fa-IR')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SystemLayout>
    );
};

export default CustomerOrderDetail; 
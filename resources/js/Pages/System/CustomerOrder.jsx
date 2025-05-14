import { useState, useEffect } from "react";
import SystemLayout from "@/Layouts/SystemLayout";
import { usePage, router } from "@inertiajs/react";
import { FaTrash } from "react-icons/fa";

const CustomerOrder = () => {
    return (
        <SystemLayout>
            <div className="p-3 md:p-6" dir="rtl">
                <div className="bg-white rounded-2xl border-0.5 border-tertiary-200 p-3 md:p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <div className="relative w-full md:w-auto">
                            <input
                                type="text"
                                name="search"
                                placeholder="لټون..."
                                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                value=""
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

                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                        د ثبت نیټه
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        عملې
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-3 md:pl-20 py-4 text-right whitespace-nowrap">
                                        <div className="font-zar text-sm md:text-xl text-gray-900 truncate max-w-[100px] md:max-w-none">
                                            عزیز الرحمن
                                        </div>
                                    </td>
                                    <td className="px-3 md:pl-20 py-4 text-left whitespace-nowrap">
                                        <div className="font-zar text-sm md:text-xl text-gray-900 truncate max-w-[100px] md:max-w-none">
                                            azizziar1401@gmail.com
                                        </div>
                                    </td>

                                    <td className="px-3 md:px-6 py-4 whitespace-nowrap font-zar text-sm md:text-xl text-gray-500 hidden md:table-cell">
                                        2089
                                    </td>
                                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-red-600 hover:text-red-900">
                                            <FaTrash className="inline-block" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </SystemLayout>
    );
};

export default CustomerOrder;

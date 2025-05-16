import { useState, useEffect } from "react";
import SystemLayout from "@/Layouts/SystemLayout";
import { useMessages } from "@/Contexts/MessagesContext";
import { FaTrash } from "react-icons/fa";
import SearchBar from "@/Components/SearchBar";

const Messages = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { messages, setMessages } = useMessages();
    const [filteredMessages, setFilteredMessages] = useState(messages);

    useEffect(() => {
        if (searchTerm) {
            const filtered = messages.filter(
                (message) =>
                    message.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    message.email
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    message.subject
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
            setFilteredMessages(filtered);
        } else {
            setFilteredMessages(messages);
        }
    }, [searchTerm, messages]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handleDelete = (id) => {
        if (window.confirm("آیا تاسو غواړئ دا پیغام حذف کړئ؟")) {
            setMessages(messages.filter((message) => message.id !== id));
        }
    };

    return (
        <SystemLayout>
            <div className="p-3 md:p-6" dir="rtl">
                <div className="bg-white rounded-2xl border-0.5 border-tertiary-200 p-3 md:p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <div className="relative flex-1">
                            <SearchBar
                                placeholder="د نوم، بریښنالیک یا موضوع په اساس لټون..."
                                onSearch={handleSearch}
                                initialValue={searchTerm}
                                className="w-full"
                            />
                        </div>
                        <h1 className="text-xl md:text-3xl font-bold text-gray-800">
                            د پیغامونو لیست
                        </h1>
                    </div>

                    <div className="overflow-x-auto border-0.5 border-tertiary-200 rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        نوم
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        بریښنالیک
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        موضوع
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        پیغام
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
                                {filteredMessages.length > 0 ? (
                                    filteredMessages.map((message) => (
                                        <tr
                                            key={message.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-3 md:px-6 py-4 text-right whitespace-nowrap">
                                                <div className="font-zar text-sm md:text-xl text-gray-900">
                                                    {message.name}
                                                </div>
                                            </td>
                                            <td className="px-3 md:px-6 py-4 text-right whitespace-nowrap">
                                                <div className="font-zar text-sm md:text-xl text-gray-900">
                                                    {message.email}
                                                </div>
                                            </td>
                                            <td className="px-3 md:px-6 py-4 text-right whitespace-nowrap">
                                                <div className="font-zar text-sm md:text-xl text-gray-900">
                                                    {message.subject}
                                                </div>
                                            </td>
                                            <td className="px-3 md:px-6 py-4 text-right">
                                                <div className="font-zar text-sm md:text-xl text-gray-900 max-w-xs truncate">
                                                    {message.message}
                                                </div>
                                            </td>
                                            <td className="px-3 md:px-6 py-4 whitespace-nowrap font-zar text-sm md:text-xl text-gray-500 hidden md:table-cell">
                                                {new Date(
                                                    message.created_at
                                                ).toLocaleDateString("fa-IR")}
                                            </td>
                                            <td className="px-3 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(message.id)
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
                                            هیڅ پیغام ونه موندل شو
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

export default Messages;

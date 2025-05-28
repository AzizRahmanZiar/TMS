import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SystemLayout from "@/Layouts/SystemLayout";
import {
    FaTrash,
    FaEnvelope,
    FaUser,
    FaPhone,
    FaCalendarAlt,
    FaComments,
} from "react-icons/fa";
import { MdDelete, MdSubject } from "react-icons/md";
import SearchBar from "@/Components/SearchBar";
import DeleteModal from "@/Components/DeleteModal";
import { router, usePage } from "@inertiajs/react";
import { toast } from "react-hot-toast";

const Messages = () => {
    const { messages } = usePage().props;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMessages, setFilteredMessages] = useState(messages || []);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (searchTerm) {
            const filtered = messages.filter(
                (message) =>
                    message.phone
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    message.subject
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    message.message
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    message.user?.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    message.user?.email
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    message.user?.role
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
            setFilteredMessages(filtered);
        } else {
            setFilteredMessages(messages || []);
        }
    }, [searchTerm, messages]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handleDeleteClick = (message) => {
        setMessageToDelete(message);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (!messageToDelete) return;

        setIsDeleting(true);
        router.delete(route("messages.destroy", messageToDelete.id), {
            onSuccess: () => {
                toast.success("پیغام په بریالیتوب سره حذف شو");
                setShowDeleteModal(false);
                setMessageToDelete(null);
                setIsDeleting(false);
            },
            onError: () => {
                toast.error("د پیغام حذف کولو کې ستونزه رامنځته شوه");
                setIsDeleting(false);
            },
        });
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setMessageToDelete(null);
        setIsDeleting(false);
    };

    return (
        <SystemLayout>
            <div
                className="p-6 bg-gradient-to-br from-gray-50 to-primary-25 min-h-screen"
                dir="rtl"
            >
                {/* Modern Header */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 text-white shadow-2xl">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center gap-4 mb-4 md:mb-0">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                    <FaComments className="text-white text-2xl" />
                                </div>
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold font-zar mb-2">
                                        د پیغامونو لیست
                                    </h1>
                                    <p className="text-white/80 text-lg font-zar">
                                        د ټولو پیغامونو لیست او مدیریت
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-96">
                                <SearchBar
                                    placeholder="د نوم، بریښنالیک، تلیفون، موضوع یا پیغام په اساس لټون..."
                                    onSearch={handleSearch}
                                    initialValue={searchTerm}
                                    className="w-full"
                                />
                            </div>
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
                                            <span>نوم</span>
                                            <FaUser className="text-primary-600" />
                                        </div>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200 hidden lg:table-cell">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>بریښنالیک</span>
                                            <FaEnvelope className="text-primary-600" />
                                        </div>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200 hidden md:table-cell">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>رول</span>
                                            <FaUser className="text-primary-600" />
                                        </div>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>تلیفون</span>
                                            <FaPhone className="text-primary-600" />
                                        </div>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>موضوع</span>
                                            <MdSubject className="text-primary-600" />
                                        </div>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>پیغام</span>
                                            <FaComments className="text-primary-600" />
                                        </div>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200 hidden xl:table-cell">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>د ثبت نیټه</span>
                                            <FaCalendarAlt className="text-primary-600" />
                                        </div>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>عملیات</span>
                                            <MdDelete className="text-primary-600" />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {filteredMessages &&
                                filteredMessages.length > 0 ? (
                                    filteredMessages.map((message, index) => (
                                        <motion.tr
                                            key={message.id}
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
                                                <div className="flex items-center justify-end gap-3">
                                                    <div>
                                                        <div className="font-zar text-sm md:text-base font-semibold text-gray-900">
                                                            {message.user
                                                                ?.name ||
                                                                "نامعلوم"}
                                                        </div>
                                                        <div className="text-xs text-gray-500 font-zar">
                                                            پیغام لیږونکی
                                                        </div>
                                                    </div>
                                                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                                        <FaUser className="text-primary-600 text-sm" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 text-right hidden lg:table-cell">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className="font-zar text-sm text-gray-900 font-medium truncate max-w-[150px]">
                                                        {message.user?.email ||
                                                            "نامعلوم"}
                                                    </span>
                                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                        <FaEnvelope className="text-purple-600 text-xs" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 text-right hidden md:table-cell">
                                                <div className="flex items-center justify-end">
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold font-zar border border-blue-200">
                                                        {message.user?.role ||
                                                            "مشتری"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className="font-zar text-sm text-gray-900 font-medium">
                                                        {message.phone}
                                                    </span>
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                        <FaPhone className="text-green-600 text-xs" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className="font-zar text-sm text-gray-900 font-medium truncate max-w-[120px]">
                                                        {message.subject}
                                                    </span>
                                                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                                        <MdSubject className="text-orange-600 text-xs" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className="font-zar text-sm text-gray-900 max-w-[150px] truncate">
                                                        {message.message}
                                                    </span>
                                                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                                        <FaComments className="text-indigo-600 text-xs" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 text-right hidden xl:table-cell">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className="text-sm text-gray-600 font-zar">
                                                        {new Date(
                                                            message.created_at
                                                        ).toLocaleDateString()}
                                                    </span>
                                                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                                        <FaCalendarAlt className="text-yellow-600 text-xs" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 text-right">
                                                <div className="flex items-center justify-end">
                                                    <motion.button
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                message
                                                            )
                                                        }
                                                        className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs transition-all duration-300 shadow-md hover:shadow-lg"
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                        title="حذف کول"
                                                    >
                                                        <MdDelete className="text-sm" />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="px-6 py-12 text-center"
                                        >
                                            <motion.div
                                                className="flex flex-col items-center justify-center gap-4"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <FaComments className="text-gray-400 text-2xl" />
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="text-lg font-bold text-gray-600 font-zar mb-2">
                                                        هیڅ پیغام ونه موندل شو
                                                    </h3>
                                                    <p className="text-sm text-gray-500 font-zar">
                                                        د لټون شرایط بدل کړئ یا
                                                        نوی پیغام انتظار وکړئ
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Modern Footer */}
                    <div className="px-6 py-4 bg-gradient-to-r from-primary-50 to-secondary-50 border-t border-primary-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                    <FaComments className="text-primary-600 text-sm" />
                                </div>
                                <span className="font-zar text-primary-800 font-semibold">
                                    ټول
                                    <span className="font-zar mx-2 text-primary-600 font-bold">
                                        {filteredMessages.length}
                                    </span>
                                    پیغامونه
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-gray-600 font-zar">
                                    نوي پیغامونه
                                </span>
                                <div className="w-3 h-3 bg-blue-500 rounded-full ml-3"></div>
                                <span className="text-xs text-gray-600 font-zar">
                                    لیدل شوي
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Delete Modal */}
                <DeleteModal
                    isOpen={showDeleteModal}
                    onClose={cancelDelete}
                    onConfirm={handleDeleteConfirm}
                    title="د پیغام حذف کول"
                    message={`آیا تاسو ډاډه یاست چې غواړئ د "${
                        messageToDelete?.user?.name || "نامعلوم"
                    }" پیغام حذف کړئ؟ دا عمل نشي بیرته کیدی.`}
                    isLoading={isDeleting}
                />
            </div>
        </SystemLayout>
    );
};

export default Messages;

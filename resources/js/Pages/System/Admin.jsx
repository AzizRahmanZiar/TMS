import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SystemLayout from "@/Layouts/SystemLayout";
import { usePage, router } from "@inertiajs/react";
import {
    FaTrash,
    FaUser,
    FaUserTie,
    FaUserShield,
    FaCalendarAlt,
    FaEnvelope,
    FaUsers,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SearchBar from "@/Components/SearchBar";
import DeleteModal from "@/Components/DeleteModal";
import { toast } from "react-hot-toast";

const Admin = () => {
    const pageProps = usePage().props;
    console.log("All page props:", pageProps);

    const { users = [] } = pageProps;
    console.log("Users from props:", users);

    const [searchTerm, setSearchTerm] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Debug the users data
    useEffect(() => {
        console.log("Users data in component:", users);
    }, [users]);

    // Filter users based on search term
    const filteredUsers = users.filter((user) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            user.name.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower) ||
            user.role.toLowerCase().includes(searchLower)
        );
    });

    console.log("Filtered users:", filteredUsers);

    // Handle delete user
    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (!userToDelete) return;

        setIsDeleting(true);
        router.delete(route("user.delete", userToDelete.id), {
            onSuccess: () => {
                toast.success("کارکوونکی په بریالیتوب سره حذف شو");
                setShowDeleteModal(false);
                setUserToDelete(null);
                setIsDeleting(false);
            },
            onError: (errors) => {
                toast.error("د کارکوونکي حذف کولو کې ستونزه رامنځته شوه");
                setIsDeleting(false);
                console.error("Error deleting user:", errors);
            },
        });
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setUserToDelete(null);
        setIsDeleting(false);
    };

    // // Get role icon based on user role
    const getRoleIcon = (role) => {
        switch (role) {
            case "admin":
                return <FaUserShield className="text-blue-500" />;
            case "tailor":
                return <FaUserTie className="text-green-500" />;
            default:
                return <FaUser className="text-gray-500" />;
        }
    };

    // Get role text in Pashto
    const getRoleText = (role) => {
        switch (role) {
            case "admin":
                return "اډمین";
            case "tailor":
                return "خیاط";
            default:
                return "مشتــــري";
        }
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
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
                                    <FaUsers className="text-white text-2xl" />
                                </div>
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold font-zar mb-2">
                                        د کار کوونکو مدیریت
                                    </h1>
                                    <p className="text-white/80 text-lg font-zar">
                                        د ټولو کارکوونکو لیست او مدیریت
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-96">
                                <SearchBar
                                    placeholder="د نوم، بریښنالیک یا رول په اساس لټون..."
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
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>بریښنالیک</span>
                                            <FaEnvelope className="text-primary-600" />
                                        </div>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>رول</span>
                                            <FaUserShield className="text-primary-600" />
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
                                            <MdDelete className="text-primary-600" />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {filteredUsers.map((user, index) => (
                                    <motion.tr
                                        key={user.id}
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
                                                        {user.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 font-zar">
                                                        کارکوونکی
                                                    </div>
                                                </div>
                                                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                                                    {user.role === "admin" && (
                                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                            <FaUserShield className="text-blue-600 text-lg" />
                                                        </div>
                                                    )}
                                                    {user.role === "tailor" && (
                                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                                            <FaUserTie className="text-green-600 text-lg" />
                                                        </div>
                                                    )}
                                                    {user.role !== "admin" &&
                                                        user.role !==
                                                            "tailor" && (
                                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                                                <FaUser className="text-gray-600 text-lg" />
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <span className="font-zar text-sm md:text-base text-gray-900 font-medium truncate max-w-[150px] md:max-w-none">
                                                    {user.email}
                                                </span>
                                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                    <FaEnvelope className="text-purple-600 text-xs" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-right">
                                            <div className="flex items-center justify-end">
                                                {user.role === "admin" && (
                                                    <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs font-bold font-zar border border-blue-200">
                                                        اډمین
                                                    </span>
                                                )}
                                                {user.role === "tailor" && (
                                                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-xs font-bold font-zar border border-green-200">
                                                        خیاط
                                                    </span>
                                                )}
                                                {user.role !== "admin" &&
                                                    user.role !== "tailor" && (
                                                        <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-xs font-bold font-zar border border-gray-200">
                                                            مشتری
                                                        </span>
                                                    )}
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-right hidden md:table-cell">
                                            <div className="flex items-center justify-end gap-2">
                                                <span className="text-sm text-gray-600 font-zar">
                                                    {new Date(
                                                        user.created_at
                                                    ).toLocaleDateString()}
                                                </span>
                                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                                    <FaCalendarAlt className="text-orange-600 text-xs" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-right">
                                            <div className="flex items-center justify-end">
                                                <motion.button
                                                    onClick={() =>
                                                        handleDeleteClick(user)
                                                    }
                                                    className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs transition-all duration-300 shadow-md hover:shadow-lg"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    title="حذف کول"
                                                >
                                                    <MdDelete className="text-sm" />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Modern Footer */}
                    <div className="px-6 py-4 bg-gradient-to-r from-primary-50 to-secondary-50 border-t border-primary-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                    <FaUsers className="text-primary-600 text-sm" />
                                </div>
                                <span className="font-zar text-primary-800 font-semibold">
                                    ټول
                                    <span className="font-zar mx-2 text-primary-600 font-bold">
                                        {filteredUsers.length}
                                    </span>
                                    کارکوونکي
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-xs text-gray-600 font-zar">
                                    اډمین
                                </span>
                                <div className="w-3 h-3 bg-green-500 rounded-full ml-3"></div>
                                <span className="text-xs text-gray-600 font-zar">
                                    خیاط
                                </span>
                                <div className="w-3 h-3 bg-gray-500 rounded-full ml-3"></div>
                                <span className="text-xs text-gray-600 font-zar">
                                    مشتری
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
                    title="د کارکوونکي حذف کول"
                    message={`آیا تاسو ډاډه یاست چې غواړئ د "${userToDelete?.name}" کارکوونکی حذف کړئ؟ دا عمل نشي بیرته کیدی.`}
                    isLoading={isDeleting}
                />
            </div>
        </SystemLayout>
    );
};

export default Admin;

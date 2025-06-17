import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
    MdDelete,
    MdClose,
    MdCheck,
    MdEdit,
    MdVisibility,
} from "react-icons/md";
import { FaSort, FaSortUp, FaSortDown, FaRegEdit } from "react-icons/fa";
import { useUniform } from "@/Contexts/UniformContext";
import SystemLayout from "@/Layouts/SystemLayout";
import SearchBar from "@/Components/SearchBar";
import SystemButtons from "@/Components/SystemButtons";
import DeleteModal from "@/Components/DeleteModal";
import { router, usePage } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";

const Uniform = ({ uniforms: initialUniforms }) => {
    const { uniform, setUniform } = useUniform();
    const { flash } = usePage().props;
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [uniformToDelete, setUniformToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });
    const [activeTab, setActiveTab] = useState("all");
    const modalRef = useRef(null);

    // New state for details modal
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const [formData, setFormData] = useState({
        nom: "",
        mobile: "",
        yakhun_qak: "",
        patlun: "",
        ghara: "",
        zegar: "",
        lstoony: "",
        rawrul_tareekh: "",
        tasleem_tareekh: "",
        tidad: "",
        money: "",
        index: null,
        id: null,
    });

    const [errors, setErrors] = useState({});

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen]);

    // Initialize uniforms from props
    useEffect(() => {
        if (initialUniforms) {
            setUniform(
                initialUniforms.map((uniform) => ({
                    ...uniform,
                    disabled:
                        uniform.tasleem_tareekh !== null &&
                        uniform.tasleem_tareekh !== "",
                }))
            );
        }
    }, [initialUniforms]);

    // Handle flash messages
    useEffect(() => {
        if (flash.success) {
            showToast(flash.success, "success");
        }
    }, [flash]);

    const handleAddClick = () => {
        setIsEditing(false);
        setModalOpen(true);
        resetFormData();
    };

    const resetFormData = () => {
        setFormData({
            nom: "",
            mobile: "",
            yakhun_qak: "",
            patlun: "",
            ghara: "",
            zegar: "",
            lstoony: "",
            rawrul_tareekh: "",
            tasleem_tareekh: "",
            tidad: "",
            money: "",
            index: null,
            id: null,
        });
        setErrors({});
    };

    const closeModal = () => {
        setModalOpen(false);
        setDeleteModalOpen(false);
        setShowDetailsModal(false);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleUpdate = (index) => {
        setIsEditing(true);
        setModalOpen(true);
        const uniformData = uniform[index];

        // Format dates to YYYY-MM-DD for input fields
        const formattedData = {
            ...uniformData,
            rawrul_tareekh: uniformData.rawrul_tareekh
                ? new Date(uniformData.rawrul_tareekh)
                      .toISOString()
                      .split("T")[0]
                : "",
            tasleem_tareekh: uniformData.tasleem_tareekh
                ? new Date(uniformData.tasleem_tareekh)
                      .toISOString()
                      .split("T")[0]
                : "",
            index,
            id: uniformData.id,
        };

        setFormData(formattedData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            router.put(`/uniforms/${formData.id}`, formData, {
                onSuccess: () => {
                    showToast("ریکارډ په بریالیتوب سره تازه شو", "success");
                    closeModal();
                },
                onError: (errors) => {
                    // Inertia validation errors are automatically handled
                    setErrors(errors);
                    showToast(
                        "د ریکارډ تازه کولو کې ستونزه رامنځته شوه",
                        "error"
                    );
                },
            });
        } else {
            router.post("/uniforms", formData, {
                onSuccess: () => {
                    showToast("ریکارډ په بریالیتوب سره اضافه شو", "success");
                    closeModal();
                },
                onError: (errors) => {
                    // Inertia validation errors are automatically handled
                    setErrors(errors);
                    showToast(
                        "د ریکارډ اضافه کولو کې ستونزه رامنځته شوه",
                        "error"
                    );
                },
            });
        }
    };

    const handleDeleteClick = (uniformItem) => {
        setUniformToDelete(uniformItem);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (!uniformToDelete) return;

        setIsDeleting(true);
        router.delete(`/uniforms/${uniformToDelete.id}`, {
            onSuccess: () => {
                showToast("ریکارډ په بریالیتوب سره حذف شو", "success");
                setShowDeleteModal(false);
                setUniformToDelete(null);
                setIsDeleting(false);
            },
            onError: () => {
                showToast("د ریکارډ حذف کولو کې ستونزه رامنځته شوه", "error");
                setIsDeleting(false);
            },
        });
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setUniformToDelete(null);
        setIsDeleting(false);
    };

    const handleShowDetails = (row) => {
        setSelectedRow(row);
        setShowDetailsModal(true);
    };

    const handleViewRecord = (row) => {
        setSelectedRow(row);
        setShowViewModal(true);
    };

    // Toast notification
    const [toast, setToast] = useState({
        visible: false,
        message: "",
        type: "success",
    });

    const showToast = (message, type = "success") => {
        setToast({ visible: true, message, type });
        setTimeout(() => {
            setToast({ visible: false, message: "", type: "success" });
        }, 3000);
    };

    // Sorting function
    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (columnName) => {
        if (sortConfig.key !== columnName)
            return <FaSort className="inline ml-1" />;
        return sortConfig.direction === "asc" ? (
            <FaSortUp className="inline ml-1" />
        ) : (
            <FaSortDown className="inline ml-1" />
        );
    };

    // Filter data based on search term and active tab
    const filteredData = uniform
        .filter((row) => {
            const matchesSearch =
                row.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.mobile.includes(searchTerm);

            if (activeTab === "all") return matchesSearch;
            if (activeTab === "active") return matchesSearch && !row.disabled;
            if (activeTab === "completed") return matchesSearch && row.disabled;

            return matchesSearch;
        })
        .sort((a, b) => {
            if (!sortConfig.key) return 0;

            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        });

    // Measurement fields for display in the details modal
    const measurementFields = [
        { id: "yakhun_qak", label: "یخن قاک" },
        { id: "patlun", label: "پتلون" },
        { id: "ghara", label: "غاړه" },
        { id: "zegar", label: "ځګر" },
        { id: "lstoony", label: "لسټوڼي" },
    ];

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    // Add this after your existing filtered uniforms logic
    const filteredUniforms = filteredData.filter((uniform) =>
        Object.values(uniform).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUniforms.slice(
        indexOfFirstItem,
        indexOfLastItem
    );
    const totalItems = filteredUniforms.length;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <SystemLayout>
            <div className="p-6">
                {/* Header Section */}
                <motion.div
                    className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-6 mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl md:text-3xl font-bold text-white font-zar">
                                د درشي د مشتریانو لیست
                            </h1>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <div className="w-full md:w-96">
                                <SearchBar
                                    placeholder="د نوم یا مبایل نمبر په اساس لټون..."
                                    onSearch={handleSearch}
                                    initialValue={searchTerm}
                                    className="w-full"
                                />
                            </div>
                            <motion.button
                                onClick={handleAddClick}
                                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-300 font-semibold font-zar flex items-center gap-2 shadow-lg hover:shadow-xl border border-white/30"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                نوی ریکارډ
                            </motion.button>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="mt-6 flex gap-2 justify-center md:justify-start">
                        <motion.button
                            onClick={() => setActiveTab("all")}
                            className={`px-4 py-2 rounded-lg font-semibold font-zar transition-all duration-300 ${
                                activeTab === "all"
                                    ? "bg-white text-primary-600 shadow-md"
                                    : "bg-white/20 text-white hover:bg-white/30"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            ټول
                        </motion.button>
                        <motion.button
                            onClick={() => setActiveTab("active")}
                            className={`px-4 py-2 rounded-lg font-semibold font-zar transition-all duration-300 ${
                                activeTab === "active"
                                    ? "bg-white text-primary-600 shadow-md"
                                    : "bg-white/20 text-white hover:bg-white/30"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            فعال
                        </motion.button>
                        <motion.button
                            onClick={() => setActiveTab("completed")}
                            className={`px-4 py-2 rounded-lg font-semibold font-zar transition-all duration-300 ${
                                activeTab === "completed"
                                    ? "bg-white text-primary-600 shadow-md"
                                    : "bg-white/20 text-white hover:bg-white/30"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            بشپړ شوي
                        </motion.button>
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
                                        <span>نوم</span>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                        <span>مبایل</span>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200 hidden md:table-cell">
                                        <span>د راوړلو تاریخ</span>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                        <span>د تسلیمولو تاریخ</span>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200 hidden sm:table-cell">
                                        <span>تعداد</span>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                        <span>پیسې</span>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                        <span>عملیې</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentItems.map((row, index) => (
                                    <motion.tr
                                        key={row.id}
                                        className={`hover:bg-primary-25 transition-all duration-300 border-b border-gray-100 ${
                                            row.disabled
                                                ? "bg-purple-50/50"
                                                : ""
                                        }`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: index * 0.05,
                                        }}
                                    >
                                        <td className="px-4 md:px-6 py-4 text-right">
                                            <div className="flex items-center  gap-3">
                                                <div>
                                                    <div className="font-zar text-sm md:text-base font-semibold text-gray-900">
                                                        {row.nom}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-right">
                                            <div className="flex items-center  gap-2">
                                                <span className="font-zar text-sm md:text-base text-gray-900 font-medium">
                                                    {row.mobile}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-right hidden md:table-cell">
                                            <div className="flex items-center  gap-2">
                                                <span className="text-sm text-gray-600 font-zar">
                                                    {row.rawrul_tareekh}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-right">
                                            <div className="flex items-center ">
                                                {row.tasleem_tareekh ? (
                                                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-xs font-bold font-zar border border-green-200 flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        {row.tasleem_tareekh}
                                                    </span>
                                                ) : (
                                                    <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold font-zar border border-yellow-200 flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                                        نه دی تسلیم شوی
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-right hidden sm:table-cell">
                                            <div className="flex items-center ">
                                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold font-zar border border-green-200">
                                                    {row.tidad}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-right">
                                            <div className="flex items-center  gap-2">
                                                <span className="font-zar text-sm md:text-base text-gray-900 font-bold">
                                                    {row.money} افغانۍ
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-right">
                                            <div className="flex items-center  gap-3">
                                                <motion.button
                                                    onClick={() =>
                                                        handleViewRecord(row)
                                                    }
                                                    className=" text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                                    whileHover={{
                                                        scale: 1.1,
                                                    }}
                                                    whileTap={{
                                                        scale: 0.9,
                                                    }}
                                                    title="لیدل"
                                                >
                                                    <MdVisibility className="text-lg h-5 w-5" />
                                                </motion.button>
                                                <motion.button
                                                    onClick={() =>
                                                        handleUpdate(index)
                                                    }
                                                    disabled={row.disabled}
                                                    className={` transition-colors duration-200 ${
                                                        row.disabled
                                                            ? "text-gray-400 cursor-not-allowed"
                                                            : "text-green-600 hover:text-green-800"
                                                    }`}
                                                    whileHover={
                                                        !row.disabled
                                                            ? {
                                                                  scale: 1.1,
                                                              }
                                                            : {}
                                                    }
                                                    whileTap={
                                                        !row.disabled
                                                            ? {
                                                                  scale: 0.9,
                                                              }
                                                            : {}
                                                    }
                                                    title={
                                                        row.disabled
                                                            ? "تسلیم شوي ریکارډونه نشي سمولی"
                                                            : "سمول"
                                                    }
                                                >
                                                    <FaRegEdit className="text-lg h-5 w-5" />
                                                </motion.button>
                                                <motion.button
                                                    onClick={() =>
                                                        handleDeleteClick(row)
                                                    }
                                                    className=" text-red-600 hover:text-red-800 transition-colors duration-200"
                                                    whileHover={{
                                                        scale: 1.1,
                                                    }}
                                                    whileTap={{
                                                        scale: 0.9,
                                                    }}
                                                    title="حذف کول"
                                                >
                                                    <MdDelete className="text-lg h-5 w-5" />
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
                                <span className="font-zar text-primary-800 font-semibold">
                                    ټول
                                    <span className="font-zar mx-2 text-primary-600 font-bold">
                                        {totalItems}
                                    </span>
                                    ریکارډونه
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-gray-600 font-zar">
                                    تسلیم شوي
                                </span>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full ml-3"></div>
                                <span className="text-xs text-gray-600 font-zar">
                                    په انتظار کې
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Add/Edit Modal */}
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            ref={modalRef}
                            className="bg-gradient-to-br from-white to-primary-50 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto border border-primary-200"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{
                                duration: 0.3,
                                type: "spring",
                                damping: 20,
                            }}
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6 rounded-t-2xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-xl font-bold font-zar">
                                            {isEditing
                                                ? "ریکارډ سمول"
                                                : "نوی ریکارډ"}
                                        </h2>
                                    </div>
                                    <motion.button
                                        type="button"
                                        onClick={closeModal}
                                        className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors duration-200"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <MdClose className="text-white text-lg" />
                                    </motion.button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8">
                                <div className="space-y-8">
                                    {/* Personal Information Section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-200"
                                    >
                                        <h3 className="text-lg font-bold text-primary-800 mb-6 font-zar">
                                            د پیرودونکي معلومات
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="space-y-3"
                                            >
                                                <label className="block text-sm font-bold text-primary-800 font-zar">
                                                    نوم
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        id="nom"
                                                        type="text"
                                                        name="nom"
                                                        value={
                                                            formData.nom || ""
                                                        }
                                                        onChange={handleChange}
                                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm font-zar text-right ${
                                                            errors.nom
                                                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                                : "border-primary-200 focus:border-primary-500 focus:ring-primary-200"
                                                        }`}
                                                        placeholder="د پیرودونکي نوم"
                                                    />
                                                </div>
                                                {errors.nom && (
                                                    <motion.p
                                                        className="text-sm text-red-600 font-zar"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                    >
                                                        {errors.nom}
                                                    </motion.p>
                                                )}
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="space-y-3"
                                            >
                                                <label className="block text-sm font-bold text-primary-800 font-zar">
                                                    مبایل نمبر
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        id="mobile"
                                                        type="text"
                                                        name="mobile"
                                                        value={
                                                            formData.mobile ||
                                                            ""
                                                        }
                                                        onChange={handleChange}
                                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm font-zar text-right ${
                                                            errors.mobile
                                                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                                : "border-primary-200 focus:border-primary-500 focus:ring-primary-200"
                                                        }`}
                                                        placeholder="د بیلګې په توګه: 0701234567"
                                                    />
                                                </div>
                                                {errors.mobile && (
                                                    <motion.p
                                                        className="text-sm text-red-600 font-zar"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                    >
                                                        {errors.mobile}
                                                    </motion.p>
                                                )}
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4 }}
                                                className="space-y-3"
                                            >
                                                <label className="block text-sm font-bold text-primary-800 font-zar">
                                                    پیسې
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        id="money"
                                                        type="text"
                                                        name="money"
                                                        value={
                                                            formData.money || ""
                                                        }
                                                        onChange={handleChange}
                                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm font-zar text-right ${
                                                            errors.money
                                                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                                : "border-primary-200 focus:border-primary-500 focus:ring-primary-200"
                                                        }`}
                                                        placeholder="د بیلګې په توګه: 5000"
                                                    />
                                                </div>
                                                {errors.money && (
                                                    <motion.p
                                                        className="text-sm text-red-600 font-zar"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                    >
                                                        {errors.money}
                                                    </motion.p>
                                                )}
                                            </motion.div>
                                        </div>
                                    </motion.div>

                                    {/* Measurements Section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-200"
                                    >
                                        <h3 className="text-lg font-bold text-primary-800 mb-6 font-zar">
                                            اندازې او تعداد
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {[
                                                {
                                                    id: "yakhun_qak",
                                                    label: "یخن قاک",
                                                    placeholder:
                                                        "د بیلګې په توګه: 40",
                                                },
                                                {
                                                    id: "patlun",
                                                    label: "پتلون",
                                                    placeholder:
                                                        "د بیلګې په توګه: 32",
                                                },
                                                {
                                                    id: "ghara",
                                                    label: "غاړه",
                                                    placeholder:
                                                        "د بیلګې په توګه: 16",
                                                },
                                                {
                                                    id: "zegar",
                                                    label: "ځګر",
                                                    placeholder:
                                                        "د بیلګې په توګه: 40",
                                                },
                                                {
                                                    id: "lstoony",
                                                    label: "لسټوڼي",
                                                    placeholder:
                                                        "د بیلګې په توګه: 24",
                                                },
                                                {
                                                    id: "tidad",
                                                    label: "تعداد",
                                                    placeholder:
                                                        "د بیلګې په توګه: 2",
                                                },
                                            ].map((field, index) => (
                                                <motion.div
                                                    key={field.id}
                                                    initial={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay:
                                                            0.3 + index * 0.1,
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <label className="block text-sm font-bold text-primary-800 font-zar">
                                                        {field.label}
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            id={field.id}
                                                            type="number"
                                                            name={field.id}
                                                            value={
                                                                formData[
                                                                    field.id
                                                                ]
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm font-zar text-right ${
                                                                errors[field.id]
                                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                                    : "border-primary-200 focus:border-primary-500 focus:ring-primary-200"
                                                            }`}
                                                            placeholder={
                                                                field.placeholder
                                                            }
                                                        />
                                                    </div>
                                                    {errors[field.id] && (
                                                        <motion.p
                                                            className="text-sm text-red-600 font-zar"
                                                            initial={{
                                                                opacity: 0,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                            }}
                                                        >
                                                            {errors[field.id]}
                                                        </motion.p>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Dates Section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-200"
                                    >
                                        <h3 className="text-lg font-bold text-primary-800 mb-6 font-zar">
                                            تاریخونه
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4 }}
                                                className="space-y-3"
                                            >
                                                <label className="block text-sm font-bold text-primary-800 font-zar">
                                                    د راوړلو تاریخ
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        id="rawrul_tareekh"
                                                        type="date"
                                                        name="rawrul_tareekh"
                                                        value={
                                                            formData.rawrul_tareekh ||
                                                            ""
                                                        }
                                                        onChange={handleChange}
                                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm font-zar ${
                                                            errors.rawrul_tareekh
                                                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                                : "border-primary-200 focus:border-primary-500 focus:ring-primary-200"
                                                        }`}
                                                    />
                                                </div>
                                                {errors.rawrul_tareekh && (
                                                    <motion.p
                                                        className="text-sm text-red-600 font-zar"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                    >
                                                        {errors.rawrul_tareekh}
                                                    </motion.p>
                                                )}
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5 }}
                                                className="space-y-3"
                                            >
                                                <label className="block text-sm font-bold text-primary-800 font-zar">
                                                    د تسلیمولو تاریخ
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        id="tasleem_tareekh"
                                                        type="date"
                                                        name="tasleem_tareekh"
                                                        value={
                                                            formData.tasleem_tareekh ||
                                                            ""
                                                        }
                                                        onChange={handleChange}
                                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm font-zar ${
                                                            errors.tasleem_tareekh
                                                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                                : "border-primary-200 focus:border-primary-500 focus:ring-primary-200"
                                                        }`}
                                                    />
                                                </div>
                                                {errors.tasleem_tareekh && (
                                                    <motion.p
                                                        className="text-sm text-red-600 font-zar"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                    >
                                                        {errors.tasleem_tareekh}
                                                    </motion.p>
                                                )}
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.div
                                    className="mt-10 flex gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <motion.button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold font-zar"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        لغو کول
                                    </motion.button>
                                    <motion.button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white rounded-xl transition-all duration-300 font-semibold font-zar shadow-lg hover:shadow-xl"
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {isEditing ? "تازه کول" : "ثبت کول"}
                                    </motion.button>
                                </motion.div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}

                {/* Delete Confirmation Modal */}
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                            <div className="bg-red-600 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
                                <h2 className="text-xl font-bold">
                                    د ریکارډ حذف کول
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="text-white hover:bg-red-700 rounded-full p-1"
                                >
                                    <MdClose className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="bg-red-100 rounded-full p-3 mr-4">
                                        <MdDelete className="h-6 w-6 text-red-600" />
                                    </div>
                                    <p className="text-gray-700">
                                        آیا تاسو ډاډه یاست چې غواړئ دا ریکارډ
                                        حذف کړئ؟ دا عمل نشي بیرته کیدی.
                                    </p>
                                </div>

                                <div className="flex  space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        لغو کول
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDeleteConfirm}
                                        className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        حذف کول
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Details Modal */}
                {showDetailsModal && selectedRow && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                            <div className="bg-green-600 text-white px-6 py-2 flex justify-between items-center rounded-t-lg">
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="text-white hover:bg-green-700 rounded-full p-1"
                                >
                                    <MdClose className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        اندازې
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {measurementFields.map((field) => (
                                            <div
                                                key={field.id}
                                                className="bg-gray-50 p-3 rounded-lg"
                                            >
                                                <p className="text-gray-500 text-xs">
                                                    {field.label}
                                                </p>
                                                <p className="text-gray-900 font-medium">
                                                    {selectedRow[field.id]}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Toast Notification */}
                {toast.visible && (
                    <div
                        className={`fixed bottom-4 left-10 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center ${
                            toast.type === "success"
                                ? "bg-green-600 text-white"
                                : "bg-red-600 text-white"
                        }`}
                    >
                        {toast.type === "success" ? (
                            <MdCheck className="mr-2 h-5 w-5" />
                        ) : (
                            <MdClose className="mr-2 h-5 w-5" />
                        )}
                        <span>{toast.message}</span>
                    </div>
                )}

                {/* View Record Modal */}
                {showViewModal && selectedRow && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div
                            className="bg-gradient-to-br from-white to-primary-50 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto border border-primary-200"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-2xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-xl font-bold font-zar">
                                            د ریکارډ تفصیلات
                                        </h2>
                                    </div>
                                    <motion.button
                                        type="button"
                                        onClick={() => setShowViewModal(false)}
                                        className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors duration-200"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <MdClose className="text-white text-lg" />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-8">
                                {/* Personal Information */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-200"
                                >
                                    <h3 className="text-lg font-bold text-primary-800 mb-6 font-zar">
                                        د پیرودونکي معلومات
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-primary-800 font-zar">
                                                نوم
                                            </label>
                                            <p className="text-gray-900 font-zar bg-gray-50 p-3 rounded-lg">
                                                {selectedRow.nom}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-primary-800 font-zar">
                                                مبایل نمبر
                                            </label>
                                            <p className="text-gray-900 font-zar bg-gray-50 p-3 rounded-lg">
                                                {selectedRow.mobile}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-primary-800 font-zar">
                                                پیسې
                                            </label>
                                            <p className="text-gray-900 font-zar bg-gray-50 p-3 rounded-lg">
                                                {selectedRow.money} افغانۍ
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Dates */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-200"
                                >
                                    <h3 className="text-lg font-bold text-primary-800 mb-6 font-zar">
                                        تاریخونه
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-primary-800 font-zar">
                                                د راوړلو تاریخ
                                            </label>
                                            <p className="text-gray-900 font-zar bg-gray-50 p-3 rounded-lg">
                                                {selectedRow.rawrul_tareekh}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-primary-800 font-zar">
                                                د تسلیمولو تاریخ
                                            </label>
                                            <p className="text-gray-900 font-zar bg-gray-50 p-3 rounded-lg">
                                                {selectedRow.tasleem_tareekh}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Measurements */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-200"
                                >
                                    <h3 className="text-lg font-bold text-primary-800 mb-6 font-zar">
                                        اندازې او تعداد
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {[
                                            {
                                                name: "yakhun_qak",
                                                label: "یخن قاک",
                                            },
                                            { name: "patlun", label: "پتلون" },
                                            { name: "ghara", label: "غاړه" },
                                            { name: "zegar", label: "ځګر" },
                                            {
                                                name: "lstoony",
                                                label: "لسټوڼي",
                                            },
                                            { name: "tidad", label: "تعداد" },
                                        ].map((field) => (
                                            <div
                                                key={field.name}
                                                className="space-y-2"
                                            >
                                                <label className="block text-sm font-bold text-primary-800 font-zar">
                                                    {field.label}
                                                </label>
                                                <p className="text-gray-900 font-zar bg-gray-50 p-3 rounded-lg">
                                                    {selectedRow[field.name] ||
                                                        "نه دی ورکړل شوی"}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 bg-gray-50 rounded-b-2xl">
                                <motion.button
                                    type="button"
                                    onClick={() => setShowViewModal(false)}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-xl transition-all duration-300 font-semibold font-zar shadow-lg hover:shadow-xl"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    تړل
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Delete Modal */}
                <DeleteModal
                    isOpen={showDeleteModal}
                    onClose={cancelDelete}
                    onConfirm={handleDeleteConfirm}
                    title="د ریکارډ حذف کول"
                    message={`آیا تاسو ډاډه یاست چې غواړئ د "${uniformToDelete?.nom}" ریکارډ حذف کړئ؟ دا عمل نشي بیرته کیدی.`}
                    isLoading={isDeleting}
                />

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </SystemLayout>
    );
};

export default Uniform;

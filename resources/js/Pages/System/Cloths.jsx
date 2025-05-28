import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
    MdDelete,
    MdClose,
    MdCheck,
    MdOutlineCheckBox,
    MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import {
    FaUser,
    FaPhone,
    FaRuler,
    FaCalendarAlt,
    FaMoneyBill,
} from "react-icons/fa";

import { useCloths } from "@/Contexts/ClothsContext";
import SystemLayout from "@/Layouts/SystemLayout";
import SearchBar from "@/Components/SearchBar";
import SystemButtons from "@/Components/SystemButtons";
import DeleteModal from "@/Components/DeleteModal";
import { router, useForm } from "@inertiajs/react";
import TextInput from "@/Components/Form/TextInput";
import InputLabel from "@/Components/Form/InputLabel";

const Cloths = ({ cloths: initialCloths }) => {
    const { cloths, setCloths } = useCloths();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [clothToDelete, setClothToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const [activeTab, setActiveTab] = useState("all");
    const modalRef = useRef(null);

    const { data, setData, post, put, errors, reset } = useForm({
        nom: "",
        mobile: "",
        qadd: "",
        shana: "",
        ghara: "",
        zegar: "",
        lstoony: "",
        partog: "",
        pai_tsa: "",
        lastoni: false,
        lastoni_goti: false,
        bin: false,
        bin_kat: false,
        makh_jib: false,
        tarikhzi: false,
        kalari: false,
        shabazi: false,
        arabi: false,
        lemen: false,
        lastoni_2: false,
        rawrul_tareekh: "",
        tasleem_tareekh: "",
        tidad: "",
        money: "",
    });

    const [editingId, setEditingId] = useState(null);

    // New state variables
    const [showFeaturesModal, setShowFeaturesModal] = useState(false);
    const [showMeasurementsModal, setShowMeasurementsModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    // Initialize cloths from props
    useEffect(() => {
        if (initialCloths) {
            setCloths(
                initialCloths.map((cloth) => ({
                    ...cloth,
                    disabled:
                        cloth.tasleem_tareekh !== null &&
                        cloth.tasleem_tareekh !== "",
                }))
            );
        }
    }, [initialCloths]);

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

    const handleAddClick = () => {
        setIsEditing(false);
        setModalOpen(true);
        resetFormData();
    };

    const resetFormData = () => {
        reset();
    };

    const closeModal = () => {
        setModalOpen(false);
        setDeleteModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(name, type === "checkbox" ? checked : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/cloths", {
            onSuccess: (page) => {
                // Update the local cloths state with the new data
                if (page.props.cloths) {
                    setCloths(
                        page.props.cloths.map((cloth) => ({
                            ...cloth,
                            disabled:
                                cloth.tasleem_tareekh !== null &&
                                cloth.tasleem_tareekh !== "",
                        }))
                    );
                }
                showToast("ریکارډ په بریالیتوب سره اضافه شو", "success");
                closeModal();
                reset();
            },
            onError: (errors) => {
                console.log("Create errors:", errors);
                showToast("د ریکارډ اضافه کولو کې ستونزه رامنځته شوه", "error");
            },
        });
    };

    const handleEditClick = (index) => {
        setIsEditing(true);
        setModalOpen(true);
        const cloth = cloths[index];
        setEditingId(cloth.id);

        // Format dates and set form data
        setData({
            nom: cloth.nom || "",
            mobile: cloth.mobile || "",
            qadd: cloth.qadd || "",
            shana: cloth.shana || "",
            ghara: cloth.ghara || "",
            zegar: cloth.zegar || "",
            lstoony: cloth.lstoony || "",
            partog: cloth.partog || "",
            pai_tsa: cloth.pai_tsa || "",
            lastoni: cloth.lastoni || false,
            lastoni_goti: cloth.lastoni_goti || false,
            bin: cloth.bin || false,
            bin_kat: cloth.bin_kat || false,
            makh_jib: cloth.makh_jib || false,
            tarikhzi: cloth.tarikhzi || false,
            kalari: cloth.kalari || false,
            shabazi: cloth.shabazi || false,
            arabi: cloth.arabi || false,
            lemen: cloth.lemen || false,
            lastoni_2: cloth.lastoni_2 || false,
            rawrul_tareekh: cloth.rawrul_tareekh
                ? new Date(cloth.rawrul_tareekh).toISOString().split("T")[0]
                : "",
            tasleem_tareekh: cloth.tasleem_tareekh
                ? new Date(cloth.tasleem_tareekh).toISOString().split("T")[0]
                : "",
            tidad: cloth.tidad || "",
            money: cloth.money || "",
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        put(`/cloths/${editingId}`, {
            onSuccess: (page) => {
                // Update the local cloths state with the new data
                if (page.props.cloths) {
                    setCloths(
                        page.props.cloths.map((cloth) => ({
                            ...cloth,
                            disabled:
                                cloth.tasleem_tareekh !== null &&
                                cloth.tasleem_tareekh !== "",
                        }))
                    );
                }
                showToast("ریکارډ په بریالیتوب سره تازه شو", "success");
                closeModal();
                reset();
                setEditingId(null);
            },
            onError: (errors) => {
                console.log("Update errors:", errors);
                showToast("د ریکارډ تازه کولو کې ستونزه رامنځته شوه", "error");
            },
        });
    };

    const handleDeleteClick = (cloth) => {
        setClothToDelete(cloth);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!clothToDelete) return;

        setIsDeleting(true);
        router.delete(`/cloths/${clothToDelete.id}`, {
            onSuccess: () => {
                showToast("ریکارډ په بریالیتوب سره حذف شو", "success");
                setShowDeleteModal(false);
                setClothToDelete(null);
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
        setClothToDelete(null);
        setIsDeleting(false);
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

    // Filter data based on search term and active tab
    const filteredData = cloths.filter((row) => {
        const matchesSearch =
            row.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.mobile.includes(searchTerm);

        if (activeTab === "all") return matchesSearch;
        if (activeTab === "active") return matchesSearch && !row.disabled;
        if (activeTab === "completed") return matchesSearch && row.disabled;

        return matchesSearch;
    });

    // Group checkboxes for better UI organization
    const checkboxGroups = [
        {
            title: "د کمیس خصوصیات",
            items: [
                { name: "lastoni", label: "لستوڼي" },
                { name: "lastoni_goti", label: "لستوڼي غوټۍ" },
                { name: "bin", label: "بین" },
                { name: "bin_kat", label: "بین کاټ" },
                { name: "makh_jib", label: "د مخ جیب" },
            ],
        },
        {
            title: "د ډیزاین خصوصیات",
            items: [
                { name: "tarikhzi", label: "ترخزي" },
                { name: "kalari", label: "کالري" },
                { name: "shabazi", label: "شابازي" },
                { name: "arabi", label: "عربي" },
                { name: "lemen", label: "لمن" },
                { name: "lastoni_2", label: "لستوڼي" },
            ],
        },
    ];

    // New handler functions
    const handleShowFeatures = (row) => {
        setSelectedRow(row);
        setShowFeaturesModal(true);
    };

    const handleShowMeasurements = (row) => {
        setSelectedRow(row);
        setShowMeasurementsModal(true);
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    // Add formatDate helper function
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
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
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                <FaUser className="text-white text-xl" />
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white font-zar">
                                د جامو د مشتریانو لیست
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
                                <FaUser className="text-sm" />
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
                                        <div className="flex items-center justify-end gap-2">
                                            <span>نوم</span>
                                            <FaUser className="text-primary-600" />
                                        </div>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>مبایل</span>
                                            <FaPhone className="text-primary-600" />
                                        </div>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>اندازې</span>
                                            <FaRuler className="text-primary-600" />
                                        </div>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200 hidden lg:table-cell">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>خصوصیات</span>
                                            <div className="w-3 h-3 rounded-full bg-primary-600"></div>
                                        </div>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200 hidden md:table-cell">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>د راوړلو تاریخ</span>
                                            <FaCalendarAlt className="text-primary-600" />
                                        </div>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>د تسلیمولو تاریخ</span>
                                            <FaCalendarAlt className="text-primary-600" />
                                        </div>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200 hidden sm:table-cell">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>تعداد</span>
                                            <div className="w-3 h-3 rounded-full bg-primary-600"></div>
                                        </div>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>پیسې</span>
                                            <FaMoneyBill className="text-primary-600" />
                                        </div>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>عملیات</span>
                                            <FaRuler className="text-primary-600" />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {filteredData.length > 0 ? (
                                    filteredData.map((row, index) => (
                                        <motion.tr
                                            key={index}
                                            className={`hover:bg-primary-25 transition-all duration-300 border-b border-gray-100 ${
                                                row.disabled
                                                    ? "bg-blue-50/50"
                                                    : ""
                                            }`}
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
                                                            {row.nom}
                                                        </div>
                                                        <div className="text-xs text-gray-500 font-zar">
                                                            مشتری
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
                                                        {row.mobile}
                                                    </span>
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                        <FaPhone className="text-green-600 text-xs" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 text-right">
                                                <div className="flex flex-wrap items-center justify-end gap-2">
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold font-zar border border-blue-200">
                                                        قد: {row.qadd}
                                                    </span>
                                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold font-zar border border-green-200">
                                                        شانه: {row.shana}
                                                    </span>
                                                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold font-zar border border-purple-200">
                                                        غاړه: {row.ghara}
                                                    </span>
                                                    <motion.button
                                                        onClick={() =>
                                                            handleShowMeasurements(
                                                                row
                                                            )
                                                        }
                                                        className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold font-zar border border-indigo-200 hover:bg-indigo-200 transition-colors duration-200"
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                    >
                                                        نور...
                                                    </motion.button>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 text-right hidden lg:table-cell">
                                                <div className="flex flex-wrap items-center justify-end gap-2">
                                                    {row.lastoni && (
                                                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold font-zar border border-indigo-200">
                                                            لستوڼي
                                                        </span>
                                                    )}
                                                    {row.bin && (
                                                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold font-zar border border-green-200">
                                                            بین
                                                        </span>
                                                    )}
                                                    {row.kalari && (
                                                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold font-zar border border-yellow-200">
                                                            کالري
                                                        </span>
                                                    )}
                                                    {(row.lastoni_goti ||
                                                        row.bin_kat ||
                                                        row.makh_jib ||
                                                        row.tarikhzi ||
                                                        row.shabazi ||
                                                        row.arabi ||
                                                        row.lemen ||
                                                        row.lastoni_2) && (
                                                        <motion.button
                                                            onClick={() =>
                                                                handleShowFeatures(
                                                                    row
                                                                )
                                                            }
                                                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold font-zar border border-blue-200 hover:bg-blue-200 transition-colors duration-200"
                                                            whileHover={{
                                                                scale: 1.05,
                                                            }}
                                                            whileTap={{
                                                                scale: 0.95,
                                                            }}
                                                        >
                                                            نور...
                                                        </motion.button>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 text-right hidden md:table-cell">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className="text-sm text-gray-600 font-zar">
                                                        {formatDate(
                                                            row.rawrul_tareekh
                                                        )}
                                                    </span>
                                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                        <FaCalendarAlt className="text-purple-600 text-xs" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 text-right">
                                                <div className="flex items-center justify-end">
                                                    {row.tasleem_tareekh ? (
                                                        <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-xs font-bold font-zar border border-green-200 flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                            {formatDate(
                                                                row.tasleem_tareekh
                                                            )}
                                                        </span>
                                                    ) : (
                                                        <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold font-zar border border-yellow-200 flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                                            نه دی تسلیم سوی
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 text-right hidden sm:table-cell">
                                                <div className="flex items-center justify-end">
                                                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold font-zar border border-orange-200">
                                                        {row.tidad}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className="font-zar text-sm md:text-base text-gray-900 font-bold">
                                                        {row.money} افغانۍ
                                                    </span>
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                        <FaMoneyBill className="text-green-600 text-xs" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <motion.button
                                                        onClick={() =>
                                                            handleEditClick(
                                                                index
                                                            )
                                                        }
                                                        disabled={row.disabled}
                                                        className={`px-4 py-2 rounded-lg text-xs font-bold font-zar transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg ${
                                                            row.disabled
                                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                                : "bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white"
                                                        }`}
                                                        whileHover={
                                                            !row.disabled
                                                                ? {
                                                                      scale: 1.05,
                                                                  }
                                                                : {}
                                                        }
                                                        whileTap={
                                                            !row.disabled
                                                                ? {
                                                                      scale: 0.95,
                                                                  }
                                                                : {}
                                                        }
                                                        title={
                                                            row.disabled
                                                                ? "تسلیم شوي ریکارډونه نشي سمولی"
                                                                : "سمول"
                                                        }
                                                    >
                                                        <FaRuler className="text-xs" />
                                                        سمول
                                                    </motion.button>
                                                    <motion.button
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                row
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
                                            colSpan="9"
                                            className="px-6 py-12 text-center"
                                        >
                                            <motion.div
                                                className="flex flex-col items-center justify-center gap-4"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <FaUser className="text-gray-400 text-2xl" />
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="text-lg font-bold text-gray-600 font-zar mb-2">
                                                        هیڅ ریکارډ ونه موندل شو
                                                    </h3>
                                                    <p className="text-sm text-gray-500 font-zar">
                                                        د لټون شرایط بدل کړئ یا
                                                        نوی ریکارډ اضافه کړئ
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
                                    <FaUser className="text-primary-600 text-sm" />
                                </div>
                                <span className="font-zar text-primary-800 font-semibold">
                                    ټول
                                    <span className="font-zar mx-2 text-primary-600 font-bold">
                                        {filteredData.length}
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
                                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                            <FaUser className="text-white text-lg" />
                                        </div>
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

                            <form
                                onSubmit={
                                    isEditing ? handleUpdate : handleSubmit
                                }
                                className="p-8"
                            >
                                <div className="space-y-8">
                                    {/* Personal Information Section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-200"
                                    >
                                        <h3 className="text-lg font-bold text-primary-800 mb-6 font-zar flex items-center gap-2">
                                            <FaUser className="text-primary-600" />
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
                                                        name="nom"
                                                        value={data.nom}
                                                        onChange={handleChange}
                                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm font-zar text-right ${
                                                            errors.nom
                                                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                                : "border-primary-200 focus:border-primary-500 focus:ring-primary-200"
                                                        }`}
                                                        placeholder="د پیرودونکي نوم"
                                                    />
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FaUser className="h-5 w-5 text-primary-400" />
                                                    </div>
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
                                                        name="mobile"
                                                        value={data.mobile}
                                                        onChange={handleChange}
                                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm font-zar text-right ${
                                                            errors.mobile
                                                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                                : "border-primary-200 focus:border-primary-500 focus:ring-primary-200"
                                                        }`}
                                                        placeholder="د بیلګې په توګه: 0701234567"
                                                    />
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FaPhone className="h-5 w-5 text-primary-400" />
                                                    </div>
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
                                                        name="money"
                                                        value={data.money}
                                                        onChange={handleChange}
                                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm font-zar text-right ${
                                                            errors.money
                                                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                                : "border-primary-200 focus:border-primary-500 focus:ring-primary-200"
                                                        }`}
                                                        placeholder="د بیلګې په توګه: 5000"
                                                    />
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FaMoneyBill className="h-5 w-5 text-primary-400" />
                                                    </div>
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
                                        <h3 className="text-lg font-bold text-primary-800 mb-6 font-zar flex items-center gap-2">
                                            <FaRuler className="text-primary-600" />
                                            اندازې
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {[
                                                {
                                                    name: "qadd",
                                                    label: "قد",
                                                    placeholder:
                                                        "د بیلګې په توګه: 42",
                                                },
                                                {
                                                    name: "shana",
                                                    label: "شانه",
                                                    placeholder:
                                                        "د بیلګې په توګه: 18",
                                                },
                                                {
                                                    name: "ghara",
                                                    label: "غاړه",
                                                    placeholder:
                                                        "د بیلګې په توګه: 16",
                                                },
                                                {
                                                    name: "zegar",
                                                    label: "ځګر",
                                                    placeholder:
                                                        "د بیلګې په توګه: 40",
                                                },
                                                {
                                                    name: "lstoony",
                                                    label: "لستوڼي اندازه",
                                                    placeholder:
                                                        "د بیلګې په توګه: 24",
                                                },
                                                {
                                                    name: "partog",
                                                    label: "پرتوګ",
                                                    placeholder:
                                                        "د بیلګې په توګه: 42",
                                                },
                                                {
                                                    name: "pai_tsa",
                                                    label: "پایڅه",
                                                    placeholder:
                                                        "د بیلګې په توګه: 12",
                                                },
                                                {
                                                    name: "tidad",
                                                    label: "تعداد",
                                                    placeholder:
                                                        "د بیلګې په توګه: 2",
                                                },
                                            ].map((field, index) => (
                                                <motion.div
                                                    key={field.name}
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
                                                            id={field.name}
                                                            type="number"
                                                            name={field.name}
                                                            value={
                                                                data[field.name]
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            min="0"
                                                            max="999"
                                                            step={
                                                                field.name ===
                                                                "tidad"
                                                                    ? "1"
                                                                    : "0.1"
                                                            }
                                                            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm font-zar text-right ${
                                                                errors[
                                                                    field.name
                                                                ]
                                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                                    : "border-primary-200 focus:border-primary-500 focus:ring-primary-200"
                                                            }`}
                                                            placeholder={
                                                                field.placeholder
                                                            }
                                                        />
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <FaRuler className="h-5 w-5 text-primary-400" />
                                                        </div>
                                                    </div>
                                                    {errors[field.name] && (
                                                        <motion.p
                                                            className="text-sm text-red-600 font-zar"
                                                            initial={{
                                                                opacity: 0,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                            }}
                                                        >
                                                            {errors[field.name]}
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
                                        <h3 className="text-lg font-bold text-primary-800 mb-6 font-zar flex items-center gap-2">
                                            <FaCalendarAlt className="text-primary-600" />
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
                                                            data.rawrul_tareekh
                                                        }
                                                        onChange={handleChange}
                                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm font-zar ${
                                                            errors.rawrul_tareekh
                                                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                                : "border-primary-200 focus:border-primary-500 focus:ring-primary-200"
                                                        }`}
                                                    />
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FaCalendarAlt className="h-5 w-5 text-primary-400" />
                                                    </div>
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
                                                            data.tasleem_tareekh
                                                        }
                                                        onChange={handleChange}
                                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm font-zar ${
                                                            errors.tasleem_tareekh
                                                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                                : "border-primary-200 focus:border-primary-500 focus:ring-primary-200"
                                                        }`}
                                                    />
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FaCalendarAlt className="h-5 w-5 text-primary-400" />
                                                    </div>
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

                                    {/* Features Section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-200"
                                    >
                                        <h3 className="text-lg font-bold text-primary-800 mb-6 font-zar flex items-center gap-2">
                                            <MdOutlineCheckBox className="text-primary-600" />
                                            د جامو خصوصیات
                                        </h3>
                                        <div className="space-y-6">
                                            {checkboxGroups.map(
                                                (group, groupIndex) => (
                                                    <motion.div
                                                        key={groupIndex}
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
                                                                0.5 +
                                                                groupIndex *
                                                                    0.1,
                                                        }}
                                                        className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-xl border border-primary-100"
                                                    >
                                                        <h4 className="font-bold text-primary-800 mb-4 font-zar text-lg">
                                                            {group.title}
                                                        </h4>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                            {group.items.map(
                                                                (
                                                                    item,
                                                                    itemIndex
                                                                ) => (
                                                                    <motion.div
                                                                        key={
                                                                            item.name
                                                                        }
                                                                        initial={{
                                                                            opacity: 0,
                                                                            scale: 0.9,
                                                                        }}
                                                                        animate={{
                                                                            opacity: 1,
                                                                            scale: 1,
                                                                        }}
                                                                        transition={{
                                                                            delay:
                                                                                0.6 +
                                                                                groupIndex *
                                                                                    0.1 +
                                                                                itemIndex *
                                                                                    0.05,
                                                                        }}
                                                                        className="flex items-center p-3 bg-white/80 rounded-lg border border-primary-200 hover:border-primary-300 transition-all duration-200"
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            id={
                                                                                item.name
                                                                            }
                                                                            name={
                                                                                item.name
                                                                            }
                                                                            checked={
                                                                                data[
                                                                                    item
                                                                                        .name
                                                                                ]
                                                                            }
                                                                            onChange={
                                                                                handleChange
                                                                            }
                                                                            className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-primary-300 rounded-md transition-all duration-200"
                                                                        />
                                                                        <label
                                                                            htmlFor={
                                                                                item.name
                                                                            }
                                                                            className="mr-3 block text-sm font-semibold text-primary-800 font-zar cursor-pointer"
                                                                        >
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </label>
                                                                    </motion.div>
                                                                )
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )
                                            )}
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.div
                                    className="mt-10 flex gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
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

                                <div className="flex justify-end gap-4 mt-6">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-zar text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        لغو کول
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDeleteConfirm}
                                        className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-zar text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        حذف کول
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Toast Notification */}
                {toast.visible && (
                    <div
                        className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center ${
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

                {/* Features Modal */}
                {showFeaturesModal && selectedRow && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                            <div className="bg-blue-600 text-white px-6 py-2 flex justify-between items-center rounded-t-lg">
                                <button
                                    onClick={() => setShowFeaturesModal(false)}
                                    className="text-white hover:bg-blue-700 rounded-full p-1"
                                >
                                    <MdClose className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="text-lg font-zar text-gray-900 mb-2">
                                        خصوصیات
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            {
                                                name: "lastoni",
                                                label: "لستوڼي",
                                            },
                                            {
                                                name: "lastoni_goti",
                                                label: "لستوڼي غوټۍ",
                                            },
                                            { name: "bin", label: "بین" },
                                            {
                                                name: "bin_kat",
                                                label: "بین کاټ",
                                            },
                                            {
                                                name: "makh_jib",
                                                label: "د مخ جیب",
                                            },
                                            {
                                                name: "tarikhzi",
                                                label: "ترخزي",
                                            },
                                            { name: "kalari", label: "کالري" },
                                            {
                                                name: "shabazi",
                                                label: "شابازي",
                                            },
                                            { name: "arabi", label: "عربي" },
                                            { name: "lemen", label: "لمن" },
                                            {
                                                name: "lastoni_2",
                                                label: "لستوڼي",
                                            },
                                        ].map((feature) => (
                                            <div
                                                key={feature.name}
                                                className="flex items-center"
                                            >
                                                {selectedRow[feature.name] ? (
                                                    <MdOutlineCheckBox className="text-green-600 ml-1" />
                                                ) : (
                                                    <MdOutlineCheckBoxOutlineBlank className="text-gray-400 ml-1" />
                                                )}
                                                <span
                                                    className={
                                                        selectedRow[
                                                            feature.name
                                                        ]
                                                            ? "text-gray-900"
                                                            : "text-gray-500"
                                                    }
                                                >
                                                    {feature.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Measurements Modal */}
                {showMeasurementsModal && selectedRow && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                            <div className="bg-indigo-600 text-white px-6 py-2 flex justify-between items-center rounded-t-lg">
                                {/* <h2 className="text-xl font-bold">
                                    د جامې اندازې
                                </h2> */}
                                <button
                                    onClick={() =>
                                        setShowMeasurementsModal(false)
                                    }
                                    className="text-white hover:bg-indigo-700 rounded-full p-1"
                                >
                                    <MdClose className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="text-lg font-zar text-gray-900 mb-2">
                                        اندازې
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { name: "qadd", label: "قد" },
                                            { name: "shana", label: "شانه" },
                                            { name: "ghara", label: "غاړه" },
                                            { name: "zegar", label: "ځګر" },
                                            {
                                                name: "lstoony",
                                                label: "لستوڼي اندازه",
                                            },
                                            { name: "partog", label: "پرتوګ" },
                                            { name: "pai_tsa", label: "پایڅه" },
                                        ].map((measurement) => (
                                            <div
                                                key={measurement.name}
                                                className="bg-gray-50 p-3 rounded-lg"
                                            >
                                                <p className="text-gray-500 ">
                                                    {measurement.label}
                                                </p>
                                                <p className="text-gray-900 font-zar">
                                                    {
                                                        selectedRow[
                                                            measurement.name
                                                        ]
                                                    }
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Modal */}
                <DeleteModal
                    isOpen={showDeleteModal}
                    onClose={cancelDelete}
                    onConfirm={handleDeleteConfirm}
                    title="د ریکارډ حذف کول"
                    message={`آیا تاسو ډاډه یاست چې غواړئ د "${clothToDelete?.nom}" ریکارډ حذف کړئ؟ دا عمل نشي بیرته کیدی.`}
                    isLoading={isDeleting}
                />
            </div>
        </SystemLayout>
    );
};

export default Cloths;

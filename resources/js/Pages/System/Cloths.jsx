import { useState, useEffect, useRef } from "react";
import {
    MdDelete,
    MdClose,
    MdCheck,
    MdOutlineCheckBox,
    MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useCloths } from "@/Contexts/ClothsContext";
import SystemLayout from "@/Layouts/SystemLayout";
import SearchBar from "@/Components/SearchBar";
import SystemButtons from "@/Components/SystemButtons";
import { router } from "@inertiajs/react";

const Cloths = ({ cloths: initialCloths }) => {
    const { cloths, setCloths } = useCloths();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });
    const [activeTab, setActiveTab] = useState("all");
    const modalRef = useRef(null);

    const [formData, setFormData] = useState({
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
        index: null,
    });

    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

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
        setFormData({
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
            index: null,
        });
        setErrors({});
        setTouchedFields({});
    };

    const closeModal = () => {
        setModalOpen(false);
        setDeleteModalOpen(false);
    };

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: type === "checkbox" ? checked : value,
        }));

        // Mark field as touched
        setTouchedFields({
            ...touchedFields,
            [id]: true,
        });

        // Validate field on change
        if (touchedFields[id]) {
            const fieldErrors = validateField(
                id,
                type === "checkbox" ? checked : value
            );
            setErrors((prev) => ({
                ...prev,
                [id]: fieldErrors[id],
            }));
        }
    };

    const validateField = (fieldName, value) => {
        const fieldErrors = {};

        // Handle null/undefined values
        if (value === null || value === undefined) {
            value = "";
        }

        // Regex patterns for validation
        const englishNameRegex = /^[a-zA-Z\s]+$/;
        const pashtoNameRegex = /^[\u0600-\u06FF\s]+$/;
        const englishNumberRegex = /^[0-9]+$/;
        const pashtoNumberRegex = /^[۰-۹]+$/;
        const englishPhoneRegex = /^07[0-9]{8}$/;
        const pashtoPhoneRegex = /^٠٧[۰-۹]{8}$/;

        switch (fieldName) {
            case "nom":
                if (!value.toString().trim()) {
                    fieldErrors.nom = "نوم اړین دی";
                } else if (
                    !englishNameRegex.test(value) &&
                    !pashtoNameRegex.test(value)
                ) {
                    fieldErrors.nom =
                        "نوم باید یوازې انګلیسي یا پښتو توري ولري";
                }
                break;

            case "mobile":
                if (!value.toString().trim()) {
                    fieldErrors.mobile = "مبایل نمبر اړین دی";
                } else if (
                    !englishPhoneRegex.test(value) &&
                    !pashtoPhoneRegex.test(value)
                ) {
                    fieldErrors.mobile =
                        "د مبایل نمبر باید 10 رقمه وي او په 07 پیل شي";
                }
                break;

            case "qadd":
            case "shana":
            case "ghara":
            case "zegar":
            case "lstoony":
            case "partog":
            case "pai_tsa":
                if (!value.toString().trim()) {
                    fieldErrors[fieldName] = "دا ساحه اړینه ده";
                } else if (
                    !englishNumberRegex.test(value) &&
                    !pashtoNumberRegex.test(value)
                ) {
                    fieldErrors[fieldName] =
                        "یوازې انګلیسي یا پښتو عددونه وکاروئ";
                }
                break;

            case "tidad":
                if (!value.toString().trim()) {
                    fieldErrors.tidad = "تعداد اړین دی";
                } else if (
                    !englishNumberRegex.test(value) &&
                    !pashtoNumberRegex.test(value)
                ) {
                    fieldErrors.tidad = "یوازې انګلیسي یا پښتو عددونه وکاروئ";
                }
                break;

            case "money":
                if (!value.toString().trim()) {
                    fieldErrors.money = "پیسې اړینې دي";
                } else if (
                    !englishNumberRegex.test(value) &&
                    !pashtoNumberRegex.test(value)
                ) {
                    fieldErrors.money = "یوازې انګلیسي یا پښتو عددونه وکاروئ";
                }
                break;

            case "rawrul_tareekh":
                if (!value) {
                    fieldErrors.rawrul_tareekh = "د راوړلو تاریخ اړین دی";
                }
                break;

            case "tasleem_tareekh":
                if (value) {
                    const rawrulDate = new Date(formData.rawrul_tareekh);
                    const tasleemDate = new Date(value);
                    if (tasleemDate <= rawrulDate) {
                        fieldErrors.tasleem_tareekh =
                            "د تسلیمولو تاریخ باید د راوړلو تاریخ څخه وروسته وي";
                    }
                }
                break;

            default:
                break;
        }

        return fieldErrors;
    };

    const validateInput = (data) => {
        let errors = {};

        // Validate each field
        Object.keys(data).forEach((field) => {
            if (
                field !== "index" &&
                field !== "lastoni" &&
                field !== "lastoni_goti" &&
                field !== "bin" &&
                field !== "bin_kat" &&
                field !== "makh_jib" &&
                field !== "tarikhzi" &&
                field !== "kalari" &&
                field !== "shabazi" &&
                field !== "arabi" &&
                field !== "lemen" &&
                field !== "lastoni_2"
            ) {
                const fieldErrors = validateField(field, data[field]);
                errors = { ...errors, ...fieldErrors };
            }
        });

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mark all fields as touched
        const allTouched = {};
        Object.keys(formData).forEach((key) => {
            allTouched[key] = true;
        });
        setTouchedFields(allTouched);

        const validationErrors = validateInput(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        router.post("/cloths", formData, {
            onSuccess: () => {
                showToast("ریکارډ په بریالیتوب سره اضافه شو", "success");
                closeModal();
            },
            onError: (errors) => {
                setErrors(errors);
                showToast("د ریکارډ اضافه کولو کې ستونزه رامنځته شوه", "error");
            },
        });
    };

    const handleEditClick = (index) => {
        setIsEditing(true);
        setModalOpen(true);
        const cloth = cloths[index];

        // Format dates to YYYY-MM-DD
        const formattedCloth = {
            ...cloth,
            rawrul_tareekh: cloth.rawrul_tareekh
                ? new Date(cloth.rawrul_tareekh).toISOString().split("T")[0]
                : "",
            tasleem_tareekh: cloth.tasleem_tareekh
                ? new Date(cloth.tasleem_tareekh).toISOString().split("T")[0]
                : "",
            index: index,
        };

        setFormData(formattedCloth);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Mark all fields as touched
        const allTouched = {};
        Object.keys(formData).forEach((key) => {
            allTouched[key] = true;
        });
        setTouchedFields(allTouched);

        const validationErrors = validateInput(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        router.put(`/cloths/${cloths[formData.index].id}`, formData, {
            onSuccess: () => {
                showToast("ریکارډ په بریالیتوب سره تازه شو", "success");
                closeModal();
            },
            onError: (errors) => {
                setErrors(errors);
                showToast("د ریکارډ تازه کولو کې ستونزه رامنځته شوه", "error");
            },
        });
    };

    const handleDeleteClick = (index) => {
        setSelectedIndex(index);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        router.delete(`/cloths/${cloths[selectedIndex].id}`, {
            onSuccess: () => {
                showToast("ریکارډ په بریالیتوب سره حذف شو", "success");
                closeModal();
            },
            onError: () => {
                showToast("د ریکارډ حذف کولو کې ستونزه رامنځته شوه", "error");
            },
        });
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
    const filteredData = cloths
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
                <div className="bg-white rounded-lg border p-6 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                        <SystemButtons type="add" onClick={handleAddClick} />
                        <div className="flex items-center gap-5 mb-4 md:mb-0">
                            <h1 className="text-xl md:text-3xl font-bold text-gray-800">
                                د جامو د مشتریانو لیست
                            </h1>
                        </div>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-1">
                            <SearchBar
                                placeholder="د نوم یا مبایل نمبر په اساس لټون..."
                                onSearch={handleSearch}
                                initialValue={searchTerm}
                                className="w-full"
                            />
                        </div>
                        <div className="flex gap-2">
                            <SystemButtons
                                type="all"
                                onClick={() => setActiveTab("all")}
                                isActive={activeTab === "all"}
                            />
                            <SystemButtons
                                type="active"
                                onClick={() => setActiveTab("active")}
                                isActive={activeTab === "active"}
                            />
                            <SystemButtons
                                type="completed"
                                onClick={() => setActiveTab("completed")}
                                isActive={activeTab === "completed"}
                            />
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        نوم
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        مبایل
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        اندازې
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        خصوصیات
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        د راوړلو تاریخ
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        د تسلیمولو تاریخ
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        تعداد
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        پیسې
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        عملیې
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredData.length > 0 ? (
                                    filteredData.map((row, index) => (
                                        <tr
                                            key={index}
                                            className={`hover:bg-gray-50 transition-colors ${
                                                row.disabled ? "bg-blue-50" : ""
                                            }`}
                                        >
                                            <td className="px-4 py-4 text-right text-sm md:text-xl text-gray-500 whitespace-nowrap">
                                                {row.nom}
                                            </td>
                                            <td className="px-4 py-4 text-sm md:text-xl text-gray-500 whitespace-nowrap">
                                                {row.mobile}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className=" text-gray-900">
                                                    <span className="inline-flex text-sm md:text-xl text-gray-500 items-center  py-0.5 rounded-full font-zar   ml-1">
                                                        قد: {row.qadd}
                                                    </span>
                                                    <span className="inline-flex text-sm md:text-xl text-gray-500 items-center px-2.5 py-0.5 rounded-full  font-zar  ml-1">
                                                        شانه: {row.shana}
                                                    </span>
                                                    <span className="inline-flex text-sm md:text-xl text-gray-500 items-center px-2.5 py-0.5 rounded-full  font-zar  ml-1">
                                                        غاړه: {row.ghara}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            handleShowMeasurements(
                                                                row
                                                            )
                                                        }
                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full  text-sm md:text-xl  text-indigo-800 ml-1 cursor-pointer "
                                                    >
                                                        نور...
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="flex flex-wrap gap-1">
                                                    {row.lastoni && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded  text-sm md:text-xl  text-indigo-800">
                                                            لستوڼي
                                                        </span>
                                                    )}
                                                    {row.bin && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-sm md:text-xl text-green-800">
                                                            بین
                                                        </span>
                                                    )}
                                                    {row.kalari && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded  text-sm md:text-xl  bg-yellow-100 text-yellow-800">
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
                                                        <button
                                                            onClick={() =>
                                                                handleShowFeatures(
                                                                    row
                                                                )
                                                            }
                                                            className="inline-flex items-center rounded  text-sm md:text-xl   text-blue-800 cursor-pointer "
                                                        >
                                                            {[
                                                                row.lastoni_goti,
                                                                row.bin_kat,
                                                                row.makh_jib,
                                                                row.tarikhzi,
                                                                row.shabazi,
                                                                row.arabi,
                                                                row.lemen,
                                                                row.lastoni_2,
                                                            ]}
                                                            نور...
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm md:text-xl text-gray-500 whitespace-nowrap">
                                                {formatDate(row.rawrul_tareekh)}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                {row.tasleem_tareekh ? (
                                                    <div className="flex text-sm md:text-xl text-gray-500">
                                                        {formatDate(
                                                            row.tasleem_tareekh
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full  text-sm md:text-xl   text-yellow-800">
                                                        نه دی تسلیم سوی
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                                                {row.tidad}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm md:text-xl text-gray-500">
                                                {row.money} افغانۍ
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm md:text-xl text-gray-500 font-zar">
                                                <div className="flex  space-x-2">
                                                    <SystemButtons
                                                        type="edit"
                                                        onClick={() =>
                                                            handleEditClick(
                                                                index
                                                            )
                                                        }
                                                        disabled={row.disabled}
                                                        icon={true}
                                                        title={
                                                            row.disabled
                                                                ? "تسلیم شوي ریکارډونه نشي سمولی"
                                                                : "سمول"
                                                        }
                                                    />
                                                    <SystemButtons
                                                        type="delete"
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                index
                                                            )
                                                        }
                                                        icon={true}
                                                        title="حذف کول"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="9"
                                            className="px-4 py-8 text-center font-zar font-bold text-gray-500"
                                        >
                                            هیڅ ریکارډ ونه موندل شو
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination - can be implemented if needed */}
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
                        <div className="flex items-center justify-between">
                            <div className=" text-gray-700 font-zar">
                                ټول
                                <span className="font-zar mx-2 ">
                                    {filteredData.length}
                                </span>
                                ریکارډونه
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add/Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <div
                            ref={modalRef}
                            className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto"
                        >
                            <form
                                onSubmit={
                                    isEditing ? handleUpdate : handleSubmit
                                }
                                className="p-6"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="nom"
                                            className="block text-sm font-zar text-gray-700"
                                        >
                                            نوم
                                        </label>
                                        <input
                                            id="nom"
                                            type="text"
                                            name="nom"
                                            value={formData.nom}
                                            onChange={handleChange}
                                            onBlur={() =>
                                                setTouchedFields({
                                                    ...touchedFields,
                                                    nom: true,
                                                })
                                            }
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                                                errors.nom
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 focus:ring-indigo-500"
                                            }`}
                                        />
                                        {errors.nom && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.nom}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="mobile"
                                            className="block text-sm font-zar text-gray-700"
                                        >
                                            مبایل نمبر
                                        </label>
                                        <input
                                            id="mobile"
                                            type="text"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            onBlur={() =>
                                                setTouchedFields({
                                                    ...touchedFields,
                                                    mobile: true,
                                                })
                                            }
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                                                errors.mobile
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 focus:ring-indigo-500"
                                            }`}
                                        />
                                        {errors.mobile && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.mobile}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="money"
                                            className="block text-sm font-zar text-gray-700"
                                        >
                                            پیسې
                                        </label>
                                        <input
                                            id="money"
                                            type="text"
                                            name="money"
                                            value={formData.money}
                                            onChange={handleChange}
                                            onBlur={() =>
                                                setTouchedFields({
                                                    ...touchedFields,
                                                    money: true,
                                                })
                                            }
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                                                errors.money
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 focus:ring-indigo-500"
                                            }`}
                                        />
                                        {errors.money && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.money}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="qadd"
                                            className="block text-sm font-zar text-gray-700"
                                        >
                                            قد
                                        </label>
                                        <input
                                            id="qadd"
                                            type="text"
                                            name="qadd"
                                            value={formData.qadd}
                                            onChange={handleChange}
                                            onBlur={() =>
                                                setTouchedFields({
                                                    ...touchedFields,
                                                    qadd: true,
                                                })
                                            }
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                                                errors.qadd
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 focus:ring-indigo-500"
                                            }`}
                                        />
                                        {errors.qadd && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.qadd}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="shana"
                                            className="block text-sm font-zar text-gray-700"
                                        >
                                            شانه
                                        </label>
                                        <input
                                            id="shana"
                                            type="text"
                                            name="shana"
                                            value={formData.shana}
                                            onChange={handleChange}
                                            onBlur={() =>
                                                setTouchedFields({
                                                    ...touchedFields,
                                                    shana: true,
                                                })
                                            }
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                                                errors.shana
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 focus:ring-indigo-500"
                                            }`}
                                        />
                                        {errors.shana && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.shana}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="ghara"
                                            className="block text-sm font-zar text-gray-700"
                                        >
                                            غاړه
                                        </label>
                                        <input
                                            id="ghara"
                                            type="text"
                                            name="ghara"
                                            value={formData.ghara}
                                            onChange={handleChange}
                                            onBlur={() =>
                                                setTouchedFields({
                                                    ...touchedFields,
                                                    ghara: true,
                                                })
                                            }
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                                                errors.ghara
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 focus:ring-indigo-500"
                                            }`}
                                        />
                                        {errors.ghara && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.ghara}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="zegar"
                                            className="block text-sm font-zar text-gray-700"
                                        >
                                            ځګر
                                        </label>
                                        <input
                                            id="zegar"
                                            type="text"
                                            name="zegar"
                                            value={formData.zegar}
                                            onChange={handleChange}
                                            onBlur={() =>
                                                setTouchedFields({
                                                    ...touchedFields,
                                                    zegar: true,
                                                })
                                            }
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                                                errors.zegar
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 focus:ring-indigo-500"
                                            }`}
                                        />
                                        {errors.zegar && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.zegar}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="lstoony"
                                            className="block text-sm font-zar text-gray-700"
                                        >
                                            لستوڼي اندازه
                                        </label>
                                        <input
                                            id="lstoony"
                                            type="text"
                                            name="lstoony"
                                            value={formData.lstoony}
                                            onChange={handleChange}
                                            onBlur={() =>
                                                setTouchedFields({
                                                    ...touchedFields,
                                                    lstoony: true,
                                                })
                                            }
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                                                errors.lstoony
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 focus:ring-indigo-500"
                                            }`}
                                        />
                                        {errors.lstoony && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.lstoony}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="partog"
                                            className="block text-sm font-zar text-gray-700"
                                        >
                                            پرتوګ
                                        </label>
                                        <input
                                            id="partog"
                                            type="text"
                                            name="partog"
                                            value={formData.partog}
                                            onChange={handleChange}
                                            onBlur={() =>
                                                setTouchedFields({
                                                    ...touchedFields,
                                                    partog: true,
                                                })
                                            }
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                                                errors.partog
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 focus:ring-indigo-500"
                                            }`}
                                        />
                                        {errors.partog && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.partog}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="pai_tsa"
                                            className="block text-sm font-zar text-gray-700"
                                        >
                                            پایڅه
                                        </label>
                                        <input
                                            id="pai_tsa"
                                            type="text"
                                            name="pai_tsa"
                                            value={formData.pai_tsa}
                                            onChange={handleChange}
                                            onBlur={() =>
                                                setTouchedFields({
                                                    ...touchedFields,
                                                    pai_tsa: true,
                                                })
                                            }
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                                                errors.pai_tsa
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 focus:ring-indigo-500"
                                            }`}
                                        />
                                        {errors.pai_tsa && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.pai_tsa}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="tidad"
                                            className="block text-sm font-zar text-gray-700"
                                        >
                                            تعداد
                                        </label>
                                        <input
                                            id="tidad"
                                            type="text"
                                            name="tidad"
                                            value={formData.tidad}
                                            onChange={handleChange}
                                            onBlur={() =>
                                                setTouchedFields({
                                                    ...touchedFields,
                                                    tidad: true,
                                                })
                                            }
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                                                errors.tidad
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 focus:ring-indigo-500"
                                            }`}
                                        />
                                        {errors.tidad && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.tidad}
                                            </p>
                                        )}
                                    </div>

                                    {/* Dates */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="rawrul_tareekh"
                                            className="block text-sm font-zar text-gray-700"
                                        >
                                            د راوړلو تاریخ
                                        </label>
                                        <input
                                            id="rawrul_tareekh"
                                            type="date"
                                            name="rawrul_tareekh"
                                            value={formData.rawrul_tareekh}
                                            onChange={handleChange}
                                            onBlur={() =>
                                                setTouchedFields({
                                                    ...touchedFields,
                                                    rawrul_tareekh: true,
                                                })
                                            }
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                                                errors.rawrul_tareekh
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 focus:ring-indigo-500"
                                            }`}
                                        />
                                        {errors.rawrul_tareekh && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.rawrul_tareekh}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="tasleem_tareekh"
                                            className="block text-sm font-zar text-gray-700"
                                        >
                                            د تسلیمولو تاریخ
                                        </label>
                                        <input
                                            id="tasleem_tareekh"
                                            type="date"
                                            name="tasleem_tareekh"
                                            value={formData.tasleem_tareekh}
                                            onChange={handleChange}
                                            onBlur={() =>
                                                setTouchedFields({
                                                    ...touchedFields,
                                                    tasleem_tareekh: true,
                                                })
                                            }
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                                                errors.tasleem_tareekh
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-gray-300 focus:ring-indigo-500"
                                            }`}
                                        />
                                        {errors.tasleem_tareekh && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.tasleem_tareekh}
                                            </p>
                                        )}
                                    </div>

                                    {checkboxGroups.map((group, groupIndex) => (
                                        <div
                                            key={groupIndex}
                                            className="space-y-3 bg-gray-50 p-4 rounded-lg"
                                        >
                                            <h4 className="font-zar text-gray-700">
                                                {group.title}
                                            </h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                {group.items.map((item) => (
                                                    <div
                                                        key={item.name}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={item.name}
                                                            name={item.name}
                                                            checked={
                                                                formData[
                                                                    item.name
                                                                ]
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                        />
                                                        <label
                                                            htmlFor={item.name}
                                                            className="mr-2 block text-sm text-gray-700"
                                                        >
                                                            {item.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 flex gap-5">
                                    <SystemButtons
                                        type="cancel"
                                        onClick={closeModal}
                                    />
                                    <SystemButtons
                                        type="submit"
                                        onClick={
                                            isEditing
                                                ? handleUpdate
                                                : handleSubmit
                                        }
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
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
            </div>
        </SystemLayout>
    );
};

export default Cloths;

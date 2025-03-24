import { useState, useEffect, useRef } from "react";
import {
    MdDelete,
    MdClose,
    MdCheck,
    MdOutlineCheckBox,
    MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { FaEdit, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useCloths } from "@/Contexts/ClothsContext";

const Cloths = () => {
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

        // Regex patterns for validation
        const englishNameRegex = /^[a-zA-Z\s]+$/;
        const pashtoNameRegex = /^[\u0600-\u06FF\s]+$/;
        const englishNumberRegex = /^[0-9]+$/;
        const pashtoNumberRegex = /^[۰-۹]+$/;
        const englishPhoneRegex = /^07[0-9]{8}$/;
        const pashtoPhoneRegex = /^٠٧[۰-۹]{8}$/;

        switch (fieldName) {
            case "nom":
                if (!value.trim()) {
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
                if (!value.trim()) {
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
                if (!value.trim()) {
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
                if (!value.trim()) {
                    fieldErrors.tidad = "تعداد اړین دی";
                } else if (
                    !englishNumberRegex.test(value) &&
                    !pashtoNumberRegex.test(value)
                ) {
                    fieldErrors.tidad = "یوازې انګلیسي یا پښتو عددونه وکاروئ";
                }
                break;

            case "money":
                if (!value.trim()) {
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

    const handleSubmit = (e) => {
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

        if (isEditing) {
            setCloths((prevData) =>
                prevData.map((data, index) =>
                    index === formData.index
                        ? {
                              ...formData,
                              disabled: formData.tasleem_tareekh !== "",
                          }
                        : data
                )
            );

            // Show success toast
            showToast("ریکارډ په بریالیتوب سره تازه شو", "success");
        } else {
            setCloths((prevData) => [
                ...prevData,
                { ...formData, disabled: formData.tasleem_tareekh !== "" },
            ]);

            // Show success toast
            showToast("ریکارډ په بریالیتوب سره اضافه شو", "success");
        }

        closeModal();
    };

    const handleUpdate = (index) => {
        setIsEditing(true);
        setModalOpen(true);
        setFormData({ ...cloths[index], index });
    };

    const handleDeleteClick = (index) => {
        setSelectedIndex(index);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        setCloths((prevData) => prevData.filter((_, i) => i !== selectedIndex));
        closeModal();
        showToast("ریکارډ په بریالیتوب سره حذف شو", "success");
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

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto px-4 py-6">
                {/* Header Section */}
                <div className="bg-white rounded-lg border p-6 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <div className="flex items-center gap-5 mb-4 md:mb-0">
                            <img
                                src="/imgs/cloths-3.jpg"
                                alt="Tailoring"
                                className="h-20 w-20 rounded-full object-cover border-4 border-indigo-100 mr-4"
                            />
                            <h1 className="text-2xl font-bold text-gray-800">
                                د جامو د مشتریانو لیست
                            </h1>
                        </div>
                        <button
                            onClick={handleAddClick}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg flex items-center transition-colors duration-300 shadow-md"
                        >
                            نوی ریکارډ اضافه کول
                        </button>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="د نوم یا مبایل نمبر په اساس لټون..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none"
                            />
                            {/* <MdSearch className="absolute right-3 top-3.5 text-gray-400 text-xl" /> */}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveTab("all")}
                                className={`px-4 py-2 rounded-lg ${
                                    activeTab === "all"
                                        ? "bg-indigo-600 text-white"
                                        : "bg-gray-200 text-gray-700"
                                }`}
                            >
                                ټول
                            </button>
                            <button
                                onClick={() => setActiveTab("active")}
                                className={`px-4 py-2 rounded-lg ${
                                    activeTab === "active"
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-200 text-gray-700"
                                }`}
                            >
                                فعال
                            </button>
                            <button
                                onClick={() => setActiveTab("completed")}
                                className={`px-4 py-2 rounded-lg ${
                                    activeTab === "completed"
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-700"
                                }`}
                            >
                                بشپړ شوي
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        // onClick={() => requestSort("nom")}
                                    >
                                        {/* <div className="flex items-center justify-end"> */}
                                        نوم
                                        {/* {getSortIcon("nom")} */}
                                        {/* </div> */}
                                    </th>
                                    <th
                                        className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        // onClick={() => requestSort("mobile")}
                                    >
                                        {/* <div className="flex items-center justify-end"> */}
                                        مبایل
                                        {/* {getSortIcon("mobile")} */}
                                        {/* </div> */}
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        اندازې
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        خصوصیات
                                    </th>
                                    <th
                                        className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        // onClick={() =>
                                        // requestSort("rawrul_tareekh")
                                        // }
                                    >
                                        {/* <div className="flex items-center justify-end"> */}
                                        د راوړلو تاریخ
                                        {/* {getSortIcon("rawrul_tareekh")} */}
                                        {/* </div> */}
                                    </th>
                                    <th
                                        className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        // onClick={() =>
                                        //     requestSort("tasleem_tareekh")
                                        // }
                                    >
                                        {/* <div className="flex items-center justify-end"> */}
                                        د تسلیمولو تاریخ
                                        {/* {getSortIcon("tasleem_tareekh")} */}
                                        {/* </div> */}
                                    </th>
                                    <th
                                        className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        // onClick={() => requestSort("tidad")}
                                    >
                                        {/* <div className="flex items-center justify-end"> */}
                                        تعداد
                                        {/* {getSortIcon("tidad")} */}
                                        {/* </div> */}
                                    </th>
                                    <th
                                        className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        // onClick={() => requestSort("money")}
                                    >
                                        {/* <div className="flex items-center justify-end"> */}
                                        پیسې
                                        {/* {getSortIcon("money")} */}
                                        {/* </div> */}
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                                            <td className="px-4 text-sm py-4 whitespace-nowrap">
                                                {/* <div className="flex items-center"> */}
                                                {/* <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                                        <MdOutlinePersonOutline className="h-5 w-5" />
                                                    </div> */}
                                                {/* <div className="mr-4"> */}
                                                {/* <div className=" font-medium text-gray-900"> */}
                                                {row.nom}
                                                {/* </div> */}
                                                {/* </div> */}
                                                {/* </div> */}
                                            </td>
                                            <td className="px-4 py-4  text-xs whitespace-nowrap">
                                                {/* <div className="flex items-center"> */}
                                                {/* <MdOutlinePhone className="text-gray-500 ml-1" /> */}
                                                {/* <div className="text-sm"> */}
                                                {row.mobile}
                                                {/* </div> */}
                                                {/* </div> */}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    <span className="inline-flex items-center  py-0.5 rounded-full text-xs font-medium  text-gray-800 ml-1">
                                                        قد: {row.qadd}
                                                    </span>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium  text-gray-800 ml-1">
                                                        شانه: {row.shana}
                                                    </span>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium  text-gray-800 ml-1">
                                                        غاړه: {row.ghara}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            handleShowMeasurements(
                                                                row
                                                            )
                                                        }
                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium  text-indigo-800 ml-1 cursor-pointer "
                                                    >
                                                        نور...
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="flex flex-wrap gap-1">
                                                    {row.lastoni && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                                            لستوڼي
                                                        </span>
                                                    )}
                                                    {row.bin && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                            بین
                                                        </span>
                                                    )}
                                                    {row.kalari && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                                            کالري
                                                        </span>
                                                    )}
                                                    {/* Show more button if there are more features */}
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
                                                            className="inline-flex items-center rounded text-xs font-medium  text-blue-800 cursor-pointer "
                                                        >
                                                            {
                                                                [
                                                                    row.lastoni_goti,
                                                                    row.bin_kat,
                                                                    row.makh_jib,
                                                                    row.tarikhzi,
                                                                    row.shabazi,
                                                                    row.arabi,
                                                                    row.lemen,
                                                                    row.lastoni_2,
                                                                ]

                                                                // .filter(
                                                                //     Boolean
                                                                // ).length
                                                            }
                                                            نور...
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                {/* <div className="flex items-center"> */}
                                                {/* <MdOutlineCalendarMonth className="text-gray-500 ml-1" /> */}
                                                {/* <div className=" text-gray-500"> */}
                                                {row.rawrul_tareekh}
                                                {/* </div> */}
                                                {/* </div> */}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                {row.tasleem_tareekh ? (
                                                    <div className="flex text-sm">
                                                        {/* <MdOutlineCalendarMonth className="text-green-500 ml-1" /> */}
                                                        {/* <div className="text-sm text-green-500"> */}
                                                        {row.tasleem_tareekh}
                                                        {/* </div> */}
                                                    </div>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium  text-yellow-800">
                                                        نه دی تسلیم سوی
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 text-sm py-4 whitespace-nowrap">
                                                {/* <span className="inline-flex py-1 rounded-full text-xs font-medium text-indigo-800"> */}
                                                {row.tidad}
                                                {/* </span> */}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm">
                                                {row.money} افغانۍ
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex  space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            handleUpdate(index)
                                                        }
                                                        className={`text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100 transition-colors ${
                                                            row.disabled
                                                                ? "opacity-50 cursor-not-allowed"
                                                                : ""
                                                        }`}
                                                        disabled={row.disabled}
                                                        title={
                                                            row.disabled
                                                                ? "تسلیم شوي ریکارډونه نشي سمولی"
                                                                : "سمول"
                                                        }
                                                    >
                                                        <FaEdit className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                index
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors"
                                                        title="حذف کول"
                                                    >
                                                        <MdDelete className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="9"
                                            className="px-4 py-8 text-center text-gray-500"
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
                            <div className="text-sm text-gray-700">
                                ټول{" "}
                                <span className="font-medium">
                                    {filteredData.length}
                                </span>{" "}
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
                            {/* <div className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
                                <h2 className="text-xl font-bold">
                                    {isEditing
                                        ? "ریکارډ تازه کول"
                                        : "نوی ریکارډ اضافه کول"}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="text-white hover:bg-indigo-700 rounded-full p-1"
                                >
                                    <MdClose className="h-6 w-6" />
                                </button>
                            </div> */}

                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    {/* Personal Information */}
                                    {/* <div className="md:col-span-3">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">
                                            د مشتري معلومات
                                        </h3>
                                    </div> */}

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="nom"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            نوم{" "}
                                            {/* <span className="text-red-500">
                                                *
                                            </span> */}
                                        </label>
                                        <input
                                            id="nom"
                                            type="text"
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
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            مبایل نمبر{" "}
                                            {/* <span className="text-red-500">
                                                *
                                            </span> */}
                                        </label>
                                        <input
                                            id="mobile"
                                            type="text"
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
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            پیسې{" "}
                                            {/* <span className="text-red-500">
                                                *
                                            </span> */}
                                        </label>
                                        <input
                                            id="money"
                                            type="text"
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

                                    {/* Measurements */}
                                    {/* <div className="md:col-span-3 mt-4">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">
                                            د اندازو معلومات
                                        </h3>
                                    </div> */}

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="qadd"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            قد{" "}
                                            {/* <span className="text-red-500">
                                                *
                                            </span> */}
                                        </label>
                                        <input
                                            id="qadd"
                                            type="text"
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
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            شانه{" "}
                                            {/* <span className="text-red-500">
                                                *
                                            </span> */}
                                        </label>
                                        <input
                                            id="shana"
                                            type="text"
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
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            غاړه{" "}
                                            {/* <span className="text-red-500">
                                                *
                                            </span> */}
                                        </label>
                                        <input
                                            id="ghara"
                                            type="text"
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
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            ځګر{" "}
                                            {/* <span className="text-red-500">
                                                *
                                            </span> */}
                                        </label>
                                        <input
                                            id="zegar"
                                            type="text"
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
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            لستوڼي اندازه{" "}
                                            {/* <span className="text-red-500">
                                                *
                                            </span> */}
                                        </label>
                                        <input
                                            id="lstoony"
                                            type="text"
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
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            پرتوګ{" "}
                                            {/* <span className="text-red-500">
                                                *
                                            </span> */}
                                        </label>
                                        <input
                                            id="partog"
                                            type="text"
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
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            پایڅه{" "}
                                            {/* <span className="text-red-500">
                                                *
                                            </span> */}
                                        </label>
                                        <input
                                            id="pai_tsa"
                                            type="text"
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
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            تعداد{" "}
                                            {/* <span className="text-red-500">
                                                *
                                            </span> */}
                                        </label>
                                        <input
                                            id="tidad"
                                            type="text"
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
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            د راوړلو تاریخ{" "}
                                            {/* <span className="text-red-500">
                                                *
                                            </span> */}
                                        </label>
                                        <input
                                            id="rawrul_tareekh"
                                            type="date"
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
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            د تسلیمولو تاریخ
                                        </label>
                                        <input
                                            id="tasleem_tareekh"
                                            type="date"
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
                                            <h4 className="font-medium text-gray-700">
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
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                                    >
                                        لغو کول
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        {isEditing ? "تازه کول" : "ثبت کول"}
                                    </button>
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
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                                {/* <h2 className="text-xl font-bold">
                                    د جامې خصوصیات
                                </h2> */}
                                <button
                                    onClick={() => setShowFeaturesModal(false)}
                                    className="text-white hover:bg-blue-700 rounded-full p-1"
                                >
                                    <MdClose className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
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
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
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
                                                <p className="text-gray-500 text-xs">
                                                    {measurement.label}
                                                </p>
                                                <p className="text-gray-900 font-medium">
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
        </AuthenticatedLayout>
    );
};

export default Cloths;

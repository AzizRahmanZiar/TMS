import { useState, useRef, useMemo } from "react";
import { useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import SystemLayout from "@/Layouts/SystemLayout";
import SystemButtons from "@/Components/SystemButtons";
import { MdDelete, MdClose, MdCheck } from "react-icons/md";
import {
    FaChevronLeft,
    FaChevronRight,
    FaImage,
    FaCalendarAlt,
} from "react-icons/fa";

const Advertisements = ({ advertisements: initialAdvertisements }) => {
    const [advertisements, setAdvertisements] = useState(
        initialAdvertisements || []
    );
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const modalRef = useRef(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { data, setData, post, put, errors, reset, processing } = useForm({
        title: "",
        description: "",
        image: null,
    });

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

    const handleAddClick = () => {
        setIsEditing(false);
        setModalOpen(true);
        reset();
    };

    const closeModal = () => {
        setModalOpen(false);
        setDeleteModalOpen(false);
        reset();
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setData(name, files[0]);
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/advertisements", {
            onSuccess: () => {
                showToast("اعلان په بریالیتوب سره اضافه شو", "success");
                closeModal();
                reset();
                // Refresh the page to get updated data
                window.location.reload();
            },
            onError: () => {
                showToast("د اعلان اضافه کولو کې ستونزه رامنځته شوه", "error");
            },
        });
    };

    const handleEditClick = (index) => {
        setIsEditing(true);
        setModalOpen(true);
        const advertisement = advertisements[index];
        setEditingId(advertisement.id);

        setData({
            title: advertisement.title || "",
            description: advertisement.description || "",
            image: null,
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        post(`/advertisements/${editingId}`, {
            _method: "PUT",
            onSuccess: () => {
                showToast("اعلان په بریالیتوب سره تازه شو", "success");
                closeModal();
                reset();
                // Refresh the page to get updated data
                window.location.reload();
            },
            onError: () => {
                showToast("د اعلان تازه کولو کې ستونزه رامنځته شوه", "error");
            },
        });
    };

    const handleDeleteClick = (index) => {
        setSelectedIndex(index);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        const advertisement = advertisements[selectedIndex];

        fetch(`/advertisements/${advertisement.id}`, {
            method: "DELETE",
            headers: {
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
                Accept: "application/json",
            },
        })
            .then(() => {
                showToast("اعلان په بریالیتوب سره حذف شو", "success");
                closeModal();
                // Refresh the page to get updated data
                window.location.reload();
            })
            .catch(() => {
                showToast("د اعلان حذف کولو کې ستونزه رامنځته شوه", "error");
            });
    };

    // Pagination logic
    const paginatedAdvertisements = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return advertisements.slice(startIndex, startIndex + itemsPerPage);
    }, [advertisements, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(advertisements.length / itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
        hover: {
            y: -5,
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
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
                                د اعلاناتو لیست
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Advertisements Grid */}
                {advertisements.length > 0 ? (
                    <>
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            {paginatedAdvertisements.map((ad, index) => (
                                <motion.div
                                    key={ad.id}
                                    className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/50"
                                    variants={cardVariants}
                                    whileHover="hover"
                                    custom={index}
                                >
                                    {/* Modern Gradient Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 opacity-40"></div>

                                    {/* Image Section - Compact */}
                                    <div className="relative h-32 bg-gradient-to-br from-primary-400 via-primary-500 to-secondary-500 overflow-hidden">
                                        {ad.image ? (
                                            <div className="relative h-full">
                                                <img
                                                    src={`/storage/${ad.image}`}
                                                    alt={ad.title}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-12 h-12 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                    <FaImage className="text-lg text-primary-500" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Section - Compact */}
                                    <div className="relative p-4 bg-white/90 backdrop-blur-sm">
                                        {/* Title */}
                                        <div className="mb-3">
                                            <h3 className="text-sm font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors duration-300">
                                                {ad.title}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        {ad.description && (
                                            <div className="mb-3">
                                                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                                    {ad.description}
                                                </p>
                                            </div>
                                        )}

                                        {/* Meta Information */}
                                        <div className="mb-3">
                                            <div className="flex items-center gap-2 p-1.5 rounded-lg bg-gray-50/80">
                                                <div className="w-6 h-6 rounded-md bg-secondary-100 flex items-center justify-center">
                                                    <FaCalendarAlt className="text-secondary-600 text-xs" />
                                                </div>
                                                <span className="text-xs text-gray-700 line-clamp-1 flex-1">
                                                    {new Date(
                                                        ad.created_at
                                                    ).toLocaleDateString(
                                                        "fa-AF"
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <SystemButtons
                                                type="edit"
                                                onClick={() =>
                                                    handleEditClick(
                                                        advertisements.indexOf(
                                                            ad
                                                        )
                                                    )
                                                }
                                                icon={true}
                                                title="سمول"
                                                className="flex-1 text-xs py-2"
                                            />
                                            <SystemButtons
                                                type="delete"
                                                onClick={() =>
                                                    handleDeleteClick(
                                                        advertisements.indexOf(
                                                            ad
                                                        )
                                                    )
                                                }
                                                icon={true}
                                                title="حذف کول"
                                                className="flex-1 text-xs py-2"
                                            />
                                        </div>

                                        {/* Floating Status Indicator */}
                                        <div className="absolute top-2 right-2">
                                            <div className="w-2 h-2 bg-green-400 rounded-full shadow-sm animate-pulse"></div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Pagination */}
                        {advertisements.length > itemsPerPage && (
                            <motion.div
                                className="mt-8 flex justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                            >
                                <nav className="flex items-center gap-2">
                                    <motion.button
                                        onClick={() =>
                                            goToPage(currentPage - 1)
                                        }
                                        disabled={currentPage === 1}
                                        className={`font-bold px-4 py-3 rounded-xl text-lg transition-all duration-300 ${
                                            currentPage === 1
                                                ? "text-gray-400 cursor-not-allowed bg-gray-100"
                                                : "text-gray-700 hover:bg-gray-100 bg-white shadow-md hover:shadow-lg"
                                        }`}
                                        whileHover={
                                            currentPage !== 1
                                                ? {
                                                      scale: 1.05,
                                                      backgroundColor:
                                                          "rgba(0,0,0,0.05)",
                                                  }
                                                : {}
                                        }
                                        whileTap={
                                            currentPage !== 1
                                                ? { scale: 0.95 }
                                                : {}
                                        }
                                    >
                                        <FaChevronRight className="h-4 w-4" />
                                    </motion.button>

                                    {[...Array(totalPages)].map((_, i) => {
                                        if (
                                            i === 0 ||
                                            i === totalPages - 1 ||
                                            (i >= currentPage - 2 &&
                                                i <= currentPage + 2)
                                        ) {
                                            return (
                                                <motion.button
                                                    key={i}
                                                    onClick={() =>
                                                        goToPage(i + 1)
                                                    }
                                                    className={`font-bold px-4 py-3 rounded-xl text-lg transition-all duration-300 ${
                                                        currentPage === i + 1
                                                            ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg"
                                                            : "text-gray-700 hover:bg-gray-100 bg-white shadow-md hover:shadow-lg"
                                                    }`}
                                                    whileHover={{
                                                        scale: 1.05,
                                                    }}
                                                    whileTap={{
                                                        scale: 0.95,
                                                    }}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        delay: 0.8 + i * 0.05,
                                                    }}
                                                >
                                                    {i + 1}
                                                </motion.button>
                                            );
                                        } else if (
                                            i === currentPage - 3 ||
                                            i === currentPage + 3
                                        ) {
                                            return (
                                                <motion.span
                                                    key={i}
                                                    className="px-2 text-gray-500"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{
                                                        delay: 0.8 + i * 0.05,
                                                    }}
                                                >
                                                    ...
                                                </motion.span>
                                            );
                                        }
                                        return null;
                                    })}

                                    <motion.button
                                        onClick={() =>
                                            goToPage(currentPage + 1)
                                        }
                                        disabled={currentPage === totalPages}
                                        className={`font-bold px-4 py-3 rounded-xl text-lg transition-all duration-300 ${
                                            currentPage === totalPages
                                                ? "text-gray-400 cursor-not-allowed bg-gray-100"
                                                : "text-gray-700 hover:bg-gray-100 bg-white shadow-md hover:shadow-lg"
                                        }`}
                                        whileHover={
                                            currentPage !== totalPages
                                                ? {
                                                      scale: 1.05,
                                                      backgroundColor:
                                                          "rgba(0,0,0,0.05)",
                                                  }
                                                : {}
                                        }
                                        whileTap={
                                            currentPage !== totalPages
                                                ? { scale: 0.95 }
                                                : {}
                                        }
                                    >
                                        <FaChevronLeft className="h-4 w-4" />
                                    </motion.button>
                                </nav>
                            </motion.div>
                        )}
                    </>
                ) : (
                    <motion.div
                        className="text-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-xl p-12 max-w-lg mx-auto border border-gray-200"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                className="text-gray-400 text-6xl mb-6"
                                initial={{ y: -20 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <FaImage className="mx-auto" />
                            </motion.div>
                            <motion.h3
                                className="text-2xl font-bold text-gray-700 mb-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                هیڅ اعلان ونه موندل شو
                            </motion.h3>
                            <motion.p
                                className="text-gray-500 text-lg leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                دا وخت کوم اعلان شتون نلري. د نوي اعلان اضافه
                                کولو لپاره پورته تڼۍ وکاروئ.
                            </motion.p>
                        </motion.div>
                    </motion.div>
                )}

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
                            className="bg-gradient-to-br from-white to-primary-50 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto border border-primary-200"
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
                                            <FaImage className="text-white text-lg" />
                                        </div>
                                        <h2 className="text-xl font-bold font-zar">
                                            {isEditing
                                                ? "اعلان سمول"
                                                : "نوی اعلان"}
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
                                <div className="space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <label className="block text-sm font-bold text-primary-800 mb-3 font-zar">
                                            سرلیک
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={data.title}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm font-zar text-right ${
                                                errors.title
                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                    : "border-primary-200 focus:border-primary-500 focus:ring-primary-200"
                                            }`}
                                            placeholder="د اعلان سرلیک دلته ولیکئ..."
                                        />
                                        {errors.title && (
                                            <motion.p
                                                className="mt-2 text-sm text-red-600 font-zar"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                {errors.title}
                                            </motion.p>
                                        )}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <label className="block text-sm font-bold text-primary-800 mb-3 font-zar">
                                            تفصیل
                                        </label>
                                        <textarea
                                            name="description"
                                            value={data.description}
                                            onChange={handleChange}
                                            rows="4"
                                            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none font-zar text-right ${
                                                errors.description
                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                    : "border-primary-200 focus:border-primary-500 focus:ring-primary-200"
                                            }`}
                                            placeholder="د اعلان تفصیل دلته ولیکئ..."
                                        />
                                        {errors.description && (
                                            <motion.p
                                                className="mt-2 text-sm text-red-600 font-zar"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                {errors.description}
                                            </motion.p>
                                        )}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <label className="block text-sm font-bold text-primary-800 mb-3 font-zar">
                                            انځور
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                name="image"
                                                onChange={handleChange}
                                                accept="image/*"
                                                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 ${
                                                    errors.image
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                        : "border-primary-200 focus:border-primary-500 focus:ring-primary-200"
                                                }`}
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaImage className="h-5 w-5 text-primary-400" />
                                            </div>
                                        </div>
                                        {errors.image && (
                                            <motion.p
                                                className="mt-2 text-sm text-red-600 font-zar"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                {errors.image}
                                            </motion.p>
                                        )}
                                    </motion.div>
                                </div>

                                <motion.div
                                    className="mt-10 flex gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
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
                                        disabled={processing}
                                        className={`flex-1 px-6 py-3 rounded-xl transition-all duration-300 font-semibold font-zar ${
                                            processing
                                                ? "bg-gray-400 cursor-not-allowed text-gray-600"
                                                : "bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white shadow-lg hover:shadow-xl"
                                        }`}
                                        whileHover={
                                            processing
                                                ? {}
                                                : { scale: 1.02, y: -2 }
                                        }
                                        whileTap={
                                            processing ? {} : { scale: 0.98 }
                                        }
                                    >
                                        {processing
                                            ? "په پروسس کې..."
                                            : isEditing
                                            ? "تازه کول"
                                            : "ثبت کول"}
                                    </motion.button>
                                </motion.div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}

                {/* Delete Confirmation Modal */}
                {isDeleteModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="bg-gradient-to-br from-white to-red-50 rounded-2xl shadow-2xl w-full max-w-md border border-red-200"
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
                            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                            <MdDelete className="text-white text-lg" />
                                        </div>
                                        <h2 className="text-xl font-bold font-zar">
                                            د اعلان حذف کول
                                        </h2>
                                    </div>
                                    <motion.button
                                        onClick={closeModal}
                                        className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors duration-200"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <MdClose className="text-white text-lg" />
                                    </motion.button>
                                </div>
                            </div>

                            <div className="p-8">
                                <motion.div
                                    className="flex items-center mb-6"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="bg-red-100 rounded-2xl p-4 mr-4 shadow-lg">
                                        <MdDelete className="h-8 w-8 text-red-600" />
                                    </div>
                                    <p className="text-gray-700 font-zar text-lg leading-relaxed">
                                        آیا تاسو ډاډه یاست چې غواړئ دا اعلان حذف
                                        کړئ؟
                                    </p>
                                </motion.div>

                                <motion.div
                                    className="flex gap-4 mt-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
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
                                        type="button"
                                        onClick={handleDeleteConfirm}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-semibold font-zar shadow-lg hover:shadow-xl"
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        حذف کول
                                    </motion.button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
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
            </div>
        </SystemLayout>
    );
};

export default Advertisements;

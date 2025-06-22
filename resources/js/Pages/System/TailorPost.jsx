import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    FaImage,
    FaFileAlt,
    FaTags,
    FaUpload,
    FaEye,
    FaTrash,
    FaCalendarAlt,
    FaEdit,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import SystemLayout from "@/Layouts/SystemLayout";
import SearchBar from "@/Components/SearchBar";
import SystemButtons from "@/Components/SystemButtons";
import DeleteModal from "@/Components/DeleteModal";
import { router } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import Pagination from "@/Components/Pagination";

const TailorPost = ({ posts: initialPosts, errors: serverErrors }) => {
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const { data, setData, post, processing, errors, reset } = useForm({
        description: "",
        category: "",
        image: null,
    });

    // Form validation states
    const [formErrors, setFormErrors] = useState({});

    // Character counters
    const [descriptionChars, setDescriptionChars] = useState(0);

    // Set form values when editing
    useEffect(() => {
        if (currentPost) {
            setData({
                description: currentPost.description || "",
                category: currentPost.category || "",
                image: null,
            });
            setDescriptionChars(currentPost.description?.length || 0);
            setImagePreview(
                currentPost.image ? `/storage/${currentPost.image}` : null
            );
        } else {
            resetForm();
        }
    }, [currentPost]);

    // Update resetForm function
    const resetForm = () => {
        setData({
            description: "",
            category: "",
            image: null,
        });
        setFormErrors({});
        setDescriptionChars(0);
        setImagePreview(null);
    };

    const handleAddPost = () => {
        setCurrentPost(null);
        setIsEditing(false);
        setShowForm(true);
        setImageFile(null);
        setImagePreview(null);
        resetForm();
    };

    const handleEditPost = (post) => {
        setCurrentPost(post);
        setIsEditing(true);
        setShowForm(true);
        setImageFile(null);
        setImagePreview(post.image ? `/storage/${post.image}` : null);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        resetForm();
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update character counters
        if (name === "description") {
            setDescriptionChars(value.length);
        }

        // Update form values
        setData(name, value);
    };

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setData("image", file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setData("image", null);
            setImagePreview(
                currentPost?.image ? `/storage/${currentPost.image}` : null
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            post(route("tailor-posts.update", currentPost.id), {
                _method: "PUT",
                onSuccess: () => {
                    setShowForm(false);
                    resetForm();
                    toast.success("پوست په بریالیتوب سره تازه شو");
                },
                onError: (errors) => {
                    // Inertia validation errors are automatically handled
                    if (errors.error) {
                        toast.error(errors.error);
                    } else {
                        toast.error("د پوست تازه کولو کې ستونزه رامنځته شوه");
                    }
                },
            });
        } else {
            post(route("tailor-posts.store"), {
                onSuccess: () => {
                    setShowForm(false);
                    resetForm();
                    toast.success("پوست په بریالیتوب سره اضافه شو");
                },
                onError: (errors) => {
                    // Inertia validation errors are automatically handled
                    if (errors.error) {
                        toast.error(errors.error);
                    } else {
                        toast.error("د پوست اضافه کولو کې ستونزه رامنځته شوه");
                    }
                },
            });
        }
    };

    const handleDeletePost = (post) => {
        setPostToDelete(post);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!postToDelete) return;

        setIsDeleting(true);
        router.delete(route("tailor-posts.destroy", postToDelete.id), {
            onSuccess: () => {
                toast.success("پوست په بریالیتوب سره حذف شو");
                setShowDeleteModal(false);
                setPostToDelete(null);
                setIsDeleting(false);
            },
            onError: () => {
                toast.error("د پوست حذف کولو کې ستونزه رامنځته شوه");
                setIsDeleting(false);
            },
        });
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setPostToDelete(null);
        setIsDeleting(false);
    };

    // Get input class based on validation state
    const getInputClass = (fieldName) => {
        const baseClass =
            "border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";

        if (errors[fieldName]) {
            return `${baseClass} border-red-500 bg-red-50`;
        } else if (data[fieldName] && data[fieldName].length > 0) {
            return `${baseClass} border-green-500 bg-green-50`;
        }

        return `${baseClass} border-gray-300`;
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

    // Add this after your existing filtered posts logic
    const filteredPosts = initialPosts.filter((post) =>
        Object.values(post).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);
    const totalItems = filteredPosts.length;

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
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                <FaImage className="text-white text-xl" />
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white font-zar">
                                د پوسټونو لیست
                            </h1>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <div className="w-full md:w-96">
                                <SearchBar
                                    placeholder="د پوست نوم ولټوه..."
                                    onSearch={handleSearch}
                                    initialValue={searchTerm}
                                    className="w-full"
                                />
                            </div>
                            <motion.button
                                onClick={handleAddPost}
                                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-300 font-semibold font-zar flex items-center gap-2 shadow-lg hover:shadow-xl border border-white/30"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FaUpload className="text-sm" />
                                نوی پوست
                            </motion.button>
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
                                        <span>ډیزاین</span>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                        <span>تفصیل</span>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200 hidden md:table-cell">
                                        <span>تاریخ</span>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                        <span>کټګورۍ</span>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-right font-zar text-sm md:text-base font-bold text-primary-800 border-b border-primary-200">
                                        <span>عملیې</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentItems.map((post, index) => (
                                    <motion.tr
                                        key={post.id}
                                        className="hover:bg-primary-25 transition-all duration-300 border-b border-gray-100"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: index * 0.05,
                                        }}
                                    >
                                        <td className="px-4 md:px-6 py-4 text-right">
                                            <div className="flex items-center ">
                                                <div className="relative group">
                                                    <img
                                                        src={
                                                            post.image
                                                                ? `/storage/${post.image}`
                                                                : "/placeholder.svg"
                                                        }
                                                        alt={post.description}
                                                        className="h-10 w-10 rounded-xl shadow-lg border-2 border-primary-200 group-hover:shadow-xl transition-all duration-300"
                                                    />
                                                    {/* <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                        <FaEye className="text-white text-lg" />
                                                    </div> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-right">
                                            <div className="max-w-xs">
                                                <p className="text-sm md:text-base text-gray-900 font-medium font-zar line-clamp-2 leading-relaxed">
                                                    {post.description}
                                                </p>
                                                {/* <div className="mt-1 flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                                    <span className="text-xs text-gray-500 font-zar">
                                                        {
                                                            post.description
                                                                .length
                                                        }{" "}
                                                        توري
                                                    </span>
                                                </div> */}
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-right hidden md:table-cell">
                                            <div className="flex items-center  gap-2">
                                                <span className="text-sm text-gray-600 font-zar">
                                                    {formatDate(post.date)}
                                                </span>
                                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                    <FaCalendarAlt className="text-purple-600 text-xs" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-right">
                                            <div className="flex items-center ">
                                                <span
                                                    className={`px-4 py-2 rounded-full text-xs font-bold font-zar flex items-center gap-2 border ${
                                                        post.category ===
                                                        "Cloths"
                                                            ? "bg-blue-100 text-blue-800 border-blue-200"
                                                            : post.category ===
                                                              "Uniform"
                                                            ? "bg-green-100 text-green-800 border-green-200"
                                                            : post.category ===
                                                              "Kortai"
                                                            ? "bg-purple-100 text-purple-800 border-purple-200"
                                                            : post.category ===
                                                              "Sadrai"
                                                            ? "bg-orange-100 text-orange-800 border-orange-200"
                                                            : "bg-gray-100 text-gray-800 border-gray-200"
                                                    }`}
                                                >
                                                    <FaTags className="text-xs" />
                                                    {post.category === "Cloths"
                                                        ? "جامې"
                                                        : post.category ===
                                                          "Uniform"
                                                        ? "یونیفورم"
                                                        : post.category ===
                                                          "Kortai"
                                                        ? "کورتۍ"
                                                        : post.category ===
                                                          "Sadrai"
                                                        ? "صدری"
                                                        : post.category}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-right">
                                            <div className="flex items-center  gap-2">
                                                <motion.button
                                                    onClick={() =>
                                                        handleEditPost(post)
                                                    }
                                                    className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-lg text-xs font-bold font-zar transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
                                                    whileHover={{
                                                        scale: 1.05,
                                                    }}
                                                    whileTap={{
                                                        scale: 0.95,
                                                    }}
                                                >
                                                    <FaEdit className="text-xs" />
                                                    سمول
                                                </motion.button>
                                                <motion.button
                                                    onClick={() =>
                                                        handleDeletePost(post)
                                                    }
                                                    className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs transition-all duration-300 shadow-md hover:shadow-lg"
                                                    whileHover={{
                                                        scale: 1.05,
                                                    }}
                                                    whileTap={{
                                                        scale: 0.95,
                                                    }}
                                                >
                                                    <FaTrash className="text-xs" />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                                {filteredPosts.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-12 text-center"
                                        >
                                            <motion.div
                                                className="flex flex-col items-center justify-center gap-4"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <FaImage className="text-gray-400 text-2xl" />
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="text-lg font-bold text-gray-600 font-zar mb-2">
                                                        هیڅ پوست ونه موندل شو
                                                    </h3>
                                                    <p className="text-sm text-gray-500 font-zar">
                                                        د لټون شرایط بدل کړئ یا
                                                        نوی پوست اضافه کړئ
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Add the pagination component at the bottom of your table */}
                <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />

                {/* Form Modal */}
                {showForm && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
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
                                                ? "پوست سمول"
                                                : "نوی پوست"}
                                        </h2>
                                    </div>
                                    <motion.button
                                        type="button"
                                        onClick={handleCloseForm}
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
                                    {/* Image Upload Section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-200"
                                    >
                                        <h3 className="text-lg font-bold text-primary-800 mb-6 font-zar flex items-center gap-2">
                                            <FaImage className="text-primary-600" />
                                            ډیزاین انځور
                                        </h3>

                                        <div className="space-y-4">
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="space-y-3"
                                            >
                                                <label className="block text-sm font-bold text-primary-800 font-zar">
                                                    انځور غوره کړئ
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        id="image"
                                                        name="image"
                                                        accept="image/*"
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                        className="hidden"
                                                    />
                                                    <label
                                                        htmlFor="image"
                                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm font-zar cursor-pointer flex items-center justify-center gap-3 hover:bg-primary-50 ${
                                                            errors.image
                                                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                                : "border-primary-200 focus:border-primary-500 focus:ring-primary-200"
                                                        }`}
                                                    >
                                                        <FaUpload className="h-5 w-5 text-primary-600" />
                                                        <span className="text-primary-700">
                                                            {imageFile
                                                                ? imageFile.name
                                                                : "انځور غوره کړئ"}
                                                        </span>
                                                    </label>
                                                </div>
                                                {errors.image && (
                                                    <motion.p
                                                        className="text-sm text-red-600 font-zar"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                    >
                                                        {errors.image}
                                                    </motion.p>
                                                )}
                                            </motion.div>

                                            {/* Image Preview */}
                                            {imagePreview && (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.9,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    transition={{ delay: 0.3 }}
                                                    className="mt-4"
                                                >
                                                    <label className="block text-sm font-bold text-primary-800 font-zar mb-3">
                                                        د انځور مخکتنه
                                                    </label>
                                                    <div className="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden border-2 border-primary-200">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute top-2 right-2">
                                                            <motion.button
                                                                type="button"
                                                                onClick={() => {
                                                                    setImagePreview(
                                                                        null
                                                                    );
                                                                    setImageFile(
                                                                        null
                                                                    );
                                                                    setData(
                                                                        "image",
                                                                        null
                                                                    );
                                                                }}
                                                                className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                                                                whileHover={{
                                                                    scale: 1.1,
                                                                }}
                                                                whileTap={{
                                                                    scale: 0.9,
                                                                }}
                                                            >
                                                                <FaTrash className="text-xs" />
                                                            </motion.button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                    {/* Description Section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-200"
                                    >
                                        <h3 className="text-lg font-bold text-primary-800 mb-6 font-zar flex items-center gap-2">
                                            <FaFileAlt className="text-primary-600" />
                                            تفصیل
                                        </h3>

                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="space-y-3"
                                        >
                                            <label className="block text-sm font-bold text-primary-800 font-zar">
                                                د ډیزاین تفصیل
                                            </label>
                                            <div className="relative">
                                                <textarea
                                                    name="description"
                                                    value={data.description}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm font-zar text-right resize-none ${
                                                        errors.description
                                                            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                            : "border-primary-200 focus:border-primary-500 focus:ring-primary-200"
                                                    }`}
                                                    rows="4"
                                                    maxLength="2000"
                                                    placeholder="د خپل ډیزاین په اړه تفصیل ولیکئ..."
                                                />
                                                <div className="absolute bottom-3 left-3">
                                                    <FaFileAlt className="h-5 w-5 text-primary-400" />
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <motion.div
                                                    className={`text-sm font-zar ${
                                                        descriptionChars > 1800
                                                            ? "text-red-600"
                                                            : descriptionChars >
                                                              1500
                                                            ? "text-yellow-600"
                                                            : "text-gray-500"
                                                    }`}
                                                    animate={{
                                                        scale:
                                                            descriptionChars >
                                                            1800
                                                                ? [1, 1.05, 1]
                                                                : 1,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                    }}
                                                >
                                                    {descriptionChars}/2000 توري
                                                </motion.div>
                                                {data.description &&
                                                    data.description.length >=
                                                        10 && (
                                                        <motion.div
                                                            initial={{
                                                                opacity: 0,
                                                                scale: 0,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                scale: 1,
                                                            }}
                                                            className="text-green-600"
                                                        >
                                                            <FaEye className="h-4 w-4" />
                                                        </motion.div>
                                                    )}
                                            </div>
                                            {errors.description && (
                                                <motion.p
                                                    className="text-sm text-red-600 font-zar"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                >
                                                    {errors.description}
                                                </motion.p>
                                            )}
                                        </motion.div>
                                    </motion.div>

                                    {/* Category Section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-200"
                                    >
                                        <h3 className="text-lg font-bold text-primary-800 mb-6 font-zar flex items-center gap-2">
                                            <FaTags className="text-primary-600" />
                                            کټګورۍ
                                        </h3>

                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="space-y-3"
                                        >
                                            <label className="block text-sm font-bold text-primary-800 font-zar">
                                                د ډیزاین کټګورۍ غوره کړئ
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="category"
                                                    value={data.category}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm font-zar text-right ${
                                                        errors.category
                                                            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                                            : "border-primary-200 focus:border-primary-500 focus:ring-primary-200"
                                                    }`}
                                                >
                                                    <option value="">
                                                        کټګورۍ وټاکئ
                                                    </option>
                                                    <option value="Cloths">
                                                        جامې
                                                    </option>
                                                    <option value="Uniform">
                                                        یونیفورم
                                                    </option>
                                                    <option value="Kortai">
                                                        کورتی
                                                    </option>
                                                    <option value="Sadrai">
                                                        صدری
                                                    </option>
                                                </select>
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FaTags className="h-5 w-5 text-primary-400" />
                                                </div>
                                            </div>
                                            {errors.category && (
                                                <motion.p
                                                    className="text-sm text-red-600 font-zar"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                >
                                                    {errors.category}
                                                </motion.p>
                                            )}
                                        </motion.div>
                                    </motion.div>
                                </div>
                                <motion.div
                                    className="mt-10 flex gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <motion.button
                                        type="button"
                                        onClick={handleCloseForm}
                                        className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold font-zar"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        لغو کول
                                    </motion.button>
                                    <motion.button
                                        type="submit"
                                        disabled={processing}
                                        className={`flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white rounded-xl transition-all duration-300 font-semibold font-zar shadow-lg hover:shadow-xl ${
                                            processing
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                        whileHover={
                                            !processing
                                                ? { scale: 1.02, y: -2 }
                                                : {}
                                        }
                                        whileTap={
                                            !processing ? { scale: 0.98 } : {}
                                        }
                                    >
                                        {processing ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                {isEditing
                                                    ? "سمول کیږي..."
                                                    : "اضافه کیږي..."}
                                            </div>
                                        ) : isEditing ? (
                                            "سمول"
                                        ) : (
                                            "اضافه کول"
                                        )}
                                    </motion.button>
                                </motion.div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}

                {/* Delete Modal */}
                <DeleteModal
                    isOpen={showDeleteModal}
                    onClose={cancelDelete}
                    onConfirm={confirmDelete}
                    title="د پوست حذف کول"
                    message={`آیا تاسو ډاډه یاست چې غواړئ "${postToDelete?.description?.substring(
                        0,
                        50
                    )}..." پوست حذف کړئ؟ دا عمل نشي بیرته کیدی.`}
                    isLoading={isDeleting}
                />
            </div>
        </SystemLayout>
    );
};

export default TailorPost;

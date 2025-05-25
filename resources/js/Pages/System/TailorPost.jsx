import { useState, useEffect } from "react";
import SystemLayout from "@/Layouts/SystemLayout";
import SearchBar from "@/Components/SearchBar";
import SystemButtons from "@/Components/SystemButtons";
import { router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { toast } from 'react-hot-toast';

const TailorPost = ({ posts: initialPosts, errors: serverErrors }) => {
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        description: "",
        category: "",
        image: null
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
                image: null
            });
            setDescriptionChars(currentPost.description?.length || 0);
            setImagePreview(currentPost.image ? `/storage/${currentPost.image}` : null);
        } else {
            resetForm();
        }
    }, [currentPost]);

    // Update resetForm function
    const resetForm = () => {
        setData({
            description: "",
            category: "",
            image: null
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

    // Handle input changes with validation
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update character counters
        if (name === "description") {
            setDescriptionChars(value.length);
        }

        // Update form values
        setData(name, value);

        // Validate on change
        validateField(name, value);
    };

    // Validate a single field
    const validateField = (name, value) => {
        const errors = { ...formErrors };

        switch (name) {
            case "description":
                if (!value.trim()) {
                    errors.description = "تفصیل اړین دی";
                } else if (value.length < 10) {
                    errors.description = "تفصیل باید لږترلږه 10 توري ولري";
                } else if (value.length > 2000) {
                    errors.description = "تفصیل باید له 2000 تورو څخه لږ وي";
                } else if (/[^a-zA-Z\u0600-\u06FF\s.,!?]/.test(value)) {
                    errors.description = "تفصیل کې باید یوازې توري وي";
                } else {
                    delete errors.description;
                }
                break;

            case "category":
                if (!value.trim()) {
                    errors.category = "کټګورۍ اړینه ده";
                } else if (
                    !["Cloths", "Uniform", "Kortai", "Sadrai"].includes(value)
                ) {
                    errors.category = "مهرباني وکړئ یوه معتبره کټګورۍ وټاکئ";
                } else {
                    delete errors.category;
                }
                break;

            default:
                break;
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                setFormErrors((prev) => ({
                    ...prev,
                    image: "یوازې عکسونه منل کیږي",
                }));
                setImageFile(null);
                setImagePreview(currentPost?.image ? `/storage/${currentPost.image}` : null);
                e.target.value = "";
                return;
            }

            setImageFile(file);
            setData('image', file);
            setFormErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.image;
                return newErrors;
            });

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setData('image', null);
            setImagePreview(currentPost?.image ? `/storage/${currentPost.image}` : null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            put(route('tailor-posts.update', currentPost.id), {
                onSuccess: () => {
                    setShowForm(false);
                    resetForm();
                    toast.success('You needed posts not allowed other');
                },
                onError: (errors) => {
                    if (errors.error) {
                        toast.error(errors.error);
                    } else {
                        toast.error('Failed to update post');
                    }
                }
            });
        } else {
            post(route('tailor-posts.store'), {
                onSuccess: () => {
                    setShowForm(false);
                    resetForm();
                    toast.success('You needed posts not allowed other');
                },
                onError: (errors) => {
                    if (errors.error) {
                        toast.error(errors.error);
                    } else {
                        toast.error('Failed to create post');
                    }
                }
            });
        }
    };

    const handleDeletePost = (postId) => {
        if (confirm('آیا تاسو غواړئ دا پوست حذف کړئ؟')) {
            router.delete(route('tailor-posts.destroy', postId), {
                onSuccess: () => {
                    toast.success('Post deleted successfully');
                },
                onError: () => {
                    toast.error('Failed to delete post');
                }
            });
        }
    };

    // Get input class based on validation state
    const getInputClass = (fieldName) => {
        const baseClass =
            "border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";

        if (formErrors[fieldName] || errors[fieldName]) {
            return `${baseClass} border-red-500 bg-red-50`;
        } else if (data[fieldName] && data[fieldName].length > 0) {
            return `${baseClass} border-green-500 bg-green-50`;
        }

        return `${baseClass} border-gray-300`;
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    return (
        <SystemLayout>
            <div className="p-6">
                <div className="bg-white rounded-lg border p-6 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                        <SystemButtons type="add" onClick={handleAddPost} />
                        <div className="flex items-center gap-5 mb-4 md:mb-0">
                            <h1 className="text-xl md:text-3xl font-bold text-gray-800">
                                د پوسټونو لیست
                            </h1>
                        </div>
                    </div>
                    {/* Search bar and Add Post button */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                        <div className="w-full">
                            <SearchBar
                                placeholder="د پوست نوم ولټوه..."
                                onSearch={handleSearch}
                                initialValue={searchTerm}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Table section */}
                <div className="bg-white rounded-lg border overflow-hidden">
                    <div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        ډیزاین
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        تفصیل
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        تاریخ
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        کټګورۍ
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        عملیات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-gray-200">
                                {initialPosts
                                    .filter((post) =>
                                        post.description.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .map((post) => (
                                        <tr
                                            key={post.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="py-4 px-4 text-right whitespace-nowrap">
                                                <img
                                                    src={post.image ? `/storage/${post.image}` : "/placeholder.svg"}
                                                    alt={post.description}
                                                    className="h-16 w-16 object-cover rounded-md shadow-sm"
                                                />
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <div className="text-sm text-gray-500 line-clamp-2">
                                                    {post.description}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-right whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {post.date}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-right whitespace-nowrap">
                                                <span className="inline-flex text-xs leading-5 font-semibold rounded-full text-blue-800">
                                                    {post.category}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex gap-2">
                                                    <SystemButtons
                                                        type="edit"
                                                        onClick={() =>
                                                            handleEditPost(post)
                                                        }
                                                        icon={true}
                                                        title="سمول"
                                                    />
                                                    <SystemButtons
                                                        type="delete"
                                                        onClick={() =>
                                                            handleDeletePost(
                                                                post.id
                                                            )
                                                        }
                                                        icon={true}
                                                        title="حذف کول"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-1 gap-5"
                            >
                                <div>
                                    <label
                                        className="block text-xl font-medium text-gray-700"
                                        htmlFor="image"
                                    >
                                        ډیزان
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />

                                    {(formErrors.image || errors.image) && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {formErrors.image || errors.image}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xl font-medium text-gray-700">
                                        تفصیل
                                    </label>
                                    <textarea
                                        name="description"
                                        value={data.description}
                                        onChange={handleInputChange}
                                        className={getInputClass("description")}
                                        rows="4"
                                        maxLength="2000"
                                    />
                                    <div className="text-sm text-gray-500">
                                        {descriptionChars}/2000 توري
                                    </div>
                                    {(formErrors.description || errors.description) && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {formErrors.description || errors.description}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xl font-medium text-gray-700">
                                        کټګورۍ
                                    </label>
                                    <select
                                        name="category"
                                        value={data.category}
                                        onChange={handleInputChange}
                                        className={getInputClass("category")}
                                    >
                                        <option value="">کټګورۍ وټاکئ</option>
                                        <option value="Cloths">Cloths</option>
                                        <option value="Uniform">Uniform</option>
                                        <option value="Kortai">Kortai</option>
                                        <option value="Sadrai">Sadrai</option>
                                    </select>
                                    {(formErrors.category || errors.category) && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {formErrors.category || errors.category}
                                        </p>
                                    )}
                                </div>
                            </form>
                            <div className="flex justify-end gap-4 mt-6">
                                <SystemButtons
                                    type="cancel"
                                    onClick={handleCloseForm}
                                    title="لغو کول"
                                />
                                <SystemButtons
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={processing}
                                    title={isEditing ? "سمول" : "اضافه کول"}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SystemLayout>
    );
};

export default TailorPost;

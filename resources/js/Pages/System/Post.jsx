import { useState, useEffect } from "react";
import { usePosts } from "../../Contexts/postContext"; // Import the context
import SystemLayout from "@/Layouts/SystemLayout";
import SearchBar from "@/Components/SearchBar";
import SystemButtons from "@/Components/SystemButtons";

const Post = () => {
    const { posts, setPosts } = usePosts(); // Use the context
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Form validation states
    const [formErrors, setFormErrors] = useState({});
    const [formValues, setFormValues] = useState({
        description: "",
        category: "",
    });

    // Character counters
    const [descriptionChars, setDescriptionChars] = useState(0);

    // Set form values when editing
    useEffect(() => {
        if (currentPost) {
            setFormValues({
                description: currentPost.description || "",
                category: currentPost.category || "",
            });
            setDescriptionChars(currentPost.description?.length || 0);
            setImagePreview(currentPost.image || null);
        } else {
            resetForm();
        }
    }, [currentPost]);

    // Update resetForm function
    const resetForm = () => {
        setFormValues({
            description: "",
            category: "",
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
        setImagePreview(post.image || null);
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
        setFormValues({
            ...formValues,
            [name]: value,
        });

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

    // Validate all fields
    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validate description
        if (!formValues.description.trim()) {
            newErrors.description = "تفصیل اړین دی";
            isValid = false;
        } else if (formValues.description.length < 10) {
            newErrors.description = "تفصیل باید لږترلږه 10 توري ولري";
            isValid = false;
        } else if (formValues.description.length > 2000) {
            newErrors.description = "تفصیل باید له 2000 تورو څخه لږ وي";
            isValid = false;
        } else if (
            /[^a-zA-Z\u0600-\u06FF\s.,!?]/.test(formValues.description)
        ) {
            newErrors.description = "تفصیل کې باید یوازې توري وي";
            isValid = false;
        }

        // Validate category
        if (!formValues.category.trim()) {
            newErrors.category = "کټګورۍ اړینه ده";
            isValid = false;
        } else if (
            !["Cloths", "Uniform", "Kortai", "Sadrai"].includes(
                formValues.category
            )
        ) {
            newErrors.category = "مهرباني وکړئ یوه معتبره کټګورۍ وټاکئ";
            isValid = false;
        }

        setFormErrors(newErrors);
        return isValid;
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
                setImagePreview(currentPost?.image || null);
                // Clear the file input
                e.target.value = "";
                return;
            }

            setImageFile(file);
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
            setImagePreview(currentPost?.image || null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields
        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        // Get current date in YYYY-MM-DD format
        const currentDate = new Date().toISOString().split("T")[0];

        const newPost = {
            id: isEditing ? currentPost.id : posts.length + 1,
            title: currentPost?.title || "",
            description: formValues.description,
            image: imageFile
                ? URL.createObjectURL(imageFile)
                : currentPost?.image,
            date: currentDate, // Set the current date automatically
            author: currentPost?.author || "System",
            email: currentPost?.email || "",
            category: formValues.category,
            comments: isEditing ? currentPost.comments : 0,
            views: isEditing ? currentPost.views : 0,
        };

        if (isEditing) {
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === currentPost.id ? newPost : post
                )
            );
        } else {
            setPosts((prevPosts) => [...prevPosts, newPost]);
        }
        setShowForm(false);
        resetForm();
    };

    const handleDeletePost = (postId) => {
        setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
    };

    // Get input class based on validation state
    const getInputClass = (fieldName) => {
        const baseClass =
            "border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";

        if (formErrors[fieldName]) {
            return `${baseClass} border-red-500 bg-red-50`;
        } else if (formValues[fieldName] && formValues[fieldName].length > 0) {
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
                            <h1 className="text-2xl md:text-4xl font-bold font-zar text-gray-800">
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
                                    <th className="px-4 py-3 text-right font-zar text-gray-500 uppercase tracking-wider cursor-pointer">
                                        عکس
                                    </th>
                                    <th className="px-4 py-3 text-right font-zar text-gray-500 uppercase tracking-wider cursor-pointer">
                                        تفصیل
                                    </th>
                                    <th className="px-4 py-3 text-right font-zar text-gray-500 uppercase tracking-wider cursor-pointer">
                                        تاریخ
                                    </th>
                                    <th className="px-4 py-3 text-right font-zar text-gray-500 uppercase tracking-wider cursor-pointer">
                                        کټګورۍ
                                    </th>
                                    <th className="px-4 py-3 text-right font-zar text-gray-500 uppercase tracking-wider cursor-pointer">
                                        عملیات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-gray-200">
                                {posts
                                    .filter((post) =>
                                        post.title.includes(searchTerm)
                                    )
                                    .map((post) => (
                                        <tr
                                            key={post.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="py-4 px-4 text-right whitespace-nowrap">
                                                <img
                                                    src={
                                                        post.image ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt={post.title}
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

                {/* Empty state */}
                {posts.filter((post) => post.title.includes(searchTerm))
                    .length === 0 && (
                    <div className="text-center py-10">
                        <h3 className="mt-2 text-sm font-bold font-zar text-gray-900">
                            هیڅ پوست ونه موندل شو
                        </h3>
                    </div>
                )}

                {/* Add/Edit Post Form Overlay */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-1 gap-5"
                            >
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700"
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

                                    {formErrors.image && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {formErrors.image}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        تفصیل
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formValues.description}
                                        onChange={handleInputChange}
                                        className={getInputClass("description")}
                                        rows="4"
                                        maxLength="2000"
                                    />
                                    <div className="text-sm text-gray-500">
                                        {descriptionChars}/2000 توري
                                    </div>
                                    {formErrors.description && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {formErrors.description}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        کټګورۍ
                                    </label>
                                    <select
                                        name="category"
                                        value={formValues.category}
                                        onChange={handleInputChange}
                                        className={getInputClass("category")}
                                    >
                                        <option value="">کټګورۍ وټاکئ</option>
                                        <option value="Cloths">Cloths</option>
                                        <option value="Uniform">Uniform</option>
                                        <option value="Kortai">Kortai</option>
                                        <option value="Sadrai">Sadrai</option>
                                    </select>
                                    {formErrors.category && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {formErrors.category}
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

export default Post;

import { useState, useEffect } from "react";

import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
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
        title: "",
        description: "",
        date: "",
        author: "",
        category: "",
        email: "", // Added email field
    });

    // Character counters
    const [titleChars, setTitleChars] = useState(0);
    const [descriptionChars, setDescriptionChars] = useState(0);
    const [authorChars, setAuthorChars] = useState(0);
    const [emailChars, setEmailChars] = useState(0); // Added email character counter

    // Set form values when editing
    useEffect(() => {
        if (currentPost) {
            setFormValues({
                title: currentPost.title || "",
                description: currentPost.description || "",
                date: currentPost.date || "",
                author: currentPost.author || "",
                category: currentPost.category || "",
                email: currentPost.email || "", // Added email field
            });
            setTitleChars(currentPost.title?.length || 0);
            setDescriptionChars(currentPost.description?.length || 0);
            setAuthorChars(currentPost.author?.length || 0);
            setEmailChars(currentPost.email?.length || 0); // Added email character counter
            setImagePreview(currentPost.image || null);
        } else {
            resetForm();
        }
    }, [currentPost]);

    // Update resetForm function
    const resetForm = () => {
        setFormValues({
            title: "",
            description: "",
            date: "",
            author: "",
            category: "",
            email: "", // Added email field
        });
        setFormErrors({});
        setTitleChars(0);
        setDescriptionChars(0);
        setAuthorChars(0);
        setEmailChars(0); // Reset email character counter
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
        if (name === "title") {
            setTitleChars(value.length);
        } else if (name === "description") {
            setDescriptionChars(value.length);
        } else if (name === "author") {
            setAuthorChars(value.length);
        } else if (name === "email") {
            setEmailChars(value.length);
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
            case "title":
                if (!value.trim()) {
                    errors.title = "عنوان اړین دی";
                } else if (value.length < 3) {
                    errors.title = "عنوان باید لږترلږه 3 توري ولري";
                } else if (value.length > 100) {
                    errors.title = "عنوان باید له 100 تورو څخه لږ وي";
                } else if (/[^a-zA-Z\u0600-\u06FF\s]/.test(value)) {
                    // Only allow letters and spaces (including Arabic/Persian characters)
                    errors.title = "عنوان کې باید یوازې توري وي";
                } else {
                    delete errors.title;
                }
                break;

            case "description":
                if (!value.trim()) {
                    errors.description = "تفصیل اړین دی";
                } else if (value.length < 10) {
                    errors.description = "تفصیل باید لږترلږه 10 توري ولري";
                } else if (value.length > 2000) {
                    errors.description = "تفصیل باید له 2000 تورو څخه لږ وي";
                } else if (/[^a-zA-Z\u0600-\u06FF\s.,!?]/.test(value)) {
                    // Only allow letters, spaces, and basic punctuation
                    errors.description = "تفصیل کې باید یوازې توري وي";
                } else {
                    delete errors.description;
                }
                break;

            case "date":
                if (!value) {
                    errors.date = "تاریخ اړین دی";
                } else if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                    errors.date = "تاریخ باید په سمه بڼه وي (YYYY-MM-DD)";
                } else {
                    delete errors.date;
                }
                break;

            case "author":
                if (!value.trim()) {
                    errors.author = "لیکوال اړین دی";
                } else if (value.length < 2) {
                    errors.author = "د لیکوال نوم باید لږترلږه 2 توري ولري";
                } else if (value.length > 50) {
                    errors.author = "د لیکوال نوم باید له 50 تورو څخه لږ وي";
                } else if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(value)) {
                    errors.author = "د لیکوال نوم کې باید یوازې توري وي";
                } else {
                    delete errors.author;
                }
                break;

            case "category":
                if (!value.trim()) {
                    errors.category = "کټګورۍ اړینه ده";
                } else if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(value)) {
                    errors.category = "کټګورۍ کې باید یوازې توري وي";
                } else {
                    delete errors.category;
                }
                break;

            case "email":
                if (!value.trim()) {
                    errors.email = "ایمیل اړین دی";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errors.email = "ایمیل باید په سمه بڼه وي";
                } else {
                    delete errors.email;
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

        // Validate title
        if (!formValues.title.trim()) {
            newErrors.title = "عنوان اړین دی";
            isValid = false;
        } else if (formValues.title.length < 3) {
            newErrors.title = "عنوان باید لږترلږه 3 توري ولري";
            isValid = false;
        } else if (formValues.title.length > 100) {
            newErrors.title = "عنوان باید له 100 تورو څخه لږ وي";
            isValid = false;
        } else if (/[^a-zA-Z\u0600-\u06FF\s]/.test(formValues.title)) {
            newErrors.title = "عنوان کې باید یوازې توري وي";
            isValid = false;
        }

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

        // Validate date
        if (!formValues.date) {
            newErrors.date = "تاریخ اړین دی";
            isValid = false;
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formValues.date)) {
            newErrors.date = "تاریخ باید په سمه بڼه وي (YYYY-MM-DD)";
            isValid = false;
        }

        // Validate author
        if (!formValues.author.trim()) {
            newErrors.author = "لیکوال اړین دی";
            isValid = false;
        } else if (formValues.author.length < 2) {
            newErrors.author = "د لیکوال نوم باید لږترلږه 2 توري ولري";
            isValid = false;
        } else if (formValues.author.length > 50) {
            newErrors.author = "د لیکوال نوم باید له 50 تورو څخه لږ وي";
            isValid = false;
        } else if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(formValues.author)) {
            newErrors.author = "د لیکوال نوم باید یوازې توري وي";
            isValid = false;
        }

        // Validate category
        if (!formValues.category.trim()) {
            newErrors.category = "کټګورۍ اړینه ده";
            isValid = false;
        } else if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(formValues.category)) {
            newErrors.category = "کټګورۍ کې باید یوازې توري وي";
            isValid = false;
        }

        // Validate email
        if (!formValues.email.trim()) {
            newErrors.email = "ایمیل اړین دی";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
            newErrors.email = "ایمیل باید په سمه بڼه وي";
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

        const newPost = {
            id: isEditing ? currentPost.id : posts.length + 1,
            title: formValues.title,
            description: formValues.description,
            image: imageFile
                ? URL.createObjectURL(imageFile)
                : currentPost?.image,
            date: formValues.date,
            author: formValues.author,
            category: formValues.category,
            email: formValues.email, // Added email field
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
                {/* Search bar and Add Post button */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <div className="w-full sm:w-1/2">
                        <SearchBar
                            placeholder="د پوست نوم ولټوه..."
                            onSearch={handleSearch}
                            initialValue={searchTerm}
                            className="w-full"
                        />
                    </div>
                    <SystemButtons type="add" onClick={handleAddPost} />
                </div>

                {/* Table section */}
                <div className="overflow-x-auto border rounded-lg shadow-sm">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                    عکس
                                </th>
                                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                    عنوان
                                </th>
                                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                    تفصیل
                                </th>
                                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                    تاریخ
                                </th>
                                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                    لیکوال
                                </th>
                                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                    ایمیل
                                </th>
                                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                    کټګورۍ
                                </th>
                                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
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
                                                    "/placeholder.svg" ||
                                                    "/placeholder.svg"
                                                }
                                                alt={post.title}
                                                className="h-16 w-16 object-cover rounded-md shadow-sm"
                                            />
                                        </td>
                                        <td className="py-4 px-4 text-right whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {post.title}
                                            </div>
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
                                            <div className="text-sm text-gray-500">
                                                {post.author}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {post.email}
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

                {/* Empty state */}
                {posts.filter((post) => post.title.includes(searchTerm))
                    .length === 0 && (
                    <div className="text-center py-10">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
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
                                className="grid grid-cols-2 gap-5"
                            >
                                <div className="relative">
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                        htmlFor="title"
                                    >
                                        عنوان{" "}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={formValues.title}
                                            onChange={handleInputChange}
                                            className={getInputClass("title")}
                                            maxLength={100}
                                        />
                                        {formValues.title && (
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                {formErrors.title ? (
                                                    <AiOutlineCloseCircle className="text-red-500" />
                                                ) : (
                                                    <AiOutlineCheckCircle className="text-green-500" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {formErrors.title && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {formErrors.title}
                                        </p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500 text-right">
                                        {titleChars}/100
                                    </p>
                                </div>

                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                        htmlFor="image"
                                    >
                                        عکس
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

                                <div className="relative">
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                        htmlFor="date"
                                    >
                                        تاریخ
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={formValues.date}
                                        onChange={handleInputChange}
                                        className={getInputClass("date")}
                                    />
                                    {formErrors.date && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {formErrors.date}
                                        </p>
                                    )}
                                </div>

                                <div className="relative">
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                        htmlFor="author"
                                    >
                                        لیکوال{" "}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="author"
                                            name="author"
                                            value={formValues.author}
                                            onChange={handleInputChange}
                                            className={getInputClass("author")}
                                            maxLength={50}
                                        />
                                        {formValues.author && (
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                {formErrors.author ? (
                                                    <AiOutlineCloseCircle className="text-red-500" />
                                                ) : (
                                                    <AiOutlineCheckCircle className="text-green-500" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {formErrors.author && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {formErrors.author}
                                        </p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500 text-right">
                                        {authorChars}/50
                                    </p>
                                </div>

                                <div className="relative">
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                        htmlFor="email"
                                    >
                                        ایمیل{" "}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formValues.email}
                                            onChange={handleInputChange}
                                            className={getInputClass("email")}
                                            placeholder="example@domain.com"
                                        />
                                        {formValues.email && (
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                {formErrors.email ? (
                                                    <AiOutlineCloseCircle className="text-red-500" />
                                                ) : (
                                                    <AiOutlineCheckCircle className="text-green-500" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {formErrors.email && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {formErrors.email}
                                        </p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500 text-right">
                                        {emailChars}/100
                                    </p>
                                </div>

                                <div className="relative">
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                        htmlFor="category"
                                    >
                                        کټګورۍ{" "}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="category"
                                            name="category"
                                            value={formValues.category}
                                            onChange={handleInputChange}
                                            className={getInputClass(
                                                "category"
                                            )}
                                        />
                                        {formValues.category && (
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                {formErrors.category ? (
                                                    <AiOutlineCloseCircle className="text-red-500" />
                                                ) : (
                                                    <AiOutlineCheckCircle className="text-green-500" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {formErrors.category && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {formErrors.category}
                                        </p>
                                    )}
                                </div>

                                <div className="relative col-span-2">
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                        htmlFor="description"
                                    >
                                        تفصیل{" "}
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows="3"
                                            value={formValues.description}
                                            onChange={handleInputChange}
                                            className={getInputClass(
                                                "description"
                                            )}
                                            maxLength={2000}
                                        />
                                        {formValues.description && (
                                            <div className="absolute top-3 right-3 flex items-center pointer-events-none">
                                                {formErrors.description ? (
                                                    <AiOutlineCloseCircle className="text-red-500" />
                                                ) : (
                                                    <AiOutlineCheckCircle className="text-green-500" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {formErrors.description && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {formErrors.description}
                                        </p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500 text-right">
                                        {descriptionChars}/2000
                                    </p>
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

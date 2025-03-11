import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { usePosts } from "../../Contexts/PostContext"; // Import the context

const Post = () => {
    const { posts, setPosts } = usePosts(); // Use the context
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const handleAddPost = () => {
        setCurrentPost(null);
        setIsEditing(false);
        setShowForm(true);
        setImageFile(null); // Reset image file
    };

    const handleEditPost = (post) => {
        setCurrentPost(post);
        setIsEditing(true);
        setShowForm(true);
        setImageFile(null); // Reset image file
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newPost = {
            id: isEditing ? currentPost.id : posts.length + 1,
            title: formData.get("title"),
            description: formData.get("description"),
            image: imageFile
                ? URL.createObjectURL(imageFile)
                : currentPost?.image, // Use uploaded image or the current one
            date: formData.get("date"),
            author: formData.get("author"),
            category: formData.get("category"),
            comments: isEditing ? currentPost.comments : 0,
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
    };

    const handleDeletePost = (postId) => {
        setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
    };

    return (
        <AuthenticatedLayout>
            <div className="border p-4 bg-gradient-to-b from-white to-gray-50 min-h-screen rounded-lg shadow-md">
                {/* Search bar and Add Post button */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <div className="relative w-full sm:w-1/2">
                        <input
                            type="text"
                            placeholder="د پوست نوم ولټوه..."
                            className="border border-gray-300 rounded-lg p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <button
                        onClick={handleAddPost}
                        className="bg-blue-500 ml-10 text-white p-2 rounded"
                    >
                        اضافه کول
                    </button>
                </div>

                {/* Table section */}
                <div className="overflow-x-auto border rounded-lg ">
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
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="py-4 mt-6 px-4 flex justify-center gap-2 text-right">
                                            <button
                                                onClick={() =>
                                                    handleEditPost(post)
                                                }
                                                className="text-blue-500"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeletePost(post.id)
                                                }
                                                className="text-red-500 ml-2"
                                            >
                                                <MdDelete />
                                            </button>
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
                        <p className="mt-1 text-sm text-gray-500">
                            د نوي پوست د اضافه کولو لپاره، د اضافه کولو تڼۍ
                            کیکاږئ.
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={handleAddPost}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                <AiOutlinePlus
                                    className="-ml-1 mr-2 h-5 w-5"
                                    aria-hidden="true"
                                />
                                نوی پوست اضافه کړئ
                            </button>
                        </div>
                    </div>
                )}

                {/* Add/Edit Post Form Overlay */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
                            <h2 className="text-xl font-bold mb-6 border-b pb-2">
                                {isEditing ? "پوست سمول" : "نوې پوست اضافه کړئ"}
                            </h2>
                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-2 gap-5"
                            >
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                        htmlFor="title"
                                    >
                                        عنوان
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        defaultValue={
                                            currentPost ? currentPost.title : ""
                                        }
                                        required
                                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
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
                                        onChange={(e) =>
                                            setImageFile(e.target.files[0])
                                        }
                                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
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
                                        defaultValue={
                                            currentPost ? currentPost.date : ""
                                        }
                                        required
                                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                        htmlFor="author"
                                    >
                                        لیکوال
                                    </label>
                                    <input
                                        type="text"
                                        id="author"
                                        name="author"
                                        defaultValue={
                                            currentPost
                                                ? currentPost.author
                                                : ""
                                        }
                                        required
                                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                        htmlFor="category"
                                    >
                                        کټګورۍ
                                    </label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        defaultValue={
                                            currentPost
                                                ? currentPost.category
                                                : ""
                                        }
                                        required
                                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                        htmlFor="description"
                                    >
                                        تفصیل
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="3"
                                        defaultValue={
                                            currentPost
                                                ? currentPost.description
                                                : ""
                                        }
                                        required
                                        className="border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div className="flex justify-between pt-4 border-t col-span-2">
                                    <button
                                        type="button"
                                        onClick={handleCloseForm}
                                        className="bg-red-600 text-white px-5 py-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                    >
                                        تړل
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                    >
                                        {isEditing ? "سمول" : "اضافه کول"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Post;

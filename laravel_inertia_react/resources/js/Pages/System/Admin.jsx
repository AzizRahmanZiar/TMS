"use client";

import { usePage, router } from "@inertiajs/react";
import SystemLayout from "@/Layouts/SystemLayout";
import { useState, useEffect } from "react";
import { FaEdit, FaUser, FaSearch, FaUsers } from "react-icons/fa";
import SearchBar from "@/Components/SearchBar";
import SystemButtons from "@/Components/SystemButtons";

const Admin = () => {
    const { auth, flash } = usePage().props;
    const [searchTerm, setSearchTerm] = useState("");
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        role: "",
    });

    // Show success message
    useEffect(() => {
        if (flash.message) {
            // You can implement a toast notification here
            console.log(flash.message);
        }
    }, [flash.message]);

    // Handle search
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter users based on search term
    const users = auth.user ? [auth.user] : [];
    const filteredUsers = users.filter(
        (user) =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle edit user
    const handleEdit = (user, index) => {
        setEditingUser(index);
        setEditForm({
            name: user.name || "",
            email: user.email || "",
            role: user.role || "",
        });
    };

    // Handle save edit
    const handleSaveEdit = (index) => {
        const user = users[index];
        router.put(route("user.update", user.id), editForm, {
            onSuccess: () => {
                setEditingUser(null);
            },
            onError: (errors) => {
                // You can implement error handling here
                console.error(errors);
            },
        });
    };

    // Handle cancel edit
    const handleCancelEdit = () => {
        setEditingUser(null);
    };

    // Handle form change
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle delete user
    const handleDeleteUser = (index) => {
        // Implement delete logic here
        console.log(`Deleting user at index: ${index}`);
    };

    return (
        <SystemLayout>
            <div className="p-6">
                <div className="bg-white rounded-lg border p-6">
                    <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="flex items-center gap-5">
                                    <FaUsers className="h-8 w-8 text-gray-600" />
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        د یوزرانو لیست
                                    </h2>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                                    <div className="w-full">
                                        <SearchBar
                                            placeholder="د ادمین نوم ولټوه..."
                                            onSearch={handleSearch}
                                            initialValue={searchTerm}
                                            className="w-full"
                                        />
                                    </div>
                                    {/* Add your admin-specific buttons or actions here */}
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            نوم
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            ایمیل
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            رول
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            عملیې
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-50 divide-y divide-gray-200">
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user, index) => (
                                            <tr
                                                key={index}
                                                className="hover:bg-gray-100 transition duration-150"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {editingUser === index ? (
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={
                                                                editForm.name
                                                            }
                                                            onChange={
                                                                handleFormChange
                                                            }
                                                            className="text-sm font-medium text-gray-900 border border-gray-200 rounded px-2 py-1 w-full"
                                                        />
                                                    ) : (
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {user.name ||
                                                                "No name"}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {editingUser === index ? (
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={
                                                                editForm.email
                                                            }
                                                            onChange={
                                                                handleFormChange
                                                            }
                                                            className="text-sm text-gray-900 border border-gray-200 rounded px-2 py-1 w-full"
                                                        />
                                                    ) : (
                                                        <div className="text-sm text-gray-900">
                                                            {user.email ||
                                                                "No email"}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {editingUser === index ? (
                                                        <select
                                                            name="role"
                                                            value={
                                                                editForm.role
                                                            }
                                                            onChange={
                                                                handleFormChange
                                                            }
                                                            className="text-sm border border-gray-200 rounded px-2 py-1 w-full"
                                                        >
                                                            <option value="User">
                                                                User
                                                            </option>
                                                            <option value="Tailor">
                                                                Tailor
                                                            </option>
                                                            <option value="Admin">
                                                                Admin
                                                            </option>
                                                        </select>
                                                    ) : (
                                                        <span className="py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-200 text-gray-800 px-2">
                                                            {user.role ||
                                                                "Unknown"}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex gap-2">
                                                        {editingUser ===
                                                        index ? (
                                                            <>
                                                                <SystemButtons
                                                                    type="submit"
                                                                    onClick={() =>
                                                                        handleSaveEdit(
                                                                            index
                                                                        )
                                                                    }
                                                                    icon={true}
                                                                    title="ثبت کول"
                                                                />
                                                                <SystemButtons
                                                                    type="cancel"
                                                                    onClick={
                                                                        handleCancelEdit
                                                                    }
                                                                    icon={true}
                                                                    title="لغو کول"
                                                                />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <SystemButtons
                                                                    type="edit"
                                                                    onClick={() =>
                                                                        handleEdit(
                                                                            user,
                                                                            index
                                                                        )
                                                                    }
                                                                    icon={true}
                                                                    title="سمول"
                                                                />
                                                                <SystemButtons
                                                                    type="delete"
                                                                    onClick={() =>
                                                                        handleDeleteUser(
                                                                            index
                                                                        )
                                                                    }
                                                                    icon={true}
                                                                    title="حذف کول"
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="px-6 py-10 text-center text-gray-500"
                                            >
                                                <div className="flex flex-col items-center">
                                                    <FaUser className="text-gray-300 text-5xl mb-3" />
                                                    <p className="text-lg font-medium">
                                                        No users found
                                                    </p>
                                                    <p className="text-sm text-gray-400 mt-1">
                                                        {searchTerm
                                                            ? "Try a different search term"
                                                            : "No users available"}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer with user count */}
                        <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
                            <div className="text-sm text-gray-600">
                                Showing{" "}
                                <span className="font-medium">
                                    {filteredUsers.length}
                                </span>{" "}
                                users
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SystemLayout>
    );
};

export default Admin;

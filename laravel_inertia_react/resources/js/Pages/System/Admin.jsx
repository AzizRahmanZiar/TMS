"use client";

import { useReg } from "@/Contexts/RegContext";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaUser, FaSearch, FaUsers } from "react-icons/fa";

const Admin = () => {
    const { reg, setReg } = useReg();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({
        username: "",
        email: "",
        role: "",
    });

    // Process images when reg changes
    useEffect(() => {
        if (reg && reg.length > 0) {
            const processedUsers = reg.map((user) => {
                // Process profile image if it exists and is a File
                let profileImageUrl = null;
                if (user.profileImage instanceof File) {
                    profileImageUrl = URL.createObjectURL(user.profileImage);
                }

                return {
                    ...user,
                    profileImageUrl,
                };
            });

            setUsers(processedUsers);
        } else {
            setUsers([]);
        }

        // Cleanup function to revoke object URLs
        return () => {
            users.forEach((user) => {
                if (user.profileImageUrl) {
                    URL.revokeObjectURL(user.profileImageUrl);
                }
            });
        };
    }, [reg]);

    // Handle search
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter users based on search term
    const filteredUsers = users.filter(
        (user) =>
            user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle delete user
    const handleDelete = (index) => {
        const newReg = [...reg];
        newReg.splice(index, 1);
        setReg(newReg);
        setConfirmDelete(null);
    };

    // Handle edit user
    const handleEdit = (user, index) => {
        setEditingUser(index);
        setEditForm({
            username: user.username || "",
            email: user.email || "",
            role: user.role || "",
        });
    };

    // Handle save edit
    const handleSaveEdit = (index) => {
        const newReg = [...reg];
        newReg[index] = {
            ...newReg[index],
            username: editForm.username,
            email: editForm.email,
            role: editForm.role,
        };
        setReg(newReg);
        setEditingUser(null);
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

    return (
        <AuthenticatedLayout>
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl border overflow-hidden">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-200 from-blue-600">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="flex items-center gap-5">
                                    <FaUsers className="h-8 w-8" />
                                    <h2 className="text-2xl font-bold">
                                        د یوزرانو لیست
                                    </h2>
                                </div>
                                <div className="mt-4 md:mt-0 flex items-center">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search users..."
                                            className="pl-10 pr-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            یوزر
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ایمېل
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            رول
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            پروفایل
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            عملیې
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user, index) => (
                                            <tr
                                                key={index}
                                                className="hover:bg-gray-50 transition duration-150"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {editingUser === index ? (
                                                        <input
                                                            type="text"
                                                            name="username"
                                                            value={
                                                                editForm.username
                                                            }
                                                            onChange={
                                                                handleFormChange
                                                            }
                                                            className="text-sm font-medium text-gray-900 border rounded px-2 py-1 w-full"
                                                        />
                                                    ) : (
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {user.username ||
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
                                                            className="text-sm text-gray-900 border rounded px-2 py-1 w-full"
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
                                                            className="text-sm"
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
                                                        <span
                                                            className=" py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                                            "
                                                        >
                                                            {user.role ||
                                                                "Unknown"}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                                                            {user.profileImageUrl ? (
                                                                <img
                                                                    src={
                                                                        user.profileImageUrl ||
                                                                        "/placeholder.svg"
                                                                    }
                                                                    alt={
                                                                        user.username
                                                                    }
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="h-full w-full flex items-center justify-center">
                                                                    <FaUser className="text-gray-400 text-xl" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex gap-2">
                                                        {editingUser ===
                                                        index ? (
                                                            <>
                                                                <button
                                                                    className="text-white bg-green-500 hover:bg-green-600 px-2 py-1 rounded-md text-xs transition duration-150"
                                                                    onClick={() =>
                                                                        handleSaveEdit(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    Save
                                                                </button>
                                                                <button
                                                                    className="bg-red-500 text-white hover:bg-red-600 px-2 py-1 rounded-md text-xs transition duration-150"
                                                                    onClick={
                                                                        handleCancelEdit
                                                                    }
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button
                                                                className="text-blue-600  hover:text-blue-700 transition duration-150"
                                                                title="Edit user"
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        user,
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <FaEdit />
                                                            </button>
                                                        )}

                                                        {confirmDelete ===
                                                        index ? (
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    className="text-white bg-green-500 hover:bg-green-600 px-2 py-1 rounded-md text-xs transition duration-150"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    Confirm
                                                                </button>
                                                                <button
                                                                    className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md text-xs transition duration-150"
                                                                    onClick={() =>
                                                                        setConfirmDelete(
                                                                            null
                                                                        )
                                                                    }
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                className="text-red-600 hover:text-red-700 transition duration-150"
                                                                title="Delete user"
                                                                onClick={() =>
                                                                    setConfirmDelete(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
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

                        {/* Footer with pagination (placeholder) */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-500">
                                    Showing{" "}
                                    <span className="font-medium">
                                        {filteredUsers.length}
                                    </span>{" "}
                                    users
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                        disabled
                                    >
                                        Previous
                                    </button>
                                    <button
                                        className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                        disabled
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Admin;

import { useState, useEffect } from "react";
import SystemLayout from "@/Layouts/SystemLayout";
import { usePage, router } from "@inertiajs/react";
import { FaTrash, FaUser, FaUserTie, FaUserShield } from "react-icons/fa";
import SearchBar from "@/Components/SearchBar";

const Admin = () => {
    const pageProps = usePage().props;
    console.log("All page props:", pageProps);

    const { users = [] } = pageProps;
    console.log("Users from props:", users);

    const [searchTerm, setSearchTerm] = useState("");

    // Debug the users data
    useEffect(() => {
        console.log("Users data in component:", users);
    }, [users]);

    // Filter users based on search term
    const filteredUsers = users.filter((user) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            user.name.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower) ||
            user.role.toLowerCase().includes(searchLower)
        );
    });

    console.log("Filtered users:", filteredUsers);

    // Handle delete user
    const handleDeleteUser = (userId) => {
        if (window.confirm("ایا تاسو ډاډه یاست چې دا کارن حذف کړئ؟")) {
            router.delete(route("user.delete", userId), {
                onSuccess: () => {
                    // Show success message or handle as needed
                },
                onError: (errors) => {
                    console.error("Error deleting user:", errors);
                },
            });
        }
    };

    // // Get role icon based on user role
    const getRoleIcon = (role) => {
        switch (role) {
            case "admin":
                return <FaUserShield className="text-blue-500" />;
            case "tailor":
                return <FaUserTie className="text-green-500" />;
            default:
                return <FaUser className="text-gray-500" />;
        }
    };

    // Get role text in Pashto
    const getRoleText = (role) => {
        switch (role) {
            case "admin":
                return "اډمین";
            case "tailor":
                return "خیاط";
            default:
                return "مشتــــري";
        }
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    return (
        <SystemLayout>
            <div className="p-3 md:p-6" dir="rtl">
                <div className="bg-white rounded-2xl border-0.5 border-tertiary-200 p-3 md:p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        {/* <div className="relative w-full md:w-auto">
                            <input
                                type="text"
                                name="search"
                                placeholder="لټون..."
                                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div> */}

                        <div className="relative flex-1">
                            <SearchBar
                                placeholder="د نوم، بریښنالیک یا موضوع په اساس لټون..."
                                onSearch={handleSearch}
                                initialValue={searchTerm}
                                className="w-full"
                            />
                        </div>

                        <h1 className="text-xl md:text-3xl font-bold text-gray-800">
                            د کار کوونکو مدیریت
                        </h1>
                    </div>

                    <div className="overflow-x-auto border-0.5 border-tertiary-200 rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        نوم
                                    </th>
                                    <th className="px-3 md:pl-20 py-3 text-left font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        بریښنالیک
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        رول
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                        د ثبت نیټه
                                    </th>
                                    <th className="px-3 md:px-6 py-3 text-right font-zar text-sm md:text-xl text-gray-500 uppercase tracking-wider">
                                        عملیات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                                            <div className="flex gap-2 md:gap-3 items-center">
                                                <div className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10">
                                                    <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                        {getRoleIcon(user.role)}
                                                    </div>
                                                </div>
                                                <div className="mr-2 md:mr-4">
                                                    <div className="font-zar text-sm md:text-xl text-gray-900">
                                                        {user.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 md:pl-20 py-4 text-left whitespace-nowrap">
                                            <div className="font-zar text-sm md:text-xl text-gray-900 truncate max-w-[100px] md:max-w-none">
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex leading-5 font-zar text-sm md:text-xl rounded-full text-blue-800">
                                                {getRoleText(user.role)}
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-4 whitespace-nowrap font-zar text-sm md:text-xl text-gray-500 hidden md:table-cell">
                                            {new Date(
                                                user.created_at
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() =>
                                                    handleDeleteUser(user.id)
                                                }
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <FaTrash className="inline-block" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </SystemLayout>
    );
};

export default Admin;

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePosts } from "../../Contexts/PostContext";

// import Layout from "@/Layouts/Layout";
export default function Dashboard() {
    const { posts } = usePosts();
    return (
        <AuthenticatedLayout>
            <div className="border p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Post List</h2>
                <div className="overflow-x-auto border rounded-lg">
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
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-gray-200">
                            {posts.map((post) => (
                                <tr
                                    key={post.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-4 px-4 text-right whitespace-nowrap">
                                        <img
                                            src={
                                                post.image || "/placeholder.svg"
                                            }
                                            alt={post.title}
                                            className="h-16 w-16 object-cover rounded-md shadow-sm"
                                        />
                                    </td>
                                    <td className="py-4 px-4 text-right whitespace-nowrap">
                                        {post.title}
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        {post.description}
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        {post.date}
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        {post.author}
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        {post.category}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

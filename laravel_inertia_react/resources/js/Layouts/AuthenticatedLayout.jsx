import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";

import Sidebar from "@/Components/Sidebar";
import { Link } from "@inertiajs/react";

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900" dir="rtl">
            <nav className=" bg-gray-800 text-white  dark:bg-gray-800">
                <ul className="flex justify-between px-20 py-4">
                    <li>
                        <Link href="./dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                </ul>
            </nav>
            <div className="flex justify-between">
                <Sidebar />
                <main className="flex-1 bg-white p-4">{children}</main>
            </div>
        </div>
    );
}

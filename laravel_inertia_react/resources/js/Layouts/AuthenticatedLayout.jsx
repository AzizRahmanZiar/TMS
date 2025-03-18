// import ApplicationLogo from "@/Components/ApplicationLogo";
// import NavLink from "@/Components/NavLink";

// import Sidebar from "@/Components/Sidebar";
// import { Link } from "@inertiajs/react";

// export default function AuthenticatedLayout({ children }) {
//     return (
//         <div className="h-screen overflow-hidden bg-gray-100 " dir="rtl">
//             <nav className=" bg-primary-800 text-primary-50 ">
//                 <ul className="flex justify-between px-20 py-6">
//                     <li>
//                         <Link
//                             href="./dashboard"
//                             className="bg-secondary-600 hover:bg-secondary-700 font-semibold p-3 rounded-md text-primary-50"
//                         >
//                             Dashboard
//                         </Link>
//                     </li>
//                     <li>
//                         <Link
//                             href="/"
//                             className="bg-tertiary-500 font-semibold p-3 rounded-md hover:bg-tertiary-600"
//                         >
//                             Home
//                         </Link>
//                     </li>
//                 </ul>
//             </nav>
//             <div className="flex justify-between">
//                 <Sidebar />
//                 <main className="flex-1 bg-white p-4 ">{children}</main>
//             </div>
//         </div>
//     );
// }

import Sidebar from "@/Components/Sidebar";
import { Link } from "@inertiajs/react";

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="h-screen overflow-hidden bg-gray-100" dir="rtl">
            <nav className="bg-primary-800 text-primary-50">
                <ul className="flex justify-between px-20 py-6">
                    <li>
                        <Link
                            href="./dashboard"
                            className="bg-secondary-600 hover:bg-secondary-700 font-semibold p-3 rounded-md text-primary-50"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/"
                            className="bg-tertiary-500 font-semibold p-3 rounded-md hover:bg-tertiary-600"
                        >
                            Home
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="flex h-[calc(100vh-4rem)]">
                <div className="w-[10rem] h-full  bg-gray-200">
                    <Sidebar />
                </div>

                <main className="flex-1 h-full overflow-y-auto bg-white p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}

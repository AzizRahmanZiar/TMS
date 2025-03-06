import Sidebar from "@/Components/Sidebar";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-900 dark:bg-gray-900" dir="rtl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex gap-5">
                        <div className="flex shrink-0 items-center"></div>

                        <div className="hidden  space-x-8 sm:-my-px sm:me-10 sm:flex"></div>
                    </div>
                </div>
            </div>

            <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-white p-4">{children}</main>
            </div>
        </div>
    );
}

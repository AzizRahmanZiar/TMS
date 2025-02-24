import { Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <div
                className="w-screen p-10 h-screen flex flex-col bg-gradient-to-br from-red-900 to-black"
                dir="rtl"
            >
                {auth.user ? (
                    <Link
                        className="font-bold p-3 rounded-lg bg-white w-[8rem] text-gray-800"
                        href={route("dashboard")}
                    >
                        اصلــــي صفحه
                    </Link>
                ) : (
                    <div className="flex p-10 gap-4 justify-start">
                        <Link
                            className="text-2xl font-bold text-white"
                            href={route("login")}
                        >
                            داخل سئ
                        </Link>
                        <Link
                            className="text-2xl font-bold text-white"
                            href={route("register")}
                        >
                            ځان ثبت کړئ
                        </Link>
                    </div>
                )}
                <div className="flex flex-col justify-center items-center flex-grow">
                    <h1 className="text-5xl font-bold text-white">
                        ښـــــه راغلاست!
                    </h1>
                </div>
            </div>
        </>
    );
}

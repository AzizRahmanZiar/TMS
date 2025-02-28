import { Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <div
            className="relative w-screen h-screen flex flex-col p-10"
            dir="rtl"
        >
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
            >
                <source src="./imgs/bg-1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

            <div className="relative z-10 text-right">
                {auth.user ? (
                    <Link
                        className="font-bold p-3 rounded-lg text-xl hover:ring-2 border ring-white  w-[8rem] text-white bg-gray-800 shadow"
                        href={route("dashboard")}
                    >
                        اصلــــي صفحه
                    </Link>
                ) : (
                    <div className="flex p-10 gap-4 justify-start">
                        <Link
                            className="text-xl font-semibold text-white bg-gray-800 hover:ring-2 border ring-white shadow p-2 rounded"
                            href={route("login")}
                        >
                            Login
                        </Link>
                        <Link
                            className="text-xl font-semibold text-white bg-gray-800 hover:ring-2 border ring-white shadow p-2 rounded"
                            href={route("register")}
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

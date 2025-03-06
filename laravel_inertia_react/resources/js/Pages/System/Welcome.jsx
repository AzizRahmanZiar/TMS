import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Welcome({ auth }) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div
            className="relative w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden"
            dir="rtl"
        >
            {/* Background Video with Professional Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="./imgs/bg-1.mp4" type="video/mp4" />
                    ستاسو براوزر د ویډیو ټاګ نه ملاتړ کوي.
                </video>

                {/* Professional Grid Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-900/70 to-gray-950/90"></div>
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                ></div>
            </div>

            {/* Accent Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600"></div>

            {/* Content Container */}
            <div
                className={`relative z-10 w-full max-w-5xl mx-auto px-4 transition-all duration-1000 ease-out
                   ${
                       isLoaded
                           ? "opacity-100 translate-y-0"
                           : "opacity-0 translate-y-10"
                   }`}
            >
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                    {/* Left Content - Logo and Text */}
                    <div className="w-full lg:w-1/2 text-center lg:text-right">
                        <div className="inline-block mb-6 p-3 rounded-full bg-blue-500/10 border border-blue-500/20">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="w-12 h-12 text-blue-500"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 12H2M22 4H2M22 20H2M6 8v8M18 8v8M12 16v-4" />
                            </svg>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white">
                            د خیاطۍ د مدیریت{" "}
                            <span className="text-blue-500">سیسټم</span>
                        </h1>

                        <p className="text-base sm:text-lg mb-8 text-gray-300 font-light leading-relaxed">
                            خپل د خیاطۍ کاروبار په عصري او هوښیار سیستم سره
                            مدیریت کړئ. د خیاطۍ مدیریت سیسټم ستاسو د کاروبار
                            لپاره ترټولو غوره حل دی.
                        </p>
                    </div>

                    {/* Right Content - Card */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-2xl">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-medium text-white">
                                    سیسټم ته ننوتل
                                </h2>
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                            </div>

                            {auth.user ? (
                                <div className="space-y-6">
                                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                                        <p className="text-gray-400 text-sm mb-1">
                                            کارمند
                                        </p>
                                        <p className="text-white font-medium">
                                            {auth.user.name || "کارمند"}
                                        </p>
                                    </div>

                                    <Link
                                        className="flex items-center justify-center w-full text-base font-medium px-6 py-3.5
                              bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                              transition-all duration-200 transform hover:translate-y-[-2px]
                              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                        href={
                                            window.route
                                                ? window.route("dashboard")
                                                : "/dashboard"
                                        }
                                    >
                                        <svg
                                            className="w-5 h-5 ml-2"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        داشبورد ته ننوتل
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <Link
                                        className="flex items-center justify-center w-full text-base font-medium px-6 py-3.5
                              bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                              transition-all duration-200 transform hover:translate-y-[-2px]
                              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                        href={
                                            window.route
                                                ? window.route("login")
                                                : "/login"
                                        }
                                    >
                                        <svg
                                            className="w-5 h-5 ml-2"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        ننوتل
                                    </Link>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-700"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-gray-900/80 text-gray-400">
                                                یا
                                            </span>
                                        </div>
                                    </div>

                                    <Link
                                        className="flex items-center justify-center w-full text-base font-medium px-6 py-3.5
                              bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700
                              transition-all duration-200 transform hover:translate-y-[-2px]
                              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                        href={
                                            window.route
                                                ? window.route("register")
                                                : "/register"
                                        }
                                    >
                                        <svg
                                            className="w-5 h-5 ml-2"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        نوی حساب جوړول
                                    </Link>
                                </div>
                            )}

                            <div className="mt-8 pt-6 border-t border-gray-800">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        <span className="text-sm text-gray-400">
                                            سیسټم فعال دی
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        v2.0.4
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-16 text-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} د خیاطۍ مدیریت سیسټم. ټول
                        حقوق خوندي دي.
                    </p>
                </div>
            </div>

            {/* Animated Particles for Professional Touch */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-blue-500"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            opacity: Math.random() * 0.3 + 0.1,
                            boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
                            animation: `floatSlow ${
                                Math.random() * 15 + 15
                            }s linear infinite`,
                        }}
                    ></div>
                ))}
            </div>

            {/* Add custom animation keyframes */}
            <style jsx>{`
                @keyframes floatSlow {
                    0% {
                        transform: translateY(0) translateX(0);
                    }
                    25% {
                        transform: translateY(-20px) translateX(10px);
                    }
                    50% {
                        transform: translateY(-10px) translateX(20px);
                    }
                    75% {
                        transform: translateY(10px) translateX(10px);
                    }
                    100% {
                        transform: translateY(0) translateX(0);
                    }
                }
            `}</style>
        </div>
    );
}

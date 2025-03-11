import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-primary-900 shadow-md py-4">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold">
                        <div className="flex items-end space-x-2">
                            <span>
                                <FaScissors className="text-primary-50" />
                            </span>
                            <span className="text-primary-50">ماسټر خیاط</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/shop"
                            className="text-primary-50 font-semibold hover:text-primary-400 transition"
                        >
                            دوکانونه
                        </Link>
                        <Link
                            href="/post"
                            className="text-primary-50 font-semibold hover:text-primary-400 transition"
                        >
                            پوسټونه
                        </Link>
                        <Link
                            href="/order"
                            className="text-primary-50 font-semibold hover:text-primary-400 transition"
                        >
                            فرمایش
                        </Link>
                        <Link
                            href="/about"
                            className="text-primary-50 font-semibold hover:text-primary-400 transition"
                        >
                            زموږ په اړه
                        </Link>

                        <Link
                            href="/contact"
                            className="text-primary-50 font-semibold hover:text-primary-400 transition"
                        >
                            اړیکه
                        </Link>
                        <Link
                            href="/tailor"
                            className="text-primary-50 font-semibold hover:text-primary-400 transition"
                        >
                            خیاطان
                        </Link>
                        <Link
                            href="/"
                            className="text-primary-50 font-semibold hover:text-primary-400 transition"
                        >
                            کور
                        </Link>
                    </div>

                    {/* Right side buttons */}
                    <div className="hidden md:flex items-center space-x-4 gap-5">
                        <Link
                            href="./dashboard"
                            className="bg-secondary-600 font-semibold text-primary-50 px-4 py-2 rounded-md hover:bg-secondary-700 transition text-center "
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="#"
                            className="bg-primary-50 font-semibold text-primary-900 px-4 py-2 rounded-md hover:bg-white transition"
                        >
                            <FaUser className="inline mr-2" />
                            ننوتل
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-primary-50"
                        >
                            {isOpen ? (
                                <FaTimes size={24} />
                            ) : (
                                <FaBars size={24} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <div className="flex flex-col space-y-4" dir="rtl">
                            <Link
                                href="/"
                                className="text-primary-50 font-semibold hover:text-primary-400 transition py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                کور
                            </Link>
                            <Link
                                href="/shop"
                                className="text-primary-50 font-semibold hover:text-primary-400 transition py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                دوکانونه
                            </Link>
                            <Link
                                href="/post"
                                className="text-primary-50 font-semibold hover:text-primary-400 transition py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                پوسټونه
                            </Link>
                            <Link
                                href="/order"
                                className="text-primary-50 font-semibold hover:text-primary-400 transition py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                فرمایش
                            </Link>
                            <Link
                                href="/about"
                                className="text-primary-50 font-semibold hover:text-primary-400 transition py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                زموږ په اړه
                            </Link>
                            <Link
                                href="/contact"
                                className="text-primary-50 font-semibold hover:text-primary-400 transition py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                اړیکه
                            </Link>
                            <Link
                                href="/tailor"
                                className="text-primary-50 font-semibold hover:text-primary-400 transition py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                خیاطان
                            </Link>{" "}
                            <Link
                                href="#"
                                className="bg-blue-600 font-semibold text-primary-50 px-4 py-2 rounded-md hover:bg-blue-700 transition text-center "
                                onClick={() => setIsOpen(false)}
                            >
                                <FaUser className="inline ml-2" />
                                ننوتل
                            </Link>
                            <Link
                                href="#"
                                className="bg-blue-600 font-semibold text-primary-50 px-4 py-2 rounded-md hover:bg-blue-700 transition text-center "
                            >
                                Dashboard
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

"use client";

import { useState, useEffect } from "react";
import {
    FaSearch,
    FaUser,
    FaBriefcase,
    FaCertificate,
    FaTools,
    FaHistory,
    FaClock,
} from "react-icons/fa";
import { Link } from "@inertiajs/react";
import SiteLayout from "../../Layouts/SiteLayout";
import { useReg } from "@/Contexts/RegContext";

const Tailors = () => {
    const { reg } = useReg();
    const [tailors, setTailors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [processedTailors, setProcessedTailors] = useState([]);

    // Filter tailors from reg data
    useEffect(() => {
        if (reg && reg.length > 0) {
            // Filter only users with role "Tailor"
            const tailorsList = reg.filter((user) => user.role === "Tailor");
            setTailors(tailorsList);
        } else {
            setTailors([]);
        }
        setLoading(false);
    }, [reg]);

    // Process images when tailors change
    useEffect(() => {
        const processTailorImages = async () => {
            const processed = tailors.map((tailor) => {
                // Create a new object with all the tailor properties
                const processedTailor = { ...tailor };

                // Process profile image if it exists and is a File
                if (tailor.profileImage instanceof File) {
                    processedTailor.profileImageUrl = URL.createObjectURL(
                        tailor.profileImage
                    );
                }

                return processedTailor;
            });

            setProcessedTailors(processed);
        };

        processTailorImages();

        // Cleanup function to revoke object URLs
        return () => {
            processedTailors.forEach((tailor) => {
                if (tailor.profileImageUrl) {
                    URL.revokeObjectURL(tailor.profileImageUrl);
                }
            });
        };
    }, [tailors]);

    // Filter function
    const handleFilter = () => {
        if (!reg) return;

        let filtered = reg.filter((user) => user.role === "Tailor");

        if (searchTerm) {
            filtered = filtered.filter(
                (tailor) =>
                    tailor.username
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    (tailor.career &&
                        tailor.career
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()))
            );
        }
        setTailors(filtered);
    };

    // Reset filters
    const resetFilters = () => {
        setSearchTerm("");
        if (reg) {
            setTailors(reg.filter((user) => user.role === "Tailor"));
        }
    };

    return (
        <SiteLayout>
            {/* Hero Section */}

            <section className="text-primary-900 py-10 lg:px-10 flex flex-col md:flex-row items-center">
                <div className="mx-auto px-4 text-start md:w-1/2">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        زموږ ماهر خیاطان
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto mb-4">
                        د خپلو اړتیاوو لپاره غوره خیاط ومومئ. زموږ مسلکي کسان د
                        کلونو تجربه لري او په بیلابیلو سټایلونو کې تخصص لري.
                        زموږ هدف د دې لپاره دی چې تاسو ته ځانګړي او د کیفیت
                        لرونکي لباسونه وړاندې کړو، چې ستاسو د شخصیت او سټایل سره
                        سمون خوري. د خیاطۍ هره پروژه د دقیقیت او خلاقیت سره
                        ترسره کیږي، ترڅو تاسو تل خوشحاله او راضي پاتې شئ.
                    </p>
                </div>
                <div className=" md:w-1/2">
                    <img
                        src="./imgs/ilus-2.jpg"
                        className="transform scale-x-[-1] p-10"
                        alt="tailor"
                    />
                </div>
            </section>
            {/* Filter section */}
            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex flex-1 items-center gap-2 border border-gray-300 p-3 rounded-lg bg-white">
                                <FaSearch className="text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="د خیاط نوم یا تخصص ولیکئ..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="flex-1 outline-none"
                                />
                            </div>
                            <button
                                onClick={handleFilter}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition duration-200 shadow-md"
                            >
                                لټون
                            </button>
                            <button
                                onClick={resetFilters}
                                className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg transition duration-200 shadow-md"
                            >
                                ریسیټ
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {/* Tailors list */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {processedTailors.length > 0 ? (
                                processedTailors.map((tailor, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                                    >
                                        <div className="p-6">
                                            <div className="flex items-center mb-6">
                                                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-100 mr-4 bg-gray-100 flex items-center justify-center">
                                                    {tailor.profileImageUrl ? (
                                                        <img
                                                            src={
                                                                tailor.profileImageUrl ||
                                                                "/placeholder.svg"
                                                            }
                                                            alt={
                                                                tailor.username
                                                            }
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <FaUser className="text-gray-300 text-4xl" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-bold text-gray-800">
                                                        {tailor.username}
                                                    </h2>
                                                    <p className="text-blue-600 font-medium">
                                                        {tailor.career ||
                                                            "خیاط"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-3 mb-6">
                                                <div className="flex items-start">
                                                    <FaBriefcase className="text-amber-600 mt-1 ml-2 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            تجربه
                                                        </p>
                                                        <p className="font-medium">
                                                            {tailor.experience
                                                                ? `${tailor.experience} کاله`
                                                                : "نامعلوم"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start">
                                                    <FaTools className="text-gray-600 mt-1 ml-2 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            مهارتونه
                                                        </p>
                                                        <p className="font-medium">
                                                            {tailor.skills ||
                                                                "هیڅ مهارت نشته"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start">
                                                    <FaCertificate className="text-yellow-600 mt-1 ml-2 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            تصدیق‌نامه
                                                        </p>
                                                        <p className="font-medium">
                                                            {tailor.certifications ||
                                                                "هیڅ معلومات نشته"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start">
                                                    <FaHistory className="text-indigo-600 mt-1 ml-2 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            مخکیني کارونه
                                                        </p>
                                                        <p className="font-medium">
                                                            {tailor.previousWork ||
                                                                "هیڅ معلومات نشته"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start">
                                                    <FaClock className="text-green-600 mt-1 ml-2 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            کاري شتون
                                                        </p>
                                                        <p className="font-medium">
                                                            {tailor.workAvailability ||
                                                                "نامعلوم"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {tailor.addShop && (
                                                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                                                    <p className="text-blue-700 font-medium">
                                                        دا خیاط خپل دوکان لري:{" "}
                                                        {tailor.tailoringName}
                                                    </p>
                                                </div>
                                            )}

                                            <div className="mt-6">
                                                <Link
                                                    href={`/tailors/${index}`}
                                                    className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg text-center hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-md"
                                                >
                                                    جزئیات وګورئ
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-3 text-center py-16">
                                    <div className="bg-white p-8 rounded-xl shadow-md max-w-lg mx-auto">
                                        <div className="text-gray-400 text-6xl mb-4">
                                            <FaUser className="mx-auto" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-700 mb-2">
                                            هیڅ خیاط ونه موندل شو
                                        </h3>
                                        <p className="text-gray-500 mb-6">
                                            په دې وخت کې هیڅ خیاط نشته یا ستاسو
                                            د لټون معیارونه هیڅ پایله نلري.
                                        </p>
                                        <button
                                            onClick={resetFilters}
                                            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            ټول خیاطان وګورئ
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </SiteLayout>
    );
};

export default Tailors;

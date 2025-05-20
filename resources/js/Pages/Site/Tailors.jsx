import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SiteLayout from "../../Layouts/SiteLayout";
import {
    FaSearch,
    FaFilter,
    FaUser,
    FaEnvelope,
    FaBriefcase,
    FaGraduationCap,
    FaTools,
    FaClock,
    FaStore,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";
import { Head } from "@inertiajs/react";

const Tailors = ({ tailors }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [experience, setExperience] = useState("");
    const [career, setCareer] = useState("");
    const [processedTailors, setProcessedTailors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Process tailor data
    useEffect(() => {
        if (tailors && tailors.length > 0) {
            setProcessedTailors(tailors);
        }
    }, [tailors]);

    // Function to handle filtering
    const handleFilter = () => {
        if (!tailors) return;

        let filtered = tailors;

        if (searchTerm) {
            filtered = filtered.filter(
                (tailor) =>
                    (tailor.name &&
                        tailor.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())) ||
                    (tailor.email &&
                        tailor.email
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()))
            );
        }

        if (experience) {
            filtered = filtered.filter(
                (tailor) =>
                    tailor.experience &&
                    tailor.experience >= parseInt(experience)
            );
        }

        if (career) {
            filtered = filtered.filter(
                (tailor) =>
                    tailor.career &&
                    tailor.career.toLowerCase() === career.toLowerCase()
            );
        }

        setProcessedTailors(filtered);
        setCurrentPage(1);
    };

    // Function to reset filters
    const resetFilters = () => {
        setSearchTerm("");
        setExperience("");
        setCareer("");
        setProcessedTailors(tailors);
        setCurrentPage(1);
    };

    // Pagination logic
    const paginatedTailors = processedTailors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(processedTailors.length / itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.6 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
        hover: {
            y: -10,
            boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
    };

    return (
        <SiteLayout title="د خیاطانو پروفایلونه - خیاط ماسټر">
            <Head title="Tailors" />
            {/* Hero Section */}
            <motion.section
                className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="mx-auto px-4">
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold font-zar max-w-3xl mx-auto  mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        د خیاطانو پروفایلونه
                    </motion.h1>
                    <motion.p
                        className="text-xl font-zar md:text-2xl max-w-3xl mx-auto opacity-90"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        د خپلو اړتیاوو لپاره غوره خیاط ومومئ. زموږ خیاطان د لوړ
                        کیفیت خیاطۍ مهارتونه لري.
                    </motion.p>
                </div>
            </motion.section>

            {/* Filter section */}
            <motion.section
                className="py-8 bg-white shadow-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        className="bg-white p-6 rounded-xl border"
                        whileHover={{
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex flex-1 items-center gap-2 border border-primary-200 p-3 rounded-lg bg-white">
                                <FaSearch className="text-primary-400" />
                                <input
                                    type="text"
                                    placeholder="د خیاط نوم یا بریښنالیک ولټوئ..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="flex-1 outline-none"
                                />
                            </div>
                            <div className="flex flex-1 items-center gap-2 border border-primary-200 p-3 rounded-lg bg-white">
                                <FaFilter className="text-primary-400" />
                                <select
                                    value={career}
                                    onChange={(e) => setCareer(e.target.value)}
                                    className="flex-1 outline-none bg-transparent"
                                >
                                    <option value="">ټول تخصصونه</option>
                                    <option value="Cloths">جامې</option>
                                    <option value="Uniform">یونیفورم</option>
                                    <option value="Sadra">سدري</option>
                                    <option value="Kortai">کورتی</option>
                                </select>
                            </div>
                            <div className="flex flex-1 items-center gap-2 border border-primary-200 p-3 rounded-lg bg-white">
                                <FaClock className="text-primary-400" />
                                <select
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    className="flex-1 outline-none bg-transparent"
                                >
                                    <option value="">ټول تجربې</option>
                                    <option value="1">1 کاله</option>
                                    <option value="2">2 کاله</option>
                                    <option value="5">5 کاله</option>
                                    <option value="10">10 کاله</option>
                                </select>
                            </div>
                            <motion.button
                                onClick={handleFilter}
                                className="font-bold px-6 py-3 rounded-md font-zar text-xl bg-secondary-600 hover:bg-secondary-700 text-white  transition duration-200 shadow-md"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                لټون
                            </motion.button>
                            <motion.button
                                onClick={resetFilters}
                                className="font-bold px-6 py-3 rounded-md font-zar text-xl bg-primary-500 hover:bg-primary-600 text-white  transition duration-200 shadow-md"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                ریسیټ
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Tailors list */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <motion.div
                            className="flex justify-center items-center py-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-500"></div>
                        </motion.div>
                    ) : (
                        <>
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1,
                                        },
                                    },
                                }}
                            >
                                {paginatedTailors.length > 0 ? (
                                    paginatedTailors.map((tailor, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-white rounded-xl overflow-hidden shadow-lg border border-primary-100 hover:shadow-xl transition duration-300 group"
                                            variants={cardVariants}
                                            whileHover="hover"
                                            custom={index}
                                        >
                                            {/* Profile Image Section */}
                                            <div className="relative h-48 bg-gradient-to-br from-primary-500 to-secondary-500">
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                                        {tailor.profile_photo_url ? (
                                                            <img
                                                                src={tailor.profile_photo_url}
                                                                alt={tailor.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-white/90 flex items-center justify-center">
                                                                <FaUser className="text-5xl text-primary-500" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-6">
                                                {/* Name and Shop Badge */}
                                                <div className="text-center mb-6">
                                                    <motion.h2
                                                        className="text-3xl font-bold font-zar text-primary-800 mb-2"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.3 + index * 0.05 }}
                                                    >
                                                        {tailor.name}
                                                    </motion.h2>
                                                    {tailor.has_shop && (
                                                        <motion.div
                                                            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary-100 text-secondary-700 text-sm font-medium"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: 0.4 + index * 0.05 }}
                                                        >
                                                            <FaStore className="text-sm" />
                                                            <span>د دوکان لرونکی</span>
                                                        </motion.div>
                                                    )}
                                                </div>

                                                {/* Experience Badge */}
                                                {tailor.experience && (
                                                    <div className="flex justify-center mb-6">
                                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700">
                                                            <FaClock className="text-sm" />
                                                            <span className="font-medium">{tailor.experience} کاله تجربه</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Skills Tags */}
                                                {tailor.skills && (
                                                    <div className="mb-6">
                                                        <h3 className="text-sm font-medium text-gray-500 mb-2">مهارتونه</h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            {tailor.skills.split(',').map((skill, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
                                                                >
                                                                    {skill.trim()}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Contact Info */}
                                                <motion.div
                                                    className="space-y-3"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.4 + index * 0.05 }}
                                                >
                                                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                                        <FaEnvelope className="text-primary-500 flex-shrink-0" />
                                                        <p className="text-sm text-gray-600">{tailor.email}</p>
                                                    </div>

                                                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                                        <FaBriefcase className="text-secondary-500 flex-shrink-0" />
                                                        <p className="text-sm text-gray-600">{tailor.career}</p>
                                                    </div>

                                                    {tailor.certifications && (
                                                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                                            <FaGraduationCap className="text-tertiary-500 flex-shrink-0" />
                                                            <p className="text-sm text-gray-600">{tailor.certifications}</p>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                                        <FaClock className="text-secondary-600 flex-shrink-0" />
                                                        <p className="text-sm text-gray-600">{tailor.work_availability}</p>
                                                    </div>
                                                </motion.div>

                                                {/* View Profile Button */}
                                                <motion.div
                                                    className="mt-6"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.5 + index * 0.05 }}
                                                >
                                                    <button className="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform hover:scale-[1.02]">
                                                        پروفایل وګورئ
                                                    </button>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        className="col-span-3 text-center py-16"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <motion.div
                                            className="bg-white p-8 rounded-xl border max-w-lg mx-auto"
                                            initial={{ scale: 0.9 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <motion.div
                                                className="text-primary-400 text-6xl mb-4"
                                                initial={{ y: -20 }}
                                                animate={{ y: 0 }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: 0.2,
                                                }}
                                            >
                                                <FaUser className="mx-auto" />
                                            </motion.div>
                                            <motion.h3
                                                className="text-2xl font-zar font-bold text-primary-700 mb-2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: 0.3,
                                                }}
                                            >
                                                هیڅ خیاط ونه موندل شو
                                            </motion.h3>
                                            <motion.p
                                                className="text-primary-500 mb-6 text-xl font-zar md:text-2xl"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: 0.4,
                                                }}
                                            >
                                                په دې وخت کې هیڅ خیاط نشته یا
                                                ستاسو د لټون معیارونه هیڅ پایله
                                                نلري.
                                            </motion.p>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* Pagination */}
                            {processedTailors.length > itemsPerPage && (
                                <motion.div
                                    className="mt-12 flex justify-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                >
                                    <nav className="flex items-center gap-1">
                                        <motion.button
                                            onClick={() =>
                                                goToPage(currentPage - 1)
                                            }
                                            disabled={currentPage === 1}
                                            className={`font-bold px-6 py-3 rounded-md font-zar text-xl ${
                                                currentPage === 1
                                                    ? "text-primary-400 cursor-not-allowed"
                                                    : "text-primary-700 hover:bg-primary-100"
                                            }`}
                                            whileHover={
                                                currentPage !== 1
                                                    ? {
                                                          scale: 1.1,
                                                          backgroundColor:
                                                              "rgba(0,0,0,0.05)",
                                                      }
                                                    : {}
                                            }
                                            whileTap={
                                                currentPage !== 1
                                                    ? { scale: 0.95 }
                                                    : {}
                                            }
                                        >
                                            <FaChevronRight className="h-5 w-5" />
                                        </motion.button>

                                        {[...Array(totalPages)].map((_, i) => {
                                            if (
                                                i === 0 ||
                                                i === totalPages - 1 ||
                                                (i >= currentPage - 2 &&
                                                    i <= currentPage + 2)
                                            ) {
                                                return (
                                                    <motion.button
                                                        key={i}
                                                        onClick={() =>
                                                            goToPage(i + 1)
                                                        }
                                                        className={`font-bold px-6 py-3 rounded-md font-zar text-xl ${
                                                            currentPage ===
                                                            i + 1
                                                                ? "bg-secondary-600 text-white"
                                                                : "text-primary-700 hover:bg-primary-100"
                                                        }`}
                                                        whileHover={{
                                                            scale: 1.1,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                        initial={{
                                                            opacity: 0,
                                                            y: 10,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        transition={{
                                                            delay:
                                                                0.8 + i * 0.05,
                                                        }}
                                                    >
                                                        {i + 1}
                                                    </motion.button>
                                                );
                                            } else if (
                                                i === currentPage - 3 ||
                                                i === currentPage + 3
                                            ) {
                                                return (
                                                    <motion.span
                                                        key={i}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{
                                                            delay:
                                                                0.8 + i * 0.05,
                                                        }}
                                                    >
                                                        ...
                                                    </motion.span>
                                                );
                                            }
                                            return null;
                                        })}

                                        <motion.button
                                            onClick={() =>
                                                goToPage(currentPage + 1)
                                            }
                                            disabled={
                                                currentPage === totalPages
                                            }
                                            className={`font-bold px-6 py-3 rounded-md font-zar text-xl ${
                                                currentPage === totalPages
                                                    ? "text-primary-400 cursor-not-allowed"
                                                    : "text-primary-700 hover:bg-primary-100"
                                            }`}
                                            whileHover={
                                                currentPage !== totalPages
                                                    ? {
                                                          scale: 1.1,
                                                          backgroundColor:
                                                              "rgba(0,0,0,0.05)",
                                                      }
                                                    : {}
                                            }
                                            whileTap={
                                                currentPage !== totalPages
                                                    ? { scale: 0.95 }
                                                    : {}
                                            }
                                        >
                                            <FaChevronLeft className="h-5 w-5" />
                                        </motion.button>
                                    </nav>
                                </motion.div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </SiteLayout>
    );
};

export default Tailors;

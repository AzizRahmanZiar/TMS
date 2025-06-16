import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
    currentPage,
    totalItems,
    itemsPerPage = 3,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Calculate which page numbers to show
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5; // Maximum number of page numbers to show

        if (totalPages <= maxVisiblePages) {
            // If total pages is less than max visible, show all pages
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always show first page
            pageNumbers.push(1);

            // Calculate start and end of visible pages
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            // Adjust if we're near the start
            if (currentPage <= 3) {
                endPage = 4;
            }

            // Adjust if we're near the end
            if (currentPage >= totalPages - 2) {
                startPage = totalPages - 3;
            }

            // Add ellipsis after first page if needed
            if (startPage > 2) {
                pageNumbers.push("...");
            }

            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            // Add ellipsis before last page if needed
            if (endPage < totalPages - 1) {
                pageNumbers.push("...");
            }

            // Always show last page
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            {/* Previous Button */}
            <motion.button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-semibold font-zar transition-all duration-300 flex items-center gap-2 ${
                    currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-primary-100 text-primary-600 hover:bg-primary-200"
                }`}
                whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
            >
                <FaChevronRight className="text-sm" />
                مخکینی
            </motion.button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
                {getPageNumbers().map((pageNum, index) =>
                    pageNum === "..." ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="px-2 text-gray-500"
                        >
                            ...
                        </span>
                    ) : (
                        <motion.button
                            key={pageNum}
                            onClick={() => onPageChange(pageNum)}
                            className={`w-10 h-10 rounded-lg font-semibold font-zar transition-all duration-300 ${
                                currentPage === pageNum
                                    ? "bg-primary-600 text-white"
                                    : "bg-primary-100 text-primary-600 hover:bg-primary-200"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {pageNum}
                        </motion.button>
                    )
                )}
            </div>

            {/* Next Button */}
            <motion.button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-semibold font-zar transition-all duration-300 flex items-center gap-2 ${
                    currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-primary-100 text-primary-600 hover:bg-primary-200"
                }`}
                whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
                whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
            >
                راتلونکی
                <FaChevronLeft className="text-sm" />
            </motion.button>
        </div>
    );
};

export default Pagination;

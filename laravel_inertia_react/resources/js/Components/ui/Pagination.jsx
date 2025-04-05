import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
    currentPage,
    totalPages,
    pageNumbers,
    goToPage,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
    className = "",
}) => {
    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const visiblePages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            return pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => goToPage(number)}
                    className={`px-3 py-1 rounded-md ${
                        currentPage === number
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                    {number}
                </button>
            ));
        }

        // Always show first page
        visiblePages.push(1);

        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        // Add ellipsis after first page if needed
        if (startPage > 2) {
            visiblePages.push("...");
        }

        // Add middle pages
        for (let i = startPage; i <= endPage; i++) {
            visiblePages.push(i);
        }

        // Add ellipsis before last page if needed
        if (endPage < totalPages - 1) {
            visiblePages.push("...");
        }

        // Always show last page
        visiblePages.push(totalPages);

        return visiblePages.map((item, index) => {
            if (item === "...") {
                return (
                    <span key={`ellipsis-${index}`} className="px-3 py-1">
                        ...
                    </span>
                );
            }

            return (
                <button
                    key={item}
                    onClick={() => goToPage(item)}
                    className={`px-3 py-1 rounded-md ${
                        currentPage === item
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                    {item}
                </button>
            );
        });
    };

    return (
        <div
            className={`flex items-center justify-center space-x-2 ${className}`}
        >
            <button
                onClick={previousPage}
                disabled={!hasPreviousPage}
                className={`p-2 rounded-md ${
                    hasPreviousPage
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-gray-400 cursor-not-allowed"
                }`}
            >
                <FaChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-1">
                {renderPageNumbers()}
            </div>

            <button
                onClick={nextPage}
                disabled={!hasNextPage}
                className={`p-2 rounded-md ${
                    hasNextPage
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-gray-400 cursor-not-allowed"
                }`}
            >
                <FaChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Pagination;

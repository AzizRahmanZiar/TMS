import { useState, useMemo } from "react";

const usePagination = (data, itemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = useMemo(
        () => Math.ceil(data.length / itemsPerPage),
        [data.length, itemsPerPage]
    );

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }, [data, currentPage, itemsPerPage]);

    const goToPage = (pageNumber) => {
        const page = Math.max(1, Math.min(pageNumber, totalPages));
        setCurrentPage(page);
    };

    const nextPage = () => {
        goToPage(currentPage + 1);
    };

    const previousPage = () => {
        goToPage(currentPage - 1);
    };

    const pageNumbers = useMemo(() => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }, [totalPages]);

    return {
        currentPage,
        totalPages,
        pageNumbers,
        paginatedData,
        goToPage,
        nextPage,
        previousPage,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
    };
};

export default usePagination;

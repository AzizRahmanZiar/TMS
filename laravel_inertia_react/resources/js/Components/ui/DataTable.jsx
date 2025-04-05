import React, { useState } from "react";
import { FaSort, FaSortUp, FaSortDown, FaSearch } from "react-icons/fa";
import useSort from "../../hooks/useSort";
import usePagination from "../../hooks/usePagination";
import Pagination from "./Pagination";
import { ITEMS_PER_PAGE } from "../../constants";
import { debounce } from "../../utils/helpers";

const DataTable = ({
    columns,
    data,
    itemsPerPage = ITEMS_PER_PAGE,
    searchable = true,
    className = "",
}) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Filter data based on search term
    const filteredData = React.useMemo(() => {
        if (!searchTerm) return data;

        return data.filter((item) =>
            columns.some((column) => {
                const value = item[column.key];
                if (!value) return false;
                return value
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            })
        );
    }, [data, columns, searchTerm]);

    // Apply sorting
    const {
        items: sortedData,
        requestSort,
        sortConfig,
    } = useSort(filteredData);

    // Apply pagination
    const {
        currentPage,
        totalPages,
        pageNumbers,
        paginatedData,
        goToPage,
        nextPage,
        previousPage,
        hasNextPage,
        hasPreviousPage,
    } = usePagination(sortedData, itemsPerPage);

    // Handle search input with debounce
    const handleSearch = debounce((value) => {
        setSearchTerm(value);
        goToPage(1); // Reset to first page when searching
    }, 300);

    const getSortIcon = (key) => {
        if (!sortConfig.key || sortConfig.key !== key) {
            return <FaSort className="w-4 h-4 text-gray-400" />;
        }
        return sortConfig.direction === "asc" ? (
            <FaSortUp className="w-4 h-4 text-blue-600" />
        ) : (
            <FaSortDown className="w-4 h-4 text-blue-600" />
        );
    };

    return (
        <div className={`bg-white rounded-lg border ${className}`}>
            {searchable && (
                <div className="p-4 border-b">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    onClick={() =>
                                        column.sortable &&
                                        requestSort(column.key)
                                    }
                                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                                        column.sortable
                                            ? "cursor-pointer hover:bg-gray-100"
                                            : ""
                                    }`}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>{column.label}</span>
                                        {column.sortable &&
                                            getSortIcon(column.key)}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedData.map((item, index) => (
                            <tr
                                key={item.id || index}
                                className="hover:bg-gray-50"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                    >
                                        {column.render
                                            ? column.render(
                                                  item[column.key],
                                                  item
                                              )
                                            : item[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="p-4 border-t">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        pageNumbers={pageNumbers}
                        goToPage={goToPage}
                        nextPage={nextPage}
                        previousPage={previousPage}
                        hasNextPage={hasNextPage}
                        hasPreviousPage={hasPreviousPage}
                    />
                </div>
            )}
        </div>
    );
};

export default DataTable;

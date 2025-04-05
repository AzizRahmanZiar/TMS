import React from "react";
import { Link } from "@inertiajs/react";
import { theme } from "@/theme";

const Table = ({
    columns,
    data,
    onSort,
    sortColumn,
    sortDirection,
    onSelect,
    selectedRows = [],
    selectable = false,
    className = "",
    variant = "default",
    ...props
}) => {
    const variants = {
        default: "min-w-full divide-y divide-gray-200",
        bordered: "min-w-full divide-y divide-gray-200 border border-gray-200",
        striped:
            "min-w-full divide-y divide-gray-200 [&>tbody>tr:nth-child(even)]:bg-gray-50",
    };

    const handleSort = (column) => {
        if (onSort && column.sortable) {
            const direction =
                sortColumn === column.key && sortDirection === "asc"
                    ? "desc"
                    : "asc";
            onSort(column.key, direction);
        }
    };

    const handleSelectAll = (e) => {
        if (onSelect) {
            const newSelectedRows = e.target.checked
                ? data.map((row) => row.id)
                : [];
            onSelect(newSelectedRows);
        }
    };

    const handleSelectRow = (id) => {
        if (onSelect) {
            const newSelectedRows = selectedRows.includes(id)
                ? selectedRows.filter((rowId) => rowId !== id)
                : [...selectedRows, id];
            onSelect(newSelectedRows);
        }
    };

    const renderCell = (row, column) => {
        const value = row[column.key];
        const cellContent = column.render ? column.render(value, row) : value;

        switch (column.type) {
            case "link":
                return (
                    <Link
                        href={column.href ? column.href(row) : "#"}
                        className="text-primary-600 hover:text-primary-700"
                    >
                        {cellContent}
                    </Link>
                );
            case "badge":
                return (
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${
                                column.variant === "success"
                                    ? "bg-success-100 text-success-800"
                                    : ""
                            }
                            ${
                                column.variant === "danger"
                                    ? "bg-danger-100 text-danger-800"
                                    : ""
                            }
                            ${
                                column.variant === "warning"
                                    ? "bg-warning-100 text-warning-800"
                                    : ""
                            }
                            ${
                                column.variant === "info"
                                    ? "bg-info-100 text-info-800"
                                    : ""
                            }
                            ${
                                !column.variant
                                    ? "bg-gray-100 text-gray-800"
                                    : ""
                            }
                        `}
                    >
                        {cellContent}
                    </span>
                );
            case "button":
                return (
                    <button
                        onClick={() => column.onClick?.(row)}
                        className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md
                            ${
                                column.variant === "primary"
                                    ? "text-white bg-primary-600 hover:bg-primary-700"
                                    : ""
                            }
                            ${
                                column.variant === "secondary"
                                    ? "text-gray-700 bg-gray-100 hover:bg-gray-200"
                                    : ""
                            }
                            ${
                                column.variant === "danger"
                                    ? "text-white bg-danger-600 hover:bg-danger-700"
                                    : ""
                            }
                            ${
                                !column.variant
                                    ? "text-gray-700 bg-gray-100 hover:bg-gray-200"
                                    : ""
                            }
                        `}
                    >
                        {cellContent}
                    </button>
                );
            default:
                return cellContent;
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className={`${variants[variant]} ${className}`} {...props}>
                <thead className="bg-gray-50">
                    <tr>
                        {selectable && (
                            <th className="px-6 py-3 text-left">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                    checked={
                                        selectedRows.length === data.length
                                    }
                                    onChange={handleSelectAll}
                                />
                            </th>
                        )}
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                                    column.sortable
                                        ? "cursor-pointer hover:text-gray-700"
                                        : ""
                                }`}
                                onClick={() => handleSort(column)}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>{column.label}</span>
                                    {column.sortable &&
                                        sortColumn === column.key && (
                                            <span className="ml-1">
                                                {sortDirection === "asc"
                                                    ? "↑"
                                                    : "↓"}
                                            </span>
                                        )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row) => (
                        <tr
                            key={row.id}
                            className={`hover:bg-gray-50 ${
                                selectedRows.includes(row.id)
                                    ? "bg-primary-50"
                                    : ""
                            }`}
                        >
                            {selectable && (
                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                        checked={selectedRows.includes(row.id)}
                                        onChange={() => handleSelectRow(row.id)}
                                    />
                                </td>
                            )}
                            {columns.map((column) => (
                                <td
                                    key={column.key}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {renderCell(row, column)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

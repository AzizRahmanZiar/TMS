import React from "react";
import { Link } from "@inertiajs/react";
import { FaChevronRight, FaHome } from "react-icons/fa";

const Breadcrumbs = ({
    items,
    separator = <FaChevronRight className="w-4 h-4 text-gray-400" />,
    homeIcon = <FaHome className="w-4 h-4" />,
    className = "",
}) => {
    return (
        <nav className={`flex ${className}`} aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                {/* Home link */}
                <li>
                    <Link
                        href="/"
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <span className="sr-only">Home</span>
                        {homeIcon}
                    </Link>
                </li>

                {/* Breadcrumb items */}
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li
                            key={item.id || index}
                            className="flex items-center"
                        >
                            {separator}
                            {isLast ? (
                                <span
                                    className="ml-2 text-sm font-medium text-gray-500"
                                    aria-current="page"
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

// Helper function to generate breadcrumb items from path
export const generateBreadcrumbs = (path) => {
    const segments = path.split("/").filter(Boolean);
    return segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const label = segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        return {
            id: index,
            label,
            href,
        };
    });
};

// Helper component for simple breadcrumbs
export const SimpleBreadcrumbs = ({
    currentPage,
    parentPages = [],
    className = "",
}) => {
    const items = [
        ...parentPages.map((page, index) => ({
            id: index,
            label: page.label,
            href: page.href,
        })),
        {
            id: parentPages.length,
            label: currentPage,
            href: "#",
        },
    ];

    return <Breadcrumbs items={items} className={className} />;
};

export default Breadcrumbs;

import { useState, useCallback, useMemo } from "react";

const useSort = (data, config = { key: null, direction: "asc" }) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return data;

        return [...data].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

            if (typeof aValue === "string") {
                return sortConfig.direction === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            return sortConfig.direction === "asc"
                ? aValue - bValue
                : bValue - aValue;
        });
    }, [data, sortConfig]);

    const requestSort = useCallback(
        (key) => {
            let direction = "asc";
            if (sortConfig.key === key && sortConfig.direction === "asc") {
                direction = "desc";
            }
            setSortConfig({ key, direction });
        },
        [sortConfig]
    );

    return {
        items: sortedData,
        requestSort,
        sortConfig,
    };
};

export default useSort;

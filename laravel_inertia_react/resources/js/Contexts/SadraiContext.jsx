// resources/js/Contexts/TableDataContext.jsx
import React, { createContext, useContext, useState } from "react";

const TableDataContext = createContext();

export const TableDataProvider = ({ children }) => {
    const [rowCount, setRowCount] = useState(0);

    return (
        <TableDataContext.Provider value={{ rowCount, setRowCount }}>
            {children}
        </TableDataContext.Provider>
    );
};

export const useTableData = () => {
    return useContext(TableDataContext);
};

// src/CustomerContext.js
import React, { createContext, useContext, useState } from "react";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
    const [customers, setCustomers] = useState({
        uniform: [],
        cloths: [],
        sadrai: [],
        kortai: [],
    });

    return (
        <CustomerContext.Provider value={{ customers, setCustomers }}>
            {children}
        </CustomerContext.Provider>
    );
};

export const useCustomerContext = () => useContext(CustomerContext);

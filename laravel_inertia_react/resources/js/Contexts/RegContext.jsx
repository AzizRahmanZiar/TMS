import { createContext, useContext, useState } from "react";

const RegContext = createContext();

export const RegProvider = ({ children }) => {
    const [reg, setReg] = useState([]);

    return (
        <RegContext.Provider value={{ reg, setReg }}>
            {children}
        </RegContext.Provider>
    );
};

export const useReg = () => {
    return useContext(RegContext);
};

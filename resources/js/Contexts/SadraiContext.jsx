import { createContext, useContext, useState } from "react";

const SadraiContext = createContext();

export const SadraiProvider = ({ children }) => {
    const [sadrai, setSadrai] = useState([]);

    return (
        <SadraiContext.Provider value={{ sadrai, setSadrai }}>
            {children}
        </SadraiContext.Provider>
    );
};

export const useSadrai = () => {
    return useContext(SadraiContext);
};

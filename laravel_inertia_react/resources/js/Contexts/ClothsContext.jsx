import { createContext, useContext, useState } from "react";

const ClothsContext = createContext();

export const ClothsProvider = ({ children }) => {
    const [cloths, setCloths] = useState([]);

    return (
        <ClothsContext.Provider value={{ cloths, setCloths }}>
            {children}
        </ClothsContext.Provider>
    );
};

export const useCloths = () => {
    return useContext(ClothsContext);
};

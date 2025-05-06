import { createContext, useContext, useState } from "react";

const KortaiContext = createContext();

export const KortaiProvider = ({ children }) => {
    const [kortai, setKortai] = useState([]);

    return (
        <KortaiContext.Provider value={{ kortai, setKortai }}>
            {children}
        </KortaiContext.Provider>
    );
};

export const useKortai = () => {
    return useContext(KortaiContext);
};

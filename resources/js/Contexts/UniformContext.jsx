import { createContext, useContext, useState } from "react";

const UniformContext = createContext();

export const UniformProvider = ({ children }) => {
    const [uniform, setUniform] = useState([]);

    return (
        <UniformContext.Provider value={{ uniform, setUniform }}>
            {children}
        </UniformContext.Provider>
    );
};

export const useUniform = () => {
    return useContext(UniformContext);
};

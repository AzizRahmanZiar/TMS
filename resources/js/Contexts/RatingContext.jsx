import { createContext, useContext, useState } from "react";

const RatingContext = createContext();

export const RatingProvider = ({ children }) => {
    const [rate, setRating] = useState([]);

    return (
        <RatingContext.Provider value={{ rate, setRating }}>
            {children}
        </RatingContext.Provider>
    );
};

export const useRate = () => {
    return useContext(RatingContext);
};

import { createContext, useContext, useState } from "react";

const OrderContext = createContext({
    order: [],
    setOrder: () => {}
});

export const OrderProvider = ({ children }) => {
    const [order, setOrder] = useState([]);

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
};

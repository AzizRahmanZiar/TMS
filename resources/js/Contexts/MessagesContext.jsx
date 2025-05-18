import { createContext, useContext, useState } from "react";

const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    const addMessage = (message) => {
        setMessages(prevMessages => [...prevMessages, {
            ...message,
            id: Date.now(), // temporary ID
            created_at: new Date().toISOString()
        }]);
    };

    return (
        <MessagesContext.Provider value={{ messages, setMessages, addMessage }}>
            {children}
        </MessagesContext.Provider>
    );
};

export const useMessages = () => {
    const context = useContext(MessagesContext);
    if (context === undefined) {
        throw new Error("useMessages must be used within a MessagesProvider");
    }
    return context;
};

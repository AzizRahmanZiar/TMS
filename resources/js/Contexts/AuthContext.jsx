import React, { createContext, useContext, useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const { props } = usePage();
    const [user, setUser] = useState(props.auth?.user || null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!props.auth?.user);

    useEffect(() => {
        setUser(props.auth?.user || null);
        setIsAuthenticated(!!props.auth?.user);
    }, [props.auth?.user]);

    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = {
        user,
        isAuthenticated,
        login,
        logout,
        setUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

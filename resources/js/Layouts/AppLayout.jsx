import React from "react";
import { AuthProvider } from "../Contexts/AuthContext";
import Sidebar from "../Components/Sidebar";

const AppLayout = ({ children }) => {
    return (
        <AuthProvider>
            <div className="flex h-screen rtl">
                <Sidebar />
                <main className="flex-1 overflow-y-auto bg-gray-100">
                    {children}
                </main>
            </div>
        </AuthProvider>
    );
};

export default AppLayout;

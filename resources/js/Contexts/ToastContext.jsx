import React, { createContext, useContext, useState } from 'react';
import Toast from '@/Components/Toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'info') => {
        setToast({ message, type });
    };

    const hideToast = () => {
        setToast(null);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                />
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}; 
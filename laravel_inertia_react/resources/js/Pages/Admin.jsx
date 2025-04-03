import React from "react";
import AppLayout from "../Layouts/AppLayout";
import ProtectedRoute from "../Components/ProtectedRoute";

const Admin = () => {
    return (
        <ProtectedRoute roles={["admin"]}>
            <AppLayout>
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                    {/* Admin content here */}
                </div>
            </AppLayout>
        </ProtectedRoute>
    );
};

export default Admin;

import React from "react";
import { Link } from "@inertiajs/react";

const GuestLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 ">
            <div className="w-full rounded-md sm:max-w-md mt-6 px-6 py-4 bg-white  overflow-hidden  border-0.5">
                {children}
            </div>
        </div>
    );
};

export default GuestLayout;

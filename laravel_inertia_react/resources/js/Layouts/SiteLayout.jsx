import React from "react";
import Navbar from "../Components/Navbar";

export default function SiteLayout({ children }) {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
        </div>
    );
}

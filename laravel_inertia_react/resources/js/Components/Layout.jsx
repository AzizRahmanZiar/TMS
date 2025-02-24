import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cloths from "../Pages/Cloths";
import Uniform from "../Pages/Uniform";
import Sadrai from "../Pages/Sadrai";
import Kortai from "../Pages/Kortai";
import Dashboard from "../Pages/Dashboard";
import Sidebar from "./Sidebar";

const Layout = () => (
    <Router>
        <div className="flex">
            <Sidebar />
            <div className="overflow-x-auto bg-white py-5 w-full">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/cloths" element={<Cloths />} />
                    <Route path="/uniform" element={<Uniform />} />
                    <Route path="/kortai" element={<Kortai />} />
                    <Route path="/sadrai" element={<Sadrai />} />
                </Routes>
            </div>
        </div>
    </Router>
);

export default Layout;

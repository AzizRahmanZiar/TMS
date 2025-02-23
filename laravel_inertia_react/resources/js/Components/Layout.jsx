import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Cloths from "./Cloths";
import Uniform from "./Uniform";
import Sadrai from "./Sadrai";
import Kortai from "./Kortai";
import Home from "./Home";

const App = () => (
    <Router>
        <div className="flex">
            <Sidebar />
            <div className="overflow-x-auto bg-white py-5 w-[100%]">
                <Routes>
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/cloths" element={<Cloths />} />
                    <Route path="/uniform" element={<Uniform />} />
                    <Route path="/kortai" element={<Kortai />} />
                    <Route path="/sadrai" element={<Sadrai />} />
                </Routes>
            </div>
        </div>
    </Router>
);

export default App;

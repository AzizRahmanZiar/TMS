import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Cloths from "./Cloths";
import Uniform from "./Uniform";

const App = () => (
    <Router>
        <div className="flex">
            <Sidebar />
            <div className="overflow-x-auto bg-white py-5 w-[100%]">
                <Routes>
                    <Route path="/cloths" element={<Cloths />} />
                    <Route path="/about" element={<Uniform />} />
                </Routes>
            </div>
        </div>
    </Router>
);

export default App;

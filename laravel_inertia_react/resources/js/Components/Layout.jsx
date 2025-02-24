// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Cloths from "./Cloths";
// import Uniform from "./Uniform";
// import Sadrai from "./Sadrai";
// import Kortai from "./Kortai";
// import Home from "./Dashboard";

// const App = () => (
//     <Router>
//         <div className="flex">
//             <Sidebar />
//             <div className="overflow-x-auto bg-white py-5 w-[100%]">
//                 <Routes>
//                     <Route path="/dashboard" element={<Home />} />
//                     <Route path="/cloths" element={<Cloths />} />
//                     <Route path="/uniform" element={<Uniform />} />
//                     <Route path="/kortai" element={<Kortai />} />
//                     <Route path="/sadrai" element={<Sadrai />} />
//                 </Routes>
//             </div>
//         </div>
//     </Router>
// );

// export default App;

// src/Layout.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Cloths from "../Pages/Cloths";
import Uniform from "../Pages/Uniform";
import Sadrai from "../Pages/Sadrai";
import Kortai from "../Pages/Kortai";
import Dashboard from "../Pages/Dashboard";

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

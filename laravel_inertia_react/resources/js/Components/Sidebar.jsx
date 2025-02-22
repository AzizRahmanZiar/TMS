import { BsPersonStandingDress } from "react-icons/bs";
import { PiPantsFill } from "react-icons/pi";

import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => (
    <div className="flex justify-center pt-5 w-40  h-screen bg-gray-800 text-white ">
        <ul>
            <li>
                <Link
                    to="/cloths"
                    className=" flex flex-row items-end p-4 hover:bg-gray-700"
                >
                    <PiPantsFill className="h-[2rem] w-[2rem]" />
                    جــــامې
                </Link>
            </li>
            <li>
                <Link
                    to="/about"
                    className=" flex flex-row items-end p-4 hover:bg-gray-700"
                >
                    <BsPersonStandingDress className="h-[2rem] w-[2rem]" />
                    درشــــي
                </Link>
            </li>
        </ul>
    </div>
);

export default Sidebar;

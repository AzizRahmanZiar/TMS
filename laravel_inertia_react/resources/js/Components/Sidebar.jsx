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
                    جامې
                </Link>
            </li>
            <li>
                <Link
                    to="/uniform"
                    className=" flex flex-row items-end p-4 hover:bg-gray-700"
                >
                    درشي
                </Link>
            </li>
            <li>
                <Link
                    to="/kortai"
                    className=" flex flex-row items-end p-4 hover:bg-gray-700"
                >
                    کورتۍ
                </Link>
            </li>
            <li>
                <Link
                    to="/sadrai"
                    className=" flex flex-row items-end p-4 hover:bg-gray-700"
                >
                    صدرۍ
                </Link>
            </li>
        </ul>
    </div>
);

export default Sidebar;

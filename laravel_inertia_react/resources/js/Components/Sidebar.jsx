import React from "react";
import { Link } from "@inertiajs/react";

const Sidebar = () => (
    <div className="flex justify-center pt-5 w-40 overflow-hidden  h-screen bg-gray-800 text-white ">
        <ul>
            <li>
                <Link
                    href="/cloths"
                    className=" flex flex-row items-end p-4 hover:bg-gray-700"
                >
                    جامې
                </Link>
            </li>
            <li>
                <Link
                    href="/uniform"
                    className=" flex flex-row items-end p-4 hover:bg-gray-700"
                >
                    درشي
                </Link>
            </li>
            <li>
                <Link
                    href="/kortai"
                    className=" flex flex-row items-end p-4 hover:bg-gray-700"
                >
                    کورتۍ
                </Link>
            </li>
            <li>
                <Link
                    href="/sadrai"
                    className=" flex flex-row items-end p-4 hover:bg-gray-700"
                >
                    صدرۍ
                </Link>
            </li>
        </ul>
    </div>
);

export default Sidebar;

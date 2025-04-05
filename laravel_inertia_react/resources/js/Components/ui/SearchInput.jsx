import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({
    value,
    onChange,
    placeholder = "Search...",
    className = "",
    ...props
}) => {
    return (
        <div className={`relative ${className}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
};

export default SearchInput;

import React, { useState, useEffect } from "react";

const SearchBar = ({
    placeholder = "Search...",
    onSearch,
    initialValue = "",
    className = "",
    searchIcon = true,
    inputClassName = "w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
    iconClassName = " w-5 h-5 text-gray-400",
    iconPosition = "left",
}) => {
    const [searchTerm, setSearchTerm] = useState(initialValue);

    useEffect(() => {
        setSearchTerm(initialValue);
    }, [initialValue]);

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <div className={`relative font-zar text-xl ${className}`}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder={placeholder}
                className={inputClassName}
            />
            {searchIcon && (
                <div
                    className={`absolute inset-y-0 ${
                        iconPosition === "left" ? "left-2 pl-3" : "right-0 pr-3"
                    } flex items-center pointer-events-none`}
                >
                    <svg
                        className={iconClassName}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default SearchBar;

import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";

const variants = {
    default: {
        list: "border-b border-gray-200",
        tab: {
            base: "py-4 px-4 text-sm font-medium border-b-2 -mb-px",
            active: "border-blue-500 text-blue-600",
            inactive:
                "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
        },
    },
    pills: {
        list: "space-x-2",
        tab: {
            base: "px-3 py-2 text-sm font-medium rounded-md",
            active: "bg-blue-100 text-blue-700",
            inactive: "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
        },
    },
    buttons: {
        list: "inline-flex p-1 space-x-1 bg-gray-100 rounded-lg",
        tab: {
            base: "px-3 py-1.5 text-sm font-medium rounded-md",
            active: "bg-white text-gray-900 shadow",
            inactive: "text-gray-500 hover:text-gray-700",
        },
    },
};

const Tabs = ({
    tabs,
    activeTab,
    onChange,
    variant = "default",
    className = "",
    fullWidth = false,
}) => {
    const [currentTab, setCurrentTab] = useState(activeTab || tabs[0]?.id);
    const variantStyle = variants[variant];

    useEffect(() => {
        if (activeTab) {
            setCurrentTab(activeTab);
        }
    }, [activeTab]);

    const handleTabClick = (tab) => {
        setCurrentTab(tab.id);
        if (onChange) {
            onChange(tab);
        }
    };

    return (
        <div className={className}>
            <div className={`${fullWidth ? "w-full" : ""}`}>
                <nav
                    className={`${variantStyle.list} ${
                        fullWidth ? "flex" : "inline-flex"
                    }`}
                    role="tablist"
                >
                    {tabs.map((tab) => {
                        const isActive = currentTab === tab.id;
                        const isDisabled = tab.disabled;

                        const tabContent = (
                            <>
                                {tab.icon && (
                                    <tab.icon
                                        className={`w-5 h-5 ${
                                            tab.label ? "mr-2" : ""
                                        }`}
                                        aria-hidden="true"
                                    />
                                )}
                                {tab.label}
                                {tab.count !== undefined && (
                                    <span
                                        className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                            isActive
                                                ? "bg-blue-100 text-blue-600"
                                                : "bg-gray-100 text-gray-600"
                                        }`}
                                    >
                                        {tab.count}
                                    </span>
                                )}
                            </>
                        );

                        const tabClasses = `
                            ${variantStyle.tab.base}
                            ${
                                isActive
                                    ? variantStyle.tab.active
                                    : variantStyle.tab.inactive
                            }
                            ${
                                isDisabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                            }
                            ${
                                fullWidth
                                    ? "flex-1 text-center justify-center"
                                    : ""
                            }
                            inline-flex items-center
                        `;

                        if (tab.href && !isDisabled) {
                            return (
                                <Link
                                    key={tab.id}
                                    href={tab.href}
                                    className={tabClasses}
                                    role="tab"
                                    aria-selected={isActive}
                                    aria-disabled={isDisabled}
                                >
                                    {tabContent}
                                </Link>
                            );
                        }

                        return (
                            <button
                                key={tab.id}
                                onClick={() =>
                                    !isDisabled && handleTabClick(tab)
                                }
                                className={tabClasses}
                                role="tab"
                                aria-selected={isActive}
                                aria-disabled={isDisabled}
                                disabled={isDisabled}
                            >
                                {tabContent}
                            </button>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

// Tab panel component
export const TabPanel = ({ children, id, activeTab }) => {
    if (id !== activeTab) return null;

    return (
        <div role="tabpanel" id={`panel-${id}`} aria-labelledby={`tab-${id}`}>
            {children}
        </div>
    );
};

// Vertical tabs component
export const VerticalTabs = ({ tabs, activeTab, onChange, className = "" }) => {
    const [currentTab, setCurrentTab] = useState(activeTab || tabs[0]?.id);

    useEffect(() => {
        if (activeTab) {
            setCurrentTab(activeTab);
        }
    }, [activeTab]);

    const handleTabClick = (tab) => {
        setCurrentTab(tab.id);
        if (onChange) {
            onChange(tab);
        }
    };

    return (
        <div className={`flex ${className}`}>
            <div className="w-48 border-r border-gray-200">
                <nav className="flex flex-col space-y-1" role="tablist">
                    {tabs.map((tab) => {
                        const isActive = currentTab === tab.id;
                        const isDisabled = tab.disabled;

                        const tabContent = (
                            <>
                                {tab.icon && (
                                    <tab.icon
                                        className={`w-5 h-5 ${
                                            tab.label ? "mr-3" : ""
                                        }`}
                                        aria-hidden="true"
                                    />
                                )}
                                {tab.label}
                            </>
                        );

                        const tabClasses = `
                            flex items-center px-3 py-2 text-sm font-medium rounded-md
                            ${
                                isActive
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            }
                            ${
                                isDisabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                            }
                        `;

                        if (tab.href && !isDisabled) {
                            return (
                                <Link
                                    key={tab.id}
                                    href={tab.href}
                                    className={tabClasses}
                                    role="tab"
                                    aria-selected={isActive}
                                    aria-disabled={isDisabled}
                                >
                                    {tabContent}
                                </Link>
                            );
                        }

                        return (
                            <button
                                key={tab.id}
                                onClick={() =>
                                    !isDisabled && handleTabClick(tab)
                                }
                                className={tabClasses}
                                role="tab"
                                aria-selected={isActive}
                                aria-disabled={isDisabled}
                                disabled={isDisabled}
                            >
                                {tabContent}
                            </button>
                        );
                    })}
                </nav>
            </div>
            <div className="flex-1 p-4">
                {tabs.find((tab) => tab.id === currentTab)?.content}
            </div>
        </div>
    );
};

export default Tabs;

import React, { useState, useRef, useEffect } from "react";

const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 -translate-y-2",
    "top-left": "bottom-full right-0 -translate-y-2",
    "top-right": "bottom-full left-0 -translate-y-2",
    bottom: "top-full left-1/2 -translate-x-1/2 translate-y-2",
    "bottom-left": "top-full right-0 translate-y-2",
    "bottom-right": "top-full left-0 translate-y-2",
    left: "right-full top-1/2 -translate-y-1/2 -translate-x-2",
    right: "left-full top-1/2 -translate-y-1/2 translate-x-2",
};

const variants = {
    dark: "bg-gray-900 text-white",
    light: "bg-white text-gray-900 border border-gray-200 shadow-sm",
    info: "bg-blue-600 text-white",
    success: "bg-green-600 text-white",
    warning: "bg-yellow-600 text-white",
    danger: "bg-red-600 text-white",
};

const arrows = {
    top: "bottom-[-6px] left-1/2 -translate-x-1/2 border-t-gray-900 border-l-transparent border-r-transparent",
    "top-left":
        "bottom-[-6px] right-4 border-t-gray-900 border-l-transparent border-r-transparent",
    "top-right":
        "bottom-[-6px] left-4 border-t-gray-900 border-l-transparent border-r-transparent",
    bottom: "top-[-6px] left-1/2 -translate-x-1/2 border-b-gray-900 border-l-transparent border-r-transparent",
    "bottom-left":
        "top-[-6px] right-4 border-b-gray-900 border-l-transparent border-r-transparent",
    "bottom-right":
        "top-[-6px] left-4 border-b-gray-900 border-l-transparent border-r-transparent",
    left: "right-[-6px] top-1/2 -translate-y-1/2 border-l-gray-900 border-t-transparent border-b-transparent",
    right: "left-[-6px] top-1/2 -translate-y-1/2 border-r-gray-900 border-t-transparent border-b-transparent",
};

const Tooltip = ({
    children,
    content,
    position = "top",
    variant = "dark",
    delay = 0,
    className = "",
    maxWidth = "max-w-xs",
    showArrow = true,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const tooltipRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleMouseEnter = () => {
        if (delay) {
            timeoutRef.current = setTimeout(() => {
                setIsVisible(true);
            }, delay);
        } else {
            setIsVisible(true);
        }
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    const positionClasses = positions[position];
    const variantClasses = variants[variant];
    const arrowClasses = arrows[position];

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={tooltipRef}
        >
            {children}

            {isVisible && (
                <div
                    className={`
                        absolute z-50
                        px-3 py-2
                        text-sm font-medium
                        rounded-lg
                        whitespace-normal
                        ${maxWidth}
                        ${positionClasses}
                        ${variantClasses}
                        ${className}
                    `}
                    role="tooltip"
                >
                    {content}
                    {showArrow && (
                        <div
                            className={`
                                absolute w-0 h-0
                                border-4
                                ${arrowClasses}
                            `}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

// Helper component for icon tooltips
export const IconTooltip = ({
    icon: Icon,
    content,
    iconClassName = "",
    ...props
}) => {
    return (
        <Tooltip content={content} {...props}>
            <Icon
                className={`w-5 h-5 text-gray-500 hover:text-gray-700 ${iconClassName}`}
            />
        </Tooltip>
    );
};

// Helper component for text tooltips
export const TextTooltip = ({
    text,
    content,
    textClassName = "",
    ...props
}) => {
    return (
        <Tooltip content={content} {...props}>
            <span
                className={`cursor-help border-b border-dotted border-gray-400 ${textClassName}`}
            >
                {text}
            </span>
        </Tooltip>
    );
};

export default Tooltip;

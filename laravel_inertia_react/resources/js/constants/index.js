// Pagination
export const ITEMS_PER_PAGE = 10;
export const MAX_VISIBLE_PAGES = 5;

// Table column sizes
export const TABLE_COLUMN_SIZES = {
    SMALL: "w-24",
    MEDIUM: "w-32",
    LARGE: "w-48",
    EXTRA_LARGE: "w-64",
};

// Status types
export const STATUS_TYPES = {
    ACTIVE: "active",
    INACTIVE: "inactive",
    PENDING: "pending",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
};

// Status colors
export const STATUS_COLORS = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
};

// Button variants
export const BUTTON_VARIANTS = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    SUCCESS: "success",
    DANGER: "danger",
    WARNING: "warning",
    INFO: "info",
    LIGHT: "light",
    DARK: "dark",
};

// Button sizes
export const BUTTON_SIZES = {
    SMALL: "sm",
    MEDIUM: "md",
    LARGE: "lg",
};

// Form field types
export const FIELD_TYPES = {
    TEXT: "text",
    EMAIL: "email",
    PASSWORD: "password",
    NUMBER: "number",
    DATE: "date",
    TIME: "time",
    DATETIME: "datetime-local",
    TEXTAREA: "textarea",
    SELECT: "select",
    CHECKBOX: "checkbox",
    RADIO: "radio",
    FILE: "file",
};

// API endpoints
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: "/login",
        LOGOUT: "/logout",
        REGISTER: "/register",
        FORGOT_PASSWORD: "/forgot-password",
        RESET_PASSWORD: "/reset-password",
    },
    USERS: {
        BASE: "/users",
        PROFILE: "/users/profile",
        SETTINGS: "/users/settings",
    },
    SYSTEM: {
        DASHBOARD: "/dashboard",
        CLOTHS: "/cloths",
        UNIFORM: "/uniform",
        KORTAI: "/kortai",
        SADRAI: "/sadrai",
        ADMIN: "/admin",
    },
};

// Date formats
export const DATE_FORMATS = {
    SHORT: "MM/DD/YYYY",
    LONG: "MMMM DD, YYYY",
    WITH_TIME: "MMMM DD, YYYY HH:mm",
    ISO: "YYYY-MM-DD",
};

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
    AVATAR: 1024 * 1024, // 1MB
    DOCUMENT: 5 * 1024 * 1024, // 5MB
    IMAGE: 2 * 1024 * 1024, // 2MB
};

// Supported file types
export const SUPPORTED_FILE_TYPES = {
    IMAGES: [".jpg", ".jpeg", ".png", ".gif"],
    DOCUMENTS: [".pdf", ".doc", ".docx", ".xls", ".xlsx"],
    ALL: [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".pdf",
        ".doc",
        ".docx",
        ".xls",
        ".xlsx",
    ],
};

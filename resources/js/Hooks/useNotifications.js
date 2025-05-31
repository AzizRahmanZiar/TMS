import { useState, useEffect } from "react";
import axios from "axios";

export const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            setError(null);

            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            const response = await axios.get("/notifications", {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "X-Requested-With": "XMLHttpRequest",
                    Accept: "application/json",
                },
            });

            if (response.data) {
                setNotifications(response.data.notifications || []);
                setUnreadCount(response.data.unread_count || 0);
            }
        } catch (err) {
            console.error("Error fetching notifications:", err);
            setError("Failed to fetch notifications");
            setNotifications([]);
            setUnreadCount(0);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            await axios.post(
                `/notifications/${notificationId}/mark-as-read`,
                {},
                {
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                        "X-Requested-With": "XMLHttpRequest",
                        Accept: "application/json",
                    },
                }
            );

            setNotifications((prev) =>
                prev.map((notification) =>
                    notification.id === notificationId
                        ? { ...notification, read_at: new Date().toISOString() }
                        : notification
                )
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));
        } catch (err) {
            console.error("Error marking notification as read:", err);
            setError("Failed to mark notification as read");
        }
    };

    const markAllAsRead = async () => {
        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            await axios.post(
                "/notifications/mark-all-as-read",
                {},
                {
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                        "X-Requested-With": "XMLHttpRequest",
                        Accept: "application/json",
                    },
                }
            );

            setNotifications((prev) =>
                prev.map((notification) => ({
                    ...notification,
                    read_at: new Date().toISOString(),
                }))
            );
            setUnreadCount(0);
        } catch (error) {
            console.error("Error marking all notifications as read:", error);
            setError("Failed to mark all notifications as read");
        }
    };

    const getUnreadCount = async () => {
        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            const response = await axios.get("/notifications/unread-count", {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "X-Requested-With": "XMLHttpRequest",
                    Accept: "application/json",
                },
            });

            if (response.data) {
                setUnreadCount(response.data.unread_count || 0);
            }
        } catch (error) {
            console.error("Error fetching unread count:", error);
            setError("Failed to fetch unread count");
        }
    };

    useEffect(() => {
        fetchNotifications();

        // Poll for new notifications every 30 seconds
        const interval = setInterval(() => {
            getUnreadCount();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    return {
        notifications,
        unreadCount,
        loading,
        error,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        getUnreadCount,
    };
};

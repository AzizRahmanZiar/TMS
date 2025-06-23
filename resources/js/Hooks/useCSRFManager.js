import { useState, useEffect, useCallback } from 'react';
import {
    getCSRFErrorTrackingStatus,
    forceResetCSRFErrorTracking,
    resetCSRFErrorTracking,
    scheduleCSRFErrorTrackingReset,
    recordCSRFError,
    ensureFreshCSRFToken,
    getCurrentCSRFToken
} from '@/Utils/csrfUtils';

/**
 * Custom hook for managing CSRF error tracking and token management
 */
export const useCSRFManager = (options = {}) => {
    const {
        autoRefreshInterval = 5000, // 5 seconds
        autoResetDelay = 300000,    // 5 minutes
        enableAutoReset = true
    } = options;

    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Update status periodically
    useEffect(() => {
        const updateStatus = () => {
            setStatus(getCSRFErrorTrackingStatus());
        };

        updateStatus();
        
        if (autoRefreshInterval > 0) {
            const interval = setInterval(updateStatus, autoRefreshInterval);
            return () => clearInterval(interval);
        }
    }, [autoRefreshInterval]);

    // Auto-reset scheduling
    useEffect(() => {
        if (enableAutoReset && status?.hasRecentErrors) {
            scheduleCSRFErrorTrackingReset(autoResetDelay);
        }
    }, [status?.hasRecentErrors, enableAutoReset, autoResetDelay]);

    /**
     * Force reset CSRF error tracking
     */
    const forceReset = useCallback(async () => {
        setIsLoading(true);
        try {
            const success = forceResetCSRFErrorTracking();
            setStatus(getCSRFErrorTrackingStatus());
            return success;
        } catch (error) {
            console.error('Failed to force reset CSRF tracking:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Soft reset CSRF error tracking
     */
    const softReset = useCallback(() => {
        resetCSRFErrorTracking();
        setStatus(getCSRFErrorTrackingStatus());
    }, []);

    /**
     * Manually record a CSRF error
     */
    const recordError = useCallback(() => {
        recordCSRFError();
        setStatus(getCSRFErrorTrackingStatus());
    }, []);

    /**
     * Ensure fresh CSRF token
     */
    const ensureFreshToken = useCallback(async () => {
        setIsLoading(true);
        try {
            const token = await ensureFreshCSRFToken();
            setStatus(getCSRFErrorTrackingStatus());
            return token;
        } catch (error) {
            console.error('Failed to ensure fresh CSRF token:', error);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Get current token
     */
    const getCurrentToken = useCallback(() => {
        return getCurrentCSRFToken();
    }, []);

    /**
     * Check if there are recent CSRF errors
     */
    const hasRecentErrors = status?.hasRecentErrors || false;

    /**
     * Get error count
     */
    const errorCount = status?.errorCount || 0;

    /**
     * Check if tracking is active
     */
    const isTrackingActive = status?.isTrackingActive || false;

    /**
     * Get time since last error in milliseconds
     */
    const timeSinceLastError = status?.timeSinceLastError;

    /**
     * Format time since last error for display
     */
    const formatTimeSinceLastError = useCallback(() => {
        if (!timeSinceLastError) return 'Never';
        
        const seconds = Math.floor(timeSinceLastError / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes % 60}m ago`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s ago`;
        } else {
            return `${seconds}s ago`;
        }
    }, [timeSinceLastError]);

    /**
     * Get status color for UI components
     */
    const getStatusColor = useCallback(() => {
        if (hasRecentErrors) return 'red';
        if (errorCount > 0) return 'yellow';
        return 'green';
    }, [hasRecentErrors, errorCount]);

    /**
     * Get status message for UI components
     */
    const getStatusMessage = useCallback(() => {
        if (hasRecentErrors) {
            return `${errorCount} recent CSRF error${errorCount !== 1 ? 's' : ''}`;
        }
        if (errorCount > 0) {
            return `${errorCount} total CSRF error${errorCount !== 1 ? 's' : ''} (resolved)`;
        }
        return 'No CSRF errors';
    }, [hasRecentErrors, errorCount]);

    return {
        // Status
        status,
        hasRecentErrors,
        errorCount,
        isTrackingActive,
        timeSinceLastError,
        isLoading,
        
        // Actions
        forceReset,
        softReset,
        recordError,
        ensureFreshToken,
        getCurrentToken,
        
        // Utilities
        formatTimeSinceLastError,
        getStatusColor,
        getStatusMessage,
        
        // Raw status object for advanced usage
        rawStatus: status
    };
};

export default useCSRFManager;

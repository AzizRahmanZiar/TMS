// CSRF utility functions for handling token refresh and validation

let lastCSRFError = null;
let csrfErrorCount = 0;

/**
 * Check if we've had recent CSRF errors and preemptively refresh token
 */
export const ensureFreshCSRFToken = async () => {
    const now = Date.now();
    
    // If we've had CSRF errors in the last 30 seconds, refresh token
    if (lastCSRFError && (now - lastCSRFError) < 30000) {
        console.log('Recent CSRF errors detected, refreshing token preemptively...');
        
        try {
            const response = await fetch("/refresh-csrf", {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.token) {
                    // Update meta tag
                    document
                        .querySelector('meta[name="csrf-token"]')
                        ?.setAttribute("content", data.token);

                    // Update axios headers
                    if (window.axios) {
                        window.axios.defaults.headers.common["X-CSRF-TOKEN"] = data.token;
                    }
                    
                    console.log('CSRF token refreshed preemptively');
                    return data.token;
                }
            }
        } catch (error) {
            console.error('Failed to refresh CSRF token preemptively:', error);
        }
    }
    
    return null;
};

/**
 * Record a CSRF error occurrence
 */
export const recordCSRFError = () => {
    lastCSRFError = Date.now();
    csrfErrorCount++;
    console.log(`CSRF error recorded. Total count: ${csrfErrorCount}`);
};

/**
 * Reset CSRF error tracking after successful operations
 */
export const resetCSRFErrorTracking = () => {
    lastCSRFError = null;
    csrfErrorCount = 0;
    console.log('CSRF error tracking reset');
};

/**
 * Force reset CSRF error tracking (manual reset)
 */
export const forceResetCSRFErrorTracking = () => {
    lastCSRFError = null;
    csrfErrorCount = 0;

    // Also refresh the current CSRF token
    const currentToken = getCurrentCSRFToken();
    if (currentToken) {
        // Update axios headers to ensure consistency
        if (window.axios) {
            window.axios.defaults.headers.common["X-CSRF-TOKEN"] = currentToken;
        }
    }

    console.log('CSRF error tracking force reset - all counters cleared');
    return true;
};

/**
 * Get current CSRF error tracking status
 */
export const getCSRFErrorTrackingStatus = () => {
    const now = Date.now();
    const timeSinceLastError = lastCSRFError ? now - lastCSRFError : null;

    return {
        hasRecentErrors: lastCSRFError && timeSinceLastError < 30000,
        errorCount: csrfErrorCount,
        lastErrorTime: lastCSRFError,
        timeSinceLastError: timeSinceLastError,
        currentToken: getCurrentCSRFToken(),
        isTrackingActive: lastCSRFError !== null
    };
};

/**
 * Auto-reset CSRF error tracking after specified time (default: 5 minutes)
 */
export const scheduleCSRFErrorTrackingReset = (delayMs = 300000) => {
    setTimeout(() => {
        if (lastCSRFError) {
            const now = Date.now();
            const timeSinceLastError = now - lastCSRFError;

            // Only reset if no new errors occurred recently
            if (timeSinceLastError >= delayMs) {
                resetCSRFErrorTracking();
                console.log('CSRF error tracking auto-reset after', delayMs / 1000, 'seconds');
            }
        }
    }, delayMs);
};

/**
 * Get current CSRF token from meta tag
 */
export const getCurrentCSRFToken = () => {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
};

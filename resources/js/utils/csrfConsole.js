// CSRF Console Management Utilities
// Use these functions in browser console for debugging

import {
    getCSRFErrorTrackingStatus,
    forceResetCSRFErrorTracking,
    resetCSRFErrorTracking,
    recordCSRFError,
    ensureFreshCSRFToken,
    getCurrentCSRFToken
} from './csrfUtils';

/**
 * Global CSRF management object for console access
 */
window.CSRF = {
    /**
     * Get current CSRF status
     */
    status: () => {
        const status = getCSRFErrorTrackingStatus();
        console.table(status);
        return status;
    },

    /**
     * Force reset all CSRF error tracking
     */
    reset: () => {
        const success = forceResetCSRFErrorTracking();
        console.log(success ? '✅ CSRF tracking reset successfully' : '❌ Failed to reset CSRF tracking');
        return success;
    },

    /**
     * Soft reset CSRF error tracking
     */
    softReset: () => {
        resetCSRFErrorTracking();
        console.log('✅ CSRF tracking soft reset completed');
    },

    /**
     * Manually record a CSRF error (for testing)
     */
    recordError: () => {
        recordCSRFError();
        console.log('⚠️ CSRF error recorded');
        return getCSRFErrorTrackingStatus();
    },

    /**
     * Get current CSRF token
     */
    token: () => {
        const token = getCurrentCSRFToken();
        console.log('Current CSRF Token:', token);
        return token;
    },

    /**
     * Ensure fresh CSRF token
     */
    refresh: async () => {
        console.log('🔄 Refreshing CSRF token...');
        try {
            const token = await ensureFreshCSRFToken();
            console.log(token ? '✅ Token refreshed successfully' : 'ℹ️ Token was already fresh');
            return token;
        } catch (error) {
            console.error('❌ Failed to refresh token:', error);
            return null;
        }
    },

    /**
     * Simulate CSRF errors for testing
     */
    simulate: {
        /**
         * Simulate multiple CSRF errors
         */
        errors: (count = 3) => {
            console.log(`🧪 Simulating ${count} CSRF errors...`);
            for (let i = 0; i < count; i++) {
                recordCSRFError();
                console.log(`Error ${i + 1} recorded`);
            }
            return getCSRFErrorTrackingStatus();
        },

        /**
         * Simulate rapid CSRF errors (like rapid login/logout)
         */
        rapidErrors: (count = 5, intervalMs = 100) => {
            console.log(`🧪 Simulating ${count} rapid CSRF errors (${intervalMs}ms interval)...`);
            let errorCount = 0;
            
            const interval = setInterval(() => {
                recordCSRFError();
                errorCount++;
                console.log(`Rapid error ${errorCount} recorded`);
                
                if (errorCount >= count) {
                    clearInterval(interval);
                    console.log('✅ Rapid error simulation completed');
                    console.table(getCSRFErrorTrackingStatus());
                }
            }, intervalMs);
            
            return interval;
        }
    },

    /**
     * Monitor CSRF status changes
     */
    monitor: {
        /**
         * Start monitoring CSRF status
         */
        start: (intervalMs = 2000) => {
            if (window.CSRF._monitorInterval) {
                console.log('⚠️ Monitor already running. Stop it first.');
                return;
            }

            console.log(`📊 Starting CSRF monitor (${intervalMs}ms interval)...`);
            
            window.CSRF._monitorInterval = setInterval(() => {
                const status = getCSRFErrorTrackingStatus();
                if (status.hasRecentErrors || status.errorCount > 0) {
                    console.log('🚨 CSRF Status Update:', status);
                }
            }, intervalMs);
            
            return window.CSRF._monitorInterval;
        },

        /**
         * Stop monitoring CSRF status
         */
        stop: () => {
            if (window.CSRF._monitorInterval) {
                clearInterval(window.CSRF._monitorInterval);
                window.CSRF._monitorInterval = null;
                console.log('⏹️ CSRF monitor stopped');
            } else {
                console.log('ℹ️ No monitor running');
            }
        }
    },

    /**
     * Show help information
     */
    help: () => {
        console.log(`
🛡️ CSRF Console Management Help

Basic Commands:
  CSRF.status()           - Show current CSRF status
  CSRF.reset()            - Force reset all tracking
  CSRF.softReset()        - Soft reset tracking
  CSRF.token()            - Show current token
  CSRF.refresh()          - Refresh CSRF token
  CSRF.recordError()      - Record a test error

Simulation:
  CSRF.simulate.errors(3)           - Simulate 3 errors
  CSRF.simulate.rapidErrors(5, 100) - Simulate 5 rapid errors

Monitoring:
  CSRF.monitor.start(2000)  - Start monitoring (2s interval)
  CSRF.monitor.stop()       - Stop monitoring

Examples:
  CSRF.status()                    // Check current status
  CSRF.simulate.errors(2)          // Create test errors
  CSRF.reset()                     // Reset everything
  CSRF.monitor.start()             // Watch for changes
        `);
    }
};

// Session Management
import {
    getSessionStatus,
    extendSession,
    sessionTracker
} from './sessionUtils';

window.SESSION = {
    /**
     * Get current session status
     */
    status: async () => {
        const status = await getSessionStatus();
        console.table(status);
        return status;
    },

    /**
     * Extend current session
     */
    extend: async () => {
        console.log('🔄 Extending session...');
        const success = await extendSession();
        console.log(success ? '✅ Session extended successfully' : '❌ Failed to extend session');
        return success;
    },

    /**
     * Get session tracker info
     */
    tracker: () => {
        const info = {
            lastActivity: sessionTracker.lastActivity,
            timeSinceLastActivity: sessionTracker.formatTimeSinceLastActivity(),
            isMonitoring: !!sessionTracker.monitorInterval
        };
        console.table(info);
        return info;
    },

    /**
     * Show help
     */
    help: () => {
        console.log(`
⏰ Session Console Management Help

Commands:
  SESSION.status()    - Show current session status
  SESSION.extend()    - Extend current session
  SESSION.tracker()   - Show activity tracker info
  SESSION.help()      - Show this help

Examples:
  SESSION.status()    // Check session status
  SESSION.extend()    // Extend session manually
        `);
    }
};

// Initialize
console.log('🛡️ CSRF Console Management loaded. Type CSRF.help() for commands.');
console.log('⏰ Session Console Management loaded. Type SESSION.help() for commands.');

export default window.CSRF;

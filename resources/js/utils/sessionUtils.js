// Session and Page Expiration Management Utilities

/**
 * Get session configuration from Laravel
 */
export const getSessionConfig = async () => {
    try {
        const response = await fetch('/csrf/status');
        const data = await response.json();
        return {
            lifetime: data.session_lifetime, // in minutes
            sessionId: data.session_id,
            currentToken: data.token,
            timestamp: data.timestamp
        };
    } catch (error) {
        console.error('Failed to get session config:', error);
        return null;
    }
};

/**
 * Calculate session expiration time
 */
export const getSessionExpirationTime = async () => {
    const config = await getSessionConfig();
    if (!config) return null;

    const now = new Date();
    const expirationTime = new Date(now.getTime() + (config.lifetime * 60 * 1000));
    
    return {
        expiresAt: expirationTime,
        expiresIn: config.lifetime * 60 * 1000, // milliseconds
        lifetimeMinutes: config.lifetime,
        currentTime: now
    };
};

/**
 * Check if session is about to expire
 */
export const isSessionNearExpiry = async (warningMinutes = 5) => {
    const expiration = await getSessionExpirationTime();
    if (!expiration) return false;

    const now = new Date();
    const timeUntilExpiry = expiration.expiresAt.getTime() - now.getTime();
    const warningTime = warningMinutes * 60 * 1000;

    return timeUntilExpiry <= warningTime && timeUntilExpiry > 0;
};

/**
 * Check if session has expired
 */
export const isSessionExpired = async () => {
    const expiration = await getSessionExpirationTime();
    if (!expiration) return false;

    const now = new Date();
    return now.getTime() >= expiration.expiresAt.getTime();
};

/**
 * Format time remaining until session expires
 */
export const formatTimeUntilExpiry = async () => {
    const expiration = await getSessionExpirationTime();
    if (!expiration) return 'Unknown';

    const now = new Date();
    const timeRemaining = expiration.expiresAt.getTime() - now.getTime();

    if (timeRemaining <= 0) {
        return 'Expired';
    }

    const minutes = Math.floor(timeRemaining / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
    } else {
        return `${seconds}s`;
    }
};

/**
 * Session activity tracker
 */
class SessionActivityTracker {
    constructor() {
        this.lastActivity = new Date();
        this.warningShown = false;
        this.callbacks = {
            onWarning: [],
            onExpiry: [],
            onActivity: []
        };
        this.init();
    }

    init() {
        // Track user activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
        events.forEach(event => {
            document.addEventListener(event, () => this.updateActivity(), true);
        });

        // Check session status periodically
        this.startMonitoring();
    }

    updateActivity() {
        this.lastActivity = new Date();
        this.warningShown = false;
        this.trigger('onActivity', this.lastActivity);
    }

    startMonitoring(intervalMs = 30000) { // Check every 30 seconds
        this.monitorInterval = setInterval(async () => {
            await this.checkSessionStatus();
        }, intervalMs);
    }

    stopMonitoring() {
        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
            this.monitorInterval = null;
        }
    }

    async checkSessionStatus() {
        const isNearExpiry = await isSessionNearExpiry(5); // 5 minutes warning
        const isExpired = await isSessionExpired();

        if (isExpired) {
            this.trigger('onExpiry');
        } else if (isNearExpiry && !this.warningShown) {
            this.warningShown = true;
            this.trigger('onWarning');
        }
    }

    on(event, callback) {
        if (this.callbacks[event]) {
            this.callbacks[event].push(callback);
        }
    }

    off(event, callback) {
        if (this.callbacks[event]) {
            const index = this.callbacks[event].indexOf(callback);
            if (index > -1) {
                this.callbacks[event].splice(index, 1);
            }
        }
    }

    trigger(event, data = null) {
        if (this.callbacks[event]) {
            this.callbacks[event].forEach(callback => callback(data));
        }
    }

    getTimeSinceLastActivity() {
        const now = new Date();
        return now.getTime() - this.lastActivity.getTime();
    }

    formatTimeSinceLastActivity() {
        const timeSince = this.getTimeSinceLastActivity();
        const minutes = Math.floor(timeSince / (1000 * 60));
        const seconds = Math.floor((timeSince % (1000 * 60)) / 1000);

        if (minutes > 0) {
            return `${minutes}m ${seconds}s ago`;
        } else {
            return `${seconds}s ago`;
        }
    }
}

// Create global session tracker
export const sessionTracker = new SessionActivityTracker();

/**
 * Extend session by making a simple request
 */
export const extendSession = async () => {
    try {
        const response = await fetch('/csrf/status', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        
        if (response.ok) {
            console.log('✅ Session extended successfully');
            return true;
        }
        return false;
    } catch (error) {
        console.error('Failed to extend session:', error);
        return false;
    }
};

/**
 * Get session status summary
 */
export const getSessionStatus = async () => {
    const config = await getSessionConfig();
    const expiration = await getSessionExpirationTime();
    const timeUntilExpiry = await formatTimeUntilExpiry();
    const isNearExpiry = await isSessionNearExpiry();
    const isExpired = await isSessionExpired();

    return {
        config,
        expiration,
        timeUntilExpiry,
        isNearExpiry,
        isExpired,
        lastActivity: sessionTracker.lastActivity,
        timeSinceLastActivity: sessionTracker.formatTimeSinceLastActivity()
    };
};

export default {
    getSessionConfig,
    getSessionExpirationTime,
    isSessionNearExpiry,
    isSessionExpired,
    formatTimeUntilExpiry,
    sessionTracker,
    extendSession,
    getSessionStatus
};

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    FaClock, 
    FaUser, 
    FaSync, 
    FaEye,
    FaEyeSlash,
    FaCircle
} from 'react-icons/fa';
import { 
    getSessionStatus, 
    extendSession,
    sessionTracker 
} from '@/Utils/sessionUtils';

const SessionStatus = ({ 
    position = 'top-right',
    showByDefault = false,
    updateInterval = 5000 
}) => {
    const [isVisible, setIsVisible] = useState(showByDefault);
    const [isExpanded, setIsExpanded] = useState(false);
    const [sessionStatus, setSessionStatus] = useState(null);
    const [isExtending, setIsExtending] = useState(false);

    useEffect(() => {
        // Update session status periodically
        const updateStatus = async () => {
            const status = await getSessionStatus();
            setSessionStatus(status);
        };

        updateStatus();
        const interval = setInterval(updateStatus, updateInterval);

        return () => clearInterval(interval);
    }, [updateInterval]);

    // Auto-show when session is near expiry
    useEffect(() => {
        if (sessionStatus?.isNearExpiry && !isVisible) {
            setIsVisible(true);
        }
    }, [sessionStatus?.isNearExpiry]);

    const handleExtendSession = async () => {
        setIsExtending(true);
        try {
            await extendSession();
            // Update status immediately
            const status = await getSessionStatus();
            setSessionStatus(status);
        } catch (error) {
            console.error('Failed to extend session:', error);
        } finally {
            setIsExtending(false);
        }
    };

    const getPositionClasses = () => {
        switch (position) {
            case 'top-left':
                return 'top-4 left-4';
            case 'top-right':
                return 'top-4 right-4';
            case 'bottom-left':
                return 'bottom-4 left-4';
            case 'bottom-right':
            default:
                return 'bottom-4 right-4';
        }
    };

    const getStatusColor = () => {
        if (!sessionStatus) return 'gray';
        if (sessionStatus.isExpired) return 'red';
        if (sessionStatus.isNearExpiry) return 'orange';
        return 'green';
    };

    const getStatusText = () => {
        if (!sessionStatus) return 'Loading...';
        if (sessionStatus.isExpired) return 'Expired';
        if (sessionStatus.isNearExpiry) return 'Expiring Soon';
        return 'Active';
    };

    if (!isVisible) return null;

    return (
        <div className={`fixed ${getPositionClasses()} z-40`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden min-w-[200px]"
            >
                {/* Header */}
                <div 
                    className={`px-3 py-2 cursor-pointer flex items-center justify-between ${
                        getStatusColor() === 'red' 
                            ? 'bg-red-50 border-b border-red-200' 
                            : getStatusColor() === 'orange'
                            ? 'bg-orange-50 border-b border-orange-200'
                            : 'bg-green-50 border-b border-green-200'
                    }`}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-2">
                        <FaCircle 
                            className={`text-xs ${
                                getStatusColor() === 'red' 
                                    ? 'text-red-500' 
                                    : getStatusColor() === 'orange'
                                    ? 'text-orange-500'
                                    : 'text-green-500'
                            }`} 
                        />
                        <span className="font-semibold text-sm">
                            Session: {getStatusText()}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {isExpanded ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsVisible(false);
                            }}
                            className="text-gray-400 hover:text-gray-600 text-xs"
                        >
                            ×
                        </button>
                    </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && sessionStatus && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        className="p-3 space-y-3"
                    >
                        {/* Time Remaining */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                                <FaClock className="text-xs" />
                                Time Remaining:
                            </span>
                            <span className={`text-sm font-mono font-semibold ${
                                getStatusColor() === 'red' 
                                    ? 'text-red-600' 
                                    : getStatusColor() === 'orange'
                                    ? 'text-orange-600'
                                    : 'text-green-600'
                            }`}>
                                {sessionStatus.timeUntilExpiry}
                            </span>
                        </div>

                        {/* Last Activity */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                                <FaUser className="text-xs" />
                                Last Activity:
                            </span>
                            <span className="text-sm font-mono">
                                {sessionStatus.timeSinceLastActivity}
                            </span>
                        </div>

                        {/* Session Lifetime */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                                Session Lifetime:
                            </span>
                            <span className="text-sm font-mono">
                                {sessionStatus.config?.lifetime} minutes
                            </span>
                        </div>

                        {/* Extend Button */}
                        {sessionStatus.isNearExpiry && !sessionStatus.isExpired && (
                            <button
                                onClick={handleExtendSession}
                                disabled={isExtending}
                                className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-semibold transition-colors disabled:opacity-50"
                            >
                                {isExtending ? (
                                    <>
                                        <FaSync className="animate-spin text-xs" />
                                        Extending...
                                    </>
                                ) : (
                                    <>
                                        <FaSync className="text-xs" />
                                        Extend Session
                                    </>
                                )}
                            </button>
                        )}

                        {/* Expired Message */}
                        {sessionStatus.isExpired && (
                            <div className="bg-red-50 border border-red-200 rounded-md p-2">
                                <p className="text-sm text-red-700 text-center">
                                    Session has expired. Please refresh the page.
                                </p>
                            </div>
                        )}

                        {/* Session ID (truncated) */}
                        <div className="pt-2 border-t border-gray-200">
                            <div className="text-xs text-gray-500">
                                Session ID:
                            </div>
                            <div className="text-xs font-mono bg-gray-100 p-1 rounded mt-1 break-all">
                                {sessionStatus.config?.sessionId?.substring(0, 16)}...
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default SessionStatus;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaShieldAlt, 
    FaExclamationTriangle, 
    FaCheckCircle, 
    FaSync, 
    FaTrash,
    FaEye,
    FaEyeSlash,
    FaClock
} from 'react-icons/fa';
import {
    getCSRFErrorTrackingStatus,
    forceResetCSRFErrorTracking,
    scheduleCSRFErrorTrackingReset,
    getCurrentCSRFToken
} from '@/Utils/csrfUtils';

const CSRFManager = ({ showByDefault = false, position = 'bottom-right' }) => {
    const [isVisible, setIsVisible] = useState(showByDefault);
    const [isExpanded, setIsExpanded] = useState(false);
    const [status, setStatus] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Update status every 5 seconds
    useEffect(() => {
        const updateStatus = () => {
            setStatus(getCSRFErrorTrackingStatus());
        };

        updateStatus();
        const interval = setInterval(updateStatus, 5000);

        return () => clearInterval(interval);
    }, []);

    // Auto-show when there are CSRF errors
    useEffect(() => {
        if (status?.hasRecentErrors && !isVisible) {
            setIsVisible(true);
        }
    }, [status?.hasRecentErrors]);

    const handleForceReset = async () => {
        setIsRefreshing(true);
        
        try {
            const success = forceResetCSRFErrorTracking();
            if (success) {
                // Update status immediately
                setStatus(getCSRFErrorTrackingStatus());
                
                // Schedule auto-reset for future
                scheduleCSRFErrorTrackingReset();
                
                // Show success feedback
                setTimeout(() => setIsRefreshing(false), 1000);
            }
        } catch (error) {
            console.error('Failed to reset CSRF tracking:', error);
            setIsRefreshing(false);
        }
    };

    const formatTime = (timestamp) => {
        if (!timestamp) return 'Never';
        return new Date(timestamp).toLocaleTimeString();
    };

    const formatDuration = (ms) => {
        if (!ms) return 'N/A';
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        
        if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s ago`;
        }
        return `${seconds}s ago`;
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

    if (!isVisible) return null;

    return (
        <div className={`fixed ${getPositionClasses()} z-50`}>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden"
                >
                    {/* Header */}
                    <div 
                        className={`px-4 py-3 cursor-pointer flex items-center justify-between ${
                            status?.hasRecentErrors 
                                ? 'bg-red-50 border-b border-red-200' 
                                : 'bg-green-50 border-b border-green-200'
                        }`}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <div className="flex items-center gap-2">
                            {status?.hasRecentErrors ? (
                                <FaExclamationTriangle className="text-red-500" />
                            ) : (
                                <FaShieldAlt className="text-green-500" />
                            )}
                            <span className="font-semibold text-sm">
                                CSRF Status
                            </span>
                            {status?.errorCount > 0 && (
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    {status.errorCount}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            {isExpanded ? <FaEyeSlash /> : <FaEye />}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsVisible(false);
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-4 space-y-3">
                                    {/* Status Info */}
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Error Count:</span>
                                            <span className={`font-semibold ${
                                                status?.errorCount > 0 ? 'text-red-600' : 'text-green-600'
                                            }`}>
                                                {status?.errorCount || 0}
                                            </span>
                                        </div>
                                        
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Last Error:</span>
                                            <span className="text-gray-800">
                                                {status?.timeSinceLastError 
                                                    ? formatDuration(status.timeSinceLastError)
                                                    : 'None'
                                                }
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Recent Errors:</span>
                                            <span className={`font-semibold ${
                                                status?.hasRecentErrors ? 'text-red-600' : 'text-green-600'
                                            }`}>
                                                {status?.hasRecentErrors ? 'Yes' : 'No'}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Token Status:</span>
                                            <span className={`font-semibold ${
                                                status?.currentToken ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                                {status?.currentToken ? 'Valid' : 'Missing'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 pt-2 border-t border-gray-200">
                                        <button
                                            onClick={handleForceReset}
                                            disabled={isRefreshing}
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 text-sm"
                                        >
                                            {isRefreshing ? (
                                                <FaSync className="animate-spin" />
                                            ) : (
                                                <FaTrash />
                                            )}
                                            {isRefreshing ? 'Resetting...' : 'Reset Tracking'}
                                        </button>

                                        <button
                                            onClick={() => {
                                                scheduleCSRFErrorTrackingReset(60000); // 1 minute
                                                alert('Auto-reset scheduled for 1 minute');
                                            }}
                                            className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
                                        >
                                            <FaClock />
                                            Auto-Reset
                                        </button>
                                    </div>

                                    {/* Token Preview (truncated) */}
                                    {status?.currentToken && (
                                        <div className="pt-2 border-t border-gray-200">
                                            <div className="text-xs text-gray-500">
                                                Current Token:
                                            </div>
                                            <div className="text-xs font-mono bg-gray-100 p-2 rounded mt-1 break-all">
                                                {status.currentToken.substring(0, 20)}...
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default CSRFManager;

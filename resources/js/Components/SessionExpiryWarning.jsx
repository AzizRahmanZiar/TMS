import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaClock, 
    FaExclamationTriangle, 
    FaSync, 
    FaTimes,
    FaSignOutAlt
} from 'react-icons/fa';
import { router } from '@inertiajs/react';
import { 
    sessionTracker, 
    extendSession, 
    formatTimeUntilExpiry,
    getSessionStatus 
} from '@/Utils/sessionUtils';

const SessionExpiryWarning = ({ 
    warningMinutes = 5,
    autoExtend = true,
    showCountdown = true 
}) => {
    const [showWarning, setShowWarning] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState('');
    const [isExtending, setIsExtending] = useState(false);
    const [sessionStatus, setSessionStatus] = useState(null);

    useEffect(() => {
        // Update time remaining every second
        const updateTimer = setInterval(async () => {
            const remaining = await formatTimeUntilExpiry();
            setTimeRemaining(remaining);
            
            if (remaining === 'Expired') {
                handleSessionExpired();
            }
        }, 1000);

        // Update session status every 30 seconds
        const updateStatus = setInterval(async () => {
            const status = await getSessionStatus();
            setSessionStatus(status);
        }, 30000);

        // Initial status update
        getSessionStatus().then(setSessionStatus);

        return () => {
            clearInterval(updateTimer);
            clearInterval(updateStatus);
        };
    }, []);

    useEffect(() => {
        // Session warning handler
        const handleWarning = () => {
            setShowWarning(true);
        };

        // Session expiry handler
        const handleExpiry = () => {
            handleSessionExpired();
        };

        // Register event listeners
        sessionTracker.on('onWarning', handleWarning);
        sessionTracker.on('onExpiry', handleExpiry);

        return () => {
            sessionTracker.off('onWarning', handleWarning);
            sessionTracker.off('onExpiry', handleExpiry);
        };
    }, []);

    const handleSessionExpired = () => {
        // Show expiry message and redirect to login
        alert('جلسه ختم شوې. مهرباني وکړئ بیا ننوتل وکړئ.');
        router.visit('/login');
    };

    const handleExtendSession = async () => {
        setIsExtending(true);
        
        try {
            const success = await extendSession();
            if (success) {
                setShowWarning(false);
                // Update session status
                const status = await getSessionStatus();
                setSessionStatus(status);
            } else {
                alert('د جلسې د اوږدولو کې ستونزه. مهرباني وکړئ بیا هڅه وکړئ.');
            }
        } catch (error) {
            console.error('Failed to extend session:', error);
            alert('د جلسې د اوږدولو کې ستونزه. مهرباني وکړئ بیا هڅه وکړئ.');
        } finally {
            setIsExtending(false);
        }
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    const handleDismiss = () => {
        setShowWarning(false);
    };

    if (!showWarning) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 border border-orange-200"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                <FaExclamationTriangle className="text-orange-500 text-xl" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 font-zar">
                                    د جلسې خبرداری
                                </h3>
                                <p className="text-sm text-gray-600 font-zar">
                                    ستاسو جلسه د ختمیدو سره نږدې ده
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleDismiss}
                            className="text-gray-400 hover:text-gray-600 p-1"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Countdown */}
                    {showCountdown && (
                        <div className="bg-orange-50 rounded-xl p-4 mb-4 text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <FaClock className="text-orange-500" />
                                <span className="text-sm font-semibold text-orange-700 font-zar">
                                    پاتې وخت
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-orange-600 font-mono">
                                {timeRemaining}
                            </div>
                        </div>
                    )}

                    {/* Session Info */}
                    {sessionStatus && (
                        <div className="bg-gray-50 rounded-xl p-3 mb-4 text-xs space-y-1">
                            <div className="flex justify-between">
                                <span className="text-gray-600">د وروستي فعالیت وخت:</span>
                                <span className="font-mono">{sessionStatus.timeSinceLastActivity}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">د جلسې اوږدوالی:</span>
                                <span className="font-mono">{sessionStatus.config?.lifetime} دقیقې</span>
                            </div>
                        </div>
                    )}

                    {/* Warning Message */}
                    <div className="mb-6">
                        <p className="text-gray-700 text-center font-zar">
                            ستاسو جلسه د {warningMinutes} دقیقو دننه ختمیږي. که تاسو کار ته دوام ورکول غواړئ، نو د جلسې اوږدول وکړئ.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleExtendSession}
                            disabled={isExtending}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 font-zar"
                        >
                            {isExtending ? (
                                <>
                                    <FaSync className="animate-spin" />
                                    د اوږدولو په حال کې...
                                </>
                            ) : (
                                <>
                                    <FaSync />
                                    جلسه اوږده کړئ
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-semibold transition-colors font-zar"
                        >
                            <FaSignOutAlt />
                            وتل
                        </button>
                    </div>

                    {/* Auto-extend info */}
                    {autoExtend && (
                        <div className="mt-3 text-center">
                            <p className="text-xs text-gray-500 font-zar">
                                که تاسو فعال یاست، جلسه به په اتوماتیک ډول اوږده شي
                            </p>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SessionExpiryWarning;

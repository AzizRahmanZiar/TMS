import { useCallback } from 'react';

export const useCSRFRefresh = () => {
    const refreshCSRFToken = useCallback(async () => {
        try {
            const response = await fetch('/refresh-csrf', {
                method: 'GET',
                credentials: 'same-origin'
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.token) {
                    // Update the meta tag
                    const metaTag = document.querySelector('meta[name="csrf-token"]');
                    if (metaTag) {
                        metaTag.setAttribute('content', data.token);
                    }
                    
                    // Update axios default header if it exists
                    if (window.axios) {
                        window.axios.defaults.headers.common['X-CSRF-TOKEN'] = data.token;
                    }
                    
                    console.log('CSRF token refreshed successfully');
                    return data.token;
                }
            }
        } catch (error) {
            console.error('Failed to refresh CSRF token:', error);
        }
        return null;
    }, []);

    const withCSRFRefresh = useCallback(async (callback) => {
        await refreshCSRFToken();
        return callback();
    }, [refreshCSRFToken]);

    return {
        refreshCSRFToken,
        withCSRFRefresh
    };
};

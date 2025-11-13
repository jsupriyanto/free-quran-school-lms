import axios from "axios";

const getCurrentUser = () => {
    if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);
    }
    return null;
}

const setThirdPartySignInProgress = (value) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem("thirdPartySignInProgress", value);
    }
}

const getThirdPartySignInProgress = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem("thirdPartySignInProgress") === "true";
    }
    return false;
}

const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.freequranschool.com/api/",
    headers: {
        "Content-type": "application/json"
    }
});

// Track ongoing refresh requests to prevent multiple concurrent refreshes
let isRefreshing = false;
let refreshSubscribers = [];

// Function to add failed requests to queue while token is being refreshed
const subscribeTokenRefresh = (callback) => {
    refreshSubscribers.push(callback);
};

// Function to process queued requests after token refresh
const onTokenRefreshed = (newToken) => {
    refreshSubscribers.forEach((callback) => callback(newToken));
    refreshSubscribers = [];
};

// Request interceptor to dynamically add authorization header
http.interceptors.request.use(
    async (config) => {
        const user = getCurrentUser();
        if (user && user.accessToken) {
            // Check if token is expired before using it
            try {
                const payload = JSON.parse(atob(user.accessToken.split('.')[1]));
                const now = Math.floor(Date.now() / 1000);
                
                // Check if token expires in the next 5 minutes (300 seconds)
                const bufferTime = 300; // 5 minutes
                if (payload.exp < (now + bufferTime)) {
                    // Only attempt refresh if not in third-party sign-in progress
                    if (!getThirdPartySignInProgress() && user.refreshToken) {
                        
                        // If already refreshing, queue this request
                        if (isRefreshing) {
                            return new Promise((resolve) => {
                                subscribeTokenRefresh((newToken) => {
                                    if (newToken) {
                                        config.headers.Authorization = `Bearer ${newToken}`;
                                    }
                                    resolve(config);
                                });
                            });
                        }
                        
                        isRefreshing = true;
                        
                        try {
                            // Import auth service to avoid circular dependency
                            const { default: authService } = await import('./auth.service');
                            const refreshedUser = await authService.refreshToken();
                            
                            if (refreshedUser && refreshedUser.accessToken) {
                                config.headers.Authorization = `Bearer ${refreshedUser.accessToken}`;
                                onTokenRefreshed(refreshedUser.accessToken);
                            }
                        } catch (refreshError) {
                            console.error('Token refresh failed:', refreshError);
                            onTokenRefreshed(null);
                            
                            // If this is an OAuth user and refresh failed, try to get fresh session
                            if (user.oauthProvider) {
                                try {
                                    const { getSession } = await import('next-auth/react');
                                    const session = await getSession();
                                    if (session && session.user && session.user.accessToken && session.user.accessToken !== user.accessToken) {
                                        const updatedUser = { ...user, ...session.user };
                                        localStorage.setItem('user', JSON.stringify(updatedUser));
                                        config.headers.Authorization = `Bearer ${updatedUser.accessToken}`;
                                    }
                                } catch (sessionError) {
                                    console.error('Failed to get fresh OAuth session:', sessionError);
                                }
                            }
                        } finally {
                            isRefreshing = false;
                        }
                    } else if (!getThirdPartySignInProgress()) {
                        localStorage.removeItem('user');
                    } else {
                        config.headers.Authorization = `Bearer ${user.accessToken}`;
                    }
                } else {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                }
            } catch (error) {
                console.error('Error parsing JWT token:', error);
                // Only clear user data if not in third-party sign-in progress
                if (!getThirdPartySignInProgress()) {
                    localStorage.removeItem('user');
                }
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { status } = error.response || {};
    
    if (status === 401 || status === 403) {
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const isOnAuthPage = currentPath.includes('/authentication/');
        const isThirdPartyInProgress = getThirdPartySignInProgress();
        const user = getCurrentUser();
        
        // Try to refresh token if we have a refresh token and not in third-party sign-in
        if (!isThirdPartyInProgress && user && user.refreshToken && !isRefreshing) {
          
          try {
            // Import auth service to avoid circular dependency
            const { default: authService } = await import('./auth.service');
            const refreshedUser = await authService.refreshToken();
            
            if (refreshedUser && refreshedUser.accessToken) {
              // Retry the original request with new token
              error.config.headers.Authorization = `Bearer ${refreshedUser.accessToken}`;
              return http.request(error.config);
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            // Fall through to normal error handling
          }
        }
        
        // Clear invalid/expired token data only if not in third-party sign-in progress
        if (!isThirdPartyInProgress) {
          localStorage.removeItem('user');
        }

        // Only redirect if we're not already on an auth page and not in third-party sign-in
        if (!isOnAuthPage && !isThirdPartyInProgress) {
          // Wait 3 seconds before redirecting to avoid loops
          setTimeout(() => {
            // Double-check conditions before redirecting
            const stillNotOnAuthPage = !window.location.pathname.includes('/authentication/');
            const stillNotInThirdParty = !getThirdPartySignInProgress();
            
            if (stillNotOnAuthPage && stillNotInThirdParty) {
              setThirdPartySignInProgress(true);
              window.location.href = '/authentication/sign-in';
            }
          }, 3000); // 3 seconds delay
        }
      }
    }
    return Promise.reject(error);
  }
);

export default http;
import axios from "axios";

const getCurrentUser = () => {
    if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);
    }
    return null;
}
const http = axios.create({
    baseURL: "https://free-quran-school-api.vercel.app/api/",
    headers: {
        "Content-type": "application/json"
    }
});

// Request interceptor to dynamically add authorization header
http.interceptors.request.use(
    (config) => {
        const user = getCurrentUser();
        if (user && user.accessToken) {
            // Check if token is expired before using it
            try {
                const payload = JSON.parse(atob(user.accessToken.split('.')[1]));
                const now = Math.floor(Date.now() / 1000);
                
                if (payload.exp < now) {
                    console.log('Access token is expired, clearing user data');
                    localStorage.removeItem('user');
                    // Don't add expired token to request
                    return config;
                }
                
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            } catch (error) {
                console.error('Error parsing JWT token:', error);
                localStorage.removeItem('user');
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
  (error) => {
    console.log('HTTP error response:', error.response);
    const { status } = error.response || {};
    
    if (status === 401 || status === 403) {
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const isOnAuthPage = currentPath.includes('/authentication/');
        
        // Clear invalid/expired token data
        localStorage.removeItem('user');
        
        // Only redirect if we're not already on an auth page
        if (!isOnAuthPage) {
          console.log('Token invalid/expired, redirecting to sign-in');
          // Use setTimeout to avoid redirect loops and allow other processes to complete
          setTimeout(() => {
            window.location.href = '/authentication/sign-in';
          }, 100);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default http;
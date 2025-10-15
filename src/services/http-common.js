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
            config.headers.Authorization = `Bearer ${user.accessToken}`;
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
    const { status } = error.response;
    if (status === 401 || status === 403) {
      // Clear authentication data and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        window.location.href = '/authentication/sign-in';
      }
    }
    return Promise.reject(error);
  }
);

export default http;
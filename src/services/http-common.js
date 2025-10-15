import axios from "axios";

const getCurrentUser = () => {
    if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);
    }
    return null;
}
let user = null;
// This will run only once when the component mounts
if (typeof window !== 'undefined') // Ensure this code runs only on the client side
    user = getCurrentUser();

let authorization = "";

if (user && user.accessToken) {
     authorization = "Bearer " + user.accessToken;
}

const http = axios.create({
    baseURL: "https://free-quran-school-api.vercel.app/api/",
    headers: {
        "Content-type": "application/json",
        "Authorization": authorization
    }
});

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
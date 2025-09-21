import axios from "axios";

const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
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

export default axios.create({
    baseURL: "https://free-quran-school-api.vercel.app/api/",
    headers: {
        "Content-type": "application/json",
        "Authorization": authorization
    }
});
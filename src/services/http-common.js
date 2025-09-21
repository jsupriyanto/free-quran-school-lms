import axios from "axios";

const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
}

const user = getCurrentUser();
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
import http from "./http-common";

class AuthService {
  signin(username, password) {
    return http.post("/auth/signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  signup(firstName, lastName, username, password) {
    return http.post("/auth/signup", { firstName, lastName, username, password });
  }

  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  signout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();

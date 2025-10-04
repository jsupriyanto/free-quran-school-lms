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
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  signout() {
    if (localStorage === undefined) return;
    localStorage.removeItem("user");
  }

  signInWithOAuth(signInRequest) {
    return http.post("/auth/oauth", signInRequest);
  }
}

export default new AuthService();

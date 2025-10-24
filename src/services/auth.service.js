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
      if (user) {
        try {
          const parsed = JSON.parse(user);
          
          // Check if token is expired
          if (parsed.accessToken) {
            try {
              const payload = JSON.parse(atob(parsed.accessToken.split('.')[1]));
              const now = Math.floor(Date.now() / 1000);
              
              if (payload.exp < now) {
                console.log('Stored token is expired, clearing user data');
                localStorage.removeItem("user");
                return null;
              }
            } catch (tokenError) {
              console.error("Error parsing JWT token:", tokenError);
              localStorage.removeItem("user");
              return null;
            }
          }
          
          return parsed;
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
          // Don't automatically clear corrupted data during OAuth flows
          // Return null and let the authentication provider handle it
          return null;
        }
      }
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

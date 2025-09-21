import http from "./http-common";

class UserDataService {
  getAll() {
    return http.get("/user");
  }

  create(data) {
    return http.post("/user", data);
  }
  
  update(id, data) {
    return http.put(`/user/${id}`, data);
  }

  delete(id) {
    return http.delete(`/user/${id}`);
  }

  getTop5Students() {
    return http.get("/user/top5");
  }

  getRandomStudent() {
    return http.get("/user/random");
  }

  get(id) {
    return http.get(`/user/${id}`);
  }

  getUserByRole(role) {
    return http.get(`/user/role/${role}`);
  }

  getUserCount() {
    return http.get("/user/count");
  }
}

export default new UserDataService();

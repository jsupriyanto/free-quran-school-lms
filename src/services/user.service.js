import http from "./http-common";
import { isTeacher, getCurrentTeacherId, isAdmin } from "@/utils/accessControl";

class UserDataService {
  getAll() {
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
        if (teacherId) {
          return http.get(`/user/teacher/${teacherId}`);
        }
    }

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
    return http.get("/user/dashboard/top5");
  }

  getRandomStudent() {
    return http.get("/user/dashboard/random");
  }

  get(id) {
    return http.get(`/user/${id}`);
  }

  getUserByRole(role) {
    return http.get(`/user/role/${role}`);
  }

  getUserCount() {
    return http.get("/user/dashboard/count");
  }
}

export default new UserDataService();

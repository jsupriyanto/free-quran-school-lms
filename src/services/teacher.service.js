import http from "./http-common";

class TeacherDataService {
  getAll() {
    return http.get("/teacher");
  }

  get(id) {
    return http.get(`/teacher/${id}`);
  }

  create(data) {
    return http.post("/teacher", data);
  }

  update(id, data) {
    return http.put(`/teacher/${id}`, data);
  }

  delete(id) {
    return http.delete(`/teacher/${id}`);
  }

  getTeacherCount() {
    return http.get("/teacher/dashboard/count");
  }

  getTop5Teachers() {
    return http.get("/teacher/dashboard/top5");
  }
}

export default new TeacherDataService();

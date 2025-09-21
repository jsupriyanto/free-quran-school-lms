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
}

export default new TeacherDataService();

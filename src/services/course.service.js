import http from "./http-common";

class CourseDataService {
  getAll() {
    return http.get("/course");
  }

  get(id) {
    return http.get(`/course/${id}`);
  }

  create(data) {
    return http.post("/course", data);
  }

  update(id, data) {
    return http.put(`/course/${id}`, data);
  }
  delete(id) {
    return http.delete(`/course/${id}`);
  }

  getCourseStats() {
    return http.get("/course/dashboard/stats");
  }

  getUpcomingCourses() {
    return http.get("/course/dashboard/upcoming/courses");
  }

  getUpcomingCourseCompletions() {
    return http.get("/course/dashboard/current/courses");
  }
}

export default new CourseDataService();

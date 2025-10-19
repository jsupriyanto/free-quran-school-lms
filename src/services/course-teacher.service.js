import http from "./http-common";

class CourseTeacherService {
  getTeachersByCourseId(courseId) {
    return http.get(`/course-teacher/course/${courseId}`);
  }

  assignTeacherToCourse(data) {
    return http.post("/course-teacher/assign", data);
  }

  removeTeacherFromCourse(id) {
    return http.delete(`/course-teacher/${id}`);
  }

  updateTeacherRoleInCourse(id, data) {
    return http.put(`/course-teacher/${id}`, data);
  }
}

export default new CourseTeacherService();

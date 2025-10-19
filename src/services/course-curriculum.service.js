import http from "./http-common";

class CourseCurriculumService {
  getCourseCurriculumnByCourseId(courseId) {
    return http.get(`/course-curriculum/${courseId}`);
  }

  createCourseCurriculum(data) {
    return http.post("/course-curriculum", data);
  }

  updateCourseCurriculum(id, data) {
    return http.put(`/course-curriculum/${id}`, data);
  }

  deleteCourseCurriculum(id) {
    return http.delete(`/course-curriculum/${id}`);
  }
}

export default new CourseCurriculumService();

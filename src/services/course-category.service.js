import http from "./http-common";

class CourseCategoryService {
  getAllCourseCategories() {
    return http.get("/course-category");
  }
  getCourseCategoryById(id) {
    return http.get(`/course-category/${id}`);
  }
  createCourseCategory(data) {
    return http.post("/course-category", data);
  }
  updateCourseCategory(id, data) {
    return http.put(`/course-category/${id}`, data);
  }
  deleteCourseCategory(id) {
    return http.delete(`/course-category/${id}`);
  }
}

export default new CourseCategoryService();
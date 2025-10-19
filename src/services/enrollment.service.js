import http from "./http-common";

class EnrollmentService {
  getEnrollmentStats() {
    return http.get("/enrollment/dashboard/stats");
  }

  getEnrollmentProgress() {
    return http.get("/enrollment/dashboard/enrollment-monthly-summary");
  }

  getEnrollmentWithHighProgress() {
    return http.get("/enrollment/admin/enrollments-high-progress");
  }

  getEnrollmentWithLowProgress() {
    return http.get("/enrollment/admin/enrollments-low-progress");
  }
  getUserEnrollments(userId) {
    return http.get(`/enrollment/user/${userId}`);
  }
  enrollUserInCourse(data) {
    return http.post("/enrollment", data);
  }
  checkEnrollmentStatus(courseId, userId) {
    return http.get(`/enrollment/check/${courseId}/${userId}`);
  }
}

export default new EnrollmentService();

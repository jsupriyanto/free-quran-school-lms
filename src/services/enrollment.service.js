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
}

export default new EnrollmentService();

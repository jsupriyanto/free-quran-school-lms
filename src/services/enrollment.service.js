import http from "./http-common";

class EnrollmentService {
  // Dashboard stats
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

  // CRUD operations
  getAllEnrollments() {
    return http.get("/enrollments");
  }

  getEnrollmentById(id) {
    return http.get(`/enrollments/${id}`);
  }

  createEnrollment(data) {
    return http.post("/enrollments", data);
  }

  updateEnrollment(id, data) {
    return http.put(`/enrollments/${id}`, data);
  }

  deleteEnrollment(id) {
    return http.delete(`/enrollments/${id}`);
  }

  // User specific enrollments
  getUserEnrollments(userId) {
    return http.get(`/enrollment/user/${userId}`);
  }

  enrollUserInCourse(data) {
    return http.post("/enrollment", data);
  }

  checkEnrollmentStatus(courseId, userId) {
    return http.get(`/enrollment/check/${courseId}/${userId}`);
  }

  // Search and filter
  searchEnrollments(query) {
    return http.get(`/enrollments/search?q=${query}`);
  }

  getEnrollmentsByStatus(status) {
    return http.get(`/enrollments/status/${status}`);
  }

  getEnrollmentsByCourse(courseId) {
    return http.get(`/enrollments/course/${courseId}`);
  }

  // Progress tracking
  updateProgress(enrollmentId, progressData) {
    return http.put(`/enrollments/${enrollmentId}/progress`, progressData);
  }

  getProgressHistory(enrollmentId) {
    return http.get(`/enrollments/${enrollmentId}/progress-history`);
  }

  // Certificate management
  issueCertificate(enrollmentId) {
    return http.post(`/enrollments/${enrollmentId}/certificate`);
  }

  getCertificate(enrollmentId) {
    return http.get(`/enrollments/${enrollmentId}/certificate`);
  }

  // Bulk operations
  bulkUpdateStatus(enrollmentIds, status) {
    return http.put("/enrollments/bulk/status", { enrollmentIds, status });
  }

  bulkDelete(enrollmentIds) {
    return http.delete("/enrollments/bulk", { data: { enrollmentIds } });
  }

  // Analytics
  getEnrollmentAnalytics(dateRange = null) {
    const params = dateRange ? `?from=${dateRange.from}&to=${dateRange.to}` : '';
    return http.get(`/enrollments/analytics${params}`);
  }

  getCompletionRates() {
    return http.get("/enrollments/completion-rates");
  }

  getDropoutAnalysis() {
    return http.get("/enrollments/dropout-analysis");
  }
}

export default new EnrollmentService();

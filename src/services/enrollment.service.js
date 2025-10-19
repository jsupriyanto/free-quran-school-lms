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
    return http.get("/enrollment/all-enrollments");
  }

  getEnrollmentById(id) {
    return http.get(`/enrollment/${id}`);
  }

  createEnrollment(data) {
    return http.post("/enrollment", data);
  }

  updateEnrollment(id, data) {
    return http.put(`/enrollment/${id}`, data);
  }

  deleteEnrollment(id) {
    return http.delete(`/enrollment/${id}`);
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
    return http.get(`/enrollment/search?q=${query}`);
  }

  getEnrollmentsByStatus(status) {
    return http.get(`/enrollment/status/${status}`);
  }

  getEnrollmentsByCourse(courseId) {
    return http.get(`/enrollment/course/${courseId}`);
  }

  // Progress tracking
  updateProgress(enrollmentId, progressData) {
    return http.put(`/enrollment/${enrollmentId}/progress`, progressData);
  }

  getProgressHistory(enrollmentId) {
    return http.get(`/enrollment/${enrollmentId}/progress-history`);
  }

  // Certificate management
  issueCertificate(enrollmentId) {
    return http.post(`/enrollment/${enrollmentId}/certificate`);
  }

  getCertificate(enrollmentId) {
    return http.get(`/enrollment/${enrollmentId}/certificate`);
  }

  // Bulk operations
  bulkUpdateStatus(enrollmentIds, status) {
    return http.put("/enrollment/bulk/status", { enrollmentIds, status });
  }

  bulkDelete(enrollmentIds) {
    return http.delete("/enrollment/bulk", { data: { enrollmentIds } });
  }

  // Analytics
  getEnrollmentAnalytics(dateRange = null) {
    const params = dateRange ? `?from=${dateRange.from}&to=${dateRange.to}` : '';
    return http.get(`/enrollment/analytics${params}`);
  }

  getCompletionRates() {
    return http.get("/enrollment/completion-rates");
  }

  getDropoutAnalysis() {
    return http.get("/enrollment/dropout-analysis");
  }
}

export default new EnrollmentService();

import http from "./http-common";
import { isTeacher, getCurrentTeacherId, isAdmin } from "@/utils/accessControl";  

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
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
      if (teacherId) {
        return http.get(`/enrollment/teacher/${teacherId}`);
      }
    }
    return http.get("/enrollment");
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

  // ==================== COURSE SCHEDULE INTEGRATION ====================

  /**
   * Get enrollments for a specific course schedule
   */
  getEnrollmentsBySchedule(scheduleId) {
    return http.get(`/enrollment/schedule/${scheduleId}`);
  }

  /**
   * Get enrolled students for scheduled sessions
   */
  getEnrollmentsForScheduledSessions(courseId, scheduleId = null) {
    const params = scheduleId ? `?scheduleId=${scheduleId}` : '';
    return http.get(`/enrollment/course/${courseId}/scheduled-sessions${params}`);
  }

  /**
   * Check if a student is enrolled in a course with access to scheduled sessions
   */
  checkScheduledSessionAccess(courseId, userId, scheduleId = null) {
    const params = scheduleId ? `?scheduleId=${scheduleId}` : '';
    return http.get(`/enrollment/check-schedule-access/${courseId}/${userId}${params}`);
  }

  /**
   * Get enrollment statistics by course schedule
   */
  getEnrollmentStatsBySchedule(scheduleId) {
    return http.get(`/enrollment/schedule/${scheduleId}/stats`);
  }

  /**
   * Get active enrollments for courses with active schedules
   */
  getActiveEnrollmentsWithSchedules() {
    return http.get("/enrollment/active/with-schedules");
  }

  /**
   * Get enrollments by schedule date range
   */
  getEnrollmentsByScheduleDateRange(startDate, endDate) {
    return http.get(`/enrollment/schedule-range?startDate=${startDate}&endDate=${endDate}`);
  }

  /**
   * Enroll user in course with schedule preference
   */
  enrollUserInCourseWithSchedule(data) {
    return http.post("/enrollment/with-schedule", {
      ...data,
      includeScheduleAccess: true
    });
  }

  /**
   * Update enrollment with schedule preferences
   */
  updateEnrollmentSchedulePreferences(enrollmentId, schedulePreferences) {
    return http.put(`/enrollment/${enrollmentId}/schedule-preferences`, {
      schedulePreferences
    });
  }

  /**
   * Get enrollment progress including scheduled session attendance
   */
  getEnrollmentProgressWithSchedules(enrollmentId) {
    return http.get(`/enrollment/${enrollmentId}/progress-with-schedules`);
  }

  /**
   * Get upcoming scheduled sessions for enrolled students
   */
  getUpcomingScheduledSessionsForStudent(userId, dateRange = null) {
    const params = dateRange ? `?from=${dateRange.from}&to=${dateRange.to}` : '';
    return http.get(`/enrollment/student/${userId}/upcoming-sessions${params}`);
  }

  /**
   * Get enrollment calendar view with scheduled sessions
   */
  getEnrollmentCalendarWithSchedules(enrollmentId) {
    return http.get(`/enrollment/${enrollmentId}/calendar-view`);
  }

  /**
   * Sync enrollment data with course schedule changes
   */
  syncEnrollmentWithScheduleChanges(courseId) {
    return http.post(`/enrollment/course/${courseId}/sync-schedules`);
  }

  /**
   * Get enrollment reports filtered by schedule
   */
  getEnrollmentReportsBySchedule(scheduleId, format = 'json') {
    return http.get(`/enrollment/reports/schedule/${scheduleId}?format=${format}`);
  }

  /**
   * Get student attendance for scheduled sessions
   */
  getStudentScheduledAttendance(userId, courseId = null) {
    const params = courseId ? `?courseId=${courseId}` : '';
    return http.get(`/enrollment/student/${userId}/scheduled-attendance${params}`);
  }
}

export default new EnrollmentService();

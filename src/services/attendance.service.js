import http from "./http-common";

class AttendanceService {
  // Dashboard stats
  getAttendanceStats() {
    return http.get("/attendance/dashboard/stats");
  }

  getAttendanceOverview() {
    return http.get("/attendance/dashboard/overview");
  }

  getAttendanceTrends() {
    return http.get("/attendance/dashboard/trends");
  }

  // Course Session Management
  createSession(data) {
    return http.post("/attendance/sessions", data);
  }

  getAllSessions() {
    return http.get("/attendance/sessions");
  }

  getSessionsByCourse(courseId) {
    return http.get(`/attendance/sessions/course/${courseId}`);
  }

  getSessionById(sessionId) {
    return http.get(`/attendance/sessions/${sessionId}`);
  }

  updateSession(sessionId, data) {
    return http.put(`/attendance/sessions/${sessionId}`, data);
  }

  deleteSession(sessionId) {
    return http.delete(`/attendance/sessions/${sessionId}`);
  }

  // Attendance Records Management
  markAttendance(data) {
    return http.post("/attendance/records", data);
  }

  bulkMarkAttendance(data) {
    return http.post("/attendance/records/bulk", data);
  }

  getAttendanceBySession(sessionId) {
    return http.get(`/attendance/records/session/${sessionId}`);
  }

  getAttendanceByStudent(studentId) {
    return http.get(`/attendance/records/student/${studentId}`);
  }

  getAttendanceByCourse(courseId, params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    return http.get(`/attendance/records/course/${courseId}${queryParams ? `?${queryParams}` : ''}`);
  }

  updateAttendanceRecord(recordId, data) {
    return http.put(`/attendance/records/${recordId}`, data);
  }

  deleteAttendanceRecord(recordId) {
    return http.delete(`/attendance/records/${recordId}`);
  }

  // Reporting and Analytics
  getAttendanceReport(courseId, params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    return http.get(`/attendance/reports/course/${courseId}${queryParams ? `?${queryParams}` : ''}`);
  }

  getStudentAttendanceReport(studentId, params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    return http.get(`/attendance/reports/student/${studentId}${queryParams ? `?${queryParams}` : ''}`);
  }

  generateAttendanceSheet(courseId, sessionDate) {
    return http.get(`/attendance/generate-sheet/${courseId}/${sessionDate}`);
  }

  exportAttendanceData(courseId, format = 'csv') {
    return http.get(`/attendance/export/${courseId}?format=${format}`, {
      responseType: 'blob'
    });
  }

  // Student-specific operations
  getMyAttendance(studentId) {
    return http.get(`/attendance/student/${studentId}/summary`);
  }

  // Search and filtering
  searchAttendance(query, filters = {}) {
    const params = { query, ...filters };
    const queryParams = new URLSearchParams(params).toString();
    return http.get(`/attendance/search?${queryParams}`);
  }

  // Notification and alerts
  sendAttendanceReminders(courseId, sessionId) {
    return http.post(`/attendance/notifications/reminders`, {
      courseId,
      sessionId
    });
  }

  getAbsentStudents(courseId, sessionId) {
    return http.get(`/attendance/absent-students/${courseId}/${sessionId}`);
  }

  // Batch operations
  importAttendanceData(data) {
    return http.post("/attendance/import", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  getAttendanceTemplate() {
    return http.get("/attendance/template", {
      responseType: 'blob'
    });
  }
}

export default new AttendanceService();
import http from "./http-common";
import { isTeacher, getCurrentTeacherId, isAdmin } from "@/utils/accessControl";

class AttendanceService {
  // Dashboard stats
  getAttendanceStats() {
    // If user is a teacher, get stats for their courses only
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
      if (teacherId) {
        return http.get(`/attendance/dashboard/stats/teacher/${teacherId}`);
      }
    }
    return http.get("/attendance/dashboard/stats");
  }

  getAttendanceOverview() {
    // If user is a teacher, get overview for their courses only
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
      if (teacherId) {
        return http.get(`/attendance/dashboard/overview/teacher/${teacherId}`);
      }
    }
    return http.get("/attendance/dashboard/overview");
  }

  getAttendanceTrends() {
    // If user is a teacher, get trends for their courses only
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
      if (teacherId) {
        return http.get(`/attendance/dashboard/trends/teacher/${teacherId}`);
      }
    }
    return http.get("/attendance/dashboard/trends");
  }

  // Course Session Management
  createSession(data) {
    return http.post("/attendance/sessions", data);
  }

  // Get sessions with integration to scheduled sessions
  getAllSessions() {
    // If user is a teacher, get sessions for their courses only
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
      if (teacherId) {
        return http.get(`/attendance/sessions/teacher/${teacherId}`);
      }
    }
    return http.get("/attendance/sessions");
  }

  // Get all sessions including scheduled ones
  getAllSessionsWithScheduled() {
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
      if (teacherId) {
        return http.get(`/attendance/sessions/all/teacher/${teacherId}`);
      }
    }
    return http.get("/attendance/sessions/all");
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

  // ==================== SCHEDULED SESSION INTEGRATION ====================

  /**
   * Create attendance session from scheduled session
   */
  createSessionFromSchedule(scheduledSessionId, sessionData = {}) {
    return http.post(`/attendance/sessions/from-schedule/${scheduledSessionId}`, sessionData);
  }

  /**
   * Get attendance sessions linked to scheduled sessions
   */
  getSessionsFromScheduledSessions(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
      if (teacherId) {
        return http.get(`/attendance/sessions/scheduled/teacher/${teacherId}${queryParams ? `?${queryParams}` : ''}`);
      }
    }
    return http.get(`/attendance/sessions/scheduled${queryParams ? `?${queryParams}` : ''}`);
  }

  /**
   * Start attendance for a scheduled session
   */
  startScheduledSessionAttendance(scheduledSessionId, options = {}) {
    return http.post(`/attendance/sessions/scheduled/${scheduledSessionId}/start`, options);
  }

  /**
   * Get scheduled sessions ready for attendance
   */
  getScheduledSessionsForAttendance(filters = {}) {
    const queryParams = new URLSearchParams({
      upcoming: true,
      readyForAttendance: true,
      ...filters
    }).toString();
    
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
      if (teacherId) {
        return http.get(`/scheduled-sessions/attendance/teacher/${teacherId}${queryParams ? `?${queryParams}` : ''}`);
      }
    }
    return http.get(`/scheduled-sessions/attendance${queryParams ? `?${queryParams}` : ''}`);
  }

  /**
   * Complete a scheduled session attendance
   */
  completeScheduledSessionAttendance(scheduledSessionId, attendanceData) {
    return http.put(`/attendance/sessions/scheduled/${scheduledSessionId}/complete`, attendanceData);
  }

  /**
   * Get attendance statistics for scheduled sessions
   */
  getScheduledSessionAttendanceStats(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
      if (teacherId) {
        return http.get(`/attendance/stats/scheduled/teacher/${teacherId}${queryParams ? `?${queryParams}` : ''}`);
      }
    }
    return http.get(`/attendance/stats/scheduled${queryParams ? `?${queryParams}` : ''}`);
  }

  /**
   * Sync attendance sessions with scheduled sessions
   */
  syncWithScheduledSessions(courseId = null) {
    const endpoint = courseId ? 
      `/attendance/sessions/sync/course/${courseId}` : 
      '/attendance/sessions/sync';
    return http.post(endpoint);
  }

  /**
   * Get attendance sessions by schedule ID
   */
  getSessionsBySchedule(scheduleId) {
    return http.get(`/attendance/sessions/schedule/${scheduleId}`);
  }

  /**
   * Create multiple attendance sessions from schedule pattern
   */
  createSessionsFromSchedulePattern(scheduleId, options = {}) {
    return http.post(`/attendance/sessions/from-schedule-pattern/${scheduleId}`, options);
  }

  /**
   * Get attendance summary for a specific schedule
   */
  getAttendanceSummaryBySchedule(scheduleId, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return http.get(`/attendance/summary/schedule/${scheduleId}${queryParams ? `?${queryParams}` : ''}`);
  }

  /**
   * Mark attendance for all enrolled students in a scheduled session
   */
  bulkMarkScheduledAttendance(scheduledSessionId, attendanceData) {
    return http.post(`/attendance/sessions/scheduled/${scheduledSessionId}/bulk-mark`, attendanceData);
  }

  /**
   * Get upcoming scheduled sessions that need attendance
   */
  getUpcomingScheduledSessions(filters = {}) {
    const queryParams = new URLSearchParams({
      needsAttendance: true,
      upcoming: true,
      ...filters
    }).toString();
    
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
      if (teacherId) {
        return http.get(`/scheduled-sessions/upcoming/teacher/${teacherId}${queryParams ? `?${queryParams}` : ''}`);
      }
    }
    return http.get(`/scheduled-sessions/upcoming${queryParams ? `?${queryParams}` : ''}`);
  }

  /**
   * Auto-generate attendance sessions for active course schedules
   */
  autoGenerateAttendanceFromSchedules(courseId = null, dateRange = null) {
    const data = { courseId, dateRange };
    return http.post('/attendance/sessions/auto-generate', data);
  }

  /**
   * Get attendance patterns and insights for scheduled courses
   */
  getScheduledAttendanceInsights(courseId, scheduleId = null) {
    const params = scheduleId ? `?scheduleId=${scheduleId}` : '';
    return http.get(`/attendance/insights/course/${courseId}${params}`);
  }

  /**
   * Update recurring attendance for schedule-based sessions
   */
  updateRecurringAttendance(scheduleId, attendancePattern) {
    return http.put(`/attendance/recurring/schedule/${scheduleId}`, attendancePattern);
  }

  /**
   * Get attendance conflicts between manual sessions and scheduled sessions
   */
  getAttendanceConflicts(courseId, dateRange = null) {
    const params = dateRange ? `?from=${dateRange.from}&to=${dateRange.to}` : '';
    return http.get(`/attendance/conflicts/course/${courseId}${params}`);
  }

  /**
   * Resolve attendance conflicts by merging or choosing sessions
   */
  resolveAttendanceConflicts(conflictId, resolution) {
    return http.post(`/attendance/conflicts/${conflictId}/resolve`, resolution);
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
    
    // If user is a teacher, add teacher filter
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
      if (teacherId) {
        params.teacherId = teacherId;
      }
    }
    
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
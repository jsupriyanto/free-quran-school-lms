import http from "./http-common";
import { isTeacher, getCurrentTeacherId, isAdmin } from "@/utils/accessControl";

class CourseScheduleService {
  // ==================== TIME SLOTS MANAGEMENT ====================
  
  /**
   * Get all available time slots
   */
  getAllTimeSlots() {
    return http.get("/time-slot");
  }

  /**
   * Create a new time slot
   */
  createTimeSlot(data) {
    return http.post("/time-slot", data);
  }

  /**
   * Update a time slot
   */
  updateTimeSlot(id, data) {
    return http.put(`/time-slot/${id}`, data);
  }

  /**
   * Delete a time slot
   */
  deleteTimeSlot(id) {
    return http.delete(`/time-slot/${id}`);
  }

  // ==================== COURSE SCHEDULES MANAGEMENT ====================

  /**
   * Get all schedules for a specific course
   */
  getSchedulesByCourse(courseId) {
    return http.get(`/course-schedule/course/${courseId}`);
  }

  /**
   * Get all schedules (with teacher filtering if applicable)
   */
  getAllSchedules() {
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
      if (teacherId) {
        return http.get(`/course-schedule/teacher/${teacherId}`);
      }
    }
    return http.get("/course-schedule");
  }

  /**
   * Get schedules for a specific teacher
   */
  getSchedulesByTeacher(teacherId) {
    return http.get(`/course-schedule/teacher/${teacherId}`);
  }

  /**
   * Get a specific schedule by ID
   */
  getSchedule(id) {
    return http.get(`/course-schedule/${id}`);
  }

  /**
   * Create a new course schedule
   */
  createSchedule(data) {
    return http.post("/course-schedule", data);
  }

  /**
   * Update an existing course schedule
   */
  updateSchedule(id, data) {
    return http.put(`/course-schedule/${id}`, data);
  }

  /**
   * Delete a course schedule
   */
  deleteSchedule(id) {
    return http.delete(`/course-schedule/${id}`);
  }

  /**
   * Duplicate an existing schedule to another course or time period
   */
  duplicateSchedule(scheduleId, data) {
    return http.post(`/course-schedule/${scheduleId}/duplicate`, data);
  }

  // ==================== SCHEDULED SESSIONS MANAGEMENT ====================

  /**
   * Generate sessions from a schedule (one-time or recurring)
   */
  generateSessions(scheduleId, options = {}) {
    return http.post(`/course-schedule/${scheduleId}/generate-sessions`, options);
  }

  /**
   * Get all scheduled sessions for a course
   */
  getScheduledSessions(courseId, params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    return http.get(`/scheduled-sessions/course/${courseId}${queryParams ? `?${queryParams}` : ''}`);
  }

  /**
   * Get scheduled sessions by date range
   */
  getScheduledSessionsByDateRange(startDate, endDate, filters = {}) {
    const params = { startDate, endDate, ...filters };
    const queryParams = new URLSearchParams(params).toString();
    return http.get(`/scheduled-sessions/date-range?${queryParams}`);
  }

  /**
   * Get scheduled sessions for a teacher
   */
  getTeacherScheduledSessions(teacherId, params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    return http.get(`/scheduled-sessions/teacher/${teacherId}${queryParams ? `?${queryParams}` : ''}`);
  }

  /**
   * Update a specific scheduled session
   */
  updateScheduledSession(sessionId, data) {
    return http.put(`/scheduled-sessions/${sessionId}`, data);
  }

  /**
   * Cancel a specific scheduled session
   */
  cancelScheduledSession(sessionId, reason = "") {
    return http.put(`/scheduled-sessions/${sessionId}/cancel`, { reason });
  }

  /**
   * Reschedule a specific session
   */
  rescheduleSession(sessionId, newDateTime, newTeacherId = null) {
    return http.put(`/scheduled-sessions/${sessionId}/reschedule`, {
      newDateTime,
      newTeacherId
    });
  }

  // ==================== TEACHER AVAILABILITY MANAGEMENT ====================

  /**
   * Get teacher availability
   */
  getTeacherAvailability(teacherId, dateRange = {}) {
    const queryParams = new URLSearchParams(dateRange).toString();
    return http.get(`/teacher-availability/${teacherId}${queryParams ? `?${queryParams}` : ''}`);
  }

  /**
   * Set teacher availability
   */
  setTeacherAvailability(teacherId, availabilityData) {
    return http.post(`/teacher-availability/${teacherId}`, availabilityData);
  }

  /**
   * Update teacher availability
   */
  updateTeacherAvailability(availabilityId, data) {
    return http.put(`/teacher-availability/entry/${availabilityId}`, data);
  }

  /**
   * Delete teacher availability entry
   */
  deleteTeacherAvailability(availabilityId) {
    return http.delete(`/teacher-availability/entry/${availabilityId}`);
  }

  /**
   * Check if teacher is available for a specific time slot
   */
  checkTeacherAvailability(teacherId, dateTime, duration) {
    return http.post(`/teacher-availability/${teacherId}/check`, {
      dateTime,
      duration
    });
  }

  // ==================== SCHEDULE CONFLICTS & VALIDATION ====================

  /**
   * Check for scheduling conflicts
   */
  checkScheduleConflicts(scheduleData) {
    return http.post("/course-schedule/check-conflicts", scheduleData);
  }

  /**
   * Get available teachers for a specific time slot
   */
  getAvailableTeachers(dateTime, duration, courseId = null) {
    return http.post("/course-schedule/available-teachers", {
      dateTime,
      duration,
      courseId
    });
  }

  /**
   * Validate schedule before creation
   */
  validateSchedule(scheduleData) {
    return http.post("/course-schedule/validate", scheduleData);
  }

  // ==================== CALENDAR & DASHBOARD VIEWS ====================

  /**
   * Get calendar view data for schedules
   */
  getCalendarView(startDate, endDate, filters = {}) {
    const params = { startDate, endDate, ...filters };
    const queryParams = new URLSearchParams(params).toString();
    return http.get(`/course-schedule/calendar?${queryParams}`);
  }

  /**
   * Get schedule statistics for dashboard
   */
  getScheduleStats(dateRange = {}) {
    const queryParams = new URLSearchParams(dateRange).toString();
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
      if (teacherId) {
        return http.get(`/course-schedule/stats/teacher/${teacherId}${queryParams ? `?${queryParams}` : ''}`);
      }
    }
    return http.get(`/course-schedule/stats${queryParams ? `?${queryParams}` : ''}`);
  }

  /**
   * Get upcoming sessions for a teacher or course
   */
  getUpcomingSessions(options = {}) {
    const queryParams = new URLSearchParams(options).toString();
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
      if (teacherId) {
        return http.get(`/scheduled-sessions/upcoming/teacher/${teacherId}${queryParams ? `?${queryParams}` : ''}`);
      }
    }
    return http.get(`/scheduled-sessions/upcoming${queryParams ? `?${queryParams}` : ''}`);
  }

  // ==================== BULK OPERATIONS ====================

  /**
   * Bulk create schedules for multiple courses
   */
  bulkCreateSchedules(schedulesData) {
    return http.post("/course-schedule/bulk-create", schedulesData);
  }

  /**
   * Bulk update multiple schedules
   */
  bulkUpdateSchedules(updates) {
    return http.put("/course-schedule/bulk-update", updates);
  }

  /**
   * Bulk cancel sessions
   */
  bulkCancelSessions(sessionIds, reason = "") {
    return http.put("/scheduled-sessions/bulk-cancel", {
      sessionIds,
      reason
    });
  }

  // ==================== RECURRING SCHEDULES ====================

  /**
   * Create recurring schedule pattern
   */
  createRecurringSchedule(data) {
    return http.post("/course-schedule/recurring", data);
  }

  /**
   * Update recurring schedule pattern
   */
  updateRecurringSchedule(scheduleId, data) {
    return http.put(`/course-schedule/${scheduleId}/recurring`, data);
  }

  /**
   * Stop recurring schedule (future sessions only)
   */
  stopRecurringSchedule(scheduleId, endDate = null) {
    return http.put(`/course-schedule/${scheduleId}/stop-recurring`, { endDate });
  }
}

export default new CourseScheduleService();
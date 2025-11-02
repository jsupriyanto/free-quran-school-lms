import http from "./http-common";
import { isTeacher, getCurrentTeacherId, isAdmin } from "@/utils/accessControl";
import courseScheduleService from "./course-schedule.service";

class EventService {
  // Get all events (courses with start/end dates)
  getAllEvents() {
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
      if (teacherId) {
        return http.get(`/course/teacher/${teacherId}`);
      }
    }
    return http.get("/course");
  }

  // Get events for a specific teacher
  getEventsForTeacher(teacherId) {
    return http.get(`/course/teacher/${teacherId}`);
  }

  // Get event by ID
  getEvent(id) {
    return http.get(`/course/${id}`);
  }

  // ==================== SCHEDULE-BASED EVENTS ====================

  /**
   * Get calendar events from scheduled sessions
   */
  getScheduledEvents(startDate, endDate, filters = {}) {
    return courseScheduleService.getCalendarView(startDate, endDate, filters);
  }

  /**
   * Get upcoming scheduled events for a teacher
   */
  getUpcomingScheduledEvents(teacherId, limit = 10) {
    return courseScheduleService.getTeacherScheduledSessions(teacherId, {
      upcoming: true,
      limit
    });
  }

  /**
   * Get events for calendar display (combines courses and scheduled sessions)
   */
  async getCalendarEvents(startDate, endDate, options = {}) {
    try {
      // Get course events and scheduled session events in parallel
      const [courseEvents, scheduledEvents] = await Promise.all([
        this.getAllEvents(),
        this.getScheduledEvents(startDate, endDate, options)
      ]);

      return {
        courses: courseEvents.data || [],
        scheduledSessions: scheduledEvents.data || [],
        combined: this.combineEventsForCalendar(courseEvents.data, scheduledEvents.data)
      };
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      throw error;
    }
  }

  /**
   * Transform events for calendar display
   */
  combineEventsForCalendar(courses = [], scheduledSessions = []) {
    const events = [];

    // Add course events
    courses.forEach(course => {
      if (course.startDate && course.endDate) {
        events.push({
          id: `course-${course.id}`,
          title: course.title,
          start: course.startDate,
          end: course.endDate,
          type: 'course',
          backgroundColor: '#2196F3',
          borderColor: '#2196F3',
          extendedProps: {
            course,
            type: 'course'
          }
        });
      }
    });

    // Add scheduled session events
    scheduledSessions.forEach(session => {
      events.push({
        id: `session-${session.id}`,
        title: `${session.course?.title || 'Session'} - ${session.teacher?.firstName || ''} ${session.teacher?.lastName || ''}`,
        start: session.scheduledDate,
        end: session.endTime,
        type: 'session',
        backgroundColor: session.status === 'cancelled' ? '#f44336' : '#4CAF50',
        borderColor: session.status === 'cancelled' ? '#f44336' : '#4CAF50',
        extendedProps: {
          session,
          type: 'session',
          course: session.course,
          teacher: session.teacher
        }
      });
    });

    return events;
  }

  /**
   * Create event from scheduled session
   */
  createEventFromSchedule(scheduleId, eventData) {
    return http.post(`/course-schedules/${scheduleId}/create-event`, eventData);
  }

  /**
   * Update scheduled session event
   */
  updateScheduledEvent(sessionId, eventData) {
    return courseScheduleService.updateScheduledSession(sessionId, eventData);
  }

  /**
   * Cancel scheduled event
   */
  cancelScheduledEvent(sessionId, reason) {
    return courseScheduleService.cancelScheduledSession(sessionId, reason);
  }
}

export default new EventService();
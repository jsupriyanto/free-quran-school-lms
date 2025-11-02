import http from "./http-common";
import { isTeacher, getCurrentTeacherId, isAdmin } from "@/utils/accessControl";

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
}

export default new EventService();
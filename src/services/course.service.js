import http from "./http-common";
import { isTeacher, getCurrentTeacherId, isAdmin } from "@/utils/accessControl";

class CourseDataService {
  getAll() {
    // If user is a teacher, get only their courses
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
      if (teacherId) {
        return http.get(`/course/teacher/${teacherId}`);
      }
    }
    // Admin gets all courses
    return http.get("/course");
  }

  getAllForTeacher(teacherId) {
    return http.get(`/course/teacher/${teacherId}`);
  }

  get(id) {
    return http.get(`/course/${id}`);
  }

  create(data) {
    return http.post("/course", data);
  }

  update(id, data) {
    return http.put(`/course/${id}`, data);
  }
  
  delete(id) {
    return http.delete(`/course/${id}`);
  }

  getCourseStats() {
    // If user is a teacher, get stats for their courses only
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
      if (teacherId) {
        return http.get(`/course/dashboard/stats/teacher/${teacherId}`);
      }
    }
    return http.get("/course/dashboard/stats");
  }

  getUpcomingCourses() {
    // If user is a teacher, get their upcoming courses only
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
      if (teacherId) {
        return http.get(`/course/dashboard/upcoming/courses/teacher/${teacherId}`);
      }
    }
    return http.get("/course/dashboard/upcoming/courses");
  }

  getUpcomingCourseCompletions() {
    // If user is a teacher, get their current courses only
    if (isTeacher() && !isAdmin()) {
      const teacherId = getCurrentTeacherId();
      if (teacherId) {
        return http.get(`/course/dashboard/current/courses/teacher/${teacherId}`);
      }
    }
    return http.get("/course/dashboard/current/courses");
  }
}

export default new CourseDataService();

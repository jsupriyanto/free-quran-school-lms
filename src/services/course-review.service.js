import http from "./http-common";

class CourseReviewService {
  getCourseReviewsByCourseId(courseId) {
    return http.get(`/course-review/course/${courseId}`);
  }

  createCourseReview(data) {
    return http.post("/course-review", data);
  }

  deleteCourseReview(id) {
    return http.delete(`/course-review/${id}`);
  }

  getTop10CourseReviews() {
    return http.get("/course-review/top10");
  }
}

export default new CourseReviewService();

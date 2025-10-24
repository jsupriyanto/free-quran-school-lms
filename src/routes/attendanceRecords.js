const express = require('express');
const router = express.Router();
const {
  getRecords,
  createOrUpdateRecord,
  updateRecord,
  deleteRecord,
  getRecordsBySession,
  markBulkAttendance,
  getStudentRecordsByCourse,
  getStudentAttendanceStats,
  getCourseAttendanceSummary
} = require('../controllers/attendanceRecordController');

// Record CRUD operations
router.get('/', getRecords);
router.post('/', createOrUpdateRecord);
router.put('/:recordId', updateRecord);
router.delete('/:recordId', deleteRecord);

// Session-specific routes
router.get('/session/:sessionId', getRecordsBySession);
router.post('/session/:sessionId/bulk', markBulkAttendance);

// Student-specific routes
router.get('/student/:studentId/course/:courseId', getStudentRecordsByCourse);
router.get('/student/:studentId/stats', getStudentAttendanceStats);

// Course-specific routes
router.get('/course/:courseId/summary', getCourseAttendanceSummary);

module.exports = router;
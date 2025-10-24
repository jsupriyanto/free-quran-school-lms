const express = require('express');
const router = express.Router();
const {
  getSessions,
  createSession,
  updateSession,
  deleteSession,
  startSession,
  completeSession,
  cancelSession,
  getSessionsByCourse,
  getAttendanceStatistics
} = require('../controllers/attendanceSessionController');

// Session CRUD operations
router.get('/', getSessions);
router.post('/', createSession);
router.put('/:sessionId', updateSession);
router.delete('/:sessionId', deleteSession);

// Session status management
router.patch('/:sessionId/start', startSession);
router.patch('/:sessionId/complete', completeSession);
router.patch('/:sessionId/cancel', cancelSession);

// Course-specific routes
router.get('/course/:courseId', getSessionsByCourse);

// Statistics and reporting
router.get('/statistics/attendance', getAttendanceStatistics);

module.exports = router;
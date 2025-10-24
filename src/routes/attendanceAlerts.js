const express = require('express');
const router = express.Router();
const {
  getAlerts,
  createAlert,
  acknowledgeAlert,
  resolveAlert,
  dismissAlert,
  addAlertAction,
  getTeacherAlerts,
  getAlertSummary,
  checkConsecutiveAbsences,
  checkLowAttendanceRate
} = require('../controllers/attendanceAlertController');

// Alert CRUD operations
router.get('/', getAlerts);
router.post('/', createAlert);

// Alert management
router.patch('/:alertId/acknowledge', acknowledgeAlert);
router.patch('/:alertId/resolve', resolveAlert);
router.patch('/:alertId/dismiss', dismissAlert);
router.post('/:alertId/actions', addAlertAction);

// Teacher-specific routes
router.get('/teacher/:teacherId', getTeacherAlerts);
router.get('/teacher/:teacherId/summary', getAlertSummary);

// Alert checking and automation
router.post('/check/consecutive-absences', checkConsecutiveAbsences);
router.post('/check/low-attendance-rate', checkLowAttendanceRate);

module.exports = router;
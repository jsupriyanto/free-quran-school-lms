const express = require('express');
const router = express.Router();

// Import individual route modules
const attendanceSessionRoutes = require('./attendanceSessions');
const attendanceRecordRoutes = require('./attendanceRecords');
const attendanceAlertRoutes = require('./attendanceAlerts');

// Mount the routes with appropriate prefixes
router.use('/sessions', attendanceSessionRoutes);
router.use('/records', attendanceRecordRoutes);
router.use('/alerts', attendanceAlertRoutes);

// Additional combined endpoints
router.get('/dashboard/teacher/:teacherId', async (req, res) => {
  try {
    const { teacherId } = req.params;
    
    // This could call multiple controllers to get dashboard data
    // For now, just return a placeholder response
    res.json({
      success: true,
      message: 'Teacher attendance dashboard endpoint',
      data: {
        teacherId,
        // This would include summary data from multiple controllers
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
      error: error.message
    });
  }
});

router.get('/dashboard/course/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    
    // This could call multiple controllers to get course dashboard data
    res.json({
      success: true,
      message: 'Course attendance dashboard endpoint',
      data: {
        courseId,
        // This would include summary data from multiple controllers
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course dashboard data',
      error: error.message
    });
  }
});

module.exports = router;
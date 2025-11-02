import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  LinearProgress,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import {
  Sync as SyncIcon,
  Schedule as ScheduleIcon,
  People as PeopleIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import dayjs from 'dayjs';
import enrollmentService from '@/services/enrollment.service';
import courseScheduleService from '@/services/course-schedule.service';
import attendanceService from '@/services/attendance.service';

const EnrollmentScheduleSync = ({ 
  courseId, 
  open, 
  onClose, 
  onSyncComplete 
}) => {
  const [loading, setLoading] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
  const [courseSchedules, setCourseSchedules] = useState([]);
  const [syncResults, setSyncResults] = useState(null);
  const [selectedEnrollments, setSelectedEnrollments] = useState([]);
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [autoCreateSessions, setAutoCreateSessions] = useState(true);

  useEffect(() => {
    if (open && courseId) {
      fetchData();
    }
  }, [open, courseId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [enrollmentsResponse, schedulesResponse] = await Promise.all([
        enrollmentService.getEnrollmentsByCourse(courseId),
        courseScheduleService.getSchedulesByCourse(courseId)
      ]);

      if (enrollmentsResponse.data) {
        setEnrollments(enrollmentsResponse.data);
        setSelectedEnrollments(enrollmentsResponse.data.map(e => e.id));
      }

      if (schedulesResponse.data) {
        setCourseSchedules(schedulesResponse.data.filter(s => s.isActive));
        setSelectedSchedules(schedulesResponse.data.filter(s => s.isActive).map(s => s.id));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    setLoading(true);
    try {
      const syncData = {
        enrollmentIds: selectedEnrollments,
        scheduleIds: selectedSchedules,
        options: {
          autoCreateSessions,
          dateRange: {
            from: dayjs().format('YYYY-MM-DD'),
            to: dayjs().add(30, 'days').format('YYYY-MM-DD')
          }
        }
      };

      const response = await enrollmentService.syncEnrollmentWithScheduleChanges(courseId);
      
      if (autoCreateSessions && selectedSchedules.length > 0) {
        await Promise.all(
          selectedSchedules.map(scheduleId =>
            attendanceService.createSessionsFromSchedulePattern(scheduleId, {
              enrollmentIds: selectedEnrollments
            })
          )
        );
      }

      setSyncResults({
        success: true,
        enrollmentsUpdated: selectedEnrollments.length,
        schedulesProcessed: selectedSchedules.length,
        sessionsCreated: autoCreateSessions ? selectedSchedules.length * 4 : 0, // Estimate
        message: 'Enrollment and schedule sync completed successfully'
      });

      if (onSyncComplete) {
        onSyncComplete(response.data);
      }
    } catch (error) {
      setSyncResults({
        success: false,
        error: error.message || 'Sync failed',
        message: 'Failed to sync enrollments with schedules'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSyncResults(null);
    setSelectedEnrollments([]);
    setSelectedSchedules([]);
    setAutoCreateSessions(true);
    onClose();
  };

  const toggleEnrollmentSelection = (enrollmentId) => {
    setSelectedEnrollments(prev => 
      prev.includes(enrollmentId)
        ? prev.filter(id => id !== enrollmentId)
        : [...prev, enrollmentId]
    );
  };

  const toggleScheduleSelection = (scheduleId) => {
    setSelectedSchedules(prev => 
      prev.includes(scheduleId)
        ? prev.filter(id => id !== scheduleId)
        : [...prev, scheduleId]
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <SyncIcon color="primary" />
        Sync Enrollments with Course Schedules
      </DialogTitle>

      <DialogContent dividers>
        {loading && <LinearProgress sx={{ mb: 2 }} />}

        {syncResults && (
          <Alert 
            severity={syncResults.success ? "success" : "error"}
            sx={{ mb: 3 }}
            action={
              syncResults.success && (
                <IconButton size="small" onClick={() => setSyncResults(null)}>
                  <CloseIcon />
                </IconButton>
              )
            }
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {syncResults.message}
            </Typography>
            {syncResults.success && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" display="block">
                  • {syncResults.enrollmentsUpdated} enrollments updated
                </Typography>
                <Typography variant="caption" display="block">
                  • {syncResults.schedulesProcessed} schedules processed
                </Typography>
                {syncResults.sessionsCreated > 0 && (
                  <Typography variant="caption" display="block">
                    • {syncResults.sessionsCreated} attendance sessions created
                  </Typography>
                )}
              </Box>
            )}
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 3 }}>
          {/* Enrollments Section */}
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <PeopleIcon color="primary" />
                <Typography variant="h6">
                  Enrollments ({enrollments.length})
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setSelectedEnrollments(
                    selectedEnrollments.length === enrollments.length 
                      ? [] 
                      : enrollments.map(e => e.id)
                  )}
                >
                  {selectedEnrollments.length === enrollments.length ? 'Deselect All' : 'Select All'}
                </Button>
              </Box>

              <TableContainer sx={{ maxHeight: 300 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">Select</TableCell>
                      <TableCell>Student</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Progress</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {enrollments.map((enrollment) => (
                      <TableRow key={enrollment.id} hover>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedEnrollments.includes(enrollment.id)}
                            onChange={() => toggleEnrollmentSelection(enrollment.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {enrollment.studentName || enrollment.user?.name || 'Unknown'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {enrollment.studentEmail || enrollment.user?.email}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={enrollment.status} 
                            size="small"
                            color={enrollment.status === 'active' ? 'success' : 'default'}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {enrollment.progress || 0}%
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Schedules Section */}
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <ScheduleIcon color="primary" />
                <Typography variant="h6">
                  Active Schedules ({courseSchedules.length})
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setSelectedSchedules(
                    selectedSchedules.length === courseSchedules.length 
                      ? [] 
                      : courseSchedules.map(s => s.id)
                  )}
                >
                  {selectedSchedules.length === courseSchedules.length ? 'Deselect All' : 'Select All'}
                </Button>
              </Box>

              <TableContainer sx={{ maxHeight: 300 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">Select</TableCell>
                      <TableCell>Schedule</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Teacher</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {courseSchedules.map((schedule) => (
                      <TableRow key={schedule.id} hover>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedSchedules.includes(schedule.id)}
                            onChange={() => toggleScheduleSelection(schedule.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {schedule.title || `${schedule.dayOfWeek} Schedule`}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {schedule.dayOfWeek}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {schedule.startTime} - {schedule.endTime}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {schedule.teacherName || 'Unassigned'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>

        {/* Sync Options */}
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Sync Options
            </Typography>
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={autoCreateSessions}
                  onChange={(e) => setAutoCreateSessions(e.target.checked)}
                />
              }
              label="Auto-create attendance sessions for next 30 days"
            />
            
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                This will update enrollment records to include schedule access and optionally 
                create attendance sessions based on the selected schedules.
              </Typography>
            </Alert>
          </CardContent>
        </Card>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSync}
          variant="contained"
          disabled={loading || selectedEnrollments.length === 0 || selectedSchedules.length === 0}
          startIcon={<SyncIcon />}
        >
          {loading ? 'Syncing...' : 'Sync Enrollments'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnrollmentScheduleSync;
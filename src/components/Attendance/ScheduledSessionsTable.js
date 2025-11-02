import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Skeleton,
  Tooltip,
  Menu,
  MenuItem,
  Grid
} from '@mui/material';
import {
  PlayArrow as StartIcon,
  Stop as StopIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  People as PeopleIcon,
  AccessTime as AccessTimeIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CompleteIcon
} from '@mui/icons-material';
import dayjs from 'dayjs';
import attendanceService from '@/services/attendance.service';
import courseScheduleService from '@/services/course-schedule.service';

const SESSION_STATUS_COLORS = {
  scheduled: 'default',
  active: 'success',
  completed: 'info',
  cancelled: 'error'
};

function ScheduledSessionsTable({ 
  onSessionStart,
  onSessionUpdate,
  refreshTrigger,
  courseFilter = null 
}) {
  const [loading, setLoading] = useState(true);
  const [scheduledSessions, setScheduledSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const [startSessionDialog, setStartSessionDialog] = useState(false);
  const [completeSessionDialog, setCompleteSessionDialog] = useState(false);

  useEffect(() => {
    fetchScheduledSessions();
  }, [refreshTrigger, courseFilter]);

  const fetchScheduledSessions = async () => {
    setLoading(true);
    try {
      const filters = {
        ...(courseFilter && { courseId: courseFilter }),
        upcoming: true,
        readyForAttendance: true
      };
      
      const response = await attendanceService.getScheduledSessionsForAttendance(filters);
      setScheduledSessions(response.data || []);
    } catch (error) {
      console.error('Error fetching scheduled sessions:', error);
      setScheduledSessions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleActionMenuClick = (event, session) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedSession(session);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setSelectedSession(null);
  };

  const handleStartSession = async () => {
    if (!selectedSession) return;

    try {
      await attendanceService.startScheduledSessionAttendance(selectedSession.id);
      await fetchScheduledSessions();
      onSessionStart && onSessionStart(selectedSession);
      handleActionMenuClose();
    } catch (error) {
      console.error('Error starting scheduled session:', error);
    }
  };

  const handleCompleteSession = async () => {
    if (!selectedSession) return;

    try {
      await attendanceService.completeScheduledSessionAttendance(selectedSession.id, {
        completedAt: new Date().toISOString()
      });
      await fetchScheduledSessions();
      onSessionUpdate && onSessionUpdate();
      setCompleteSessionDialog(false);
      handleActionMenuClose();
    } catch (error) {
      console.error('Error completing scheduled session:', error);
    }
  };

  const handleCancelSession = async () => {
    if (!selectedSession) return;

    try {
      await courseScheduleService.cancelScheduledSession(
        selectedSession.id,
        'Cancelled from attendance management'
      );
      await fetchScheduledSessions();
      onSessionUpdate && onSessionUpdate();
      handleActionMenuClose();
    } catch (error) {
      console.error('Error cancelling scheduled session:', error);
    }
  };

  const formatSessionTime = (session) => {
    const startTime = dayjs(session.scheduledDate);
    const endTime = dayjs(session.endTime);
    
    if (startTime.isSame(endTime, 'day')) {
      return `${startTime.format('MMM D, YYYY')} • ${startTime.format('h:mm A')} - ${endTime.format('h:mm A')}`;
    } else {
      return `${startTime.format('MMM D, YYYY h:mm A')} - ${endTime.format('MMM D, YYYY h:mm A')}`;
    }
  };

  const getSessionStatusColor = (session) => {
    const now = dayjs();
    const sessionStart = dayjs(session.scheduledDate);
    const sessionEnd = dayjs(session.endTime);

    if (session.status === 'cancelled') return 'error';
    if (session.status === 'completed') return 'info';
    if (session.attendanceStatus === 'active') return 'success';
    if (now.isAfter(sessionEnd)) return 'warning';
    if (now.isBetween(sessionStart.subtract(15, 'minute'), sessionStart.add(30, 'minute'))) {
      return 'success'; // Ready to start
    }
    return 'default';
  };

  const getSessionStatusLabel = (session) => {
    const now = dayjs();
    const sessionStart = dayjs(session.scheduledDate);
    const sessionEnd = dayjs(session.endTime);

    if (session.status === 'cancelled') return 'Cancelled';
    if (session.status === 'completed') return 'Completed';
    if (session.attendanceStatus === 'active') return 'In Progress';
    if (now.isAfter(sessionEnd)) return 'Missed';
    if (now.isBetween(sessionStart.subtract(15, 'minute'), sessionStart.add(30, 'minute'))) {
      return 'Ready to Start';
    }
    if (now.isBefore(sessionStart)) return 'Upcoming';
    return 'Scheduled';
  };

  const canStartSession = (session) => {
    const now = dayjs();
    const sessionStart = dayjs(session.scheduledDate);
    
    return (
      session.status !== 'cancelled' &&
      session.attendanceStatus !== 'active' &&
      now.isAfter(sessionStart.subtract(15, 'minute')) &&
      now.isBefore(sessionStart.add(30, 'minute'))
    );
  };

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Scheduled Sessions</Typography>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={60} sx={{ mb: 1 }} />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Box>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarIcon />
              Scheduled Sessions
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={fetchScheduledSessions}
            >
              Refresh
            </Button>
          </Box>

          {scheduledSessions.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Course & Session</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Schedule</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Teacher</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Students</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scheduledSessions.map((session) => (
                    <TableRow key={session.id} hover>
                      <TableCell>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <SchoolIcon fontSize="small" color="primary" />
                            <Typography variant="body2" fontWeight="medium">
                              {session.course?.title || 'Unknown Course'}
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {session.topic || session.schedule?.title || 'Regular Session'}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box>
                          <Typography variant="body2">
                            {formatSessionTime(session)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Duration: {session.duration || 60} minutes
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PersonIcon fontSize="small" color="action" />
                          <Typography variant="body2">
                            {session.teacher?.firstName} {session.teacher?.lastName}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={getSessionStatusLabel(session)}
                          color={getSessionStatusColor(session)}
                          size="small"
                        />
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          {session.enrolledStudents || 0} enrolled
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          {canStartSession(session) && (
                            <Tooltip title="Start Attendance">
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() => {
                                  setSelectedSession(session);
                                  setStartSessionDialog(true);
                                }}
                              >
                                <StartIcon />
                              </IconButton>
                            </Tooltip>
                          )}

                          {session.attendanceStatus === 'active' && (
                            <Tooltip title="Complete Session">
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => {
                                  setSelectedSession(session);
                                  setCompleteSessionDialog(true);
                                }}
                              >
                                <CompleteIcon />
                              </IconButton>
                            </Tooltip>
                          )}

                          <IconButton
                            size="small"
                            onClick={(e) => handleActionMenuClick(e, session)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Alert severity="info" sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                No Scheduled Sessions
              </Typography>
              <Typography variant="body2">
                Scheduled sessions will appear here when they are ready for attendance tracking.
              </Typography>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
      >
        {canStartSession(selectedSession) && (
          <MenuItem onClick={() => {
            setStartSessionDialog(true);
            handleActionMenuClose();
          }}>
            <StartIcon sx={{ mr: 1 }} fontSize="small" />
            Start Attendance
          </MenuItem>
        )}
        <MenuItem onClick={() => {
          // Navigate to session details
          window.location.href = `/courses/${selectedSession?.courseId}/schedules`;
          handleActionMenuClose();
        }}>
          <EditIcon sx={{ mr: 1 }} fontSize="small" />
          View Schedule
        </MenuItem>
        <MenuItem onClick={handleCancelSession} sx={{ color: 'error.main' }}>
          <StopIcon sx={{ mr: 1 }} fontSize="small" />
          Cancel Session
        </MenuItem>
      </Menu>

      {/* Start Session Dialog */}
      <Dialog open={startSessionDialog} onClose={() => setStartSessionDialog(false)}>
        <DialogTitle>Start Attendance Session</DialogTitle>
        <DialogContent>
          <Typography>
            Are you ready to start attendance tracking for this session?
          </Typography>
          {selectedSession && (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1, border: 1, borderColor: 'divider' }}>
              <Typography variant="subtitle2">{selectedSession.course?.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatSessionTime(selectedSession)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Teacher: {selectedSession.teacher?.firstName} {selectedSession.teacher?.lastName}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStartSessionDialog(false)}>Cancel</Button>
          <Button onClick={handleStartSession} variant="contained">
            Start Session
          </Button>
        </DialogActions>
      </Dialog>

      {/* Complete Session Dialog */}
      <Dialog open={completeSessionDialog} onClose={() => setCompleteSessionDialog(false)}>
        <DialogTitle>Complete Attendance Session</DialogTitle>
        <DialogContent>
          <Typography>
            Mark this session as completed? This will finalize all attendance records.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCompleteSessionDialog(false)}>Cancel</Button>
          <Button onClick={handleCompleteSession} variant="contained" color="success">
            Complete Session
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ScheduledSessionsTable;
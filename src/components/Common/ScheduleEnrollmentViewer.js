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
  Chip,
  IconButton,
  Tooltip,
  Button,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  People as PeopleIcon,
  MoreVert as MoreVertIcon,
  PlayArrow as StartIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Group as GroupIcon,
  CalendarToday as CalendarIcon,
  AccessTime as AccessTimeIcon,
  School as SchoolIcon
} from '@mui/icons-material';
import dayjs from 'dayjs';
import enrollmentService from '@/services/enrollment.service';
import attendanceService from '@/services/attendance.service';

const ScheduleEnrollmentViewer = ({ 
  scheduleId, 
  courseName,
  scheduleDetails,
  onStartAttendance,
  onViewEnrollments 
}) => {
  const [loading, setLoading] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [detailDialog, setDetailDialog] = useState(false);

  useEffect(() => {
    if (scheduleId) {
      fetchScheduleData();
    }
  }, [scheduleId]);

  const fetchScheduleData = async () => {
    setLoading(true);
    try {
      const [enrollmentsResponse, sessionsResponse, statsResponse] = await Promise.all([
        enrollmentService.getEnrollmentsBySchedule(scheduleId),
        attendanceService.getUpcomingScheduledSessions({ scheduleId }),
        attendanceService.getScheduledAttendanceStats({ scheduleId })
      ]);

      if (enrollmentsResponse.data) {
        setEnrollments(enrollmentsResponse.data);
      }

      if (sessionsResponse.data) {
        setUpcomingSessions(sessionsResponse.data);
      }

      if (statsResponse.data) {
        setAttendanceStats(statsResponse.data);
      }
    } catch (error) {
      console.error('Error fetching schedule data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuOpen = (event, enrollment) => {
    setAnchorEl(event.currentTarget);
    setSelectedEnrollment(enrollment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEnrollment(null);
  };

  const handleViewEnrollmentDetail = () => {
    setDetailDialog(true);
    handleMenuClose();
  };

  const handleStartSessionAttendance = async (sessionId) => {
    try {
      await attendanceService.startScheduledSessionAttendance(sessionId);
      if (onStartAttendance) {
        onStartAttendance(sessionId);
      }
      fetchScheduleData(); // Refresh data
    } catch (error) {
      console.error('Error starting session attendance:', error);
    }
  };

  const getAttendanceRate = (enrollment) => {
    const attended = attendanceStats[enrollment.id]?.sessionsAttended || 0;
    const total = attendanceStats[enrollment.id]?.totalSessions || 1;
    return Math.round((attended / total) * 100);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'success';
      case 'completed': return 'info';
      case 'on hold': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        {loading && <LinearProgress sx={{ mb: 2 }} />}

        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ScheduleIcon color="primary" />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Schedule Enrollments
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {courseName}
              </Typography>
            </Box>
          </Box>
          
          <Chip
            icon={<GroupIcon />}
            label={`${enrollments.length} Students`}
            color="primary"
            variant="outlined"
          />
        </Box>

        {/* Schedule Info */}
        {scheduleDetails && (
          <Card sx={{ mb: 3, bgcolor: 'action.hover' }}>
            <CardContent sx={{ py: 2 }}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarIcon fontSize="small" color="primary" />
                  <Typography variant="body2">
                    {scheduleDetails.dayOfWeek}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon fontSize="small" color="primary" />
                  <Typography variant="body2">
                    {scheduleDetails.startTime} - {scheduleDetails.endTime}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SchoolIcon fontSize="small" color="primary" />
                  <Typography variant="body2">
                    {scheduleDetails.teacherName || 'Unassigned'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Sessions */}
        {upcomingSessions.length > 0 && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem' }}>
                Upcoming Sessions
              </Typography>
              {upcomingSessions.slice(0, 3).map((session) => (
                <Box
                  key={session.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {dayjs(session.scheduledDate).format('MMM DD, YYYY')}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {session.scheduledTime}
                    </Typography>
                  </Box>
                  
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<StartIcon />}
                    onClick={() => handleStartSessionAttendance(session.id)}
                    disabled={session.status === 'completed'}
                  >
                    {session.status === 'completed' ? 'Completed' : 'Start'}
                  </Button>
                </Box>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Enrollments Table */}
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Attendance Rate</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollments.map((enrollment) => (
                <TableRow key={enrollment.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar
                        src={enrollment.studentAvatar}
                        sx={{ width: 32, height: 32 }}
                      >
                        {enrollment.studentName?.[0]?.toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {enrollment.studentName || 'Unknown'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {enrollment.studentEmail}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Chip
                      label={enrollment.status}
                      size="small"
                      color={getStatusColor(enrollment.status)}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2">
                        {getAttendanceRate(enrollment)}%
                      </Typography>
                      {getAttendanceRate(enrollment) >= 80 && (
                        <Chip size="small" label="Good" color="success" />
                      )}
                      {getAttendanceRate(enrollment) < 60 && (
                        <Chip size="small" label="Low" color="error" />
                      )}
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2">
                      {enrollment.progress || 0}%
                    </Typography>
                  </TableCell>
                  
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, enrollment)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              
              {enrollments.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      No enrollments found for this schedule
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Actions Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleViewEnrollmentDetail}>
            <ListItemIcon>
              <ViewIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>View Details</ListItemText>
          </MenuItem>
          
          <MenuItem onClick={() => {
            if (onViewEnrollments) {
              onViewEnrollments(selectedEnrollment?.id);
            }
            handleMenuClose();
          }}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Manage Enrollment</ListItemText>
          </MenuItem>
        </Menu>

        {/* Detail Dialog */}
        <Dialog
          open={detailDialog}
          onClose={() => setDetailDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Enrollment Details
          </DialogTitle>
          <DialogContent>
            {selectedEnrollment && (
              <Box sx={{ pt: 1 }}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Detailed enrollment and attendance tracking for scheduled sessions.
                </Alert>
                
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {selectedEnrollment.studentName}
                </Typography>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Enrollment Date
                    </Typography>
                    <Typography variant="body1">
                      {dayjs(selectedEnrollment.enrolledAt).format('MMM DD, YYYY')}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Progress
                    </Typography>
                    <Typography variant="body1">
                      {selectedEnrollment.progress || 0}%
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Sessions Attended
                    </Typography>
                    <Typography variant="body1">
                      {attendanceStats[selectedEnrollment.id]?.sessionsAttended || 0} / 
                      {attendanceStats[selectedEnrollment.id]?.totalSessions || 0}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Attendance Rate
                    </Typography>
                    <Typography variant="body1">
                      {getAttendanceRate(selectedEnrollment)}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDetailDialog(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ScheduleEnrollmentViewer;
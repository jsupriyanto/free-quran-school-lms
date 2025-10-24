"use client";
import { useEffect, useState } from "react";
import * as React from "react";
import { 
  Box, 
  Typography, 
  Card, 
  Button, 
  TextField, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Checkbox,
  Grid,
  Tabs,
  Tab,
  LinearProgress,
  Alert,
  Snackbar,
  IconButton,
  Tooltip,
  Menu,
  ListItemIcon,
  ListItemText,
  Divider
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

// Icons
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import ClearIcon from "@mui/icons-material/Clear";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import BarChartIcon from "@mui/icons-material/BarChart";
import CloseIcon from "@mui/icons-material/Close";

// Services
import attendanceService from "@/services/attendance.service";
import courseService from "@/services/course.service";
import enrollmentService from "@/services/enrollment.service";
import PageTitle from "@/components/Common/PageTitle";
import { useSearch } from "@/contexts/SearchContext";

// Sample data for development/fallback
const sampleSessions = [
  {
    id: 1,
    courseId: 4,
    courseName: "Arabic Language Basics",
    sessionDate: "2025-10-23T10:00:00.000Z",
    sessionTime: "10:00 AM",
    duration: 60,
    topic: "Introduction to Arabic Letters",
    status: "completed",
    totalStudents: 15,
    presentStudents: 12,
    absentStudents: 3,
    lateStudents: 1
  },
  {
    id: 2,
    courseId: 5,
    courseName: "Hifz for Adults: Juz 30",
    sessionDate: "2025-10-23T14:00:00.000Z", 
    sessionTime: "2:00 PM",
    duration: 90,
    topic: "Surah An-Nas Review",
    status: "active",
    totalStudents: 8,
    presentStudents: 0,
    absentStudents: 0,
    lateStudents: 0
  }
];

const sampleAttendanceRecords = [
  {
    id: 1,
    sessionId: 1,
    studentId: 101,
    studentName: "Ahmed Hassan",
    studentEmail: "ahmed.hassan@example.com",
    studentAvatar: "https://i.pravatar.cc/150?img=1",
    status: "present",
    checkInTime: "2025-10-23T10:05:00.000Z",
    notes: "",
    markedBy: "Teacher Admin"
  },
  {
    id: 2,
    sessionId: 1,
    studentId: 102,
    studentName: "Fatima Al-Zahra",
    studentEmail: "fatima.zahra@example.com", 
    studentAvatar: "https://i.pravatar.cc/150?img=2",
    status: "late",
    checkInTime: "2025-10-23T10:15:00.000Z",
    notes: "Traffic delay",
    markedBy: "Teacher Admin"
  },
  {
    id: 3,
    sessionId: 1,
    studentId: 103,
    studentName: "Omar Abdullah",
    studentEmail: "omar.abdullah@example.com",
    studentAvatar: "https://i.pravatar.cc/150?img=3",
    status: "absent",
    checkInTime: null,
    notes: "Sick leave",
    markedBy: "Teacher Admin"
  }
];

const sampleCourses = [
  { id: 4, title: "Arabic Language Basics" },
  { id: 5, title: "Hifz for Adults: Juz 30" },
  { id: 6, title: "IQRA: Learn to Read Quran" },
  { id: 7, title: "Islamic Studies 101" },
  { id: 8, title: "Tafsir of Surah Al-Fatiha" },
  { id: 9, title: "Tajweed Level I" }
];

// Styled Components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`attendance-tabpanel-${index}`}
      aria-labelledby={`attendance-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default function AttendancePage() {
  // State management
  const [activeTab, setActiveTab] = useState(0);
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Filters
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Dialogs
  const [sessionDialogOpen, setSessionDialogOpen] = useState(false);
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  
  // Form data
  const [sessionForm, setSessionForm] = useState({
    courseId: "",
    sessionDate: dayjs(),
    sessionTime: dayjs(),
    duration: 60,
    topic: "",
    notes: ""
  });
  
  // Notifications
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  
  const [actionMenu, setActionMenu] = useState(null);
  
  const { globalSearchTerm } = useSearch();

  // Fetch data
  useEffect(() => {
    fetchCourses();
    fetchSessions();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchSessionsByCourse(selectedCourse);
      fetchEnrollmentsByCourse(selectedCourse);
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await courseService.getAll();
      if (response.data && response.data.length > 0) {
        setCourses(response.data);
      } else {
        setCourses(sampleCourses);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses(sampleCourses);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async () => {
    try {
      setLoading(true);
      // This would be the actual API call
      // const response = await attendanceService.getAllSessions();
      setSessions(sampleSessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setSessions(sampleSessions);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessionsByCourse = async (courseId) => {
    try {
      setLoading(true);
      // const response = await attendanceService.getSessionsByCourse(courseId);
      const filteredSessions = sampleSessions.filter(session => 
        session.courseId.toString() === courseId.toString()
      );
      setSessions(filteredSessions);
    } catch (error) {
      console.error("Error fetching course sessions:", error);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollmentsByCourse = async (courseId) => {
    try {
      const response = await enrollmentService.getAllEnrollments();
      if (response.data) {
        const courseEnrollments = response.data.filter(enrollment => 
          enrollment.courseId.toString() === courseId.toString()
        );
        setEnrollments(courseEnrollments);
      }
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      setEnrollments([]);
    }
  };

  const fetchAttendanceBySession = async (sessionId) => {
    try {
      setLoading(true);
      // const response = await attendanceService.getAttendanceBySession(sessionId);
      const sessionAttendance = sampleAttendanceRecords.filter(record => 
        record.sessionId === sessionId
      );
      setAttendanceRecords(sessionAttendance);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setAttendanceRecords([]);
    } finally {
      setLoading(false);
    }
  };

  // Event handlers
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCreateSession = async () => {
    try {
      setLoading(true);
      const sessionData = {
        ...sessionForm,
        sessionDate: sessionForm.sessionDate.toISOString(),
        sessionTime: sessionForm.sessionTime.format('HH:mm'),
      };
      
      // const response = await attendanceService.createSession(sessionData);
      
      // Simulate successful creation
      const newSession = {
        id: Date.now(),
        ...sessionData,
        courseName: courses.find(c => c.id.toString() === sessionData.courseId)?.title || "",
        status: "active",
        totalStudents: 0,
        presentStudents: 0,
        absentStudents: 0,
        lateStudents: 0
      };
      
      setSessions([...sessions, newSession]);
      setSessionDialogOpen(false);
      setSessionForm({
        courseId: "",
        sessionDate: dayjs(),
        sessionTime: dayjs(),
        duration: 60,
        topic: "",
        notes: ""
      });
      
      setSnackbar({
        open: true,
        message: "Session created successfully!",
        severity: "success"
      });
      
    } catch (error) {
      console.error("Error creating session:", error);
      setSnackbar({
        open: true,
        message: "Error creating session",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAttendance = (sessionId) => {
    setSelectedSession(sessionId);
    fetchAttendanceBySession(sessionId);
    setAttendanceDialogOpen(true);
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceRecords(prev => 
      prev.map(record => 
        record.studentId === studentId 
          ? { 
              ...record, 
              status, 
              checkInTime: status === 'present' || status === 'late' ? new Date().toISOString() : null 
            }
          : record
      )
    );
  };

  const handleSaveAttendance = async () => {
    try {
      setLoading(true);
      // const response = await attendanceService.bulkMarkAttendance({
      //   sessionId: selectedSession,
      //   records: attendanceRecords
      // });
      
      // Update session statistics
      const updatedSessions = sessions.map(session => {
        if (session.id === selectedSession) {
          const present = attendanceRecords.filter(r => r.status === 'present').length;
          const late = attendanceRecords.filter(r => r.status === 'late').length;
          const absent = attendanceRecords.filter(r => r.status === 'absent').length;
          
          return {
            ...session,
            presentStudents: present,
            lateStudents: late,
            absentStudents: absent,
            status: 'completed'
          };
        }
        return session;
      });
      
      setSessions(updatedSessions);
      setAttendanceDialogOpen(false);
      
      setSnackbar({
        open: true,
        message: "Attendance saved successfully!",
        severity: "success"
      });
      
    } catch (error) {
      console.error("Error saving attendance:", error);
      setSnackbar({
        open: true,
        message: "Error saving attendance",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSelectedCourse("");
    setStatusFilter("All");
    setSelectedDate(dayjs());
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "present":
        return "success";
      case "late":
        return "warning";
      case "absent":
        return "error";
      case "excused":
        return "info";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "present":
        return <CheckCircleIcon fontSize="small" />;
      case "late":
        return <AccessTimeIcon fontSize="small" />;
      case "absent":
        return <PersonOffIcon fontSize="small" />;
      case "excused":
        return <CancelIcon fontSize="small" />;
      default:
        return <PersonIcon fontSize="small" />;
    }
  };

  // Filter sessions based on search and filters
  const filteredSessions = sessions.filter(session => {
    if (globalSearchTerm) {
      const searchLower = globalSearchTerm.toLowerCase();
      if (!session.courseName.toLowerCase().includes(searchLower) &&
          !session.topic.toLowerCase().includes(searchLower)) {
        return false;
      }
    }
    
    if (statusFilter !== "All" && session.status !== statusFilter.toLowerCase()) {
      return false;
    }
    
    return true;
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PageTitle
        pageTitle="Attendances"
        dashboardUrl="/attendances"
        dashboardText="Attendances"
      />

      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
        className="rmui-card"
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: "25px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button
              onClick={() => setSessionDialogOpen(true)}
              variant="contained"
              sx={{
                textTransform: "capitalize",
                borderRadius: "7px",
                fontWeight: "500",
                fontSize: "13px",
                padding: "10px 20px",
              }}
              color="primary"
              startIcon={<AddIcon />}
            >
              Create Session
            </Button>

            <Button
              onClick={fetchSessions}
              variant="outlined"
              sx={{
                textTransform: "capitalize",
                borderRadius: "7px",
                fontWeight: "500",
                fontSize: "13px",
                padding: "6px 13px",
              }}
              color="primary"
              startIcon={<RefreshIcon />}
            >
              Refresh
            </Button>

            <Button
              onClick={() => window.open('/attendances/analytics', '_blank')}
              variant="contained"
              sx={{
                textTransform: "capitalize",
                borderRadius: "7px",
                fontWeight: "500",
                fontSize: "13px",
                padding: "6px 13px",
              }}
              color="secondary"
              startIcon={<BarChartIcon />}
            >
              Analytics
            </Button>

            <Button
              onClick={handleClearFilters}
              variant="outlined"
              sx={{
                textTransform: "capitalize",
                borderRadius: "7px",
                fontWeight: "500",
                fontSize: "13px",
                padding: "6px 13px",
              }}
              color="secondary"
              startIcon={<ClearIcon />}
            >
              Clear Filters
            </Button>
          </Box>
        </Box>

        {/* Filters */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            mb: "20px",
            flexWrap: "wrap"
          }}
        >
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Course</InputLabel>
            <Select
              value={selectedCourse}
              label="Course"
              onChange={(e) => setSelectedCourse(e.target.value)}
              sx={selectedCourse ? { 
                backgroundColor: 'action.selected',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                  borderWidth: '2px'
                }
              } : {}}
            >
              <MenuItem value="">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SchoolIcon fontSize="small" />
                  All Courses
                </Box>
              </MenuItem>
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id.toString()}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SchoolIcon fontSize="small" color="primary" />
                    {course.title}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>

          <DatePicker
            label="Session Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="attendance tabs">
            <Tab 
              label="Sessions" 
              icon={<CalendarTodayIcon />} 
              iconPosition="start"
            />
            <Tab 
              label="Reports" 
              icon={<BarChartIcon />} 
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Loading */}
        {loading && (
          <Box sx={{ width: "100%", mb: 2 }}>
            <LinearProgress />
          </Box>
        )}

        {/* Sessions Tab */}
        <TabPanel value={activeTab} index={0}>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none",
              borderRadius: "7px",
            }}
            className="rmui-table"
          >
            <Table sx={{ minWidth: 800 }} aria-label="sessions table">
              <TableHead className="bg-primary-50">
                <TableRow>
                  <TableCell sx={{ fontWeight: "500" }}>Course</TableCell>
                  <TableCell sx={{ fontWeight: "500" }}>Session Date</TableCell>
                  <TableCell sx={{ fontWeight: "500" }}>Topic</TableCell>
                  <TableCell sx={{ fontWeight: "500" }}>Duration</TableCell>
                  <TableCell sx={{ fontWeight: "500" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "500" }}>Attendance</TableCell>
                  <TableCell sx={{ fontWeight: "500" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSessions.map((session) => (
                  <TableRow key={session.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <SchoolIcon color="primary" />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {session.courseName}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {dayjs(session.sessionDate).format('MMM DD, YYYY')}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {session.sessionTime}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {session.topic}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {session.duration} min
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={session.status}
                        color={session.status === 'completed' ? 'success' : 'primary'}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          icon={<CheckCircleIcon />}
                          label={`Present: ${session.presentStudents}`}
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                        <Chip
                          icon={<AccessTimeIcon />}
                          label={`Late: ${session.lateStudents}`}
                          size="small"
                          color="warning"
                          variant="outlined"
                        />
                        <Chip
                          icon={<PersonOffIcon />}
                          label={`Absent: ${session.absentStudents}`}
                          size="small"
                          color="error"
                          variant="outlined"
                        />
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Mark Attendance">
                          <IconButton 
                            onClick={() => handleMarkAttendance(session.id)}
                            color="primary"
                            size="small"
                          >
                            <PresentToAllIcon />
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="More Actions">
                          <IconButton 
                            onClick={(e) => setActionMenu(e.currentTarget)}
                            size="small"
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredSessions.length === 0 && !loading && (
            <Box
              sx={{
                textAlign: "center",
                py: 4,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No sessions found. {selectedCourse ? "Try selecting a different course" : "Create a new session to get started."}
              </Typography>
            </Box>
          )}
        </TabPanel>

        {/* Reports Tab */}
        <TabPanel value={activeTab} index={1}>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <BarChartIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Attendance Reports
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Detailed attendance analytics and reports will be displayed here.
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              startIcon={<DownloadIcon />}
            >
              Generate Report
            </Button>
          </Box>
        </TabPanel>
      </Card>

      {/* Create Session Dialog */}
      <StyledDialog
        open={sessionDialogOpen}
        onClose={() => setSessionDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            Create New Session
            <IconButton onClick={() => setSessionDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Course</InputLabel>
                <Select
                  value={sessionForm.courseId}
                  label="Course"
                  onChange={(e) => setSessionForm({...sessionForm, courseId: e.target.value})}
                >
                  {courses.map((course) => (
                    <MenuItem key={course.id} value={course.id.toString()}>
                      {course.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={6}>
              <DatePicker
                label="Session Date"
                value={sessionForm.sessionDate}
                onChange={(newValue) => setSessionForm({...sessionForm, sessionDate: newValue})}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            
            <Grid item xs={6}>
              <TimePicker
                label="Session Time"
                value={sessionForm.sessionTime}
                onChange={(newValue) => setSessionForm({...sessionForm, sessionTime: newValue})}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                label="Duration (minutes)"
                type="number"
                fullWidth
                value={sessionForm.duration}
                onChange={(e) => setSessionForm({...sessionForm, duration: parseInt(e.target.value)})}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Topic"
                fullWidth
                value={sessionForm.topic}
                onChange={(e) => setSessionForm({...sessionForm, topic: e.target.value})}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Notes"
                multiline
                rows={3}
                fullWidth
                value={sessionForm.notes}
                onChange={(e) => setSessionForm({...sessionForm, notes: e.target.value})}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSessionDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleCreateSession} 
            variant="contained"
            disabled={!sessionForm.courseId || !sessionForm.topic}
          >
            Create Session
          </Button>
        </DialogActions>
      </StyledDialog>

      {/* Mark Attendance Dialog */}
      <StyledDialog
        open={attendanceDialogOpen}
        onClose={() => setAttendanceDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            Mark Attendance
            <IconButton onClick={() => setAttendanceDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Session: {sessions.find(s => s.id === selectedSession)?.topic}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {dayjs(sessions.find(s => s.id === selectedSession)?.sessionDate).format('MMM DD, YYYY')}
            </Typography>
          </Box>
          
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Check-in Time</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={record.studentAvatar} sx={{ width: 32, height: 32 }}>
                          {record.studentName.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {record.studentName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {record.studentEmail}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <FormControl size="small" sx={{ minWidth: 120 }}>
                        <Select
                          value={record.status}
                          onChange={(e) => handleAttendanceChange(record.studentId, e.target.value)}
                        >
                          <MenuItem value="present">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CheckCircleIcon fontSize="small" color="success" />
                              Present
                            </Box>
                          </MenuItem>
                          <MenuItem value="late">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <AccessTimeIcon fontSize="small" color="warning" />
                              Late
                            </Box>
                          </MenuItem>
                          <MenuItem value="absent">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <PersonOffIcon fontSize="small" color="error" />
                              Absent
                            </Box>
                          </MenuItem>
                          <MenuItem value="excused">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CancelIcon fontSize="small" color="info" />
                              Excused
                            </Box>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="body2">
                        {record.checkInTime ? dayjs(record.checkInTime).format('HH:mm') : '-'}
                      </Typography>
                    </TableCell>
                    
                    <TableCell>
                      <TextField
                        size="small"
                        placeholder="Add notes..."
                        value={record.notes}
                        onChange={(e) => {
                          setAttendanceRecords(prev => 
                            prev.map(r => 
                              r.id === record.id ? {...r, notes: e.target.value} : r
                            )
                          );
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAttendanceDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveAttendance} 
            variant="contained"
            startIcon={<SendIcon />}
          >
            Save Attendance
          </Button>
        </DialogActions>
      </StyledDialog>

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenu}
        open={Boolean(actionMenu)}
        onClose={() => setActionMenu(null)}
      >
        <MenuItem onClick={() => setActionMenu(null)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Session</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setActionMenu(null)}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export Attendance</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setActionMenu(null)} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete Session</ListItemText>
        </MenuItem>
      </Menu>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({...prev, open: false}))}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({...prev, open: false}))} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
}
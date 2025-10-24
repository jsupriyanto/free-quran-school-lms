"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Chip,
  Avatar,
  LinearProgress,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';

// Icons
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import WarningIcon from "@mui/icons-material/Warning";

// Services
import attendanceService from "@/services/attendance.service";
import courseService from "@/services/course.service";
import PageTitle from "@/components/Common/PageTitle";
import { AttendanceStatistics } from "@/components/Attendance";

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const MetricCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
}));

// Sample data for charts
const monthlyAttendanceData = [
  { month: 'Jan', attendance: 85, target: 90 },
  { month: 'Feb', attendance: 88, target: 90 },
  { month: 'Mar', attendance: 82, target: 90 },
  { month: 'Apr', attendance: 91, target: 90 },
  { month: 'May', attendance: 87, target: 90 },
  { month: 'Jun', attendance: 93, target: 90 },
];

const courseAttendanceData = [
  { course: 'Arabic Basics', attendance: 95, students: 24 },
  { course: 'Hifz Juz 30', attendance: 88, students: 18 },
  { course: 'Islamic Studies', attendance: 92, students: 32 },
  { course: 'Tajweed L1', attendance: 85, students: 20 },
  { course: 'Tafsir', attendance: 90, students: 15 },
];

const attendanceDistributionData = [
  { name: 'Present', value: 75, color: '#4caf50' },
  { name: 'Late', value: 15, color: '#ff9800' },
  { name: 'Absent', value: 8, color: '#f44336' },
  { name: 'Excused', value: 2, color: '#2196f3' },
];

const dailyTrendData = [
  { day: 'Mon', present: 85, late: 10, absent: 5 },
  { day: 'Tue', present: 88, late: 8, absent: 4 },
  { day: 'Wed', present: 92, late: 5, absent: 3 },
  { day: 'Thu', present: 87, late: 9, absent: 4 },
  { day: 'Fri', present: 90, late: 7, absent: 3 },
  { day: 'Sat', present: 85, late: 11, absent: 4 },
  { day: 'Sun', present: 83, late: 12, absent: 5 },
];

export default function AttendanceAnalytics() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalStudents: 156,
    averageAttendance: 89.5,
    punctualityRate: 85.2,
    improvementTrend: 'improving'
  });

  useEffect(() => {
    fetchCourses();
    fetchAnalytics();
  }, [selectedCourse, selectedPeriod]);

  const fetchCourses = async () => {
    try {
      const response = await courseService.getAll();
      setCourses(response.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real implementation, fetch from attendanceService.getAttendanceTrends()
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const topPerformers = [
    { name: 'Ahmed Hassan', course: 'Arabic Basics', attendance: 100, avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Fatima Al-Zahra', course: 'Hifz Juz 30', attendance: 98, avatar: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Omar Abdullah', course: 'Tajweed L1', attendance: 96, avatar: 'https://i.pravatar.cc/150?img=3' },
    { name: 'Aisha Ibrahim', course: 'Islamic Studies', attendance: 95, avatar: 'https://i.pravatar.cc/150?img=4' },
  ];

  const attendanceConcerns = [
    { name: 'Yusuf Mohamed', course: 'Tafsir', consecutiveAbsences: 3, attendance: 45, severity: 'high' },
    { name: 'Maryam Salah', course: 'Arabic Basics', consecutiveAbsences: 2, attendance: 68, severity: 'medium' },
  ];

  return (
    <>
      <PageTitle
        pageTitle="Attendance Analytics"
        dashboardUrl="/attendances"
        dashboardText="Attendances"
      />

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Attendance Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Comprehensive attendance analytics and insights
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Period</InputLabel>
                <Select
                  value={selectedPeriod}
                  label="Period"
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <MenuItem value="week">This Week</MenuItem>
                  <MenuItem value="month">This Month</MenuItem>
                  <MenuItem value="semester">This Semester</MenuItem>
                  <MenuItem value="year">This Year</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Course</InputLabel>
                <Select
                  value={selectedCourse}
                  label="Course"
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <MenuItem value="all">All Courses</MenuItem>
                  {courses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchAnalytics}
              >
                Refresh
              </Button>

              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
              >
                Export
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {loading && <LinearProgress sx={{ mb: 3 }} />}

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard>
            <Typography variant="h3" fontWeight={700}>
              {stats.totalStudents}
            </Typography>
            <Typography variant="body1">
              Total Students
            </Typography>
          </MetricCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard sx={{ background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)' }}>
            <Typography variant="h3" fontWeight={700}>
              {stats.averageAttendance}%
            </Typography>
            <Typography variant="body1">
              Average Attendance
            </Typography>
          </MetricCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard sx={{ background: 'linear-gradient(135deg, #ff9800 0%, #ef6c00 100%)' }}>
            <Typography variant="h3" fontWeight={700}>
              {stats.punctualityRate}%
            </Typography>
            <Typography variant="body1">
              Punctuality Rate
            </Typography>
          </MetricCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard sx={{ background: 'linear-gradient(135deg, #2196f3 0%, #1565c0 100%)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              {stats.improvementTrend === 'improving' ? 
                <TrendingUpIcon /> : <TrendingDownIcon />
              }
              <Typography variant="h6" fontWeight={600} textTransform="capitalize">
                {stats.improvementTrend}
              </Typography>
            </Box>
            <Typography variant="body1">
              Trend
            </Typography>
          </MetricCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Monthly Attendance Trend */}
        <Grid item xs={12} lg={8}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Monthly Attendance Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyAttendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="attendance" 
                    stackId="1" 
                    stroke="#2196f3" 
                    fill="#2196f3" 
                    fillOpacity={0.3}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#f44336" 
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Attendance Distribution */}
        <Grid item xs={12} lg={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Attendance Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={attendanceDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {attendanceDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Course Performance */}
        <Grid item xs={12} lg={8}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Course Attendance Performance
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={courseAttendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="course" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="attendance" fill="#4caf50" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Top Performers */}
        <Grid item xs={12} lg={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Top Performers
              </Typography>
              <List>
                {topPerformers.map((student, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar src={student.avatar}>
                        {student.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={student.name}
                      secondary={student.course}
                    />
                    <Chip
                      label={`${student.attendance}%`}
                      color="success"
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Daily Attendance Pattern */}
        <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Daily Attendance Patterns
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" stackId="a" fill="#4caf50" />
                  <Bar dataKey="late" stackId="a" fill="#ff9800" />
                  <Bar dataKey="absent" stackId="a" fill="#f44336" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Attendance Concerns */}
        {attendanceConcerns.length > 0 && (
          <Grid item xs={12}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WarningIcon color="error" sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    Attendance Concerns
                  </Typography>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Student</TableCell>
                        <TableCell>Course</TableCell>
                        <TableCell>Consecutive Absences</TableCell>
                        <TableCell>Attendance Rate</TableCell>
                        <TableCell>Severity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {attendanceConcerns.map((concern, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <PersonIcon />
                              {concern.name}
                            </Box>
                          </TableCell>
                          <TableCell>{concern.course}</TableCell>
                          <TableCell>{concern.consecutiveAbsences}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={concern.attendance}
                                sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                                color={concern.attendance >= 75 ? 'success' : 'error'}
                              />
                              <Typography variant="body2">
                                {concern.attendance}%
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={concern.severity}
                              color={concern.severity === 'high' ? 'error' : 'warning'}
                              size="small"
                              sx={{ textTransform: 'capitalize' }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </StyledCard>
          </Grid>
        )}
      </Grid>
    </>
  );
}
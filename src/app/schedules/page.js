"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  Grid,
  Alert,
  Skeleton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  CalendarToday as CalendarIcon,
  List as ListIcon,
  AccessTime as AccessTimeIcon,
  School as SchoolIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import courseService from '@/services/course.service';
import courseScheduleService from '@/services/course-schedule.service';
import teacherService from '@/services/teacher.service';
import ScheduleCalendarView from '@/components/Dashboard/CourseSchedule/ScheduleCalendarView';
import ScheduleListView from '@/components/Dashboard/CourseSchedule/ScheduleListView';
import TimeSlotManager from '@/components/Dashboard/CourseSchedule/TimeSlotManager';

function SchedulesPage() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [scheduleStats, setScheduleStats] = useState({});
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch all necessary data
      const [
        coursesResponse,
        teachersResponse,
        timeSlotsResponse,
        statsResponse
      ] = await Promise.all([
        courseService.getAll(),
        teacherService.getAll(),
        courseScheduleService.getAllTimeSlots(),
        courseScheduleService.getScheduleStats()
      ]);

      setCourses(coursesResponse.data || []);
      setTeachers(teachersResponse.data || []);
      setTimeSlots(timeSlotsResponse.data || []);
      setScheduleStats(statsResponse.data || {});
    } catch (error) {
      console.error('Error fetching schedules data:', error);
      setError('Failed to load schedules data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleScheduleUpdate = () => {
    // Refresh data when schedules are updated
    fetchData();
  };

  const renderHeader = () => (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ScheduleIcon />
            Course Schedules
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage course schedules, time slots, and teacher assignments
          </Typography>
        </Box>

        {/* Quick Filters */}
        <Box sx={{ display: 'flex', gap: 2, minWidth: 300 }}>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Course</InputLabel>
            <Select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              label="Course"
            >
              <MenuItem value="">All Courses</MenuItem>
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Teacher</InputLabel>
            <Select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              label="Teacher"
            >
              <MenuItem value="">All Teachers</MenuItem>
              {teachers.map((teacher) => (
                <MenuItem key={teacher.id} value={teacher.id}>
                  {teacher.firstName} {teacher.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Statistics Dashboard */}
      {!loading && scheduleStats && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h4" color="primary">
                  {scheduleStats.totalSchedules || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Schedules
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h4" color="success.main">
                  {scheduleStats.activeSchedules || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Schedules
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h4" color="info.main">
                  {scheduleStats.totalSessions || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Scheduled Sessions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h4" color="warning.main">
                  {scheduleStats.upcomingSessions || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upcoming Sessions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );

  const renderTabs = () => (
    <Card sx={{ mb: 3 }}>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab 
          icon={<CalendarIcon />} 
          label="Calendar View" 
          iconPosition="start"
        />
        <Tab 
          icon={<ListIcon />} 
          label="List View" 
          iconPosition="start"
        />
        <Tab 
          icon={<AccessTimeIcon />} 
          label="Time Slots" 
          iconPosition="start"
        />
        <Tab 
          icon={<DashboardIcon />} 
          label="Analytics" 
          iconPosition="start"
        />
      </Tabs>
    </Card>
  );

  const renderAnalytics = () => (
    <Grid container spacing={3}>
      {/* Schedules by Course */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <SchoolIcon />
              Schedules by Course
            </Typography>
            {courses.length > 0 ? (
              courses.slice(0, 5).map((course) => (
                <Box key={course.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                  <Typography variant="body2">{course.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {scheduleStats.schedulesByCourse?.[course.id] || 0} schedules
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">No courses available</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Teacher Workload */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <ScheduleIcon />
              Teacher Workload
            </Typography>
            {teachers.length > 0 ? (
              teachers.slice(0, 5).map((teacher) => (
                <Box key={teacher.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                  <Typography variant="body2">
                    {teacher.firstName} {teacher.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {scheduleStats.schedulesByTeacher?.[teacher.id] || 0} schedules
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">No teachers available</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Time Slot Usage */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeIcon />
              Popular Time Slots
            </Typography>
            {timeSlots.length > 0 ? (
              timeSlots.slice(0, 5).map((slot) => (
                <Box key={slot.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                  <Typography variant="body2">
                    {slot.name} ({slot.startTime} - {slot.endTime})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {scheduleStats.timeSlotUsage?.[slot.id] || 0} uses
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">No time slots configured</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Quick Actions */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button variant="outlined" fullWidth onClick={() => setCurrentTab(2)}>
                Manage Time Slots
              </Button>
              <Button variant="outlined" fullWidth onClick={() => setCurrentTab(1)}>
                View All Schedules
              </Button>
              <Button variant="outlined" fullWidth onClick={() => setCurrentTab(0)}>
                Calendar Overview
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <Card>
          <CardContent>
            <Skeleton variant="rectangular" height={400} />
          </CardContent>
        </Card>
      );
    }

    if (error) {
      return (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
          <Button onClick={fetchData} sx={{ ml: 2 }}>
            Retry
          </Button>
        </Alert>
      );
    }

    switch (currentTab) {
      case 0: // Calendar View
        return (
          <ScheduleCalendarView
            courses={courses}
            teachers={teachers}
            timeSlots={timeSlots}
            onScheduleUpdate={handleScheduleUpdate}
          />
        );
      
      case 1: // List View
        return (
          <ScheduleListView
            courses={courses}
            teachers={teachers}
            timeSlots={timeSlots}
            onScheduleUpdate={handleScheduleUpdate}
          />
        );
      
      case 2: // Time Slots
        return (
          <TimeSlotManager
            onTimeSlotsUpdate={() => {
              // Refresh time slots when they are updated
              courseScheduleService.getAllTimeSlots().then(response => {
                setTimeSlots(response.data || []);
              });
            }}
          />
        );
      
      case 3: // Analytics
        return renderAnalytics();
      
      default:
        return null;
    }
  };

  return (
    <Box>
      {renderHeader()}
      {renderTabs()}
      {renderContent()}
    </Box>
  );
}

export default SchedulesPage;
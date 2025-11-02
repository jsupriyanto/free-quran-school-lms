"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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
  Breadcrumbs,
  Link
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  CalendarToday as CalendarIcon,
  List as ListIcon,
  AccessTime as AccessTimeIcon,
  School as SchoolIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import courseService from '@/services/course.service';
import courseScheduleService from '@/services/course-schedule.service';
import teacherService from '@/services/teacher.service';
import ScheduleCalendarView from '@/components/Dashboard/CourseSchedule/ScheduleCalendarView';
import ScheduleListView from '@/components/Dashboard/CourseSchedule/ScheduleListView';
import TimeSlotManager from '@/components/Dashboard/CourseSchedule/TimeSlotManager';

function CourseSchedulePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id;

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (courseId) {
      fetchData();
    }
  }, [courseId]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch course, teachers, time slots, and schedules in parallel
      const [
        courseResponse,
        teachersResponse,
        timeSlotsResponse,
        schedulesResponse
      ] = await Promise.all([
        courseService.get(courseId),
        teacherService.getAll(),
        courseScheduleService.getAllTimeSlots(),
        courseScheduleService.getSchedulesByCourse(courseId)
      ]);

      setCourse(courseResponse.data);
      setTeachers(teachersResponse.data || []);
      setTimeSlots(timeSlotsResponse.data || []);
      setSchedules(schedulesResponse.data || []);
    } catch (error) {
      console.error('Error fetching course schedule data:', error);
      setError('Failed to load course schedule data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleScheduleUpdate = () => {
    // Refresh schedules when they are updated
    fetchData();
  };

  const renderBreadcrumbs = () => (
    <Breadcrumbs sx={{ mb: 3 }}>
      <Link 
        color="inherit" 
        href="/courses" 
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
      >
        <SchoolIcon fontSize="small" />
        Courses
      </Link>
      <Link 
        color="inherit" 
        href={`/courses/${courseId}`}
        underline="hover"
      >
        {course?.title || 'Course'}
      </Link>
      <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <ScheduleIcon fontSize="small" />
        Schedules
      </Typography>
    </Breadcrumbs>
  );

  const renderHeader = () => (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push(`/courses/${courseId}`)}
          variant="outlined"
          size="small"
        >
          Back to Course
        </Button>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ScheduleIcon />
            Course Schedules
          </Typography>
          {course && (
            <Typography variant="h6" color="text.secondary">
              {course.title}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Course Statistics */}
      {!loading && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h4" color="primary">
                  {schedules.length}
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
                  {schedules.filter(s => s.status === 'active').length}
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
                  {schedules.reduce((total, s) => total + (s.generatedSessions || 0), 0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Generated Sessions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h4" color="warning.main">
                  {new Set(schedules.flatMap(s => s.teachers?.map(t => t.id) || [])).size}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Assigned Teachers
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
      </Tabs>
    </Card>
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
            courseId={courseId}
            courses={course ? [course] : []}
            teachers={teachers}
            timeSlots={timeSlots}
            onScheduleUpdate={handleScheduleUpdate}
          />
        );
      
      case 1: // List View
        return (
          <ScheduleListView
            courseId={courseId}
            courses={course ? [course] : []}
            teachers={teachers}
            timeSlots={timeSlots}
            onScheduleUpdate={handleScheduleUpdate}
            showCourseColumn={false} // Don't show course column since we're viewing a specific course
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
      
      default:
        return null;
    }
  };

  return (
    <Box>
      {renderBreadcrumbs()}
      {renderHeader()}
      {renderTabs()}
      {renderContent()}
    </Box>
  );
}

export default CourseSchedulePage;
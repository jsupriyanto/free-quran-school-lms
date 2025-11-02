import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Alert,
  Skeleton
} from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EventIcon from '@mui/icons-material/Event';
import courseScheduleService from '@/services/course-schedule.service';
import eventService from '@/services/event.service';
import CreateScheduleDialog from './CreateScheduleDialog';

function ScheduleCalendarView({ 
  courseId = null, 
  teacherId = null,
  courses = [],
  teachers = [],
  timeSlots = [],
  onScheduleUpdate,
  viewMode = 'month' // 'month', 'week', 'day'
}) {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
  const [createScheduleOpen, setCreateScheduleOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [filters, setFilters] = useState({
    teacherId: teacherId || '',
    courseId: courseId || '',
    status: 'all',
    showCancelled: false
  });
  const [dateRange, setDateRange] = useState({
    start: dayjs().startOf('month'),
    end: dayjs().endOf('month')
  });

  // Calendar ref for methods
  const calendarRef = React.useRef(null);

  useEffect(() => {
    fetchEvents();
  }, [dateRange, filters, courseId, teacherId]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await eventService.getCalendarEvents(
        dateRange.start.toISOString(),
        dateRange.end.toISOString(),
        {
          ...filters,
          courseId: courseId || filters.courseId,
          teacherId: teacherId || filters.teacherId
        }
      );
      
      setEvents(response.combined || []);
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDateClick = (arg) => {
    // Open create schedule dialog with the clicked date
    setCreateScheduleOpen(true);
  };

  const handleEventClick = (clickInfo) => {
    const { extendedProps } = clickInfo.event;
    setSelectedEvent({
      ...clickInfo.event,
      ...extendedProps
    });
    setEventDetailsOpen(true);
  };

  const handleEventDrop = async (dropInfo) => {
    try {
      const { event, delta } = dropInfo;
      const { extendedProps } = event;
      
      if (extendedProps.type === 'session') {
        const newDateTime = dayjs(event.start).add(delta.milliseconds, 'millisecond');
        await courseScheduleService.rescheduleSession(
          extendedProps.session.id,
          newDateTime.toISOString()
        );
        
        fetchEvents(); // Refresh calendar
        onScheduleUpdate && onScheduleUpdate();
      }
    } catch (error) {
      console.error('Error rescheduling event:', error);
      dropInfo.revert(); // Revert the move
    }
  };

  const handleEventResize = async (resizeInfo) => {
    try {
      const { event, endDelta } = resizeInfo;
      const { extendedProps } = event;
      
      if (extendedProps.type === 'session') {
        const newEndTime = dayjs(event.end).add(endDelta.milliseconds, 'millisecond');
        await courseScheduleService.updateScheduledSession(
          extendedProps.session.id,
          {
            endTime: newEndTime.toISOString()
          }
        );
        
        fetchEvents(); // Refresh calendar
        onScheduleUpdate && onScheduleUpdate();
      }
    } catch (error) {
      console.error('Error resizing event:', error);
      resizeInfo.revert(); // Revert the resize
    }
  };

  const handleContextMenu = (e, event) => {
    e.preventDefault();
    setContextMenu({
      mouseX: e.clientX + 2,
      mouseY: e.clientY - 6,
      event
    });
  };

  const handleEditEvent = () => {
    if (contextMenu?.event?.extendedProps?.type === 'session') {
      setEditingSchedule(contextMenu.event.extendedProps.session);
      setCreateScheduleOpen(true);
    }
    setContextMenu(null);
  };

  const handleCancelEvent = async () => {
    if (contextMenu?.event?.extendedProps?.type === 'session') {
      try {
        await courseScheduleService.cancelScheduledSession(
          contextMenu.event.extendedProps.session.id,
          'Cancelled by user'
        );
        fetchEvents();
        onScheduleUpdate && onScheduleUpdate();
      } catch (error) {
        console.error('Error cancelling event:', error);
      }
    }
    setContextMenu(null);
  };

  const handleDeleteEvent = async () => {
    if (contextMenu?.event?.extendedProps?.type === 'session') {
      try {
        await courseScheduleService.deleteSchedule(
          contextMenu.event.extendedProps.session.scheduleId
        );
        fetchEvents();
        onScheduleUpdate && onScheduleUpdate();
      } catch (error) {
        console.error('Error deleting schedule:', error);
      }
    }
    setContextMenu(null);
  };

  const handleViewChange = (view) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(view);
    }
  };

  const handleDatesSet = (dateInfo) => {
    setDateRange({
      start: dayjs(dateInfo.start),
      end: dayjs(dateInfo.end)
    });
  };

  const eventContent = (eventInfo) => {
    const { event } = eventInfo;
    const { extendedProps } = event;
    
    return (
      <Box
        sx={{
          p: 0.5,
          height: '100%',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
        onContextMenu={(e) => handleContextMenu(e, event)}
      >
        <Typography 
          variant="caption" 
          sx={{ 
            fontWeight: 'bold',
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {event.title}
        </Typography>
        
        {extendedProps.teacher && (
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'block',
              opacity: 0.8,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {extendedProps.teacher.firstName} {extendedProps.teacher.lastName}
          </Typography>
        )}
        
        {extendedProps.session?.status === 'cancelled' && (
          <Chip 
            label="Cancelled" 
            size="small" 
            color="error" 
            sx={{ mt: 0.5, height: 16, fontSize: '0.6rem' }}
          />
        )}
      </Box>
    );
  };

  const renderFilterBar = () => (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setCreateScheduleOpen(true)}
      >
        Create Schedule
      </Button>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Course</InputLabel>
        <Select
          value={filters.courseId}
          onChange={(e) => setFilters({ ...filters, courseId: e.target.value })}
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

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Teacher</InputLabel>
        <Select
          value={filters.teacherId}
          onChange={(e) => setFilters({ ...filters, teacherId: e.target.value })}
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

      <FormControl size="small" sx={{ minWidth: 100 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          label="Status"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          size="small"
          variant={calendarRef.current?.getApi()?.view.type === 'dayGridMonth' ? 'contained' : 'outlined'}
          onClick={() => handleViewChange('dayGridMonth')}
        >
          Month
        </Button>
        <Button
          size="small"
          variant={calendarRef.current?.getApi()?.view.type === 'timeGridWeek' ? 'contained' : 'outlined'}
          onClick={() => handleViewChange('timeGridWeek')}
        >
          Week
        </Button>
        <Button
          size="small"
          variant={calendarRef.current?.getApi()?.view.type === 'timeGridDay' ? 'contained' : 'outlined'}
          onClick={() => handleViewChange('timeGridDay')}
        >
          Day
        </Button>
      </Box>
    </Box>
  );

  const renderEventDetails = () => {
    if (!selectedEvent) return null;
    
    const { extendedProps } = selectedEvent;
    const isSession = extendedProps?.type === 'session';
    const data = isSession ? extendedProps.session : extendedProps.course;
    
    return (
      <Dialog open={eventDetailsOpen} onClose={() => setEventDetailsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isSession ? <EventIcon /> : <SchoolIcon />}
          {selectedEvent.title}
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <AccessTimeIcon fontSize="small" />
                <Typography variant="body2">
                  {dayjs(selectedEvent.start).format('MMMM D, YYYY [at] h:mm A')}
                  {selectedEvent.end && ` - ${dayjs(selectedEvent.end).format('h:mm A')}`}
                </Typography>
              </Box>
            </Grid>

            {extendedProps?.teacher && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <PersonIcon fontSize="small" />
                  <Typography variant="body2">
                    {extendedProps.teacher.firstName} {extendedProps.teacher.lastName}
                  </Typography>
                </Box>
              </Grid>
            )}

            {extendedProps?.course && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <SchoolIcon fontSize="small" />
                  <Typography variant="body2">
                    {extendedProps.course.title}
                  </Typography>
                </Box>
              </Grid>
            )}

            {data?.description && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  {data.description}
                </Typography>
              </Grid>
            )}

            {isSession && data?.status && (
              <Grid item xs={12}>
                <Chip 
                  label={data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                  color={data.status === 'cancelled' ? 'error' : data.status === 'completed' ? 'success' : 'primary'}
                  size="small"
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setEventDetailsOpen(false)}>
            Close
          </Button>
          {isSession && (
            <>
              <Button 
                startIcon={<EditIcon />}
                onClick={() => {
                  setEditingSchedule(data);
                  setCreateScheduleOpen(true);
                  setEventDetailsOpen(false);
                }}
              >
                Edit
              </Button>
              {data?.status !== 'cancelled' && (
                <Button 
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={async () => {
                    try {
                      await courseScheduleService.cancelScheduledSession(data.id, 'Cancelled by user');
                      fetchEvents();
                      onScheduleUpdate && onScheduleUpdate();
                      setEventDetailsOpen(false);
                    } catch (error) {
                      console.error('Error cancelling session:', error);
                    }
                  }}
                >
                  Cancel
                </Button>
              )}
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Skeleton variant="rectangular" height={600} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Box>
      {renderFilterBar()}
      
      <Card>
        <CardContent sx={{ p: 1 }}>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={viewMode === 'week' ? 'timeGridWeek' : viewMode === 'day' ? 'timeGridDay' : 'dayGridMonth'}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={events}
            eventContent={eventContent}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
            datesSet={handleDatesSet}
            editable={true}
            droppable={true}
            height="auto"
            dayMaxEvents={3}
            moreLinkClick="popover"
            eventDisplay="block"
            displayEventTime={true}
            allDaySlot={false}
            slotMinTime="06:00:00"
            slotMaxTime="22:00:00"
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
              startTime: '08:00',
              endTime: '20:00',
            }}
          />
        </CardContent>
      </Card>

      {/* Context Menu */}
      <Menu
        open={contextMenu !== null}
        onClose={() => setContextMenu(null)}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleEditEvent}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleCancelEvent}>
          <CancelIcon fontSize="small" sx={{ mr: 1 }} />
          Cancel Session
        </MenuItem>
        <MenuItem onClick={handleDeleteEvent} sx={{ color: 'error.main' }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete Schedule
        </MenuItem>
      </Menu>

      {/* Event Details Dialog */}
      {renderEventDetails()}

      {/* Create/Edit Schedule Dialog */}
      <CreateScheduleDialog
        open={createScheduleOpen}
        onClose={() => {
          setCreateScheduleOpen(false);
          setEditingSchedule(null);
        }}
        courseId={courseId}
        teachers={teachers}
        timeSlots={timeSlots}
        editingSchedule={editingSchedule}
        onScheduleCreated={() => {
          fetchEvents();
          onScheduleUpdate && onScheduleUpdate();
        }}
      />
    </Box>
  );
}

export default ScheduleCalendarView;
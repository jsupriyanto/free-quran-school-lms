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
  TablePagination,
  Button,
  IconButton,
  Chip,
  Avatar,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Skeleton
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  AccessTime as AccessTimeIcon,
  Event as EventIcon,
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
  CalendarToday as CalendarTodayIcon,
  Repeat as RepeatIcon
} from '@mui/icons-material';
import dayjs from 'dayjs';
import courseScheduleService from '@/services/course-schedule.service';
import CreateScheduleDialog from './CreateScheduleDialog';

const STATUS_COLORS = {
  active: 'success',
  inactive: 'default',
  cancelled: 'error',
  completed: 'info'
};

const RECURRENCE_LABELS = {
  none: 'One-time',
  daily: 'Daily',
  weekly: 'Weekly',
  biweekly: 'Bi-weekly',
  monthly: 'Monthly',
  custom: 'Custom'
};

function ScheduleListView({
  courseId = null,
  teacherId = null,
  courses = [],
  teachers = [],
  timeSlots = [],
  onScheduleUpdate,
  showCourseColumn = true,
  showTeacherColumn = true
}) {
  const [loading, setLoading] = useState(true);
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    courseId: courseId || '',
    teacherId: teacherId || '',
    status: '',
    recurrencePattern: ''
  });
  
  const [createScheduleOpen, setCreateScheduleOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    fetchSchedules();
  }, [courseId, teacherId]);

  useEffect(() => {
    applyFilters();
  }, [schedules, searchTerm, filters]);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      let response;
      if (courseId) {
        response = await courseScheduleService.getSchedulesByCourse(courseId);
      } else if (teacherId) {
        response = await courseScheduleService.getSchedulesByTeacher(teacherId);
      } else {
        response = await courseScheduleService.getAllSchedules();
      }
      
      setSchedules(response.data || []);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = schedules.filter(schedule => {
      // Search filter
      const searchMatch = !searchTerm || 
        schedule.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.course?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.teachers?.some(t => 
          `${t.firstName} ${t.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Course filter
      const courseMatch = !filters.courseId || schedule.courseId === parseInt(filters.courseId);
      
      // Teacher filter
      const teacherMatch = !filters.teacherId || 
        schedule.teachers?.some(t => t.id === parseInt(filters.teacherId));
      
      // Status filter
      const statusMatch = !filters.status || schedule.status === filters.status;
      
      // Recurrence filter
      const recurrenceMatch = !filters.recurrencePattern || 
        schedule.recurrencePattern === filters.recurrencePattern;

      return searchMatch && courseMatch && teacherMatch && statusMatch && recurrenceMatch;
    });

    setFilteredSchedules(filtered);
    setPage(0); // Reset to first page when filtering
  };

  const handleActionMenuClick = (event, schedule) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedSchedule(schedule);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setSelectedSchedule(null);
  };

  const handleEditSchedule = () => {
    setEditingSchedule(selectedSchedule);
    setCreateScheduleOpen(true);
    handleActionMenuClose();
  };

  const handleDeleteSchedule = () => {
    setScheduleToDelete(selectedSchedule);
    setDeleteDialogOpen(true);
    handleActionMenuClose();
  };

  const confirmDeleteSchedule = async () => {
    if (!scheduleToDelete) return;

    try {
      await courseScheduleService.deleteSchedule(scheduleToDelete.id);
      await fetchSchedules();
      onScheduleUpdate && onScheduleUpdate();
      setDeleteDialogOpen(false);
      setScheduleToDelete(null);
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const handleGenerateSessions = async () => {
    if (!selectedSchedule) return;

    try {
      await courseScheduleService.generateSessions(selectedSchedule.id);
      await fetchSchedules();
      onScheduleUpdate && onScheduleUpdate();
      handleActionMenuClose();
    } catch (error) {
      console.error('Error generating sessions:', error);
    }
  };

  const handleToggleStatus = async (schedule) => {
    try {
      const newStatus = schedule.status === 'active' ? 'inactive' : 'active';
      await courseScheduleService.updateSchedule(schedule.id, { status: newStatus });
      await fetchSchedules();
      onScheduleUpdate && onScheduleUpdate();
    } catch (error) {
      console.error('Error updating schedule status:', error);
    }
  };

  const renderScheduleRow = (schedule) => {
    const primaryTeacher = schedule.teachers?.find(t => t.id === schedule.primaryTeacherId) || 
                          schedule.teachers?.[0];
    const otherTeachers = schedule.teachers?.filter(t => t.id !== primaryTeacher?.id) || [];

    return (
      <TableRow key={schedule.id} hover>
        {showCourseColumn && (
          <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SchoolIcon color="primary" fontSize="small" />
              <Typography variant="body2" fontWeight="medium">
                {schedule.course?.title || 'N/A'}
              </Typography>
            </Box>
          </TableCell>
        )}

        <TableCell>
          <Box>
            <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
              {schedule.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeIcon fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                {schedule.startTime} - {schedule.endTime}
              </Typography>
            </Box>
          </Box>
        </TableCell>

        {showTeacherColumn && (
          <TableCell>
            <Box>
              {primaryTeacher && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Avatar sx={{ width: 24, height: 24 }}>
                    {primaryTeacher.firstName?.[0]}{primaryTeacher.lastName?.[0]}
                  </Avatar>
                  <Typography variant="body2">
                    {primaryTeacher.firstName} {primaryTeacher.lastName}
                  </Typography>
                  <Chip label="Primary" size="small" variant="outlined" />
                </Box>
              )}
              {otherTeachers.length > 0 && (
                <Typography variant="caption" color="text.secondary">
                  +{otherTeachers.length} other{otherTeachers.length > 1 ? 's' : ''}
                </Typography>
              )}
            </Box>
          </TableCell>
        )}

        <TableCell>
          <Box>
            <Typography variant="body2">
              {dayjs(schedule.startDate).format('MMM D, YYYY')}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              to {dayjs(schedule.endDate).format('MMM D, YYYY')}
            </Typography>
          </Box>
        </TableCell>

        <TableCell>
          <Chip 
            label={RECURRENCE_LABELS[schedule.recurrencePattern] || 'One-time'}
            size="small"
            variant="outlined"
            icon={schedule.isRecurring ? <RepeatIcon /> : <EventIcon />}
          />
        </TableCell>

        <TableCell>
          <Chip 
            label={schedule.status?.charAt(0).toUpperCase() + schedule.status?.slice(1)}
            size="small"
            color={STATUS_COLORS[schedule.status]}
            clickable
            onClick={() => handleToggleStatus(schedule)}
          />
        </TableCell>

        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2">
              {schedule.generatedSessions || 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              / {schedule.expectedSessions || 0}
            </Typography>
          </Box>
        </TableCell>

        <TableCell>
          <IconButton
            size="small"
            onClick={(e) => handleActionMenuClick(e, schedule)}
          >
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  const renderFilterBar = () => (
    <Grid container spacing={2} sx={{ mb: 3 }} alignItems="center">
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search schedules..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      {showCourseColumn && (
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
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
        </Grid>
      )}

      {showTeacherColumn && (
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
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
        </Grid>
      )}

      <Grid item xs={12} sm={6} md={2}>
        <FormControl fullWidth size="small">
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            label="Status"
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={2}>
        <FormControl fullWidth size="small">
          <InputLabel>Recurrence</InputLabel>
          <Select
            value={filters.recurrencePattern}
            onChange={(e) => setFilters({ ...filters, recurrencePattern: e.target.value })}
            label="Recurrence"
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="none">One-time</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="biweekly">Bi-weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={1}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setCreateScheduleOpen(true)}
            size="small"
          >
            Create
          </Button>
          <IconButton size="small" onClick={fetchSchedules}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );

  if (loading) {
    return (
      <Card>
        <CardContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={60} sx={{ mb: 1 }} />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Box>
      {renderFilterBar()}

      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {showCourseColumn && (
                    <TableCell sx={{ fontWeight: 'bold' }}>Course</TableCell>
                  )}
                  <TableCell sx={{ fontWeight: 'bold' }}>Schedule Details</TableCell>
                  {showTeacherColumn && (
                    <TableCell sx={{ fontWeight: 'bold' }}>Teachers</TableCell>
                  )}
                  <TableCell sx={{ fontWeight: 'bold' }}>Date Range</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Recurrence</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Sessions</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSchedules.length > 0 ? (
                  filteredSchedules
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(renderScheduleRow)
                ) : (
                  <TableRow>
                    <TableCell colSpan={showCourseColumn && showTeacherColumn ? 8 : 7} align="center">
                      <Box sx={{ py: 3 }}>
                        <ScheduleIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                        <Typography variant="h6" color="text.secondary">
                          No schedules found
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {searchTerm || Object.values(filters).some(f => f) ? 
                            'Try adjusting your search or filters' : 
                            'Create your first schedule to get started'
                          }
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<AddIcon />}
                          onClick={() => setCreateScheduleOpen(true)}
                        >
                          Create Schedule
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredSchedules.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={filteredSchedules.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />
          )}
        </CardContent>
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
      >
        <MenuItem onClick={handleEditSchedule}>
          <EditIcon sx={{ mr: 1 }} fontSize="small" />
          Edit Schedule
        </MenuItem>
        <MenuItem onClick={handleGenerateSessions}>
          <EventIcon sx={{ mr: 1 }} fontSize="small" />
          Generate Sessions
        </MenuItem>
        <MenuItem onClick={() => {
          // View sessions for this schedule
          handleActionMenuClose();
        }}>
          <VisibilityIcon sx={{ mr: 1 }} fontSize="small" />
          View Sessions
        </MenuItem>
        <MenuItem onClick={handleDeleteSchedule} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
          Delete Schedule
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Schedule</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            This action cannot be undone. All associated sessions will also be deleted.
          </Alert>
          <Typography>
            Are you sure you want to delete the schedule "{scheduleToDelete?.title}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDeleteSchedule} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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
          fetchSchedules();
          onScheduleUpdate && onScheduleUpdate();
        }}
      />
    </Box>
  );
}

export default ScheduleListView;
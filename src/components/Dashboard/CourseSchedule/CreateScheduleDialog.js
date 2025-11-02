import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Autocomplete,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import RepeatIcon from '@mui/icons-material/Repeat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

const DAYS_OF_WEEK = [
  { value: 0, label: 'Sunday', short: 'Sun' },
  { value: 1, label: 'Monday', short: 'Mon' },
  { value: 2, label: 'Tuesday', short: 'Tue' },
  { value: 3, label: 'Wednesday', short: 'Wed' },
  { value: 4, label: 'Thursday', short: 'Thu' },
  { value: 5, label: 'Friday', short: 'Fri' },
  { value: 6, label: 'Saturday', short: 'Sat' }
];

const RECURRENCE_PATTERNS = [
  { value: 'none', label: 'No Recurrence' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'custom', label: 'Custom Pattern' }
];

function CreateScheduleDialog({ 
  open, 
  onClose, 
  courseId, 
  teachers = [], 
  timeSlots = [],
  onScheduleCreated,
  editingSchedule = null 
}) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    courseId: courseId || '',
    title: '',
    description: '',
    startDate: dayjs(),
    endDate: dayjs().add(3, 'month'),
    timeSlotId: '',
    customStartTime: dayjs().hour(9).minute(0),
    customEndTime: dayjs().hour(10).minute(30),
    useCustomTime: false,
    teacherIds: [],
    primaryTeacherId: '',
    maxStudents: 30,
    isRecurring: false,
    recurrencePattern: 'weekly',
    recurrenceDays: [1], // Default to Monday
    recurrenceInterval: 1,
    recurrenceEndDate: dayjs().add(3, 'month'),
    recurrenceCount: null,
    room: '',
    notes: '',
    isActive: true,
    allowConflicts: false
  });

  useEffect(() => {
    if (editingSchedule) {
      setFormData({
        ...formData,
        ...editingSchedule,
        startDate: dayjs(editingSchedule.startDate),
        endDate: dayjs(editingSchedule.endDate),
        customStartTime: dayjs(editingSchedule.customStartTime || editingSchedule.startTime),
        customEndTime: dayjs(editingSchedule.customEndTime || editingSchedule.endTime),
        recurrenceEndDate: dayjs(editingSchedule.recurrenceEndDate),
        teacherIds: editingSchedule.teachers?.map(t => t.id) || [],
        primaryTeacherId: editingSchedule.primaryTeacherId || editingSchedule.teachers?.[0]?.id || ''
      });
    }
  }, [editingSchedule]);

  useEffect(() => {
    if (formData.customStartTime && formData.customEndTime) {
      checkTeacherAvailability();
    }
  }, [formData.customStartTime, formData.customEndTime, formData.recurrenceDays, formData.startDate]);

  const checkTeacherAvailability = async () => {
    if (!formData.customStartTime || !formData.customEndTime) return;

    setCheckingAvailability(true);
    try {
      // This would call your API to check teacher availability
      // For now, we'll simulate this
      setTimeout(() => {
        setAvailableTeachers(teachers.filter(teacher => 
          // Simulate availability check
          Math.random() > 0.3
        ));
        setCheckingAvailability(false);
      }, 1000);
    } catch (error) {
      console.error('Error checking availability:', error);
      setAvailableTeachers(teachers);
      setCheckingAvailability(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});

    try {
      // Validate form
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setLoading(false);
        return;
      }

      // Prepare schedule data
      const scheduleData = {
        ...formData,
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString(),
        startTime: formData.useCustomTime ? 
          formData.customStartTime.format('HH:mm') : 
          timeSlots.find(ts => ts.id === formData.timeSlotId)?.startTime,
        endTime: formData.useCustomTime ? 
          formData.customEndTime.format('HH:mm') : 
          timeSlots.find(ts => ts.id === formData.timeSlotId)?.endTime,
        recurrenceEndDate: formData.isRecurring ? formData.recurrenceEndDate.toISOString() : null
      };

      if (editingSchedule) {
        await courseScheduleService.updateSchedule(editingSchedule.id, scheduleData);
      } else {
        await courseScheduleService.createSchedule(scheduleData);
      }

      onScheduleCreated && onScheduleCreated();
      onClose();
    } catch (error) {
      console.error('Error saving schedule:', error);
      setErrors({ general: error.response?.data?.message || 'Failed to save schedule' });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }

    if (!formData.useCustomTime && !formData.timeSlotId) {
      errors.timeSlotId = 'Please select a time slot or use custom time';
    }

    if (formData.useCustomTime) {
      if (!formData.customStartTime) {
        errors.customStartTime = 'Start time is required';
      }
      if (!formData.customEndTime) {
        errors.customEndTime = 'End time is required';
      }
      if (formData.customStartTime && formData.customEndTime && 
          formData.customStartTime.isAfter(formData.customEndTime)) {
        errors.customEndTime = 'End time must be after start time';
      }
    }

    if (formData.teacherIds.length === 0) {
      errors.teacherIds = 'At least one teacher is required';
    }

    if (formData.isRecurring && formData.recurrenceDays.length === 0) {
      errors.recurrenceDays = 'Select at least one day for recurring schedule';
    }

    if (formData.endDate.isBefore(formData.startDate)) {
      errors.endDate = 'End date must be after start date';
    }

    return errors;
  };

  const handleTeacherChange = (event, newValue) => {
    const teacherIds = newValue.map(teacher => teacher.id);
    setFormData({
      ...formData,
      teacherIds,
      primaryTeacherId: teacherIds.includes(formData.primaryTeacherId) ? 
        formData.primaryTeacherId : teacherIds[0] || ''
    });
  };

  const handleRecurrenceDaysChange = (dayValue) => {
    const newDays = formData.recurrenceDays.includes(dayValue)
      ? formData.recurrenceDays.filter(d => d !== dayValue)
      : [...formData.recurrenceDays, dayValue];
    
    setFormData({ ...formData, recurrenceDays: newDays });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {editingSchedule ? <RepeatIcon /> : <AddIcon />}
          {editingSchedule ? 'Edit Schedule' : 'Create New Schedule'}
        </Box>
      </DialogTitle>
      
      <DialogContent>
        {errors.general && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.general}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeIcon />
              Schedule Information
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Schedule Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              error={!!errors.title}
              helperText={errors.title}
              placeholder="e.g., Advanced Tajweed - Morning Class"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Room/Location"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              placeholder="e.g., Room A-101 or Online"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the schedule or session content"
            />
          </Grid>

          {/* Date Range */}
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Start Date"
              value={formData.startDate}
              onChange={(newValue) => setFormData({ ...formData, startDate: newValue })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              label="End Date"
              value={formData.endDate}
              onChange={(newValue) => setFormData({ ...formData, endDate: newValue })}
              renderInput={(params) => <TextField {...params} fullWidth error={!!errors.endDate} helperText={errors.endDate} />}
            />
          </Grid>

          {/* Time Configuration */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Time Configuration
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.useCustomTime}
                  onChange={(e) => setFormData({ ...formData, useCustomTime: e.target.checked })}
                />
              }
              label="Use custom time instead of predefined time slots"
            />
          </Grid>

          {!formData.useCustomTime ? (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.timeSlotId}>
                <InputLabel>Time Slot</InputLabel>
                <Select
                  value={formData.timeSlotId}
                  onChange={(e) => setFormData({ ...formData, timeSlotId: e.target.value })}
                  label="Time Slot"
                >
                  {timeSlots.map((slot) => (
                    <MenuItem key={slot.id} value={slot.id}>
                      {slot.name} ({slot.startTime} - {slot.endTime})
                    </MenuItem>
                  ))}
                </Select>
                {errors.timeSlotId && <Typography variant="caption" color="error">{errors.timeSlotId}</Typography>}
              </FormControl>
            </Grid>
          ) : (
            <>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="Start Time"
                  value={formData.customStartTime}
                  onChange={(newValue) => setFormData({ ...formData, customStartTime: newValue })}
                  renderInput={(params) => <TextField {...params} fullWidth error={!!errors.customStartTime} helperText={errors.customStartTime} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="End Time"
                  value={formData.customEndTime}
                  onChange={(newValue) => setFormData({ ...formData, customEndTime: newValue })}
                  renderInput={(params) => <TextField {...params} fullWidth error={!!errors.customEndTime} helperText={errors.customEndTime} />}
                />
              </Grid>
            </>
          )}

          {/* Teacher Assignment */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon />
              Teacher Assignment
              {checkingAvailability && <CircularProgress size={16} />}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Autocomplete
              multiple
              options={availableTeachers.length > 0 ? availableTeachers : teachers}
              getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
              value={teachers.filter(t => formData.teacherIds.includes(t.id))}
              onChange={handleTeacherChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Teachers"
                  error={!!errors.teacherIds}
                  helperText={errors.teacherIds || (checkingAvailability ? "Checking availability..." : `${availableTeachers.length} teachers available for this time`)}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={`${option.firstName} ${option.lastName}`}
                    {...getTagProps({ index })}
                  />
                ))
              }
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Primary Teacher</InputLabel>
              <Select
                value={formData.primaryTeacherId}
                onChange={(e) => setFormData({ ...formData, primaryTeacherId: e.target.value })}
                label="Primary Teacher"
              >
                {teachers.filter(t => formData.teacherIds.includes(t.id)).map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    {teacher.firstName} {teacher.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Recurrence Settings */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isRecurring}
                  onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                />
              }
              label={
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <RepeatIcon />
                  Recurring Schedule
                </Typography>
              }
            />
          </Grid>

          {formData.isRecurring && (
            <>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Recurrence Pattern</InputLabel>
                  <Select
                    value={formData.recurrencePattern}
                    onChange={(e) => setFormData({ ...formData, recurrencePattern: e.target.value })}
                    label="Recurrence Pattern"
                  >
                    {RECURRENCE_PATTERNS.map((pattern) => (
                      <MenuItem key={pattern.value} value={pattern.value}>
                        {pattern.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Repeat Every"
                  value={formData.recurrenceInterval}
                  onChange={(e) => setFormData({ ...formData, recurrenceInterval: parseInt(e.target.value) })}
                  inputProps={{ min: 1, max: 12 }}
                  helperText={`Every ${formData.recurrenceInterval} ${formData.recurrencePattern === 'weekly' ? 'week(s)' : formData.recurrencePattern === 'monthly' ? 'month(s)' : 'day(s)'}`}
                />
              </Grid>

              {(formData.recurrencePattern === 'weekly' || formData.recurrencePattern === 'biweekly') && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Days of the Week {errors.recurrenceDays && <Typography component="span" color="error" variant="caption">({errors.recurrenceDays})</Typography>}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {DAYS_OF_WEEK.map((day) => (
                      <Chip
                        key={day.value}
                        label={day.short}
                        variant={formData.recurrenceDays.includes(day.value) ? "filled" : "outlined"}
                        color={formData.recurrenceDays.includes(day.value) ? "primary" : "default"}
                        onClick={() => handleRecurrenceDaysChange(day.value)}
                        clickable
                      />
                    ))}
                  </Box>
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Recurrence End Date"
                  value={formData.recurrenceEndDate}
                  onChange={(newValue) => setFormData({ ...formData, recurrenceEndDate: newValue })}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Max Occurrences (Optional)"
                  value={formData.recurrenceCount || ''}
                  onChange={(e) => setFormData({ ...formData, recurrenceCount: e.target.value ? parseInt(e.target.value) : null })}
                  inputProps={{ min: 1, max: 365 }}
                  helperText="Leave empty for no limit"
                />
              </Grid>
            </>
          )}

          {/* Additional Settings */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Additional Settings
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Maximum Students"
              value={formData.maxStudents}
              onChange={(e) => setFormData({ ...formData, maxStudents: parseInt(e.target.value) })}
              inputProps={{ min: 1, max: 100 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
              }
              label="Active Schedule"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes or instructions for this schedule"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} /> : <AddIcon />}
        >
          {loading ? 'Saving...' : (editingSchedule ? 'Update Schedule' : 'Create Schedule')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateScheduleDialog;
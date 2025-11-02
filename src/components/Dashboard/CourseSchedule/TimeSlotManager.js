import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip,
  Alert,
  Skeleton
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as AccessTimeIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import dayjs from 'dayjs';
import courseScheduleService from '@/services/course-schedule.service';

function TimeSlotManager({ onTimeSlotsUpdate }) {
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    startTime: dayjs().hour(9).minute(0),
    endTime: dayjs().hour(10).minute(30),
    description: '',
    isActive: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const fetchTimeSlots = async () => {
    setLoading(true);
    try {
      const response = await courseScheduleService.getAllTimeSlots();
      setTimeSlots(response.data || []);
    } catch (error) {
      console.error('Error fetching time slots:', error);
      setTimeSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      startTime: dayjs().hour(9).minute(0),
      endTime: dayjs().hour(10).minute(30),
      description: '',
      isActive: true
    });
    setErrors({});
  };

  const handleCreateClick = () => {
    resetForm();
    setEditingSlot(null);
    setCreateDialogOpen(true);
  };

  const handleEditClick = (slot) => {
    setFormData({
      name: slot.name,
      startTime: dayjs(slot.startTime, 'HH:mm'),
      endTime: dayjs(slot.endTime, 'HH:mm'),
      description: slot.description || '',
      isActive: slot.isActive !== false
    });
    setEditingSlot(slot);
    setCreateDialogOpen(true);
  };

  const handleDeleteClick = (slot) => {
    setSlotToDelete(slot);
    setDeleteDialogOpen(true);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Time slot name is required';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }

    if (formData.startTime && formData.endTime && formData.startTime.isAfter(formData.endTime)) {
      newErrors.endTime = 'End time must be after start time';
    }

    // Check for overlapping time slots
    const existingSlots = editingSlot ? 
      timeSlots.filter(slot => slot.id !== editingSlot.id) : 
      timeSlots;
    
    const hasOverlap = existingSlots.some(slot => {
      const slotStart = dayjs(slot.startTime, 'HH:mm');
      const slotEnd = dayjs(slot.endTime, 'HH:mm');
      
      return (formData.startTime.isBefore(slotEnd) && formData.endTime.isAfter(slotStart));
    });

    if (hasOverlap) {
      newErrors.general = 'This time slot overlaps with an existing time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const timeSlotData = {
        name: formData.name,
        startTime: formData.startTime.format('HH:mm'),
        endTime: formData.endTime.format('HH:mm'),
        description: formData.description,
        isActive: formData.isActive,
        duration: formData.endTime.diff(formData.startTime, 'minute')
      };

      if (editingSlot) {
        await courseScheduleService.updateTimeSlot(editingSlot.id, timeSlotData);
      } else {
        await courseScheduleService.createTimeSlot(timeSlotData);
      }

      await fetchTimeSlots();
      onTimeSlotsUpdate && onTimeSlotsUpdate();
      setCreateDialogOpen(false);
      resetForm();
      setEditingSlot(null);
    } catch (error) {
      console.error('Error saving time slot:', error);
      setErrors({ general: error.response?.data?.message || 'Failed to save time slot' });
    }
  };

  const handleDelete = async () => {
    if (!slotToDelete) return;

    try {
      await courseScheduleService.deleteTimeSlot(slotToDelete.id);
      await fetchTimeSlots();
      onTimeSlotsUpdate && onTimeSlotsUpdate();
      setDeleteDialogOpen(false);
      setSlotToDelete(null);
    } catch (error) {
      console.error('Error deleting time slot:', error);
      setErrors({ general: error.response?.data?.message || 'Failed to delete time slot' });
    }
  };

  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return '';
    const duration = endTime.diff(startTime, 'minute');
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    
    if (hours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Time Slots</Typography>
            <Skeleton variant="rectangular" width={120} height={36} />
          </Box>
          {Array.from({ length: 4 }).map((_, index) => (
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
              <AccessTimeIcon />
              Time Slots
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateClick}
            >
              Add Time Slot
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Time Range</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Duration</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {timeSlots.length > 0 ? (
                  timeSlots.map((slot) => (
                    <TableRow key={slot.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {slot.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {slot.startTime} - {slot.endTime}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {calculateDuration(
                            dayjs(slot.startTime, 'HH:mm'),
                            dayjs(slot.endTime, 'HH:mm')
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={slot.isActive !== false ? 'Active' : 'Inactive'}
                          color={slot.isActive !== false ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {slot.description || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleEditClick(slot)}
                            color="primary"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(slot)}
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Box sx={{ py: 3 }}>
                        <AccessTimeIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                        <Typography variant="h6" color="text.secondary">
                          No time slots configured
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Create time slots to standardize class schedules
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<AddIcon />}
                          onClick={handleCreateClick}
                        >
                          Add First Time Slot
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Create/Edit Time Slot Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingSlot ? 'Edit Time Slot' : 'Create New Time Slot'}
        </DialogTitle>
        
        <DialogContent>
          {errors.general && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.general}
            </Alert>
          )}

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Time Slot Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={!!errors.name}
                helperText={errors.name}
                placeholder="e.g., Morning Session, Evening Class"
              />
            </Grid>

            <Grid item xs={6}>
              <TimePicker
                label="Start Time"
                value={formData.startTime}
                onChange={(newValue) => setFormData({ ...formData, startTime: newValue })}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    fullWidth 
                    error={!!errors.startTime}
                    helperText={errors.startTime}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <TimePicker
                label="End Time"
                value={formData.endTime}
                onChange={(newValue) => setFormData({ ...formData, endTime: newValue })}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    fullWidth 
                    error={!!errors.endTime}
                    helperText={errors.endTime}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Description (Optional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of this time slot"
              />
            </Grid>

            {formData.startTime && formData.endTime && (
              <Grid item xs={12}>
                <Alert severity="info">
                  Duration: {calculateDuration(formData.startTime, formData.endTime)}
                </Alert>
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            startIcon={<SaveIcon />}
          >
            {editingSlot ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Time Slot</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            This action cannot be undone.
          </Alert>
          <Typography>
            Are you sure you want to delete the time slot "{slotToDelete?.name}"?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Any schedules using this time slot will need to be updated manually.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TimeSlotManager;
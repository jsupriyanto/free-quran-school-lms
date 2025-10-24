"use client";
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Box,
  Avatar,
  Button,
  Chip,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Grid,
  Tooltip,
  IconButton,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 500,
  ...(status === 'present' && {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.contrastText,
  }),
  ...(status === 'late' && {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.contrastText,
  }),
  ...(status === 'absent' && {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.contrastText,
  }),
  ...(status === 'excused' && {
    backgroundColor: theme.palette.info.light,
    color: theme.palette.info.contrastText,
  }),
}));

const AttendanceMarkingCard = ({
  student,
  attendanceRecord = {},
  onStatusChange,
  onNotesChange,
  onSave,
  isEditable = true,
  showActions = true,
  compact = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localStatus, setLocalStatus] = useState(attendanceRecord.status || 'present');
  const [localNotes, setLocalNotes] = useState(attendanceRecord.notes || '');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircleIcon fontSize="small" />;
      case 'late':
        return <AccessTimeIcon fontSize="small" />;
      case 'absent':
        return <PersonOffIcon fontSize="small" />;
      case 'excused':
        return <CancelIcon fontSize="small" />;
      default:
        return <CheckCircleIcon fontSize="small" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'success';
      case 'late':
        return 'warning';
      case 'absent':
        return 'error';
      case 'excused':
        return 'info';
      default:
        return 'default';
    }
  };

  const handleStatusUpdate = (newStatus) => {
    setLocalStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(student.id, newStatus);
    }
  };

  const handleNotesUpdate = (newNotes) => {
    setLocalNotes(newNotes);
    if (onNotesChange) {
      onNotesChange(student.id, newNotes);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(student.id, {
        status: localStatus,
        notes: localNotes
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalStatus(attendanceRecord.status || 'present');
    setLocalNotes(attendanceRecord.notes || '');
    setIsEditing(false);
  };

  return (
    <StyledCard
      sx={{
        minWidth: compact ? 280 : 320,
        maxWidth: compact ? 300 : 400,
        margin: 1,
      }}
    >
      <CardHeader
        avatar={
          <Avatar 
            src={student.avatar || student.studentAvatar} 
            sx={{ width: compact ? 40 : 48, height: compact ? 40 : 48 }}
          >
            {(student.name || student.studentName || '').charAt(0)}
          </Avatar>
        }
        title={
          <Typography variant={compact ? "body2" : "subtitle1"} fontWeight={600}>
            {student.name || student.studentName}
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            {student.email || student.studentEmail}
          </Typography>
        }
        action={
          isEditable && showActions && (
            <Tooltip title={isEditing ? "Cancel" : "Edit"}>
              <IconButton 
                onClick={() => setIsEditing(!isEditing)}
                size="small"
              >
                {isEditing ? <ClearIcon /> : <EditIcon />}
              </IconButton>
            </Tooltip>
          )
        }
        sx={{ pb: 1 }}
      />
      
      <CardContent sx={{ pt: 0, pb: compact ? 1 : 2 }}>
        {isEditing ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <Select
                  value={localStatus}
                  onChange={(e) => handleStatusUpdate(e.target.value)}
                  displayEmpty
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
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Notes"
                multiline
                rows={2}
                fullWidth
                size="small"
                value={localNotes}
                onChange={(e) => handleNotesUpdate(e.target.value)}
                placeholder="Add attendance notes..."
              />
            </Grid>
          </Grid>
        ) : (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <StatusChip
                icon={getStatusIcon(localStatus)}
                label={localStatus.charAt(0).toUpperCase() + localStatus.slice(1)}
                status={localStatus}
                size={compact ? "small" : "medium"}
              />
            </Box>
            
            {attendanceRecord.checkInTime && (
              <Typography variant="caption" color="text.secondary" display="block">
                Check-in: {new Date(attendanceRecord.checkInTime).toLocaleTimeString()}
              </Typography>
            )}
            
            {localNotes && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                  Notes:
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                  {localNotes}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </CardContent>

      {isEditing && showActions && (
        <>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end', px: 2, py: 1 }}>
            <Button
              size="small"
              onClick={handleCancel}
              startIcon={<ClearIcon />}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={handleSave}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </CardActions>
        </>
      )}
    </StyledCard>
  );
};

export default AttendanceMarkingCard;
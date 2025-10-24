"use client";
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Tooltip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import DownloadIcon from "@mui/icons-material/Download";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[8],
  },
  position: 'relative',
  overflow: 'visible',
}));

const StatusBadge = styled(Box)(({ theme, status }) => ({
  position: 'absolute',
  top: -8,
  right: 16,
  zIndex: 1,
}));

const SessionCard = ({
  session,
  onMarkAttendance,
  onEdit,
  onDelete,
  onStart,
  onComplete,
  onExport,
  showActions = true,
  compact = false
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      case 'scheduled':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <PlayArrowIcon fontSize="small" />;
      case 'completed':
        return <CheckCircleIcon fontSize="small" />;
      case 'cancelled':
        return <CancelIcon fontSize="small" />;
      case 'scheduled':
        return <CalendarTodayIcon fontSize="small" />;
      default:
        return <CalendarTodayIcon fontSize="small" />;
    }
  };

  const getAttendancePercentage = () => {
    const total = session.totalStudents || 0;
    const present = session.presentStudents || 0;
    return total > 0 ? (present / total) * 100 : 0;
  };

  const formatSessionDate = () => {
    if (session.sessionDate) {
      return dayjs(session.sessionDate).format('MMM DD, YYYY');
    }
    return 'No date set';
  };

  const formatDuration = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  const isSessionToday = () => {
    return dayjs(session.sessionDate).isSame(dayjs(), 'day');
  };

  const isSessionPast = () => {
    return dayjs(session.sessionDate).isBefore(dayjs(), 'day');
  };

  const canMarkAttendance = () => {
    return session.status === 'active' || isSessionToday() || isSessionPast();
  };

  return (
    <>
      <StyledCard
        sx={{
          minWidth: compact ? 280 : 320,
          maxWidth: compact ? 320 : 400,
          margin: 1,
          border: isSessionToday() ? '2px solid' : '1px solid',
          borderColor: isSessionToday() ? 'primary.main' : 'divider',
        }}
      >
        <StatusBadge status={session.status}>
          <Chip
            icon={getStatusIcon(session.status)}
            label={session.status}
            color={getStatusColor(session.status)}
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
        </StatusBadge>

        <CardContent sx={{ pt: 3 }}>
          {/* Course Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 40, height: 40 }}>
              <SchoolIcon />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="h3" fontWeight={600} noWrap>
                {session.courseName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {session.topic}
              </Typography>
            </Box>
          </Box>

          {/* Session Details */}
          <Grid container spacing={1} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarTodayIcon fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  {formatSessionDate()}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTimeIcon fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  {session.sessionTime} • {formatDuration(session.duration)}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Attendance Summary */}
          {session.totalStudents > 0 && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" fontWeight={500}>
                  Attendance
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {session.presentStudents || 0}/{session.totalStudents} ({getAttendancePercentage().toFixed(0)}%)
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={getAttendancePercentage()}
                sx={{ height: 6, borderRadius: 3 }}
                color={getAttendancePercentage() >= 80 ? 'success' : getAttendancePercentage() >= 60 ? 'warning' : 'error'}
              />
              
              <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                <Chip
                  icon={<CheckCircleIcon />}
                  label={`Present: ${session.presentStudents || 0}`}
                  size="small"
                  color="success"
                  variant="outlined"
                />
                {session.lateStudents > 0 && (
                  <Chip
                    icon={<AccessTimeIcon />}
                    label={`Late: ${session.lateStudents}`}
                    size="small"
                    color="warning"
                    variant="outlined"
                  />
                )}
                {session.absentStudents > 0 && (
                  <Chip
                    icon={<PersonOffIcon />}
                    label={`Absent: ${session.absentStudents}`}
                    size="small"
                    color="error"
                    variant="outlined"
                  />
                )}
              </Box>
            </Box>
          )}

          {/* Today's Session Highlight */}
          {isSessionToday() && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Today's session • Ready for attendance
            </Alert>
          )}
        </CardContent>

        {showActions && (
          <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
            <Box>
              <Tooltip title="Mark Attendance">
                <span>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<PresentToAllIcon />}
                    onClick={() => onMarkAttendance && onMarkAttendance(session)}
                    disabled={!canMarkAttendance()}
                    color={isSessionToday() ? 'primary' : 'inherit'}
                  >
                    {session.status === 'completed' ? 'View' : 'Mark'} Attendance
                  </Button>
                </span>
              </Tooltip>
            </Box>

            <Box>
              <Tooltip title="More actions">
                <IconButton
                  size="small"
                  onClick={handleMenuOpen}
                >
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </CardActions>
        )}
      </StyledCard>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => { onEdit && onEdit(session); handleMenuClose(); }}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Session</ListItemText>
        </MenuItem>
        
        {session.status === 'scheduled' && (
          <MenuItem onClick={() => { onStart && onStart(session); handleMenuClose(); }}>
            <ListItemIcon>
              <PlayArrowIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Start Session</ListItemText>
          </MenuItem>
        )}
        
        {session.status === 'active' && (
          <MenuItem onClick={() => { onComplete && onComplete(session); handleMenuClose(); }}>
            <ListItemIcon>
              <StopIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Complete Session</ListItemText>
          </MenuItem>
        )}
        
        <MenuItem onClick={() => { onExport && onExport(session); handleMenuClose(); }}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export Data</ListItemText>
        </MenuItem>
        
        <Divider />
        
        <MenuItem 
          onClick={() => { setDeleteDialog(true); handleMenuClose(); }}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete Session</ListItemText>
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Delete Session</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this session? This action cannot be undone.
          </Typography>
          <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {session.courseName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {session.topic} • {formatSessionDate()}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={() => {
              onDelete && onDelete(session);
              setDeleteDialog(false);
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SessionCard;
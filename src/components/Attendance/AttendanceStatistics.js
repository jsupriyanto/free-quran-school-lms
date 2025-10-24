"use client";
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const StatCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const MetricBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

const AttendanceStatistics = ({
  statistics = {},
  showTrends = true,
  showBreakdown = true,
  title = "Attendance Statistics",
  compact = false
}) => {
  const {
    totalSessions = 0,
    attendedSessions = 0,
    absentSessions = 0,
    lateSessions = 0,
    excusedSessions = 0,
    attendanceRate = 0,
    punctualityRate = 0,
    averageLateMinutes = 0,
    consecutiveAbsences = 0,
    longestAbsenceStreak = 0,
    improvementTrend = 'stable',
    periodStart,
    periodEnd,
    entityType = 'student'
  } = statistics;

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving':
        return <TrendingUpIcon color="success" fontSize="small" />;
      case 'declining':
        return <TrendingDownIcon color="error" fontSize="small" />;
      default:
        return <TrendingFlatIcon color="info" fontSize="small" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'improving':
        return 'success';
      case 'declining':
        return 'error';
      default:
        return 'info';
    }
  };

  const getAttendanceRateColor = (rate) => {
    if (rate >= 95) return 'success';
    if (rate >= 85) return 'info';
    if (rate >= 75) return 'warning';
    return 'error';
  };

  const formatPeriod = () => {
    if (periodStart && periodEnd) {
      const start = new Date(periodStart).toLocaleDateString();
      const end = new Date(periodEnd).toLocaleDateString();
      return `${start} - ${end}`;
    }
    return 'Current Period';
  };

  return (
    <StatCard>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            {entityType === 'course' ? <SchoolIcon /> : 
             entityType === 'student' ? <PersonIcon /> : <CalendarTodayIcon />}
          </Avatar>
          <Box>
            <Typography variant="h6" component="h2" fontWeight={600}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatPeriod()}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Main Metrics */}
          <Grid item xs={12} md={6}>
            <MetricBox>
              <Typography variant="h4" fontWeight={700} color="primary.main">
                {attendanceRate.toFixed(1)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Attendance Rate
              </Typography>
              <LinearProgress
                variant="determinate"
                value={attendanceRate}
                color={getAttendanceRateColor(attendanceRate)}
                sx={{ mt: 1, height: 8, borderRadius: 4 }}
              />
            </MetricBox>
          </Grid>

          <Grid item xs={12} md={6}>
            <MetricBox>
              <Typography variant="h4" fontWeight={700} color="info.main">
                {punctualityRate.toFixed(1)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Punctuality Rate
              </Typography>
              <LinearProgress
                variant="determinate"
                value={punctualityRate}
                color="info"
                sx={{ mt: 1, height: 8, borderRadius: 4 }}
              />
            </MetricBox>
          </Grid>

          {/* Session Breakdown */}
          {showBreakdown && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Session Breakdown
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" color="primary.main">
                      {totalSessions}
                    </Typography>
                    <Typography variant="caption">Total Sessions</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" color="success.main">
                      {attendedSessions}
                    </Typography>
                    <Typography variant="caption">Present</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" color="warning.main">
                      {lateSessions}
                    </Typography>
                    <Typography variant="caption">Late</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" color="error.main">
                      {absentSessions}
                    </Typography>
                    <Typography variant="caption">Absent</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          )}

          {/* Trends and Additional Info */}
          {showTrends && (
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    {getTrendIcon(improvementTrend)}
                  </ListItemIcon>
                  <ListItemText
                    primary="Attendance Trend"
                    secondary={
                      <Chip
                        label={improvementTrend.charAt(0).toUpperCase() + improvementTrend.slice(1)}
                        color={getTrendColor(improvementTrend)}
                        size="small"
                        sx={{ mt: 0.5 }}
                      />
                    }
                  />
                </ListItem>

                {averageLateMinutes > 0 && (
                  <ListItem>
                    <ListItemIcon>
                      <AccessTimeIcon color="warning" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Average Late Time"
                      secondary={`${averageLateMinutes} minutes`}
                    />
                  </ListItem>
                )}

                {consecutiveAbsences > 0 && (
                  <ListItem>
                    <ListItemIcon>
                      <PersonOffIcon color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Current Consecutive Absences"
                      secondary={`${consecutiveAbsences} sessions`}
                    />
                  </ListItem>
                )}

                {longestAbsenceStreak > 0 && (
                  <ListItem>
                    <ListItemIcon>
                      <CancelIcon color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Longest Absence Streak"
                      secondary={`${longestAbsenceStreak} sessions`}
                    />
                  </ListItem>
                )}

                {excusedSessions > 0 && (
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="info" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Excused Absences"
                      secondary={`${excusedSessions} sessions`}
                    />
                  </ListItem>
                )}
              </List>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </StatCard>
  );
};

export default AttendanceStatistics;
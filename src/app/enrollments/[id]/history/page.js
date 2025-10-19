"use client";
import React from "react";
import { Box, Typography, Card, Chip } from "@mui/material";
import Grid from "@mui/material/Grid";
import SchoolIcon from "@mui/icons-material/School";
import QuizIcon from "@mui/icons-material/Quiz";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import GradeIcon from "@mui/icons-material/Grade";
import BookIcon from "@mui/icons-material/Book";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// Sample history data
const historyData = {
  activities: [
    {
      id: 1,
      type: "lesson_completed",
      title: "Completed Lesson: Arabic Verb Conjugation",
      description: "Finished lesson 19 with a score of 92%",
      timestamp: "2025-10-18T14:30:00.000Z",
      score: 92,
      duration: "25 minutes"
    },
    {
      id: 2,
      type: "quiz_taken",
      title: "Quiz: Sentence Construction",
      description: "Completed quiz with 85% score",
      timestamp: "2025-10-17T10:15:00.000Z",
      score: 85,
      attempts: 1
    },
    {
      id: 3,
      type: "assignment_submitted",
      title: "Assignment: Simple Conversation",
      description: "Submitted assignment for grading",
      timestamp: "2025-10-15T16:45:00.000Z",
      status: "submitted"
    },
    {
      id: 4,
      type: "lesson_completed",
      title: "Completed Lesson: Using 'This is' and 'That is'",
      description: "Finished lesson 17 with a score of 86%",
      timestamp: "2025-10-14T11:20:00.000Z",
      score: 86,
      duration: "18 minutes"
    },
    {
      id: 5,
      type: "login",
      title: "Logged in to course",
      description: "Started study session",
      timestamp: "2025-10-14T11:00:00.000Z",
      sessionDuration: "45 minutes"
    },
    {
      id: 6,
      type: "assignment_graded",
      title: "Assignment Graded: Vocabulary Flashcards",
      description: "Received grade of 94%",
      timestamp: "2025-10-12T09:30:00.000Z",
      score: 94,
      feedback: "Excellent work on vocabulary! Keep practicing pronunciation."
    },
    {
      id: 7,
      type: "lesson_completed",
      title: "Completed Lesson: Subject and Predicate",
      description: "Finished lesson 16 with a score of 83%",
      timestamp: "2025-10-10T15:10:00.000Z",
      score: 83,
      duration: "20 minutes"
    },
    {
      id: 8,
      type: "quiz_taken",
      title: "Quiz: Basic Words Quiz",
      description: "Completed quiz with 92% score",
      timestamp: "2025-10-08T13:45:00.000Z",
      score: 92,
      attempts: 1
    },
    {
      id: 9,
      type: "module_completed",
      title: "Module Completed: Basic Pronunciation",
      description: "Successfully completed Module 2 with 89% average",
      timestamp: "2025-10-05T12:00:00.000Z",
      averageScore: 89,
      totalLessons: 5
    },
    {
      id: 10,
      type: "lesson_completed",
      title: "Completed Lesson: Numbers 1-20",
      description: "Finished lesson 13 with a score of 85%",
      timestamp: "2025-10-03T14:25:00.000Z",
      score: 85,
      duration: "18 minutes"
    },
    {
      id: 11,
      type: "assignment_submitted",
      title: "Assignment: Record Pronunciation",
      description: "Submitted pronunciation recording assignment",
      timestamp: "2025-09-30T10:30:00.000Z",
      status: "submitted"
    },
    {
      id: 12,
      type: "quiz_taken",
      title: "Quiz: Pronunciation Test",
      description: "Completed quiz with 88% score",
      timestamp: "2025-09-28T16:20:00.000Z",
      score: 88,
      attempts: 2
    },
    {
      id: 13,
      type: "module_completed",
      title: "Module Completed: Arabic Alphabet",
      description: "Successfully completed Module 1 with 94% average",
      timestamp: "2025-09-25T11:15:00.000Z",
      averageScore: 94,
      totalLessons: 5
    },
    {
      id: 14,
      type: "enrollment",
      title: "Enrolled in Course",
      description: "Enrolled in Arabic Language Basics course",
      timestamp: "2025-06-15T09:00:00.000Z",
      instructor: "Dr. Sarah Ahmed"
    }
  ],
  statistics: {
    totalSessions: 28,
    totalTimeSpent: "42 hours",
    averageSessionTime: "45 minutes",
    longestSession: "1 hour 20 minutes",
    mostActiveDay: "Monday",
    currentStreak: 5,
    longestStreak: 12
  }
};

export default function EnrollmentHistory() {
  const getActivityIcon = (type) => {
    switch (type) {
      case "lesson_completed":
        return <BookIcon sx={{ color: "primary.main" }} />;
      case "quiz_taken":
        return <QuizIcon sx={{ color: "warning.main" }} />;
      case "assignment_submitted":
      case "assignment_graded":
        return <AssignmentIcon sx={{ color: "info.main" }} />;
      case "module_completed":
        return <GradeIcon sx={{ color: "success.main" }} />;
      case "login":
        return <LoginIcon sx={{ color: "text.secondary" }} />;
      case "logout":
        return <LogoutIcon sx={{ color: "text.secondary" }} />;
      case "enrollment":
        return <SchoolIcon sx={{ color: "secondary.main" }} />;
      default:
        return <AccessTimeIcon sx={{ color: "text.secondary" }} />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "lesson_completed":
        return "primary";
      case "quiz_taken":
        return "warning";
      case "assignment_submitted":
      case "assignment_graded":
        return "info";
      case "module_completed":
        return "success";
      case "enrollment":
        return "secondary";
      default:
        return "grey";
    }
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const activityDate = new Date(timestamp);
    const diffInHours = Math.floor((now - activityDate) / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays === 0) {
      if (diffInHours === 0) return "Just now";
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
      const months = Math.floor(diffInDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Statistics Summary */}
      <Grid size={{ xs: 12 }}>
        <Card
          sx={{
            padding: "25px",
            borderRadius: "7px",
            boxShadow: "none",
            border: "1px solid #eee",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Learning Statistics
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 6, md: 3 }}>
              <Box sx={{ textAlign: "center", p: 2, backgroundColor: "primary.light", borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: "primary.main" }}>
                  {historyData.statistics.totalSessions}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Sessions
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Box sx={{ textAlign: "center", p: 2, backgroundColor: "success.light", borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: "success.main" }}>
                  {historyData.statistics.totalTimeSpent}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Time
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Box sx={{ textAlign: "center", p: 2, backgroundColor: "warning.light", borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: "warning.main" }}>
                  {historyData.statistics.currentStreak}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Current Streak
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Box sx={{ textAlign: "center", p: 2, backgroundColor: "info.light", borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: "info.main" }}>
                  {historyData.statistics.averageSessionTime}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Avg Session
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      {/* Activity Timeline */}
      <Grid size={{ xs: 12 }}>
        <Card
          sx={{
            padding: "25px",
            borderRadius: "7px",
            boxShadow: "none",
            border: "1px solid #eee",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Activity Timeline
          </Typography>

          <Box sx={{ position: "relative" }}>
            {historyData.activities.map((activity, index) => {
              const dateTime = formatDateTime(activity.timestamp);
              
              return (
                <Box key={activity.id} sx={{ display: "flex", gap: 2, mb: 3 }}>
                  {/* Timeline Dot */}
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        backgroundColor: `${getActivityColor(activity.type)}.main`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white"
                      }}
                    >
                      {getActivityIcon(activity.type)}
                    </Box>
                    {index < historyData.activities.length - 1 && (
                      <Box
                        sx={{
                          width: 2,
                          height: 60,
                          backgroundColor: "grey.300",
                          mt: 1
                        }}
                      />
                    )}
                  </Box>

                  {/* Timeline Content */}
                  <Box sx={{ flex: 1, pb: 2 }}>
                    <Box
                      sx={{
                        backgroundColor: "grey.50",
                        borderRadius: 2,
                        p: 2
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {activity.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatRelativeTime(activity.timestamp)}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {activity.description}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <CalendarTodayIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                          <Typography variant="caption" color="text.secondary">
                            {dateTime.date} at {dateTime.time}
                          </Typography>
                        </Box>

                        {activity.score && (
                          <Chip
                            label={`Score: ${activity.score}%`}
                            color="success"
                            size="small"
                            variant="outlined"
                          />
                        )}

                        {activity.duration && (
                          <Chip
                            label={`Duration: ${activity.duration}`}
                            color="info"
                            size="small"
                            variant="outlined"
                          />
                        )}

                        {activity.attempts && activity.attempts > 1 && (
                          <Chip
                            label={`${activity.attempts} attempts`}
                            color="warning"
                            size="small"
                            variant="outlined"
                          />
                        )}

                        {activity.status && (
                          <Chip
                            label={activity.status}
                            color={activity.status === "submitted" ? "warning" : "success"}
                            size="small"
                            variant="outlined"
                            sx={{ textTransform: "capitalize" }}
                          />
                        )}

                        {activity.averageScore && (
                          <Chip
                            label={`Avg: ${activity.averageScore}%`}
                            color="success"
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Box>

                      {activity.feedback && (
                        <Box sx={{ mt: 2, p: 2, backgroundColor: "info.light", borderRadius: 1 }}>
                          <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                            <strong>Instructor Feedback:</strong> {activity.feedback}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
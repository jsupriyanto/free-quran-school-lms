"use client";
import React from "react";
import { Box, Typography, Card, LinearProgress, Chip } from "@mui/material";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import LockIcon from "@mui/icons-material/Lock";
import QuizIcon from "@mui/icons-material/Quiz";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BookIcon from "@mui/icons-material/Book";
import TimerIcon from "@mui/icons-material/Timer";

// Sample progress data
const progressData = {
  overallProgress: 75,
  completedLessons: 18,
  totalLessons: 25,
  timeSpent: "42 hours",
  averageScore: 87,
  modules: [
    {
      id: 1,
      title: "Module 1: Arabic Alphabet",
      description: "Learn the 28 letters of the Arabic alphabet",
      progress: 100,
      status: "completed",
      lessons: [
        { id: 1, title: "Introduction to Arabic Script", completed: true, duration: "15 min", score: 95 },
        { id: 2, title: "Learning Alif to Ha", completed: true, duration: "20 min", score: 88 },
        { id: 3, title: "Learning Kha to Sad", completed: true, duration: "22 min", score: 92 },
        { id: 4, title: "Learning Dad to Ya", completed: true, duration: "18 min", score: 90 },
        { id: 5, title: "Review and Practice", completed: true, duration: "25 min", score: 94 }
      ]
    },
    {
      id: 2,
      title: "Module 2: Basic Pronunciation",
      description: "Master the pronunciation of Arabic letters and sounds",
      progress: 80,
      status: "in_progress",
      lessons: [
        { id: 6, title: "Vowel Marks (Harakat)", completed: true, duration: "18 min", score: 85 },
        { id: 7, title: "Sukun and Shadda", completed: true, duration: "16 min", score: 89 },
        { id: 8, title: "Pronunciation Practice 1", completed: true, duration: "20 min", score: 82 },
        { id: 9, title: "Pronunciation Practice 2", completed: true, duration: "22 min", score: 87 },
        { id: 10, title: "Common Pronunciation Mistakes", completed: false, duration: "19 min", score: null }
      ]
    },
    {
      id: 3,
      title: "Module 3: Basic Words",
      description: "Learn common Arabic words and their meanings",
      progress: 60,
      status: "in_progress",
      lessons: [
        { id: 11, title: "Family Members", completed: true, duration: "15 min", score: 91 },
        { id: 12, title: "Days of the Week", completed: true, duration: "12 min", score: 88 },
        { id: 13, title: "Numbers 1-20", completed: true, duration: "18 min", score: 85 },
        { id: 14, title: "Colors and Shapes", completed: false, duration: "16 min", score: null },
        { id: 15, title: "Basic Greetings", completed: false, duration: "14 min", score: null }
      ]
    },
    {
      id: 4,
      title: "Module 4: Simple Sentences",
      description: "Construct basic Arabic sentences",
      progress: 40,
      status: "in_progress",
      lessons: [
        { id: 16, title: "Subject and Predicate", completed: true, duration: "20 min", score: 83 },
        { id: 17, title: "Using 'This is' and 'That is'", completed: true, duration: "18 min", score: 86 },
        { id: 18, title: "Asking Questions", completed: false, duration: "22 min", score: null },
        { id: 19, title: "Negative Sentences", completed: false, duration: "19 min", score: null },
        { id: 20, title: "Practice Conversations", completed: false, duration: "25 min", score: null }
      ]
    },
    {
      id: 5,
      title: "Module 5: Reading Practice",
      description: "Read simple Arabic texts and passages",
      progress: 0,
      status: "locked",
      lessons: [
        { id: 21, title: "Reading Short Passages", completed: false, duration: "20 min", score: null },
        { id: 22, title: "Understanding Context", completed: false, duration: "18 min", score: null },
        { id: 23, title: "Reading Comprehension", completed: false, duration: "25 min", score: null },
        { id: 24, title: "Final Reading Test", completed: false, duration: "30 min", score: null },
        { id: 25, title: "Course Review", completed: false, duration: "15 min", score: null }
      ]
    }
  ],
  quizzes: [
    { id: 1, title: "Arabic Alphabet Quiz", score: 95, maxScore: 100, completed: true, date: "2025-06-20" },
    { id: 2, title: "Pronunciation Test", score: 88, maxScore: 100, completed: true, date: "2025-07-05" },
    { id: 3, title: "Basic Words Quiz", score: 92, maxScore: 100, completed: true, date: "2025-07-20" },
    { id: 4, title: "Sentence Construction", score: 85, maxScore: 100, completed: true, date: "2025-08-10" }
  ],
  assignments: [
    { id: 1, title: "Write Arabic Letters", status: "graded", score: 90, maxScore: 100, submitted: "2025-06-25", graded: "2025-06-27" },
    { id: 2, title: "Record Pronunciation", status: "graded", score: 87, maxScore: 100, submitted: "2025-07-10", graded: "2025-07-12" },
    { id: 3, title: "Vocabulary Flashcards", status: "graded", score: 94, maxScore: 100, submitted: "2025-07-25", graded: "2025-07-27" },
    { id: 4, title: "Simple Conversation", status: "submitted", score: null, maxScore: 100, submitted: "2025-08-15", graded: null }
  ]
};

export default function EnrollmentProgress() {
  const getModuleStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "in_progress":
        return "primary";
      case "locked":
        return "default";
      default:
        return "default";
    }
  };

  const getModuleStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon sx={{ color: "success.main" }} />;
      case "in_progress":
        return <PlayCircleOutlineIcon sx={{ color: "primary.main" }} />;
      case "locked":
        return <LockIcon sx={{ color: "text.disabled" }} />;
      default:
        return <BookIcon sx={{ color: "text.secondary" }} />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Grid container spacing={3}>
      {/* Overall Progress Summary */}
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
            Overall Progress
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Course Completion
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {progressData.overallProgress}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={progressData.overallProgress}
                  sx={{ height: 10, borderRadius: 5 }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                  {progressData.completedLessons} of {progressData.totalLessons} lessons completed
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ textAlign: "center", p: 2, backgroundColor: "primary.light", borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "primary.main" }}>
                      {progressData.timeSpent}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Time Spent
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ textAlign: "center", p: 2, backgroundColor: "success.light", borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "success.main" }}>
                      {progressData.averageScore}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg Score
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      {/* Module Progress */}
      <Grid size={{ xs: 12, lg: 8 }}>
        <Card
          sx={{
            padding: "25px",
            borderRadius: "7px",
            boxShadow: "none",
            border: "1px solid #eee",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Module Progress
          </Typography>

          {progressData.modules.map((module) => (
            <Box key={module.id} sx={{ mb: 3, pb: 3, borderBottom: "1px solid #f0f0f0" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                {getModuleStatusIcon(module.status)}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {module.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {module.description}
                  </Typography>
                </Box>
                <Chip
                  label={module.status.replace('_', ' ')}
                  color={getModuleStatusColor(module.status)}
                  size="small"
                  sx={{ textTransform: "capitalize" }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2">Progress</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {module.progress}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={module.progress}
                  sx={{ height: 6, borderRadius: 3 }}
                />
              </Box>

              <Box sx={{ pl: 2 }}>
                {module.lessons.map((lesson) => (
                  <Box
                    key={lesson.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      py: 1,
                      opacity: lesson.completed ? 1 : 0.6
                    }}
                  >
                    {lesson.completed ? (
                      <CheckCircleIcon sx={{ fontSize: 20, color: "success.main" }} />
                    ) : (
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          border: "2px solid #ddd",
                          borderRadius: "50%"
                        }}
                      />
                    )}
                    <Typography
                      variant="body2"
                      sx={{
                        flex: 1,
                        textDecoration: lesson.completed ? "none" : "none",
                        color: lesson.completed ? "text.primary" : "text.secondary"
                      }}
                    >
                      {lesson.title}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <TimerIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="caption" color="text.secondary">
                        {lesson.duration}
                      </Typography>
                    </Box>
                    {lesson.score && (
                      <Typography variant="caption" sx={{ fontWeight: 500, minWidth: "40px" }}>
                        {lesson.score}%
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Card>
      </Grid>

      {/* Quizzes and Assignments */}
      <Grid size={{ xs: 12, lg: 4 }}>
        {/* Quizzes */}
        <Card
          sx={{
            padding: "20px",
            borderRadius: "7px",
            boxShadow: "none",
            border: "1px solid #eee",
            mb: 3
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <QuizIcon sx={{ color: "primary.main" }} />
            Quizzes
          </Typography>

          {progressData.quizzes.map((quiz) => (
            <Box key={quiz.id} sx={{ mb: 2, p: 2, backgroundColor: "grey.50", borderRadius: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                {quiz.title}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(quiz.date)}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "success.main" }}>
                  {quiz.score}/{quiz.maxScore}
                </Typography>
              </Box>
            </Box>
          ))}
        </Card>

        {/* Assignments */}
        <Card
          sx={{
            padding: "20px",
            borderRadius: "7px",
            boxShadow: "none",
            border: "1px solid #eee",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <AssignmentIcon sx={{ color: "warning.main" }} />
            Assignments
          </Typography>

          {progressData.assignments.map((assignment) => (
            <Box key={assignment.id} sx={{ mb: 2, p: 2, backgroundColor: "grey.50", borderRadius: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {assignment.title}
                </Typography>
                <Chip
                  label={assignment.status}
                  color={assignment.status === "graded" ? "success" : "warning"}
                  size="small"
                  sx={{ textTransform: "capitalize" }}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="caption" color="text.secondary">
                  Submitted: {formatDate(assignment.submitted)}
                </Typography>
                {assignment.score && (
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "success.main" }}>
                    {assignment.score}/{assignment.maxScore}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Card>
      </Grid>
    </Grid>
  );
}
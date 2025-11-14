"use client";
import React from "react";
import { Box, Typography, Card, LinearProgress, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GradeIcon from "@mui/icons-material/Grade";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VerifiedIcon from "@mui/icons-material/Verified";
import Image from "next/image";

// Sample data for demonstration
const enrollmentOverview = {
  student: {
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2025-01-15",
    totalCourses: 3,
    completedCourses: 1,
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  course: {
    title: "Arabic Language Basics",
    description: "Learn the basics of the Arabic language for better understanding of the Quran.",
    image: "https://freequranschoolstorage.blob.core.windows.net/courses/arabic-class-4J8yYQZxKzLjE9qGfm5P6oAYKpKhQs.jpg",
    level: "Beginner",
    duration: "8 weeks",
    totalLessons: 25,
    instructor: "Dr. Sarah Ahmed",
    rating: 4.2
  },
  enrollment: {
    enrollmentDate: "2025-06-15",
    expectedCompletion: "2025-11-15",
    actualCompletion: null,
    status: "Active",
    progress: 75,
    completedLessons: 18,
    currentLesson: "Lesson 19: Arabic Verb Conjugation",
    timeSpent: "42 hours",
    averageSessionTime: "45 minutes",
    lastAccessed: "2025-10-18",
    grade: "A",
    quizzesTaken: 15,
    quizzesPassed: 14,
    assignmentsSubmitted: 8,
    assignmentsGraded: 7
  }
};

export default function EnrollmentOverview() {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Grid container spacing={3}>
      {/* Statistics Cards */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card
          sx={{
            padding: "20px",
            borderRadius: "7px",
            boxShadow: "none",
            border: "1px solid #eee",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <TrendingUpIcon
              sx={{
                fontSize: 40,
                color: "primary.main",
                backgroundColor: "primary.light",
                borderRadius: "50%",
                padding: "8px",
              }}
            />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {enrollmentOverview.enrollment.timeSpent}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Time Spent
          </Typography>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card
          sx={{
            padding: "20px",
            borderRadius: "7px",
            boxShadow: "none",
            border: "1px solid #eee",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <GradeIcon
              sx={{
                fontSize: 40,
                color: "success.main",
                backgroundColor: "success.light",
                borderRadius: "50%",
                padding: "8px",
              }}
            />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {enrollmentOverview.enrollment.grade}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Current Grade
          </Typography>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card
          sx={{
            padding: "20px",
            borderRadius: "7px",
            boxShadow: "none",
            border: "1px solid #eee",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <VerifiedIcon
              sx={{
                fontSize: 40,
                color: "info.main",
                backgroundColor: "info.light",
                borderRadius: "50%",
                padding: "8px",
              }}
            />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {enrollmentOverview.enrollment.quizzesPassed}/{enrollmentOverview.enrollment.quizzesTaken}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quizzes Passed
          </Typography>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card
          sx={{
            padding: "20px",
            borderRadius: "7px",
            boxShadow: "none",
            border: "1px solid #eee",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <AccessTimeIcon
              sx={{
                fontSize: 40,
                color: "warning.main",
                backgroundColor: "warning.light",
                borderRadius: "50%",
                padding: "8px",
              }}
            />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {enrollmentOverview.enrollment.averageSessionTime}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Avg Session Time
          </Typography>
        </Card>
      </Grid>

      {/* Student Information */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card
          sx={{
            padding: "25px",
            borderRadius: "7px",
            boxShadow: "none",
            border: "1px solid #eee",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Student Information
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px", mb: 1 }}>
              <PersonIcon sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                Full Name
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {enrollmentOverview.student.name}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Email Address
            </Typography>
            <Typography variant="body1">{enrollmentOverview.student.email}</Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Phone Number
            </Typography>
            <Typography variant="body1">{enrollmentOverview.student.phone}</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Total Courses:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {enrollmentOverview.student.totalCourses}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Completed Courses:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {enrollmentOverview.student.completedCourses}
            </Typography>
          </Box>
        </Card>
      </Grid>

      {/* Course Information */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card
          sx={{
            padding: "25px",
            borderRadius: "7px",
            boxShadow: "none",
            border: "1px solid #eee",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Course Information
          </Typography>

          <Box sx={{ display: "flex", alignItems: "flex-start", gap: "15px", mb: 3 }}>
            <Image
              src={enrollmentOverview.course.image}
              alt={enrollmentOverview.course.title}
              width={60}
              height={60}
              style={{
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {enrollmentOverview.course.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {enrollmentOverview.course.description}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Instructor
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {enrollmentOverview.course.instructor}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Level:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {enrollmentOverview.course.level}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Duration:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {enrollmentOverview.course.duration}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Total Lessons:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {enrollmentOverview.course.totalLessons}
            </Typography>
          </Box>
        </Card>
      </Grid>

      {/* Progress Details */}
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
            Learning Progress
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Overall Progress
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {enrollmentOverview.enrollment.progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={enrollmentOverview.enrollment.progress}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
              {enrollmentOverview.enrollment.completedLessons} of {enrollmentOverview.course.totalLessons} lessons completed
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Current Lesson
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {enrollmentOverview.enrollment.currentLesson}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ textAlign: "center", p: 2, backgroundColor: "grey.50", borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: "primary.main" }}>
                  {enrollmentOverview.enrollment.assignmentsGraded}/{enrollmentOverview.enrollment.assignmentsSubmitted}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Assignments Graded
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ textAlign: "center", p: 2, backgroundColor: "grey.50", borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: "success.main" }}>
                  93%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quiz Success Rate
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      {/* Timeline */}
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
            Enrollment Timeline
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Enrollment Date:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {formatDate(enrollmentOverview.enrollment.enrollmentDate)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Expected Completion:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {formatDate(enrollmentOverview.enrollment.expectedCompletion)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Last Accessed:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {formatDate(enrollmentOverview.enrollment.lastAccessed)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Days Since Enrollment:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {Math.floor((new Date() - new Date(enrollmentOverview.enrollment.enrollmentDate)) / (1000 * 60 * 60 * 24))} days
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, Tabs, Tab, Card, Avatar, Chip, LinearProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import PageTitle from "@/components/Common/PageTitle";
import Link from "next/link";
import enrollmentService from "@/services/enrollment.service";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GradeIcon from "@mui/icons-material/Grade";

// Sample enrollment data for demonstration
const sampleEnrollment = {
  id: 1,
  studentId: 101,
  studentName: "Ahmed Hassan",
  studentEmail: "ahmed.hassan@example.com",
  studentAvatar: "https://i.pravatar.cc/150?img=1",
  studentPhone: "+1 (555) 123-4567",
  courseId: 4,
  courseName: "Arabic Language Basics",
  courseImage: "https://freequranschoolstorage.blob.core.windows.net/courses/arabic-class-4J8yYQZxKzLjE9qGfm5P6oAYKpKhQs.jpg",
  courseDuration: "8 weeks",
  courseLevel: "Beginner",
  enrollmentDate: "2025-06-15T00:00:00.000Z",
  status: "Active",
  progress: 75,
  completedLessons: 18,
  totalLessons: 25,
  lastAccessed: "2025-10-18T00:00:00.000Z",
  certificateIssued: false,
  grade: "A",
  instructorName: "Dr. Sarah Ahmed",
  expectedCompletion: "2025-11-15T00:00:00.000Z"
};

function EnrollmentDetailLayout({ children }) {
  const params = useParams();
  const enrollmentId = params.id;
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("overview");

  useEffect(() => {
    const fetchEnrollment = async () => {
      try {
        setLoading(true);
        // In a real app, fetch from API
        // const response = await enrollmentService.getEnrollmentById(enrollmentId);
        // setEnrollment(response.data);
        
        // Using sample data for now
        setEnrollment(sampleEnrollment);
      } catch (error) {
        console.error("Error fetching enrollment:", error);
      } finally {
        setLoading(false);
      }
    };

    if (enrollmentId) {
      fetchEnrollment();
    }
  }, [enrollmentId]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "success";
      case "completed":
        return "primary";
      case "on hold":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading enrollment details...</Typography>
      </Box>
    );
  }

  if (!enrollment) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Enrollment not found</Typography>
      </Box>
    );
  }

  return (
    <>
      <PageTitle
        pageTitle={enrollment.studentName}
        dashboardUrl="/enrollments"
        dashboardText="Enrollments"
      />

      {/* Enrollment Header */}
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
        className="rmui-card"
      >
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
              <Avatar
                src={enrollment.studentAvatar}
                alt={enrollment.studentName}
                sx={{ width: 80, height: 80 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  {enrollment.studentName}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {enrollment.studentEmail}
                </Typography>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: "15px", mb: 2 }}>
                  <Chip
                    label={enrollment.status}
                    color={getStatusColor(enrollment.status)}
                    size="small"
                  />
                  <Typography variant="body2" color="text.secondary">
                    Grade: <strong>{enrollment.grade}</strong>
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <SchoolIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2">{enrollment.courseName}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <CalendarTodayIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2">
                      Enrolled: {formatDate(enrollment.enrollmentDate)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <TrendingUpIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2">
                      Last accessed: {formatDate(enrollment.lastAccessed)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Course Progress
              </Typography>
              <Box sx={{ position: "relative", display: "inline-flex", mb: 2 }}>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: `conic-gradient(#2196f3 ${enrollment.progress * 3.6}deg, #e3f2fd 0deg)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      backgroundColor: "background.paper",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {enrollment.progress}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {enrollment.completedLessons} of {enrollment.totalLessons} lessons completed
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Navigation Tabs */}
        <Box sx={{ borderTop: "1px solid", borderColor: "divider", mt: 3, pt: 2 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label="enrollment navigation tabs"
            sx={{
              "& .MuiTab-root": {
                textTransform: "capitalize",
                fontWeight: 500,
                fontSize: "14px",
              },
            }}
          >
            <Tab 
              label="Overview" 
              value="overview"
              component={Link}
              href={`/enrollments/${enrollmentId}`}
            />
            <Tab 
              label="Progress" 
              value="progress"
              component={Link}
              href={`/enrollments/${enrollmentId}/progress`}
            />
            <Tab 
              label="History" 
              value="history"
              component={Link}
              href={`/enrollments/${enrollmentId}/history`}
            />
            <Tab 
              label="Certificate" 
              value="certificate"
              component={Link}
              href={`/enrollments/${enrollmentId}/certificate`}
            />
          </Tabs>
        </Box>
      </Card>

      {/* Tab Content */}
      {children}
    </>
  );
}

export default EnrollmentDetailLayout;
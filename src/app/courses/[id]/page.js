"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Card, Grid, Button, Chip, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useParams } from "next/navigation";
import courseService from "@/services/course.service";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function CourseOverviewPage() {
  const params = useParams();
  const courseId = params.id;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const response = await courseService.get(courseId);
      if (response.data) {
        setCourse(response.data);
      } else {
        // Fallback with sample data for development
        const sampleCourse = {
          id: parseInt(courseId),
          title: "Quran Recitation Basics",
          description: "Learn the fundamentals of Quran recitation with proper Tajweed rules and pronunciation techniques. This comprehensive course covers basic Arabic pronunciation, Tajweed rules, and practical recitation exercises.",
          skillLevel: "Beginner",
          duration: "8 weeks",
          numberOfLessons: 24,
          category: "Recitation",
          coursePictureUrl: "/images/free-quran-school.jpg",
          isActive: true,
          rating: 4.8,
          startDate: "2024-03-01",
          endDate: "2024-04-26",
          lessonsCount: 24,
          createdAt: "2024-01-15",
          instructor: "Sheikh Ahmad Ali",
          enrolledStudents: 156,
          price: 99.99,
          language: "Arabic/English",
          prerequisites: [
            "Basic understanding of Arabic alphabet",
            "Ability to read Arabic text",
            "Access to computer and internet"
          ],
          learningObjectives: [
            "Master correct pronunciation of Arabic letters",
            "Apply basic Tajweed rules in recitation",
            "Develop fluent Quran reading skills",
            "Understand common recitation mistakes and corrections"
          ],
          courseOutline: [
            "Introduction to Quranic Recitation",
            "Arabic Phonetics and Pronunciation",
            "Basic Tajweed Rules",
            "Practical Recitation Exercises",
            "Common Mistakes and Corrections",
            "Advanced Recitation Techniques"
          ]
        };
        setCourse(sampleCourse);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Typography>Loading course overview...</Typography>
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Typography color="error">Course not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Course Statistics */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <MenuBookIcon sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {course.numberOfLessons}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Lessons
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <AccessTimeIcon sx={{ fontSize: 40, color: "success.main", mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {course.duration}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Duration
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <PeopleIcon sx={{ fontSize: 40, color: "info.main", mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {course.enrolledStudents || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enrolled Students
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <StarIcon sx={{ fontSize: 40, color: "warning.main", mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {course.rating || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Average Rating
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Course Description */}
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              About This Course
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 3 }}>
              {course.description}
            </Typography>

            {/* Learning Objectives */}
            {course.learningObjectives && (
              <>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  What You'll Learn
                </Typography>
                <List>
                  {course.learningObjectives.map((objective, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary={objective} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Card>

          {/* Course Outline */}
          {course.courseOutline && (
            <Card sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Course Outline
              </Typography>
              <List>
                {course.courseOutline.map((topic, index) => (
                  <ListItem key={index} sx={{ py: 1 }}>
                    <ListItemIcon>
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}
                      >
                        {index + 1}
                      </Box>
                    </ListItemIcon>
                    <ListItemText primary={topic} />
                  </ListItem>
                ))}
              </List>
            </Card>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Course Info */}
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Course Information
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Skill Level:
              </Typography>
              <Chip label={course.skillLevel} size="small" />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Category:
              </Typography>
              <Chip label={course.category} variant="outlined" size="small" />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Language:
              </Typography>
              <Typography variant="body2">
                {course.language || "Arabic/English"}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Schedule */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <CalendarTodayIcon sx={{ fontSize: 16, mr: 1, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                Schedule
              </Typography>
            </Box>

            {course.startDate && (
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Start Date:
                </Typography>
                <Typography variant="body2">
                  {new Date(course.startDate).toLocaleDateString()}
                </Typography>
              </Box>
            )}

            {course.endDate && (
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  End Date:
                </Typography>
                <Typography variant="body2">
                  {new Date(course.endDate).toLocaleDateString()}
                </Typography>
              </Box>
            )}       
          </Card>

          {/* Prerequisites */}
          {course.prerequisites && (
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Prerequisites
              </Typography>
              <List>
                {course.prerequisites.map((prereq, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={prereq}
                      primaryTypographyProps={{ variant: "body2" }}
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
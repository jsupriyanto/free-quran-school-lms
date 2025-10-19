"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import { useParams } from "next/navigation";
import courseCurriculumService from "@/services/course-curriculum.service";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ArticleIcon from "@mui/icons-material/Article";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function CourseCurriculumPage() {
  const params = useParams();
  const courseId = params.id;
  const [curriculum, setCurriculum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState("module-0");

  useEffect(() => {
    fetchCourseCurriculum();
  }, [courseId]);

  const fetchCourseCurriculum = async () => {
    try {
      setLoading(true);
      const response = await courseCurriculumService.getCourseCurriculumnByCourseId(courseId);
      if (response.data) {
        setCurriculum(response.data);
      } else {
        // Fallback with sample curriculum data
        const sampleCurriculum = [
          {
            id: 1,
            moduleTitle: "Introduction to Quranic Recitation",
            moduleDescription: "Learn the basics of Quranic recitation and its importance",
            orderIndex: 1,
            isCompleted: true,
            totalLessons: 4,
            completedLessons: 4,
            estimatedDuration: "2 hours",
            lessons: [
              {
                id: 1,
                lessonTitle: "Welcome to the Course",
                lessonType: "video",
                duration: "15 min",
                isCompleted: true,
                isLocked: false,
                description: "Course introduction and overview"
              },
              {
                id: 2,
                lessonTitle: "History of Quranic Recitation",
                lessonType: "video",
                duration: "25 min",
                isCompleted: true,
                isLocked: false,
                description: "Understanding the historical context"
              },
              {
                id: 3,
                lessonTitle: "Importance of Tajweed",
                lessonType: "reading",
                duration: "20 min",
                isCompleted: true,
                isLocked: false,
                description: "Reading material on Tajweed significance"
              },
              {
                id: 4,
                lessonTitle: "Module 1 Quiz",
                lessonType: "quiz",
                duration: "10 min",
                isCompleted: true,
                isLocked: false,
                description: "Test your understanding"
              }
            ]
          },
          {
            id: 2,
            moduleTitle: "Arabic Phonetics and Pronunciation",
            moduleDescription: "Master the correct pronunciation of Arabic letters and sounds",
            orderIndex: 2,
            isCompleted: false,
            totalLessons: 6,
            completedLessons: 2,
            estimatedDuration: "3 hours",
            lessons: [
              {
                id: 5,
                lessonTitle: "Arabic Alphabet Overview",
                lessonType: "video",
                duration: "30 min",
                isCompleted: true,
                isLocked: false,
                description: "Complete overview of Arabic letters"
              },
              {
                id: 6,
                lessonTitle: "Vowel Sounds (Harakat)",
                lessonType: "video",
                duration: "25 min",
                isCompleted: true,
                isLocked: false,
                description: "Learn about short and long vowels"
              },
              {
                id: 7,
                lessonTitle: "Consonant Articulation",
                lessonType: "video",
                duration: "35 min",
                isCompleted: false,
                isLocked: false,
                description: "Proper articulation of consonant sounds"
              },
              {
                id: 8,
                lessonTitle: "Practice Exercises",
                lessonType: "quiz",
                duration: "20 min",
                isCompleted: false,
                isLocked: false,
                description: "Interactive pronunciation exercises"
              },
              {
                id: 9,
                lessonTitle: "Common Pronunciation Mistakes",
                lessonType: "reading",
                duration: "15 min",
                isCompleted: false,
                isLocked: false,
                description: "Identify and correct common errors"
              },
              {
                id: 10,
                lessonTitle: "Module 2 Assessment",
                lessonType: "quiz",
                duration: "15 min",
                isCompleted: false,
                isLocked: true,
                description: "Comprehensive module assessment"
              }
            ]
          },
          {
            id: 3,
            moduleTitle: "Basic Tajweed Rules",
            moduleDescription: "Learn fundamental Tajweed rules for proper recitation",
            orderIndex: 3,
            isCompleted: false,
            totalLessons: 8,
            completedLessons: 0,
            estimatedDuration: "4 hours",
            lessons: [
              {
                id: 11,
                lessonTitle: "Introduction to Tajweed",
                lessonType: "video",
                duration: "20 min",
                isCompleted: false,
                isLocked: true,
                description: "What is Tajweed and why is it important"
              },
              {
                id: 12,
                lessonTitle: "Noon Sakinah Rules",
                lessonType: "video",
                duration: "40 min",
                isCompleted: false,
                isLocked: true,
                description: "Learn the four rules of Noon Sakinah"
              },
              {
                id: 13,
                lessonTitle: "Meem Sakinah Rules",
                lessonType: "video",
                duration: "30 min",
                isCompleted: false,
                isLocked: true,
                description: "Understanding Meem Sakinah applications"
              },
              {
                id: 14,
                lessonTitle: "Qalqalah (Echoing)",
                lessonType: "video",
                duration: "25 min",
                isCompleted: false,
                isLocked: true,
                description: "Learn the echoing sounds in Quran"
              },
              {
                id: 15,
                lessonTitle: "Madd (Elongation) Rules",
                lessonType: "video",
                duration: "45 min",
                isCompleted: false,
                isLocked: true,
                description: "Different types of elongation in recitation"
              },
              {
                id: 16,
                lessonTitle: "Practice Recitation 1",
                lessonType: "quiz",
                duration: "30 min",
                isCompleted: false,
                isLocked: true,
                description: "Apply learned rules in practice"
              },
              {
                id: 17,
                lessonTitle: "Advanced Tajweed Concepts",
                lessonType: "reading",
                duration: "25 min",
                isCompleted: false,
                isLocked: true,
                description: "Reading material for advanced concepts"
              },
              {
                id: 18,
                lessonTitle: "Module 3 Final Assessment",
                lessonType: "quiz",
                duration: "20 min",
                isCompleted: false,
                isLocked: true,
                description: "Comprehensive Tajweed assessment"
              }
            ]
          }
        ];
        setCurriculum(sampleCurriculum);
      }
    } catch (error) {
      console.error("Error fetching course curriculum:", error);
      // Use sample data on error
      const sampleCurriculum = [
        {
          id: 1,
          moduleTitle: "Introduction to Quranic Recitation",
          moduleDescription: "Learn the basics of Quranic recitation and its importance",
          orderIndex: 1,
          isCompleted: true,
          totalLessons: 4,
          completedLessons: 4,
          estimatedDuration: "2 hours",
          lessons: []
        }
      ];
      setCurriculum(sampleCurriculum);
    } finally {
      setLoading(false);
    }
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getLessonIcon = (lessonType, isCompleted) => {
    if (isCompleted) {
      return <CheckCircleIcon color="success" />;
    }

    switch (lessonType) {
      case "video":
        return <PlayCircleOutlineIcon color="primary" />;
      case "reading":
        return <ArticleIcon color="info" />;
      case "quiz":
        return <QuizIcon color="warning" />;
      default:
        return <PlayCircleOutlineIcon color="primary" />;
    }
  };

  const calculateOverallProgress = () => {
    if (curriculum.length === 0) return 0;
    
    const totalLessons = curriculum.reduce((sum, module) => sum + module.totalLessons, 0);
    const completedLessons = curriculum.reduce((sum, module) => sum + module.completedLessons, 0);
    
    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Typography>Loading curriculum...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Progress Overview */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Course Progress
          </Typography>
          <Chip 
            label={`${Math.round(calculateOverallProgress())}% Complete`}
            color="primary"
            sx={{ fontWeight: 600 }}
          />
        </Box>
        
        <LinearProgress 
          variant="determinate" 
          value={calculateOverallProgress()} 
          sx={{ 
            height: 8, 
            borderRadius: 4,
            mb: 2
          }} 
        />
        
        <Box sx={{ display: "flex", gap: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Modules: {curriculum.filter(m => m.isCompleted).length} / {curriculum.length} completed
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lessons: {curriculum.reduce((sum, module) => sum + module.completedLessons, 0)} / {curriculum.reduce((sum, module) => sum + module.totalLessons, 0)} completed
          </Typography>
        </Box>
      </Card>

      {/* Curriculum Modules */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {curriculum.map((module, index) => (
          <Card key={module.id} sx={{ overflow: "hidden" }}>
            <Accordion
              expanded={expanded === `module-${index}`}
              onChange={handleAccordionChange(`module-${index}`)}
              sx={{ boxShadow: "none" }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
                  {/* Module Number */}
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: module.isCompleted ? "success.main" : "primary.main",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      flexShrink: 0
                    }}
                  >
                    {module.isCompleted ? <CheckCircleIcon /> : index + 1}
                  </Box>

                  {/* Module Info */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {module.moduleTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {module.moduleDescription}
                    </Typography>
                    
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <AccessTimeIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {module.estimatedDuration}
                        </Typography>
                      </Box>
                      
                      <Typography variant="caption" color="text.secondary">
                        {module.completedLessons} / {module.totalLessons} lessons
                      </Typography>
                      
                      <LinearProgress
                        variant="determinate"
                        value={(module.completedLessons / module.totalLessons) * 100}
                        sx={{ width: 100, height: 4, borderRadius: 2 }}
                      />
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ pt: 0 }}>
                <List>
                  {module.lessons && module.lessons.map((lesson) => (
                    <ListItem
                      key={lesson.id}
                      sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 1,
                        mb: 1,
                        bgcolor: lesson.isCompleted ? "success.50" : "background.paper"
                      }}
                    >
                      <ListItemIcon>
                        {lesson.isLocked ? (
                          <LockIcon color="disabled" />
                        ) : (
                          getLessonIcon(lesson.lessonType, lesson.isCompleted)
                        )}
                      </ListItemIcon>
                      
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography 
                              variant="subtitle1" 
                              sx={{ 
                                fontWeight: 500,
                                color: lesson.isLocked ? "text.disabled" : "text.primary"
                              }}
                            >
                              {lesson.lessonTitle}
                            </Typography>
                            <Chip 
                              label={lesson.lessonType} 
                              size="small" 
                              variant="outlined"
                              sx={{ fontSize: "10px", height: "20px" }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              {lesson.description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Duration: {lesson.duration}
                            </Typography>
                          </Box>
                        }
                      />
                      
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {lesson.isCompleted && (
                          <Chip 
                            label="Completed" 
                            size="small" 
                            color="success"
                            sx={{ fontSize: "11px" }}
                          />
                        )}
                        
                        <Button
                          size="small"
                          variant={lesson.isCompleted ? "outlined" : "contained"}
                          disabled={lesson.isLocked}
                          sx={{ minWidth: "80px" }}
                        >
                          {lesson.isCompleted ? "Review" : lesson.isLocked ? "Locked" : "Start"}
                        </Button>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
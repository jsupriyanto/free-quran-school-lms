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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Editor,
  EditorProvider,
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

// HTML sanitization function for descriptions
const sanitizeHtml = (html) => {
  if (!html) return "";
  
  // Basic client-side sanitization - only run on client
  if (typeof window === 'undefined') return html;
  
  try {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Remove script tags and event handlers
    const scripts = tempDiv.querySelectorAll('script');
    scripts.forEach(script => script.remove());
    
    // Remove on* event attributes and dangerous tags
    const allElements = tempDiv.querySelectorAll('*');
    allElements.forEach(element => {
      // Remove dangerous tags
      if (['script', 'iframe', 'object', 'embed', 'form'].includes(element.tagName.toLowerCase())) {
        element.remove();
        return;
      }
      
      // Remove event handler attributes
      Array.from(element.attributes).forEach(attr => {
        if (attr.name.toLowerCase().startsWith('on') || 
            ['javascript:', 'vbscript:', 'data:'].some(prefix => 
              attr.value.toLowerCase().includes(prefix))) {
          element.removeAttribute(attr.name);
        }
      });
    });
    
    return tempDiv.innerHTML;
  } catch (error) {
    console.warn('HTML sanitization failed:', error);
    return html; // Fallback to original HTML
  }
};

export default function CourseCurriculumPage() {
  const params = useParams();
  const courseId = params.id;
  const [curriculum, setCurriculum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState("module-0");
  
  // Edit states
  const [editingModule, setEditingModule] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);
  const [editModuleDialogOpen, setEditModuleDialogOpen] = useState(false);
  const [editLessonDialogOpen, setEditLessonDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    duration: "",
    type: "video"
  });

  // Add new curriculum states
  const [addModuleDialogOpen, setAddModuleDialogOpen] = useState(false);
  const [addLessonDialogOpen, setAddLessonDialogOpen] = useState(false);
  const [addingToModule, setAddingToModule] = useState(null);
  const [addFormData, setAddFormData] = useState({
    title: "",
    description: "",
    duration: "",
    type: "video",
    orderIndex: 0
  });

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
            title: "Introduction to Quranic Recitation",
            description: "<p>Learn the <strong>basics</strong> of Quranic recitation and its <em>importance</em> in Islamic practice.</p><p>This module covers:</p><ul><li>Historical context</li><li>Spiritual significance</li><li>Basic principles</li></ul>",
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
                description: "<p><strong>Welcome</strong> to this comprehensive course on Quranic recitation!</p><p>In this introductory lesson, you will learn:</p><ul><li>Course structure and objectives</li><li>What to expect in each module</li></ul>"
              },
              {
                id: 2,
                lessonTitle: "History of Quranic Recitation",
                lessonType: "video",
                duration: "25 min",
                isCompleted: true,
                isLocked: false,
                description: "<p>Understanding the <em>historical context</em> of Quranic recitation.</p><p><strong>Topics covered:</strong></p><ol><li>Origins in the time of Prophet Muhammad (PBUH)</li><li>Development through the centuries</li></ol>"
              },
              {
                id: 3,
                lessonTitle: "Importance of Tajweed",
                lessonType: "reading",
                duration: "20 min",
                isCompleted: true,
                isLocked: false,
                description: "<p>Comprehensive reading material on <strong>Tajweed significance</strong>.</p><p>Learn why proper pronunciation is crucial for:</p><ul><li>Correct meaning preservation</li><li>Spiritual connection</li></ul>"
              },
              {
                id: 4,
                lessonTitle: "Module 1 Quiz",
                lessonType: "quiz",
                duration: "10 min",
                isCompleted: true,
                isLocked: false,
                description: "<p><strong>Test your understanding</strong> of the introductory concepts.</p><p>This quiz covers <em>all materials</em> from Module 1.</p>"
              }
            ]
          },
          {
            id: 2,
            title: "Arabic Phonetics and Pronunciation",
            description: "<p><strong>Master</strong> the correct pronunciation of Arabic letters and sounds.</p><p>This advanced module includes:</p><ul><li>Phonetic analysis</li><li>Articulation points</li><li>Common mistakes to avoid</li></ul>",
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
            title: "Basic Tajweed Rules",
            description: "Learn fundamental Tajweed rules for proper recitation",
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
          title: "Introduction to Quranic Recitation",
          description: "Learn the basics of Quranic recitation and its importance",
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

  // Edit Module Functions
  const handleEditModule = (module) => {
    setEditingModule(module);
    setEditFormData({
      title: module.title,
      description: module.description,
      duration: module.estimatedDuration,
      type: "module"
    });
    setEditModuleDialogOpen(true);
  };

  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
    setEditFormData({
      title: lesson.lessonTitle,
      description: lesson.description,
      duration: lesson.duration,
      type: lesson.lessonType
    });
    setEditLessonDialogOpen(true);
  };

  const handleSaveModule = async () => {
    try {
      const updatedModule = {
        ...editingModule,
        title: editFormData.title,
        description: editFormData.description,
        estimatedDuration: editFormData.duration
      };

      await courseCurriculumService.updateCourseCurriculum(editingModule.id, updatedModule);
      
      // Update local state
      setCurriculum(prev => prev.map(module => 
        module.id === editingModule.id ? updatedModule : module
      ));
      
      setEditModuleDialogOpen(false);
      setEditingModule(null);
    } catch (error) {
      console.error("Error updating module:", error);
    }
  };

  const handleSaveLesson = async () => {
    try {
      const updatedLesson = {
        ...editingLesson,
        lessonTitle: editFormData.title,
        description: editFormData.description,
        duration: editFormData.duration,
        lessonType: editFormData.type
      };

      // Since lessons are part of modules, we need to update the entire module
      const moduleToUpdate = curriculum.find(module => 
        module.lessons.some(lesson => lesson.id === editingLesson.id)
      );

      if (moduleToUpdate) {
        const updatedModule = {
          ...moduleToUpdate,
          lessons: moduleToUpdate.lessons.map(lesson =>
            lesson.id === editingLesson.id ? updatedLesson : lesson
          )
        };

        await courseCurriculumService.updateCourseCurriculum(moduleToUpdate.id, updatedModule);
        
        // Update local state
        setCurriculum(prev => prev.map(module => 
          module.id === moduleToUpdate.id ? updatedModule : module
        ));
      }
      
      setEditLessonDialogOpen(false);
      setEditingLesson(null);
    } catch (error) {
      console.error("Error updating lesson:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditModuleDialogOpen(false);
    setEditLessonDialogOpen(false);
    setEditingModule(null);
    setEditingLesson(null);
    setEditFormData({
      title: "",
      description: "",
      duration: "",
      type: "video"
    });
  };

  // Add new module/lesson functions
  const handleAddModule = () => {
    setAddFormData({
      title: "",
      description: "",
      duration: "",
      type: "module",
      orderIndex: curriculum.length + 1
    });
    setAddModuleDialogOpen(true);
  };

  const handleAddLesson = (module) => {
    setAddingToModule(module);
    setAddFormData({
      title: "",
      description: "",
      duration: "",
      type: "video",
      orderIndex: (module.lessons?.length || 0) + 1
    });
    setAddLessonDialogOpen(true);
  };

  const handleSaveNewModule = async () => {
    try {
      const newModule = {
        id: Date.now(), // Temporary ID for development
        title: addFormData.title,
        description: addFormData.description,
        estimatedDuration: addFormData.duration,
        orderIndex: addFormData.orderIndex,
        isCompleted: false,
        totalLessons: 0,
        completedLessons: 0,
        lessons: []
      };

      // In production, you would call the API here
      await courseCurriculumService.create({
        ...newModule,
        courseId: courseId
      });

      // Update local state
      setCurriculum(prev => [...prev, newModule]);
      
      setAddModuleDialogOpen(false);
      setAddFormData({
        title: "",
        description: "",
        duration: "",
        type: "video",
        orderIndex: 0
      });
    } catch (error) {
      console.error("Error creating module:", error);
      // For development, still add to local state even if API fails
      const newModule = {
        id: Date.now(),
        title: addFormData.title,
        description: addFormData.description,
        estimatedDuration: addFormData.duration,
        orderIndex: addFormData.orderIndex,
        isCompleted: false,
        totalLessons: 0,
        completedLessons: 0,
        lessons: []
      };
      setCurriculum(prev => [...prev, newModule]);
      setAddModuleDialogOpen(false);
    }
  };

  const handleSaveNewLesson = async () => {
    try {
      const newLesson = {
        id: Date.now(), // Temporary ID for development
        lessonTitle: addFormData.title,
        description: addFormData.description,
        duration: addFormData.duration,
        lessonType: addFormData.type,
        isCompleted: false,
        isLocked: false
      };

      // Update the module to include the new lesson
      const updatedModule = {
        ...addingToModule,
        lessons: [...(addingToModule.lessons || []), newLesson],
        totalLessons: (addingToModule.totalLessons || 0) + 1
      };

      // In production, you would call the API here
      await courseCurriculumService.updateCourseCurriculum(addingToModule.id, updatedModule);

      // Update local state
      setCurriculum(prev => prev.map(module => 
        module.id === addingToModule.id ? updatedModule : module
      ));
      
      setAddLessonDialogOpen(false);
      setAddingToModule(null);
      setAddFormData({
        title: "",
        description: "",
        duration: "",
        type: "video",
        orderIndex: 0
      });
    } catch (error) {
      console.error("Error creating lesson:", error);
      // For development, still add to local state even if API fails
      const newLesson = {
        id: Date.now(),
        lessonTitle: addFormData.title,
        description: addFormData.description,
        duration: addFormData.duration,
        lessonType: addFormData.type,
        isCompleted: false,
        isLocked: false
      };

      const updatedModule = {
        ...addingToModule,
        lessons: [...(addingToModule.lessons || []), newLesson],
        totalLessons: (addingToModule.totalLessons || 0) + 1
      };

      setCurriculum(prev => prev.map(module => 
        module.id === addingToModule.id ? updatedModule : module
      ));
      setAddLessonDialogOpen(false);
      setAddingToModule(null);
    }
  };

  const handleCancelAdd = () => {
    setAddModuleDialogOpen(false);
    setAddLessonDialogOpen(false);
    setAddingToModule(null);
    setAddFormData({
      title: "",
      description: "",
      duration: "",
      type: "video",
      orderIndex: 0
    });
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
        
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Modules: {curriculum.filter(m => m.isCompleted).length} / {curriculum.length} completed
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lessons: {curriculum.reduce((sum, module) => sum + module.completedLessons, 0)} / {curriculum.reduce((sum, module) => sum + module.totalLessons, 0)} completed
            </Typography>
          </Box>
          
          <Button
            onClick={handleAddModule}
            variant="contained"
            startIcon={<AddIcon />}
            size="small"
            sx={{
              textTransform: "capitalize",
              borderRadius: "7px",
              fontWeight: "500",
              fontSize: "13px",
              color: "#fff !important"
            }}
          >
            Add Module
          </Button>
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
                      {module.title}
                    </Typography>
                    <Box 
                      sx={{ 
                        mb: 1,
                        color: "text.secondary",
                        fontSize: "0.875rem",
                        "& p": { margin: "0.25em 0" },
                        "& p:first-of-type": { marginTop: 0 },
                        "& p:last-of-type": { marginBottom: 0 },
                        "& strong, & b": { fontWeight: "bold" },
                        "& em, & i": { fontStyle: "italic" },
                        "& u": { textDecoration: "underline" },
                        "& ul, & ol": { paddingLeft: "1.2em", margin: "0.25em 0" },
                        "& li": { margin: "0.1em 0" },
                        "& a": { 
                          color: "primary.main", 
                          textDecoration: "underline",
                          "&:hover": { textDecoration: "none" }
                        }
                      }}
                      dangerouslySetInnerHTML={{ 
                        __html: sanitizeHtml(module.description || "")
                      }}
                    />
                    
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
                  
                  {/* Edit Button */}
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditModule(module);
                    }}
                    size="small"
                    sx={{ ml: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
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
                            <Box
                              sx={{ 
                                mb: 0.5,
                                color: "text.secondary",
                                fontSize: "0.875rem",
                                "& p": { margin: "0.25em 0" },
                                "& p:first-of-type": { marginTop: 0 },
                                "& p:last-of-type": { marginBottom: 0 },
                                "& strong, & b": { fontWeight: "bold" },
                                "& em, & i": { fontStyle: "italic" },
                                "& u": { textDecoration: "underline" },
                                "& ul, & ol": { paddingLeft: "1.2em", margin: "0.25em 0" },
                                "& li": { margin: "0.1em 0" },
                                "& a": { 
                                  color: "primary.main", 
                                  textDecoration: "underline",
                                  "&:hover": { textDecoration: "none" }
                                }
                              }}
                              dangerouslySetInnerHTML={{ 
                                __html: sanitizeHtml(lesson.description || "")
                              }}
                            />
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
                        
                        <IconButton
                          size="small"
                          onClick={() => handleEditLesson(lesson)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        
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
                  
                  {/* Add Lesson Button */}
                  <ListItem>
                    <Button
                      onClick={() => handleAddLesson(module)}
                      variant="outlined"
                      startIcon={<AddIcon />}
                      fullWidth
                      sx={{
                        mt: 1,
                        textTransform: "capitalize",
                        borderRadius: "7px",
                        fontWeight: "500",
                        fontSize: "13px",
                        borderStyle: "dashed"
                      }}
                    >
                      Add New Lesson
                    </Button>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </Card>
        ))}
      </Box>

      {/* Edit Module Dialog */}
      <Dialog open={editModuleDialogOpen} onClose={handleCancelEdit} maxWidth="md" fullWidth>
        <DialogTitle>Edit Module</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Module Title"
              value={editFormData.title}
              onChange={(e) => setEditFormData(prev => ({ ...prev, title: e.target.value }))}
              sx={{ mb: 2 }}
            />
            
            <Typography variant="h6" sx={{ mb: 1 }}>Module Description</Typography>
            <EditorProvider>
              <Editor
                value={editFormData.description}
                onChange={(e) => setEditFormData(prev => ({ ...prev, description: e.target.value }))}
                style={{ minHeight: "200px" }}
                className="rsw-editor"
              >
                <Toolbar>
                  <BtnUndo />
                  <BtnRedo />
                  <Separator />
                  <BtnBold />
                  <BtnItalic />
                  <BtnUnderline />
                  <BtnStrikeThrough />
                  <Separator />
                  <BtnNumberedList />
                  <BtnBulletList />
                  <Separator />
                  <BtnLink />
                  <BtnClearFormatting />
                  <HtmlButton />
                  <Separator />
                  <BtnStyles />
                </Toolbar>
              </Editor>
            </EditorProvider>

            <TextField
              fullWidth
              label="Estimated Duration"
              value={editFormData.duration}
              onChange={(e) => setEditFormData(prev => ({ ...prev, duration: e.target.value }))}
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} startIcon={<CancelIcon />}>
            Cancel
          </Button>
          <Button onClick={handleSaveModule} variant="contained" startIcon={<SaveIcon />}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Lesson Dialog */}
      <Dialog open={editLessonDialogOpen} onClose={handleCancelEdit} maxWidth="md" fullWidth>
        <DialogTitle>Edit Lesson</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Lesson Title"
              value={editFormData.title}
              onChange={(e) => setEditFormData(prev => ({ ...prev, title: e.target.value }))}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Lesson Type</InputLabel>
              <Select
                value={editFormData.type}
                label="Lesson Type"
                onChange={(e) => setEditFormData(prev => ({ ...prev, type: e.target.value }))}
              >
                <MenuItem value="video">Video</MenuItem>
                <MenuItem value="reading">Reading</MenuItem>
                <MenuItem value="quiz">Quiz</MenuItem>
              </Select>
            </FormControl>
            
            <Typography variant="h6" sx={{ mb: 1 }}>Lesson Description</Typography>
            <EditorProvider>
              <Editor
                value={editFormData.description}
                onChange={(e) => setEditFormData(prev => ({ ...prev, description: e.target.value }))}
                style={{ minHeight: "200px" }}
                className="rsw-editor"
              >
                <Toolbar>
                  <BtnUndo />
                  <BtnRedo />
                  <Separator />
                  <BtnBold />
                  <BtnItalic />
                  <BtnUnderline />
                  <BtnStrikeThrough />
                  <Separator />
                  <BtnNumberedList />
                  <BtnBulletList />
                  <Separator />
                  <BtnLink />
                  <BtnClearFormatting />
                  <HtmlButton />
                  <Separator />
                  <BtnStyles />
                </Toolbar>
              </Editor>
            </EditorProvider>

            <TextField
              fullWidth
              label="Duration"
              value={editFormData.duration}
              onChange={(e) => setEditFormData(prev => ({ ...prev, duration: e.target.value }))}
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} startIcon={<CancelIcon />}>
            Cancel
          </Button>
          <Button onClick={handleSaveLesson} variant="contained" startIcon={<SaveIcon />}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add New Module Dialog */}
      <Dialog open={addModuleDialogOpen} onClose={handleCancelAdd} maxWidth="md" fullWidth>
        <DialogTitle>Add New Module</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Module Title"
              value={addFormData.title}
              onChange={(e) => setAddFormData(prev => ({ ...prev, title: e.target.value }))}
              sx={{ mb: 2 }}
            />
            
            <Typography variant="h6" sx={{ mb: 1 }}>Module Description</Typography>
            <EditorProvider>
              <Editor
                value={addFormData.description}
                onChange={(e) => setAddFormData(prev => ({ ...prev, description: e.target.value }))}
                style={{ minHeight: "200px" }}
                className="rsw-editor"
              >
                <Toolbar>
                  <BtnUndo />
                  <BtnRedo />
                  <Separator />
                  <BtnBold />
                  <BtnItalic />
                  <BtnUnderline />
                  <BtnStrikeThrough />
                  <Separator />
                  <BtnNumberedList />
                  <BtnBulletList />
                  <Separator />
                  <BtnLink />
                  <BtnClearFormatting />
                  <HtmlButton />
                  <Separator />
                  <BtnStyles />
                </Toolbar>
              </Editor>
            </EditorProvider>

            <TextField
              fullWidth
              label="Estimated Duration"
              value={addFormData.duration}
              onChange={(e) => setAddFormData(prev => ({ ...prev, duration: e.target.value }))}
              sx={{ mt: 2 }}
              placeholder="e.g., 2 hours"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelAdd} startIcon={<CancelIcon />}>
            Cancel
          </Button>
          <Button onClick={handleSaveNewModule} variant="contained" startIcon={<SaveIcon />}>
            Create Module
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add New Lesson Dialog */}
      <Dialog open={addLessonDialogOpen} onClose={handleCancelAdd} maxWidth="md" fullWidth>
        <DialogTitle>Add New Lesson</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Lesson Title"
              value={addFormData.title}
              onChange={(e) => setAddFormData(prev => ({ ...prev, title: e.target.value }))}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Lesson Type</InputLabel>
              <Select
                value={addFormData.type}
                label="Lesson Type"
                onChange={(e) => setAddFormData(prev => ({ ...prev, type: e.target.value }))}
              >
                <MenuItem value="video">Video</MenuItem>
                <MenuItem value="reading">Reading</MenuItem>
                <MenuItem value="quiz">Quiz</MenuItem>
              </Select>
            </FormControl>
            
            <Typography variant="h6" sx={{ mb: 1 }}>Lesson Description</Typography>
            <EditorProvider>
              <Editor
                value={addFormData.description}
                onChange={(e) => setAddFormData(prev => ({ ...prev, description: e.target.value }))}
                style={{ minHeight: "200px" }}
                className="rsw-editor"
              >
                <Toolbar>
                  <BtnUndo />
                  <BtnRedo />
                  <Separator />
                  <BtnBold />
                  <BtnItalic />
                  <BtnUnderline />
                  <BtnStrikeThrough />
                  <Separator />
                  <BtnNumberedList />
                  <BtnBulletList />
                  <Separator />
                  <BtnLink />
                  <BtnClearFormatting />
                  <HtmlButton />
                  <Separator />
                  <BtnStyles />
                </Toolbar>
              </Editor>
            </EditorProvider>

            <TextField
              fullWidth
              label="Duration"
              value={addFormData.duration}
              onChange={(e) => setAddFormData(prev => ({ ...prev, duration: e.target.value }))}
              sx={{ mt: 2 }}
              placeholder="e.g., 25 min"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelAdd} startIcon={<CancelIcon />}>
            Cancel
          </Button>
          <Button onClick={handleSaveNewLesson} variant="contained" startIcon={<SaveIcon />}>
            Create Lesson
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
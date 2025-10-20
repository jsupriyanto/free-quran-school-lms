"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Avatar,
  Button,
  Chip,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  IconButton
} from "@mui/material";
import { useParams } from "next/navigation";
import courseTeacherService from "@/services/course-teacher.service";
import teacherService from "@/services/teacher.service";
import AddIcon from "@mui/icons-material/Add";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import LanguageIcon from "@mui/icons-material/Language";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
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

export default function CourseTeachersPage() {
  const params = useParams();
  const courseId = params.id;
  const [courseTeachers, setCourseTeachers] = useState([]);
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedRole, setSelectedRole] = useState("instructor");
  
  // Edit teacher states
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editTeacherDialogOpen, setEditTeacherDialogOpen] = useState(false);
  const [editTeacherData, setEditTeacherData] = useState({
    bio: "",
    specialization: "",
    role: "instructor"
  });

  useEffect(() => {
    fetchCourseTeachers();
    fetchAvailableTeachers();
  }, [courseId]);

  const fetchCourseTeachers = async () => {
    try {
      setLoading(true);
      const response = await courseTeacherService.getTeachersByCourseId(courseId);
      if (response.data) {
        setCourseTeachers(response.data);
      } else {
        // Fallback with sample teacher data
        const sampleTeachers = [
          {
            id: 1,
            teacherId: 1,
            courseId: parseInt(courseId),
            role: "Lead Instructor",
            assignedDate: "2024-01-15",
            isActive: true,
            teacher: {
              id: 1,
              firstName: "Sheikh Ahmad",
              lastName: "Ali",
              email: "sheikh.ahmad@example.com",
              phoneNumber: "+1234567890",
              profilePictureUrl: "/images/teacher1.jpg",
              specializations: ["Tajweed", "Quranic Recitation", "Arabic Grammar"],
              qualifications: ["PhD in Islamic Studies", "Certified Qira'at Scholar"],
              experienceYears: 15,
              languages: ["Arabic", "English", "Urdu"],
              rating: 4.9,
              totalStudents: 1200,
              biography: "Sheikh Ahmad Ali is a renowned Quran recitation expert with over 15 years of teaching experience. He has memorized the Quran with multiple Qira'at and holds advanced degrees in Islamic studies."
            }
          },
          {
            id: 2,
            teacherId: 2,
            courseId: parseInt(courseId),
            role: "Assistant Instructor",
            assignedDate: "2024-01-20",
            isActive: true,
            teacher: {
              id: 2,
              firstName: "Ustadha Fatima",
              lastName: "Hassan",
              email: "ustadha.fatima@example.com",
              phoneNumber: "+1234567891",
              profilePictureUrl: "/images/teacher2.jpg",
              specializations: ["Arabic Phonetics", "Beginner Tajweed"],
              qualifications: ["Master's in Arabic Literature", "Ijazah in Quran Recitation"],
              experienceYears: 8,
              languages: ["Arabic", "English"],
              rating: 4.8,
              totalStudents: 650,
              biography: "Ustadha Fatima specializes in teaching Arabic phonetics and basic Tajweed rules. She has a gentle approach perfect for beginners and has helped hundreds of students improve their recitation."
            }
          }
        ];
        setCourseTeachers(sampleTeachers);
      }
    } catch (error) {
      console.error("Error fetching course teachers:", error);
      setCourseTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableTeachers = async () => {
    try {
      const response = await teacherService.getAll();
      if (response.data) {
        // Filter out teachers already assigned to this course
        const assigned = courseTeachers.map(ct => ct.teacherId);
        setAvailableTeachers(response.data.filter(t => !assigned.includes(t.id)));
      } else {
        // Sample available teachers
        const sampleAvailable = [
          {
            id: 3,
            firstName: "Dr. Omar",
            lastName: "Abdullah",
            email: "dr.omar@example.com",
            specializations: ["Advanced Tajweed", "Quranic Sciences"],
            experienceYears: 12
          },
          {
            id: 4,
            firstName: "Ustadh Yusuf",
            lastName: "Ibrahim",
            email: "ustadh.yusuf@example.com",
            specializations: ["Arabic Grammar", "Tafseer"],
            experienceYears: 10
          }
        ];
        setAvailableTeachers(sampleAvailable);
      }
    } catch (error) {
      console.error("Error fetching available teachers:", error);
      setAvailableTeachers([]);
    }
  };

  const handleAssignTeacher = async () => {
    if (!selectedTeacher || !selectedRole) return;

    try {
      const assignmentData = {
        courseId: parseInt(courseId),
        teacherId: parseInt(selectedTeacher),
        role: selectedRole
      };

      const response = await courseTeacherService.assignTeacherToCourse(assignmentData);
      if (response.data) {
        setCourseTeachers(prev => [...prev, response.data]);
      } else {
        // Fallback for development
        const teacher = availableTeachers.find(t => t.id === parseInt(selectedTeacher));
        const newAssignment = {
          id: Date.now(),
          teacherId: teacher.id,
          courseId: parseInt(courseId),
          role: selectedRole,
          assignedDate: new Date().toISOString().split('T')[0],
          isActive: true,
          teacher: teacher
        };
        setCourseTeachers(prev => [...prev, newAssignment]);
      }

      // Remove from available teachers
      setAvailableTeachers(prev => prev.filter(t => t.id !== parseInt(selectedTeacher)));
      
      setAssignModalOpen(false);
      setSelectedTeacher("");
      setSelectedRole("instructor");
    } catch (error) {
      console.error("Error assigning teacher:", error);
    }
  };

  const handleRemoveTeacher = async (assignmentId, teacherId) => {
    if (!window.confirm("Are you sure you want to remove this teacher from the course?")) return;

    try {
      await courseTeacherService.removeTeacherFromCourse(assignmentId);
      
      // Remove from course teachers
      const removedTeacher = courseTeachers.find(ct => ct.id === assignmentId);
      setCourseTeachers(prev => prev.filter(ct => ct.id !== assignmentId));
      
      // Add back to available teachers if we have teacher data
      if (removedTeacher && removedTeacher.teacher) {
        setAvailableTeachers(prev => [...prev, removedTeacher.teacher]);
      }
    } catch (error) {
      console.error("Error removing teacher:", error);
    }
  };

  const handleUpdateRole = async (assignmentId, newRole) => {
    try {
      await courseTeacherService.updateTeacherRoleInCourse(assignmentId, { role: newRole });
      setCourseTeachers(prev =>
        prev.map(ct => ct.id === assignmentId ? { ...ct, role: newRole } : ct)
      );
    } catch (error) {
      console.error("Error updating teacher role:", error);
    }
  };

  // Edit Teacher Functions
  const handleEditTeacher = (courseTeacher) => {
    setEditingTeacher(courseTeacher);
    setEditTeacherData({
      bio: courseTeacher.teacher.bio || "",
      specialization: courseTeacher.teacher.specialization || "",
      role: courseTeacher.role
    });
    setEditTeacherDialogOpen(true);
  };

  const handleSaveTeacher = async () => {
    try {
      // Update teacher info
      if (editTeacherData.bio !== editingTeacher.teacher.bio || 
          editTeacherData.specialization !== editingTeacher.teacher.specialization) {
        await teacherService.updateTeacher(editingTeacher.teacher.id, {
          bio: editTeacherData.bio,
          specialization: editTeacherData.specialization
        });
      }

      // Update role if changed
      if (editTeacherData.role !== editingTeacher.role) {
        await courseTeacherService.updateTeacherRoleInCourse(editingTeacher.id, {
          role: editTeacherData.role
        });
      }
      
      // Update local state
      setCourseTeachers(prev => prev.map(ct => 
        ct.id === editingTeacher.id 
          ? {
              ...ct,
              role: editTeacherData.role,
              teacher: {
                ...ct.teacher,
                bio: editTeacherData.bio,
                specialization: editTeacherData.specialization
              }
            }
          : ct
      ));
      
      setEditTeacherDialogOpen(false);
      setEditingTeacher(null);
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  const handleCancelEditTeacher = () => {
    setEditTeacherDialogOpen(false);
    setEditingTeacher(null);
    setEditTeacherData({
      bio: "",
      specialization: "",
      role: "instructor"
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Typography>Loading course teachers...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Course Instructors ({courseTeachers.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAssignModalOpen(true)}
          sx={{ textTransform: "none" }}
          disabled={availableTeachers.length === 0}
        >
          Assign Teacher
        </Button>
      </Box>

      {/* Teachers Grid */}
      <Grid container spacing={3}>
        {courseTeachers.map((courseTeacher) => {
          const teacher = courseTeacher.teacher;
          if (!teacher) return null;

          return (
            <Grid item xs={12} md={6} key={courseTeacher.id}>
              <Card sx={{ p: 3, height: "100%" }}>
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                  <Avatar
                    src={teacher.profilePictureUrl}
                    alt={teacher.firstName}
                    sx={{ width: 80, height: 80 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {teacher.firstName} {teacher.lastName}
                      </Typography>
                      <Chip 
                        label={courseTeacher.role} 
                        size="small" 
                        color="primary"
                        sx={{ fontSize: "11px" }}
                      />
                    </Box>
                    
                    {teacher.rating && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <Rating value={teacher.rating} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary">
                          ({teacher.rating})
                        </Typography>
                      </Box>
                    )}

                    <Typography variant="body2" color="text.secondary">
                      {teacher.experienceYears} years experience • {teacher.totalStudents || 0} students taught
                    </Typography>
                  </Box>
                </Box>

                {/* Teacher Details */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {teacher.biography || "Experienced educator specializing in Quranic studies and Islamic education."}
                  </Typography>

                  <List dense>
                    {teacher.email && (
                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <EmailIcon fontSize="small" color="action" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={teacher.email}
                          primaryTypographyProps={{ variant: "body2" }}
                        />
                      </ListItem>
                    )}

                    {teacher.phoneNumber && (
                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <PhoneIcon fontSize="small" color="action" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={teacher.phoneNumber}
                          primaryTypographyProps={{ variant: "body2" }}
                        />
                      </ListItem>
                    )}

                    {teacher.languages && teacher.languages.length > 0 && (
                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <LanguageIcon fontSize="small" color="action" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={teacher.languages.join(", ")}
                          primaryTypographyProps={{ variant: "body2" }}
                        />
                      </ListItem>
                    )}
                  </List>
                </Box>

                {/* Specializations */}
                {teacher.specializations && teacher.specializations.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                      Specializations
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {teacher.specializations.map((spec, index) => (
                        <Chip 
                          key={index}
                          label={spec} 
                          size="small" 
                          variant="outlined"
                          sx={{ fontSize: "10px" }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Qualifications */}
                {teacher.qualifications && teacher.qualifications.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                      Qualifications
                    </Typography>
                    <List dense>
                      {teacher.qualifications.map((qual, index) => (
                        <ListItem key={index} sx={{ px: 0, py: 0.25 }}>
                          <ListItemIcon sx={{ minWidth: 20 }}>
                            <SchoolIcon fontSize="small" color="action" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={qual}
                            primaryTypographyProps={{ variant: "body2" }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                <Divider sx={{ mb: 2 }} />

                {/* Actions */}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={courseTeacher.role}
                      label="Role"
                      onChange={(e) => handleUpdateRole(courseTeacher.id, e.target.value)}
                    >
                      <MenuItem value="Lead Instructor">Lead Instructor</MenuItem>
                      <MenuItem value="Assistant Instructor">Assistant</MenuItem>
                      <MenuItem value="Teaching Assistant">TA</MenuItem>
                      <MenuItem value="Guest Lecturer">Guest</MenuItem>
                    </Select>
                  </FormControl>

                  <IconButton
                    size="small"
                    onClick={() => handleEditTeacher(courseTeacher)}
                    sx={{ color: "primary.main" }}
                  >
                    <EditIcon />
                  </IconButton>

                  <Button
                    size="small"
                    color="error"
                    startIcon={<RemoveCircleIcon />}
                    onClick={() => handleRemoveTeacher(courseTeacher.id, teacher.id)}
                    sx={{ textTransform: "none" }}
                  >
                    Remove
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}

        {courseTeachers.length === 0 && (
          <Grid item xs={12}>
            <Card sx={{ p: 4, textAlign: "center" }}>
              <SchoolIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                No Teachers Assigned
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Assign teachers to this course to help students learn effectively.
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setAssignModalOpen(true)}
                disabled={availableTeachers.length === 0}
              >
                Assign First Teacher
              </Button>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Assign Teacher Modal */}
      <Dialog open={assignModalOpen} onClose={() => setAssignModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Assign Teacher to Course</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Select Teacher</InputLabel>
              <Select
                value={selectedTeacher}
                label="Select Teacher"
                onChange={(e) => setSelectedTeacher(e.target.value)}
              >
                {availableTeachers.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    <Box>
                      <Typography variant="body1">{teacher.firstName} {teacher.lastName}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {teacher.specializations?.join(", ")} • {teacher.experienceYears} years exp.
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={selectedRole}
                label="Role"
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <MenuItem value="Lead Instructor">Lead Instructor</MenuItem>
                <MenuItem value="Assistant Instructor">Assistant Instructor</MenuItem>
                <MenuItem value="Teaching Assistant">Teaching Assistant</MenuItem>
                <MenuItem value="Guest Lecturer">Guest Lecturer</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignModalOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAssignTeacher}
            variant="contained"
            disabled={!selectedTeacher || !selectedRole}
          >
            Assign Teacher
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Teacher Dialog */}
      <Dialog open={editTeacherDialogOpen} onClose={handleCancelEditTeacher} maxWidth="md" fullWidth>
        <DialogTitle>Edit Teacher Information</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Role in Course</InputLabel>
              <Select
                value={editTeacherData.role}
                label="Role in Course"
                onChange={(e) => setEditTeacherData(prev => ({ ...prev, role: e.target.value }))}
              >
                <MenuItem value="Lead Instructor">Lead Instructor</MenuItem>
                <MenuItem value="Assistant Instructor">Assistant Instructor</MenuItem>
                <MenuItem value="Teaching Assistant">Teaching Assistant</MenuItem>
                <MenuItem value="Guest Lecturer">Guest Lecturer</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Specialization"
              value={editTeacherData.specialization}
              onChange={(e) => setEditTeacherData(prev => ({ ...prev, specialization: e.target.value }))}
              sx={{ mb: 2 }}
            />
            
            <Typography variant="h6" sx={{ mb: 1 }}>Teacher Bio</Typography>
            <EditorProvider>
              <Editor
                value={editTeacherData.bio}
                onChange={(e) => setEditTeacherData(prev => ({ ...prev, bio: e.target.value }))}
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEditTeacher} startIcon={<CancelIcon />}>
            Cancel
          </Button>
          <Button onClick={handleSaveTeacher} variant="contained" startIcon={<SaveIcon />}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
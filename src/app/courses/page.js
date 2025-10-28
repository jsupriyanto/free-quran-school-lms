"use client";
import { useEffect } from "react";
import * as React from "react";
import Image from "next/image";
import { Box, Typography, Chip, Rating } from "@mui/material";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Checkbox from "@mui/material/Checkbox";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PageTitle from "@/components/Common/PageTitle";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import courseService from "@/services/course.service";
import courseCategoryService from "@/services/course-category.service";
import ImageUpload from "@/components/Common/ImageUpload";
import { useSearch } from "@/contexts/SearchContext";
import { useRouter } from "next/navigation";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
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

// Styled components
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// Table pagination actions component
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function CoursesPage() {
  const router = useRouter();
  const { globalSearchTerm } = useSearch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [courses, setCourses] = React.useState([]);
  const [filteredCourses, setFilteredCourses] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selected, setSelected] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState("title");
  const [order, setOrder] = React.useState("asc");

  // Modal states
  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [currentCourse, setCurrentCourse] = React.useState(null);

  // Form states
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    skillLevel: "",
    duration: "",
    numberOfLessons: "",
    courseCategory: "",
    coursePictureUrl: "",
    isActive: true,
    startDate: "",
    endDate: "",
  });

  const [formErrors, setFormErrors] = React.useState({});

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, globalSearchTerm]);

  // Debug formData changes
  useEffect(() => {
    if (editMode) {
      // Form data updated for editing mode
    }
  }, [formData, editMode]);

  const fetchCategories = async () => {
    try {
      const response = await courseCategoryService.getAllCourseCategories();
      if (response.data) {
        setCategories(response.data);
      } else {
        // Fallback with sample categories for development
        const sampleCategories = [
          { id: 1, name: "Recitation", description: "Quran Recitation Courses" },
          { id: 2, name: "Tajweed", description: "Tajweed Rules and Practice" },
          { id: 3, name: "Arabic", description: "Arabic Language Learning" },
          { id: 4, name: "Islamic Studies", description: "General Islamic Knowledge" },
          { id: 5, name: "Memorization", description: "Quran Memorization" },
        ];
        setCategories(sampleCategories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Fallback with sample categories
      const sampleCategories = [
        { id: 1, name: "Recitation", description: "Quran Recitation Courses" },
        { id: 2, name: "Tajweed", description: "Tajweed Rules and Practice" },
        { id: 3, name: "Arabic", description: "Arabic Language Learning" },
        { id: 4, name: "Islamic Studies", description: "General Islamic Knowledge" },
        { id: 5, name: "Memorization", description: "Quran Memorization" },
      ];
      setCategories(sampleCategories);
    }
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await courseService.getAll();
      if (response.data) {
        setCourses(response.data);
      } else {
        // Fallback with sample data for development
        const sampleCourses = [
          {
            id: 1,
            title: "Quran Recitation Basics",
            description: "Learn the fundamentals of Quran recitation with proper Tajweed rules.",
            skillLevel: "Beginner",
            duration: "8 weeks",
            numberOfLessons: 10,
            courseCategory: "Recitation",
            coursePictureUrl: "/images/free-quran-school.jpg",
            isActive: true,
            rating: 4.8,
            startDate: "2024-03-01",
            endDate: "2024-04-26",
            lessonsCount: 24,
            createdAt: "2024-01-15",
          },
          {
            id: 2,
            title: "Advanced Tajweed Rules",
            description: "Master advanced Tajweed rules and perfect your Quran recitation.",
            skillLevel: "Advanced",
            duration: "12 weeks",
            numberOfLessons: 12,
            courseCategory: "Tajweed",
            coursePictureUrl: "/images/contemplative-reptile.jpg",
            isActive: true,
            rating: 4.9,
            startDate: "2024-02-15",
            endDate: "2024-05-10",
            lessonsCount: 36,
            createdAt: "2024-02-01",
          },
          {
            id: 3,
            title: "Quranic Arabic Grammar",
            description: "Understand the grammatical structure of Quranic Arabic.",
            skillLevel: "Intermediate",
            duration: "10 weeks",
            numberOfLessons: 10,
            courseCategory: "Arabic",
            coursePictureUrl: "/images/paella.jpg",
            isActive: true,
            rating: 4.7,
            startDate: "2024-03-15",
            endDate: "2024-05-24",
            lessonsCount: 30,
            createdAt: "2024-01-20",
          },
        ];
        setCourses(sampleCourses);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    if (!globalSearchTerm) {
      setFilteredCourses(courses);
      return;
    }

    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
      course.skillLevel.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
      course.courseCategory.toLowerCase().includes(globalSearchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedCourses = React.useMemo(() => {
    return [...filteredCourses].sort((a, b) => {
      if (order === "asc") {
        return a[orderBy] < b[orderBy] ? -1 : 1;
      }
      return a[orderBy] > b[orderBy] ? -1 : 1;
    });
  }, [filteredCourses, order, orderBy]);

  const displayedCourses = sortedCourses.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    // Ensure date is in YYYY-MM-DD format for HTML date input
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split('T')[0];
  };

  const handleOpenModal = (course = null) => {
    if (course) {
      setEditMode(true);
      setCurrentCourse(course);
      
      const newFormData = {
        title: course.title || "",
        description: course.description || "",
        skillLevel: course.skillLevel || "",
        duration: course.duration || "",
        numberOfLessons: course.numberOfLessons || "",
        courseCategory: course.courseCategory || "",
        coursePictureUrl: course.coursePictureUrl || "",
        isActive: course.isActive !== undefined ? course.isActive : true,
        startDate: formatDateForInput(course.startDate),
        endDate: formatDateForInput(course.endDate),
      };
      
      setFormData(newFormData);
    } else {
      setEditMode(false);
      setCurrentCourse(null);
      setFormData({
        title: "",
        description: "",
        skillLevel: "",
        duration: "",
        numberOfLessons: "",
        courseCategory: "",
        coursePictureUrl: "",
        isActive: true,
        startDate: "",
        endDate: "",
      });
    }
    setFormErrors({});
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setFormData({
      title: "",
      description: "",
      skillLevel: "",
      duration: "",
      numberOfLessons: "",
      courseCategory: "",
      coursePictureUrl: "",
      isActive: true,
      startDate: "",
      endDate: "",
    });
    setFormErrors({});
    setCurrentCourse(null);
    setEditMode(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      coursePictureUrl: imageUrl
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Course title is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Course description is required";
    }

    if (!formData.skillLevel.trim()) {
      errors.skillLevel = "Skill level is required";
    }

    if (!formData.duration.trim()) {
      errors.duration = "Duration is required";
    }

    if (!formData.numberOfLessons || parseInt(formData.numberOfLessons) <= 0) {
      errors.numberOfLessons = "Valid number of lessons is required";
    }

    if (!formData.courseCategory.trim()) {
      errors.courseCategory = "Course category is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const courseData = {
        ...formData,
        numberOfLessons: parseInt(formData.numberOfLessons),
      };

      if (editMode && currentCourse) {
        await courseService.update(currentCourse.id, courseData);
        setCourses(prev => 
          prev.map(course => 
            course.id === currentCourse.id 
              ? { ...course, ...courseData }
              : course
          )
        );
      } else {
        const response = await courseService.create(courseData);
        if (response.data) {
          setCourses(prev => [...prev, response.data]);
        } else {
          // Fallback for development
          const newCourse = {
            ...courseData,
            id: Date.now(),
            rating: 0,
            startDate: "",
            endDate: "",
            lessonsCount: courseData.numberOfLessons,
            createdAt: new Date().toISOString().split('T')[0],
          };
          setCourses(prev => [...prev, newCourse]);
        }
      }

      handleCloseModal();
    } catch (error) {
      console.error("Error saving course:", error);
      setError("Failed to save course");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await courseService.delete(id);
        setCourses(prev => prev.filter(course => course.id !== id));
      } catch (error) {
        console.error("Error deleting course:", error);
        setError("Failed to delete course");
      }
    }
  };

  const handleViewCourse = (id) => {
    router.push(`/courses/${id}`);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Typography>Loading courses...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <PageTitle 
        pageTitle="Courses"
        dashboardUrl="/"
      />

      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
        className="rmui-card"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            mb: "25px",
            gap: 2
          }}
        >
          <Button
            onClick={() => handleOpenModal()}
            variant="contained"
            sx={{
              textTransform: "capitalize",
              borderRadius: "7px",
              fontWeight: "500",
              fontSize: "13px",
              padding: "6px 20px",
              color: "#fff !important"
            }}
          >
            <AddIcon sx={{ position: "relative", top: "-1px", mr: 1 }} />
            Add Course
          </Button>

          <Button
            onClick={fetchCourses}
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              borderRadius: "7px",
              fontWeight: "500",
              fontSize: "13px",
              padding: "6px 20px",
            }}
          >
            <RefreshIcon sx={{ position: "relative", top: "-1px", mr: 1 }} />
            Refresh
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table sx={{ minWidth: 650 }} aria-label="courses table">
            <TableHead sx={{ background: "#ECF0FF" }}>
              <TableRow>
                <TableCell padding="checkbox" sx={{ padding: "10px 25px" }}>
                  <Checkbox color="primary" />
                </TableCell>

                <TableCell sx={{ fontWeight: "500", padding: "10px 25px" }}>
                  Image
                </TableCell>

                <TableCell
                  sx={{ fontWeight: "500", padding: "10px 25px", cursor: "pointer" }}
                  onClick={() => handleSort("title")}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    Course Title
                    {orderBy === "title" &&
                      (order === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                  </Box>
                </TableCell>

                <TableCell
                  sx={{ fontWeight: "500", padding: "10px 25px", cursor: "pointer" }}
                  onClick={() => handleSort("duration")}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    Duration
                    {orderBy === "duration" &&
                      (order === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                  </Box>
                </TableCell>

                <TableCell
                  sx={{ fontWeight: "500", padding: "10px 25px", cursor: "pointer" }}
                  onClick={() => handleSort("numberOfLessons")}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    Lessons
                    {orderBy === "numberOfLessons" &&
                      (order === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                  </Box>
                </TableCell>

                <TableCell
                  sx={{ fontWeight: "500", padding: "10px 25px", cursor: "pointer" }}
                  onClick={() => handleSort("startDate")}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    Start Date
                    {orderBy === "startDate" &&
                      (order === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                  </Box>
                </TableCell>

                <TableCell
                  sx={{ fontWeight: "500", padding: "10px 25px", cursor: "pointer" }}
                  onClick={() => handleSort("endDate")}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    End Date
                    {orderBy === "endDate" &&
                      (order === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                  </Box>
                </TableCell>

                <TableCell
                  sx={{ fontWeight: "500", padding: "10px 25px", cursor: "pointer" }}
                  onClick={() => handleSort("rating")}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    Rating
                    {orderBy === "rating" &&
                      (order === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                  </Box>
                </TableCell>

                <TableCell sx={{ fontWeight: "500", padding: "10px 25px" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {displayedCourses.map((course, index) => {
                const isItemSelected = isSelected(course.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, course.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={course.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox" sx={{ padding: "8px 25px" }}>
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>

                    <TableCell sx={{ padding: "14px 25px" }}>
                      <Box sx={{ width: "60px", height: "60px", position: "relative" }}>
                        <Image
                          src={course.coursePictureUrl || "/no-photo.jpg"}
                          alt={course.title}
                          fill
                          style={{
                            objectFit: "cover",
                            borderRadius: "8px"
                          }}
                        />
                      </Box>
                    </TableCell>

                    <TableCell
                      sx={{
                        padding: "14px 25px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {course.title}
                        </Typography>
                        <Chip 
                          label={course.skillLevel} 
                          size="small" 
                          sx={{ fontSize: "11px" }} 
                        />
                      </Box>
                    </TableCell>

                    <TableCell
                      sx={{
                        padding: "14px 25px",
                        fontSize: "14px",
                      }}
                    >
                      {course.duration}
                    </TableCell>

                    <TableCell
                      sx={{
                        padding: "14px 25px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {course.numberOfLessons}
                    </TableCell>

                    <TableCell
                      sx={{
                        padding: "14px 25px",
                        fontSize: "14px",
                      }}
                    >
                      {course.startDate ? new Date(course.startDate).toLocaleDateString() : "-"}
                    </TableCell>

                    <TableCell
                      sx={{
                        padding: "14px 25px",
                        fontSize: "14px",
                      }}
                    >
                      {course.endDate ? new Date(course.endDate).toLocaleDateString() : "-"}
                    </TableCell>

                    <TableCell
                      sx={{
                        padding: "14px 25px",
                        fontSize: "14px",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <Rating value={course.rating || 0} readOnly size="small" />
                        <Typography variant="body2" sx={{ fontSize: "12px" }}>
                          ({course.rating || 0})
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ padding: "14px 25px" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <Tooltip title="View Course" placement="top">
                          <IconButton
                            aria-label="view"
                            color="primary"
                            sx={{ padding: "5px" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewCourse(course.id);
                            }}
                          >
                            <VisibilityIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Edit" placement="top">
                          <IconButton
                            aria-label="edit"
                            color="success"
                            sx={{ padding: "5px" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenModal(course);
                            }}
                          >
                            <DriveFileRenameOutlineIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete" placement="top">
                          <IconButton
                            aria-label="delete"
                            color="error"
                            sx={{ padding: "5px" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(course.id);
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={9}
                  count={filteredCourses.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>

      {/* Add/Edit Course Modal */}
      <BootstrapDialog
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
        fullWidth
        key={editMode ? `edit-${currentCourse?.id}` : 'add-new'}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {editMode ? "Edit Course" : "Add New Course"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
          <Grid container spacing={2}>
            {/* Course Image - Full Grid Width */}
            <Grid size={{ xs: 12 }}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                mb: 3,
                textAlign: 'center',
                width: '100%'
              }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Course Picture
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  width: '100%'
                }}>
                  <ImageUpload
                    onImageUpload={handleImageUpload}
                    currentImageUrl={formData.coursePictureUrl}
                  />
                </Box>
              </Box>
            </Grid>

            {/* Course Title - Full width */}
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Course Title
              </Typography>
              <TextField
                fullWidth
                label="Course Title *"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                error={!!formErrors.title}
                helperText={formErrors.title}
                sx={{ mb: 2 }}
                multiline
                maxRows={2}
                placeholder="Enter your course title (supports long titles)"
              />
            </Grid>

            {/* Course Description - Full width */}
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Description
              </Typography>
              <EditorProvider>
                <Editor
                  value={formData.description}
                  onChange={(e) => handleInputChange({
                    target: {
                      name: 'description',
                      value: e.target.value
                    }
                  })}
                  style={{ minHeight: "200px" }}
                  className="rsw-editor"
                  placeholder="Enter detailed course description"
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
              {formErrors.description && (
                <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
                  {formErrors.description}
                </Typography>
              )}
            </Grid>

            {/* Category - Full width */}
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Category
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Category *</InputLabel>
                <Select
                  name="courseCategory"
                  value={formData.courseCategory}
                  onChange={handleInputChange}
                  error={!!formErrors.courseCategory}
                  label="Category *"
                  displayEmpty={true}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {formErrors.courseCategory && (
                <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
                  {formErrors.courseCategory}
                </Typography>
              )}
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Level
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Level *</InputLabel>
                <Select
                  name="skillLevel"
                  value={formData.skillLevel}
                  onChange={handleInputChange}
                  error={!!formErrors.skillLevel}
                  label="Level *"
                >
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Duration
              </Typography>
              <TextField
                fullWidth
                label="Duration *"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                error={!!formErrors.duration}
                helperText={formErrors.duration}
                placeholder="e.g., 8 weeks"
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Number of Lessons
              </Typography>
              <TextField
                fullWidth
                label="Number of Lessons *"
                name="numberOfLessons"
                type="number"
                value={formData.numberOfLessons}
                onChange={handleInputChange}
                error={!!formErrors.numberOfLessons}
                helperText={formErrors.numberOfLessons}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Start Date
              </Typography>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                error={!!formErrors.startDate}
                helperText={formErrors.startDate}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                End Date
              </Typography>
              <TextField
                fullWidth
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                error={!!formErrors.endDate}
                helperText={formErrors.endDate}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 2 }}>
                <Button
                  onClick={handleCloseModal}
                  variant="outlined"
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: "7px",
                    fontWeight: "500",
                    fontSize: "13px",
                    padding: "8px 20px",
                  }}
                >
                  <ClearIcon sx={{ position: "relative", top: "-1px", mr: 1 }} />
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: "7px",
                    fontWeight: "500",
                    fontSize: "13px",
                    padding: "8px 20px",
                    color: "#fff !important"
                  }}
                >
                  {editMode ? "Update Course" : "Create Course"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </BootstrapDialog>
    </>
  );
}
"use client";
import { useEffect } from "react";
import * as React from "react";
import Image from "next/image";
import { Box, Typography, Chip, Rating, Avatar } from "@mui/material";
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
import enrollmentService from "@/services/enrollment.service";
import courseService from "@/services/course.service";
import userService from "@/services/user.service";
import { useSearch } from "@/contexts/SearchContext";
import { useRouter } from "next/navigation";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import { withEnrollmentsPageProtection } from "@/components/Common/withRoleProtection";
import Autocomplete from "@mui/material/Autocomplete";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// Pagination actions component
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

// Styled Dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function EnrollmentsPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [enrollments, setEnrollments] = React.useState([]);
  const [filteredEnrollments, setFilteredEnrollments] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState("enrolledAt");
  const [order, setOrder] = React.useState("desc");
  const [open, setOpen] = React.useState(false);
  const [editingEnrollment, setEditingEnrollment] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [courses, setCourses] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const [statusFilter, setStatusFilter] = React.useState("All");
  const [courseFilter, setCourseFilter] = React.useState("All");

  const { globalSearchTerm } = useSearch();
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    userId: "",
    courseId: "",
    enrolledAt: "",
    status: "active",
    progress: 0,
    completedLessons: 0,
    totalLessons: 0,
    completionDate: ""
  });

  // Fetch enrollments from API
  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await enrollmentService.getAllEnrollments();
      if (response.data && response.data.length > 0) {
        setEnrollments(response.data);
      } else {
        setEnrollments([]);
      }
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      setEnrollments([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses and students for dropdowns
  const fetchCoursesAndStudents = async () => {
    try {
      const [coursesResponse, studentsResponse] = await Promise.all([
        courseService.getAll(),
        userService.getAll()
      ]);
      
      if (coursesResponse.data) {
        setCourses(coursesResponse.data);
      } else {
        setCourses([]);
      }
      
      if (studentsResponse.data) {
        setStudents(studentsResponse.data);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error("Error fetching courses/students:", error);
      setCourses([]);
      setStudents([]);
    }
  };

  const resetForm = () => {
    setFormData({
      userId: "",
      courseId: "",
      enrolledAt: "",
      status: "active",
      progress: 0,
      completedLessons: 0,
      totalLessons: 0,
      completionDate: ""
    });
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchEnrollments();
    fetchCoursesAndStudents();
  }, []);

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Handle search and filtering
  useEffect(() => {
    let filtered = enrollments;

    // Apply search filter
    if (globalSearchTerm) {
      filtered = filtered.filter(
        (enrollment) =>
          enrollment.studentName.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
          enrollment.studentEmail.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
          enrollment.courseName.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
          enrollment.status.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
          (enrollment.completionDate && enrollment.completionDate.toLowerCase().includes(globalSearchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter(enrollment => enrollment.status === statusFilter);
    }

    // Apply course filter
    if (courseFilter !== "All") {
      filtered = filtered.filter(enrollment => enrollment.courseId.toString() === courseFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      if (orderBy === "enrolledAt" || orderBy === "lastAccessed" || orderBy === "completionDate") {
        aValue = aValue ? new Date(aValue) : new Date(0);
        bValue = bValue ? new Date(bValue) : new Date(0);
      }

      if (orderBy === "studentName") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (order === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredEnrollments(filtered);
  }, [enrollments, globalSearchTerm, orderBy, order, statusFilter, courseFilter]);

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredEnrollments.map((enrollment) => enrollment.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
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

  const handleOpenModal = (enrollment = null) => {
    
    if (enrollment) {
      setEditingEnrollment(enrollment);
      
      const formattedData = {
        userId: enrollment.userId || "",
        courseId: enrollment.courseId || "",
        enrolledAt: formatDateForInput(enrollment.enrolledAt),
        status: enrollment.status || "Active",
        progress: enrollment.progress || 0,
        completedLessons: enrollment.completedLessons || 0,
        totalLessons: enrollment.totalLessons || 0,
        completionDate: formatDateForInput(enrollment.completionDate)
      };
      
      setFormData(formattedData);
    } else {
      setEditingEnrollment(null);
      resetForm();
    }
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setEditingEnrollment(null);
    resetForm();
  };

  const handleSaveEnrollment = async () => {
    
    try {
      setLoading(true);
      
      if (editingEnrollment) {
        // Update existing enrollment
        await enrollmentService.updateEnrollment(editingEnrollment.id, formData);
      } else {
        // Create new enrollment
        await enrollmentService.createEnrollment(formData);
      }
      
      // Refresh the enrollments list
      await fetchEnrollments();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving enrollment:", error);
      
      // Fallback to local state update for development
      if (editingEnrollment) {
        // Update existing enrollment locally
        const updatedEnrollments = enrollments.map((enrollment) =>
          enrollment.id === editingEnrollment.id
            ? {
                ...enrollment,
                ...formData,
                enrolledAt: new Date(formData.enrolledAt).toISOString(),
                studentName: students.find(s => s.id === parseInt(formData.userId))?.name || enrollment.studentName,
                studentEmail: students.find(s => s.id === parseInt(formData.userId))?.email || enrollment.studentEmail,
                courseName: courses.find(c => c.id === parseInt(formData.courseId))?.title || enrollment.courseName
              }
            : enrollment
        );
        setEnrollments(updatedEnrollments);
      } else {
        // Add new enrollment locally
        const student = students.find(s => s.id === parseInt(formData.userId));
        const course = courses.find(c => c.id === parseInt(formData.courseId));
        
        const newEnrollment = {
          id: Date.now(),
          ...formData,
          userId: parseInt(formData.userId),
          courseId: parseInt(formData.courseId),
          enrolledAt: new Date(formData.enrolledAt).toISOString(),
          lastAccessed: new Date().toISOString(),
          certificateIssued: false,
          studentName: student?.name || "",
          studentEmail: student?.email || "",
          courseName: course?.title || "",
          studentAvatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
          courseImage: "https://drdszjyxxzc4mqcy.public.blob.vercel-storage.com/courses/default-course-image.jpg"
        };
        setEnrollments([...enrollments, newEnrollment]);
      }
      
      handleCloseModal();
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEnrollment = async (id) => {
    if (window.confirm("Are you sure you want to delete this enrollment?")) {
      try {
        setLoading(true);
        await enrollmentService.deleteEnrollment(id);
        // Refresh the enrollments list
        await fetchEnrollments();
        setSelected(selected.filter((selectedId) => selectedId !== id));
      } catch (error) {
        console.error("Error deleting enrollment:", error);
        // Fallback to local state update for development
        setEnrollments(enrollments.filter((enrollment) => enrollment.id !== id));
        setSelected(selected.filter((selectedId) => selectedId !== id));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleViewEnrollment = (id) => {
    router.push(`/enrollments/${id}`);
  };

  const handleRefresh = () => {
    fetchEnrollments();
  };

  const handleClearFilters = () => {
    setStatusFilter("All");
    setCourseFilter("All");
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
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
    return new Date(dateString).toLocaleDateString();
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredEnrollments.length) : 0;

  return (
    <>
      <PageTitle
        pageTitle="Enrollments"
        dashboardUrl="/enrollments"
        dashboardText="Enrollments"
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
              padding: "6px 13px",
              color: "#fff !important",
            }}
            color="primary"
            startIcon={<AddIcon />}
          >
            Add Enrollment
          </Button>

          <Button
            onClick={handleRefresh}
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              borderRadius: "7px",
              fontWeight: "500",
              fontSize: "13px",
              padding: "6px 13px",
            }}
            color="primary"
            startIcon={<RefreshIcon />}
          >
            Refresh
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            mb: "20px",
            gap: "15px",
            flexWrap: "wrap"
          }}
        >
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={statusFilter !== "All" ? { 
                backgroundColor: 'action.selected',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                  borderWidth: '2px'
                }
              } : {}}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="on hold">On Hold</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Course</InputLabel>
            <Select
              value={courseFilter}
              label="Course"
              onChange={(e) => setCourseFilter(e.target.value)}
              sx={courseFilter !== "All" ? { 
                backgroundColor: 'action.selected',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                  borderWidth: '2px'
                }
              } : {}}
            >
              <MenuItem value="All">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SchoolIcon fontSize="small" />
                  All Courses
                </Box>
              </MenuItem>
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id.toString()}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SchoolIcon fontSize="small" color="primary" />
                    {course.title}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            onClick={handleClearFilters}
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              borderRadius: "7px",
              fontWeight: "500",
              fontSize: "13px",
              padding: "6px 13px",
            }}
            color="primary"
            startIcon={<ClearIcon />}
          >
            Clear Filters
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ width: "100%", mb: 2 }}>
            <LinearProgress />
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none",
              borderRadius: "7px",
            }}
            className="rmui-table"
          >
            <Table sx={{ minWidth: 1200 }} aria-label="enrollments table">
              <TableHead className="bg-primary-50">
                <TableRow>
                  <TableCell sx={{ fontWeight: "500" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Checkbox
                        color="primary"
                        indeterminate={
                          selected.length > 0 && selected.length < filteredEnrollments.length
                        }
                        checked={
                          filteredEnrollments.length > 0 &&
                          selected.length === filteredEnrollments.length
                        }
                        onChange={handleSelectAllClick}
                        inputProps={{
                          "aria-label": "select all enrollments",
                        }}
                      />
                      <ArrowUpwardIcon
                        sx={{
                          fontSize: "16px",
                        }}
                      />
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{ fontWeight: "500", fontSize: "14px" }}
                    className="text-black"
                  >
                    Student
                  </TableCell>

                  <TableCell
                    sx={{ fontWeight: "500", fontSize: "14px", cursor: "pointer" }}
                    className="text-black"
                    onClick={() => handleSort("courseName")}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Course
                      {orderBy === "courseName" ? (
                        order === "desc" ? (
                          <ArrowDownwardIcon sx={{ fontSize: "16px", ml: "5px" }} />
                        ) : (
                          <ArrowUpwardIcon sx={{ fontSize: "16px", ml: "5px" }} />
                        )
                      ) : null}
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{ fontWeight: "500", fontSize: "14px", cursor: "pointer" }}
                    className="text-black"
                    onClick={() => handleSort("enrolledAt")}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Enrollment Date
                      {orderBy === "enrolledAt" ? (
                        order === "desc" ? (
                          <ArrowDownwardIcon sx={{ fontSize: "16px", ml: "5px" }} />
                        ) : (
                          <ArrowUpwardIcon sx={{ fontSize: "16px", ml: "5px" }} />
                        )
                      ) : null}
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{ fontWeight: "500", fontSize: "14px", cursor: "pointer" }}
                    className="text-black"
                    onClick={() => handleSort("status")}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Status
                      {orderBy === "status" ? (
                        order === "desc" ? (
                          <ArrowDownwardIcon sx={{ fontSize: "16px", ml: "5px" }} />
                        ) : (
                          <ArrowUpwardIcon sx={{ fontSize: "16px", ml: "5px" }} />
                        )
                      ) : null}
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{ fontWeight: "500", fontSize: "14px", cursor: "pointer" }}
                    className="text-black"
                    onClick={() => handleSort("progress")}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Progress
                      {orderBy === "progress" ? (
                        order === "desc" ? (
                          <ArrowDownwardIcon sx={{ fontSize: "16px", ml: "5px" }} />
                        ) : (
                          <ArrowUpwardIcon sx={{ fontSize: "16px", ml: "5px" }} />
                        )
                      ) : null}
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{ fontWeight: "500", fontSize: "14px", cursor: "pointer" }}
                    className="text-black"
                    onClick={() => handleSort("completionDate")}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Completion Date
                      {orderBy === "completionDate" ? (
                        order === "desc" ? (
                          <ArrowDownwardIcon sx={{ fontSize: "16px", ml: "5px" }} />
                        ) : (
                          <ArrowUpwardIcon sx={{ fontSize: "16px", ml: "5px" }} />
                        )
                      ) : null}
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{ fontWeight: "500", fontSize: "14px" }}
                    className="text-black"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {(rowsPerPage > 0
                  ? filteredEnrollments.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredEnrollments
                ).map((enrollment) => {
                  const isItemSelected = isSelected(enrollment.id);
                  const labelId = `enhanced-table-checkbox-${enrollment.id}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, enrollment.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={enrollment.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                          <ArrowUpwardIcon
                            sx={{
                              fontSize: "16px",
                            }}
                          />
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <Avatar
                            src={enrollment.studentAvatar}
                            alt={enrollment.studentName || (enrollment.user ? `${enrollment.user.firstName} ${enrollment.user.lastName}` : '')}
                            sx={{ width: 40, height: 40 }}
                          />
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {enrollment.studentName || (enrollment.user ? `${enrollment.user.firstName} ${enrollment.user.lastName}` : 'Unknown')}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {enrollment.studentEmail || (enrollment.user ? enrollment.user.email : '')}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {enrollment.courseName || (enrollment.course ? enrollment.course.title : 'Unknown Course')}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(enrollment.enrolledAt)}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={enrollment.status}
                          color={getStatusColor(enrollment.status)}
                          size="small"
                          sx={{ fontSize: "12px" }}
                        />
                      </TableCell>

                      <TableCell>
                        <Box sx={{ minWidth: 100 }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <Typography variant="body2" sx={{ minWidth: "50px" }}>
                              {enrollment.progress}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={enrollment.progress}
                            sx={{ height: 6, borderRadius: 3 }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {enrollment.completedLessons}/{enrollment.totalLessons} lessons
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {enrollment.completionDate ? formatDate(enrollment.completionDate) : "Not completed"}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Tooltip title="View Enrollment" arrow>
                            <IconButton
                              aria-label="view"
                              color="primary"
                              onClick={() => handleViewEnrollment(enrollment.id)}
                            >
                              <VisibilityIcon sx={{ fontSize: "16px" }} />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Edit Enrollment" arrow>
                            <IconButton
                              aria-label="edit"
                              color="secondary"
                              onClick={() => handleOpenModal(enrollment)}
                            >
                              <DriveFileRenameOutlineIcon sx={{ fontSize: "16px" }} />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete Enrollment" arrow>
                            <IconButton
                              aria-label="delete"
                              color="error"
                              onClick={() => handleDeleteEnrollment(enrollment.id)}
                            >
                              <DeleteIcon sx={{ fontSize: "16px" }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={8} />
                  </TableRow>
                )}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                    colSpan={8}
                    count={filteredEnrollments.length}
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
        )}
      </Card>

      {/* Add/Edit Enrollment Modal */}
      <BootstrapDialog
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={open}
        key={editingEnrollment ? editingEnrollment.id : 'new'}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {editingEnrollment ? "Edit Enrollment" : "Add New Enrollment"}
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

        <Box sx={{ padding: "20px" }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography
                  component="h6"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "12px",
                  }}
                  className="text-black"
                >
                  Student
                </Typography>

                <FormControl fullWidth>
                  <InputLabel>Select Student *</InputLabel>
                  <Select
                    value={formData.userId}
                    label="Select Student *"
                    onChange={(e) =>
                      setFormData({ ...formData, userId: e.target.value })
                    }
                  >
                    {students.map((student) => (
                      <MenuItem key={student.id} value={student.id}>
                        {student.firstName} {student.lastName} ({student.username})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography
                  component="h6"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "12px",
                  }}
                  className="text-black"
                >
                  Course
                </Typography>

                <FormControl fullWidth>
                  <InputLabel>Select Course *</InputLabel>
                  <Select
                    value={formData.courseId}
                    label="Select Course *"
                    onChange={(e) =>
                      setFormData({ ...formData, courseId: e.target.value })
                    }
                  >
                    {courses.map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography
                  component="h6"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "12px",
                  }}
                  className="text-black"
                >
                  Enrollment Date
                </Typography>

                <TextField
                  fullWidth
                  type="date"
                  value={formData.enrolledAt}
                  onChange={(e) =>
                    setFormData({ ...formData, enrolledAt: e.target.value })
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography
                  component="h6"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "12px",
                  }}
                  className="text-black"
                >
                  Status
                </Typography>

                <FormControl fullWidth>
                  <InputLabel>Status *</InputLabel>
                  <Select
                    value={formData.status}
                    label="Status *"
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="on hold">On Hold</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box>
                <Typography
                  component="h6"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "12px",
                  }}
                  className="text-black"
                >
                  Progress (%)
                </Typography>

                <TextField
                  fullWidth
                  type="number"
                  inputProps={{ min: 0, max: 100 }}
                  value={formData.progress}
                  onChange={(e) =>
                    setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })
                  }
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box>
                <Typography
                  component="h6"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "12px",
                  }}
                  className="text-black"
                >
                  Completed Lessons
                </Typography>

                <TextField
                  fullWidth
                  type="number"
                  inputProps={{ min: 0 }}
                  value={formData.completedLessons}
                  onChange={(e) =>
                    setFormData({ ...formData, completedLessons: parseInt(e.target.value) || 0 })
                  }
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box>
                <Typography
                  component="h6"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "12px",
                  }}
                  className="text-black"
                >
                  Total Lessons
                </Typography>

                <TextField
                  fullWidth
                  type="number"
                  inputProps={{ min: 0 }}
                  value={formData.totalLessons}
                  onChange={(e) =>
                    setFormData({ ...formData, totalLessons: parseInt(e.target.value) || 0 })
                  }
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography
                  component="h6"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "12px",
                  }}
                  className="text-black"
                >
                  Completion Date
                </Typography>

                <TextField
                  fullWidth
                  type="date"
                  value={formData.completionDate}
                  onChange={(e) =>
                    setFormData({ ...formData, completionDate: e.target.value })
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
            </Grid>

          </Grid>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              gap: "15px",
              mt: "25px",
            }}
          >
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              color="error"
              sx={{
                textTransform: "capitalize",
                borderRadius: "7px",
                fontWeight: "500",
                fontSize: "13px",
                padding: "6px 13px",
              }}
              startIcon={<ClearIcon />}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSaveEnrollment}
              variant="contained"
              sx={{
                textTransform: "capitalize",
                borderRadius: "7px",
                fontWeight: "500",
                fontSize: "13px",
                padding: "6px 13px",
              }}
            >
              {editingEnrollment ? "Update Enrollment" : "Add Enrollment"}
            </Button>
          </Box>
        </Box>
      </BootstrapDialog>
    </>
  );
}

export default withEnrollmentsPageProtection(EnrollmentsPage);
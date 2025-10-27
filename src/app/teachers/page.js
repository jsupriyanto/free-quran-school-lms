"use client";
import { useEffect } from "react";
import * as React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
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
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import ClearIcon from "@mui/icons-material/Clear";
import Checkbox from "@mui/material/Checkbox";
import PageTitle from "@/components/Common/PageTitle";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import authService from "@/services/auth.service";
import teacherService from "@/services/teacher.service";
import ImageUpload from "@/components/Common/ImageUpload";
import { useSearch } from "@/contexts/SearchContext";


const label = { inputProps: { "aria-label": "Checkbox demo" } };

// Create new teacher Modal
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
// End Create new teacher Modal

function TeachersLists(props) {
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

TeachersLists.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const currentUser = authService.getCurrentUser();

export default function TeachersList() {
  // Table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [teachers, setTeachers] = React.useState([]);
  const [allTeachers, setAllTeachers] = React.useState([]); // Store all teachers for filtering
  
  // Sort state
  const [sortBy, setSortBy] = React.useState('name'); // 'name', 'bio', 'facebook', 'instagram', 'twitter', 'linkedin', 'youtube'
  const [sortOrder, setSortOrder] = React.useState('asc'); // 'asc', 'desc'
  
  // Use global search context
  const { globalSearchTerm } = useSearch();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - teachers.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Create new teacher modal
  const [open, setOpen] = React.useState(false);
  const [selectedTeacher, setSelectedTeacher] = React.useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = React.useState(null);
  
  // Form data state
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    bio: '',
    facebookUrl: '',
    instagramUrl: '',
    twitterUrl: '',
    linkedInUrl: '',
    youtubeUrl: '',
    pinterestUrl: '',
  });


  // Handle form field changes
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClickOpen = () => {
    setSelectedTeacher(null);
    setUploadedImageUrl(null);
    setFormData({
      firstName: '',
      lastName: '',
      bio: '',
      facebookUrl: '',
      instagramUrl: '',
      twitterUrl: '',
      linkedInUrl: '',
      youtubeUrl: '',
      pinterestUrl: '',
    });
    setOpen(true);
  };
  
  const handleClose = () => {
    setSelectedTeacher(null);
    setUploadedImageUrl(null);
    setFormData({
      firstName: '',
      lastName: '',
      bio: '',
      facebookUrl: '',
      instagramUrl: '',
      twitterUrl: '',
      linkedInUrl: '',
      youtubeUrl: '',
      pinterestUrl: '',
    });
    setOpen(false);
  };

  const handleEditOpen = (teacher) => {
    setSelectedTeacher(teacher);
    setUploadedImageUrl(teacher.photoUrl || null);
    setFormData({
      firstName: teacher.firstName || '',
      lastName: teacher.lastName || '',
      bio: teacher.bio || '',
      facebookUrl: teacher.facebookUrl || '',
      instagramUrl: teacher.instagramUrl || '',
      twitterUrl: teacher.twitterUrl || '',
      linkedInUrl: teacher.linkedInUrl || '',
      youtubeUrl: teacher.youtubeUrl || '',
      pinterestUrl: teacher.pinterestUrl || '',
    });
    setOpen(true);
  }

  const handleDeleteConfirmation = (row) => {
    if (row.id !== currentUser.id) {
      confirm("Are you sure to delete this teacher?") && teacherService.delete(row.id).then(() => {
        handleRefresh();
      });
    } else {
      alert("You can't delete your own account.");
    }
  };

  const handleRefresh = () => {
    teacherService.getAll().then((response) => {
      setAllTeachers(response.data); // Store all teachers
      const filteredAndSorted = applySearchAndSort(response.data, globalSearchTerm, sortBy, sortOrder);
      setTeachers(filteredAndSorted); // Apply current search and sort
    });
  };

  // Search and Sort function
  const applySearchAndSort = (teachersData, search, sort, order) => {
    let filteredTeachers = [...teachersData];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredTeachers = filteredTeachers.filter(teacher => {
        const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
        const bio = teacher.bio?.toLowerCase() || '';
        const facebookUrl = teacher.facebookUrl?.toLowerCase() || '';
        const instagramUrl = teacher.instagramUrl?.toLowerCase() || '';
        const twitterUrl = teacher.twitterUrl?.toLowerCase() || '';
        const linkedInUrl = teacher.linkedInUrl?.toLowerCase() || '';
        const youtubeUrl = teacher.youtubeUrl?.toLowerCase() || '';
        
        return fullName.includes(searchLower) ||
               bio.includes(searchLower) ||
               facebookUrl.includes(searchLower) ||
               instagramUrl.includes(searchLower) ||
               twitterUrl.includes(searchLower) ||
               linkedInUrl.includes(searchLower) ||
               youtubeUrl.includes(searchLower);
      });
    }

    // Apply sorting
    filteredTeachers.sort((a, b) => {
      let aValue, bValue;
      
      switch (sort) {
        case 'name':
          aValue = `${a.firstName} ${a.lastName}`.toLowerCase();
          bValue = `${b.firstName} ${b.lastName}`.toLowerCase();
          break;
        case 'bio':
          aValue = a.bio?.toLowerCase() || '';
          bValue = b.bio?.toLowerCase() || '';
          break;
        case 'facebook':
          aValue = a.facebookUrl?.toLowerCase() || '';
          bValue = b.facebookUrl?.toLowerCase() || '';
          break;
        case 'instagram':
          aValue = a.instagramUrl?.toLowerCase() || '';
          bValue = b.instagramUrl?.toLowerCase() || '';
          break;
        case 'twitter':
          aValue = a.twitterUrl?.toLowerCase() || '';
          bValue = b.twitterUrl?.toLowerCase() || '';
          break;
        case 'linkedin':
          aValue = a.linkedInUrl?.toLowerCase() || '';
          bValue = b.linkedInUrl?.toLowerCase() || '';
          break;
        case 'youtube':
          aValue = a.youtubeUrl?.toLowerCase() || '';
          bValue = b.youtubeUrl?.toLowerCase() || '';
          break;
        default:
          aValue = `${a.firstName} ${a.lastName}`.toLowerCase();
          bValue = `${b.firstName} ${b.lastName}`.toLowerCase();
      }
      
      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });

    return filteredTeachers;
  };

  // Handle column header click for sorting
  const handleHeaderClick = (column) => {
    if (sortBy === column) {
      // If clicking the same column, toggle sort order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a different column, set new column and default to ascending
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  // Render sort icon for table headers
  const renderSortIcon = (column) => {
    if (sortBy !== column) {
      return <ArrowUpwardIcon sx={{ fontSize: 16, opacity: 0.5 }} />;
    }
    return sortOrder === 'asc' ? 
      <ArrowUpwardIcon sx={{ fontSize: 16 }} /> : 
      <ArrowDownwardIcon sx={{ fontSize: 16 }} />;
  };

  // Apply search and sort when globalSearchTerm or sort options change
  useEffect(() => {
    if (allTeachers.length > 0) {
      const filteredAndSorted = applySearchAndSort(allTeachers, globalSearchTerm, sortBy, sortOrder);
      setTeachers(filteredAndSorted);
      setPage(0); // Reset to first page when search/sort changes
    }
  }, [globalSearchTerm, sortBy, sortOrder, allTeachers]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let updatedTeacher = {};
    let newTeacher = {};  

    if (selectedTeacher) {
      // Update existing teacher
      updatedTeacher = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        bio: formData.bio,
        photoUrl: uploadedImageUrl,
        facebookUrl: formData.facebookUrl,
        instagramUrl: formData.instagramUrl,
        twitterUrl: formData.twitterUrl,
        linkedInUrl: formData.linkedInUrl,
        youtubeUrl: formData.youtubeUrl,
        pinterestUrl: formData.pinterestUrl,
      };
    } else {
      // Create new teacher
      newTeacher = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        bio: formData.bio,
        photoUrl: uploadedImageUrl || "/assets/img/user.png",
        facebookUrl: formData.facebookUrl,
        instagramUrl: formData.instagramUrl,
        twitterUrl: formData.twitterUrl,
        linkedInUrl: formData.linkedInUrl,
        youtubeUrl: formData.youtubeUrl,
        pinterestUrl: formData.pinterestUrl,
      };
    }
    const teacherData = selectedTeacher ? { ...selectedTeacher, ...updatedTeacher } : newTeacher;
    const serviceCall = selectedTeacher ? teacherService.update(selectedTeacher.id, teacherData) : teacherService.create(teacherData);
    serviceCall.then(() => {
      handleRefresh();
      handleClose();
    });
  };
  // End Add Teacher 
  
  useEffect(() => {
    teacherService.getAll().then((response) => {
      setAllTeachers(response.data); // Store all teachers
      const filteredAndSorted = applySearchAndSort(response.data, globalSearchTerm, sortBy, sortOrder);
      setTeachers(filteredAndSorted); // Apply current search and sort
    });
  }, []);

  return (
    <>
      <PageTitle
        pageTitle="Teachers"
        dashboardUrl="/"
        dashboardText="Dashboard"
      />

      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 20px 15px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
            mb: "20px",
          }}
          className="for-dark-bottom-border"
        >

          <Button
            onClick={handleClickOpen}
            variant="contained"
            sx={{
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "13px",
              padding: "12px 20px",
              color: "#fff !important",
            }}
          >
            <AddIcon
              sx={{ position: "relative", top: "-1px" }}
              className="mr-5px"
            />{" "}
            Create New Teacher
          </Button>

          <Button
            onClick={handleRefresh}
            variant="contained"
            sx={{
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "13px",
              padding: "12px 20px",
              color: "#fff !important",
            }}
          >
            <RefreshIcon
              sx={{ position: "relative", top: "-1px" }}
              className="mr-5px"
            />{" "}
            Refresh
          </Button>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
          }}
        >
          <Table
            sx={{ minWidth: 850 }}
            aria-label="custom pagination table"
            className="dark-table"
          >
            <TableHead sx={{ background: "#F7FAFF" }}>
              <TableRow>
                <TableCell
                  sx={{ 
                    borderBottom: "1px solid #F7FAFF", 
                    fontSize: "13.5px",
                    cursor: 'pointer',
                    userSelect: 'none',
                    '&:hover': { backgroundColor: '#f0f4f8' }
                  }}
                  onClick={() => handleHeaderClick('name')}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Name
                    {renderSortIcon('name')}
                  </Box>
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ 
                    borderBottom: "1px solid #F7FAFF", 
                    fontSize: "13.5px",
                    cursor: 'pointer',
                    userSelect: 'none',
                    '&:hover': { backgroundColor: '#f0f4f8' }
                  }}
                  onClick={() => handleHeaderClick('bio')}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    Bio
                    {renderSortIcon('bio')}
                  </Box>
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ 
                    borderBottom: "1px solid #F7FAFF", 
                    fontSize: "13.5px",
                    cursor: 'pointer',
                    userSelect: 'none',
                    '&:hover': { backgroundColor: '#f0f4f8' }
                  }}
                  onClick={() => handleHeaderClick('facebook')}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    Facebook
                    {renderSortIcon('facebook')}
                  </Box>
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ 
                    borderBottom: "1px solid #F7FAFF", 
                    fontSize: "13.5px",
                    cursor: 'pointer',
                    userSelect: 'none',
                    '&:hover': { backgroundColor: '#f0f4f8' }
                  }}
                  onClick={() => handleHeaderClick('instagram')}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    Instagram
                    {renderSortIcon('instagram')}
                  </Box>
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ 
                    borderBottom: "1px solid #F7FAFF", 
                    fontSize: "13.5px",
                    cursor: 'pointer',
                    userSelect: 'none',
                    '&:hover': { backgroundColor: '#f0f4f8' }
                  }}
                  onClick={() => handleHeaderClick('twitter')}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    Twitter/X
                    {renderSortIcon('twitter')}
                  </Box>
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ 
                    borderBottom: "1px solid #F7FAFF", 
                    fontSize: "13.5px",
                    cursor: 'pointer',
                    userSelect: 'none',
                    '&:hover': { backgroundColor: '#f0f4f8' }
                  }}
                  onClick={() => handleHeaderClick('linkedin')}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    LinkedIn
                    {renderSortIcon('linkedin')}
                  </Box>
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ 
                    borderBottom: "1px solid #F7FAFF", 
                    fontSize: "13.5px",
                    cursor: 'pointer',
                    userSelect: 'none',
                    '&:hover': { backgroundColor: '#f0f4f8' }
                  }}
                  onClick={() => handleHeaderClick('youtube')}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    YouTube
                    {renderSortIcon('youtube')}
                  </Box>
                </TableCell>

                <TableCell
                  align="right"
                  sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? teachers.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                : teachers
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell
                    style={{
                      borderBottom: "1px solid #F7FAFF",
                      paddingTop: "13px",
                      paddingBottom: "13px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox {...label} size="small" />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="ml-10px"
                    >
                      <Image 
                        src={row.photoUrl || `/assets/img/user${row.id}.png`}
                        alt="Teacher Photo"
                        width={40}
                        height={40}
                        className="borRadius100"
                      />
                      <Box>
                        <Typography
                          as="h5"
                          sx={{
                            fontWeight: "500",
                            fontSize: "13.5px",
                          }}
                          className="ml-10px"
                        >
                          {row.firstName} {row.lastName}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell
                    align="center"
                    style={{
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "13px",
                      paddingTop: "13px",
                      paddingBottom: "13px",
                    }}
                  >
                    {row.bio}
                  </TableCell>

                  <TableCell
                    align="center"
                    style={{
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "13px",
                      paddingTop: "13px",
                      paddingBottom: "13px",
                    }}
                  >
                    {row.facebookUrl}
                  </TableCell>

                  <TableCell
                    align="center"
                    style={{
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "13px",
                      paddingTop: "13px",
                      paddingBottom: "13px",
                    }}
                  >
                    {row.instagramUrl}
                  </TableCell>

                  <TableCell
                    align="center"
                    style={{
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "13px",
                      paddingTop: "13px",
                      paddingBottom: "13px",
                    }}
                  >
                    {row.twitterUrl}
                  </TableCell>

                  <TableCell
                    align="center"
                    style={{
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "13px",
                      paddingTop: "13px",
                      paddingBottom: "13px",
                    }}
                  >
                    {row.linkedInUrl}
                  </TableCell>

                  <TableCell
                    align="center"
                    style={{
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "13px",
                      paddingTop: "13px",
                      paddingBottom: "13px",
                    }}
                  >
                    {row.youtubeUrl}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{ borderBottom: "1px solid #F7FAFF" }}
                  >
                    <Box
                      sx={{
                        display: "inline-block",
                      }}
                    >
                      <Tooltip title="Remove" placement="top">
                        <IconButton
                          aria-label="remove"
                          size="small"
                          color="danger"
                          className="danger"
                          onClick={() => handleDeleteConfirmation(row)}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Edit" placement="top">
                        <IconButton
                          aria-label="edit  "
                          size="small"
                          color="primary"
                          className="primary"
                          onClick={() => handleEditOpen(row)}
                        >
                          <DriveFileRenameOutlineIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell
                    colSpan={5}
                    style={{ borderBottom: "1px solid #F7FAFF" }}
                  />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={8}
                  count={teachers.length}
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
                  ActionsComponent={TeachersLists}
                  style={{ borderBottom: "none" }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>

      {/* Create new teacher modal */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#EDEFF5",
              borderRadius: "8px",
              padding: "20px 20px",
            }}
            className="bg-black"
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontWeight: "500",
                fontSize: "18px",
              }}
            >
            {selectedTeacher ? 'Edit Teacher' : 'Add New Teacher'}
            </Typography>

            <IconButton
              aria-label="remove"
              size="small"
              onClick={handleClose}
              className="modal-close"
            >
              <ClearIcon />
            </IconButton>
          </Box>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Box
              sx={{
                background: "#fff",
                padding: "20px 20px",
                borderRadius: "8px",
              }}
              className="dark-BG-101010"
            >
              <Grid container alignItems="center" spacing={2}>
                {/* Photo Section - Centered */}
                <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      as="h5"
                      sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "12px",
                      }}
                    >
                      Photo
                    </Typography>

                    <ImageUpload
                      currentImageUrl={selectedTeacher?.photoUrl || uploadedImageUrl}
                      onImageUpload={setUploadedImageUrl}
                      maxSize={5 * 1024 * 1024} // 5MB
                    />
                  </Box>
                </Grid>

                {/* First Name and Last Name on the same line */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    First Name
                  </Typography>

                  <TextField
                    autoComplete="name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formData.firstName}
                    onChange={handleFormChange}
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Last Name
                  </Typography>

                  <TextField
                    autoComplete="name"
                    name="lastName"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Facebook
                  </Typography>

                  <TextField
                    autoComplete="facebook"
                    name="facebookUrl"
                    fullWidth
                    id="facebook"
                    label="Facebook URL"
                    autoFocus
                    value={formData.facebookUrl}
                    onChange={handleFormChange}
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Instagram
                  </Typography>

                  <TextField
                    autoComplete="instagram"
                    name="instagramUrl"
                    fullWidth
                    id="instagram"
                    label="Instagram URL"
                    autoFocus
                    value={formData.instagramUrl}
                    onChange={handleFormChange}
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Twitter/X
                  </Typography>

                  <TextField
                    autoComplete="twitter"
                    name="twitterUrl"
                    fullWidth
                    id="twitter"
                    label="Twitter/X URL"
                    autoFocus
                    value={formData.twitterUrl}
                    onChange={handleFormChange}
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    LinkedIn
                  </Typography>

                  <TextField
                    autoComplete="linkedin"
                    name="linkedInUrl"
                    fullWidth
                    id="linkedin"
                    label="LinkedIn URL"
                    autoFocus 
                    value={formData.linkedInUrl}
                    onChange={handleFormChange}
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    YouTube
                  </Typography>

                  <TextField
                    autoComplete="youtube"
                    name="youtubeUrl"
                    fullWidth
                    id="youtube"
                    label="YouTube URL"
                    autoFocus
                    value={formData.youtubeUrl}
                    onChange={handleFormChange}
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Pinterest
                  </Typography>

                  <TextField
                    autoComplete="pinterest"
                    name="pinterestUrl"
                    fullWidth
                    id="pinterest"
                    label="Pinterest URL"
                    autoFocus
                    value={formData.pinterestUrl}
                    onChange={handleFormChange}
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Bio
                  </Typography>

                  <TextField
                    autoComplete="bio "
                    name="bio"
                    required
                    fullWidth
                    id="bio"
                    label="Bio"
                    autoFocus
                    multiline
                    rows={6}
                    value={formData.bio}
                    onChange={handleFormChange}
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }} textAlign="end">
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      mt: 1,
                      textTransform: "capitalize",
                      borderRadius: "8px",
                      fontWeight: "500",
                      fontSize: "13px",
                      padding: "12px 20px",
                      color: "#fff !important",
                    }}
                    onClick={handleClose}
                    className="mr-15px"
                  >
                    <ClearIcon
                      sx={{
                        position: "relative",
                        top: "-1px",
                      }}
                      className="mr-3px"
                    />{" "}
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 1,
                      textTransform: "capitalize",
                      borderRadius: "8px",
                      fontWeight: "500",
                      fontSize: "13px",
                      padding: "12px 20px",
                      color: "#fff !important",
                    }}
                  >
                    {!selectedTeacher && (
                      <AddIcon
                        sx={{
                          position: "relative",
                          top: "-2px",
                        }}
                        className="mr-3px"
                      />
                    )}

                    {selectedTeacher && (
                      <EditIcon
                        sx={{
                          position: "relative",
                          top: "-2px",
                        }}
                        className="mr-3px"
                      />
                    )}

                    {" "}
                    {selectedTeacher ? 'Update Teacher' : 'Create Teacher'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </BootstrapDialog>
    </>
  );
}

"use client";
import { useEffect } from "react";
import * as React from "react";
import { Box, Typography, Avatar } from "@mui/material";
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
import RefreshIcon from "@mui/icons-material/Refresh";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Checkbox from "@mui/material/Checkbox";
import PageTitle from "@/components/Common/PageTitle";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import userService from "@/services/user.service";
import { getCountryDataList } from "countries-list";
import authService from "@/services/auth.service";
import ImageUpload from "@/components/Common/ImageUpload";
import { useSearch } from "@/contexts/SearchContext";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

// Create new user Modal
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
// End Create new user Modal

function MembersLists(props) {
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

MembersLists.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function getCountryNames() {
  return getCountryDataList();
}

const countryNames = getCountryNames();
const currentUser = authService.getCurrentUser();

// Role options with roleId mapping
const roleOptions = [
  { id: 1, name: 'User' },
  { id: 2, name: 'Admin' },
  { id: 3, name: 'Teacher' }
];

// Helper function to get role name by ID
const getRoleName = (roleId) => {
  const role = roleOptions.find(r => r.id === roleId);
  return role ? role.name : 'User';
};

export default function MembersList() {
  // Table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [users, setUsers] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]); // Store all users for filtering
  
  // Sort state
  const [sortBy, setSortBy] = React.useState('name'); // 'name', 'email', 'role', 'city', 'country'
  const [sortOrder, setSortOrder] = React.useState('asc'); // 'asc', 'desc'
  
  // Use global search context
  const { globalSearchTerm, clearSearch } = useSearch();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Create new user modal
  const [open, setOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = React.useState(null);
  const [selectedRole, setSelectedRole] = React.useState(1); // Default to User role (roleId: 1)
  
  // Form field states
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    city: '',
    state: '',
    timezone: ''
  });

  const handleClickOpen = () => {
    setSelectedUser(null);
    setUploadedImageUrl(null);
    setSelectedCountry("");
    setSelectedRole(1); // Default to User role
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      city: '',
      state: '',
      timezone: ''
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setUploadedImageUrl(null);
    setSelectedCountry("");
    setSelectedRole(1); // Reset to default User role
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      city: '',
      state: '',
      timezone: ''
    });
  };

  const handleEditOpen = (user) => {
    setSelectedCountry(user.country || "");
    setSelectedUser(user);
    setUploadedImageUrl(user.profilePicture || null);
    setSelectedRole(user.roleId || 1); // Set role from user data, default to User (1)
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      username: user.username || '',
      password: '', // Don't pre-fill password for security
      city: user.city || '',
      state: user.state || '',
      timezone: user.timezone || ''
    });
    setOpen(true);
  }

  const handleDeleteConfirmation = (row) => {
    if (row.id !== currentUser.id) {
      confirm("Are you sure to delete this user?") && userService.delete(row.id).then(() => {
        handleRefresh();
      });
    } else {
      alert("You can't delete your own account.");
    }
  };

  const handleRefresh = () => {
    userService.getAll().then((response) => {
      setAllUsers(response.data); // Store all users
      const filteredAndSorted = applySearchAndSort(response.data, globalSearchTerm, sortBy, sortOrder);
      setUsers(filteredAndSorted); // Apply current search and sort
    });
  };

  // Search and Sort function
  const applySearchAndSort = (usersData, search, sort, order) => {
    let filteredUsers = [...usersData];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const email = user.username?.toLowerCase() || '';
        const city = user.city?.toLowerCase() || '';
        const country = user.country?.toLowerCase() || '';
        const role = getRoleName(user.roleId).toLowerCase();
        
        return fullName.includes(searchLower) ||
               email.includes(searchLower) ||
               city.includes(searchLower) ||
               country.includes(searchLower) ||
               role.includes(searchLower);
      });
    }

    // Apply sorting
    filteredUsers.sort((a, b) => {
      let aValue, bValue;
      
      switch (sort) {
        case 'name':
          aValue = `${a.firstName} ${a.lastName}`.toLowerCase();
          bValue = `${b.firstName} ${b.lastName}`.toLowerCase();
          break;
        case 'email':
          aValue = a.username?.toLowerCase() || '';
          bValue = b.username?.toLowerCase() || '';
          break;
        case 'role':
          aValue = getRoleName(a.roleId);
          bValue = getRoleName(b.roleId);
          break;
        case 'city':
          aValue = a.city?.toLowerCase() || '';
          bValue = b.city?.toLowerCase() || '';
          break;
        case 'state':
          aValue = a.state?.toLowerCase() || '';
          bValue = b.state?.toLowerCase() || '';
          break;
        case 'country':
          aValue = a.country?.toLowerCase() || '';
          bValue = b.country?.toLowerCase() || '';
          break;
        case 'timezone':
          aValue = a.timezone?.toLowerCase() || '';
          bValue = b.timezone?.toLowerCase() || '';
          break;
        default:
          aValue = `${a.firstName} ${a.lastName}`.toLowerCase();
          bValue = `${b.firstName} ${b.lastName}`.toLowerCase();
      }

      if (order === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return filteredUsers;
  };

  // Handle table header click for sorting
  const handleHeaderClick = (columnName) => {
    if (sortBy === columnName) {
      // Toggle sort order if same column
      const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newSortOrder);
    } else {
      // Set new column and default to ascending
      setSortBy(columnName);
      setSortOrder('asc');
    }
    setPage(0); // Reset to first page
  };

  // Render sort icon for table headers
  const renderSortIcon = (columnName) => {
    if (sortBy !== columnName) {
      return null; // No icon if not currently sorted by this column
    }
    return sortOrder === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 16, ml: 0.5 }} /> : <ArrowDownwardIcon sx={{ fontSize: 16, ml: 0.5 }} />;
  };

  // Load users on component mount
  useEffect(() => {
    handleRefresh();
  }, []);

  // Watch for changes in global search term or sorting
  useEffect(() => {
    if (allUsers.length > 0) {
      const filteredAndSorted = applySearchAndSort(allUsers, globalSearchTerm, sortBy, sortOrder);
      setUsers(filteredAndSorted);
      setPage(0); // Reset to first page when search or sort changes
    }
  }, [globalSearchTerm, allUsers, sortBy, sortOrder]);

  // Handle form field changes
  const handleFormChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedUser) {
      userService.update(selectedUser.id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        password: formData.password || undefined, // Only include password if provided
        country: selectedCountry,
        city: formData.city,
        state: formData.state,
        timezone: formData.timezone,
        profilePicture: uploadedImageUrl,
        roleId: selectedRole,
      }).then(() => {
        setSelectedUser(null);
        handleClose();
        handleRefresh();
      });
      return;
    } else {
      userService.create({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        password: formData.password,
        country: selectedCountry,
        city: formData.city,
        state: formData.state,
        timezone: formData.timezone,
        profilePicture: uploadedImageUrl,
        roleId: selectedRole,
      }).then(() => {
        handleClose();
        handleRefresh();
      });
    }
  };
  // End Add Task Modal

  return (
    <>
      <PageTitle
        pageTitle="Users"
        dashboardUrl={`/`}
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
            Create New User
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
                    cursor: "pointer",
                    userSelect: "none",
                    "&:hover": { backgroundColor: "#E3F2FD" }
                  }}
                  onClick={() => handleHeaderClick('name')}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    Name
                    {renderSortIcon('name')}
                  </Box>
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ 
                    borderBottom: "1px solid #F7FAFF", 
                    fontSize: "13.5px",
                    cursor: "pointer",
                    userSelect: "none",
                    "&:hover": { backgroundColor: "#E3F2FD" }
                  }}
                  onClick={() => handleHeaderClick('email')}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Email
                    {renderSortIcon('email')}
                  </Box>
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ 
                    borderBottom: "1px solid #F7FAFF", 
                    fontSize: "13.5px",
                    cursor: "pointer",
                    userSelect: "none",
                    "&:hover": { backgroundColor: "#E3F2FD" }
                  }}
                  onClick={() => handleHeaderClick('role')}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Role
                    {renderSortIcon('role')}
                  </Box>
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ 
                    borderBottom: "1px solid #F7FAFF", 
                    fontSize: "13.5px",
                    cursor: "pointer",
                    userSelect: "none",
                    "&:hover": { backgroundColor: "#E3F2FD" }
                  }}
                  onClick={() => handleHeaderClick('city')}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    City
                    {renderSortIcon('city')}
                  </Box>
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ 
                    borderBottom: "1px solid #F7FAFF", 
                    fontSize: "13.5px",
                    cursor: "pointer",
                    userSelect: "none",
                    "&:hover": { backgroundColor: "#E3F2FD" }
                  }}
                  onClick={() => handleHeaderClick('state')}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    State
                    {renderSortIcon('state')}
                  </Box>
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ 
                    borderBottom: "1px solid #F7FAFF", 
                    fontSize: "13.5px",
                    cursor: "pointer",
                    userSelect: "none",
                    "&:hover": { backgroundColor: "#E3F2FD" }
                  }}
                  onClick={() => handleHeaderClick('country')}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Country
                    {renderSortIcon('country')}
                  </Box>
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ 
                    borderBottom: "1px solid #F7FAFF", 
                    fontSize: "13.5px",
                    cursor: "pointer",
                    userSelect: "none",
                    "&:hover": { backgroundColor: "#E3F2FD" }
                  }}
                  onClick={() => handleHeaderClick('timezone')}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Timezone
                    {renderSortIcon('timezone')}
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
              {users.map((row) => (
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
                      <Avatar
                        src={row.profilePicture || undefined}
                        alt={`${row.firstName} ${row.lastName}`}
                        sx={{ width: 40, height: 40, mr: 1 }}
                      >
                        {!row.profilePicture && (
                          `${row.firstName?.charAt(0) || ''}${row.lastName?.charAt(0) || ''}`
                        )}
                      </Avatar>
                      <Box>
                        <Typography
                          as="h5"
                          sx={{
                            fontWeight: "500",
                            fontSize: "13.5px",
                          }}
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
                    {row.username}
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
                    {getRoleName(row.roleId)}
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
                    {row.city}
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
                    {row.state}
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
                    {row.country}
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
                    {row.timezone}
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
                          onClick={() => { handleDeleteConfirmation(row); }}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Edit" placement="top">
                        <IconButton
                          aria-label="edit"
                          size="small"
                          color="primary"
                          className="primary"
                          onClick={() => { handleEditOpen(row); }}
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
                  count={users.length}
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
                  ActionsComponent={MembersLists}
                  style={{ borderBottom: "none" }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>

      {/* Create new user modal */}
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
              {selectedUser ? "Edit User" : "Create New User"}
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
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Profile Photo
                  </Typography>

                  <ImageUpload
                    currentImageUrl={uploadedImageUrl}
                    onImageUpload={setUploadedImageUrl}
                    maxSize={5 * 1024 * 1024} // 5MB
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
                    First Name
                  </Typography>

                  <TextField
                    autoComplete="first-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formData.firstName}
                    onChange={handleFormChange('firstName')}
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
                    Last Name
                  </Typography>

                  <TextField
                    autoComplete="last-name"
                    name="lastName"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoFocus
                    value={formData.lastName}
                    onChange={handleFormChange('lastName')}
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
                    Email
                  </Typography>

                  <TextField
                    autoComplete="email"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="example@info.com"
                    autoFocus
                    value={formData.username}
                    onChange={handleFormChange('username')}
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
                    Password
                  </Typography>

                  <TextField
                    autoComplete="password"
                    name="password"
                    required={selectedUser ? false : true}
                    fullWidth
                    id="password"
                    label="Password"
                    autoFocus
                    value={formData.password}
                    onChange={handleFormChange('password')}
                    type="password"
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
                    Role
                  </Typography>

                  <Select
                    value={selectedRole}
                    onChange={(event) => setSelectedRole(event.target.value)}
                    fullWidth
                    displayEmpty
                    inputProps={{ 'aria-label': 'Role' }}
                    sx={{ borderRadius: 2 }}
                  >
                    {roleOptions.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
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
                    City
                  </Typography>

                  <TextField
                    autoComplete="city"
                    name="city"
                    fullWidth
                    id="city"
                    label="City"
                    autoFocus
                    value={formData.city}
                    onChange={handleFormChange('city')}
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
                    State
                  </Typography>

                  <TextField
                    autoComplete="state"
                    name="state"
                    fullWidth
                    id="state"
                    label="State"
                    autoFocus
                    value={formData.state}
                    onChange={handleFormChange('state')}
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
                    Country
                  </Typography>

                  <Select
                    id="country"
                    name="country"
                    label="Country"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    fullWidth
                    sx={{ borderRadius: 2 }}
                  >
                    {countryNames.map((country) => (
                      <MenuItem key={country.code} value={country.name}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
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
                    Timezone
                  </Typography>

                  <TextField
                    autoComplete="timezone"
                    name="timezone"
                    fullWidth
                    id="timezone"
                    label="Timezone"
                    autoFocus
                    value={formData.timezone}
                    onChange={handleFormChange('timezone')}
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
                    {selectedUser && (
                      <EditIcon
                        sx={{
                          position: "relative",
                          top: "-2px",
                        }}
                        className="mr-3px"
                      />
                    )}
                    {!selectedUser && (
                      <AddIcon
                        sx={{
                          position: "relative",
                          top: "-2px",
                        }}
                        className="mr-3px"
                      />
                    )}
                    {" "}
                    {selectedUser ? "Edit User" : "Create New User"}
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

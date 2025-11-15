"use client";
import { useEffect } from "react";
import * as React from "react";
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
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import authService from "@/services/auth.service";
import emailTemplateService from "@/services/email-template.service";
import { useSearch } from "@/contexts/SearchContext";
import { withEmailTemplatesPageProtection } from "@/components/Common/withRoleProtection";
import Editor from "react-simple-wysiwyg";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

// Create new email template Modal
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
// End Create new email template Modal

function EmailTemplatesLists(props) {
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

EmailTemplatesLists.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function EmailTemplatesList() {
  // Table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [emailTemplates, setEmailTemplates] = React.useState([]);
  const [allEmailTemplates, setAllEmailTemplates] = React.useState([]); // Store all email templates for filtering
  
  // Sort state
  const [sortBy, setSortBy] = React.useState('name'); // 'name', 'subject', 'body'
  const [sortOrder, setSortOrder] = React.useState('asc'); // 'asc', 'desc'
  
  // Use global search context
  const { globalSearchTerm } = useSearch();
  
  // Get current user inside component
  const currentUser = authService.getCurrentUser();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - emailTemplates.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Create new email template modal
  const [open, setOpen] = React.useState(false);
  const [selectedEmailTemplate, setSelectedEmailTemplate] = React.useState(null);
  
  // Form data state
  const [formData, setFormData] = React.useState({
    name: '',
    subject: '',
    body: '',
  });

  // Handle form field changes
  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
    setSelectedEmailTemplate(null);
    setFormData({
      name: '',
      subject: '',
      body: '',
    });
  };
  
  const handleClose = () => {
    setOpen(false);
    setSelectedEmailTemplate(null);
    setFormData({
      name: '',
      subject: '',
      body: '',
    });
  };

  const handleEditOpen = (emailTemplate) => {
    setSelectedEmailTemplate(emailTemplate);
    setFormData({
      name: emailTemplate.name,
      subject: emailTemplate.subject,
      body: emailTemplate.body,
    });
    setOpen(true);
  }

  const handleDeleteConfirmation = (row) => {
    const isConfirm = window.confirm(
      `Are you sure you want to delete ${row.name}?`
    );
    if (isConfirm) {
      handleDelete(row.id);
    }
  };

  const handleRefresh = () => {
    emailTemplateService
      .getAll()
      .then((response) => {
        // Ensure we have valid data before setting state
        const templates = response?.data || [];
        setAllEmailTemplates(Array.isArray(templates) ? templates : []);
      })
      .catch((error) => {
        console.error("Error fetching email templates:", error);
        // Set empty array on error to prevent crashes
        setAllEmailTemplates([]);
      });
  };

  // Search and Sort function
  const applySearchAndSort = (templatesData, search, sort, order) => {
    // Ensure we have valid array data
    if (!Array.isArray(templatesData)) {
      return [];
    }
    
    let filtered = [...templatesData]; // Create a copy to avoid mutating original
    
    // Apply search filter
    if (search && search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = templatesData.filter(template => {
        // Ensure template is an object with the expected properties
        if (!template || typeof template !== 'object') return false;
        
        return (
          (template.name && template.name.toLowerCase().includes(searchLower)) ||
          (template.subject && template.subject.toLowerCase().includes(searchLower)) ||
          (template.body && template.body.toLowerCase().includes(searchLower))
        );
      });
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      // Ensure both items exist and have the sort field
      if (!a || !b) return 0;
      
      let aValue = a[sort] || '';
      let bValue = b[sort] || '';
      
      // Convert to lowercase for case-insensitive sorting
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();
      
      if (order === 'asc') {
        if (aValue < bValue) return -1;
        if (aValue > bValue) return 1;
        return 0;
      } else {
        if (aValue > bValue) return -1;
        if (aValue < bValue) return 1;
        return 0;
      }
    });
    
    return filtered;
  };

  // Handle column header click for sorting
  const handleHeaderClick = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  // Render sort icon for table headers
  const renderSortIcon = (column) => {
    if (sortBy !== column) return null;
    return sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />;
  };

  // Apply search and sort when globalSearchTerm or sort options change
  useEffect(() => {
    const filtered = applySearchAndSort(allEmailTemplates, globalSearchTerm, sortBy, sortOrder);
    setEmailTemplates(filtered);
    setPage(0); // Reset to first page when search changes
  }, [globalSearchTerm, sortBy, sortOrder, allEmailTemplates]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (selectedEmailTemplate) {
      // Update existing email template
      emailTemplateService
        .update(selectedEmailTemplate.id, formData)
        .then((response) => {
          console.log("Email template updated successfully:", response.data);
          handleClose();
          handleRefresh();
        })
        .catch((error) => {
          console.error("Error updating email template:", error);
        });
    } else {
      // Create new email template
      emailTemplateService
        .create(formData)
        .then((response) => {
          console.log("Email template created successfully:", response.data);
          handleClose();
          handleRefresh();
        })
        .catch((error) => {
          console.error("Error creating email template:", error);
        });
    }
  };

  const handleDelete = (id) => {
    emailTemplateService
      .delete(id)
      .then((response) => {
        console.log("Email template deleted successfully");
        handleRefresh();
      })
      .catch((error) => {
        console.error("Error deleting email template:", error);
      });
  };
  // End Add Email Template 
  
  useEffect(() => {
    emailTemplateService
      .getAll()
      .then((response) => {
        // Ensure we have valid data before setting state
        const templates = response?.data || [];
        setAllEmailTemplates(Array.isArray(templates) ? templates : []);
      })
      .catch((error) => {
        console.error("Error fetching email templates:", error);
        // Set empty array on error to prevent crashes
        setAllEmailTemplates([]);
      });
  }, []);

  return (
    <>
      <PageTitle
        pageTitle="Email Templates"
        dashboardUrl="/"
        dashboardText="Dashboard"
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
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
          mb="25px"
        >
          <Grid item xs={12} sm={5} md={5} lg={4}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "16px", md: "18px" },
                fontWeight: 700,
                mb: '0'
              }}
              className="text-black"
            >
              Email Templates List
            </Typography>
          </Grid>

          <Grid item xs={12} sm={7} md={7} lg={8}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                gap: "10px",
              }}
            >
              <Tooltip title="Refresh Email Templates" placement="top">
                <IconButton 
                  onClick={handleRefresh}
                  sx={{
                    background: "#ecf0ff",
                    fontSize: "16px",
                    width: "auto",
                    height: "auto",
                    padding: "10px",
                    color: "#5b70f7",
                    "&:hover": {
                      background: "#5b70f7",
                      color: "#fff",
                    },
                  }}
                  className="ml-10px"
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>

              <Button
                onClick={handleClickOpen}
                variant="outlined"
                sx={{
                  textTransform: "capitalize",
                  borderRadius: "7px",
                  fontWeight: "500",
                  fontSize: { xs: "13px", sm: "16px" },
                  padding: { xs: "10px 20px", sm: "10px 24px" },
                  color: "#5b70f7",
                  border: "1px solid #5b70f7",
                  "&:hover": {
                    backgroundColor: "#5b70f7",
                    color: "#fff",
                  },
                }}
                className="border text-body hover-bg"
              >
                <AddIcon
                  sx={{
                    position: "relative",
                    top: "-1px",
                  }}
                  className="mr-5px"
                />
                Add Email Template
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            marginLeft: "-25px",
            marginRight: "-25px",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none",
              borderRadius: "7px",
            }}
            className="rmui-table"
          >
            <Table sx={{ minWidth: 650 }} aria-label="Email Templates table">
              <TableHead className="bg-primary-50">
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "10px 24px",
                      fontSize: "14px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                    className="text-black border-bottom"
                    onClick={() => handleHeaderClick('name')}
                  >
                    Name {renderSortIcon('name')}
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "10px 20px",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                    className="text-black border-bottom"
                    onClick={() => handleHeaderClick('subject')}
                  >
                    <Box display="flex" alignItems="center" gap="5px">
                      Subject {renderSortIcon('subject')}
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "10px 20px",
                      fontSize: "14px",
                      cursor: "pointer",
                      width: "40%",
                    }}
                    className="text-black border-bottom"
                    onClick={() => handleHeaderClick('body')}
                  >
                    <Box display="flex" alignItems="center" gap="5px">
                      Content Preview (HTML) {renderSortIcon('body')}
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: "500",
                      padding: "10px 20px",
                      fontSize: "14px",
                    }}
                    className="text-black border-bottom"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {(rowsPerPage > 0
                  ? emailTemplates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : emailTemplates
                ).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell
                      sx={{
                        padding: "15px 20px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                      className="border-bottom"
                    >
                      {row.name}
                    </TableCell>

                    <TableCell
                      sx={{
                        padding: "15px 20px",
                        fontSize: "14px",
                      }}
                      className="border-bottom"
                    >
                      {row.subject}
                    </TableCell>

                    <TableCell
                      sx={{
                        padding: "15px 20px",
                        fontSize: "14px",
                        maxWidth: "400px",
                        width: "40%",
                      }}
                      className="border-bottom"
                    >
                      <Box
                        sx={{
                          overflow: "hidden",
                          maxHeight: "120px",
                          lineHeight: 1.4,
                        }}
                      >
                        <div 
                          dangerouslySetInnerHTML={{ 
                            __html: row.body?.substring(0, 500) + (row.body?.length > 500 ? '...' : '') 
                          }}
                          style={{
                            fontSize: '13px',
                            color: '#666',
                            wordBreak: 'break-word'
                          }}
                        />
                      </Box>
                    </TableCell>

                    <TableCell
                      sx={{
                        padding: "15px 20px",
                      }}
                      className="border-bottom"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Tooltip title="Edit Email Template" placement="top">
                          <IconButton
                            onClick={() => handleEditOpen(row)}
                            aria-label="edit"
                            color="primary"
                            sx={{ padding: "5px" }}
                          >
                            <DriveFileRenameOutlineIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Email Template" placement="top">
                          <IconButton
                            onClick={() => handleDeleteConfirmation(row)}
                            aria-label="delete"
                            color="error"
                            sx={{ padding: "5px" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={4} />
                  </TableRow>
                )}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                    colSpan={4}
                    count={emailTemplates.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={EmailTemplatesLists}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Card>

      {/* Create/Edit Email Template Modal */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "900px",
            width: "100%",
          },
        }}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {selectedEmailTemplate ? "Edit Email Template" : "Add New Email Template"}
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              }}
            >
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Template Name"
                autoFocus={!selectedEmailTemplate}
                disabled={!!selectedEmailTemplate}
                InputProps={{
                  style: { 
                    borderRadius: 8,
                    backgroundColor: selectedEmailTemplate ? '#f5f5f5' : 'white'
                  },
                }}
                onChange={handleFormChange}
                value={formData.name}
                sx={{ gridColumn: "1 / -1" }}
                helperText={selectedEmailTemplate ? "Template name cannot be changed after creation" : "Enter a unique name for this email template"}
              />

              <TextField
                required
                fullWidth
                id="subject"
                label="Email Subject"
                name="subject"
                autoComplete="subject"
                InputProps={{
                  style: { borderRadius: 8 },
                }}
                onChange={handleFormChange}
                value={formData.subject}
                sx={{ gridColumn: "1 / -1" }}
              />

              <Box sx={{ gridColumn: "1 / -1" }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1, 
                    fontWeight: 500,
                    color: 'rgba(0, 0, 0, 0.6)'
                  }}
                >
                  Email Body *
                </Typography>
                <Editor
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  containerProps={{
                    style: {
                      border: '1px solid #c4c4c4',
                      borderRadius: '8px',
                      minHeight: '200px'
                    }
                  }}
                />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    mt: 0.5, 
                    display: 'block',
                    color: 'rgba(0, 0, 0, 0.6)'
                  }}
                >
                  Use the rich text editor to format your email content with bold, italic, lists, and more.
                </Typography>
              </Box>

              {/* Email Preview Section */}
              {formData.body && (
                <Box sx={{ gridColumn: "1 / -1", mt: 2 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 1, 
                      fontWeight: 500,
                      color: 'rgba(0, 0, 0, 0.6)'
                    }}
                  >
                    Email Preview
                  </Typography>
                  <Box
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      padding: '16px',
                      backgroundColor: '#f9f9f9',
                      maxHeight: '200px',
                      overflow: 'auto'
                    }}
                  >
                    <div 
                      dangerouslySetInnerHTML={{ __html: formData.body }}
                      style={{
                        fontSize: '14px',
                        lineHeight: 1.5
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button 
            onClick={handleClose}
            sx={{
              color: '#5b70f7',
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            onClick={handleSubmit}
            sx={{
              bgcolor: '#5b70f7',
              color: 'white',
              '&:hover': {
                bgcolor: '#4c63d2',
              },
            }}
          >
            {selectedEmailTemplate ? "Update Template" : "Create Template"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default withEmailTemplatesPageProtection(EmailTemplatesList);
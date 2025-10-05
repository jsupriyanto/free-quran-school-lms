"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
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
import Link from "@mui/material/Link";
import Image from "next/image";
import enrollmentService from "@/services/enrollment.service";
import { useEffect } from "react";
import moment from "moment";
import authService from "@/services/auth.service";

moment.tz = authService.getCurrentUser()?.timeZone || "America/Chicago";

function HighProgressCourse(props) {
  
  
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

HighProgressCourse.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function HighProgressCourses() {
  const [enrollments, setEnrollments] = React.useState([]);
  // Table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - enrollments.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

    useEffect(() => { 
    enrollmentService.getEnrollmentWithHighProgress().then((response) => {
      setEnrollments(response.data);
    });
  }, []);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
        }}
      >
        <Table
          sx={{ minWidth: 650 }}
          aria-label="custom pagination table"
          className="dark-table"
        >
          <TableHead sx={{ background: "#F7FAFF" }}>
            <TableRow>
              <TableCell
                sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
              >
                Name
              </TableCell>

              <TableCell
                sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
              >
                Courses
              </TableCell>

              <TableCell
                sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
              >
                Start Date
              </TableCell>

              <TableCell
                sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
              >
                End Date
              </TableCell>

              <TableCell
                align="right"
                sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
              >
                Enrolled Date
              </TableCell>
              
              <TableCell
                align="center"
                sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
              >
                Percentage
              </TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? enrollments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : enrollments
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell
                  style={{
                    width: 120,
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13px",
                    paddingTop: "13px",
                    paddingBottom: "13px",
                  }}
                >
                  {row.user.firstName} {row.user.lastName}
                </TableCell>
                <TableCell
                  style={{
                    width: 350,
                    borderBottom: "1px solid #F7FAFF",
                    paddingTop: "13px",
                    paddingBottom: "13px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={row.course.coursePictureUrl}
                      alt="Product Img"
                      width={65}
                      height={65}
                      className="borderRadius10"
                    />
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "13.5px",
                      }}
                      className="ml-10px"
                    >
                      <Link
                        href={row.course.coursePictureUrl}
                        underline="none"
                        color="#260944"
                      >
                        {row.course.title}
                      </Link>
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell
                  style={{
                    width: 120,
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13px",
                    paddingTop: "13px",
                    paddingBottom: "13px",
                  }}
                >
                  {moment(row.course.startDate).format('L')}
                  
                </TableCell>

                <TableCell
                  style={{
                    width: 120,
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13px",
                    paddingTop: "13px",
                    paddingBottom: "13px",
                  }}
                >
                  {moment(row.course.endDate).format('L')}
                </TableCell>

                <TableCell
                  style={{
                    width: 120,
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13px",
                    paddingTop: "13px",
                    paddingBottom: "13px",
                  }}
                >
                  {moment(row.course.enrolledAt).format('L')}
                </TableCell>

                <TableCell
                  align="center"
                  style={{
                    fontWeight: 500,
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "12px",
                    paddingTop: "13px",
                    paddingBottom: "13px",
                  }}
                >
                  <span className={row.badgeClass}>{row.progress} %</span>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell
                  colSpan={4}
                  style={{ borderBottom: "1px solid #F7FAFF" }}
                />
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={4}
                count={enrollments.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                // onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={HighProgressCourse}
                style={{ borderBottom: "none" }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

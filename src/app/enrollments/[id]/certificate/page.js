"use client";
import React from "react";
import { Box, Typography, Card, Button, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import VerifiedIcon from "@mui/icons-material/Verified";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GradeIcon from "@mui/icons-material/Grade";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";

// Sample certificate data
const certificateData = {
  isEligible: true,
  isIssued: false,
  requirements: {
    minimumProgress: 80,
    currentProgress: 75,
    minimumGrade: "C",
    currentGrade: "A",
    requiredAssignments: 5,
    completedAssignments: 4,
    requiredQuizzes: 4,
    completedQuizzes: 4
  },
  certificate: {
    id: "CERT-2025-ARA-001",
    courseName: "Arabic Language Basics",
    studentName: "Ahmed Hassan",
    instructorName: "Dr. Sarah Ahmed",
    institution: "Free Quran School",
    completionDate: null, // Will be set when course is completed
    issueDate: null,
    grade: "A",
    creditsEarned: 3,
    validationCode: "QS-ARA-2025-12345",
    description: "This certificate is awarded to students who have successfully completed the Arabic Language Basics course, demonstrating proficiency in fundamental Arabic reading, writing, and pronunciation skills."
  },
  nextSteps: [
    {
      title: "Complete Remaining Lessons",
      description: "Finish lessons 19-25 to reach 100% completion",
      status: "pending",
      progress: "18/25 lessons completed"
    },
    {
      title: "Submit Final Assignment",
      description: "Complete and submit the final course project",
      status: "pending",
      progress: "4/5 assignments submitted"
    },
    {
      title: "Pass Final Assessment",
      description: "Achieve minimum 70% on the final course assessment",
      status: "locked",
      progress: "Available after completing all lessons"
    }
  ],
  sampleCertificates: [
    {
      id: 1,
      courseName: "Islamic Studies 101",
      completionDate: "2024-12-15",
      grade: "A+",
      status: "issued"
    },
    {
      id: 2,
      courseName: "Quran Recitation Level 1",
      completionDate: "2024-08-20",
      grade: "A",
      status: "issued"
    }
  ]
};

export default function EnrollmentCertificate() {
  const handleDownloadCertificate = () => {
    // In a real app, this would generate and download the certificate PDF
    alert("Certificate download will be available once you complete the course requirements.");
  };

  const handlePrintCertificate = () => {
    // In a real app, this would open print dialog for the certificate
    alert("Certificate printing will be available once you complete the course requirements.");
  };

  const handleShareCertificate = () => {
    // In a real app, this would open share options
    alert("Certificate sharing will be available once you complete the course requirements.");
  };

  const calculateProgressPercentage = () => {
    const req = certificateData.requirements;
    const totalRequirements = 4; // progress, grade, assignments, quizzes
    let metRequirements = 0;

    if (req.currentProgress >= req.minimumProgress) metRequirements++;
    if (req.currentGrade >= req.minimumGrade) metRequirements++;
    if (req.completedAssignments >= req.requiredAssignments) metRequirements++;
    if (req.completedQuizzes >= req.requiredQuizzes) metRequirements++;

    return Math.round((metRequirements / totalRequirements) * 100);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not yet completed";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const progressPercentage = calculateProgressPercentage();

  return (
    <Grid container spacing={3}>
      {/* Certificate Status */}
      <Grid size={{ xs: 12 }}>
        <Card
          sx={{
            padding: "25px",
            borderRadius: "7px",
            boxShadow: "none",
            border: "1px solid #eee",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Certificate Status
          </Typography>

          <Box sx={{ textAlign: "center", mb: 4 }}>
            {certificateData.isIssued ? (
              <Box>
                <VerifiedIcon sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: "success.main", mb: 1 }}>
                  Certificate Issued!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Congratulations! Your certificate is ready for download.
                </Typography>
              </Box>
            ) : (
              <Box>
                <SchoolIcon sx={{ fontSize: 80, color: "warning.main", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: "warning.main", mb: 1 }}>
                  Certificate Pending
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Complete all requirements to earn your certificate
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, color: "primary.main" }}>
                  {progressPercentage}% Complete
                </Typography>
              </Box>
            )}
          </Box>

          {certificateData.isIssued && (
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadCertificate}
                sx={{ textTransform: "capitalize" }}
              >
                Download Certificate
              </Button>
              <Button
                variant="outlined"
                startIcon={<PrintIcon />}
                onClick={handlePrintCertificate}
                sx={{ textTransform: "capitalize" }}
              >
                Print
              </Button>
              <Button
                variant="outlined"
                startIcon={<ShareIcon />}
                onClick={handleShareCertificate}
                sx={{ textTransform: "capitalize" }}
              >
                Share
              </Button>
            </Box>
          )}
        </Card>
      </Grid>

      {/* Certificate Requirements */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card
          sx={{
            padding: "25px",
            borderRadius: "7px",
            boxShadow: "none",
            border: "1px solid #eee",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Certificate Requirements
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography variant="body2">Course Progress</Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  color: certificateData.requirements.currentProgress >= certificateData.requirements.minimumProgress ? "success.main" : "warning.main"
                }}
              >
                {certificateData.requirements.currentProgress}% / {certificateData.requirements.minimumProgress}%
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {certificateData.requirements.currentProgress >= certificateData.requirements.minimumProgress ? (
                <VerifiedIcon sx={{ fontSize: 16, color: "success.main" }} />
              ) : (
                <Box sx={{ width: 16, height: 16, border: "2px solid #ff9800", borderRadius: "50%" }} />
              )}
              <Typography variant="caption" color="text.secondary">
                Minimum {certificateData.requirements.minimumProgress}% course completion required
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography variant="body2">Minimum Grade</Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  color: "success.main"
                }}
              >
                {certificateData.requirements.currentGrade} / {certificateData.requirements.minimumGrade}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <VerifiedIcon sx={{ fontSize: 16, color: "success.main" }} />
              <Typography variant="caption" color="text.secondary">
                Maintain minimum grade of {certificateData.requirements.minimumGrade}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography variant="body2">Assignments</Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  color: certificateData.requirements.completedAssignments >= certificateData.requirements.requiredAssignments ? "success.main" : "warning.main"
                }}
              >
                {certificateData.requirements.completedAssignments} / {certificateData.requirements.requiredAssignments}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {certificateData.requirements.completedAssignments >= certificateData.requirements.requiredAssignments ? (
                <VerifiedIcon sx={{ fontSize: 16, color: "success.main" }} />
              ) : (
                <Box sx={{ width: 16, height: 16, border: "2px solid #ff9800", borderRadius: "50%" }} />
              )}
              <Typography variant="caption" color="text.secondary">
                Complete all required assignments
              </Typography>
            </Box>
          </Box>

          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography variant="body2">Quizzes</Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  color: "success.main"
                }}
              >
                {certificateData.requirements.completedQuizzes} / {certificateData.requirements.requiredQuizzes}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <VerifiedIcon sx={{ fontSize: 16, color: "success.main" }} />
              <Typography variant="caption" color="text.secondary">
                Pass all required quizzes
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>

      {/* Next Steps */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card
          sx={{
            padding: "25px",
            borderRadius: "7px",
            boxShadow: "none",
            border: "1px solid #eee",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Next Steps
          </Typography>

          {certificateData.nextSteps.map((step, index) => (
            <Box key={index} sx={{ mb: 3, pb: 3, borderBottom: index < certificateData.nextSteps.length - 1 ? "1px solid #f0f0f0" : "none" }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: step.status === "locked" ? "grey.300" : step.status === "completed" ? "success.main" : "warning.main",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: 600,
                    mt: 0.5
                  }}
                >
                  {index + 1}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {step.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {step.progress}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Card>
      </Grid>

      {/* Certificate Preview */}
      <Grid size={{ xs: 12 }}>
        <Card
          sx={{
            padding: "25px",
            borderRadius: "7px",
            boxShadow: "none",
            border: "1px solid #eee",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Certificate Preview
          </Typography>

          {/* Mock Certificate Design */}
          <Box
            sx={{
              border: "3px solid #1976d2",
              borderRadius: 2,
              padding: "40px",
              backgroundColor: "grey.50",
              textAlign: "center",
              position: "relative",
              opacity: certificateData.isIssued ? 1 : 0.6
            }}
          >
            {!certificateData.isIssued && (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) rotate(-45deg)",
                  fontSize: "48px",
                  fontWeight: 600,
                  color: "error.main",
                  opacity: 0.3,
                  zIndex: 1
                }}
              >
                PREVIEW
              </Box>
            )}

            <Typography variant="h4" sx={{ fontWeight: 600, color: "primary.main", mb: 2 }}>
              Certificate of Completion
            </Typography>

            <Typography variant="h6" sx={{ mb: 3, color: "text.secondary" }}>
              Free Quran School
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
              This is to certify that
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "primary.main" }}>
              {certificateData.certificate.studentName}
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
              has successfully completed the course
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              {certificateData.certificate.courseName}
            </Typography>

            <Typography variant="body2" sx={{ mb: 4, maxWidth: 600, mx: "auto", lineHeight: 1.6 }}>
              {certificateData.certificate.description}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 600, mx: "auto" }}>
              <Box sx={{ textAlign: "center" }}>
                <Divider sx={{ width: 150, mb: 1 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {certificateData.certificate.instructorName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Course Instructor
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  Grade: {certificateData.certificate.grade}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Final Grade
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  {formatDate(certificateData.certificate.completionDate)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Completion Date
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #ddd" }}>
              <Typography variant="caption" color="text.secondary">
                Certificate ID: {certificateData.certificate.id} | Validation Code: {certificateData.certificate.validationCode}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>

      {/* Previous Certificates */}
      {certificateData.sampleCertificates.length > 0 && (
        <Grid size={{ xs: 12 }}>
          <Card
            sx={{
              padding: "25px",
              borderRadius: "7px",
              boxShadow: "none",
              border: "1px solid #eee",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Previous Certificates
            </Typography>

            <Grid container spacing={2}>
              {certificateData.sampleCertificates.map((cert) => (
                <Grid key={cert.id} size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 2,
                      padding: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      backgroundColor: "background.paper"
                    }}
                  >
                    <VerifiedIcon sx={{ color: "success.main", fontSize: 32 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {cert.courseName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Completed: {formatDate(cert.completionDate)}
                      </Typography>
                      <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                        Grade: {cert.grade}
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DownloadIcon />}
                      sx={{ textTransform: "capitalize" }}
                    >
                      Download
                    </Button>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}
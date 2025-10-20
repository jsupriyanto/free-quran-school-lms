"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Tabs, Tab, Card, Chip, Rating } from "@mui/material";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import courseService from "@/services/course.service";
import PageTitle from "@/components/Common/PageTitle";
import Link from "next/link";

// Simple HTML sanitization function for course descriptions
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

// Extract first paragraph from HTML content
const getFirstParagraph = (html) => {
  if (!html) return "";
  
  // Client-side only
  if (typeof window === 'undefined') return html;
  
  try {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Try to find the first paragraph tag
    const firstP = tempDiv.querySelector('p');
    if (firstP) {
      return firstP.outerHTML;
    }
    
    // If no paragraph tags, look for the first text content before any block elements
    const textNodes = [];
    const walker = document.createTreeWalker(
      tempDiv,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let node;
    while (node = walker.nextNode()) {
      const text = node.textContent.trim();
      if (text) {
        textNodes.push(text);
        break; // Only get first meaningful text
      }
    }
    
    if (textNodes.length > 0) {
      return `<p>${textNodes[0]}</p>`;
    }
    
    // Fallback: return first 150 characters
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    const truncated = textContent.substring(0, 150).trim();
    return truncated ? `<p>${truncated}${truncated.length === 150 ? '...' : ''}</p>` : "";
    
  } catch (error) {
    console.warn('First paragraph extraction failed:', error);
    // Fallback: return first 150 characters of plain text
    const plainText = html.replace(/<[^>]*>/g, '');
    const truncated = plainText.substring(0, 150).trim();
    return truncated ? `<p>${truncated}${truncated.length === 150 ? '...' : ''}</p>` : "";
  }
};

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`course-tabpanel-${index}`}
      aria-labelledby={`course-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `course-tab-${index}`,
    'aria-controls': `course-tabpanel-${index}`,
  };
}

export default function CourseLayout({ children }) {
  const params = useParams();
  const pathname = usePathname();
  const courseId = params.id;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  // Determine current tab based on pathname
  useEffect(() => {
    if (pathname.includes('/curriculum')) {
      setTabValue(1);
    } else if (pathname.includes('/reviews')) {
      setTabValue(2);
    } else if (pathname.includes('/teachers')) {
      setTabValue(3);
    } else {
      setTabValue(0); // Overview
    }
  }, [pathname]);

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const response = await courseService.get(courseId);
      if (response.data) {
        setCourse(response.data);
      } else {
        // Fallback with sample data for development
        const sampleCourse = {
          id: parseInt(courseId),
          title: "Quran Recitation Basics",
          description: "<p>Learn the <strong>fundamentals</strong> of Quran recitation with proper <em>Tajweed rules</em> and pronunciation techniques.</p><p>This comprehensive course includes:</p><ul><li>Basic Arabic pronunciation</li><li>Tajweed rules and application</li><li>Practical recitation exercises</li></ul><p><u>Prerequisites</u>: Basic knowledge of Arabic alphabet recommended.</p>",
          skillLevel: "Beginner",
          duration: "8 weeks",
          numberOfLessons: 24,
          category: "Recitation",
          coursePictureUrl: "/images/free-quran-school.jpg",
          isActive: true,
          rating: 4.8,
          startDate: "2024-03-01",
          endDate: "2024-04-26",
          lessonsCount: 24,
          createdAt: "2024-01-15",
          instructor: "Sheikh Ahmad Ali",
          enrolledStudents: 156,
          price: 99.99,
          language: "Arabic/English"
        };
        setCourse(sampleCourse);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
      setError("Failed to load course details");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Typography>Loading course details...</Typography>
      </Box>
    );
  }

  if (error || !course) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Typography color="error">{error || "Course not found"}</Typography>
      </Box>
    );
  }

  return (
    <>
      <PageTitle 
        pageTitle={course.title}
        dashboardUrl="/courses"
      />

      {/* Course Header */}
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
        className="rmui-card"
      >
        <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
          {/* Course Image */}
          <Box sx={{ 
            width: { xs: "100px", md: "150px" }, 
            height: { xs: "100px", md: "150px" }, 
            position: "relative",
            flexShrink: 0
          }}>
            <Image
              src={course.coursePictureUrl || "/images/default-course.jpg"}
              alt={course.title}
              fill
              style={{
                objectFit: "cover",
                borderRadius: "12px"
              }}
            />
          </Box>

          {/* Course Info */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
              {course.title}
            </Typography>
            
            <Box 
              sx={{ 
                mb: 2, 
                color: "text.secondary",
                fontSize: "1rem",
                lineHeight: 1.5,
                "& p": { margin: "0.5em 0" },
                "& p:first-of-type": { marginTop: 0 },
                "& p:last-of-type": { marginBottom: 0 },
                "& strong, & b": { fontWeight: "bold" },
                "& em, & i": { fontStyle: "italic" },
                "& u": { textDecoration: "underline" },
                "& ul, & ol": { paddingLeft: "1.5em", margin: "0.5em 0" },
                "& li": { margin: "0.25em 0" },
                "& a": { 
                  color: "primary.main", 
                  textDecoration: "underline",
                  "&:hover": { textDecoration: "none" }
                },
                "& br": { display: "block", margin: "0.25em 0", content: '""' }
              }}
              dangerouslySetInnerHTML={{ 
                __html: sanitizeHtml(getFirstParagraph(course.description || ""))
              }}
            />

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
              <Chip 
                label={course.skillLevel} 
                color="primary" 
                size="small" 
              />
              <Chip 
                label={course.category} 
                variant="outlined" 
                size="small" 
              />
              <Chip 
                label={`${course.duration}`} 
                variant="outlined" 
                size="small" 
              />
              <Chip 
                label={`${course.numberOfLessons} Lessons`} 
                variant="outlined" 
                size="small" 
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating value={course.rating || 0} readOnly size="small" />
                <Typography variant="body2">
                  ({course.rating || 0})
                </Typography>
              </Box>
              
              {course.enrolledStudents && (
                <Typography variant="body2" color="text.secondary">
                  {course.enrolledStudents} students enrolled
                </Typography>
              )}

              {course.startDate && (
                <Typography variant="body2" color="text.secondary">
                  Starts: {new Date(course.startDate).toLocaleDateString()}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

        {/* Navigation Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="course navigation tabs">
            <Tab 
              label="Overview" 
              component={Link}
              href={`/courses/${courseId}`}
              {...a11yProps(0)} 
            />
            <Tab 
              label="Curriculum" 
              component={Link}
              href={`/courses/${courseId}/curriculum`}
              {...a11yProps(1)} 
            />
            <Tab 
              label="Reviews" 
              component={Link}
              href={`/courses/${courseId}/reviews`}
              {...a11yProps(2)} 
            />
            <Tab 
              label="Teachers" 
              component={Link}
              href={`/courses/${courseId}/teachers`}
              {...a11yProps(3)} 
            />
          </Tabs>
        </Box>
      </Card>

      {/* Tab Content - This will be replaced by the child pages */}
      {children}
    </>
  );
}
"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Avatar,
  Rating,
  Button,
  TextField,
  Chip,
  LinearProgress,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination
} from "@mui/material";
import { useParams } from "next/navigation";
import courseReviewService from "@/services/course-review.service";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import AddIcon from "@mui/icons-material/Add";

export default function CourseReviewsPage() {
  const params = useParams();
  const courseId = params.id;
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: ""
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  useEffect(() => {
    fetchCourseReviews();
  }, [courseId]);

  const fetchCourseReviews = async () => {
    try {
      setLoading(true);
      const response = await courseReviewService.getCourseReviewsByCourseId(courseId);
      if (response.data) {
        setReviews(response.data);
      } else {
        // Fallback with sample review data
        const sampleReviews = [
          {
            id: 1,
            rating: 5,
            comment: "Excellent course! The instructor explains Tajweed rules very clearly and provides practical examples. I've improved my recitation significantly.",
            reviewDate: "2024-02-15",
            studentName: "Ahmad Hassan",
            studentAvatar: "/images/student1.jpg",
            isHelpful: true,
            helpfulCount: 12,
            verified: true
          },
          {
            id: 2,
            rating: 4,
            comment: "Great content and well-structured lessons. The only improvement I'd suggest is adding more practice exercises for each module.",
            reviewDate: "2024-02-10",
            studentName: "Fatima Al-Zahra",
            studentAvatar: "/images/student2.jpg",
            isHelpful: true,
            helpfulCount: 8,
            verified: true
          },
          {
            id: 3,
            rating: 5,
            comment: "As a beginner, this course was perfect for me. The step-by-step approach made learning Tajweed rules easy and enjoyable.",
            reviewDate: "2024-02-08",
            studentName: "Omar Abdullah",
            studentAvatar: "/images/student3.jpg",
            isHelpful: true,
            helpfulCount: 15,
            verified: false
          },
          {
            id: 4,
            rating: 4,
            comment: "Very informative course with high-quality video content. The pronunciation guides are particularly helpful.",
            reviewDate: "2024-02-05",
            studentName: "Aisha Mohammed",
            studentAvatar: "/images/student4.jpg",
            isHelpful: true,
            helpfulCount: 6,
            verified: true
          },
          {
            id: 5,
            rating: 3,
            comment: "Good course overall, but I wish there were more interactive elements and quizzes to test understanding.",
            reviewDate: "2024-02-01",
            studentName: "Yusuf Ibrahim",
            studentAvatar: "/images/student5.jpg",
            isHelpful: false,
            helpfulCount: 3,
            verified: false
          },
          {
            id: 6,
            rating: 5,
            comment: "Outstanding course! The instructor's expertise is evident, and the course materials are comprehensive. Highly recommended!",
            reviewDate: "2024-01-28",
            studentName: "Maryam Khalil",
            studentAvatar: "/images/student6.jpg",
            isHelpful: true,
            helpfulCount: 20,
            verified: true
          }
        ];
        setReviews(sampleReviews);
      }
    } catch (error) {
      console.error("Error fetching course reviews:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateReviewStats = () => {
    if (reviews.length === 0) return { averageRating: 0, totalReviews: 0, ratingDistribution: [] };

    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    
    const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
      const rating = 5 - i;
      const count = reviews.filter(review => review.rating === rating).length;
      return { rating, count, percentage: (count / totalReviews) * 100 };
    });

    return { averageRating, totalReviews, ratingDistribution };
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (newReview.rating === 0 || !newReview.comment.trim()) return;

    try {
      const reviewData = {
        courseId: parseInt(courseId),
        rating: newReview.rating,
        comment: newReview.comment.trim()
      };

      const response = await courseReviewService.createCourseReview(reviewData);
      if (response.data) {
        setReviews(prev => [response.data, ...prev]);
      } else {
        // Fallback for development
        const newReviewItem = {
          id: Date.now(),
          ...reviewData,
          reviewDate: new Date().toISOString().split('T')[0],
          studentName: "Current User",
          studentAvatar: "/images/default-avatar.jpg",
          isHelpful: false,
          helpfulCount: 0,
          verified: false
        };
        setReviews(prev => [newReviewItem, ...prev]);
      }

      setNewReview({ rating: 0, comment: "" });
      setShowReviewForm(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const getFilteredAndSortedReviews = () => {
    let filteredReviews = reviews;

    // Filter by rating
    if (filterRating !== "all") {
      filteredReviews = reviews.filter(review => review.rating === parseInt(filterRating));
    }

    // Sort reviews
    switch (sortBy) {
      case "newest":
        filteredReviews.sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate));
        break;
      case "oldest":
        filteredReviews.sort((a, b) => new Date(a.reviewDate) - new Date(b.reviewDate));
        break;
      case "highest":
        filteredReviews.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        filteredReviews.sort((a, b) => a.rating - b.rating);
        break;
      case "helpful":
        filteredReviews.sort((a, b) => b.helpfulCount - a.helpfulCount);
        break;
      default:
        break;
    }

    return filteredReviews;
  };

  const paginateReviews = (reviews) => {
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    return reviews.slice(startIndex, endIndex);
  };

  const { averageRating, totalReviews, ratingDistribution } = calculateReviewStats();
  const filteredReviews = getFilteredAndSortedReviews();
  const paginatedReviews = paginateReviews(filteredReviews);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Typography>Loading reviews...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Reviews Overview */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Course Reviews
            </Typography>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Typography variant="h2" sx={{ fontWeight: 700, color: "primary.main" }}>
                {averageRating.toFixed(1)}
              </Typography>
              <Box>
                <Rating value={averageRating} readOnly precision={0.1} />
                <Typography variant="body2" color="text.secondary">
                  Based on {totalReviews} reviews
                </Typography>
              </Box>
            </Box>

            {/* Rating Distribution */}
            <Box sx={{ mb: 3 }}>
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <Box key={rating} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, minWidth: 60 }}>
                    <Typography variant="body2">{rating}</Typography>
                    <StarIcon fontSize="small" color="warning" />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={percentage}
                    sx={{ flex: 1, height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 30 }}>
                    {count}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Button
              variant="contained"
              fullWidth
              startIcon={<AddIcon />}
              onClick={() => setShowReviewForm(!showReviewForm)}
              sx={{ textTransform: "none" }}
            >
              Write a Review
            </Button>
          </Card>
        </Grid>

        {/* Reviews List */}
        <Grid item xs={12} md={8}>
          {/* Review Form */}
          {showReviewForm && (
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Write Your Review
              </Typography>
              
              <Box component="form" onSubmit={handleSubmitReview}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Your Rating
                  </Typography>
                  <Rating
                    value={newReview.rating}
                    onChange={(event, newValue) => {
                      setNewReview(prev => ({ ...prev, rating: newValue }));
                    }}
                    size="large"
                  />
                </Box>

                <TextField
                  fullWidth
                  label="Your Review"
                  multiline
                  rows={4}
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  sx={{ mb: 2 }}
                  placeholder="Share your experience with this course..."
                />

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={newReview.rating === 0 || !newReview.comment.trim()}
                  >
                    Submit Review
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setShowReviewForm(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Card>
          )}

          {/* Filter and Sort Controls */}
          <Card sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Filter by Rating</InputLabel>
                <Select
                  value={filterRating}
                  label="Filter by Rating"
                  onChange={(e) => setFilterRating(e.target.value)}
                >
                  <MenuItem value="all">All Ratings</MenuItem>
                  <MenuItem value="5">5 Stars</MenuItem>
                  <MenuItem value="4">4 Stars</MenuItem>
                  <MenuItem value="3">3 Stars</MenuItem>
                  <MenuItem value="2">2 Stars</MenuItem>
                  <MenuItem value="1">1 Star</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                  <MenuItem value="highest">Highest Rating</MenuItem>
                  <MenuItem value="lowest">Lowest Rating</MenuItem>
                  <MenuItem value="helpful">Most Helpful</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="body2" color="text.secondary">
                Showing {paginatedReviews.length} of {filteredReviews.length} reviews
              </Typography>
            </Box>
          </Card>

          {/* Reviews */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
            {paginatedReviews.map((review) => (
              <Card key={review.id} sx={{ p: 3 }}>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <Avatar 
                    src={review.studentAvatar} 
                    alt={review.studentName}
                    sx={{ width: 48, height: 48 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {review.studentName || "Anonymous"}
                      </Typography>
                      {review.verified && (
                        <Chip 
                          label="Verified" 
                          size="small" 
                          color="success"
                          sx={{ fontSize: "10px", height: "18px" }}
                        />
                      )}
                    </Box>
                    
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <Rating value={review.rating} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(review.reviewDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                  {review.comment}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Was this helpful?
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button
                      size="small"
                      startIcon={<ThumbUpIcon />}
                      sx={{ textTransform: "none", fontSize: "12px" }}
                    >
                      Yes ({review.helpfulCount})
                    </Button>
                    <Button
                      size="small"
                      startIcon={<ThumbDownIcon />}
                      sx={{ textTransform: "none", fontSize: "12px" }}
                    >
                      No
                    </Button>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
                color="primary"
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
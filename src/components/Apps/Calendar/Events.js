import EventService from "@/services/event.service";

// Transform course data to calendar events format
const transformCourseToEvent = (course) => {
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    start: course.startDate,
    end: course.endDate,
    extendedProps: {
      courseCategory: course.courseCategory,
      numberOfLessons: course.numberOfLessons,
      duration: course.duration,
      language: course.language,
      skillLevel: course.skillLevel,
      youtubeVideoId: course.youtubeVideoId,
      coursePictureUrl: course.coursePictureUrl,
      rating: course.rating,
      published: course.published
    },
    backgroundColor: getEventColor(course.skillLevel),
    borderColor: getEventColor(course.skillLevel)
  };
};

// Get color based on skill level
const getEventColor = (skillLevel) => {
  const colors = {
    'Beginner': '#28a745',
    'Intermediate': '#ffc107',
    'Advanced': '#dc3545',
    'Expert': '#6f42c1'
  };
  return colors[skillLevel] || '#6c757d';
};

// Function to get events from the service
const getEvents = async () => {
  try {
    const response = await EventService.getAllEvents();
    const courses = response.data || [];
    return courses
      .filter(course => course.published && course.startDate && course.endDate)
      .map(transformCourseToEvent);
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

// Export the function to get events
export { getEvents };

// Access control utilities for role-based permissions
import authService from "@/services/auth.service";

// User roles enum
export const UserRoles = {
  USER: 'ROLE_USER',
  ADMIN: 'ROLE_ADMIN', 
  TEACHER: 'ROLE_TEACHER'
};

// User role IDs (matches the database/API structure)
export const RoleIds = {
  USER: 1,
  ADMIN: 2,
  TEACHER: 3
};

/**
 * Get current user from auth service
 * @returns {Object|null} Current user object or null if not authenticated
 */
export const getCurrentUser = () => {
  return authService.getCurrentUser();
};

/**
 * Get current user role string
 * @returns {string|null} User role string or null if not authenticated
 */
export const getCurrentUserRole = () => {
  const user = getCurrentUser();
  return user?.roles || null;
};

/**
 * Get current user role ID
 * @returns {number|null} User role ID or null if not authenticated
 */
export const getCurrentUserRoleId = () => {
  const user = getCurrentUser();
  return user?.roleId || null;
};

/**
 * Check if user has a specific role
 * @param {string} role - Role to check (e.g., 'ROLE_ADMIN')
 * @returns {boolean} True if user has the role
 */
export const hasRole = (role) => {
  const userRole = getCurrentUserRole();
  return userRole === role;
};

/**
 * Check if user has admin role
 * @returns {boolean} True if user is admin
 */
export const isAdmin = () => {
  return hasRole(UserRoles.ADMIN) || getCurrentUserRoleId() === RoleIds.ADMIN;
};

/**
 * Check if user has teacher role
 * @returns {boolean} True if user is teacher
 */
export const isTeacher = () => {
  return hasRole(UserRoles.TEACHER) || getCurrentUserRoleId() === RoleIds.TEACHER;
};

/**
 * Check if user has regular user role
 * @returns {boolean} True if user is regular user
 */
export const isUser = () => {
  return hasRole(UserRoles.USER) || getCurrentUserRoleId() === RoleIds.USER;
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is authenticated
 */
export const isAuthenticated = () => {
  const user = getCurrentUser();
  return user !== null && user.accessToken;
};

/**
 * Check if user can access admin features
 * @returns {boolean} True if user can access admin features
 */
export const canAccessAdmin = () => {
  return isAdmin();
};

/**
 * Check if user can access teacher features
 * @returns {boolean} True if user can access teacher features
 */
export const canAccessTeacher = () => {
  return isAdmin() || isTeacher();
};

/**
 * Check if user can view users page
 * @returns {boolean} True if user can view users page
 */
export const canViewUsers = () => {
  return isAdmin();
};

/**
 * Check if user can view teachers page
 * @returns {boolean} True if user can view teachers page
 */
export const canViewTeachers = () => {
  return isAdmin();
};

/**
 * Check if user can view courses
 * @returns {boolean} True if user can view courses
 */
export const canViewCourses = () => {
  return canAccessTeacher();
};

/**
 * Check if user can view attendances
 * @returns {boolean} True if user can view attendances
 */
export const canViewAttendances = () => {
  return canAccessTeacher();
};

/**
 * Check if user can view enrollments
 * @returns {boolean} True if user can view enrollments
 */
export const canViewEnrollments = () => {
  return canAccessTeacher();
};

/**
 * Check if user can view dashboard
 * @returns {boolean} True if user can view dashboard
 */
export const canViewDashboard = () => {
  return canAccessTeacher();
};

/**
 * Check if user can view calendar
 * @returns {boolean} True if user can view calendar
 */
export const canViewCalendar = () => {
  return canAccessTeacher();
};

/**
 * Check if user can view schedules
 * @returns {boolean} True if user can view schedules
 */
export const canViewSchedules = () => {
  return canAccessTeacher();
};

/**
 * Check if user should be blocked from accessing the main app
 * @returns {boolean} True if user should be blocked
 */
export const shouldBlockAppAccess = () => {
  if (!isAuthenticated()) return true;
  return isUser(); // Regular users should be blocked from main app
};

/**
 * Get redirect path for blocked users
 * @returns {string} Path to redirect blocked users
 */
export const getBlockedUserRedirectPath = () => {
  if (!isAuthenticated()) {
    return '/authentication/sign-in';
  }
  if (isUser()) {
    return '/user-access-denied'; // Redirect regular users to access denied page
  }
  return '/authentication/sign-in';
};

/**
 * Get teacher ID from current user
 * @returns {number|null} Teacher ID or null if not a teacher
 */
export const getCurrentTeacherId = () => {
  const user = getCurrentUser();
  if (!isTeacher()) return null;
  // Assuming the user object has a teacherId field or use the user ID
  return user?.teacherId || user?.id || null;
};
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  isAuthenticated, 
  shouldBlockAppAccess, 
  getBlockedUserRedirectPath,
  canViewUsers,
  canViewTeachers,
  canViewCourses,
  canViewAttendances,
  canViewEnrollments,
  canViewDashboard,
  canViewCalendar,
  canViewSchedules,
  canViewEmailTemplates
} from "@/utils/accessControl";

/**
 * Higher-order component to protect routes based on user permissions
 * @param {React.Component} WrappedComponent - Component to protect
 * @param {Object} options - Protection options
 * @param {Function} options.requirePermission - Function that returns true if user has required permission
 * @param {string} options.redirectTo - Path to redirect unauthorized users (optional)
 * @param {boolean} options.blockUsers - Whether to block regular users (default: false)
 */
export function withRoleProtection(WrappedComponent, options = {}) {
  const {
    requirePermission = () => true,
    redirectTo = '/authentication/sign-in',
    blockUsers = false
  } = options;

  return function ProtectedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      // Check if user is authenticated
      if (!isAuthenticated()) {
        router.push('/authentication/sign-in');
        return;
      }

      // Check if regular users should be blocked from this route
      if (blockUsers && shouldBlockAppAccess()) {
        router.push(getBlockedUserRedirectPath());
        return;
      }

      // Check specific permission
      if (!requirePermission()) {
        router.push(redirectTo);
        return;
      }
    }, [router]);

    // Don't render component if not authenticated or doesn't have permission
    if (!isAuthenticated() || (blockUsers && shouldBlockAppAccess()) || !requirePermission()) {
      return null; // Or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
}

/**
 * HOC specifically for admin-only pages (Users, Teachers)
 */
export function withAdminProtection(WrappedComponent) {
  return withRoleProtection(WrappedComponent, {
    requirePermission: canViewUsers, // Admin permission
    redirectTo: '/',
    blockUsers: true
  });
}

/**
 * HOC for teacher and admin access (Courses, Attendances, etc.)
 */
export function withTeacherProtection(WrappedComponent) {
  return withRoleProtection(WrappedComponent, {
    requirePermission: canViewCourses, // Teacher or Admin permission
    redirectTo: '/',
    blockUsers: true
  });
}

/**
 * HOC to block regular users from accessing the main app
 */
export function withAppProtection(WrappedComponent) {
  return withRoleProtection(WrappedComponent, {
    requirePermission: () => !shouldBlockAppAccess(),
    redirectTo: '/authentication/sign-in',
    blockUsers: true
  });
}

/**
 * HOC for dashboard protection
 */
export function withDashboardProtection(WrappedComponent) {
  return withRoleProtection(WrappedComponent, {
    requirePermission: canViewDashboard,
    redirectTo: '/authentication/sign-in',
    blockUsers: true
  });
}

/**
 * Higher-order component specifically for users page
 */
export function withUsersPageProtection(WrappedComponent) {
  return withRoleProtection(WrappedComponent, {
    requirePermission: canViewUsers,
    redirectTo: '/',
    blockUsers: true
  });
}

/**
 * Higher-order component specifically for teachers page
 */
export function withTeachersPageProtection(WrappedComponent) {
  return withRoleProtection(WrappedComponent, {
    requirePermission: canViewTeachers,
    redirectTo: '/',
    blockUsers: true
  });
}

/**
 * Higher-order component specifically for courses page
 */
export function withCoursesPageProtection(WrappedComponent) {
  return withRoleProtection(WrappedComponent, {
    requirePermission: canViewCourses,
    redirectTo: '/',
    blockUsers: true
  });
}

/**
 * Higher-order component specifically for attendances page
 */
export function withAttendancesPageProtection(WrappedComponent) {
  return withRoleProtection(WrappedComponent, {
    requirePermission: canViewAttendances,
    redirectTo: '/',
    blockUsers: true
  });
}

/**
 * Higher-order component specifically for email templates page
 */
export function withEmailTemplatesPageProtection(WrappedComponent) {
  return withRoleProtection(WrappedComponent, {
    requirePermission: canViewEmailTemplates,
    redirectTo: '/',
    blockUsers: true
  });
}

/**
 * Higher-order component specifically for enrollments page
 */
export function withEnrollmentsPageProtection(WrappedComponent) {
  return withRoleProtection(WrappedComponent, {
    requirePermission: canViewEnrollments,
    redirectTo: '/',
    blockUsers: true
  });
}
// Role-based sidebar data that filters menu items based on user permissions
"use client";

import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GridViewIcon from "@mui/icons-material/GridView";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import PostAddIcon from "@mui/icons-material/PostAdd";
import TeacherIcon from "@mui/icons-material/Person";
import CourseIcon from "@mui/icons-material/PlayLesson";
import EnrollmentIcon from "@mui/icons-material/School";
import AttendanceIcon from "@mui/icons-material/PresentToAll";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EmailIcon from "@mui/icons-material/Email";

import {
  canViewDashboard,
  canViewCalendar,
  canViewUsers,
  canViewTeachers,
  canViewCourses,
  canViewEnrollments,
  canViewAttendances,
  canViewSchedules,
  canViewEmailTemplates,
  isAuthenticated
} from "@/utils/accessControl";

// Base menu structure (same for all languages, filtered by permissions)
const getBaseMenuItems = () => [
  {
    title: "Dashboard",
    path: "/",
    icon: <GridViewIcon />,
    subNav: [],
    permission: canViewDashboard
  },
  {
    title: "Calendar", 
    path: "/apps/calendar/",
    icon: <CalendarIcon />,
    subNav: [],
    permission: canViewCalendar
  },
  {
    title: "Users",
    path: "/users/",
    icon: <PostAddIcon />,
    subNav: [],
    permission: canViewUsers
  },
  {
    title: "Teachers",
    path: "/teachers/",
    icon: <TeacherIcon />,
    subNav: [],
    permission: canViewTeachers
  },
  {
    title: "Courses",
    path: "/courses/",
    icon: <CourseIcon />,
    subNav: [],
    permission: canViewCourses
  },
  {
    title: "Schedules",
    path: "/schedules/",
    icon: <ScheduleIcon />,
    subNav: [],
    permission: canViewSchedules
  },
  {
    title: "Enrollments",
    path: "/enrollments/",
    icon: <EnrollmentIcon />,
    subNav: [],
    permission: canViewEnrollments
  },
  {
    title: "Attendances",
    path: "/attendances/",
    icon: <AttendanceIcon />,
    subNav: [],
    permission: canViewAttendances
  },
  {
    title: "Email Templates",
    path: "/email-templates/",
    icon: <EmailIcon />,
    subNav: [],
    permission: canViewEmailTemplates
  },
  {
    title: "Settings",
    path: "/settings/account/",
    icon: <SettingsIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,
    subNav: [
      {
        title: "Account",
        path: "/settings/account/",
      },
      {
        title: "Security",
        path: "/settings/security/",
      },
      {
        title: "Privacy Policy",
        path: "/settings/privacy-policy/",
      },
      {
        title: "Logout",
        path: "/authentication/logout/",
      },
    ],
    permission: () => isAuthenticated() // All authenticated users can see settings
  }
];

// Filter menu items based on user permissions
const filterMenuByPermissions = (menuItems) => {
  if (!isAuthenticated()) {
    return []; // No menu items for unauthenticated users
  }

  return menuItems.filter(item => {
    // Ensure item has required properties
    if (!item || !item.path || !item.title) {
      console.warn('Invalid menu item found:', item);
      return false;
    }
    
    if (typeof item.permission === 'function') {
      try {
        return item.permission();
      } catch (error) {
        console.error('Error checking permission for menu item:', item.title, error);
        return false;
      }
    }
    return true; // Show item if no permission check defined
  });
};

// Function to get English menu (called at render time)
export const getSidebarDataEN = () => {
  const baseItems = getBaseMenuItems();
  // Validate menu items before filtering
  const validItems = baseItems.filter(item => {
    if (!item || typeof item !== 'object') {
      console.warn('Invalid menu item (not an object):', item);
      return false;
    }
    if (!item.path || typeof item.path !== 'string') {
      console.warn('Invalid menu item path:', item);
      return false;
    }
    if (!item.title || typeof item.title !== 'string') {
      console.warn('Invalid menu item title:', item);
      return false;
    }
    return true;
  });
  
  return filterMenuByPermissions(validItems);
};

// For backward compatibility, export a static version (but this should be replaced)
export const sidebarDataEN = [];

// Function to get German menu (called at render time)
export const getSidebarDataDE = () => filterMenuByPermissions([
  {
    title: "Armaturenbrett",
    path: "/",
    icon: <GridViewIcon />,
    subNav: [],
    permission: canViewDashboard
  },
  {
    title: "Kalender",
    path: "/apps/calendar/",
    icon: <CalendarIcon />,
    subNav: [],
    permission: canViewCalendar
  },
  {
    title: "Benutzer",
    path: "/users/",
    icon: <PostAddIcon />,
    subNav: [],
    permission: canViewUsers
  },
  {
    title: "Lehrer",
    path: "/teachers/",
    icon: <TeacherIcon />,
    subNav: [],
    permission: canViewTeachers
  },
  {
    title: "Kurse",
    path: "/courses/",
    icon: <CourseIcon />,
    subNav: [],
    permission: canViewCourses
  },
  {
    title: "Zeitpläne",
    path: "/schedules/",
    icon: <ScheduleIcon />,
    subNav: [],
    permission: canViewSchedules
  },
  {
    title: "Anmeldungen",
    path: "/enrollments/",
    icon: <EnrollmentIcon />,
    subNav: [],
    permission: canViewEnrollments
  },
  {
    title: "Anwesenheit",
    path: "/attendances/",
    icon: <AttendanceIcon />,
    subNav: [],
    permission: canViewAttendances
  },
  {
    title: "E-Mail-Vorlagen",
    path: "/email-templates/",
    icon: <EmailIcon />,
    subNav: [],
    permission: canViewEmailTemplates
  },
  {
    title: "Einstellungen",
    path: "/settings/account/",
    icon: <SettingsIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,
    subNav: [
      {
        title: "Konto",
        path: "/settings/account/",
      },
      {
        title: "Sicherheit",
        path: "/settings/security/",
      },
      {
        title: "Datenschutz-Bestimmungen",
        path: "/settings/privacy-policy/",
      },
      {
        title: "Ausloggen",
        path: "/authentication/logout/",
      },
    ],
    permission: () => isAuthenticated()
  }
]);

// For backward compatibility, export a static version (but this should be replaced)
export const sidebarDataDE = [];

// Function to get Arabic menu (called at render time)
export const getSidebarDataAR = () => filterMenuByPermissions([
  {
    title: "لوحة القيادة",
    path: "/",
    icon: <GridViewIcon />,
    subNav: [],
    permission: canViewDashboard
  },
  {
    title: "تقويم",
    path: "/apps/calendar/",
    icon: <CalendarIcon />,
    subNav: [],
    permission: canViewCalendar
  },
  {
    title: "المستخدمين",
    path: "/users/",
    icon: <PostAddIcon />,
    subNav: [],
    permission: canViewUsers
  },
  {
    title: "المعلمون", 
    path: "/teachers/",
    icon: <TeacherIcon />,
    subNav: [],
    permission: canViewTeachers
  },
  {
    title: "الدورات",
    path: "/courses/",
    icon: <CourseIcon />,
    subNav: [],
    permission: canViewCourses
  },
  {
    title: "الجداول الزمنية",
    path: "/schedules/",
    icon: <ScheduleIcon />,
    subNav: [],
    permission: canViewSchedules
  },
  {
    title: "التسجيلات",
    path: "/enrollments/",
    icon: <EnrollmentIcon />,
    subNav: [],
    permission: canViewEnrollments
  },
  {
    title: "الحضور",
    path: "/attendances/",
    icon: <AttendanceIcon />,
    subNav: [],
    permission: canViewAttendances
  },
  {
    title: "الإعدادات",
    path: "/settings/account/",
    icon: <SettingsIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,
    subNav: [
      {
        title: "الحساب",
        path: "/settings/account/",
      },
      {
        title: "الأمان",
        path: "/settings/security/",
      },
      {
        title: "سياسة الخصوصية",
        path: "/settings/privacy-policy/",
      },
      {
        title: "تسجيل الخروج",
        path: "/authentication/logout/",
      },
    ],
    permission: () => isAuthenticated()
  }
]);

// For backward compatibility, export a static version (but this should be replaced)
export const sidebarDataAR = [];
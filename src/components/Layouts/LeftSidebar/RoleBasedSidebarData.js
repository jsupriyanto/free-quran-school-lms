// Role-based sidebar data that filters menu items based on user permissions
"use client";

import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GridViewIcon from "@mui/icons-material/GridView";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import PostAddIcon from "@mui/icons-material/PostAdd";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import TeacherIcon from "@mui/icons-material/Person";
import CourseIcon from "@mui/icons-material/PlayLesson";
import EnrollmentIcon from "@mui/icons-material/School";
import AttendanceIcon from "@mui/icons-material/PresentToAll";

import {
  canViewDashboard,
  canViewCalendar,
  canViewUsers,
  canViewTeachers,
  canViewCourses,
  canViewEnrollments,
  canViewAttendances,
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
    title: "Notification",
    path: "/notification/",
    icon: <NotificationsNoneIcon />,
    subNav: [],
    permission: () => isAuthenticated() // All authenticated users can see notifications
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
    if (typeof item.permission === 'function') {
      return item.permission();
    }
    return true; // Show item if no permission check defined
  });
};

// Function to get English menu (called at render time)
export const getSidebarDataEN = () => filterMenuByPermissions([
  ...getBaseMenuItems()
]);

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
    title: "Benachrichtigung",
    path: "/notification/",
    icon: <NotificationsNoneIcon />,
    subNav: [],
    permission: () => isAuthenticated()
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
    title: "الإشعارات",
    path: "/notification/",
    icon: <NotificationsNoneIcon />,
    subNav: [],
    permission: () => isAuthenticated()
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
"use client";

// Debug helper for production issues
export const debugLog = (message, data = null) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEBUG] ${message}`, data);
  }
};

export const errorLog = (message, error = null) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[ERROR] ${message}`, error);
  } else {
    // In production, you might want to send errors to a monitoring service
    // For now, just log essential errors
    console.error(message);
  }
};

// Safe localStorage helper
export const safeLocalStorage = {
  getItem: (key) => {
    try {
      if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
      }
    } catch (error) {
      errorLog('Error reading from localStorage', error);
    }
    return null;
  },

  setItem: (key, value) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
        return true;
      }
    } catch (error) {
      errorLog('Error writing to localStorage', error);
    }
    return false;
  },

  removeItem: (key) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
        return true;
      }
    } catch (error) {
      errorLog('Error removing from localStorage', error);
    }
    return false;
  }
};

// Check if we're in browser environment
export const isBrowser = () => typeof window !== 'undefined';

// Safe JSON parse
export const safeJsonParse = (str) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    errorLog('Error parsing JSON', error);
    return null;
  }
};
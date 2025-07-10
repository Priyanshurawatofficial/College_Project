import { formatDistanceToNow } from 'date-fns';

/**
 * Get time ago string from a date
 * @param {string|Date} date - The date to compare
 * @returns {string} - Time ago string like "2 hours ago", "3 days ago"
 */
export const getTimeAgo = (date) => {
  try {
    const dateObj = new Date(date);
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }
    
    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Unknown time';
  }
};

/**
 * Format date for display
 * @param {string|Date} date - The date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
  try {
    const dateObj = new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }
    
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Unknown date';
  }
};

/**
 * Format date for Lost/Found items in format: "7 August 2025, Friday"
 * @param {string|Date} date - The date to format
 * @returns {string} - Formatted date string like "7 August 2025, Friday"
 */
export const formatLostFoundDate = (date) => {
  try {
    const dateObj = new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }
    
    return dateObj.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long'
    }).replace(/,/, ', ');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Unknown date';
  }
};

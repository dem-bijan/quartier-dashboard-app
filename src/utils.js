
/**
 * A utility function that combines multiple class names
 * @param  {...string} classes - The class names to combine
 * @returns {string} - The combined class names
 */
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format a date string to a localized format
 * @param {string} dateString - The date string to format
 * @param {string} locale - The locale to use for formatting
 * @returns {string} - The formatted date
 */
export function formatDate(dateString, locale = 'fr-MA') {
  try {
    return new Date(dateString).toLocaleDateString(locale);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

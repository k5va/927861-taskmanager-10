/**
 * Checks if date is current
 * @param {Date} date - date to be checked
 * @return {Boolean} - is date due today
 */
export const isCurrentDate = (date) => date instanceof Date && date.toDateString() === new Date().toDateString();

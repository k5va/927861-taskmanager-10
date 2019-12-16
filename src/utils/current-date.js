/**
 * Checks if date is due today
 * @param {Date} date - date to be checked
 * @return {Boolean} - is date due today
 */
export const isDateToday = (date) => date instanceof Date && date.toDateString() === new Date().toDateString();

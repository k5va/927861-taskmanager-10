
/**
 * Checks if date is expired
 * @param {Date} date - date to be checked
 * @return {Boolean} - is date expired
 */
export const isDateExpired = (date) => date instanceof Date && date < Date.now();

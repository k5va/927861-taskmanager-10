import moment from "moment";

/**
 * Checks if given dates are of the same day
 * @param {Date} dateA - first date
 * @param {Date} dateB - second date
 * @return {Boolean} - true if dates are of the same day
 */
export const isSameDay = (dateA, dateB) => (
  moment(dateA).diff(moment(dateB), `days`) === 0 &&
  dateA.getDate() === dateB.getDate()
);

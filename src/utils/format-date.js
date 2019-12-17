import moment from "moment";

/**
 * Formates date to string
 * @param {Date} date - date object
 * @return {String} - formated date
 */
export const formatDate = (date) => moment(date).format(`DD MMMM`);

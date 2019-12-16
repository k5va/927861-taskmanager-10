import moment from "moment";

/**
 * Formates time to string
 * @param {Date} date - date object
 * @return {String} - formated time
 */
export const formatTime = (date) => moment(date).format(`hh:mm A`);

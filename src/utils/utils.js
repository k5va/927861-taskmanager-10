import {MonthNames} from "../const";

const DATE_MAX_RANGE = 7;

/**
 * Returns random array element
 * @param {Array} array - array to return element from
 * @return {*} - random element of the array
 */
const getRandomArrayItem = (array) => array[getRandomIntegerNumber(0, array.length)];

/**
 * Returns random integer between min (inclusive) and max (exclusive) values
 * @param {Number} min - min value
 * @param {Number} max - max value
 * @return {Number} - random integer number
 */
const getRandomIntegerNumber = (min = 0, max = 10) => min + Math.floor((max - min) * Math.random());

/**
 * Returns random date that lies within the given range from the current date
 * @param {Number} range - range from the current date
 * @return {Date} - random date
 */
const getRandomDate = (range = DATE_MAX_RANGE) => {
  const targetDate = new Date();
  const sign = getRandomBoolean() ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, range);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

/**
 * Returns random boolean value (true or false)
 * @return {Boolean} - random true or false
 */
const getRandomBoolean = () => Math.random() > 0.5;

/**
 * Formates date to string
 * @param {Date} date - date object
 * @return {String} - formated date
 */
const formatDate = (date) => `${date.getDate()} ${MonthNames[date.getMonth()]}`;

/**
 *Formats given integer number by addig leading zero if it contains only one digit
 * @param {Number} num - integer to be formatted
 * @return {String} - formatted value
 */
const formatNumber = (num) => num < 10 ? `0${num}` : `${num}`;

/**
 * Formates time to string
 * @param {Date} date - date object
 * @return {String} - formated time
 */
const formatTime = (date) => {
  const timeZone = date.getHours() > 11 ? `PM` : `AM`;
  const hours = formatNumber(date.getHours() % 12);
  const minutes = formatNumber(date.getMinutes());

  return `${hours}:${minutes} ${timeZone}`;
};

/**
 * Checks if date is expired
 * @param {Date} date - date to be checked
 * @return {Boolean} - is date expired
 */
const isDateExpired = (date) => date instanceof Date && date < Date.now();

export {
  getRandomArrayItem,
  getRandomDate,
  getRandomBoolean,
  formatDate,
  formatTime,
  isDateExpired,
  getRandomIntegerNumber
};

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
const getRandomIntegerNumber = (min, max) => min + Math.floor((max - min) * Math.random());

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

export {getRandomArrayItem, getRandomDate, getRandomBoolean};

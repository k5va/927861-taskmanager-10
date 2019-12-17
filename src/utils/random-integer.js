/**
 * Returns random integer between min (inclusive) and max (exclusive) values
 * @param {Number} min - min value
 * @param {Number} max - max value
 * @return {Number} - random integer number
 */
export const getRandomIntegerNumber = (min = 0, max = 10) => min + Math.floor((max - min) * Math.random());

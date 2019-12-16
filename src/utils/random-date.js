import {getRandomBoolean, getRandomIntegerNumber} from "./index";

const DATE_MAX_RANGE = 7;

/**
 * Returns random date that lies within the given range from the current date
 * @param {Number} range - range from the current date
 * @return {Date} - random date
 */
export const getRandomDate = (range = DATE_MAX_RANGE) => {
  const targetDate = new Date();
  const sign = getRandomBoolean() ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, range);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

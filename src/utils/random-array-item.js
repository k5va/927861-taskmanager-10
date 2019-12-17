import {getRandomIntegerNumber} from "./index";

/**
 * Returns random array element
 * @param {Array} array - array to return element from
 * @return {*} - random element of the array
 */
export const getRandomArrayItem = (array) => array[getRandomIntegerNumber(0, array.length)];

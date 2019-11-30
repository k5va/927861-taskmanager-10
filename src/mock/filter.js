import {getRandomIntegerNumber} from "../utils/utils";

const filterNames = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

/**
 * Generates filters data
 * @return {Array<*>} - array of generated filters
 */
const generateFilters = () => filterNames
  .map((name) => ({
    name,
    count: getRandomIntegerNumber(),
  }));

export {generateFilters};

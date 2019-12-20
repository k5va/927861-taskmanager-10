import {FilterTasks} from "../../utils";
/**
 * Generates filters data based on given array of tasks
 * @param {Array<*>} tasks - tasks array
 * @param {String} currentFilter - currently selected filter
 * @return {Array<*>} - array of generated filters
 */
const generateFilters = (tasks, currentFilter) => Object.keys(FilterTasks)
  .map((name) => ({
    name,
    count: FilterTasks[name](tasks).length,
    selected: name === currentFilter
  }));

export {generateFilters};

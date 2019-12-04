import {isDateExpired, isDateToday, hasSomeBoolean} from "../utils/utils";
import {FILTERS} from "../const";

const FilterTasksCounter = {
  'all': (tasks) => tasks.length,
  'overdue': (tasks) => tasks.filter(({dueDate}) => isDateExpired(dueDate)).length,
  'today': (tasks) => tasks.filter(({dueDate}) => isDateToday(dueDate)).length,
  'favorites': (tasks) => tasks.filter(({isFavorite}) => isFavorite).length,
  'repeating': (tasks) => tasks.filter(({repeatingDays}) => hasSomeBoolean(repeatingDays)).length,
  'tags': (tasks) => tasks.filter(({tags}) => tags.size > 0).length,
  'archive': (tasks) => tasks.filter(({isArchive}) => isArchive).length
};

/**
 * Generates filters data based on given array of tasks
 * @param {Array<*>} tasks - tasks array
 * @return {Array<*>} - array of generated filters
 */
const generateFilters = (tasks) => FILTERS
  .map((name) => ({
    name,
    count: FilterTasksCounter[name](tasks),
  }));

export {generateFilters};

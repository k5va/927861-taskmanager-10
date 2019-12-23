import {isDateExpired, hasSomeBoolean, isCurrentDate} from "./index";
import {Filter} from "../consts";

export const FilterTasks = {
  [Filter.ALL]: (tasks) => tasks,
  [Filter.OVERDUE]: (tasks) => tasks.filter(({dueDate}) => isDateExpired(dueDate)),
  [Filter.TODAY]: (tasks) => tasks.filter(({dueDate}) => isCurrentDate(dueDate)),
  [Filter.FAVORITES]: (tasks) => tasks.filter(({isFavorite}) => isFavorite),
  [Filter.REPEATING]: (tasks) => tasks.filter(({repeatingDays}) => hasSomeBoolean(repeatingDays)),
  [Filter.TAGS]: (tasks) => tasks.filter(({tags}) => tags.size > 0),
  [Filter.ARCHIVE]: (tasks) => tasks.filter(({isArchive}) => isArchive)
};

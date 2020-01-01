import {isDateExpired, hasSomeBoolean, isCurrentDate} from "./index";
import {Filter} from "../consts";

export const FilterTasks = {
  [Filter.ALL]: (tasks) => tasks.filter(({isArchive}) => !isArchive),
  [Filter.OVERDUE]: (tasks) => tasks.filter(({isArchive, dueDate}) => !isArchive && isDateExpired(dueDate)),
  [Filter.TODAY]: (tasks) => tasks.filter(({isArchive, dueDate}) => !isArchive && isCurrentDate(dueDate)),
  [Filter.FAVORITES]: (tasks) => tasks.filter(({isArchive, isFavorite}) => !isArchive && isFavorite),
  [Filter.REPEATING]: (tasks) => tasks.filter(({isArchive, repeatingDays}) => !isArchive && hasSomeBoolean(repeatingDays)),
  [Filter.TAGS]: (tasks) => tasks.filter(({isArchive, tags}) => !isArchive && tags.size > 0),
  [Filter.ARCHIVE]: (tasks) => tasks.filter(({isArchive}) => isArchive)
};

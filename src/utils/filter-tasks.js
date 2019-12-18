import {isDateExpired, hasSomeBoolean, isCurrentDate} from "./index";

export const FilterTasks = {
  all: (tasks) => tasks,
  overdue: (tasks) => tasks.filter(({dueDate}) => isDateExpired(dueDate)),
  today: (tasks) => tasks.filter(({dueDate}) => isCurrentDate(dueDate)),
  favorites: (tasks) => tasks.filter(({isFavorite}) => isFavorite),
  repeating: (tasks) => tasks.filter(({repeatingDays}) => hasSomeBoolean(repeatingDays)),
  tags: (tasks) => tasks.filter(({tags}) => tags.size > 0),
  archive: (tasks) => tasks.filter(({isArchive}) => isArchive)
};

import {SortType} from "../../consts";

/**
 * Returns sorted copy of given tasks array with respect to sort type
 * @param {Array<*>} tasks - array of tasks
 * @param {*} sortType - sort type
 * @return {Array<*>} - array of sorted tasks
 */
const sortTasks = (tasks, sortType) => {
  let sortedTasks = [];

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = tasks.slice().sort((task1, task2) => task1.dueDate - task2.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = tasks.slice().sort((task1, task2) => task2.dueDate - task1.dueDate);
      break;
    case SortType.DEFAULT:
    default:
      sortedTasks = tasks.slice();
      break;
  }

  return sortedTasks;
};

export {sortTasks};

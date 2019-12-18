import {Filters} from "../../consts";
import {FilterTasks} from "../../utils";

export default class Tasks {
  /**
   *Creates an instance of Tasks model.
   */
  constructor() {
    this._tasks = [];
    this._filter = Filters.ALL;
    this._filterChangeHandlers = [];
  }

  /**
   * Returns model's tasks
   * @return {Array} - array of tasks
   */
  getTasks() {
    return FilterTasks[this._filter](this._tasks);
  }

  /**
   * Returns initial array of tasks
   * @return {Array} - array of tasks
   */
  getTasksAll() {
    return this._tasks;
  }

  /**
   * Sets model's tasks
   *
   * @param {Iterable} tasks - tasks
   */
  setTasks(tasks) {
    this._tasks = [...tasks];
  }

  /**
   * Updates task in model
   *
   * @param {String} id - task id
   * @param {*} task - task object
   * @return {Boolean} - true if model is successfully updated
   */
  updateTask(id, task) {
    const index = this._tasks.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }
    // create new copy of tasks array with updated task. Can be used later for undo operations
    this._tasks = [].concat(this._tasks.slice(0, index), task, this._tasks.slice(index + 1));

    return true;
  }
  /**
   * Sets filter to be applied when getTasks is called
   * @param {String} filter - filter
   */
  setFilter(filter) {
    this._filter = filter;
    // call registered filter change handlers
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  /**
   * Register filter change handler
   * @param {Function} handler - handler
   */
  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }
}

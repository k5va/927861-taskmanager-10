import {Filters, SortType} from "../../consts";
import {FilterTasks} from "../../utils";

import {sortTasks} from "./sort-tasks";

export default class Tasks {
  /**
   *Creates an instance of Tasks model.
   */
  constructor() {
    this._tasks = [];
    this._filter = Filters.ALL;
    this._sortType = SortType.DEFAULT;
    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
  }

  /**
   * Returns model's tasks filtered and sorted
   * @return {Array} - array of tasks
   */
  getTasks() {
    return sortTasks(FilterTasks[this._filter](this._tasks), this._sortType);
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
   * Add new task in model
   * @param {*} task - task object
   */
  addTask(task) {
    // create new copy of tasks array with new task added. Can be used later for undo operations
    this._tasks = [task, ...this._tasks];
    // notify data change handlers
    this._dataChangeHandlers.forEach((handler) => handler());
  }

  /**
   * Updates task in model
   *
   * @param {String} id - task id
   * @param {*} task - task object
   * @return {Boolean} - true if model is successfully updated
   */
  updateTask(id, task) {
    const index = this._findTaskById(id);
    if (index === -1) {
      return false;
    }
    // create new copy of tasks array with updated task. Can be used later for undo operations
    this._tasks = [...this._tasks.slice(0, index), task, ...this._tasks.slice(index + 1)];
    // notify data change handlers
    this._dataChangeHandlers.forEach((handler) => handler());

    return true;
  }

  /**
   * Removes task with given id from the model
   * @param {String} id - task id
   * @return {Boolean} - true if task is successfully remove
   */
  removeTask(id) {
    const index = this._findTaskById(id);
    if (index === -1) {
      return false;
    }
    // create new copy of tasks array without removed task. Can be used later for undo operations
    this._tasks = [...this._tasks.slice(0, index), ...this._tasks.slice(index + 1)];
    // notify data change handlers
    this._dataChangeHandlers.forEach((handler) => handler());

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
   * Sets sort type to be applied when getTasks is called
   * @param {String} sortType - sort type
   */
  setSortType(sortType) {
    this._sortType = sortType;
  }

  /**
   * Register filter change handler
   * @param {Function} handler - handler
   */
  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  /**
   * Adds model's data change handler
   * @param {Function} handler - handler
   */
  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  /**
   * Returns tasks index by given task id
   * @param {String} id - tasks id
   * @return {Number} - task'is index or -1
   */
  _findTaskById(id) {
    return this._tasks.findIndex((it) => it.id === id);
  }
}

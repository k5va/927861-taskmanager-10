export default class Tasks {
  /**
   *Creates an instance of Tasks model.
   */
  constructor() {
    this._tasks = [];
  }

  /**
   * Returns model's tasks
   * @return {Array} - array of tasks
   */
  getTasks() {
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
}

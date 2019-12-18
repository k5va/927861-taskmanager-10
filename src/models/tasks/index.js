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
}

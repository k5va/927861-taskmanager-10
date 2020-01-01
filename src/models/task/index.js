export default class Task {

  constructor(data) {
    this.id = data[`id`];
    this.description = data[`description`] || ``;
    this.dueDate = data[`due_date`] ? new Date(data[`due_date`]) : null;
    this.tags = new Set(data[`tags`] || []);
    this.repeatingDays = data[`repeating_days`];
    this.color = data[`color`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.isArchive = Boolean(data[`is_archived`]);
  }

  /**
   * Converts task object to raw data that conforms to server format
   * @return {Object} - raw object
   */
  toRAW() {
    return {
      'id': this.id,
      'description': this.description,
      'due_date': this.dueDate ? this.dueDate.toISOString() : null,
      'tags': Array.from(this.tags),
      'repeating_days': this.repeatingDays,
      'color': this.color,
      'is_favorite': this.isFavorite,
      'is_archived': this.isArchive,
    };
  }

  /**
   * Creates new Task from raw data
   * @param {Object} data - raw data
   * @return {Task} - created task
   */
  static parseTask(data) {
    return new Task(data);
  }

  /**
   * Creates array of Tasks from given raw data
   * @param {Array<Object>} data - array of raw tasks data
   * @return {Array<Task>} - array of tasks
   */
  static parseTasks(data) {
    return data.map(Task.parseTask);
  }

  /**
   * Creates a copy of task
   * @param {Task} task - task
   * @return {Task} - new task
   */
  static clone(task) {
    return new Task(task.toRAW());
  }
}

import {SortComponent, TaskListComponent, NoTasksComponent, LoadMoreComponent} from "../../components";
import {TaskController} from "../../controllers";
import {render} from "../../utils";
import {TASKS_PER_LOAD} from "../../consts";

export default class BoardController {
  /**
   * Creates board controller instance
   * @param {Component} container - container component
   * @param {TasksModel} tasksModel - tasks model
   */
  constructor(container, tasksModel) {
    this._container = container;

    this._tasksModel = tasksModel;
    this._showingTaskControllers = [];
    this._showingTasksCount = TASKS_PER_LOAD;

    this._taskListComponent = new TaskListComponent();
    this._sortComponent = new SortComponent();
    this._loadMoreComponent = new LoadMoreComponent();
    this._noTasksComponent = new NoTasksComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._tasksModel.setFilterChangeHandler(this._onFilterChange);
  }

  /**
   * Renders tasks
   */
  render() {

    const tasks = this._tasksModel.getTasks();

    // check if there are tasks to render
    const isAllTasksArchived = tasks.every((task) => task.isArchive);
    if (isAllTasksArchived) {
      render(this._container.getElement(), this._noTasksComponent);
      return;
    }

    // render sort component
    render(this._container.getElement(), this._sortComponent);

    // render tasks
    render(this._container.getElement(), this._taskListComponent);
    this._showingTaskControllers = this._showingTaskControllers.concat(
        this._renderTasks(this._tasksModel.getTasks().slice(0, this._showingTasksCount))
    );

    // render load more button
    this._renderLoadMore();
  }

  /**
   * Renders load more button
   */
  _renderLoadMore() {
    if (this._showingTasksCount >= this._tasksModel.getTasks().length) {
      // no more tasks to load
      this._loadMoreComponent.removeElement();
      return;
    }

    render(this._container.getElement(), this._loadMoreComponent);
    this._loadMoreComponent.setClickHandler(() => {
      // render new portion of tasks
      this._showingTaskControllers = this._showingTaskControllers.concat(
          this._renderTasks(
              this._tasksModel.getTasks().slice(this._showingTasksCount, this._showingTasksCount + TASKS_PER_LOAD)
          )
      );
      // scroll to make load more button visible on page
      this._loadMoreComponent.getElement().scrollIntoView(); // TODO: move to component's class
      // update rendered tasks counter and check if there are more tasks to load
      this._showingTasksCount += TASKS_PER_LOAD;
      if (this._showingTasksCount >= this._tasksModel.getTasks().length) {
        // no more tasks to load
        this._loadMoreComponent.removeElement();
      }
    });
  }

  /**
   * Renders tasks
   * @param {Array<*>} tasks - array of tasks
   * @return {Array<TaskController>} - array of corresponding task controllers
   */
  _renderTasks(tasks) {
    return tasks.map((task) => {
      const taskController = new TaskController(this._taskListComponent, this._onDataChange, this._onViewChange);
      taskController.render(task);

      return taskController;
    });
  }

  /**
   * Sort type change handler
   * @param {String} sortType - sort type
   */
  _onSortTypeChange(sortType) {
    this._taskListComponent.resetList();
    this._loadMoreComponent.removeElement();
    this._showingTasksCount = TASKS_PER_LOAD;

    this._tasksModel.setSortType(sortType);
    this._showingTaskControllers = this._renderTasks(this._tasksModel.getTasks().slice(0, this._showingTasksCount));
    this._renderLoadMore();
  }

  /**
   * Task change handler
   * @param {taskController} taskController - task controller, that correspondes to task
   * @param {*} oldTask - old task object
   * @param {*} newTask - new (changed) task object
   */
  _onDataChange(taskController, oldTask, newTask) {
    if (this._tasksModel.updateTask(oldTask.id, newTask)) {
      taskController.render(newTask);
    }
  }

  /**
   * Handles task controller's switch to edit mode
   */
  _onViewChange() {
    this._showingTaskControllers.forEach((taskController) => taskController.setDefaultView());
  }

  /**
   * Handles filter change
   */
  _onFilterChange() {
    this._taskListComponent.resetList();
    this._loadMoreComponent.removeElement();
    this._showingTasksCount = TASKS_PER_LOAD;

    this._showingTaskControllers = this._renderTasks(this._tasksModel.getTasks().slice(0, this._showingTasksCount));
    this._renderLoadMore();
  }
}

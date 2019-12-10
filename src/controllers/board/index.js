import {SortComponent, TaskListComponent, NoTasksComponent, LoadMoreComponent} from "../../components";
import {render} from "../../utils";
import {renderTasks} from "./render-tasks";
import {sortTasks} from "./sort-tasks";

export default class BoardController {
  /**
   * Creates board controller instance
   * @param {Component} container - container component
   */
  constructor(container) {
    this._container = container;
    this._taskListComponent = new TaskListComponent();
    this._sortComponent = new SortComponent();
    this._loadMoreComponent = new LoadMoreComponent();
    this._noTasksComponent = new NoTasksComponent();
  }

  /**
   * Renders tasks
   * @param {Array<*>} tasks - array of tasks
   */
  render(tasks) {
    // check if there are tasks to render
    const isAllTasksArchived = tasks.every((task) => task.isArchive);
    if (isAllTasksArchived) {
      render(this._container.getElement(), this._noTasksComponent);
      return;
    }

    // render sort component
    render(this._container.getElement(), this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler((sortType) => renderTasks(
        sortTasks(tasks, sortType), // sort tasks
        this._container,
        this._taskListComponent,
        this._loadMoreComponent)
    );

    // render tasks
    render(this._container.getElement(), this._taskListComponent);
    renderTasks(tasks, this._container, this._taskListComponent, this._loadMoreComponent);
  }
}

import {SortComponent, TaskListComponent, NoTasksComponent, LoadMoreComponent} from "../../components";
import {TASKS_PER_LOAD} from "../../consts";
import {render} from "../../utils";
import {renderTask} from "./render-task";

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
    render(this._container.getElement(), this._taskListComponent);

    tasks
      .slice(0, TASKS_PER_LOAD)
      .forEach((task) => renderTask(task, this._taskListComponent));

    // render load more button
    render(this._container.getElement(), this._loadMoreComponent);

    let renderedTasksCount = TASKS_PER_LOAD;
    this._loadMoreComponent.setClickHandler(() => {
      // render new portion of tasks
      tasks.slice(renderedTasksCount, renderedTasksCount + TASKS_PER_LOAD)
        .forEach((task) => renderTask(task, this._taskListComponent));
      // scroll to make load more button visible on page
      this._loadMoreComponent.getElement().scrollIntoView();
      // update rendered tasks counter and check if there are more tasks to load
      renderedTasksCount += TASKS_PER_LOAD;
      if (renderedTasksCount >= tasks.length) {
        // no more tasks to load
        this._loadMoreComponent.removeElement();
      }
    });
  }
}

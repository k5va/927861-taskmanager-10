import {TASKS_PER_LOAD} from "../../consts";
import {renderTask} from "./render-task";
import {render} from "../../utils";

/**
 * Renders tasks list
 * @param {Array<*>} tasks - array of tasks
 * @param {Component} container - container component
 * @param {TaskListComponent} taskListComponent - tasks list component
 * @param {LoadMoreComponent} loadMoreComponent - load more component
 */
const renderTasks = (tasks, container, taskListComponent, loadMoreComponent) => {

  taskListComponent.getElement().innerHTML = ``;
  tasks
    .slice(0, TASKS_PER_LOAD)
    .forEach((task) => renderTask(task, taskListComponent));

  // render load more button
  loadMoreComponent.removeElement(); // TODO: remove listener instead of removeElement?
  render(container.getElement(), loadMoreComponent);

  let renderedTasksCount = TASKS_PER_LOAD;
  loadMoreComponent.setClickHandler(() => {
    // render new portion of tasks
    tasks.slice(renderedTasksCount, renderedTasksCount + TASKS_PER_LOAD)
      .forEach((task) => renderTask(task, taskListComponent));
    // scroll to make load more button visible on page
    loadMoreComponent.getElement().scrollIntoView();
    // update rendered tasks counter and check if there are more tasks to load
    renderedTasksCount += TASKS_PER_LOAD;
    if (renderedTasksCount >= tasks.length) {
      // no more tasks to load
      loadMoreComponent.removeElement();
    }
  });
};

export {renderTasks};

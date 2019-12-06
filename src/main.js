import SiteMenu from "./components/site-menu";
import Filter from "./components/filter";
import Board from "./components/board";
import Task from "./components/task";
import LoadMore from "./components/load-more";
import TaskForm from "./components/task-form";
import Sort from "./components/sort";
import Tasks from "./components/tasks";
import NoTasks from "./components/no-tasks";
import {generateTasks} from "./mock/task";
import {generateFilters} from "./mock/filter";
import {render} from "./utils/utils";

const TASK_COUNT = 22;
const TASKS_PER_LOAD = 8;

/**
 * Creates task component and renders it to the DOM with edit mode support
 * @param {*} task - task object
 * @param {Component} tasksComponent - tasks component to render tasks
 */
const renderTask = (task, tasksComponent) => {

  /**
   * Handler for Esc key down event
   * @param {KeyboardEvent} evt - event object
   */
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  /**
   * Changes task component to task form component (edit mode)
   */
  const replaceEditToTask = () => {
    tasksComponent.getElement().replaceChild(
        taskComponent.getElement(),
        taskEditComponent.getElement()
    );
  };

  /**
  * Changes task edit component back to task component (view mode)
  */
  const replaceTaskToEdit = () => {
    tasksComponent.getElement().replaceChild(
        taskEditComponent.getElement(),
        taskComponent.getElement()
    );
  };

  const taskComponent = new Task(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskForm(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tasksComponent.getElement(), taskComponent);
};

const mainElement = document.querySelector(`.main`);
const controlElement = mainElement.querySelector(`.main__control`);
const generatedTasks = generateTasks(TASK_COUNT);

// render site menu
render(controlElement, new SiteMenu());
// render filter
render(mainElement, new Filter(generateFilters(generatedTasks)));
// render board (tasks list)
const boardComponent = new Board();
render(mainElement, boardComponent);

// render tasks
const isAllTasksArchived = generatedTasks.every((task) => task.isArchive);
if (isAllTasksArchived) {
  render(boardComponent.getElement(), new NoTasks());
} else {
  render(boardComponent.getElement(), new Sort());
  const tasksComponent = new Tasks();
  render(boardComponent.getElement(), tasksComponent);

  generatedTasks
    .slice(0, TASKS_PER_LOAD)
    .forEach((task) => renderTask(task, tasksComponent));

  const loadMoreComponent = new LoadMore();
  // render load more button
  render(boardComponent.getElement(), loadMoreComponent);

  let renderedTasksCount = TASKS_PER_LOAD;
  loadMoreComponent.getElement().addEventListener(`click`, () => {
    // render new portion of tasks
    generatedTasks.slice(renderedTasksCount, renderedTasksCount + TASKS_PER_LOAD)
      .forEach((task) => renderTask(task, tasksComponent));
    // scroll to make load more button visible on page
    loadMoreComponent.getElement().scrollIntoView();
    // update rendered tasks counter and check if there are more tasks to load
    renderedTasksCount += TASKS_PER_LOAD;
    if (renderedTasksCount >= TASK_COUNT) {
      // no more tasks to load
      loadMoreComponent.removeElement();
    }
  });
}

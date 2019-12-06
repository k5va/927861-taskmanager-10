import SiteMenu from "./components/site-menu";
import Filter from "./components/filter";
import Board from "./components/board";
import Task from "./components/task";
import LoadMore from "./components/load-more";
import TaskForm from "./components/task-form";
import {generateTasks} from "./mock/task";
import {generateFilters} from "./mock/filter";
import {render} from "./utils/utils";

const TASK_COUNT = 22;
const TASKS_PER_LOAD = 8;

/**
 * Creates task component and renders it to the DOM with edit mode support
 * @param {*} task - task object
 */
const renderTask = (task) => {

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
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  /**
  * Changes task edit component back to task component (view mode)
  */
  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
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

  render(taskListElement, taskComponent);
};

const mainElement = document.querySelector(`.main`);
const controlElement = mainElement.querySelector(`.main__control`);
const generatedTasks = generateTasks(TASK_COUNT);

// render site menu
render(controlElement, new SiteMenu());
// render filter
render(mainElement, new Filter(generateFilters(generatedTasks)));
// render board (tasks list)
render(mainElement, new Board());

const boardElement = mainElement.querySelector(`.board`);
const taskListElement = boardElement.querySelector(`.board__tasks`);

// render tasks
generatedTasks
  .slice(0, TASKS_PER_LOAD)
  .forEach((task) => renderTask(task));

const loadMore = new LoadMore();
// render load more button
render(boardElement, loadMore);

let renderedTasksCount = TASKS_PER_LOAD;
loadMore.getElement().addEventListener(`click`, () => {
  // render new portion of tasks
  generatedTasks.slice(renderedTasksCount, renderedTasksCount + TASKS_PER_LOAD)
    .forEach((task) => renderTask(task));
  // scroll to make load more button visible on page
  loadMore.getElement().scrollIntoView();
  // update rendered tasks counter and check if there are more tasks to load
  renderedTasksCount += TASKS_PER_LOAD;
  if (renderedTasksCount >= TASK_COUNT) {
    // no more tasks to load
    loadMore.removeElement();
  }
});

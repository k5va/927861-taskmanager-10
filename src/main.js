import {createSiteMenuTemplate} from "./components/site-menu";
import {createFilterTemplate} from "./components/filter";
import {createBoardTemplate} from "./components/board";
import {createTaskTemplate} from "./components/task";
import {createLoadMoreTemplate} from "./components/load-more";
import {createTaskFormTemplate} from "./components/task-form";
import {generateTasks} from "./mock/task";
import {generateFilters} from "./mock/filter";

const TASK_COUNT = 22;
const TASKS_PER_LOAD = 8;

/**
 * Renders given HTML template to the DOM by adding it to the parent container
 * at the specified position
 * @param {HTMLElement} container - parent HTML element
 * @param {String} template - template to be added to the container
 * @param {String} place - insert position. Default value = "beforeend"
 */
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const mainElement = document.querySelector(`.main`);
const controlElement = mainElement.querySelector(`.main__control`);

// render site menu
render(controlElement, createSiteMenuTemplate());
// render filter
render(mainElement, createFilterTemplate(generateFilters()));
// render board (tasks list)
render(mainElement, createBoardTemplate());

const boardElement = mainElement.querySelector(`.board`);
const tasksListElement = boardElement.querySelector(`.board__tasks`);

const generatedTasks = generateTasks(TASK_COUNT);
// render add/edit task form
render(tasksListElement, createTaskFormTemplate(generatedTasks[0]));
// render tasks
generatedTasks.slice(1, TASKS_PER_LOAD).forEach((task) => render(tasksListElement, createTaskTemplate(task)));

// render load more button
render(boardElement, createLoadMoreTemplate());

let renderedTasksCount = TASKS_PER_LOAD;
const loadMoreButton = document.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  // render new portion of tasks
  generatedTasks.slice(renderedTasksCount, renderedTasksCount + TASKS_PER_LOAD)
    .forEach((task) => render(tasksListElement, createTaskTemplate(task)));
  // scroll to make load more button visible on page
  loadMoreButton.scrollIntoView();
  // update rendered tasks counter and check if there are more tasks to load
  renderedTasksCount += TASKS_PER_LOAD;
  if (renderedTasksCount >= TASK_COUNT) {
    // no more tasks to load
    loadMoreButton.remove();
  }
});

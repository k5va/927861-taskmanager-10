import {createSiteMenuTemplate} from "./components/site-menu";
import {createFilterTemplate} from "./components/filter";
import {createBoardTemplate} from "./components/board";
import {createTaskTemplate} from "./components/task";
import {createLoadMoreTemplate} from "./components/load-more";
import {createTaskFormTemplate} from "./components/task-form";

const TASK_COUNT = 3;

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
render(mainElement, createFilterTemplate());
// render board (tasks list)
render(mainElement, createBoardTemplate());

const boardElement = mainElement.querySelector(`.board`);
const tasksListElement = boardElement.querySelector(`.board__tasks`);

// render add/edit task form
render(tasksListElement, createTaskFormTemplate());
// render tasks
new Array(TASK_COUNT)
  .fill(``)
  .forEach(() => render(tasksListElement, createTaskTemplate()));

// render load more button
render(boardElement, createLoadMoreTemplate());

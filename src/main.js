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

const mainElement = document.querySelector(`.main`);
const controlElement = mainElement.querySelector(`.main__control`);
const generatedTasks = generateTasks(TASK_COUNT);

// render site menu
render(controlElement, new SiteMenu().getElement());
// render filter
render(mainElement, new Filter(generateFilters(generatedTasks)).getElement());
// render board (tasks list)
render(mainElement, new Board().getElement());

const boardElement = mainElement.querySelector(`.board`);
const tasksListElement = boardElement.querySelector(`.board__tasks`);

// render add/edit task form
render(tasksListElement, new TaskForm(generatedTasks[0]).getElement());
// render tasks
generatedTasks
  .slice(1, TASKS_PER_LOAD)
  .forEach((task) => render(tasksListElement, new Task(task).getElement()));

const loadMore = new LoadMore();
// render load more button
render(boardElement, loadMore.getElement());

let renderedTasksCount = TASKS_PER_LOAD;
loadMore.getElement().addEventListener(`click`, () => {
  // render new portion of tasks
  generatedTasks.slice(renderedTasksCount, renderedTasksCount + TASKS_PER_LOAD)
    .forEach((task) => render(tasksListElement, new Task(task).getElement()));
  // scroll to make load more button visible on page
  loadMore.getElement().scrollIntoView();
  // update rendered tasks counter and check if there are more tasks to load
  renderedTasksCount += TASKS_PER_LOAD;
  if (renderedTasksCount >= TASK_COUNT) {
    // no more tasks to load
    loadMore.removeElement();
  }
});

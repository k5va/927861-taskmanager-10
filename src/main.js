import {MenuComponent, BoardComponent} from "./components";
import {generateTasks} from "./mock/task";
import {render} from "./utils";
import {BoardController, FilterController} from "./controllers";
import {TasksModel} from "./models";

const TASK_COUNT = 22;

const mainElement = document.querySelector(`.main`);
const controlElement = mainElement.querySelector(`.main__control`);
const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

// render site menu
render(controlElement, new MenuComponent());
// create filter controller and render filter
const filterController = new FilterController(mainElement, tasksModel);
filterController.render();
// render board
const boardComponent = new BoardComponent();
render(mainElement, boardComponent);
// create board controller and render tasks
const boardController = new BoardController(boardComponent, tasksModel);
boardController.render();

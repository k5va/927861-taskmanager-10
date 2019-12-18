import {MenuComponent, FilterComponent, BoardComponent} from "./components";
import {generateTasks} from "./mock/task";
import {generateFilters} from "./mock/filter";
import {render} from "./utils";
import BoardController from "./controllers/board";
import {TasksModel} from "./models";

const TASK_COUNT = 22;

const mainElement = document.querySelector(`.main`);
const controlElement = mainElement.querySelector(`.main__control`);
const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

// render site menu
render(controlElement, new MenuComponent());
// render filter
render(mainElement, new FilterComponent(generateFilters(tasksModel.getTasks())));
// render board
const boardComponent = new BoardComponent();
render(mainElement, boardComponent);
// create board controller and render tasks
const boardController = new BoardController(boardComponent);
boardController.render(tasks);

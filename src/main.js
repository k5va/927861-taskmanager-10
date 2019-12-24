import {MenuComponent, BoardComponent, StatisticsComponent} from "./components";
import {generateTasks} from "./mock/task";
import {render} from "./utils";
import {BoardController, FilterController} from "./controllers";
import {TasksModel} from "./models";
import {MenuItem} from "./consts";

const TASK_COUNT = 22;

const mainElement = document.querySelector(`.main`);
const controlElement = mainElement.querySelector(`.main__control`);
const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

// render site menu
const menuComponent = new MenuComponent();
render(controlElement, menuComponent);
// create filter controller and render filter
const filterController = new FilterController(mainElement, tasksModel);
filterController.render();
// render board
const boardComponent = new BoardComponent();
render(mainElement, boardComponent);
// create board controller and render tasks
const boardController = new BoardController(boardComponent, tasksModel);
// create statistics component and render
const statisticsComponent = new StatisticsComponent();
render(mainElement, statisticsComponent);
statisticsComponent.hide();

menuComponent.setSelectHandler((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      statisticsComponent.hide();
      boardController.show();
      boardController.addTask();
      break;
    case MenuItem.STATISTICS:
      boardController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TASKS:
      statisticsComponent.hide();
      boardController.show();
      break;
  }
});

boardController.render();

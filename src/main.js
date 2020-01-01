import {MenuComponent, BoardComponent, StatisticsComponent} from "./components";
import {render} from "./utils";
import {BoardController, FilterController} from "./controllers";
import {TasksModel} from "./models";
import {MenuItem, DEFAULT_STATISTICS_PERIOD, AUTHORIZATION, END_POINT} from "./consts";
import moment from "moment";
import API from "./api";

const mainElement = document.querySelector(`.main`);
const controlElement = mainElement.querySelector(`.main__control`);
const endDate = new Date();
const startDate = moment().subtract(DEFAULT_STATISTICS_PERIOD, `d`).toDate();
const api = new API(END_POINT, AUTHORIZATION);
const tasksModel = new TasksModel();

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
const boardController = new BoardController(boardComponent, tasksModel, api);
// create statistics component and render
const statisticsComponent = new StatisticsComponent(tasksModel.getTasks(), startDate, endDate);
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
    default:
      statisticsComponent.hide();
      boardController.show();
      break;
  }
});

api
  .getTasks()
  .then((tasks) => {
    tasksModel.setTasks(tasks);
    boardController.render();
  });


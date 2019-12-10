import {
  TaskComponent, TaskFormComponent, MenuComponent,
  FilterComponent, BoardComponent, NoTasksComponent,
  SortComponent, TaskListComponent, LoadMoreComponent
} from "./components";
import {generateTasks} from "./mock/task";
import {generateFilters} from "./mock/filter";
import {render} from "./utils";

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

  const taskComponent = new TaskComponent(task);
  taskComponent.setEditHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskFormComponent(task);
  taskEditComponent.setSubmitHandler(() => {
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tasksComponent.getElement(), taskComponent);
};

const mainElement = document.querySelector(`.main`);
const controlElement = mainElement.querySelector(`.main__control`);
const generatedTasks = generateTasks(TASK_COUNT);

// render site menu
render(controlElement, new MenuComponent());
// render filter
render(mainElement, new FilterComponent(generateFilters(generatedTasks)));
// render board (tasks list)
const boardComponent = new BoardComponent();
render(mainElement, boardComponent);

// render tasks
const isAllTasksArchived = generatedTasks.every((task) => task.isArchive);
if (isAllTasksArchived) {
  render(boardComponent.getElement(), new NoTasksComponent());
} else {
  render(boardComponent.getElement(), new SortComponent());
  const tasksComponent = new TaskListComponent();
  render(boardComponent.getElement(), tasksComponent);

  generatedTasks
    .slice(0, TASKS_PER_LOAD)
    .forEach((task) => renderTask(task, tasksComponent));

  const loadMoreComponent = new LoadMoreComponent();
  // render load more button
  render(boardComponent.getElement(), loadMoreComponent);

  let renderedTasksCount = TASKS_PER_LOAD;
  loadMoreComponent.setClickHandler(() => {
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

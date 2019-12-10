import {TaskComponent, TaskFormComponent} from "../../components";
import {render} from "../../utils";

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

export {renderTask};

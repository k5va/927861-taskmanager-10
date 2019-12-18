import {TaskComponent, TaskFormComponent} from "../../components";
import {render, replace} from "../../utils";
import {Color} from "../../consts";

const TaskMode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADD: `add`
};

export const EmptyTask = {
  description: ``,
  dueDate: null,
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  tags: [],
  color: Color.BLACK,
  isFavorite: false,
  isArchive: false,
};

export default class TaskController {
  /**
   * Creates an instance of TaskController.
   * @param {Component} container - container component to add tasks to
   * @param {Function} onDataChange - data change handler
   * @param {Function} onViewChange - view change handler
   */
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = TaskMode.DEFAULT;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  /**
   * Renders given task
   * @param {*} task - task object
   */
  render(task) {
    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskFormComponent(task);

    this._taskComponent.setEditHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._taskComponent.setArchiveHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {isArchive: !task.isArchive}));
    });

    this._taskComponent.setFavoritesHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {isFavorite: !task.isFavorite}));
    });

    this._taskEditComponent.setSubmitHandler(() => {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._taskEditComponent.setDeleteHandler(() => {
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      this._onDataChange(this, task, null);
    });

    if (oldTaskEditComponent && oldTaskComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._taskEditComponent, oldTaskEditComponent);
    } else {
      render(this._container.getElement(), this._taskComponent);
    }
  }

  /**
   * Changes task component to task form component (edit mode)
   */
  _replaceEditToTask() {
    this._taskEditComponent.reset();

    // switch to default mode
    replace(this._taskComponent, this._taskEditComponent);
    this._mode = TaskMode.DEFAULT;
  }

  /**
  * Changes task edit component back to task component (view mode)
  */
  _replaceTaskToEdit() {
    // fire view change event
    this._onViewChange();
    // switch to edit mode
    replace(this._taskEditComponent, this._taskComponent);
    this._mode = TaskMode.EDIT;
  }

  /**
   * Handler for Esc key down event
   * @param {KeyboardEvent} evt - event object
   */
  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  /**
   * Sets controller to default view
   */
  setDefaultView() {
    if (this._mode !== TaskMode.DEFAULT) {
      this._replaceEditToTask();
    }
  }
}

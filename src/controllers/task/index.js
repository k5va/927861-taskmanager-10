import {TaskComponent, TaskFormComponent} from "../../components";
import {render, replace, RenderPosition} from "../../utils";
import {Color, WeekDay} from "../../consts";
import {parseFormData} from "./parse-form-data";
import {Task} from "../../models";

export const RenderMode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADD: `add`
};

export const EmptyTask = {
  description: ``,
  dueDate: null,
  repeatingDays: {
    [WeekDay.MO]: false,
    [WeekDay.TU]: false,
    [WeekDay.WE]: false,
    [WeekDay.TH]: false,
    [WeekDay.FR]: false,
    [WeekDay.SA]: false,
    [WeekDay.SU]: false
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

    this._mode = RenderMode.DEFAULT;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  /**
   * Renders given task
   * @param {Task} task - task object
   * @param {String} mode - render mode
   */
  render(task, mode = RenderMode.DEFAULT) {
    this._mode = mode;

    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskFormComponent(task);

    this._taskComponent.setEditHandler(() => {
      this._replaceTaskToEdit();
    });

    this._taskComponent.setArchiveHandler(() => {
      const newTask = Task.clone(task);
      newTask.isArchive = !newTask.isArchive;
      this._onDataChange(this, task, newTask);
    });

    this._taskComponent.setFavoritesHandler(() => {
      const newTask = Task.clone(task);
      newTask.isFavorite = !newTask.isFavorite;
      this._onDataChange(this, task, newTask);
    });

    this._taskEditComponent.setSubmitHandler(() => {
      const newTask = parseFormData(this._taskEditComponent.getData());
      newTask.id = task.id;
      this._onDataChange(this, this._mode === RenderMode.ADD ? null : task, newTask);
      this._replaceEditToTask(); // TODO: move to render when DEFAULT mode?
    });

    this._taskEditComponent.setDeleteHandler(() => {
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      this._onDataChange(this, task, null);
    });

    switch (this._mode) {
      case RenderMode.DEFAULT:
      default:
        if (oldTaskEditComponent && oldTaskComponent) {
          replace(this._taskComponent, oldTaskComponent);
          replace(this._taskEditComponent, oldTaskEditComponent);
        } else {
          render(this._container.getElement(), this._taskComponent);
        }
        break;
      case RenderMode.ADD:
        render(this._container.getElement(), this._taskEditComponent, RenderPosition.AFTER_BEGIN);
        document.addEventListener(`keydown`, this._onEscKeyDown);
        break;
    }
  }

  /**
   * Changes task component to task form component (edit mode)
   */
  _replaceEditToTask() {
    this._taskEditComponent.reset();

    // switch to default mode
    replace(this._taskComponent, this._taskEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = RenderMode.DEFAULT;
  }

  /**
  * Changes task edit component back to task component (view mode)
  */
  _replaceTaskToEdit() {
    // fire view change event
    this._onViewChange();
    // switch to edit mode
    replace(this._taskEditComponent, this._taskComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = RenderMode.EDIT;
  }

  /**
   * Handler for Esc key down event
   * @param {KeyboardEvent} evt - event object
   */
  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === RenderMode.ADD) {
        document.removeEventListener(`keydown`, this._onEscKeyDown);
        this._onDataChange(this, EmptyTask, null);
      } else {
        this._replaceEditToTask();
      }
    }
  }

  /**
   * Sets controller to default view
   */
  setDefaultView() {
    if (this._mode !== RenderMode.DEFAULT) {
      this._replaceEditToTask();
    }
  }

  /**
   * Destroys controller by removing it's elements and listeners from the DOM
   */
  destroy() {
    this._taskComponent.removeElement();
    this._taskEditComponent.removeElement();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  /**
   * Controller's render mode getter
   */
  get mode() {
    return this._mode;
  }

  /**
   * Switches task controller to default mode and locks it's controls
   */
  lock() {
    this.setDefaultView();
    this._taskComponent.lock();
  }
}

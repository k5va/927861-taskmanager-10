import AbstractSmartComponent from "../smart-component";
import {template} from "./template";
import {hasSomeBoolean} from "../../utils";

export default class TaskForm extends AbstractSmartComponent {
  constructor(task) {
    super();

    this._task = task;
    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = hasSomeBoolean(task.repeatingDays);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);

    this._subscribeOnEvents();
  }

  /**
   * Returns component's template
   * @return {String} - template
   */
  getTemplate() {
    return template(this._task, {
      isDateShowing: this._isDateShowing,
      isRepeatingTask: this._isRepeatingTask,
      activeRepeatingDays: this._activeRepeatingDays,
    });
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  /**
   * Sets task form component's submit handler
   * @param {Function} handler - handler
   */
  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);
  }

  /**
   * Addes component's interactive controls events handlers
   */
  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, () => {
        this._isDateShowing = !this._isDateShowing;

        this.rerender();
      });

    element.querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, () => {
        this._isRepeatingTask = !this._isRepeatingTask;

        this.rerender();
      });

    const repeatDays = element.querySelector(`.card__repeat-days`);
    if (repeatDays) {
      repeatDays.addEventListener(`change`, (evt) => {
        this._activeRepeatingDays[evt.target.value] = evt.target.checked;

        this.rerender();
      });
    }
  }
}

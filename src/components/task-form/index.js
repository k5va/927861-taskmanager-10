import AbstractSmartComponent from "../smart-component";
import {template} from "./template";
import {hasSomeBoolean} from "../../utils";
import flatpickr from "flatpickr";

export default class TaskForm extends AbstractSmartComponent {
  constructor(task) {
    super();

    this._task = task;
    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = hasSomeBoolean(task.repeatingDays);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);

    this._submitHandler = null;
    this._flatpickr = null;

    this._applyFlatpickr();
    this._subscribeOnInternalEvents();
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

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  /**
   * Creates flatpickr and initializes it with due date
   */
  _applyFlatpickr() {
    if (this._flatpickr) {
      // remove flatpickr's DOM elements
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    if (this._isDateShowing) {
      const dateElement = this.getElement().querySelector(`.card__date`);
      this._flatpickr = flatpickr(dateElement, {
        altInput: true,
        enableTime: true,
        altFormat: `j F H:i K`,
        defaultDate: this._task.dueDate,
      });
    }
  }

  /**
   * Resets component's data and rerenders it
   */
  reset() {
    this._isDateShowing = !!this._task.dueDate;
    this._isRepeatingTask = hasSomeBoolean(this._task.repeatingDays);
    this._activeRepeatingDays = Object.assign({}, this._task.repeatingDays);

    this.rerender();
  }

  recoveryListeners() {
    this._subscribeOnInternalEvents();

    this._recoverSubmitHandler();
  }

  /**
   * Sets task form component's submit handler
   * @param {Function} handler - handler
   */
  setSubmitHandler(handler) {
    this._submitHandler = handler;
    this._recoverSubmitHandler();
  }

  _recoverSubmitHandler() {
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._submitHandler);
  }

  /**
   * Addes component's interactive controls events handlers
   */
  _subscribeOnInternalEvents() {
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

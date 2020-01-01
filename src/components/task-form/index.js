import AbstractSmartComponent from "../smart-component";
import {template} from "./template";
import {hasSomeBoolean} from "../../utils";
import flatpickr from "flatpickr";
import {isDescriptionValid} from "./is-description-valid";

export default class TaskForm extends AbstractSmartComponent {
  constructor(task) {
    super();

    this._task = task;
    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = hasSomeBoolean(task.repeatingDays);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);
    this._currentDescription = task.description;

    this._submitHandler = null;
    this._deleteHandler = null;
    this._flatpickr = null;

    this._applyFlatpickr();
    this._subscribeOnInternalEvents();

    this._toggleSaveButton(this._currentDescription !== ``);
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
      currentDescription: this._currentDescription
    });
  }

  /**
   * Rerenders component
   */
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
    this._currentDescription = this._task.description;

    this.rerender();
  }

  /**
   * Returns task form's formdata.
   * @return {FormData} - task object
   */
  getData() {
    const form = this.getElement().querySelector(`.card__form`);
    return new FormData(form);
  }

  /**
   * Restores component's listeners
   */
  recoverListeners() {
    this._subscribeOnInternalEvents();

    this._recoverSubmitHandler();
    this._recoverDeleteHandler();
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
    this.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this._submitHandler();
    });
  }

  /**
   * Sets task form component's delete handler
   * @param {Function} handler - handler
   */
  setDeleteHandler(handler) {
    this._deleteHandler = handler;
    this._recoverDeleteHandler();
  }

  _recoverDeleteHandler() {
    this.getElement().querySelector(`.card__delete`).addEventListener(`click`, this._deleteHandler);
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

    element.querySelector(`.card__text`)
      .addEventListener(`input`, (evt) => {
        this._currentDescription = evt.target.value;
        this._toggleSaveButton(isDescriptionValid(this._currentDescription));
      });
  }

  /**
   * Enables or disables save button
   * @param {Boolean} isEnabled - if true enables save button. False - disables
   */
  _toggleSaveButton(isEnabled = true) {
    const saveButton = this.getElement().querySelector(`.card__save`);
    saveButton.disabled = !isEnabled;
  }
}

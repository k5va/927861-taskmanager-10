import AbstractComponent from "../component";
import {template} from "./template";

export default class TaskForm extends AbstractComponent {
  constructor(task) {
    super();

    this._task = task;
  }

  /**
   * Returns component's template
   * @return {String} - template
   */
  getTemplate() {
    return template(this._task);
  }

  /**
   * Sets task form component's submit handler
   * @param {Function} handler - handler
   */
  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);
  }
}

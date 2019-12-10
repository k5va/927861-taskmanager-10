import AbstractComponent from "../component";
import {template} from "./template";

export default class Task extends AbstractComponent {
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
   * Sets task component edit mode handler
   * @param {Function} handler - handler
   */
  setEditHandler(handler) {
    this.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, handler);
  }
}

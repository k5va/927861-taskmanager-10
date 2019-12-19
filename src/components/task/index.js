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

  /**
   * Sets task component archive click handler
   * @param {Function} handler - handler
   */
  setArchiveHandler(handler) {
    this.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, handler);
  }

  /**
   * Sets task component favorites click handler
   * @param {Function} handler - handler
   */
  setFavoritesHandler(handler) {
    this.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, handler);
  }

  /**
   * Locks component's controls
   */
  lock() {
    this.getElement().querySelector(`.card__btn--edit`).disabled = true;
    this.getElement().querySelector(`.card__btn--archive`).disabled = true;
    this.getElement().querySelector(`.card__btn--favorites`).disabled = true;
  }
}

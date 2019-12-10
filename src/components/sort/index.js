import AbstractComponent from "../component";
import {template} from "./template";
import {SortType} from "../../consts";

export default class Sort extends AbstractComponent {

  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  /**
   * Returns component's template
   * @return {String} - template
   */
  getTemplate() {
    return template();
  }

  /**
   * Sets sort type change handler
   * @param {Function} handler - handler
   */
  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (!evt.target.classList.contains(`board__filter`)) {
        return;
      }

      const sortType = evt.target.dataset.sortType;
      if (this._currentSortType === sortType) {
        // return if sort type hasn't changed
        return;
      }

      // save current sort and call handler
      this._currentSortType = sortType;
      handler(sortType);
    });
  }
}

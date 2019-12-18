import AbstractComponent from "../component";
import {template} from "./template";

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  /**
   * Returns component's template
   * @return {String} - template
   */
  getTemplate() {
    return template(this._filters);
  }

  /**
   * Sets filter change handler
   * @param {Function} handler - handler
   */
  setFilterChangeHandler(handler) {
    this
      .getElement()
      .addEventListener(`change`, (evt) => {
        evt.preventDefault();

        if (!evt.target.classList.contains(`filter__input`)) {
          return;
        }

        handler(evt.target.value);
      });
  }
}

import AbstractComponent from "../component";
import {template} from "./template";

export default class LoadMore extends AbstractComponent {
  /**
   * Returns component's template
   * @return {String} - template
   */
  getTemplate() {
    return template();
  }

  /**
   * Sets Load more component's click handler
   * @param {Function} handler - handler
   */
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}

import AbstractComponent from "../component";
import {template} from "./template";

export default class SiteMenu extends AbstractComponent {
  /**
   * Returns component's template
   * @return {String} - template
   */
  getTemplate() {
    return template();
  }

  /**
   * Sets new task handler
   * @param {Function} handler - handler
   */
  setNewTaskHandler(handler) {
    this.getElement().querySelector(`.control__input__new-task`).addEventListener(`change`, handler);
  }
}

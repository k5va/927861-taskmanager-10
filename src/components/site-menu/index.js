import AbstractComponent from "../component";
import {template} from "./template";
import {MenuItem} from "../../consts";

export default class SiteMenu extends AbstractComponent {
  /**
   * Returns component's template
   * @return {String} - template
   */
  getTemplate() {
    return template();
  }

  /**
   * Sets menu item select handler
   * @param {Function} handler - handler
   */
  setSelectHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      if (!evt.target.classList.contains(`control__input`)) {
        return;
      }

      const menuItem = evt.target.id;
      if (menuItem === MenuItem.NEW_TASK) {
        this.getElement().querySelector(`#${MenuItem.TASKS}`).checked = true;
      }

      handler(menuItem);
    });
  }
}

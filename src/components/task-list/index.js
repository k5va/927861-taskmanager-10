import AbstractComponent from '../component';
import {template} from "./template";

export default class Tasks extends AbstractComponent {
  /**
   * Returns component's template
   * @return {String} - template
   */
  getTemplate() {
    return template();
  }

  resetList() {
    this.getElement().innerHTML = ``;
  }
}

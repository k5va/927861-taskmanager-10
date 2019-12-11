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
}

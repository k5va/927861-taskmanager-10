import {createElement} from "../utils/utils";

export default class Component {
  constructor(template) {
    this._element = null;
    this._template = template;
  }

  getTemplate() {
    return this._template;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this.getElement().remove();
    this._element = null;
  }
}

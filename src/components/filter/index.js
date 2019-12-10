import AbstractComponent from "../component";
import {template} from "./template";

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super(template(filters));
  }
}

import AbstractComponent from "../component";
import {template} from "./template";

export default class Task extends AbstractComponent {
  constructor(task) {
    super(template(task));
  }
}

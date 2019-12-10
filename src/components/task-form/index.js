import AbstractComponent from "../component";
import {template} from "./template";

export default class TaskForm extends AbstractComponent {
  constructor(task) {
    super(template(task));
  }
}

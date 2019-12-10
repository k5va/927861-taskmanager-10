import AbstractComponent from "../component";
import {template} from "./template";

export default class NoTasks extends AbstractComponent {
  constructor() {
    super(template());
  }
}

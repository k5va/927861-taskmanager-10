import Component from "../component";
import {template} from "./template";

export default class TaskForm extends Component {
  constructor(task) {
    super(template(task));
  }
}

import Component from "../component";
import {template} from "./template";

export default class Task extends Component {
  constructor(task) {
    super(template(task));
  }
}

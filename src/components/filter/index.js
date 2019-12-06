import Component from "../component";
import {template} from "./template";

export default class Filter extends Component {
  constructor(filters) {
    super(template(filters));
  }
}

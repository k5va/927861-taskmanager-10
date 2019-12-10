import AbstractComponent from "../component";
import {template} from "./template";

export default class Board extends AbstractComponent {
  constructor() {
    super(template());
  }
}

import AbstractComponent from '../component';
import {template} from "./template";

export default class Tasks extends AbstractComponent {
  constructor() {
    super(template());
  }
}

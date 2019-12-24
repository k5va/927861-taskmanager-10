import AbstractSmartComponent from "../smart-component";
import {template} from "./template";

export default class Statistics extends AbstractSmartComponent {

  getTemplate() {
    return template();
  }
}

import AbstractComponent from "../component";
import {template} from "./template";

export default class SiteMenu extends AbstractComponent {
  constructor() {
    super(template());
  }
}

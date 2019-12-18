import {render, replace} from "../../utils";
import {FilterComponent} from "../../components";
import {generateFilters} from "./generate-filter";
import {Filters} from "../../consts";

export default class FilterController {
  /**
   *Creates an instance of FilterController.
   * @param {HTMLElement} container - container
   * @param {TasksModel} tasksModel - tasks model
   */
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;

    this._currentFilter = Filters.ALL;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._tasksModel.setDataChangeHandler(this._onDataChange);
  }

  /**
   * Renders filter
   */
  render() {
    const oldFilterComponent = this._filterComponent;
    this._filterComponent = new FilterComponent(generateFilters(this._tasksModel.getTasks(), this._currentFilter));
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldFilterComponent) {
      replace(this._filterComponent, oldFilterComponent);
    } else {
      render(this._container, this._filterComponent);
    }
  }

  /**
   * Filter change handler
   * @param {String} newFilter - selected filter
   */
  _onFilterChange(newFilter) {
    // pass new filter to model
    this._tasksModel.setFilter(newFilter);
    this._currentFilter = newFilter;
  }

  /**
   * Tasks model data change handler
   */
  _onDataChange() {
    this.render();
  }
}

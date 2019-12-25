import AbstractSmartComponent from "../smart-component";
import {template} from "./template";
import flatpickr from "flatpickr";
import {renderDaysChart} from "./render-days-chart";
import {renderTagsChart} from "./render-tags-chart";
import {renderColorsChart} from "./render-colors-chart";

export default class Statistics extends AbstractSmartComponent {

  constructor(tasks, dateFrom, dateTo) {
    super();

    this._tasks = tasks;
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;

    this._daysChart = null;
    this._tagsChart = null;
    this._colorsChart = null;

    this._applyFlatpickr(this.getElement().querySelector(`.statistic__period-input`));

    this._renderCharts();
  }

  getTemplate() {
    return template(this._tasks, this._dateFrom, this._dateTo);
  }

  show() {
    super.show();

    this.rerender(this._tasks, this._dateFrom, this._dateTo);
  }

  rerender(tasks, dateFrom, dateTo) {
    this._tasks = tasks;
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;

    super.rerender();

    this._renderCharts();
  }

  recoverListeners() {}

  _renderCharts() {
    const element = this.getElement();

    this._applyFlatpickr(element.querySelector(`.statistic__period-input`));

    const daysCtx = element.querySelector(`.statistic__days`);
    const tagsCtx = element.querySelector(`.statistic__tags`);
    const colorsCtx = element.querySelector(`.statistic__colors`);

    this._resetCharts();
    this._daysChart = renderDaysChart(daysCtx, this._tasks, this._dateFrom, this._dateTo);
    this._tagsChart = renderTagsChart(tagsCtx, this._tasks);
    this._colorsChart = renderColorsChart(colorsCtx, this._tasks);
  }

  _resetCharts() {
    if (this._daysChart) {
      this._daysChart.destroy();
      this._daysChart = null;
    }

    if (this._tagsChart) {
      this._tagsChart.destroy();
      this._tagsChart = null;
    }

    if (this._colorsChart) {
      this._colorsChart.destroy();
      this._colorsChart = null;
    }
  }

  _applyFlatpickr(element) {
    if (this._flatpickr) {
      this._flatpickr.destroy();
    }

    this._flatpickr = flatpickr(element, {
      altInput: true,
      allowInput: true,
      defaultDate: [this._dateFrom, this._dateTo],
      mode: `range`,
      onChange: (dates) => {
        if (dates.length === 2) {
          this.rerender(this._tasks, dates[0], dates[1]);
        }
      }
    });
  }
}

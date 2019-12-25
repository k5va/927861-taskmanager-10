import {isSameDay} from "../../utils";
import moment from "moment";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

/**
 * Returns array of all dates between given dates
 * @param {Date} from - start date
 * @param {Date} to - end date
 * @return {Array<Date>} - array of dates
 */
const getDatesBetween = (from, to) => {
  const result = [];
  let date = new Date(from);

  while (date <= to) {
    result.push(date);

    date = new Date(date);
    date.setDate(date.getDate() + 1);
  }

  return result;
};

const renderDaysChart = (daysCtx, tasks, dateFrom, dateTo) => {
  const days = getDatesBetween(dateFrom, dateTo);
  const taskCountOnDay = days.map((day) => tasks.filter((task) => isSameDay(task.dueDate, day)).length);
  const formattedDates = days.map((day) => moment(day).format(`DD MMM`));

  return new Chart(daysCtx, {
    plugins: [ChartDataLabels],
    type: `line`,
    data: {
      labels: formattedDates,
      datasets: [{
        data: taskCountOnDay,
        backgroundColor: `transparent`,
        borderColor: `#000000`,
        borderWidth: 1,
        lineTension: 0,
        pointRadius: 8,
        pointHoverRadius: 8,
        pointBackgroundColor: `#000000`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 8
          },
          color: `#ffffff`
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            display: false
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            fontStyle: `bold`,
            fontColor: `#000000`
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }]
      },
      legend: {
        display: false
      },
      layout: {
        padding: {
          top: 10
        }
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

export {renderDaysChart};

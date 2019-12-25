import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

/**
 * Counts number of tasks of given color
 * @param {Array<Object>} tasks - array of tasks
 * @param {String} color - color
 * @return {Number} - number of tasks of given color
 */
const countTasksOfColor = (tasks, color) => tasks.filter((task) => task.color === color).length;

const renderColorsChart = (colorsCtx, tasks) => {
  // get uniq colors
  const colors = [...new Set(tasks.map((task) => task.color))];

  return new Chart(colorsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: colors,
      datasets: [{
        data: colors.map((color) => countTasksOfColor(tasks, color)),
        backgroundColor: colors
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);

            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: COLORS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });
};

export {renderColorsChart};

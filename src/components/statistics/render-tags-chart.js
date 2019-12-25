import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const createRandomColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

const renderTagsChart = (tagsCtx, tasks) => {

  const tagsLabels = [...new Set(tasks
    .map((task) => task.tags)
    .reduce((acc, tags) => acc.concat([...tags]), []))];

  const chartData = tagsLabels
    .map((tag) => tasks.reduce((acc, task) => acc + [...task.tags].filter((it) => it === tag).length, 0));

  return new Chart(tagsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: tagsLabels,
      datasets: [{
        data: chartData,
        backgroundColor: tagsLabels.map(createRandomColor)
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
        text: `DONE BY: TAGS`,
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

export {renderTagsChart};

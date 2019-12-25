import moment from "moment";

const createPlaceholder = (dateFrom, dateTo) => {
  const format = (date) => {
    return moment(date).format(`DD MMM`);
  };

  return `${format(dateFrom)} - ${format(dateTo)}`;
};

const getTasksBetweenDates = (tasks, dateFrom, dateTo) => tasks.
  filter((task) => task.dueDate >= dateFrom && task.dueDate <= dateTo);

/**
 * Generates statistics component HTML template
 * @param {Array<Object>} tasks  - array of tasks
 * @param {Date} dateFrom - start date
 * @param {Date} dateTo - end date
 * @return {String} - template
 */
const template = (tasks, dateFrom, dateTo) => {
  const periodPlaceholder = createPlaceholder(dateFrom, dateTo);
  const tasksCount = getTasksBetweenDates(tasks, dateFrom, dateTo).length;

  return (
    `<section class="statistic container">
        <div class="statistic__line">
          <div class="statistic__period">
            <h2 class="statistic__period-title">Task Activity DIAGRAM</h2>

            <div class="statistic-input-wrap">
              <input
                class="statistic__period-input"
                type="text"
                placeholder="${periodPlaceholder}"
              />
            </div>

            <p class="statistic__period-result">
              In total for the specified period
              <span class="statistic__task-found">${tasksCount}</span> tasks were fulfilled.
            </p>
          </div>
          <div class="statistic__line-graphic">
            <canvas class="statistic__days" width="550" height="150"></canvas>
          </div>
        </div>

        <div class="statistic__circle">
          <div class="statistic__tags-wrap">
            <canvas class="statistic__tags" width="400" height="300"></canvas>
          </div>
          <div class="statistic__colors-wrap">
            <canvas class="statistic__colors" width="400" height="300"></canvas>
          </div>
        </div>
      </section>`
  );
};

export {template};

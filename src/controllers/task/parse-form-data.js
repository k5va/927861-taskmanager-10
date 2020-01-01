import {WeekDay} from "../../consts";
import {Task} from "../../models";

/**
 * Creates task object from given form data
 * @param {FormData} formData - form data object
 * @return {Task} - task
 */
const parseFormData = (formData) => {
  const repeatingDays = Object.values(WeekDay).reduce((acc, day) => {
    acc[day] = false;
    return acc;
  }, {});
  const date = formData.get(`date`);

  return new Task({
    'description': formData.get(`text`),
    'due_date': date ? new Date(date) : null,
    'tags': formData.getAll(`hashtag`),
    'repeating_days': formData.getAll(`repeat`).reduce((acc, it) => {
      acc[it] = true;
      return acc;
    }, repeatingDays),
    'color': formData.get(`color`),
    'is_favorite': false,
    'is_done': false,
  });
};

export {parseFormData};

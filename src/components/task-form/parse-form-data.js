import {WeekDay} from "../../consts";

/**
 * Creates task object from given form data
 * @param {FormData} formData - form data object
 * @return {*} - task object
 */
const parseFormData = (formData) => {
  const repeatingDays = Object.values(WeekDay).reduce((acc, day) => {
    acc[day] = false;
    return acc;
  }, {});
  const date = formData.get(`date`);

  return {
    description: formData.get(`text`),
    color: formData.get(`color`),
    tags: new Set(formData.getAll(`hashtag`)),
    dueDate: date ? new Date(date) : null,
    repeatingDays: formData.getAll(`repeat`).reduce((acc, day) => {
      acc[day] = true;
      return acc;
    }, repeatingDays),
  };
};

export {parseFormData};

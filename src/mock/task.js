import {Color, WeekDay} from '../consts.js';
import {getRandomArrayItem, getRandomDate, getRandomBoolean} from '../utils';

const MAX_TAGS_COUNT = 3;
const DEFAULT_TASKS_COUNT = 5;

const DescriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const DefaultRepeatingDays = {
  [WeekDay.MO]: false,
  [WeekDay.TU]: false,
  [WeekDay.WE]: false,
  [WeekDay.TH]: false,
  [WeekDay.FR]: false,
  [WeekDay.SA]: false,
  [WeekDay.SU]: false
};

const Tags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
];

/**
 * Generates random task's repeating days
 * @return {*} tasks's repeating days
 */
const generateRepeatingDays = () => Object.assign(
    {},
    DefaultRepeatingDays,
    {'mo': getRandomBoolean()}
);

/**
 * Generates random task's tags
 * @param {Number} maxTagsNum - maximum number of tags
 * @return {Set<String>} - Set of random tags
 */
const generateTags = (maxTagsNum = MAX_TAGS_COUNT) => new Set(
    Tags
      .filter(() => getRandomBoolean())
      .slice(0, maxTagsNum)
);

/**
 * Generates random task
 * @return {*} - task object
 */
const generateTask = () => {
  const dueDate = getRandomBoolean() ? null : getRandomDate();

  return {
    id: String(new Date() + Math.random()),
    description: getRandomArrayItem(DescriptionItems),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    tags: generateTags(),
    color: getRandomArrayItem(Object.values(Color)),
    isFavorite: getRandomBoolean(),
    isArchive: getRandomBoolean(),
  };
};

/**
 * Generates given number of random tasks
 * @param {Number} count - number of tasks to generate
 * @return {Array<*>} - array of generated tasks
 */
const generateTasks = (count = DEFAULT_TASKS_COUNT) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

export {generateTask, generateTasks};

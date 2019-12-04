import {COLORS} from '../const.js';
import {getRandomArrayItem, getRandomDate, getRandomBoolean} from '../utils/utils';

const MAX_TAGS_COUNT = 3;
const DEFAULT_TASKS_COUNT = 5;

const DescriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
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
    description: getRandomArrayItem(DescriptionItems),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    tags: generateTags(),
    color: getRandomArrayItem(COLORS),
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

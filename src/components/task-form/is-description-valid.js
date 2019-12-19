
const MIN_DESCRIPTION_LENGTH = 1;
const MAX_DESCRIPTION_LENGTH = 140;

/**
 * Checks if given task description is valid
 * @param {String} description - description
 * @return {Boolean} - true if description is valid
 */
const isDescriptionValid = (description) => description
  && description.length >= MIN_DESCRIPTION_LENGTH
  && description.length <= MAX_DESCRIPTION_LENGTH;

export {isDescriptionValid};

/**
 * Creates filter html template
 * @param {Array<*>} filters - array of filters
 * @return {String} template
 */
const template = (filters) => {
  const filtersMarkup = filters
    .map(({name, count, selected}) => (
      `<input type="radio" id="filter__${name}"
        class="filter__input visually-hidden" name="filter" value="${name}"
        ${selected ? `checked` : ``}
      />
      <label for="filter__${name}" class="filter__label">
        ${name}<span class="filter__${name}-count"> ${count}</span>
      </label>`))
    .join(``);

  return `<section class="main__filter filter container">${filtersMarkup}</section>`;
};

export {template};

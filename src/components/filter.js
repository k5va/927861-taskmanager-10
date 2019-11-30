const DEFAULT_SELECTED_FILTER = 0;
/**
 * Creates filter html template
 * @param {Array<*>} filters - array of filters
 * @return {String} template
 */
export const createFilterTemplate = (filters) => {
  const filtersMarkup = filters
    .map(({name, count}, index) => `<input
                              type="radio"
                              id="filter__${name}"
                              class="filter__input visually-hidden"
                              name="filter"
                              ${index === DEFAULT_SELECTED_FILTER ? `checked` : ``}
                            />
                            <label for="filter__${name}" class="filter__label">
                              ${name}<span class="filter__${name}-count"> ${count}</span>
                            </label>`)
    .join(``);

  return `<section class="main__filter filter container">${filtersMarkup}</section>`;
};

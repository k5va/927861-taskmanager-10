/**
 * Creates colors list html template
 * @param {String} currentColor - current color
 * @param {Array<String>} colors - supported colors list
 * @return {String} - template
 */
const createColors = (currentColor, colors) => colors
  .map((color) => `<input
                    type="radio"
                    id="color-${color}-1"
                    class="card__color-input card__color-input--${color} visually-hidden"
                    name="color"
                    value="${color}"
                    ${currentColor === color ? `checked` : ``}
                  />
                  <label
                    for="color-${color}-1"
                    class="card__color card__color--${color}"
                    >${color}</label
                  >`)
  .join(``);

export {createColors};

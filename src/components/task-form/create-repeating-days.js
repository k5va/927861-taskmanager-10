/**
 * Creates repeating days html template
 * @param {*} repeatingDays - repeating days object
 * @return {String} - template
 */
const createRepeatingDays = (repeatingDays) => Object.keys(repeatingDays)
  .map((day) => `<input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-${day}-1"
                    name="repeat"
                    value="${day}"
                    ${repeatingDays[day] ? `checked` : ``}
                  />
                  <label class="card__repeat-day" for="repeat-${day}-1">${day}</label>`)
  .join(``);

export {createRepeatingDays};

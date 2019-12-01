import {formatDate, formatTime, isDateExpired, hasSomeBoolean} from "../utils/utils";
import {Colors} from "../const";

/**
 * Creates hashtags list HTML template
 * @param {Set} tags - set of tags
 * @return {String} HTML template
 */
const createHashTagsTemplate = (tags) => [...tags]
  .map((tag) => `<span class="card__hashtag-inner">
                  <input
                    type="hidden"
                    name="hashtag"
                    value="${tag}"
                    class="card__hashtag-hidden-input"
                  />
                  <p class="card__hashtag-name">#${tag}</p>
                  <button type="button" class="card__hashtag-delete">
                    delete
                  </button>
                </span>`)
  .join(``);

/**
 * Creates repeating days html template
 * @param {*} repeatingDays - repeating days object
 * @return {String} - template
 */
const createRepeatingDaysTemplate = (repeatingDays) => Object.keys(repeatingDays)
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

/**
 * Creates colors list html template
 * @param {String} currentColor - current color
 * @param {Array<String>} colors - supported colors list
 * @return {String} - template
 */
const createColorsTemplate = (currentColor, colors) => colors
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

/**
 * Creates Add/Edit task form template
 * @param {*} task - task object
 * @return {String} template
 */
export const createTaskFormTemplate = (task) => {
  const {description, tags, dueDate, color, repeatingDays} = task;

  const deadlineClass = isDateExpired(dueDate) ? `card--deadline` : ``;

  const isDateShowing = !!dueDate;
  const date = isDateShowing ? formatDate(dueDate) : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  const isRepeated = hasSomeBoolean(repeatingDays);
  const repeatClass = isRepeated ? `card--repeat` : ``;

  const hashtagsMarkup = createHashTagsTemplate(tags);
  const repeatingDaysMarkup = createRepeatingDaysTemplate(repeatingDays);

  const colorsMarkup = createColorsTemplate(color, Colors);

  return `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
<form class="card__form" method="get">
  <div class="card__inner">
    <div class="card__color-bar">
      <svg width="100%" height="10">
        <use xlink:href="#wave"></use>
      </svg>
    </div>

    <div class="card__textarea-wrap">
      <label>
        <textarea
          class="card__text"
          placeholder="Start typing your text here..."
          name="text"
        >${description}</textarea>
      </label>
    </div>

    <div class="card__settings">
      <div class="card__details">
        <div class="card__dates">
          <button class="card__date-deadline-toggle" type="button">
            date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
          </button>
        ${isDateShowing ? `
          <fieldset class="card__date-deadline">
            <label class="card__input-deadline-wrap">
              <input
                class="card__date"
                type="text"
                placeholder="23 September"
                name="date"
                value="${date} ${time}"
              />
            </label>
          </fieldset>` : ``}

          <button class="card__repeat-toggle" type="button">
            repeat:<span class="card__repeat-status">${isRepeated ? `yes` : `no`}</span>
          </button>

          ${isRepeated ? `
          <fieldset class="card__repeat-days">
            <div class="card__repeat-days-inner">${repeatingDaysMarkup}</div>
          </fieldset>`
    : ``}

        </div>

        <div class="card__hashtag">
          <div class="card__hashtag-list">${hashtagsMarkup}</div>

          <label>
            <input
              type="text"
              class="card__hashtag-input"
              name="hashtag-input"
              placeholder="Type new hashtag here"
            />
          </label>
        </div>
      </div>

      <div class="card__colors-inner">
        <h3 class="card__colors-title">Color</h3>
        <div class="card__colors-wrap">${colorsMarkup}</div>
      </div>
    </div>

    <div class="card__status-btns">
      <button class="card__save" type="submit">save</button>
      <button class="card__delete" type="button">delete</button>
    </div>
  </div>
</form>
</article>`;
};

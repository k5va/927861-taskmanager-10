import {createHashTags} from "./create-hashtags";
import {createRepeatingDays} from "./create-repeating-days";
import {createColors} from "./create-colors";
import {formatDate, formatTime, isDateExpired, hasSomeBoolean, encode} from "../../utils";
import {Color} from "../../consts";

/**
 * Creates Add/Edit task form template
 * @param {*} task - task object
 * @param {Object} options - rendering options
 * @return {String} template
 */
const template = (task, options = {}) => {
  const {tags, dueDate, color} = task;
  const {isDateShowing, isRepeatingTask, activeRepeatingDays,
    currentDescription, externalData} = options;

  const description = encode(currentDescription);

  const deadlineClass = isDateExpired(dueDate) ? `card--deadline` : ``;
  const isBlockSaveButton = (isDateShowing && isRepeatingTask) ||
    (isRepeatingTask && !hasSomeBoolean(activeRepeatingDays));

  const date = (isDateShowing && dueDate) ? formatDate(dueDate) : ``;
  const time = (isDateShowing && dueDate) ? formatTime(dueDate) : ``;

  const repeatClass = isRepeatingTask ? `card--repeat` : ``;

  const hashtagsMarkup = createHashTags(tags);
  const repeatingDaysMarkup = createRepeatingDays(activeRepeatingDays);
  const colorsMarkup = createColors(color, Object.values(Color));

  const saveButtonText = externalData.SAVE_TEXT;
  const deleteButtonText = externalData.DELETE_TEXT;

  return (
    `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
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
                minlength="1"
                maxlength="140"
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
                      placeholder=""
                      name="date"
                      value="${date} ${time}"
                    />
                  </label>
                </fieldset>` : ``}

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeatingTask ? `yes` : `no`}</span>
                </button>

                ${isRepeatingTask ? `
                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">${repeatingDaysMarkup}</div>
                </fieldset>` : ``}

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
            <button class="card__save" type="submit" ${isBlockSaveButton ? `disabled` : ``}>${saveButtonText}</button>
            <button class="card__delete" type="button">${deleteButtonText}</button>
          </div>
        </div>
      </form>
    </article>`);
};

export {template};

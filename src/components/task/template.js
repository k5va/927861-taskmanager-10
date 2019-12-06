import {createHashTags} from "./create-hashtags";
import {formatDate, formatTime, isDateExpired, hasSomeBoolean} from "../../utils";

/**
 * Creates task html template
 * @param {*} task - task object
 * @return {String} template
 */
const template = (task) => {
  const {description, tags, dueDate, color, repeatingDays} = task;

  const deadlineClass = isDateExpired(dueDate) ? `card--deadline` : ``;

  const isDateShowing = !!dueDate;
  const date = isDateShowing ? formatDate(dueDate) : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  const repeatClass = hasSomeBoolean(repeatingDays) ? `card--repeat` : ``;

  const hashtags = createHashTags(tags);

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites card__btn--disabled"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                    <span class="card__time">${time}</span>
                  </p>
                </div>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">${hashtags}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`);
};

export {template};

/**
 * Creates hashtags list HTML template
 * @param {Set} tags - set of tags
 * @return {String} HTML template
 */
const createHashTags = (tags) => [...tags]
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

export {createHashTags};

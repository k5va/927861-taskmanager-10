/**
 * Creates hashtags list HTML template
 * @param {Set} tags - set of tags
 * @return {String} HTML template
 */
const createHashTags = (tags) => [...tags]
  .map((tag) => `<span class="card__hashtag-inner"><span class="card__hashtag-name">#${tag}</span></span>`)
  .join(``);


export {createHashTags};

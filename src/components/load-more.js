import Component from "./component";

/**
 * Creates load more button template
 * @return {String} template
 */
const createLoadMoreTemplate = () => {
  return `<button class="load-more" type="button">load more</button>`;
};

export default class LoadMore extends Component {
  constructor() {
    super(createLoadMoreTemplate());
  }
}

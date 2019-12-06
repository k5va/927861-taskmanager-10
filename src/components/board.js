import Component from "./component";

/**
 * Creates board html template
 * @return {String} template
 */
const createBoardTemplate = () => {
  return (
    `<section class="board container">
    </section>`
  );
};

export default class Board extends Component {
  constructor() {
    super(createBoardTemplate());
  }
}

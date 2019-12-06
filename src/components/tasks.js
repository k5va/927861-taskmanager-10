import Component from './component';

const createTasksTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export default class Tasks extends Component {
  constructor() {
    super(createTasksTemplate());
  }
}

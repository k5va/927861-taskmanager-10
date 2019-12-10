import {SortType} from "../../consts";

/**
 * Generates sort component's HTML template
 * @return {String} - template
 */
const template = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" data-sort-type=${SortType.DEFAULT} class="board__filter">SORT BY DEFAULT</a>
      <a href="#" data-sort-type=${SortType.DATE_UP} class="board__filter">SORT BY DATE up</a>
      <a href="#" data-sort-type=${SortType.DATE_DOWN} class="board__filter">SORT BY DATE down</a>
    </div>`
  );
};

export {template};

import {sortBy} from 'lodash';

import {GET_TABLE} from '../actions/getTable';
import {SORT_BY_NAME} from '../actions/sortByName';
import {SORT_BY_SCORE} from '../actions/sortByScore';
import {SEARCH} from '../actions/search';

export default function getTables(state = {}, action) {
  switch (action.type) {
    case GET_TABLE:
      return state = action.payload;
    case SORT_BY_NAME:
      return state = sortBy(state, ['name']);
    case SORT_BY_SCORE:
      return state = sortBy(state, ['score']);
    case SEARCH:
      return state = action.payload;
    default:
      return state;
  }
}


import {combineReducers} from 'redux';

import getTables from './getTables';
import runtime from './runtime';

export default combineReducers({
  runtime,
  getTables,
});

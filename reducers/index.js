import { combineReducers } from 'redux';
import songs from './songs';
import search from './search';

const rootReducer = combineReducers({
  songs,
  search,
});

export default rootReducer;

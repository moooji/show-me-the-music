import { combineReducers } from 'redux';
import songs from './songs';
import albums from './albums';
import search from './search';

const rootReducer = combineReducers({
  songs,
  albums,
  search,
});

export default rootReducer;

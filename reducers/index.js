import { combineReducers } from 'redux';
import tracks from './tracks';
import albums from './albums';
import search from './search';

const rootReducer = combineReducers({
  tracks,
  albums,
  search,
});

export default rootReducer;

import {
  RECEIVE_TRACK,
  REQUEST_TRACK,
} from '../actions/tracks';

function tracks(state = {}, action) {
  switch (action.type) {
    case REQUEST_TRACK: {
      return state;
    }

    case RECEIVE_TRACK: {
      const items = Object.assign({}, state.items, { [action.uri]: action.data });
      return Object.assign({}, state, items);
    }

    default:
      return state;
  }
}

export default tracks;

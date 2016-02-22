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
      return Object.assign({}, state.items, {
        [action.id]: action.data,
      });
    }

    default:
      return state;
  }
}

export default tracks;

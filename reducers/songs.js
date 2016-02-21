import {
  RECEIVE_SONG,
  REQUEST_SONG,
} from '../actions/songs';

function songs(state = {}, action) {
  switch (action.type) {
    case REQUEST_SONG: {
      return state;
    }

    case RECEIVE_SONG: {
      return Object.assign({}, state.items, {
        [action.id]: action.data,
      });
    }

    default:
      return state;
  }
}

export default songs;

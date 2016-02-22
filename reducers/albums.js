import {
  RECEIVE_ALBUM,
  REQUEST_ALBUM,
} from '../actions/albums';

function albums(state = {}, action) {
  switch (action.type) {
    case REQUEST_ALBUM: {
      return state;
    }

    case RECEIVE_ALBUM: {
      return Object.assign({}, state.items, {
        [action.uri]: action.data,
      });
    }

    default:
      return state;
  }
}

export default albums;

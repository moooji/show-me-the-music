import {
  UPDATE_TRACK,
  RECEIVE_TRACK,
  REQUEST_TRACK,
} from '../actions/tracks';

function tracks(state = {
  items: {},
}, action) {
  switch (action.type) {
    case REQUEST_TRACK: {
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    }

    case RECEIVE_TRACK: {
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: action.receivedAt,
      });
    }

    case UPDATE_TRACK: {
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    }

    default:
      return state;
  }
}

export default tracks;

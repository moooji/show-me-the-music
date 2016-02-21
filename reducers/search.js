import {
  RECEIVE_SEARCH,
  REQUEST_SEARCH,
} from '../actions/search';

function search(state = {
  text: null,
  tracks: [],
}, action) {
  switch (action.type) {
    case REQUEST_SEARCH: {
      return state;
    }

    case RECEIVE_SEARCH: {
      return Object.assign({}, state, {
        text: action.text,
        tracks: action.data.tracks,
      });
    }

    default:
      return state;
  }
}

export default search;

import {
  RECEIVE_SEARCH,
  REQUEST_SEARCH,
} from '../actions/search';

function search(state = {
  text: null,
  tracks: [],
  isLoading: false,
}, action) {
  switch (action.type) {
    case REQUEST_SEARCH: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case RECEIVE_SEARCH: {
      return Object.assign({}, state, {
        text: action.text,
        tracks: action.data.tracks,
        isLoading: false,
      });
    }

    default:
      return state;
  }
}

export default search;

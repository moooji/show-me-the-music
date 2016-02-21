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
      const newState = {
        text: action.text,
        isLoading: false,
      };

      if (action.data.tracks.length) {
        newState.tracks = action.data.tracks;
      }

      return Object.assign({}, state, newState);
    }

    default:
      return state;
  }
}

export default search;

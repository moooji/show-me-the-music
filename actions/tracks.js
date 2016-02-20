import echonest from '../lib/echonest.js';

export const UPDATE_TRACK = 'UPDATE_TRACK';
export const REQUEST_TRACK = 'REQUEST_TRACK';
export const RECEIVE_TRACK = 'RECEIVE_TRACK';

export function updateTrack(json) {
  return {
    type: UPDATE_TRACK,
    item: json,
    receivedAt: Date.now(),
  };
}

function requestTrack() {
  return {
    type: REQUEST_TRACK,
  };
}

function receiveTrack(json) {
  return {
    type: RECEIVE_TRACK,
    items: json,
    receivedAt: Date.now(),
  };
}

function fetchTrack() {
  return dispatch => {
    dispatch(requestTrack());

    return vendo.getScreen()
      .then(json => dispatch(receiveScreen(json)))
      .catch(err => {
        throw err;
      });
  };
}

function shouldFetchScreen(state) {
  const screen = state.screen;

  if (!screen) {
    return true;
  }

  if (screen.isFetching) {
    return false;
  }

  return screen.didInvalidate;
}

export function fetchScreenIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchScreen(getState())) {
      return dispatch(fetchScreen());
    }
  };
}

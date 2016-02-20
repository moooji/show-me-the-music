import echonest from '../lib/echonest.js';

export const UPDATE_TRACK = 'UPDATE_TRACK';
export const REQUEST_TRACK = 'REQUEST_TRACK';
export const RECEIVE_TRACK = 'RECEIVE_TRACK';

function updateTrack(json) {
  return {
    type: UPDATE_TRACK,
    data: json,
  };
}

function requestTrack(id) {
  return {
    type: REQUEST_TRACK,
    id,
  };
}

function receiveTrack(json) {
  return {
    type: RECEIVE_TRACK,
    data: json,
  };
}

export function fetchTrack(id) {
  return dispatch => {
    dispatch(requestTrack(id));

    return echonest.getTrack(id)
      .then(json => dispatch(receiveTrack(json)))
      .catch(err => {
        throw err;
      });
  };
}

import { getTrack } from '../lib/api';

export const REQUEST_TRACK = 'REQUEST_TRACK';
export const RECEIVE_TRACK = 'RECEIVE_TRACK';

function requestTrack(id) {
  return {
    type: REQUEST_TRACK,
    id,
  };
}

function receiveTrack(id, json) {
  return {
    type: RECEIVE_TRACK,
    data: json,
    id,
  };
}

export function fetchTrack(id) {
  return dispatch => {
    dispatch(requestTrack(id));

    return getTrack(id)
      .then(json => dispatch(receiveTrack(id, json)))
      .catch(err => {
        throw err;
      });
  };
}

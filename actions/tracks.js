import { getTrack } from '../lib/api';

export const REQUEST_TRACK = 'REQUEST_TRACK';
export const RECEIVE_TRACK = 'RECEIVE_TRACK';

function requestTrack(uri) {
  return {
    type: REQUEST_TRACK,
    uri,
  };
}

function receiveTrack(uri, json) {
  return {
    type: RECEIVE_TRACK,
    data: json,
    uri,
  };
}

export function fetchTrack(uri) {
  return dispatch => {
    dispatch(requestTrack(uri));

    return getTrack(uri)
      .then(json => dispatch(receiveTrack(uri, json)))
      .catch(err => {
        throw err;
      });
  };
}

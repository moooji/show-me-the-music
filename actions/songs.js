import api from '../lib/api.js';

export const UPDATE_SONG = 'UPDATE_SONG';
export const REQUEST_SONG = 'REQUEST_SONG';
export const RECEIVE_SONG = 'RECEIVE_SONG';

function updateSong(json) {
  return {
    type: UPDATE_SONG,
    data: json,
  };
}

function requestSong(id) {
  return {
    type: REQUEST_SONG,
    id,
  };
}

function receiveSong(json) {
  return {
    type: RECEIVE_SONG,
    data: json,
  };
}

export function fetchSong(id) {
  return dispatch => {
    dispatch(requestSong(id));

    return api.getSong(id)
      .then(json => dispatch(receiveSong(json)))
      .catch(err => {
        throw err;
      });
  };
}

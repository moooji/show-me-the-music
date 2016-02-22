import { getAlbum } from '../lib/spotify';

export const REQUEST_ALBUM = 'REQUEST_ALBUM';
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';

function requestAlbum(id) {
  return {
    type: REQUEST_ALBUM,
    id,
  };
}

function receiveAlbum(id, json) {
  return {
    type: RECEIVE_ALBUM,
    data: json,
    id,
  };
}

export function fetchAlbum(id) {
  return dispatch => {
    dispatch(requestAlbum(id));

    return getAlbum(id)
      .then(json => dispatch(receiveAlbum(id, json)))
      .catch(err => {
        throw err;
      });
  };
}

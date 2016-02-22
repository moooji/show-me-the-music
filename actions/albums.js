import { getAlbum } from '../lib/spotify';

export const REQUEST_ALBUM = 'REQUEST_ALBUM';
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';

function requestAlbum(uri) {
  return {
    type: REQUEST_ALBUM,
    uri,
  };
}

function receiveAlbum(uri, json) {
  return {
    type: RECEIVE_ALBUM,
    data: json,
    uri,
  };
}

export function fetchAlbum(uri) {
  return dispatch => {
    dispatch(requestAlbum(uri));

    return getAlbum(uri)
      .then(json => dispatch(receiveAlbum(uri, json)))
      .catch(err => {
        throw err;
      });
  };
}

import { search } from '../lib/api.js';

export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';

function requestSearch(text) {
  return {
    type: REQUEST_SEARCH,
    text,
  };
}

function receiveSearch(text, json) {
  return {
    type: RECEIVE_SEARCH,
    data: json,
    text,
  };
}

export function fetchSearch(text) {
  return dispatch => {
    dispatch(requestSearch(text));

    return search(text)
      .then(json => dispatch(receiveSearch(text, json)))
      .catch(err => {
        throw err;
      });
  };
}

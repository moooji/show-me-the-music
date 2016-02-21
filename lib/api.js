'use strict';

const axios = require('axios');
const devURL = 'http://localhost:3000/api';
const prodURL = 'http://169.44.56.252/api';
const baseURL = process.env.NODE_ENV === 'production' ? prodURL : devURL;

export function getSong(id) {
  return request('get', `songs/${id}`, null);
}

export function search(text) {
  return request('get', `search?text=${text}`, null);
}

/**
 * Performs API request
 *
 * @param {string} baseURL - API base URL
 * @param {string} method - HTTP method
 * @param {string} route - API route for action
 * @param {object} data - JSON data
 * @returns {Promise<object>} body - Promise returning JSON response body
 * @private
 */

function request(method, route, data) {
  const url = route;
  const headers = {};

  return axios({ baseURL, url, method, data, headers })
    .then(response => response.data);
}

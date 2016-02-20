'use strict';

const axios = require('axios');

function getTrack(token) {
  const baseURL = 'https://api.echonest.net';
  return request(baseURL, 'get', 'screen', null, token);
}

/**
 * Performs API request
 *
 * @param {string} baseURL - API base URL
 * @param {string} method - HTTP method
 * @param {string} route - API route for action
 * @param {object} data - JSON data
 * @param {string} [token] - Authorization token
 * @returns {Promise<object>} body - Promise returning JSON response body
 * @private
 */

function request(baseURL, method, route, data, token) {
  const url = route;
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios({ baseURL, url, method, data, headers })
    .then(response => response.data);
}

module.exports.getTrack = getTrack;

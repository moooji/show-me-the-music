'use strict';

const axios = require('axios');

// const apiKey = process.env.SPOTIFY_API_KEY;
const baseURL = 'https://api.spotify.com/v1/';

function search(query) {
  const options = {
    baseURL,
    url: '/search',
    params: {
      q: query,
      type: 'track',
    },
  };

  return axios(options)
    .then((res) => {
      const tracks = res.data.tracks.items.map((track) => {
        const artists = track.artists.map((artist) => artist.name).join(', ');

        return {
          title: track.name,
          album: track.album.name,
          image: track.album.images.pop(),
          uri: track.uri,
          artists,
        };
      });
      return { tracks };
    });
}

module.exports.search = search;

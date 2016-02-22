'use strict';

const axios = require('axios');
const baseURL = 'https://api.spotify.com/v1/';

export function search(query) {
  const options = {
    baseURL,
    url: '/search',
    params: {
      q: query,
      type: 'track',
      limit: 1,
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

export function getAlbum(id) {
  const options = {
    baseURL,
    url: `/albums/${id}`,
  };

  return axios(options)
    .then((res) => {
      const name = res.data.name;
      const artists = res.data.artists.map((artist) => artist.name).join(', ');
      const tracks = res.data.tracks.items.map((track) => track.uri);
      return { name, artists, tracks };
    });
}

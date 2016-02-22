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
      const tracks = processTracks(res);
      return { tracks };
    });
}

export function getAlbum(uri) {
  const id = uri.replace('spotify:album:', '');
  const options = {
    baseURL,
    url: `/albums/${id}`,
  };

  return axios(options)
    .then((res) => {
      const name = res.data.name;
      const artists = res.data.artists.map((artist) => artist.name).join(', ');
      const trackUris = res.data.tracks.items.map((track) => track.uri);
      return { name, artists, trackUris };
    });
}

function processTracks(res) {
  return res.data.tracks.items.map((track) => {
    const artists = track.artists.map((artist) => artist.name).join(', ');

    return {
      title: track.name,
      album: track.album.name,
      image: track.album.images.pop(),
      uri: track.uri,
      artists,
    };
  });
}

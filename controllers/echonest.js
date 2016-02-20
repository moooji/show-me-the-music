'use strict';

const axios = require('axios');
const qs = require('qs');

const apiKey = process.env.ECHONEST_API_KEY;
const baseURL = 'http://developer.echonest.com/api/v4/';

function getTrack(id) {
  const options = {
    baseURL,
    url: '/track',
    params: {
      api_key: apiKey,
      trackId: id,
    },
  };

  return axios(options);
}

function searchSong(title, artist) {
  const options = {
    baseURL,
    method: 'get',
    url: '/song/search',
    params: {
      title,
      artist,
      api_key: apiKey,
      bucket: ['audio_summary', 'tracks', 'id:spotify'],
      results: 1,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  };

  return axios(options);
}

function profileSong(id) {
  const options = {
    baseURL,
    method: 'get',
    url: '/song/profile',
    params: {
      track_id: id,
      api_key: apiKey,
      bucket: ['audio_summary', 'id:spotify'],
      results: 1,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  };

  return axios(options)
    .then((res) => res.data.response);
}

function getSongAnalysis(id) {
  return profileSong(id)
    .then((data) => {
      const song = data.songs[0];
      const analysisUrl = song.audio_summary.analysis_url;

      return axios.get(analysisUrl)
        .then(res => {
          return {
            title: song.title,
            artist: song.artist_name,
            key: song.audio_summary.key,
            energy: song.audio_summary.energy,
            liveness: song.audio_summary.liveness,
            tempo: song.audio_summary.tempo,
            speechiness: song.audio_summary.speechiness,
            instrumentalness: song.audio_summary.instrumentalness,
            acousticness: song.audio_summary.acousticness,
            loudness: song.audio_summary.loudness,
            duration: song.audio_summary.duration,
            danceability: song.audio_summary.danceability,
            valence: song.audio_summary.valence,
            sections: res.data.sections,
          };
        });
    });
}

module.exports.getSongAnalysis = getSongAnalysis;
module.exports.profileSong = profileSong;
module.exports.getTrack = getTrack;
module.exports.searchSong = searchSong;

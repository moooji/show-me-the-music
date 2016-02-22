'use strict';

const axios = require('axios');
const qs = require('qs');

const apiKey = process.env.ECHONEST_API_KEY;
const baseURL = 'http://developer.echonest.com/api/v4/';

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
    headers: {
      'Accept-Encoding': 'gzip',
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  };

  return axios(options)
    .then((res) => res.data.response);
}

function getSong(id) {
  return profileSong(id)
    .then((data) => {
      console.log(`Got song ${id}`);

      if (!data.songs || !data.songs.length) {
        console.error(`Song [${id}] not found`);
        throw new Error('Song not found', 404);
      }

      const song = data.songs.shift();
      const analysisUrl = song.audio_summary.analysis_url;
      console.log(analysisUrl);

      const options = {
        url: analysisUrl,
        headers: { 'Accept-Encoding': 'gzip' },
      };

      return axios(options)
        .then(res => {
          console.log(`Got song analysis ${id}`);
          console.log(res.headers);

          const segments = res.data.segments;

          const sections = res.data.sections.map((section) => {
            const end = section.start + section.duration;
            const numSegments = 0;
            return Object.assign(section, { end, numSegments });
          });

          segments.forEach((segment) => {
            sections.forEach((section, i) => {
              if (segment.start >= section.start && segment.start <= section.end) {
                sections[i].numSegments++;
                return;
              }
            });
          });

          return {
            sections,
            title: song.title,
            artist: song.artist_name,
            key: getKey(song.audio_summary.key, song.audio_summary.mode),
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
            mood: getMood(song.audio_summary.energy, song.audio_summary.valence),
            numTatums: res.data.tatums.length,
            numSegments: res.data.segments.length,
            numBeats: res.data.beats.length,
          };
        });
    });
}

function getKey(key, mode) {
  const major = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const minor = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];
  const label = mode === 1 ? major[key] : minor[key];
  return { label, mode, value: key };
}

function getMood(arousal, valence) {
  const moods = [
    { id: 'excited', label: 'Excited', arousal: 1, valence: 1 },
    { id: 'happy', label: 'Happy', arousal: 0.5, valence: 1 },
    { id: 'angry', label: 'Angry', arousal: 1, valence: 0 },
    { id: 'drowsy', label: 'Drowsy', arousal: 0, valence: 0 },
    { id: 'sad', label: 'Sad', arousal: 0.5, valence: 0 },
    { id: 'melancholic', label: 'Melancholic', arousal: 0, valence: 0 },
    { id: 'relaxed', label: 'Relaxed', arousal: 0, valence: 0.5 },
  ];

  const sorted = moods.sort((moodA, moodB) => {
    const distA = moodDistance(arousal, valence, moodA.arousal, moodA.valence);
    const distB = moodDistance(arousal, valence, moodB.arousal, moodB.valence);

    if (distA > distB) {
      return 1;
    }

    if (distA < distB) {
      return -1;
    }

    return 0;
  });

  const mood = sorted.shift();
  const intensity = roundDigits(moodDistance(arousal, valence, 0.5, 0.5), 5);
  return Object.assign({}, mood, { intensity });
}

function moodDistance(arousalA, valenceA, arousalB, valenceB) {
  const arousalDelta = arousalA - arousalB;
  const valenceDelta = valenceA - valenceB;

  return Math.sqrt(Math.pow(arousalDelta, 2) + Math.pow(valenceDelta, 2));
}

function roundDigits(value, digits) {
  const factor = Math.pow(10, digits);
  return Math.round(value * factor) / factor;
}

module.exports.getSong = getSong;
module.exports.profileSong = profileSong;

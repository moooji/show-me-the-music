'use strict';

const echonest = require('./echonest');

function getSong(req, res) {
  const songId = req.params.id;
  echonest.getSongAnalysis(songId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(err.status).json({ error: err.statusText });
    });
}

module.exports.getSong = getSong;

'use strict';

const echonest = require('./echonest');

function get(req, res) {
  const songId = req.params.id;

  echonest.getSong(songId)
    .then((data) => res.json(data))
    .catch((err) => {
      console.error(err);
      res.status(err.status).json({ error: err.statusText });
    });
}

module.exports.get = get;

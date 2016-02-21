'use strict';

const spotify = require('./spotify');

function get(req, res) {
  const query = req.query.text;
  spotify.search(query, 1)
    .then((data) => res.json(data))
    .catch((err) => {
      console.error(err);
      res.status(err.status).json({ error: err.statusText });
    });
}

module.exports.get = get;

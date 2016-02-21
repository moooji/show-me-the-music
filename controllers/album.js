'use strict';

const spotify = require('./spotify');
const echonest = require('./echonest');

function get(req, res) {
  const id = req.params.id;

  spotify.getAlbum(id)
    .then((data) => {
      res.json(data);
      /*
      const requests = data.tracks.map((songId) => {
        // Fetch song analysis
        // Skip song if it cannot be found in echonest (catch)
        return echonest.getSong(songId)
          .catch((err) => {
            console.error(err);
            return null;
          });
      });

      return Promise.all(requests)
        .then((analysedSongs) => {
          res.json(analysedSongs);
        });
        */
    })
    .catch((err) => {
      console.error(err);
      res.status(err.status).json({ error: err.statusText });
    });
}

module.exports.get = get;

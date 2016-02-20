'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import SongSections from '../components/SongSections';
import { fetchSong } from '../actions/songs';
import { keyToString, moodToString } from '../lib/utils';

const Song = React.createClass({
  propTypes: {
    track: React.PropTypes.object,
  },
  mixins: [PureRenderMixin],
  componentWillMount() {
    const songId = this.props.songId;
    this.props.dispatch(fetchSong(songId));
  },

  componentWillReceiveProps(nextProps) {
    const songId = this.props.songId;
    if (nextProps.songId !== songId) {
      this.props.dispatch(fetchSong(nextProps.songId));
    }
  },

  render() {
    const { song } = this.props;

    return (
      <section className="track-container">
        <h2>{song.title}</h2>
        <h3>{song.artist}</h3>
        <ul className="song-properties">
          <li>{moodToString(song.energy, song.valence)}</li>
          <li>{keyToString(song.key, song.mode)}</li>
          <li>E: {song.energy}</li>
          <li>V: {song.valence}</li>
          <li>L: {song.liveness}</li>
          <li>D: {song.danceability}</li>
          <li>T: {song.numTatums}</li>
          <li>S: {song.numSegments}</li>
          <li>B: {song.numBeats}</li>
        </ul>
        <SongSections items={song.sections}/>
      </section>
    );
  },
});

function mapStateToProps(state, props) {
  const songId = props.params.songId;
  const song = state.songs[songId] || {};

  return {
    songId,
    song,
  };
}

export default connect(mapStateToProps)(Song);

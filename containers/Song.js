'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import SongSections from '../components/SongSections';
import SongVisualizer from '../components/SongVisualizer';
import { fetchSong } from '../actions/songs';
import { keyToString, moodToString, roundDigits } from '../lib/utils';

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
      <div>
        <header>
          <Link to="/"><h1>{song.title}<br/>{song.artist}</h1></Link>
        </header>
        <section className="track-container">
          <h2>{moodToString(song.energy, song.valence)}</h2>
          <h3>{Math.round(song.tempo)}</h3>
          <ul className="song-properties">
            <li>{keyToString(song.key, song.mode)}</li>
            <li>E: {roundDigits(song.energy, 2)}</li>
            <li>V: {roundDigits(song.valence, 2)}</li>
            <li>L: {roundDigits(-1 / song.loudness, 2)}</li>
            <li>D: {roundDigits(song.danceability, 2)}</li>
            <li>S: {song.numSegments}</li>
            <li>B: {song.numBeats}</li>
            <li>SD: {roundDigits(song.numSegments / song.duration, 2)}</li>
          </ul>
          <SongSections items={song.sections}/>
        </section>
        <SongVisualizer width={1024} height={512} data={[1, 2, 3]}/>
      </div>
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

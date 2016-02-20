'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { fetchSong } from '../actions/songs';

const Song = React.createClass({
  propTypes: {
    track: React.PropTypes.object,
  },
  mixins: [PureRenderMixin],
  componentWillMount() {
    const songId = this.props.songId;
    this.props.dispatch(fetchSong(songId));
  },

  render() {
    const { song } = this.props;

    return (
      <section className="track-container">
        <h1>{song.title}</h1>
        <h2>{song.artist}</h2>
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

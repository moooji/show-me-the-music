'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

const Song = React.createClass({
  propTypes: {
    track: React.PropTypes.object,
  },
  mixins: [PureRenderMixin],

  render() {
    const { song } = this.props;

    return (
      <section className="track-container">
        <h1>{song.name || 'No song'}</h1>
      </section>
    );
  },
});

function mapStateToProps(state, props) {
  console.log(props);
  const songId = '';
  const song = state.songs.items[songId] || {};

  return {
    song,
  };
}

export default connect(mapStateToProps)(Song);

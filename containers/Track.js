'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

const Track = React.createClass({
  propTypes: {
    track: React.PropTypes.object,
  },
  mixins: [PureRenderMixin],

  render() {
    const { track } = this.props;

    return (
      <section className="track-container">
        <h1>{track.name || 'No track'}</h1>
      </section>
    );
  },
});

function mapStateToProps(state, props) {
  console.log(props);
  const trackId = '';
  const track = state.tracks.items[trackId] || {};

  return {
    track,
  };
}

export default connect(mapStateToProps)(Track);

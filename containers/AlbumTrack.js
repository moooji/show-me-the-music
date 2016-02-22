'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TrackSections from '../components/TrackSections';
import LoadingIndicator from '../components/LoadingIndicator';
import { fetchTrack } from '../actions/tracks';
import { roundDigits } from '../lib/utils';

const AlbumTrack = React.createClass({
  propTypes: {
    uri: React.PropTypes.string.isRequired,
    track: React.PropTypes.object,
  },
  mixins: [PureRenderMixin],
  componentWillMount() {
    const uri = this.props.uri;
    this.props.dispatch(fetchTrack(uri));
  },

  componentWillReceiveProps(nextProps) {
    const uri = this.props.uri;
    if (nextProps.uri !== uri) {
      this.props.dispatch(fetchTrack(nextProps.uri));
    }
  },

  renderTrack(track) {
    if (!track) {
      return (null);
    }

    return (
      <section className="track-container">
        <h2>{track.name}</h2>
        <h3>{track.mood.label}: {roundDigits(track.mood.intensity, 2)}</h3>
        <div className="track-properties">
          <div className="track-property">{track.key.label}</div>
          <div className="track-property">E:{roundDigits(track.energy, 2)}</div>
          <div className="track-property">V:{roundDigits(track.valence, 2)}</div>
          <div className="track-property">L:{roundDigits(-1 / track.loudness, 2)}</div>
          <div className="track-property">D:{roundDigits(track.danceability, 2)}</div>
          <div className="track-property">SD:{roundDigits(track.numSegments / track.duration, 2)}</div>
          <div className="track-property">T:{roundDigits(track.tempo, 2)}</div>
        </div>
        <TrackSections items={track.sections}/>
      </section>
    );
  },

  render() {
    const { track } = this.props;
    const isLoading = !track;

    return (
      <div>
        <LoadingIndicator isLoading={isLoading}/>
        {this.renderTrack(track)}
      </div>
    );
  },
});

function mapStateToProps(state, props) {
  const uri = props.uri;
  const track = state.tracks[uri] || null;

  return { track };
}

export default connect(mapStateToProps)(AlbumTrack);

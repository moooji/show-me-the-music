'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TrackSections from '../components/TrackSections';
import TrackVisualizer from '../components/TrackVisualizer';
import LoadingIndicator from '../components/LoadingIndicator';
import { fetchTrack } from '../actions/tracks';
import { roundDigits, toPercentage } from '../lib/utils';

const Track = React.createClass({
  propTypes: {
    track: React.PropTypes.object,
  },
  mixins: [PureRenderMixin],
  componentWillMount() {
    const trackUri = this.props.trackUri;
    this.props.dispatch(fetchTrack(trackUri));
  },

  componentWillReceiveProps(nextProps) {
    const trackUri = this.props.trackUri;
    if (nextProps.trackUri !== trackUri) {
      this.props.dispatch(fetchTrack(nextProps.trackUri));
    }
  },

  renderTrack(track) {
    if (!track) {
      return (null);
    }

    return (
      <div>
        <header>
          <Link to="/"><h1>{track.name}<br/>{track.artists}</h1></Link>
        </header>
        <section className="track-container">
          <h2>{track.mood.label} {toPercentage(track.mood.intensity, 0)} %</h2>
          <div className="track-properties">
            <div className="track-property">Energy: {toPercentage(track.energy, 0)}%</div>
            <div className="track-property">Loudness: {toPercentage(-1 / track.loudness, 0)}%</div>
            <div className="track-property">Danceability: {toPercentage(track.danceability, 0)}%</div>
            <div className="track-property">Complexity: {roundDigits(track.numSegments / track.duration, 2)}</div>
            <div className="track-property">Tempo: {roundDigits(track.tempo, 0)} BPM</div>
          </div>
          <TrackSections items={track.sections}/>
        </section>
      </div>
    );
  },

  render() {
    const { track } = this.props;
    const isLoading = !track;

    return (
      <div>
        <div className="track-loading-indicator">
          <LoadingIndicator isLoading={isLoading}/>
        </div>
        {this.renderTrack(track)}
        <TrackVisualizer width={2048} height={1024} data={track}/>
        <Link to="/"><button>Try again</button></Link>
      </div>
    );
  },
});

function mapStateToProps(state, props) {
  const trackUri = props.params.trackUri;
  const track = state.tracks[trackUri] || null;

  return {
    trackUri,
    track,
  };
}

export default connect(mapStateToProps)(Track);

'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TrackSections from '../components/TrackSections';
import TrackVisualizer from '../components/TrackVisualizer';
import { fetchTrack } from '../actions/tracks';
import { roundDigits } from '../lib/utils';

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

  render() {
    const { track } = this.props;

    if (!track) {
      return (null);
    }

    return (
      <div>
        <header>
          <Link to="/"><h1>{track.name}<br/>{track.artists}</h1></Link>
        </header>
        <section className="track-container">
          <h2>{track.mood.label}</h2>
          <h3>{roundDigits(track.mood.intensity, 2)}</h3>
          <ul className="track-properties">
            <li>{track.key.label}</li>
            <li>E: {roundDigits(track.energy, 2)}</li>
            <li>V: {roundDigits(track.valence, 2)}</li>
            <li>L: {roundDigits(-1 / track.loudness, 2)}</li>
            <li>D: {roundDigits(track.danceability, 2)}</li>
            <li>S: {track.numSegments}</li>
            <li>B: {track.numBeats}</li>
            <li>SD: {roundDigits(track.numSegments / track.duration, 2)}</li>
            <li>T: {roundDigits(track.tempo, 2)}</li>
          </ul>
          <TrackSections items={track.sections}/>
        </section>
        <TrackVisualizer width={1024} height={512} data={[1, 2, 3]}/>
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

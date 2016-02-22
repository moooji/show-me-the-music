'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TrackSections from '../components/TrackSections';
import AlbumVisualizer from '../components/AlbumVisualizer';
import { fetchAlbum } from '../actions/albums';
import { roundDigits } from '../lib/utils';

const Album = React.createClass({
  propTypes: {
    track: React.PropTypes.object,
  },
  mixins: [PureRenderMixin],
  componentWillMount() {
    const albumUri = this.props.albumUri;
    this.props.dispatch(fetchAlbum(albumUri));
  },

  componentWillReceiveProps(nextProps) {
    const albumUri = this.props.albumUri;
    if (nextProps.albumUri !== albumUri) {
      this.props.dispatch(fetchAlbum(nextProps.albumUri));
    }
  },

  renderTracks(trackUris) {
    if (!trackUris.length) {
      return (null);
    }

    return trackUris.map((trackUri) => {
      return (<div key={trackUri}>{trackUri}</div>);
    });
  },

  render() {
    const { album, tracks } = this.props;

    if (!album) {
      return (null);
    }

    return (
      <div>
        <header>
          <Link to="/"><h1>{album.name}<br/>{album.artists}</h1></Link>
        </header>
        <section className="track-container">
          <h2>{album.name}</h2>
          <h3>{album.artists}</h3>
        </section>
        {this.renderTracks(album.trackUris)}
        <AlbumVisualizer width={1024} height={512} data={[1, 2, 3]}/>
      </div>
    );
  },
});

function mapStateToProps(state, props) {
  const albumUri = props.params.albumUri;
  const album = state.albums[albumUri];
  let tracks = [];

  if (album && album.trackUris.length) {
    tracks = album.trackUris.map((trackUri) => {
      return state.tracks[trackUri];
    });
  }

  return { albumUri, album, tracks };
}

export default connect(mapStateToProps)(Album);

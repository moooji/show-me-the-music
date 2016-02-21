'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import SongSections from '../components/SongSections';
import AlbumVisualizer from '../components/AlbumVisualizer';
import { fetchAlbum } from '../actions/albums';
import { roundDigits } from '../lib/utils';

const Album = React.createClass({
  propTypes: {
    track: React.PropTypes.object,
  },
  mixins: [PureRenderMixin],
  componentWillMount() {
    const albumId = this.props.albumId;
    this.props.dispatch(fetchAlbum(albumId));
  },

  componentWillReceiveProps(nextProps) {
    const albumId = this.props.albumId;
    if (nextProps.albumId !== albumId) {
      this.props.dispatch(fetchAlbum(nextProps.albumId));
    }
  },

  renderSongs(songs) {
    if (!songs.length) {
      return (null);
    }

    return songs.map((songId) => {
      return (<div>{songId}</div>);
    });
  },

  render() {
    const { album, songs } = this.props;

    if (!album) {
      return (null);
    }

    return (
      <div>
        <header>
          <Link to="/"><h1>{album.title}<br/>{album.artist}</h1></Link>
        </header>
        <section className="track-container">
          <h2>{album.title}</h2>
          <h3>{album.artist}</h3>
        </section>
        {this.renderSongs(album.songs)}
        <AlbumVisualizer width={1024} height={512} data={[1, 2, 3]}/>
      </div>
    );
  },
});

function mapStateToProps(state, props) {
  const albumId = props.params.albumId;
  const album = state.albums[albumId];
  let songs = [];

  if (album && album.songs.length) {
    songs = album.songIds.map((songId) => {
      return state.songs[songId];
    });
  }

  return {
    album,
    songs,
  };
}

export default connect(mapStateToProps)(Album);

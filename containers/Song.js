'use strict';

import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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

  renderBoxes() {
    const size = 1;
    const rotation = new THREE.Euler(10, 0, 0);

    if (!this.props.song.sections) {
      return (null);
    }

    return this.props.song.sections.map((section, i) => {
      const height = -3 / section.loudness;
      const position = new THREE.Vector3(section.start / 15 - 10, 0, 0);
      const width = Math.round(section.duration / 15);
      return (
        <mesh rotation={rotation} position={position} key={i}>
          <boxGeometry
            width={width}
            height={height}
            depth={size}
            />
          <meshLambertMaterial opacity={0.8} transparent={true} color={0xffffff}/>
        </mesh>
      );
    });
  },

  render() {
    const { song } = this.props;
    const cameraPosition = new THREE.Vector3(0, 0, 20);

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
            <li>E: {song.energy}</li>
            <li>V: {song.valence}</li>
            <li>L: {song.liveness}</li>
            <li>D: {song.danceability}</li>
            <li>S: {song.numSegments}</li>
            <li>B: {song.numBeats}</li>
            <li>SD: {song.numSegments / song.duration}</li>
          </ul>
          <SongSections items={song.sections}/>
        </section>
        <React3
          mainCamera="camera"
          width={1080}
          height={400}
          alpha={true}
          antialias={4}
          precision={'highp'}
          premultipliedAlpha={true}>
          <scene>
            <ambientLight castShadow={true}/>
            <perspectiveCamera
              name="camera"
              fov={30}
              aspect={1920 / 1080}
              near={0.1}
              far={100}
              position={cameraPosition}
            />
            {this.renderBoxes()}
          </scene>
        </React3>
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

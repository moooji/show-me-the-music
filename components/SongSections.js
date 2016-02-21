'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { secondsToHms } from '../lib/utils';

const SongSections = React.createClass({
  propTypes: {
    items: React.PropTypes.array,
  },
  mixins: [PureRenderMixin],

  render() {
    if (!this.props.items) {
      return (null);
    }

    const sections = this.props.items.map((section, i) => {
      const style = {
        width: section.duration * 3.5,
        height: -150 / section.loudness,
        opacity: -4 / section.loudness,
      };

      const start = secondsToHms(section.start);
      const segmentRatio = Math.round(section.numSegments / section.duration * 10) / 10;

      return (
        <div className="song-section"key={i}>
          <div className="song-section-bar" style={style}></div>
          <div className="song-section-label">{start}</div>
          <div className="song-section-key">{segmentRatio}</div>
        </div>
      );
    });

    return (
      <div className="song-sections">
        {sections}
      </div>
    );
  },
});

export default SongSections;

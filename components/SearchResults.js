'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router';

const SearchResults = React.createClass({
  propTypes: {
    data: React.PropTypes.object,
  },
  mixins: [PureRenderMixin],

  render() {
    if (!this.props.data.tracks) {
      return (null);
    }

    const results = this.props.data.tracks.map((item) => {
      return (
        <Link to={`/tracks/${item.uri}`} key={item.uri}>
          <img
            src={item.image.url}
            width={item.image.width}
            height={item.image.height}/>
          <div className="search-results-info" style={{ display: 'inline-block' }}>
            <h2>{item.title}</h2>
            <h3>{item.artists}</h3>
          </div>
        </Link>
      );
    });

    return (
      <div className="search-results">
        {results}
      </div>
    );
  },
});

export default SearchResults;

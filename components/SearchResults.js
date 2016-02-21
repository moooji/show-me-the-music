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
        <li key={item.uri}>
          <Link to={`/song/${item.uri}`}>
            <img src={item.image.url} width={item.image.width / 2} height={item.image.height / 2}/>
            {item.artists} - {item.album} - {item.title}
          </Link>
        </li>
      );
    });

    return (
      <ul className="search-results">
        {results}
      </ul>
    );
  },
});

export default SearchResults;

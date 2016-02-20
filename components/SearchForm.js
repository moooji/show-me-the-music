'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import LoadingIndicator from './LoadingIndicator';

const SearchForm = React.createClass({
  propTypes: {
    isLoading: React.PropTypes.bool.isRequired,
    onSearch: React.PropTypes.func.isRequired,
    message: React.PropTypes.string,
  },
  mixins: [PureRenderMixin],

  _search(e) {
    e.preventDefault();
    const query = ReactDOM.findDOMNode(this.refs.query).value.trim();
    this.props.onSearch(query);
  },

  renderForm() {
    if (this.props.isLoading) {
      return (null);
    }

    return (
      <div className="search-form">
        <h3>{this.props.message}</h3>
        <form onSubmit={this._search}>
          <span className="input">
            <input className="input-field" type="text" id="search-input" ref="query"/>
            <label className="input-label" htmlFor="search-input">
              <span className="input-label-content">Enter a song, album or playlist</span>
            </label>
          </span>
          <input type="submit" value="SEARCH"/>
        </form>
      </div>
    );
  },

  render() {
    return (
      <div className="search-container">
        <LoadingIndicator isLoading={this.props.isLoading}/>
        { this.renderForm() }
      </div>
    );
  },
});

export default SearchForm;

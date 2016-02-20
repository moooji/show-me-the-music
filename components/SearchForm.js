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
  getInitialState() {
    return { query: '' };
  },

  _search(e) {
    e.preventDefault();
    const query = ReactDOM.findDOMNode(this.refs.query).value.trim();
    this.props.onSearch(query);
  },

  _onChange(e) {
    const query = e.target.value;
    this.setState({ query });
  },

  renderForm() {
    if (this.props.isLoading) {
      return (null);
    }

    const isFilled = this.state.query.length > 0;
    const inputClass = isFilled ? 'input input-filled' : 'input';

    return (
      <div className="search-form">
        <h3>{this.props.message}</h3>
        <form onSubmit={this._search}>
          <span className={inputClass}>
            <input type="text" id="search-input" ref="query" onChange={this._onChange}/>
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

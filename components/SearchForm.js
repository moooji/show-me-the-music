'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import LoadingIndicator from './LoadingIndicator';

const SearchForm = React.createClass({
  propTypes: {
    isInstant: React.PropTypes.bool.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
    onSearch: React.PropTypes.func.isRequired,
    message: React.PropTypes.string,
  },
  mixins: [PureRenderMixin],
  getInitialState() {
    return { text: '' };
  },

  _onSubmit(e) {
    e.preventDefault();
    this.props.onSearch(this.state.text);
  },

  _onChange(e) {
    const text = e.target.value.trim();
    this.setState({ text });

    if (this.props.isInstant) {
      this.props.onSearch(this.state.text);
    }
  },

  renderForm() {
    if (this.props.isLoading) {
      return (null);
    }

    const isFilled = this.state.text.length > 0;
    const inputClass = isFilled ? 'input input-filled' : 'input';

    return (
      <div className="search-form">
        <h3>{this.props.message}</h3>
        <form onSubmit={this._onSubmit}>
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

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import LoadingIndicator from './LoadingIndicator';
import SearchResults from '../components/SearchResults';

const SearchForm = React.createClass({
  propTypes: {
    data: React.PropTypes.object,
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
    const songId = this.props.data.tracks[0].uri;
    this.props.onSubmit(songId);
  },

  _onChange(e) {
    const text = e.target.value.trim();
    this.setState({ text });

    if (text) {
      this.props.onSearch(text);
    }
  },

  renderSubmit() {
    const { data } = this.props;

    if (!(data.tracks && data.tracks.length)) {
      return (null);
    }

    return(<input type="submit" value="VISUALIZE"/>);
  },

  render() {
    const isFilled = this.state.text.length > 0;
    const inputClass = isFilled ? 'input input-filled' : 'input';

    return (
      <div className="search-container">
        <LoadingIndicator isLoading={this.props.isLoading}/>
        <div className="search-form">
          <h3>{this.props.message}</h3>
          <form onSubmit={this._onSubmit}>
            <span className={inputClass}>
              <input type="text" id="search-input" ref="query" onChange={this._onChange}/>
              <label className="input-label" htmlFor="search-input">
                <span className="input-label-content">Enter a song, album or playlist</span>
              </label>
            </span>
            {this.renderSubmit()}
          </form>
        </div>
        <SearchResults data={this.props.data}/>
      </div>
    );
  },
});

export default SearchForm;

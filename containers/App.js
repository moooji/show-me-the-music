import React from 'react';
import { connect } from 'react-redux';
import DevTools from './DevTools';
import SearchForm from '../components/SearchForm';
import { fetchSong } from '../actions/songs';
import '../css/main.css';

const App = React.createClass({
  propTypes: {
    tracks: React.PropTypes.object,
    children: React.PropTypes.array,
    dispatch: React.PropTypes.func.isRequired,
  },

  _onSearch(query) {
    this.props.dispatch(fetchSong(query));
  },

  render() {
    return (
      <div className="main">
        <header>
          <h1>Show<br/>me the music.</h1>
        </header>
        <SearchForm isLoading={false} onSearch={this._onSearch}/>
        {this.props.children}
        <footer className="footer section">
          <div className="footer-message">Copyright 2016 - Steffen Strätz</div>
          <div className="footer-copyright">
            <h4>moooji.com</h4>
          </div>
        </footer>
        <DevTools/>
      </div>
    );
  },
});

function mapStateToProps(state) {
  const { tracks } = state;
  return { tracks };
}

export default connect(mapStateToProps)(App);

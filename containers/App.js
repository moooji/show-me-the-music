import React from 'react';
import { connect } from 'react-redux';
import DevTools from './DevTools';
import SearchForm from '../components/SearchForm';
import { fetchTrack } from '../actions/tracks';
import '../css/main.css';

const App = React.createClass({
  propTypes: {
    tracks: React.PropTypes.object,
    children: React.PropTypes.array,
    dispatch: React.PropTypes.func.isRequired,
  },

  _onSearch(query) {
    console.log(query);
  },

  render() {
    return (
      <div className="main">
        <header className="navigation">
        </header>
        <SearchForm isLoading={false}/>
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

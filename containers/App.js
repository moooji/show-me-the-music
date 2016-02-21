import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DevTools from './DevTools';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import { fetchSearch } from '../actions/search';
import '../css/main.css';

const App = React.createClass({
  propTypes: {
    search: React.PropTypes.object,
    children: React.PropTypes.object,
    dispatch: React.PropTypes.func.isRequired,
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  _onSearch(text) {
    //const url = `/song/${query}`;
    //this.context.router.push(url);
    this.props.dispatch(fetchSearch(text));
  },

  renderForm() {
    if (this.props.children) {
      return (this.props.children);
    }

    return (
      <div>
        <header>
          <Link to="/"><h1>Show<br/>me the music.</h1></Link>
        </header>
        <SearchForm isLoading={false} onSearch={this._onSearch} isInstant={true}/>
        <SearchResults data={this.props.search}/>
      </div>
    );
  },

  render() {
    return (
      <div className="main">
        {this.renderForm()}
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
  const { search } = state;
  return { search };
}

export default connect(mapStateToProps)(App);

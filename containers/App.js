import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DevTools from './DevTools';
import TimerMixin from 'react-timer-mixin';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SearchForm from '../components/SearchForm';
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
  mixins: [TimerMixin, PureRenderMixin],

  getInitialState() {
    return { timer: null };
  },

  _onSearch(text) {
    if (this.state.timer) {
      this.clearTimeout(this.state.timer);
    }

    if (!this.props.search.isLoading) {
      return this.props.dispatch(fetchSearch(text));
    };

    this.setState({ timer: this.setTimeout(() => this._onSearch(text), 20) });
  },

  _onSubmit(trackId) {
    const url = `/tracks/${trackId}`;
    this.context.router.push(url);
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
        <SearchForm
          isLoading={false}
          onSearch={this._onSearch}
          onSubmit={this._onSubmit}
          data={this.props.search}/>
      </div>
    );
  },

  render() {
    return (
      <div className="main">
        {this.renderForm()}
        <footer className="footer section">
          <div className="footer-message">
            Copyright 2016 - Steffen Strätz<br/>
            Powered by <a href="http://the.echonest.com">The Echo Nest</a><br/><br/>
          </div>
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

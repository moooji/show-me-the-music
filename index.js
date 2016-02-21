import 'babel-polyfill';
import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createHistory } from 'history';

import App from './containers/App';
import Song from './containers/Song';
import Album from './containers/Album';
import configureStore from './store';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="songs/:songId" component={Song}/>
        <Route path="albums/:albumId" component={Album}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

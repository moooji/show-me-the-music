import 'babel-polyfill';
import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createHistory } from 'history';

import App from './containers/App';
import Song from './containers/Song';
import configureStore from './store';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Song}/>
        <Route path="song/:songId" component={Song}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

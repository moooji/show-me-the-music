import 'babel-polyfill';
import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createHistory } from 'history';

import App from './containers/App';
import Track from './containers/Track';
import Album from './containers/Album';
import configureStore from './store';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="tracks/:trackUri" component={Track}/>
        <Route path="albums/:albumUri" component={Album}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

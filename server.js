'use strict';

const cors = require('cors');
const express = require('express');
const compress = require('compression');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const songController = require('./controllers/song');

const app = express();
const isDevelopment = process.env.NODE_ENV !== 'production';
const port = isDevelopment ? 3000 : 80;

if (isDevelopment) {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

const routes = [
  '/',
  '/songs*',
];

app.use(cors());
app.use(compress());
app.get(routes, (req, res) => {
  res.sendFile(`${__dirname}/static/index.html`);
});

app.use('/assets', express.static(`${__dirname}/static/assets`));
app.use('/lib', express.static(`${__dirname}/static/lib`));
app.get('/api/songs/:id', (req, res) => songController.get(req, res));

app.listen(port, (err) => {
  if (err) {
    throw err;
  }

  console.info(`Server running [${port}] - Production [${!isDevelopment}] `);
});

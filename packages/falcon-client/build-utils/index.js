const app = require('./webpack');
const serviceWorker = require('./serviceWorker');
const jest = require('./jest');

module.exports = {
  app,
  serviceWorker,
  test: jest
};

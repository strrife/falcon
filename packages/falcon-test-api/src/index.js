const { ApiDataSource } = require('@deity/falcon-server-env');

module.exports = class TestApi extends ApiDataSource {
  async testStuff() {
    return {
      id: 1,
      title: 'qwerty'
    };
  }
};

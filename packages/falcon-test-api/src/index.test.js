const TestApi = require('./');

describe('TestPress API', () => {
  let api;

  beforeEach(() => {
    api = new TestApi({});
  });

  it('Should return something', async () => {
    const correctResponse = {
      id: 1,
      title: 'qwerty'
    };
    const result = await api.testStuff({}, { keyword: 'test' });
    expect(result).toEqual(correctResponse);
  });
});

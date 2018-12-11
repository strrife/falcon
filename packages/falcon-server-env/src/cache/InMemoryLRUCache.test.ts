import InMemoryLRUCache from './InMemoryLRUCache';

describe('InMemoryLRUCache', () => {
  let cache: InMemoryLRUCache;

  beforeAll(() => {
    cache = new InMemoryLRUCache();
  });

  it('Should set data that expires', async (done: jest.DoneCallback) => {
    const cacheKey: string = 'key';
    const testValue: string = 'foo';
    let value: string | undefined = await cache.get(cacheKey);
    expect(value).toBeUndefined();

    await cache.set(cacheKey, testValue, { ttl: 200 });
    value = await cache.get(cacheKey);
    expect(value).toBe(testValue);

    setTimeout(async () => {
      value = await cache.get(cacheKey);
      expect(value).toBeUndefined();
      done();
    }, 200);
  });
});

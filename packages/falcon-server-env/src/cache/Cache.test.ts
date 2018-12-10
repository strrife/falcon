import { KeyValueCache } from 'apollo-server-caching';
import Cache from './Cache';

describe('Cache', () => {
  let provider: KeyValueCache;
  beforeEach(() => {
    provider = {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn()
    } as KeyValueCache;
  });

  it('should properly pass key to "set" method', async () => {
    await provider.set('key', 'value');
    expect(provider.set).toBeCalledWith('key', 'value');
    provider.set.mockClear();

    await provider.set('key', 'value', { ttl: 1 });
    expect(provider.set).toBeCalledWith('key', 'value', { ttl: 1 });
  });

  it('should properly pass key to "delete" method', async () => {
    await provider.delete('foo');
    expect(provider.delete).toBeCalledWith('foo');
  });
});

/* eslint-disable no-useless-constructor, no-empty-function */
import { KeyValueCache } from 'apollo-server-caching';

export type SetCacheOptions = {
  ttl?: number;
  tags?: string[];
};

export type CacheResult = any;

export type GetCacheCallbackResult =
  | CacheResult
  | {
      value: CacheResult;
      options?: SetCacheOptions;
    };

export type GetCacheParams = {
  key: string;
  callback: () => Promise<GetCacheCallbackResult>;
  options?: SetCacheOptions;
};

/**
 * Cache-wrapper with extended methods
 */
export default class Cache implements KeyValueCache<CacheResult> {
  constructor(private cacheProvider: KeyValueCache<CacheResult>) {}

  /**
   * Returns cached value for the provided key or options object
   * @param {string|GetCacheParams} keyOrOptions Cache key or object with specified callback method to provide
   * @return {Promise<string|undefined>} Cached value
   */
  async get(keyOrOptions: string | GetCacheParams): Promise<CacheResult> {
    const cacheKey: string = typeof keyOrOptions === 'string' ? keyOrOptions : keyOrOptions.key;
    let value: CacheResult = await this.cacheProvider.get(cacheKey);

    if (typeof value === 'undefined' && typeof keyOrOptions === 'object') {
      const { callback } = keyOrOptions;
      let { options } = keyOrOptions;
      const cacheResult: GetCacheCallbackResult = await callback();
      if (typeof cacheResult !== 'undefined') {
        if (typeof cacheResult === 'object' && 'value' in cacheResult) {
          ({ value } = cacheResult);
          if (cacheResult.options) {
            options = Object.assign({}, options, cacheResult.options);
          }
        } else {
          value = cacheResult;
        }

        if (typeof value !== 'undefined') {
          await this.set(cacheKey, value, options);
        }
      }
    }

    return value;
  }

  async set(key: string, value: CacheResult, options?: SetCacheOptions): Promise<void> {
    return this.cacheProvider.set(key, value, options);
  }

  async delete(key: string): Promise<boolean | void> {
    return this.cacheProvider.delete(key);
  }

  async deleteByTags(keys: string[]): Promise<void> {
    if (!keys.length) {
      return;
    }
    await Promise.all(keys.map(key => this.delete(key)));
  }
}

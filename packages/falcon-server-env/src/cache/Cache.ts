/* eslint-disable no-useless-constructor, no-empty-function */
import { KeyValueCache } from 'apollo-server-caching';

export type SetCacheOptions = {
  ttl?: number;
  tags?: string[];
};

export type ValueOptions = {
  tags?: CacheTags;
};

export type CacheTags = {
  [key: string]: string;
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

    // Validating by cache tags
    if (this.isValueWithOptions(value)) {
      const { tags: cachedTags } = value.options as ValueOptions;
      if (!this.areTagsValid(cachedTags as CacheTags)) {
        value = undefined;
      }
    }

    if (typeof value === 'undefined' && typeof keyOrOptions === 'object') {
      const { callback } = keyOrOptions;
      let { options } = keyOrOptions;
      const cacheResult: GetCacheCallbackResult = await callback();
      if (typeof cacheResult !== 'undefined') {
        if (this.isValueWithOptions(cacheResult)) {
          ({ value } = cacheResult);
          const { options: cacheResultOptions = {} } = cacheResult;
          // Merging cache options from the "callback" result and passed method argument
          options = Object.assign({}, options, cacheResultOptions);
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
    let cachedValue: CacheResult = value;
    const { tags } = options || ({} as SetCacheOptions);
    if (tags) {
      const tagValues = await this.getTagValues(tags, true);
      cachedValue = {
        value: cachedValue,
        options: {
          tags: tagValues
        }
      };
    }
    return this.cacheProvider.set(key, cachedValue, options);
  }

  /**
   * Cache key or array of cache keys to be removed from the cache.
   * Can be used to invalidate cache by tags
   * @param {string|string[]} key One or more cache keys to be removed
   * @return {Promise<boolean|void>} Result
   */
  async delete(key: string | string[]): Promise<boolean | void> {
    if (Array.isArray(key)) {
      await Promise.all(key.map(kKey => this.delete(kKey)));
      return;
    }
    return this.cacheProvider.delete(key);
  }

  private async areTagsValid(tags: CacheTags): Promise<boolean> {
    const tagNames: string[] = Object.keys(tags || {});
    if (!tagNames.length) {
      // No tags available - we have nothing to validate against to
      return true;
    }
    const storedTags = await this.getTagValues(tagNames);

    // Simple key count check
    if (tagNames.length !== Object.keys(storedTags).length) {
      return false;
    }

    // Pair checking
    // eslint-disable-next-line no-restricted-syntax
    for (const tagName of tagNames) {
      const { [tagName]: tagValue } = tags;
      const { [tagName]: storedTagValue } = storedTags;

      // if values for the same tag name are different - terminate further checks, cached tags are invalid
      if (storedTagValue !== tagValue) {
        return false;
      }
    }

    // Cache tags are valid
    return true;
  }

  private async getTagValues(tags: string[], upsert: boolean = false): Promise<CacheTags> {
    const tagValues: CacheTags = {};
    await Promise.all(
      tags.map(async tag => {
        let tagValue = await this.get(tag);
        if (typeof tagValue === 'undefined' && upsert) {
          // For "upsert" flag - generate new tag value and save it to the cache
          tagValue = this.generateTagValue();
          await this.set(tag, tagValue);
        }

        if (tagValue) {
          tagValues[tag] = tagValue;
        }
      })
    );

    return tagValues;
  }

  private isValueWithOptions(data: any): boolean {
    return typeof data === 'object' && data.value && data.options;
  }

  /**
   * Generating a short and safe tag value
   * @return {string} Tag value
   */
  private generateTagValue(): string {
    const date: Date = new Date();
    return `${date.getSeconds()}${date.getMilliseconds()}`;
  }
}

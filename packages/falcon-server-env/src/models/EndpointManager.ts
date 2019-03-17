import { EventEmitter2 } from 'eventemitter2';
import fetch from 'node-fetch';
import { ConfigurableConstructorParams, EndpointEntry, UrlConfig } from '../types';
import { formatUrl } from '../helpers/url';

export interface EndpointConstructorParams extends ConfigurableConstructorParams<UrlConfig> {
  entries?: string[];
}

export default abstract class EndpointManager {
  public config: UrlConfig;
  public name: string;
  public baseUrl: string;
  public entries: string[];

  protected fetch = fetch;

  protected eventEmitter: EventEmitter2;

  constructor(params: EndpointConstructorParams) {
    this.config = params.config || {};
    this.name = params.name || this.constructor.name;
    this.eventEmitter = params.eventEmitter;
    this.entries = params.entries || [];
    this.baseUrl = formatUrl(this.config);

    if (!this.baseUrl) {
      throw new Error('"host" and "protocol" are required!');
    }
  }

  /**
   * @return {Array<EndpointEntry>} List of supported endpoints
   */
  getEntries(): Array<EndpointEntry> {
    return [];
  }
}

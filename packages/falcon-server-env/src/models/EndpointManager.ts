import { EventEmitter2 } from 'eventemitter2';
import fetch from 'node-fetch';
import { ConfigurableConstructorParams, EndpointEntry, UrlConfig } from '../types';
import { formatUrl } from '../helpers/url';

export default abstract class EndpointManager {
  public config: UrlConfig;
  public name: string;
  public baseUrl: string;

  protected fetch = fetch;

  protected eventEmitter: EventEmitter2;

  constructor(params: ConfigurableConstructorParams<UrlConfig>) {
    this.config = params.config || {};
    this.name = params.name || this.constructor.name;
    this.eventEmitter = params.eventEmitter;
    this.baseUrl = formatUrl(this.config);
  }

  /**
   * @return {Array<EndpointEntry>} List of supported endpoints
   */
  getEntries(): Array<EndpointEntry> {
    return [];
  }
}

import { EventEmitter2 } from 'eventemitter2';
import { Context } from 'koa';
import { ConfigurableConstructorParams, UrlConfig } from '../types';

export interface EndpointEntry {
  methods: Array<RequestMethod>;
  handler: (ctx: Context, next: Function) => Promise<any>;
  path: String;
}

export enum RequestMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
  ALL = 'all'
}

export default abstract class EndpointManager {
  public config: UrlConfig;
  public name: string;

  protected eventEmitter: EventEmitter2;

  constructor(params: ConfigurableConstructorParams<UrlConfig>) {
    this.config = params.config || {};
    this.name = params.name || this.constructor.name;
    this.eventEmitter = params.eventEmitter;
  }

  /**
   * @return {Array<EndpointEntry>} List of supported endpoints
   */
  getEntries(): Array<EndpointEntry> {
    return [];
  }
}

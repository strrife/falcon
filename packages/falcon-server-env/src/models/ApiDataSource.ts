import * as Logger from '@deity/falcon-logger';
import { Body, Request, RESTDataSource } from 'apollo-datasource-rest/dist/RESTDataSource';
import { URLSearchParams, URLSearchParamsInit } from 'apollo-server-env';
import { KeyValueCache } from 'apollo-server-caching';
import { GraphQLResolveInfo, GraphQLSchema } from 'graphql';
import { EventEmitter2 } from 'eventemitter2';
import { stringify } from 'qs';
import Cache from '../cache/Cache';
import { formatUrl } from '../helpers/url';
import ContextHTTPCache from '../cache/ContextHTTPCache';
import {
  ApiContainer,
  ApiUrlPriority,
  ApiDataSourceConfig,
  ConfigurableConstructorParams,
  ContextCacheOptions,
  ContextFetchResponse,
  ContextRequestInit,
  ContextRequestOptions,
  DataSourceConfig,
  GraphQLContext,
  FetchUrlParams,
  FetchUrlResult,
  PaginationData,
  DataSources
} from '../types';

export type PaginationValue = number | string | null;

export interface GqlServerConfig<TContext = any> {
  schema: GraphQLSchema;
  formatError?: Function;
  context?: TContext;
  formatResponse?: Function;
  dataSources?: () => DataSources;
  cache?: KeyValueCache;
  debug?: boolean;
  tracing?: boolean;
}

export type ConfigurableContainerConstructorParams = ConfigurableConstructorParams<ApiDataSourceConfig> & {
  apiContainer: ApiContainer;
  gqlServerConfig: GqlServerConfig<any>;
  eventEmitter: EventEmitter2;
  name: string;
  config: ApiDataSourceConfig;
};

export default abstract class ApiDataSource<TContext extends GraphQLContext = GraphQLContext> extends RESTDataSource<
  TContext
> {
  public name: string;
  public config: ApiDataSourceConfig;
  public fetchUrlPriority: number = ApiUrlPriority.NORMAL;
  public perPage: number = 20;

  protected apiContainer: ApiContainer;
  protected eventEmitter: EventEmitter2;
  protected cache?: Cache;
  protected gqlServerConfig: GqlServerConfig<TContext>;

  /**
   * @param {ConfigurableContainerConstructorParams} params Constructor params
   * @param {ApiDataSourceConfig} params.config API DataSource config
   * @param {string} params.name API DataSource short-name
   * @param {ApiContainer} params.apiContainer ApiContainer instance
   * @param {EventEmitter2} params.eventEmitter EventEmitter2 instance
   * @param {GqlServerConfig} params.gqlServerConfig GqlServerConfig instance
   */
  constructor(params: ConfigurableContainerConstructorParams) {
    super();

    this.gqlServerConfig = params.gqlServerConfig;
    this.name = params.name || this.constructor.name;
    this.config = params.config || {};
    this.apiContainer = params.apiContainer;
    this.eventEmitter = params.eventEmitter;

    const { host, fetchUrlPriority, perPage } = this.config;
    if (host) {
      this.baseURL = formatUrl(this.config);
    }

    this.fetchUrlPriority = fetchUrlPriority || this.fetchUrlPriority;
    this.perPage = perPage || this.perPage;

    // FIXME: nasty way of overriding "private" method and avoiding TSC errors.
    // Remove once there's an option for using an external logger.
    this['trace'] = this.traceLog.bind(this);
  }

  initialize(config: DataSourceConfig<TContext>): void {
    super.initialize(config);
    this.cache = config.cache;
    this.httpCache = new ContextHTTPCache(this.cache);
  }

  /**
   * Wrapper-method to get an API-scoped session data
   * @returns {any} API-scoped session data
   */
  get session(): any {
    if (!this.context.session) {
      return {};
    }

    if (!(this.name in this.context.session)) {
      this.context.session[this.name] = {};
    }

    return this.context.session[this.name];
  }

  /**
   * Wrapper-method to set an API-scoped session data
   * @param {any} value Value to be set to the API session
   * @return {undefined}
   */
  set session(value: any) {
    if (!this.context.session) {
      this.context.session = {};
    }

    this.context.session[this.name] = value;
  }

  /**
   * Should be implemented if ApiDataSource wants to deliver content via dynamic URLs.
   * It should return priority value for passed url.
   * @param url - url for which the priority should be returned
   * @return {number} Priority index
   */
  getFetchUrlPriority?(url: string): number;

  async fetchUrl?(
    obj: object,
    args: FetchUrlParams,
    context: TContext,
    info: GraphQLResolveInfo
  ): Promise<FetchUrlResult>;

  /**
   * Optional method to get a cache context object which should contain a distinguish data
   * that must be taken into account while calculating the cache key for this specific DataSource
   * It could be a storeCode, selected locale etc.
   */
  getCacheContext?(): object;

  async fetchBackendConfig?(obj: object, args: object, context: TContext, info: GraphQLResolveInfo): Promise<object>;

  /**
   * Hook that is going to be executed for every REST request before calling `resolveURL` method
   * @param {ContextRequestOptions} request request
   * @return {Promise<void>} promise
   */
  protected async willSendRequest(request: ContextRequestOptions): Promise<void> {
    const { context } = request;
    if (context && context.isAuthRequired && this.authorizeRequest) {
      return this.authorizeRequest(request);
    }
  }

  /**
   * Hook that is going to be executed for every REST request if authorization is required
   * @param {ContextRequestOptions} request request
   * @return {Promise<void>} promise
   */
  async authorizeRequest?(req: ContextRequestOptions): Promise<void>;

  /**
   * Calculates "pagination" data
   * @param {PaginationValue} totalItems Total amount of entries
   * @param {PaginationValue} [currentPage=null] Current page index
   * @param {PaginationValue} [perPage=null] Limit entries per page
   * @return {PaginationData} Calculated result
   */
  protected processPagination(
    totalItems: PaginationValue,
    currentPage: PaginationValue = null,
    perPage: PaginationValue = null
  ): PaginationData {
    /* eslint-disable no-underscore-dangle */
    const _totalItems: number = parseInt(totalItems as string, 10) || 0;
    const _perPage: number = parseInt(perPage as string, 10) || this.perPage;
    const _currentPage: number = parseInt(currentPage as string, 10) || 1;
    const _totalPages: number | null = _perPage ? Math.ceil(_totalItems / _perPage) : null;
    /* eslint-enable no-underscore-dangle */

    return {
      totalItems: _totalItems,
      totalPages: _totalPages,
      currentPage: _currentPage,
      perPage: _perPage,
      nextPage: _totalPages && _currentPage < _totalPages ? _currentPage + 1 : null,
      prevPage: _currentPage > 1 ? _currentPage - 1 : null
    };
  }

  protected async get<TResult = any>(
    path: string,
    params?: URLSearchParamsInit,
    init?: ContextRequestInit
  ): Promise<TResult> {
    const processedInit: ContextRequestInit = this.ensureContextPassed(init);
    return super.get<TResult>(path, this.toURLSearchParams(params), processedInit);
  }

  protected async post<TResult = any>(path: string, body?: Body, init?: ContextRequestInit): Promise<TResult> {
    const processedInit: ContextRequestInit = this.ensureContextPassed(init);
    return super.post<TResult>(path, body, processedInit);
  }

  protected async patch<TResult = any>(path: string, body?: Body, init?: ContextRequestInit): Promise<TResult> {
    const processedInit: ContextRequestInit = this.ensureContextPassed(init);
    return super.patch<TResult>(path, body, processedInit);
  }

  protected async put<TResult = any>(path: string, body?: Body, init?: ContextRequestInit): Promise<TResult> {
    const processedInit: ContextRequestInit = this.ensureContextPassed(init);
    return super.put<TResult>(path, body, processedInit);
  }

  protected async delete<TResult = any>(
    path: string,
    params?: URLSearchParamsInit,
    init?: ContextRequestInit
  ): Promise<TResult> {
    const processedInit: ContextRequestInit = this.ensureContextPassed(init);
    return super.delete<TResult>(path, this.toURLSearchParams(params), processedInit);
  }

  protected async didReceiveResponse<TResult = any>(res: ContextFetchResponse, req: Request): Promise<TResult> {
    const result: TResult = await super.didReceiveResponse<TResult>(res, req);
    const { context } = res;

    if (context && context.didReceiveResult) {
      return context.didReceiveResult(result, res);
    }
    return result;
  }

  protected cacheKeyFor(request: Request): string {
    const cacheKey: string = super.cacheKeyFor(request);
    // Note: temporary disabling "memoized" map due to issues with GraphQL resolvers,
    // GET-requests in particular ("fetchUrl" query)
    this.memoizedResults.delete(cacheKey);
    return cacheKey;
  }

  private ensureContextPassed(init?: ContextRequestInit): ContextRequestInit {
    const processedInit: ContextRequestInit = init || {};

    if (!processedInit.context) {
      processedInit.context = {};
    }
    if (!processedInit.cacheOptions) {
      processedInit.cacheOptions = {};
    }
    if (typeof processedInit!.cacheOptions === 'object') {
      (processedInit.cacheOptions as ContextCacheOptions).context = processedInit.context;
    }

    return processedInit;
  }

  /**
   * This is a temporary solution to override Apollo's own "trace" method to use external Logger
   * @param {string} label Trace label
   * @param {function} fn Callback to trace
   * @return {Promise<TResult>} Result
   */
  /* istanbul ignore next Skipping code coverage for "dev" function */
  private async traceLog<TResult>(label: string, fn: () => Promise<TResult>): Promise<TResult> {
    if (process && process.env && process.env.NODE_ENV === 'development') {
      const startTime = Date.now();
      try {
        return await fn();
      } finally {
        const duration = Date.now() - startTime;
        Logger.debug(`${this.name}: ${label} (${duration}ms)`);
      }
    } else {
      return fn();
    }
  }

  /**
   * Converts params to URLSearchParam if it is a plain object
   * @param {URLSearchParamsInit} params Search params
   * @return {URLSearchParams} URLSearchParam
   */
  private toURLSearchParams(params?: URLSearchParamsInit): URLSearchParams {
    // qs.stringify assures that nested object will be converted correctly to search params
    const searchString: string = stringify(params, {
      encodeValuesOnly: true
    });

    return new URLSearchParams(searchString);
  }
}

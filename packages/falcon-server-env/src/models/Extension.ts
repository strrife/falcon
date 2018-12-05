import { GraphQLResolveInfo } from 'graphql';
import { EventEmitter2 } from 'eventemitter2';
import ApiDataSource from './ApiDataSource';
import {
  ApiUrlPriority,
  ConfigurableConstructorParams,
  ExtensionContainer,
  FetchUrlParams,
  FetchUrlResult,
  GraphQLContext
} from '../types';

export type ConfigurableContainerConstructorParams = ConfigurableConstructorParams & {
  extensionContainer: ExtensionContainer;
};

export interface ExtensionConfig {
  api?: string;
}

export default abstract class Extension<TApiConfig = object> {
  public config: ExtensionConfig;
  public name: string;
  public api?: ApiDataSource;
  public apiConfig: TApiConfig | null = null;

  protected extensionContainer: ExtensionContainer;
  protected eventEmitter: EventEmitter2;

  /**
   * @param {ConfigurableContainerConstructorParams} params Constructor params
   * @param {object} params.config Extension config object
   * @param {string} params.name Extension short-name
   * @param {ExtensionContainer} params.extensionContainer ExtensionContainer instance
   * @param {EventEmitter2} params.eventEmitter EventEmitter2 instance
   */
  constructor(params: ConfigurableContainerConstructorParams) {
    const { config = {}, name, extensionContainer, eventEmitter } = params;
    this.name = name || this.constructor.name;
    this.config = config as ExtensionConfig;
    this.extensionContainer = extensionContainer;
    this.eventEmitter = eventEmitter;
  }

  /**
   * Initializes extension in this method
   * Must return a result from "api.preInitialize()"
   * @return {Promise<TApiConfig|null>} API DataSource preInitialize result
   */
  async initialize(): Promise<TApiConfig | null> {
    if (this.api) {
      this.apiConfig = await this.api.preInitialize<TApiConfig>();
    }

    return this.apiConfig;
  }

  /**
   * GraphQL configuration getter
   * @return {object} GraphQL configuration object
   */
  async getGraphQLConfig(): Promise<object> {
    return {};
  }

  /**
   * Gets API instance from DataSource by assigned API name
   * @param {GraphQLContext} context GraphQL Resolver context object
   * @return {ApiDataSource<GraphQLContext> | null} API DataSource instance if found
   */
  getApi(context: GraphQLContext): ApiDataSource<GraphQLContext> | null {
    const { dataSources } = context;
    return (this.config.api && dataSources[this.config.api]) || null;
  }

  /**
   * Should be implemented if extension wants to deliver content for dynamic urls. It should return priority value for passed url.
   * @param {string} url - url for which the priority should be returned
   * @return {number|null} Priority index or null (if "dynamic URL" is not supported)
   */
  getFetchUrlPriority(url: string): number | null {
    return this.api && this.api.getFetchUrlPriority ? this.api.getFetchUrlPriority(url) : ApiUrlPriority.OFF;
  }

  async fetchUrl?(
    root: object,
    params: FetchUrlParams,
    context: any,
    info: GraphQLResolveInfo
  ): Promise<FetchUrlResult>;
}

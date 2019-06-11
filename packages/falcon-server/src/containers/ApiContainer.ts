/* eslint-disable no-restricted-syntax, no-await-in-loop */
import Logger from '@deity/falcon-logger';
import { ApiDataSource, ApiDataSourceConstructor, Events } from '@deity/falcon-server-env';
import { BaseContainer } from './BaseContainer';
import { ApiEntryMap, ApolloServerConfig } from '../types';

export type ApiDataSourceInitializer = (apolloServerConfig: ApolloServerConfig) => ApiDataSource;

/**
 * Api Engine acts as a container for API instances:
 * - manages all the instances
 * - returns the instances as dataSources (required by Apollo Server)
 */
export class ApiContainer extends BaseContainer {
  public dataSources: Map<string, ApiDataSourceInitializer> = new Map();

  /**
   * Instantiates apis based on passed configuration
   * @param {ApiEntryMap} apis Key-value list of APIs configuration
   * @returns {undefined}
   */
  async registerApis(apis: ApiEntryMap = {}) {
    for (const apiKey in apis) {
      if (Object.prototype.hasOwnProperty.call(apis, apiKey)) {
        const api = apis[apiKey];

        const { package: pkg, config = {} } = api;
        const ApiClass = this.importModule<ApiDataSourceConstructor>(pkg);
        if (!ApiClass) {
          return;
        }

        const apiInstanceCb: ApiDataSourceInitializer = apolloServerConfig => {
          const instance: ApiDataSource = new ApiClass({
            config,
            name: apiKey,
            apiContainer: this,
            eventEmitter: this.eventEmitter,
            gqlServerConfig: apolloServerConfig
          });

          this.eventEmitter.emit(Events.API_DATA_SOURCE_REGISTERED, {
            instance,
            name: instance.name
          });

          Logger.debug(`ApiContainer: "${instance.name}" API DataSource instantiated`);

          return instance;
        };
        this.dataSources.set(apiKey, apiInstanceCb);
      }
    }
  }
}

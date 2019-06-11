/* eslint-disable no-restricted-syntax, no-await-in-loop, no-underscore-dangle */
import Logger from '@deity/falcon-logger';
import { EndpointEntry, EndpointConstructor } from '@deity/falcon-server-env';
import { BaseContainer } from './BaseContainer';
import { EndpointEntryMap } from '../types';

export class EndpointContainer extends BaseContainer {
  public entries: Array<EndpointEntry> = [];

  /**
   * Instantiates endpoints based on the passed configuration and registers event handlers for them
   * @param {EndpointEntryMap} config Configuration object of endpoints
   */
  async registerEndpoints(config: EndpointEntryMap) {
    for (const endpointKey in config) {
      if (Object.prototype.hasOwnProperty.call(config, endpointKey)) {
        const endpointManagerConfig = config[endpointKey];

        const EndpointManagerClass = this.importModule<EndpointConstructor>(endpointManagerConfig.package);
        if (!EndpointManagerClass) {
          Logger.warn(`${this.constructor.name}: Could not load ${endpointManagerConfig.package}`);
          return;
        }
        const endpointManager = new EndpointManagerClass({
          config: endpointManagerConfig.config || {},
          name: endpointKey,
          eventEmitter: this.eventEmitter
        });

        Logger.debug(`${this.constructor.name}: "${endpointManager.name}" Endpoint Manager has been instantiated`);
        this.entries.push(...endpointManager.getEntries());
      }
    }
  }
}

import Logger from '@deity/falcon-logger';
import { EventEmitter2 } from 'eventemitter2';
import { resolve } from 'path';

declare type TryRequireResult<T> = {
  module?: T;
  exists: boolean;
  error?: Error;
};

const tryRequire = <T>(moduleName: string): TryRequireResult<T> => {
  try {
    const mdl = require(moduleName); // eslint-disable-line import/no-dynamic-require
    return {
      module: typeof mdl.default === 'function' ? mdl.default : mdl,
      exists: true,
      error: undefined
    };
  } catch (error) {
    const { code, message } = error;

    return {
      module: undefined,
      exists: code !== 'MODULE_NOT_FOUND' || message !== `Cannot find module '${moduleName}'`,
      error
    };
  }
};

export class BaseContainer {
  constructor(protected eventEmitter: EventEmitter2) {}

  /**
   * Imports the specified module (via "require()") by checking installed NPM package
   * (by package name) and your local project folder.
   * @param {string} pathOrPackage Local path or package name of the module
   * @returns {T|undefined} Imported module
   */
  importModule<T>(pathOrPackage: string): T | undefined {
    const prefix: string = this.constructor.name;

    const requiredPackage = tryRequire<T>(pathOrPackage);
    if (requiredPackage.exists) {
      const { module: mdl, error } = requiredPackage;
      if (error) {
        Logger.error(`${prefix}: "${pathOrPackage}" cannot be loaded. - ${error.message}\n${error.stack} `);

        return undefined;
      }

      Logger.debug(`${prefix}: "${pathOrPackage}" loaded as a package`);

      return mdl;
    }

    const modulePath: string = resolve(process.cwd(), pathOrPackage);
    const requiredModule = tryRequire<T>(modulePath);
    if (requiredModule.exists) {
      const { module: mdl, error } = requiredModule;
      if (error) {
        Logger.error(`${prefix}: "${pathOrPackage}" cannot be loaded. - ${error.message}\n${error.stack}`);

        return undefined;
      }

      Logger.debug(`${prefix}: "${pathOrPackage}" loaded from '${modulePath}'`);

      return mdl;
    }

    Logger.error(
      `${prefix}: Cannot find package '${pathOrPackage}' or module '${modulePath}'. Please check your config ("package" key)`
    );

    return undefined;
  }
}

import { resolve } from 'path';
import Logger, { Logger as LoggerType } from '@deity/falcon-logger';
import { EventEmitter2 } from 'eventemitter2';

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

    // Note: error.message in Node 12 contains "Require stack" now.
    return {
      module: undefined,
      exists: code !== 'MODULE_NOT_FOUND' || !message.startsWith(`Cannot find module '${moduleName}'`),
      error
    };
  }
};

export class BaseContainer {
  protected logger: LoggerType;

  constructor(protected eventEmitter: EventEmitter2) {
    this.logger = Logger.getFor(this.constructor.name);
  }

  /**
   * Imports the specified module (via "require()") by checking installed NPM package
   * (by package name) and your local project folder.
   * @param pathOrPackage Local path or package name of the module
   * @returns Imported module
   */
  importModule<T>(pathOrPackage: string): T | undefined {
    const requiredPackage = tryRequire<T>(pathOrPackage);
    if (requiredPackage.exists) {
      const { module: mdl, error } = requiredPackage;
      if (error) {
        this.logger.error(`"${pathOrPackage}" cannot be loaded. - ${error.message}\n${error.stack} `);

        return undefined;
      }

      this.logger.debug(`"${pathOrPackage}" loaded as a package`);

      return mdl;
    }

    const modulePath: string = resolve(process.cwd(), pathOrPackage);
    const requiredModule = tryRequire<T>(modulePath);
    if (requiredModule.exists) {
      const { module: mdl, error } = requiredModule;
      if (error) {
        this.logger.error(`"${pathOrPackage}" cannot be loaded. - ${error.message}\n${error.stack}`);

        return undefined;
      }

      this.logger.debug(`"${pathOrPackage}" loaded from '${modulePath}'`);

      return mdl;
    }

    this.logger.error(
      `Cannot find package '${pathOrPackage}' or module '${modulePath}'. Please check your config ("package" key)`
    );

    return undefined;
  }
}

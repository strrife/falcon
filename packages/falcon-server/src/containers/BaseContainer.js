const { resolve } = require('path');
const Logger = require('@deity/falcon-logger');

const tryRequire = moduleName => {
  try {
    return {
      module: require(moduleName), // eslint-disable-line import/no-dynamic-require,
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

module.exports = class BaseContainer {
  /**
   * Base Container constructor
   * @param {EventEmitter2} eventEmitter EventEmitter
   */
  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;
  }

  /**
   * Imports the specified module (via "require()") by checking installed NPM package
   * (by package name) and your local project folder.
   * @param {string} pathOrPackage Local path or package name of the module
   * @return {any} Imported module
   */
  importModule(pathOrPackage) {
    const prefix = this.constructor.name;

    const requiredPackage = tryRequire(pathOrPackage);
    if (requiredPackage.exists) {
      const { module, error } = requiredPackage;
      if (error) {
        Logger.error(`${prefix}: "${pathOrPackage}" cannot be loaded. - ${error.message}\n${error.stack} `);

        return undefined;
      }

      Logger.debug(`${prefix}: "${pathOrPackage}" loaded as a package`);

      return module;
    }

    const modulePath = resolve(process.cwd(), pathOrPackage);
    const requiredModule = tryRequire(modulePath);
    if (requiredModule.exists) {
      const { module, error } = requiredModule;
      if (error) {
        Logger.error(`${prefix}: "${pathOrPackage}" cannot be loaded. - ${error.message}\n${error.stack}`);

        return undefined;
      }

      Logger.debug(`${prefix}: "${pathOrPackage}" loaded from '${modulePath}'`);

      return module;
    }

    Logger.error(
      `${prefix}: Cannot find package '${pathOrPackage}' or module '${modulePath}'. Please check your config ("package" key)`
    );

    return undefined;
  }
};

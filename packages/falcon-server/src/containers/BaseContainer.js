const { resolve } = require('path');
const Logger = require('@deity/falcon-logger');

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
   * @returns {any} Imported module
   */
  importModule(pathOrPackage) {
    const prefix = this.constructor.name;
    let module;
    try {
      module = require(pathOrPackage); // eslint-disable-line import/no-dynamic-require
      Logger.debug(`${prefix}: "${pathOrPackage}" loaded as a package`);
    } catch (packageError) {
      if (!pathOrPackage.startsWith('.')) {
        // Log the error for (more likely) non-local modules (NPM dependency)
        Logger.warn(`${prefix}: ${packageError.message}`);
      }

      try {
        const modulePath = resolve(process.cwd(), pathOrPackage);
        module = require(modulePath); // eslint-disable-line import/no-dynamic-require
        Logger.debug(`${prefix}: "${pathOrPackage}" loaded from ${modulePath}`);
      } catch (pathError) {
        Logger.error(
          `${prefix}: "${pathOrPackage}" cannot be loaded. Please check your config ("package" key) - ${
            pathError.message
          }`
        );
      }
    }

    return module;
  }
};

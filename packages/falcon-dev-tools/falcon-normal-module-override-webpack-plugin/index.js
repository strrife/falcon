const path = require('path');

module.exports = class FalconNormalModuleOverridePlugin {
  constructor(resourceRegExp, newResource) {
    this.name = 'FalconNormalModuleOverridePlugin';
    this.resourceRegExp = resourceRegExp;
    this.newResource = newResource;
  }

  apply(compiler) {
    const { resourceRegExp, newResource } = this;

    compiler.hooks.normalModuleFactory.tap(this.name, nmf => {
      nmf.hooks.beforeResolve.tap(this.name, result => {
        if (!result) {
          return;
        }

        if (resourceRegExp.test(result.request)) {
          if (typeof newResource === 'function') {
            newResource(result);
          } else {
            result.request = newResource;
          }
        }

        return result;
      });

      nmf.hooks.afterResolve.tap(this.name, result => {
        if (!result) {
          return;
        }

        if (resourceRegExp.test(result.resource)) {
          if (typeof newResource === 'function') {
            newResource(result);
          } else {
            result.resource = path.resolve(path.dirname(result.resource), newResource);
          }
        }

        return result;
      });
    });
  }
};

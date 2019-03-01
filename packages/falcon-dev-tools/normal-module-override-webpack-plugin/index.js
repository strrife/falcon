const path = require('path');
const glob = require('glob');

module.exports = class NormalModuleOverridePlugin {
  constructor(moduleOverrideMap) {
    this.name = 'NormalModuleOverridePlugin';
    this.moduleOverrideMap = moduleOverrideMap;
    this.context = path.resolve(process.cwd());
  }

  requireResolveIfExists(id, options = undefined) {
    try {
      return require.resolve(id, options);
    } catch (e) {
      return false;
    }
  }

  resolveModulePath(context, request) {
    const filePathWithoutExtension = path.resolve(context, request);
    const files = glob.sync(`${filePathWithoutExtension}@(|.*)`);
    if (files.length === 0) {
      throw new Error(`There is no file '${filePathWithoutExtension}'`);
    }
    if (files.length > 1) {
      throw new Error(`There is more than one file '${filePathWithoutExtension}'`);
    }

    return require.resolve(files[0]);
  }

  apply(compiler) {
    const { moduleOverrideMap } = this;

    if (Object.keys(moduleOverrideMap).length === 0) {
      return;
    }

    const moduleMap = Object.keys(moduleOverrideMap).reduce(
      (result, x) => ({
        ...result,
        [require.resolve(x)]:
          this.requireResolveIfExists(moduleOverrideMap[x]) ||
          this.resolveModulePath(this.context, moduleOverrideMap[x])
      }),
      {}
    );

    compiler.hooks.normalModuleFactory.tap(this.name, nmf => {
      nmf.hooks.beforeResolve.tap(this.name, e => {
        if (!e) {
          return;
        }

        const moduleToReplace = this.requireResolveIfExists(e.request, { paths: [e.context] });
        if (moduleToReplace && moduleMap[moduleToReplace]) {
          e.request = moduleMap[moduleToReplace];
        }

        return e;
      });
    });
  }
};

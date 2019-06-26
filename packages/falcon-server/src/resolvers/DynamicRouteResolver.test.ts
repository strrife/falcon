import { ApiDataSource, ApiUrlPriority } from '@deity/falcon-server-env';
import { EventEmitter2 } from 'eventemitter2';
import { ExtensionContainer } from '../containers/ExtensionContainer';

class Api1 extends ApiDataSource {
  getFetchUrlPriority(url) {
    return url.startsWith('/blog/') ? ApiUrlPriority.HIGHEST : ApiUrlPriority.LOW;
  }

  async fetchUrl(_, { path }) {
    return { id: 1, path, type: 'foo' };
  }
}
class Api2 extends ApiDataSource {
  getFetchUrlPriority(url) {
    return url.endsWith('.html') ? ApiUrlPriority.HIGH : ApiUrlPriority.NORMAL;
  }

  async fetchUrl(_, { path }) {
    return { id: 2, path, type: 'bar' };
  }
}

describe('DynamicRouteResolver', () => {
  it('Should correctly resolve DynamicRoute request', async () => {
    const ee = new EventEmitter2();
    const extensionContainer = new ExtensionContainer(ee);

    const dataSources = {
      api1: new Api1({
        eventEmitter: ee
      }),
      api2: new Api2({
        eventEmitter: ee
      })
    };

    extensionContainer.extensions.set(ext1.name, ext1);
    extensionContainer.extensions.set(ext2.name, ext2);
    const dynamicResolver = new DynamicRouteResolver(extensionContainer);

    const result = await dynamicResolver.fetchUrl({}, { path: 'foo.html' }, { dataSources });
    expect(result).toEqual({ id: 2, path: 'foo.html', type: 'bar' });
    expect(spyExt2).toHaveBeenCalled();
    expect(spyExt1).not.toHaveBeenCalled();

    const result2 = await dynamicResolver.fetchUrl({}, { path: '/blog/bar/page' }, { dataSources });
    expect(result2).toEqual({ id: 1, path: '/blog/bar/page', type: 'foo' });
    expect(spyExt1).toHaveBeenCalled();
    expect(spyExt2).not.toHaveBeenCalled();
  });
});

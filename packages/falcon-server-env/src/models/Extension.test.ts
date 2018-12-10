// eslint-disable-next-line import/no-extraneous-dependencies
import 'jest-extended';
import { GraphQLResolveInfo } from 'graphql';
import Extension from './Extension';
import ApiDataSource from './ApiDataSource';
import { FetchUrlResult } from '../types';

class CustomExtension extends Extension {
  getFetchUrlPriority(url: string): number {
    return 0;
  }

  async fetchUrl(obj: object, args: any, context: any, info: GraphQLResolveInfo): Promise<FetchUrlResult> {
    return Promise.resolve({ id: 1, type: 'post', path: 'foo' });
  }
}

class CustomApiDataSource extends ApiDataSource {}

describe('Extension', () => {
  let ext: CustomExtension;

  beforeEach(() => {
    ext = new CustomExtension({
      config: {},
      extensionContainer: {}
    });
  });

  it('Should create an instance of Extension', async () => {
    expect(ext.config).toEqual({});
    expect(ext.name).toBe('CustomExtension');
  });
});

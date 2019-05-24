import { RequestOptions } from 'apollo-datasource-rest/dist/RESTDataSource';
import { IAuthorizeRequest } from '.';

export interface TokenProvider {
  (): Promise<string>;
}

/**
 * Bearer based request authorization
 */
export class BearerAuth implements IAuthorizeRequest {
  /**
   * @param {TokenProvider} token token provider callback, executed on each `authorize`
   */
  constructor(token: TokenProvider) {
    this.token = token;
  }

  private token: TokenProvider;

  async authorize<TRequest extends RequestOptions = RequestOptions>(request: TRequest): Promise<TRequest> {
    const tokenValue = await this.token();

    request.headers.append('Authorization', `Bearer ${tokenValue}`);

    return request;
  }
}

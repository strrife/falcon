import { RequestOptions } from 'apollo-datasource-rest/dist/RESTDataSource';

export interface IAuthorizeRequest {
  authorize<TRequest extends RequestOptions = RequestOptions>(request: TRequest): Promise<TRequest>;
}

export * from './bearerAuth';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { RequestPasswordResetInput } from '@deity/falcon-shop-extension';
import { InputArg } from '../types';

export const REQUEST_PASSWORD_RESET_TOKEN_MUTATION = gql`
  mutation RequestPasswordReset($input: RequestPasswordResetInput!) {
    requestPasswordReset(input: $input)
  }
`;

export type RequestPasswordResetResponse = {
  requestPasswordResetToken: boolean;
};

export class RequestPasswordResetMutation extends Mutation<
  RequestPasswordResetResponse,
  InputArg<RequestPasswordResetInput>
> {
  static defaultProps = {
    mutation: REQUEST_PASSWORD_RESET_TOKEN_MUTATION
  };
}

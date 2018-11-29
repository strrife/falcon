import gql from 'graphql-tag';
import { Query } from '../Query';

export const VALIDATE_PASSWORD_TOKEN_QUERY = gql`
  query ValidatePasswordToken($id: Int!, $token: String!) {
    validatePasswordToken(id: $id, token: $token)
  }
`;

export class ValidatePasswordTokenQuery extends Query<
  { validatePasswordToken: boolean },
  { id: number; token: string }
> {
  static defaultProps = {
    query: VALIDATE_PASSWORD_TOKEN_QUERY
  };
}

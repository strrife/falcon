import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { CouponInput } from '@deity/falcon-shop-extension';
import { OperationInput } from '../types';

export const APPLY_COUPON = gql`
  mutation ApplyCoupon($input: CouponInput!) {
    applyCoupon(input: $input)
  }
`;

export type ApplyCouponResult = {
  applyCoupon: boolean;
};

export class ApplyCouponMutation extends Mutation<ApplyCouponResult, OperationInput<CouponInput>> {
  static defaultProps = {
    mutation: APPLY_COUPON,
    awaitRefetchQueries: true,
    refetchQueries: ['Cart']
  };
}

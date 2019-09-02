import React from 'react';
import { withApollo, WithApolloClient, FetchResult } from 'react-apollo';
import isEqual from 'lodash.isequal';
import { OperationInput } from '@deity/falcon-data';
import {
  PlaceOrderResult,
  CheckoutAddressInput,
  EstimateShippingMethodsInput,
  ShippingMethod,
  SetShippingInput
} from '@deity/falcon-shop-extension';
import {
  PLACE_ORDER,
  ESTIMATE_SHIPPING_METHODS,
  EstimateShippingMethodsResponse,
  SET_SHIPPING,
  SetShippingResponse
} from '@deity/falcon-shop-data';

export type CheckoutPaymentMethod = {
  code: string;
  title: string;
};

type CheckoutLogicData = {
  email: string | null;
  shippingAddress?: CheckoutAddressInput;
  billingAddress?: CheckoutAddressInput;
  billingSameAsShipping: boolean | null;
  shippingMethod: ShippingMethod | null;
  paymentMethod: CheckoutPaymentMethod | null;
  paymentAdditionalData: object | null;
};

type CheckoutLogicError = {
  message: string;
};

type CheckoutErrors = CheckoutLogicError[];

type CheckoutLogicState = {
  loading: boolean;
  errors: CheckoutLogicErrors;
  values: CheckoutLogicData;
  result?: PlaceOrderResult;
  availableShippingMethods: ShippingMethod[];
  availablePaymentMethods: CheckoutPaymentMethod[];
};

type CheckoutLogicErrors = {
  email?: CheckoutErrors;
  shippingAddress?: CheckoutErrors;
  billingSameAsShipping?: CheckoutErrors;
  billingAddress?: CheckoutErrors;
  shippingMethod?: CheckoutErrors;
  paymentMethod?: CheckoutErrors;
  order?: CheckoutErrors;
};

export type CheckoutLogicInjectedProps = {
  values: CheckoutLogicData;
  errors: CheckoutLogicErrors;
  loading: boolean;
  availableShippingMethods: ShippingMethod[];
  availablePaymentMethods: CheckoutPaymentMethod[];
  result?: PlaceOrderResult;
  setEmail(email: string): void;
  setShippingAddress(address: CheckoutAddressInput): void;
  setBillingSameAsShipping(same: boolean): void;
  setBillingAddress(address: CheckoutAddressInput): void;
  setShippingMethod(shipping: ShippingMethod): void;
  setPaymentMethod(payment: CheckoutPaymentMethod, additionalData?: any): void;
  placeOrder(): void;
};

export type CheckoutLogicProps = WithApolloClient<{
  initialValues?: CheckoutLogicData;
  children(props: CheckoutLogicInjectedProps): any;
}>;

class CheckoutLogicImpl extends React.Component<CheckoutLogicProps, CheckoutLogicState> {
  constructor(props: CheckoutLogicProps) {
    super(props);
    this.state = {
      loading: false,
      values: props.initialValues || ({ billingSameAsShipping: false } as any),
      errors: {},
      availablePaymentMethods: [],
      availableShippingMethods: []
    };
  }

  setPartialState(partial: any, callback?: () => void) {
    this.setState(
      state =>
        // "deep replace" - replace old values with new, don't merge these
        ({
          ...state,
          ...partial,
          values: {
            ...state.values,
            ...(partial.values || {})
          }
        }),
      callback
    );
  }

  setLoading(loading: boolean, callback?: () => void) {
    this.setPartialState({ loading }, callback);
  }

  getShippingMethodData(shippingMethod: ShippingMethod) {
    return {
      shippingCarrierCode: shippingMethod.carrierCode,
      shippingMethodCode: shippingMethod.methodCode
    };
  }

  setEmail = (email: string) =>
    this.setLoading(true, () => this.setPartialState({ loading: false, values: { email } }));

  // the following setters first set loading to true, and then in the callback actual values is set
  // and loading flag gets reset to false, so the flow goes through whole proces (loading > set value > loaded)
  setBillingSameAsShipping = (same: boolean) =>
    this.setLoading(true, () =>
      this.setPartialState({
        loading: false,
        values: {
          billingSameAsShipping: same,
          billingAddress: same ? this.state.values.shippingAddress : null
        }
      })
    );

  setBillingAddress = (billingAddress: CheckoutAddressInput) =>
    this.setLoading(true, () => this.setPartialState({ loading: false, values: { billingAddress } }));

  setPaymentMethod = (paymentMethod: CheckoutPaymentMethod, additionalData?: any) =>
    this.setLoading(true, () =>
      this.setPartialState({ loading: false, values: { paymentMethod, paymentAdditionalData: additionalData } })
    );

  setShippingAddress = (shippingAddress: CheckoutAddressInput) => {
    this.setLoading(true, () => {
      // trigger mutation that will return available shipping options
      this.props.client
        .mutate<EstimateShippingMethodsResponse, OperationInput<EstimateShippingMethodsInput>>({
          mutation: ESTIMATE_SHIPPING_METHODS,
          variables: { input: { address: shippingAddress } }
        })
        .then(response => {
          if (response.errors) {
            this.setPartialState({
              loading: false,
              errors: { shippingAddress: response.errors },
              availableShippingMethods: null
            });
          } else {
            const values = { shippingAddress } as CheckoutLogicData;

            // if billing is set to the same as shipping then set it also to received value
            if (this.state.values.billingSameAsShipping) {
              values.billingAddress = shippingAddress;
            }

            const { estimateShippingMethods } = response.data;
            // if shipping methods has changed then remove already selected shipping method
            if (!isEqual(estimateShippingMethods, this.state.availableShippingMethods)) {
              values.shippingMethod = null;
            }

            this.setPartialState({
              loading: false,
              errors: {},
              values,
              availableShippingMethods: estimateShippingMethods
            });
          }
        })
        .catch(error => {
          this.setPartialState({
            loading: false,
            errors: { shippingAddress: [error] }
          });
        });
    });
  };

  setShippingMethod = (shippingMethod: ShippingMethod) => {
    this.setLoading(true, () => {
      // trigger mutation that will return available payment options
      this.props.client
        .mutate<SetShippingResponse, OperationInput<SetShippingInput>>({
          mutation: SET_SHIPPING,
          // refetch cart because totals have changed once shipping has been selected
          refetchQueries: ['Cart'],
          variables: {
            input: {
              billingAddress: this.state.values.billingAddress,
              shippingAddress: this.state.values.shippingAddress,
              ...this.getShippingMethodData(shippingMethod)
            }
          }
        })
        .then(response => {
          if (response.errors) {
            this.setPartialState({
              loading: false,
              errors: { shippingMethod: response.errors },
              availablePaymentMethods: null
            });
          } else {
            const values = { shippingMethod } as CheckoutLogicData;
            // if available payment methods has changed then remove selected payment method
            if (!isEqual(response.data.setShipping.paymentMethods, this.state.availablePaymentMethods)) {
              values.paymentMethod = null;
            }

            this.setPartialState({
              loading: false,
              errors: {},
              values,
              availablePaymentMethods: response.data!.setShipping.paymentMethods
            });
          }
        })
        .catch(error => {
          this.setPartialState({
            loading: false,
            errors: { shippingMethod: [error] }
          });
        });
    });
  };

  placeOrder = () => {
    const handleResponse = (resp: FetchResult) => {
      if (resp.errors) {
        this.setPartialState({
          loading: false,
          errors: {
            order: resp.errors
          }
        });
      } else {
        this.setPartialState({
          loading: false,
          error: null,
          result: resp.data!.placeOrder
        });
      }
    };

    this.setLoading(true, () => {
      this.props.client
        .mutate({
          mutation: PLACE_ORDER,
          // update cart once order is placed successfully
          refetchQueries: ['Cart', 'OrderList'],
          variables: {
            input: {
              email: this.state.values.email,
              billingAddress: this.state.values.billingAddress,
              paymentMethod: {
                method: this.state.values.paymentMethod!.code,
                additionalData: this.state.values.paymentAdditionalData
              }
            }
          }
        })
        // promise catches the errors which are not passed to update callback
        .then(handleResponse)
        .catch(error => handleResponse({ errors: [error] }));
    });
  };

  render() {
    return this.props.children({
      loading: this.state.loading,
      values: this.state.values,
      errors: this.state.errors,
      result: this.state.result,
      availablePaymentMethods: this.state.availablePaymentMethods,
      availableShippingMethods: this.state.availableShippingMethods,
      setEmail: this.setEmail,
      setShippingAddress: this.setShippingAddress,
      setBillingAddress: this.setBillingAddress,
      setBillingSameAsShipping: this.setBillingSameAsShipping,
      setShippingMethod: this.setShippingMethod,
      setPaymentMethod: this.setPaymentMethod,
      placeOrder: this.placeOrder
    });
  }
}

export const CheckoutLogic = withApollo(CheckoutLogicImpl);

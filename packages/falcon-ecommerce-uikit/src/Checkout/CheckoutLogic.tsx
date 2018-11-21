import React from 'react';
import { Redirect } from 'react-router-dom';
import { withApollo, WithApolloClient } from 'react-apollo';
import { CartQuery } from '../Cart/CartQuery';
import { ESTIMATE_SHIPPING_METHODS, SET_SHIPPING, PLACE_ORDER } from './CheckoutMutation';

type CheckoutAddress = {
  id?: number;
  firstname: string;
  lastname: string;
  city: string;
  postcode: string;
  company: string;
  countryId: string;
  region: string;
  regionId: number;
  street: string[];
  telephone: string;
};

type CheckoutShippingMethod = {
  carrierTitle: string;
  amount: number;
  carrierCode: string;
  methodCode: string;
  methodTitle: string;
  priceExclTax: number;
  priceInclTax: number;
  currency: string;
};

type CheckoutPaymentMethod = {
  code: string;
  title: string;
};

type CheckoutLogicData = {
  email: string | null;
  shippingAddress: CheckoutAddress | null;
  billingAddress: CheckoutAddress | null;
  billingSameAsShipping: boolean | null;
  shippingMethod: CheckoutShippingMethod | null;
  paymentMethod: CheckoutPaymentMethod | null;
};

type CheckoutLogicState = {
  loading: boolean;
  error?: any;
  values: CheckoutLogicData;
  orderId?: number;
  availableShippingMethods: CheckoutShippingMethod[];
  availablePaymentMethods: CheckoutPaymentMethod[];
};

export type CheckoutLogicInjectedProps = {
  values: CheckoutLogicData;
  loading: boolean;
  availableShippingMethods: CheckoutShippingMethod[];
  availablePaymentMethods: CheckoutPaymentMethod[];
  orderId?: number;
  setEmail(email: string): void;
  setShippingAddress(address: CheckoutAddress): void;
  setBillingSameAsShipping(same: boolean): void;
  setBillingAddress(address: CheckoutAddress): void;
  setShipping(shipping: CheckoutShippingMethod): void;
  setPayment(payment: CheckoutPaymentMethod): void;
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
      values: props.initialValues || ({ billingSameAsShipping: true } as any),
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

  setBillingSameAsShipping = (same: boolean) =>
    this.setPartialState({
      values: {
        billingSameAsShipping: same,
        billingAddress: same ? this.state.values.shippingAddress : null
      }
    });

  // call setState only if email is different from currently saved
  setEmail = (email: string) => this.state.values.email !== email && this.setPartialState({ values: { email } });

  setBillingAddress = (billingAddress: CheckoutAddress) => this.setPartialState({ values: { billingAddress } });

  setPayment = (paymentMethod: CheckoutPaymentMethod) => this.setPartialState({ values: { paymentMethod } });

  getShippingMethodData(shippingMethod: CheckoutShippingMethod) {
    return {
      shippingCarrierCode: shippingMethod.carrierCode,
      shippingMethodCode: shippingMethod.methodCode
    };
  }

  setShippingAddress = (shippingAddress: CheckoutAddress) => {
    this.setLoading(true, () => {
      // trigger mutationt that will return available shipping options
      this.props.client
        .mutate({
          mutation: ESTIMATE_SHIPPING_METHODS,
          variables: {
            input: {
              address: shippingAddress
            }
          }
        })
        .then(resp => {
          const values = {
            shippingAddress
          } as CheckoutLogicData;

          // if billing is set to the same as shipping then set it also to received value
          if (this.state.values.billingSameAsShipping) {
            values.billingAddress = shippingAddress;
          }

          this.setPartialState({
            loading: false,
            values,
            availableShippingMethods: resp.data!.estimateShippingMethods
          });
        })
        .catch(error => {
          this.setPartialState({
            loading: false,
            error
          });
        });
    });
  };

  setShipping = (shippingMethod: CheckoutShippingMethod) => {
    this.setLoading(true, () => {
      // trigger mutation that will reutrn available payment options
      this.props.client
        .mutate({
          mutation: SET_SHIPPING,
          // refetch cart because totals have changed once shipping has been selected
          refetchQueries: ['Cart'],
          awaitRefetchQueries: true,
          variables: {
            input: {
              billingAddress: this.state.values.billingAddress,
              shippingAddress: this.state.values.shippingAddress,
              ...this.getShippingMethodData(shippingMethod)
            }
          }
        })
        .then(resp => {
          this.setPartialState({
            loading: false,
            values: { shippingMethod },
            availablePaymentMethods: resp.data!.setShipping.paymentMethods
          });
        })
        .catch(error => {
          this.setPartialState({
            loading: false,
            error
          });
        });
    });
  };

  placeOrder = () => {
    this.setLoading(true, () => {
      this.props.client
        .mutate({
          mutation: PLACE_ORDER,
          // update cart once order is placed successfully
          refetchQueries: ['Cart'],
          awaitRefetchQueries: true,
          variables: {
            input: {
              email: this.state.values.email,
              paymentMethod: {
                method: this.state.values.paymentMethod!.code
              }
            }
          }
        })
        .then(resp => {
          this.setPartialState({
            loading: false,
            orderId: resp.data && resp.data.placeOrder.orderId
          });
        })
        .catch(error => {
          this.setPartialState({
            loading: false,
            error
          });
        });
    });
  };

  render() {
    return (
      <CartQuery>
        {({ cart }) => {
          if (this.state.orderId) {
            // order has been placed successfully so we show confirmation
            return <Redirect to="/checkout/confirmation" />;
          } else if (!cart.items.length) {
            // cart is empty, so checkout route shouldn't be presented
            return <Redirect to="/" />;
          }
          return (
            <React.Fragment>
              {this.props.children({
                loading: this.state.loading,
                values: this.state.values,
                orderId: this.state.orderId,
                availablePaymentMethods: this.state.availablePaymentMethods,
                availableShippingMethods: this.state.availableShippingMethods,
                setEmail: this.setEmail,
                setShippingAddress: this.setShippingAddress,
                setBillingAddress: this.setBillingAddress,
                setBillingSameAsShipping: this.setBillingSameAsShipping,
                setShipping: this.setShipping,
                setPayment: this.setPayment,
                placeOrder: this.placeOrder
              })}
            </React.Fragment>
          );
        }}
      </CartQuery>
    );
  }
}

export const CheckoutLogic = withApollo(CheckoutLogicImpl);

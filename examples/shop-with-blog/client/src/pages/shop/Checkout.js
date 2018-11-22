import React from 'react';
import { Box, H2, Button, Divider } from '@deity/falcon-ui';
import { CheckoutLogic, CartQuery, toGridTemplate } from '@deity/falcon-ecommerce-uikit';
import CheckoutCartSummary from './Checkout/components/CheckoutCartSummary';
import CustomerSelector from './Checkout/components/CustomerSelector';
import ShippingSection from './Checkout/components/ShippingSection';
import PaymentSection from './Checkout/components/PaymentSection';
import AddressSection from './Checkout/components/AddressSection';

const CheckoutArea = {
  checkout: 'checkout',
  cart: 'cart',
  divider: 'divider'
};

const checkoutLayout = {
  checkoutLayout: {
    display: 'grid',
    gridGap: 'lg',
    my: 'lg',
    px: {
      sm: 'none',
      md: 'xxxl'
    },
    // prettier-ignore
    gridTemplate: {
      xs: toGridTemplate([
        ['1fr'                ],
        [CheckoutArea.cart    ],
        [CheckoutArea.divider ],
        [CheckoutArea.checkout]
      ]),
      md: toGridTemplate([
        ['2fr',                 '1px',               '1fr'             ],
        [CheckoutArea.checkout, CheckoutArea.divider, CheckoutArea.cart]
      ])
    },
    css: ({ theme }) => ({
      // remove default -/+ icons in summary element
      'details summary:after': {
        display: 'none'
      },
      'details summary:active, details summary:focus': {
        outline: 'none'
      },
      'details summary': {
        paddingRight: theme.spacing.xxl
      },
      'details article': {
        paddingLeft: theme.spacing.xxl,
        paddingRight: theme.spacing.xxl
      }
    })
  }
};

class CheckoutWizard extends React.Component {
  state = {
    currentStep: 1
  };

  setCurrentStep = currentStep => this.setState({ currentStep });
  goToNextStep = () => this.setState(state => ({ currentStep: state.currentStep + 1 }));

  render() {
    const { currentStep } = this.state;
    return (
      <CheckoutLogic>
        {({
          values,
          availableShippingMethods,
          availablePaymentMethods,
          setEmail,
          setShippingAddress,
          setBillingAddress,
          setBillingSameAsShipping,
          setShipping,
          setPayment,
          placeOrder
        }) => (
          <Box defaultTheme={checkoutLayout}>
            <Box gridArea={CheckoutArea.cart}>
              <H2 fontSize="md">Summary</H2>
              <CartQuery>{({ cart }) => <CheckoutCartSummary cart={cart} />}</CartQuery>
            </Box>
            <Divider gridArea={CheckoutArea.divider} />
            <Box gridArea={CheckoutArea.checkout}>
              <CustomerSelector
                open={currentStep === 1}
                onEditRequested={() => this.setCurrentStep(1)}
                email={values.email}
                setEmail={email => {
                  setEmail(email);
                  this.goToNextStep();
                }}
              />

              <Divider my="md" />

              <AddressSection
                open={currentStep === 2}
                title="Shipping address"
                submitLabel="Continue"
                selectedAddress={values.shippingAddress}
                setAddress={address => {
                  setShippingAddress(address);
                  this.goToNextStep();
                }}
                onEditRequested={() => this.setCurrentStep(2)}
              />

              <Divider my="md" />

              <AddressSection
                open={currentStep === 3}
                title="Billing address"
                submitLabel="Continue"
                selectedAddress={values.billingAddress}
                setAddress={address => {
                  setBillingAddress(address);
                  this.goToNextStep();
                }}
                setUseDefault={value => {
                  setBillingSameAsShipping(value);
                  this.goToNextStep();
                }}
                onEditRequested={() => this.setCurrentStep(3)}
                useDefault={values.billingSameAsShipping}
                labelUseDefault="My billing address is the same as shipping"
              />

              <Divider my="md" />

              <ShippingSection
                open={currentStep === 4}
                shippingAddress={values.shippingAddress}
                selectedShipping={values.shippingMethod}
                setShippingAddress={setShippingAddress}
                availableShippingMethods={availableShippingMethods}
                onEditRequested={() => this.setCurrentStep(4)}
                setShipping={shipping => {
                  setShipping(shipping);
                  this.goToNextStep();
                }}
              />

              <Divider my="md" />

              <PaymentSection
                open={currentStep === 5}
                selectedPayment={values.paymentMethod}
                availablePaymentMethods={availablePaymentMethods}
                onEditRequested={() => this.setCurrentStep(5)}
                setPayment={payment => {
                  setPayment(payment);
                  this.goToNextStep();
                }}
              />

              <Divider my="md" />

              {currentStep === 6 && <Button onClick={placeOrder}>Place order</Button>}
            </Box>
          </Box>
        )}
      </CheckoutLogic>
    );
  }
}

export const CheckoutPage = () => <CheckoutWizard />;

export default CheckoutPage;

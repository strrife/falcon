import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, H2, Button, Divider, Icon } from '@deity/falcon-ui';
import { CheckoutLogic, CartQuery, toGridTemplate } from '@deity/falcon-ecommerce-uikit';
import CheckoutCartSummary from './Checkout/components/CheckoutCartSummary';
import CustomerSelector from './Checkout/components/CustomerSelector';
import ShippingSection from './Checkout/components/ShippingSection';
import PaymentSection from './Checkout/components/PaymentSection';
import AddressSection from './Checkout/components/AddressSection';

const CHECKOUT_STEPS = {
  EMAIL: 'EMAIL',
  SHIPPING_ADDRESS: 'SHIPPING_ADDRESS',
  BILLING_ADDRESS: 'BILLING_ADDRESS',
  SHIPPING: 'SHIPPING',
  PAYMENT: 'PAYMENT',
  CONFIRMATION: 'CONFIRMATION'
};

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
        [CheckoutArea.checkout],
        [CheckoutArea.divider ],
        [CheckoutArea.cart    ]
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

// loader that covers content of the container (container must have position: relative/absolute)
const Loader = ({ visible }) => (
  <Box
    css={{
      position: 'absolute',
      display: visible ? 'flex' : 'none',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.7)',
      height: '100%',
      width: '100%'
    }}
  >
    <Icon src="loader" />
  </Box>
);

// helper that computes step that should be open based on values from CheckoutLogic
const computeStepFromValues = values => {
  if (!values.email) {
    return CHECKOUT_STEPS.EMAIL;
  } else if (!values.shippingAddress) {
    return CHECKOUT_STEPS.SHIPPING_ADDRESS;
  } else if (!values.billingAddress) {
    return CHECKOUT_STEPS.BILLING_ADDRESS;
  } else if (!values.shippingMethod) {
    return CHECKOUT_STEPS.SHIPPING;
  } else if (!values.paymentMethod) {
    return CHECKOUT_STEPS.PAYMENT;
  }
  return CHECKOUT_STEPS.CONFIRMATION;
};

class CheckoutWizard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: CHECKOUT_STEPS.EMAIL,
      getCurrentProps: () => this.props // eslint-disable-line react/no-unused-state
    };
  }

  static getDerivedStateFromProps(nextProps, currentState) {
    const { checkoutData: currentPropsData } = currentState.getCurrentProps();
    const currentStepFromProps = computeStepFromValues(currentPropsData.values);
    const nextStepFromProps = computeStepFromValues(nextProps.checkoutData.values);

    const changedStep = { currentStep: nextStepFromProps };

    // if there's no step set yet then set it correctly
    if (!currentState.currentStep) {
      return changedStep;
    }

    // if loading has finished (changed from true to false) and there's no error then enforce current step
    // to value computed from the next props - this ensures that if user requested edit of particular step
    // then and it has been processed then we want to display step based on actual values from CheckoutLogic
    if (currentPropsData.loading && !nextProps.checkoutData.loading && !nextProps.checkoutData.error) {
      return changedStep;
    }

    // if step computed from props has changed then use it as new step
    if (nextStepFromProps !== currentStepFromProps) {
      return changedStep;
    }

    return null;
  }

  setCurrentStep = currentStep => this.setState({ currentStep });

  render() {
    const { currentStep } = this.state;
    const {
      values,
      loading,
      availableShippingMethods,
      availablePaymentMethods,
      setEmail,
      setShippingAddress,
      setBillingAddress,
      setBillingSameAsShipping,
      setShipping,
      setPayment,
      placeOrder
    } = this.props.checkoutData;

    return (
      <Box defaultTheme={checkoutLayout}>
        <Box gridArea={CheckoutArea.cart}>
          <H2 fontSize="md" mb="md">
            Summary
          </H2>
          <CartQuery>{({ cart }) => <CheckoutCartSummary cart={cart} />}</CartQuery>
          <Button as={RouterLink} mt="md" to="/cart">
            Edit cart items
          </Button>
        </Box>
        <Divider gridArea={CheckoutArea.divider} />
        <Box gridArea={CheckoutArea.checkout} position="relative">
          <Loader visible={loading} />
          <CustomerSelector
            open={currentStep === CHECKOUT_STEPS.EMAIL}
            onEditRequested={() => this.setCurrentStep(CHECKOUT_STEPS.EMAIL)}
            email={values.email}
            setEmail={setEmail}
          />

          <Divider my="md" />

          <AddressSection
            open={currentStep === CHECKOUT_STEPS.SHIPPING_ADDRESS}
            onEditRequested={() => this.setCurrentStep(CHECKOUT_STEPS.SHIPPING_ADDRESS)}
            title="Shipping address"
            submitLabel="Continue"
            selectedAddress={values.shippingAddress}
            setAddress={setShippingAddress}
          />

          <Divider my="md" />

          <AddressSection
            open={currentStep === CHECKOUT_STEPS.BILLING_ADDRESS}
            onEditRequested={() => this.setCurrentStep(CHECKOUT_STEPS.BILLING_ADDRESS)}
            title="Billing address"
            submitLabel="Continue"
            selectedAddress={values.billingAddress}
            setAddress={setBillingAddress}
            setUseDefault={setBillingSameAsShipping}
            useDefault={values.billingSameAsShipping}
            labelUseDefault="My billing address is the same as shipping"
          />

          <Divider my="md" />

          <ShippingSection
            open={currentStep === CHECKOUT_STEPS.SHIPPING}
            onEditRequested={() => this.setCurrentStep(CHECKOUT_STEPS.SHIPPING)}
            shippingAddress={values.shippingAddress}
            selectedShipping={values.shippingMethod}
            setShippingAddress={setShippingAddress}
            availableShippingMethods={availableShippingMethods}
            setShipping={setShipping}
          />

          <Divider my="md" />

          <PaymentSection
            open={currentStep === CHECKOUT_STEPS.PAYMENT}
            onEditRequested={() => this.setCurrentStep(CHECKOUT_STEPS.PAYMENT)}
            selectedPayment={values.paymentMethod}
            availablePaymentMethods={availablePaymentMethods}
            setPayment={setPayment}
          />

          <Divider my="md" />

          {currentStep === CHECKOUT_STEPS.CONFIRMATION && <Button onClick={placeOrder}>Place order</Button>}
        </Box>
      </Box>
    );
  }
}

const CheckoutPage = () => (
  <CheckoutLogic>{checkoutData => <CheckoutWizard checkoutData={checkoutData} />}</CheckoutLogic>
);

export default CheckoutPage;

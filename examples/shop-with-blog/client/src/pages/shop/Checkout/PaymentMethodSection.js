import React from 'react';
import PropTypes from 'prop-types';
import { Details, DetailsContent, Text, Button } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import loadable from 'src/components/loadable';
import SectionHeader from './CheckoutSectionHeader';
import ErrorList from '../components/ErrorList';

const PaymentSelector = loadable(() => import(/* webpackChunkName: "shop/payments" */ './PaymentSelector'));

class PaymentSection extends React.Component {
  state = {
    selectedPayment: null
  };

  onPaymentSelected = selectedPayment => this.setState({ selectedPayment });

  submitPayment = () => {
    this.props.setPayment(this.state.selectedPayment);
  };

  render() {
    const { addressInput, open, selectedPayment, onEditRequested, availablePaymentMethods, errors } = this.props;
    let header;
    if (!open && selectedPayment) {
      header = (
        <SectionHeader
          title={<T id="checkout.payment" />}
          onActionClick={onEditRequested}
          editLabel={<T id="edit" />}
          complete
          summary={<Text>{selectedPayment.title}</Text>}
        />
      );
    } else {
      header = <SectionHeader title={<T id="checkout.payment" />} />;
    }

    return (
      <Details open={open}>
        {header}
        <DetailsContent>
          {availablePaymentMethods.length === 0 ? (
            <Text color="error" mb="sm">
              <T id="checkout.noPaymentMethodsAvailable" />
            </Text>
          ) : (
            <PaymentSelector
              addressInput={addressInput}
              availableMethods={availablePaymentMethods}
              onPaymentSelected={this.onPaymentSelected}
            />
          )}
          <ErrorList errors={errors} />
          {availablePaymentMethods.length > 0 && (
            <Button disabled={!this.state.selectedPayment} onClick={this.submitPayment}>
              <T id="continue" />
            </Button>
          )}
        </DetailsContent>
      </Details>
    );
  }
}

PaymentSection.propTypes = {
  // Billing address form
  addressInput: PropTypes.element.isRequired,
  // flag that indicates if the section is currently open
  open: PropTypes.bool,
  // all available payment methods
  availablePaymentMethods: PropTypes.arrayOf(PropTypes.shape({})),
  // currently selected payment method
  selectedPayment: PropTypes.shape({}),
  // callback that should be called when user requests edit of this particular section
  onEditRequested: PropTypes.func,
  // callback that sets selected payment method
  setPayment: PropTypes.func,
  // errors passed from outside that should be displayed for this section
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string
    })
  )
};

export default PaymentSection;

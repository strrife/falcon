import React from 'react';
import PropTypes from 'prop-types';
import { Details, DetailsContent, Text, Button } from '@deity/falcon-ui';
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
          title="Payment"
          onActionClick={onEditRequested}
          editLabel="Edit"
          complete
          summary={<Text>{selectedPayment.title}</Text>}
        />
      );
    } else {
      header = <SectionHeader title="Payment" />;
    }

    return (
      <Details open={open}>
        {header}
        <DetailsContent>
          {availablePaymentMethods.length && (
            <PaymentSelector
              addressInput={addressInput}
              availableMethods={availablePaymentMethods}
              onPaymentSelected={this.onPaymentSelected}
            />
          )}
          <ErrorList errors={errors} />
          <Button disabled={!this.state.selectedPayment} onClick={this.submitPayment}>
            Continue
          </Button>
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

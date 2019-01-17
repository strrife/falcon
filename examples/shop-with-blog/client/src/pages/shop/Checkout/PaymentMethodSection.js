import React from 'react';
import PropTypes from 'prop-types';
import { Box, FlexLayout, Label, Details, DetailsContent, Text, Radio, Button } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import SectionHeader from './CheckoutSectionHeader';
import ErrorList from '../components/ErrorList';

// we have to filter the methods until we have implementation for all of them
const ALLOWED_PAYMENT_METHODS = ['checkmo'];

const PaymentSelector = ({ availablePaymentMethods = [], onPaymentSelected }) => {
  const paymentMethods = availablePaymentMethods.filter(option => ALLOWED_PAYMENT_METHODS.includes(option.code));

  return (
    <Box my="md">
      {paymentMethods.map(x => (
        <FlexLayout key={x.code}>
          <Radio size="sm" name="payment" id={`opt-${x.code}`} value={x.code} onChange={() => onPaymentSelected(x)} />
          <Label mx="sm" flex="1" htmlFor={`opt-${x.code}`}>
            {x.title}
          </Label>
        </FlexLayout>
      ))}
    </Box>
  );
};

PaymentSelector.propTypes = {
  availablePaymentMethods: PropTypes.arrayOf(PropTypes.shape({})),
  onPaymentSelected: PropTypes.func
};

class PaymentSection extends React.Component {
  state = {
    selectedPayment: null
  };

  onPaymentSelected = selectedPayment => this.setState({ selectedPayment });

  submitPayment = () => {
    this.props.setPayment(this.state.selectedPayment);
  };

  render() {
    const { open, selectedPayment, onEditRequested, availablePaymentMethods, errors } = this.props;
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
              availablePaymentMethods={availablePaymentMethods}
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

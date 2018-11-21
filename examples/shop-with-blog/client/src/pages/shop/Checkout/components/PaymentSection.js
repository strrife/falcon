import React from 'react';
import PropTypes from 'prop-types';
import { Box, FlexLayout, Label, Details, DetailsContent, Text, Radio, Button } from '@deity/falcon-ui';
import SectionHeader from './CheckoutSectionHeader';

const PaymentSelector = ({ availablePaymentMethods = [], onPaymentSelected }) => (
  <Box mt="md">
    {availablePaymentMethods.map(option => (
      <FlexLayout key={option.code}>
        <Radio
          size="sm"
          name="payment"
          id={`opt-${option.code}`}
          value={option.code}
          onChange={() => onPaymentSelected(option)}
        />
        <Label mx="sm" flex="1" htmlFor={`opt-${option.code}`}>
          {option.title}
        </Label>
      </FlexLayout>
    ))}
  </Box>
);

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
    const { open, selectedPayment, onEditRequested, availablePaymentMethods } = this.props;
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
          <PaymentSelector
            availablePaymentMethods={availablePaymentMethods}
            onPaymentSelected={this.onPaymentSelected}
          />
          <Button disabled={!this.state.selectedPayment} onClick={this.submitPayment}>
            Continue
          </Button>
        </DetailsContent>
      </Details>
    );
  }
}

PaymentSection.propTypes = {
  open: PropTypes.bool,
  availablePaymentMethods: PropTypes.arrayOf(PropTypes.shape({})),
  selectedPayment: PropTypes.shape({}),
  onEditRequested: PropTypes.func,
  setPayment: PropTypes.func
};

export default PaymentSection;

import React from 'react';
import CreditCardInput from 'react-credit-card-input';
import { Input } from '@deity/falcon-ui';

export default class CreditCart extends React.Component {
  state = {
    number: '',
    expiry: '',
    cvc: ''
  };

  render() {
    return (
      <CreditCardInput
        inputComponent={Input}
        cardNumberInputProps={{
          value: this.state.number,
          onChange: ({ target: { value: number } }) => this.setState({ number })
        }}
        cardExpiryInputProps={{
          value: this.state.expiry,
          onChange: ({ target: { value: expiry } }) => this.setState({ expiry })
        }}
        cardCVCInputProps={{
          value: this.state.cvc,
          onChange: ({ target: { value: cvc } }) => this.setState({ cvc })
        }}
      />
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import CreditCardInput from 'react-credit-card-input';
import { Box, Input, Label } from '@deity/falcon-ui';

class CreditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: undefined,
      expiry: undefined,
      cvc: undefined,
      name: undefined
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { number: prevNumber, expiry: prevExpiry, cvc: prevCvc, name: prevName } = prevState;
    const { number, expiry, cvc, name } = this.state;

    if (
      number &&
      expiry &&
      cvc &&
      name &&
      (prevNumber !== number || prevCvc !== cvc || prevExpiry !== expiry || prevName !== name)
    ) {
      this.props.onCompletion(this.state);
    }
  }

  render() {
    return (
      <Box>
        <Box my="xs">
          <Label htmlFor="cc-name">Name on card</Label>
          <Input
            my="xs"
            autoComplete="cc-name"
            name="cc-name"
            value={this.state.name}
            css={({ theme }) => ({
              fontSize: theme.fontSizes.sm
            })}
            onChange={({ target: { value: name } }) => this.setState({ name })}
          />
        </Box>
        <Box
          css={({ theme }) => ({
            'div#field-wrapper': {
              border: '1px solid',
              borderColor: theme.colors.secondaryDark
            }
          })}
        >
          <CreditCardInput
            inputComponent={Input}
            cardNumberInputProps={{
              value: this.state.number,
              onChange: ({ target: { value: number } }) => {
                this.setState({ number });
              }
            }}
            cardExpiryInputProps={{
              value: this.state.expiry,
              onChange: ({ target: { value: expiry } }) => {
                this.setState({ expiry });
              }
            }}
            cardCVCInputProps={{
              value: this.state.cvc,
              onChange: ({ target: { value: cvc } }) => {
                this.setState({ cvc });
              }
            }}
          />
        </Box>
      </Box>
    );
  }
}

CreditCard.propTypes = {
  onCompletion: PropTypes.func.isRequired
};

export default CreditCard;

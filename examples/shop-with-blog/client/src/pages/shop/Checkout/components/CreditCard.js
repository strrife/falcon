import React from 'react';
import PropTypes from 'prop-types';
import CreditCardInput from 'react-credit-card-input';
import { Box, Input, withTheme, themed } from '@deity/falcon-ui';
import { I18n } from '@deity/falcon-i18n';

const CreditCardLayout = themed({
  tag: Box,
  defaultTheme: {
    creditCardLayout: {
      css: ({ theme }) => ({
        'label:after': {
          paddingLeft: theme.spacing.sm,
          paddingRight: theme.spacing.sm
        },
        input: {
          fontSize: theme.fontSizes.sm
        }
      })
    }
  }
});

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
    const { theme } = this.props;

    return (
      <I18n>
        {t => (
          <CreditCardLayout>
            <Box my="xs">
              <Input
                my="xs"
                autoComplete="cc-name"
                name="cc-name"
                placeholder={t('creditCard.name')}
                value={this.state.name}
                onChange={({ target: { value: name } }) => {
                  this.setState({ name });
                }}
              />
            </Box>
            <CreditCardInput
              customTextLabels={{
                expiryError: {
                  invalidExpiryDate: t('creditCard.errors.invalidExpiryDate'),
                  monthOutOfRange: t('creditCard.errors.monthOutOfRange'),
                  yearOutOfRange: t('creditCard.errors.yearOutOfRange'),
                  dateOutOfRange: t('creditCard.errors.dateOutOfRange')
                },
                invalidCardNumber: t('creditCard.errors.invalidCardNumber'),
                invalidCvc: t('creditCard.errors.invalidCvc'),
                cardNumberPlaceholder: t('creditCard.number'),
                expiryPlaceholder: t('creditCard.expiry'),
                cvcPlaceholder: t('creditCard.cvc')
              }}
              fieldStyle={{ border: '1px solid', borderColor: theme.colors.secondaryDark }}
              cardNumberInputProps={{
                value: this.state.number,
                onChange: ({ target: { value: number } }) => {
                  this.setState({ number });
                }
              }}
              cardNumberInputRenderer={({ handleCardNumberChange, props }) => (
                <Input {...props} onChange={handleCardNumberChange()} />
              )}
              cardExpiryInputProps={{
                value: this.state.expiry,
                onChange: ({ target: { value: expiry } }) => {
                  this.setState({ expiry });
                }
              }}
              cardExpiryInputRenderer={({ handleCardExpiryChange, props }) => (
                <Input {...props} onChange={handleCardExpiryChange()} />
              )}
              cardCVCInputProps={{
                value: this.state.cvc,
                onChange: ({ target: { value: cvc } }) => {
                  this.setState({ cvc });
                }
              }}
              cardCVCInputRenderer={({ handleCardCVCChange, props }) => (
                <Input {...props} onChange={handleCardCVCChange()} />
              )}
            />
          </CreditCardLayout>
        )}
      </I18n>
    );
  }
}

CreditCard.propTypes = {
  onCompletion: PropTypes.func.isRequired
};

export default withTheme(CreditCard);

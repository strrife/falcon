import React from 'react';
import PropTypes from 'prop-types';
import { Details, DetailsContent, Text, Button, FlexLayout, Radio, Label, Image } from '@deity/falcon-ui';
import { I18n, T } from '@deity/falcon-i18n';
import { TwoStepWizard } from '@deity/falcon-ecommerce-uikit';
import { SimplePayment } from '@deity/falcon-payment-plugin';
import AdyenCCPlugin from '@deity/falcon-adyen-plugin';
import PayPalExpressPlugin from '@deity/falcon-paypal-plugin';
import SectionHeader from './CheckoutSectionHeader';
import ErrorList from '../components/ErrorList';
import CreditCard from '../components/CreditCard';

const paymentPlugins = {
  adyen_cc: AdyenCCPlugin,
  paypal_express: PayPalExpressPlugin,
  checkmo: SimplePayment
};

class PaymentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPayment: null,
      additionalData: null
    };
  }

  onPaymentSelected = (selectedPayment, additionalData) => this.setState({ selectedPayment, additionalData });

  submitPayment = () => {
    this.props.setPayment(this.state.selectedPayment, this.state.additionalData);
  };

  render() {
    const { open, selectedPayment, onEditRequested, availablePaymentMethods, errors } = this.props;
    let header;
    if (!open && selectedPayment) {
      header = (
        <I18n>
          {t => (
            <SectionHeader
              title={t('checkout.payment')}
              onActionClick={onEditRequested}
              editLabel={t('edit')}
              complete
              summary={<Text>{selectedPayment.title}</Text>}
            />
          )}
        </I18n>
      );
    } else {
      header = <I18n>{t => <SectionHeader title={t('checkout.payment')} />}</I18n>;
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
            <TwoStepWizard>
              {({ selectedOption, selectOption }) => {
                const picker = (
                  <React.Fragment>
                    {availablePaymentMethods
                      // render only methods that we have implementation for
                      .filter(payment => payment.code in paymentPlugins)
                      // render picker - simple radio buttons with icons for now
                      .map(payment => (
                        <FlexLayout key={payment.code} my="xs" css={{ alignItems: 'center' }}>
                          <Radio
                            size="sm"
                            name="payment"
                            id={`opt-${payment.code}`}
                            value={payment}
                            onChange={() => selectOption(payment.code)}
                          />
                          <Label mx="sm" flex="1" htmlFor={`opt-${payment.code}`}>
                            {paymentPlugins[payment.code].icon && (
                              <Image
                                src={paymentPlugins[payment.code].icon}
                                mr="xs"
                                mb="xs"
                                css={{ verticalAlign: 'middle' }}
                              />
                            )}
                            {payment.title}
                          </Label>
                        </FlexLayout>
                      ))}
                  </React.Fragment>
                );

                const activePayment = availablePaymentMethods.find(item => item.code === selectedOption);
                const paymentConfig = (activePayment && activePayment.config) || {};
                const onPaymentDetailsReady = additionalData =>
                  this.onPaymentSelected(activePayment, additionalData || {});

                let details = null;
                if (selectedOption === 'adyen_cc') {
                  details = (
                    <AdyenCCPlugin config={paymentConfig} onPaymentDetailsReady={onPaymentDetailsReady}>
                      {({ setCreditCardData }) => (
                        <FlexLayout my="md" css={{ width: '100%' }}>
                          <CreditCard onCompletion={setCreditCardData} />
                        </FlexLayout>
                      )}
                    </AdyenCCPlugin>
                  );
                } else if (selectedOption === 'paypal_express') {
                  details = (
                    <PayPalExpressPlugin onPaymentDetailsReady={onPaymentDetailsReady} config={paymentConfig} />
                  );
                } else if (selectedOption === 'checkmo') {
                  details = <SimplePayment onPaymentDetailsReady={onPaymentDetailsReady} />;
                }

                return (
                  <React.Fragment>
                    {picker}
                    {details}
                  </React.Fragment>
                );
              }}
            </TwoStepWizard>
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

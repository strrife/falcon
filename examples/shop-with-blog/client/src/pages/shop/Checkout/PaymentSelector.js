import React from 'react';
import PropTypes from 'prop-types';
import { Box, FlexLayout, Label, Radio, Image } from '@deity/falcon-ui';
import { ConfigQuery } from '@deity/falcon-ecommerce-uikit';
import { Payment, PlainPayment } from '@deity/falcon-payment-plugin';
import AdyenCCPlugin from '@deity/falcon-adyen-plugin';
import PayPalExpressPlugin from '@deity/falcon-paypal-plugin';
import CreditCard from './../components/CreditCard';

const PluginTemplate = ({ creditCardInput }) => (
  <React.Fragment>
    {creditCardInput && (
      <Box my="md" css={{ width: '100%' }}>
        <FlexLayout>{creditCardInput}</FlexLayout>
      </Box>
    )}
  </React.Fragment>
);

export default class PaymentSelector extends React.PureComponent {
  render() {
    const { availableMethods = [], onPaymentSelected } = this.props;
    return (
      <ConfigQuery variables={{ key: 'plugins.payments' }}>
        {({ getConfig: paymentsConfig }) => (
          <Box my="md">
            <Payment
              creditCardInput={CreditCard}
              template={PluginTemplate}
              onPaymentSelected={onPaymentSelected}
              plugins={{
                adyen_cc: AdyenCCPlugin,
                paypal_express: PayPalExpressPlugin,
                checkmo: PlainPayment
              }}
              methods={availableMethods}
              paymentsConfig={paymentsConfig}
            >
              {({ code, title, onSelect, icon, pluginComponent }) => (
                <FlexLayout key={code} my="xs" css={{ alignItems: 'center' }}>
                  <Radio size="sm" name="payment" id={`opt-${code}`} value={code} onChange={onSelect} />
                  <Label mx="sm" flex="1" htmlFor={`opt-${code}`}>
                    {icon && <Image src={icon} mr="xs" mb="xs" css={{ verticalAlign: 'middle' }} />}
                    {title}
                  </Label>
                  {pluginComponent}
                </FlexLayout>
              )}
            </Payment>
          </Box>
        )}
      </ConfigQuery>
    );
  }
}

PaymentSelector.propTypes = {
  availableMethods: PropTypes.arrayOf(PropTypes.shape({})),
  onPaymentSelected: PropTypes.func,
  paymentsConfigQuery: PropTypes.shape({})
};

import React from 'react';
import { PaymentPluginModel } from '@deity/falcon-payment-plugin';

export class PayPalPlugin extends PaymentPluginModel {
  static icon: string = 'https://www.paypalobjects.com/webstatic/en_US/i/buttons/pp-acceptance-medium.png';

  componentDidMount() {
    this.props.onPaymentDetailsReady();
  }

  render() {
    return null;
  }
}

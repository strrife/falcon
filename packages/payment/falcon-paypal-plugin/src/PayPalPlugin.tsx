import React from 'react';
import { PluginModel } from '@deity/falcon-payment-plugin';

export class PayPalPlugin extends PluginModel {
  static icon: string = 'https://www.paypalobjects.com/webstatic/en_US/i/buttons/pp-acceptance-medium.png';

  componentDidMount() {
    this.props.onPaymentSelected();
  }

  render() {
    return <React.Fragment />;
  }
}

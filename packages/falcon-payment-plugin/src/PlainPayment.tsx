import React from 'react';
import { PluginModel } from './components/Plugin';

export class PlainPayment extends PluginModel {
  componentDidMount() {
    this.props.onPaymentSelected();
  }

  render() {
    return <React.Fragment />;
  }
}

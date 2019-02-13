import React from 'react';
import { PluginModel } from './models/Plugin';

export class PlainPayment extends PluginModel {
  componentDidMount() {
    this.props.onPaymentSelected();
  }

  render() {
    return <React.Fragment />;
  }
}

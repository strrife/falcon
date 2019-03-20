import React from 'react';
import { PluginModel } from './components/Plugin';

export class SimplePayment extends PluginModel {
  componentDidMount() {
    this.props.onPaymentDetailsReady();
  }

  render() {
    return null;
  }
}

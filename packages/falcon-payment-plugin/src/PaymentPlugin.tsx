import React from 'react';
import { PaymentPluginComponentProps } from './types';

export class PaymentPluginModel<
  P extends PaymentPluginComponentProps = PaymentPluginComponentProps,
  S = {}
> extends React.Component<P, S> {
  static icon?: string;
}

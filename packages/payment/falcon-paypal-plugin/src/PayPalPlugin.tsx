import React from 'react';
import { SimplePayment } from '@deity/falcon-payment-plugin';

export class PayPalPlugin extends SimplePayment {
  static icon: string = 'https://www.paypalobjects.com/webstatic/en_US/i/buttons/pp-acceptance-medium.png';
}

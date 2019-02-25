import React from 'react';
import { PluginModel, PluginModelProps } from '@deity/falcon-payment-plugin';

const adyen = require('adyen-cse-web');

export type AdyenProps = PluginModelProps & {
  config: {
    key: string;
  };
};

export interface CreditCardData {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
}

export class AdyenCCPlugin extends PluginModel<AdyenProps> {
  static icon: string =
    'https://raw.githubusercontent.com/Adyen/adyen-magento2/develop/view/base/web/images/logos/creditcard.png';
  private cseInstance: any;

  constructor(props: AdyenProps) {
    super(props);

    const { key } = this.props.config;
    this.cseInstance = adyen.createEncryption(key, {});
  }

  encryptCreditCard({ number, expiry, cvc, name }: CreditCardData) {
    const expiryMonth = expiry.split('/')[0].trim();
    let expiryYear = expiry.split('/')[1].trim();
    if (expiryYear.length === 2) {
      // Adding `20xx` prefix for 2-digit year
      expiryYear = `20${expiryYear}`;
    }

    const creditCard = {
      holderName: name,
      number: number.replace(/ /g, ''),
      cvc,
      expiryMonth,
      expiryYear,
      generationtime: new Date().toISOString()
    };
    const encryptedData = this.cseInstance.encrypt(creditCard);
    if (encryptedData) {
      this.props.onPaymentSelected({
        // cc_type: "VI",
        encrypted_data: encryptedData,
        store_cc: false
      });
    }
  }

  render() {
    const CreditCardInput = this.props.creditCardInput;
    const CreditCardInputOutput = (
      // @ts-ignore
      <CreditCardInput onCompletion={(creditCardData: CreditCardData) => this.encryptCreditCard(creditCardData)} />
    );

    return this.props.template({
      creditCardInput: CreditCardInputOutput
    });
  }
}

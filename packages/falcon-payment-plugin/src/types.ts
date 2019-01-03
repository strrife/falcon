export enum PaymentType {
  plain = 'plain',
  creditCard = 'creditCard',
  redirect = 'redirect'
}

export type CreditCardProps = {};

export type BillingAddressProps = {};

export type PaymentPluginProps = {
  children: (methodConfig: MethodConfig, onSelect: SelectMethodCallback) => React.ReactNode;
  methods: Array<MethodConfig>;
  billingAddressInput: React.ComponentType<BillingAddressProps>;
  creditCardInput: React.ComponentType<CreditCardProps>;
  paymentsConfig: {
    [key: string]: any;
  };
};

export type PaymentPluginState = {
  selected: null | string;
};

export type MethodConfig = {
  code: string;
  title: string;
  type: PaymentType;
};

export type SelectMethodCallback = () => any;

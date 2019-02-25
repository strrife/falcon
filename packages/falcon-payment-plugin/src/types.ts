import { PluginModel } from './models/Plugin';

export type CreditCardProps = {
  onCompletion: () => {};
};

export type BillingAddressProps = {};

export type MethodConfig = {
  code: string;
  title: string;
};

export type PaymentChildrenProps = MethodConfig & {
  icon: string | null;
  pluginComponent?: React.ReactType;
  onSelect: () => any;
};

declare type PaymentProps = {
  template: (args: any) => React.ReactNode;
  billingAddressInput?: React.ComponentType<BillingAddressProps>;
  creditCardInput?: React.ComponentType<CreditCardProps>;
};

export type PluginModelProps = {
  config?: {
    [key: string]: any;
  };
  onPaymentSelected: (additionalData?: any) => {};
} & PaymentProps;

export type PaymentPluginProps = {
  children: (childrenProps: PaymentChildrenProps) => React.ReactNode | null;
  methods: Array<MethodConfig>;
  paymentsConfig: {
    [key: string]: any;
  };
  plugins: {
    [key: string]: PluginModel;
  };
  onPaymentSelected: (method: MethodConfig, additionalData: any) => {};
} & PaymentProps;

export type PaymentPluginState = {
  active: null | string;
};

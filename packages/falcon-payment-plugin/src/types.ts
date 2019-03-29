export type PaymentPluginComponentProps = {
  config?: {
    [key: string]: any;
  };
  onPaymentDetailsReady: (additionalData?: any) => any;
};

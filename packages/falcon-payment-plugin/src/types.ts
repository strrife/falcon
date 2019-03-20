export type PluginComponentProps = {
  config?: {
    [key: string]: any;
  };
  onPaymentDetailsReady: (additionalData?: any) => any;
};

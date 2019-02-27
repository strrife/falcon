import React from 'react';
import { PluginModel } from './components/Plugin';
import { MethodConfig, PaymentPluginProps, PaymentPluginState } from './types';

export class Payment extends React.Component<PaymentPluginProps, PaymentPluginState> {
  constructor(props: PaymentPluginProps) {
    super(props);
    this.state = {
      active: null
    };
  }

  onActiveSelected(method: MethodConfig) {
    this.setState({
      active: method.code
    });
  }

  renderOption(method: MethodConfig) {
    const Plugin: PluginModel | null = method.code in this.props.plugins ? this.props.plugins[method.code] : null;
    const SelectedPlugin: PluginModel | null = (this.state.active === method.code && Plugin) || null;
    const pluginConfig = method.code in this.props.paymentsConfig ? this.props.paymentsConfig[method.code] : {};

    return this.props.children({
      ...method,
      // @ts-ignore
      pluginComponent: SelectedPlugin && (
        // @ts-ignore
        <SelectedPlugin
          config={pluginConfig}
          creditCardInput={this.props.creditCardInput}
          template={this.props.template}
          onPaymentSelected={(additionalData: any = {}) => this.props.onPaymentSelected(method, additionalData)}
        />
      ),
      // @ts-ignore ignoring "static member of type" error
      icon: Plugin && Plugin.icon,
      onSelect: () => this.onActiveSelected(method)
    });
  }

  render() {
    return this.props.methods.map(method => this.renderOption(method));
  }
}

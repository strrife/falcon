import React from 'react';

/**
 * Available options that can be changed
 */
type TOptionType = 'configurableOption' | 'bundleOption';

/**
 * Change source - currently only React.ChangeEvent is supported so only change from UI can be handled
 */
type THandleChangeParam = React.ChangeEvent<any>;

/**
 * Properties injected to render prop function
 */
type TProductConfiguratorInjectedProps = {
  /**
   *
   * @param type - type of the changed option (currently only configurable products are supported so 'configurableOption' goes here)
   * @param ev - change event
   */
  handleProductConfigurationChange(type: TOptionType, ev: THandleChangeParam): void;
  /**
   * Helper that allows to check if a particular option is already selected
   * @param type - type of option to check
   * @param name - name of option to check
   * @param value  - value to check
   */
  isValueSelected(type: TOptionType, name: string, value: any): boolean;
};

type TProductConfiguratorProps = {
  /**
   * Handler which will be called when option change has been processed and we have final state after change that can be submitted
   * @param name - name of changed option
   * @param value - final value of changed option
   */
  onChange(name: string, value: any): void;
  /**
   * Render prop function that should return valid react element
   * @param props - props passed to render function
   */
  children(props: TProductConfiguratorInjectedProps): any;
};

type TProductConfiguratorState = {
  selectedConfigurableOptions: { [name: string]: any };
};

export class ProductConfigurator extends React.Component<TProductConfiguratorProps, TProductConfiguratorState> {
  state: TProductConfiguratorState = {
    selectedConfigurableOptions: {}
  };

  handleConfigurationOptionChange(name: string, value: any) {
    this.setState(
      (state: TProductConfiguratorState) => ({
        selectedConfigurableOptions: {
          ...state.selectedConfigurableOptions,
          [name]: value
        }
      }),
      () => {
        // when state is set then update form manager
        const configurableOptions = Object.entries(this.state.selectedConfigurableOptions).map(item => ({
          optionId: parseInt(item[0], 10),
          value: parseInt(item[1], 10)
        }));
        this.props.onChange('configurableOptions', configurableOptions);
      }
    );
  }

  handleProductConfigurationChange = (type: TOptionType, ev: THandleChangeParam) => {
    const { name, value } = ev.target;

    if (type === 'configurableOption') {
      this.handleConfigurationOptionChange(name, value);
    }
  };

  isValueSelected = (type: TOptionType, name: string, value: any): boolean => {
    if (type === 'configurableOption') {
      return this.state.selectedConfigurableOptions.get(name) === value;
    }
    return false;
  };

  render() {
    return this.props.children({
      handleProductConfigurationChange: this.handleProductConfigurationChange,
      isValueSelected: this.isValueSelected
    });
  }
}

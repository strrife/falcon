import { ConfigurableProductOption, ConfigurableOptionInput } from '@deity/falcon-shop-extension';

export const productConfigurableOptionsToForm = (
  configurableOptions: ConfigurableProductOption[]
): { [attributeId: string]: any } =>
  configurableOptions.map(x => x.attributeId).reduce((prev, x) => ({ ...prev, [x]: undefined }), {});

export const formProductConfigurableOptionsToInput = (options: { [attributeId: string]: any }) =>
  Object.entries(options).map<ConfigurableOptionInput>(item => ({
    optionId: parseInt(item[0], 10),
    value: parseInt(item[1], 10)
  }));

import { ConfigurableProductOption, ConfigurableOptionInput } from '@deity/falcon-shop-extension';

export type ProductOptionsMap = {
  [attributeId: string]: any;
};

export const productConfigurableOptionsToForm = (
  configurableOptions: Pick<ConfigurableProductOption, 'attributeId'>[]
): ProductOptionsMap =>
  configurableOptions.map(x => x.attributeId).reduce((prev, x) => ({ ...prev, [x]: undefined }), {});

export const formProductConfigurableOptionsToInput = (options: ProductOptionsMap) =>
  Object.entries(options).map<ConfigurableOptionInput>(item => ({
    optionId: parseInt(item[0], 10),
    value: parseInt(item[1], 10)
  }));

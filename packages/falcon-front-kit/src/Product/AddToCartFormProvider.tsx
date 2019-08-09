import React from 'react';
import { Formik } from 'formik';
import { ConfigurableProductOption, Product } from '@deity/falcon-shop-extension';
import { AddToCartMutation } from '@deity/falcon-shop-data';
import { FormProviderProps } from '../Forms';
import {
  ProductOptionsMap,
  productConfigurableOptionsToForm,
  formProductConfigurableOptionsToInput
} from './productConfigurableOptionMappers';

export type AddToCartFormValues = {
  qty: string;
  configurableOptions: ProductOptionsMap;
  bundleOptions: [];
};
export type AddToCartFormProviderProps = FormProviderProps<AddToCartFormValues> & {
  quantity: number;
  product: Pick<Product, 'sku'> & {
    configurableOptions?: Pick<ConfigurableProductOption, 'attributeId'>[];
    bundleOptions?: Pick<Product, 'bundleOptions'>;
  };
};
export const AddToCartFormProvider: React.SFC<AddToCartFormProviderProps> = props => {
  const { onSubmit, initialValues, quantity, product, ...formikProps } = props;
  const defaultInitialValues = {
    qty: quantity,
    configurableOptions: productConfigurableOptionsToForm(product.configurableOptions),
    bundleOptions: product.bundleOptions || []
  };

  return (
    <AddToCartMutation>
      {addToCart => (
        <Formik
          initialValues={initialValues || defaultInitialValues}
          onSubmit={(values, formikActions) =>
            addToCart({
              variables: {
                input: {
                  sku: product.sku,
                  qty: parseInt(values.qty.toString(), 10),
                  configurableOptions: formProductConfigurableOptionsToInput(values.configurableOptions),
                  bundleOptions: undefined // values.bundleOptions as any - TODO add appropriate mapper
                }
              }
            })
              .then(() => {
                formikActions.setSubmitting(false);
                return onSubmit && onSubmit();
              })
              .catch(e => {
                formikActions.setSubmitting(false);
                formikActions.setStatus({ error: e.message });
              })
          }
          {...formikProps}
        />
      )}
    </AddToCartMutation>
  );
};

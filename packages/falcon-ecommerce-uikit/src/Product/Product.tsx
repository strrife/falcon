import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { adopt } from 'react-adopt';
import { I18n } from '@deity/falcon-i18n';
import { Box, Text, H1, NumberInput, Button, Icon, FlexLayout } from '@deity/falcon-ui';
import {
  PageLayout,
  ProductLayout,
  ProductLayoutAreas,
  ProductDescription,
  Breadcrumbs,
  OpenSidebarMutation,
  Price,
  ProductGallery,
  ProductOptionList
} from '@deity/falcon-ui-kit';
import { Locale } from '@deity/falcon-front-kit';
import { AddToCartMutation, ProductResponse } from '@deity/falcon-shop-data';
import { ProductConfigurator } from './ProductConfigurator';

/**
 * Combine render props functions into one with react-adopt
 */
const ProductForm = adopt({
  // mutation provides openSidebar() method that allows us to show mini cart once product is added
  openSidebarMutation: ({ render }) => (
    <OpenSidebarMutation>{openSidebar => render({ openSidebar })}</OpenSidebarMutation>
  ),
  // mutation provides addToCart method which should be called with proper data
  addToCartMutation: ({ render, openSidebarMutation }) => (
    <AddToCartMutation onCompleted={() => openSidebarMutation.openSidebar({ variables: { contentType: 'cart' } })}>
      {(addToCart, result) => render({ addToCart, result })}
    </AddToCartMutation>
  ),
  // formik handles form operations and triggers submit when onSubmit event is fired on the form
  formik: ({ sku, validate, addToCartMutation, render }) => (
    <Formik
      initialValues={{ qty: 1 }}
      validate={validate}
      onSubmit={(values: any) =>
        addToCartMutation.addToCart({
          variables: {
            input: {
              sku,
              ...values,
              qty: parseInt(values.qty, 10)
            }
          }
        })
      }
    >
      {(...props) => <Form>{render(...props)}</Form>}
    </Formik>
  ),

  // product configurator takes care about interactions between configurable product options and serializes
  // selected data into proper format so GraphQL can use it
  productConfigurator: ({ formik, render }) => (
    <ProductConfigurator
      onChange={(name: string, value: any) => formik.setFieldValue(name, value, !!formik.submitCount)}
    >
      {render}
    </ProductConfigurator>
  )
});

export class Product extends React.PureComponent<ProductResponse> {
  createValidator(product: ProductResponse['product'], t: any) {
    return (values: any) => {
      const errors: any = {};

      // handle qty
      if (parseInt(values.qty, 10) < 1) {
        errors.qty = t('product.error.quantity');
      }

      // handle configuration options
      if (product.configurableOptions && product.configurableOptions.length) {
        if (!values.configurableOptions || values.configurableOptions.length !== product.configurableOptions.length) {
          errors.configurableOptions = t('product.error.configurableOptions');
        }
      }

      // todo: handle bundled products

      return errors;
    };
  }

  render() {
    const { product } = this.props;

    return (
      <PageLayout>
        <Breadcrumbs items={product.breadcrumbs} />
        <I18n>
          {t => (
            <ProductForm sku={product.sku} validate={this.createValidator(product, t)}>
              {({
                addToCartMutation: {
                  result: { loading, error }
                },
                formik: { values, errors, setFieldValue, submitCount },
                productConfigurator
              }: any) => (
                <ProductLayout>
                  <FlexLayout gridArea={ProductLayoutAreas.gallery} alignItems="center" justifyContent="center">
                    <ProductGallery items={product.gallery} />
                  </FlexLayout>
                  <Text fontSize="sm" gridArea={ProductLayoutAreas.sku}>
                    {t('product.sku', { sku: product.sku })}
                  </Text>
                  <H1 gridArea={ProductLayoutAreas.title}>{product.name}</H1>

                  <Box gridArea={ProductLayoutAreas.price}>
                    {product.price.special ? (
                      <React.Fragment>
                        <Price value={product.price.regular} fontSize="xl" variant="old" mr="xs" />
                        <Price value={product.price.special} fontSize="xl" variant="special" />
                      </React.Fragment>
                    ) : (
                      <Price value={product.price.regular} fontSize="xl" />
                    )}
                    <Locale>
                      {({ priceFormat }) =>
                        (product.tierPrices || []).map(x => (
                          <Text key={x.qty}>
                            {t('product.tierPriceDescription', {
                              qty: x.qty,
                              price: priceFormat(x.value),
                              discount: x.discount
                            })}
                          </Text>
                        ))
                      }
                    </Locale>
                  </Box>
                  <ProductOptionList
                    items={product.configurableOptions}
                    error={errors.configurableOptions}
                    onChange={(ev: React.ChangeEvent<any>) =>
                      productConfigurator.handleProductConfigurationChange('configurableOption', ev)
                    }
                  />
                  <ProductDescription gridArea={ProductLayoutAreas.description} value={product.description} />
                  <FlexLayout alignItems="center" gridArea={ProductLayoutAreas.cta} mt="xs">
                    <NumberInput
                      mr="sm"
                      mt="sm"
                      min="1"
                      name="qty"
                      aria-label={t('product.quantity')}
                      disabled={loading}
                      defaultValue={String(values.qty)}
                      onChange={ev => setFieldValue('qty', ev.target.value, !!submitCount)}
                    />
                    <Button
                      type="submit"
                      height="xl"
                      mt="sm"
                      disabled={loading}
                      variant={loading ? 'loader' : undefined}
                    >
                      {!loading && <Icon src="cart" stroke="white" size="md" mr="sm" />}
                      {t('product.addToCart')}
                    </Button>
                  </FlexLayout>
                  <Box gridArea={ProductLayoutAreas.error}>
                    <ErrorMessage name="qty" render={msg => <Text color="error">{msg}</Text>} />
                    {!!error && <Text color="error">{error.message}</Text>}
                  </Box>
                </ProductLayout>
              )}
            </ProductForm>
          )}
        </I18n>
      </PageLayout>
    );
  }
}

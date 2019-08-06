import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import { adopt } from 'react-adopt';
import { T } from '@deity/falcon-i18n';
import { AddToCartMutation, ProductResponse } from '@deity/falcon-shop-data';
import { Box, Text, H1, NumberInput, Button, Icon, FlexLayout } from '@deity/falcon-ui';
import {
  Locale,
  Field,
  rangeValidator,
  requiredValidator,
  formProductConfigurableOptionsToInput,
  productConfigurableOptionsToForm
} from '@deity/falcon-front-kit';
import {
  PageLayout,
  ProductLayout,
  ProductLayoutAreas,
  ProductDescription,
  Breadcrumbs,
  OpenSidebarMutation,
  Price,
  ProductGallery,
  ProductOptionList,
  Form
} from '@deity/falcon-ui-kit';

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
  formik: ({ product, validate, addToCartMutation, render }) => (
    <Formik
      initialValues={{
        qty: 1,
        configurableOptions: productConfigurableOptionsToForm(product.configurableOptions)
      }}
      validate={validate}
      onSubmit={(values: any) => {
        return addToCartMutation.addToCart({
          variables: {
            input: {
              sku: product.sku,
              ...values,
              configurableOptions: formProductConfigurableOptionsToInput(values.configurableOptions),
              qty: parseInt(values.qty, 10)
            }
          }
        });
      }}
    >
      {(...props) => (
        <Form id="product" i18nId="product">
          {render(...props)}
        </Form>
      )}
    </Formik>
  )
});

export class Product extends React.PureComponent<ProductResponse> {
  render() {
    const { product } = this.props;
    const { price, tierPrices } = product;

    return (
      <PageLayout>
        <Breadcrumbs items={product.breadcrumbs} />

        <ProductForm sku={product.sku} product={product}>
          {({
            addToCartMutation: {
              result: { loading, error }
            }
          }) => (
            <ProductLayout>
              <FlexLayout gridArea={ProductLayoutAreas.gallery} alignItems="center" justifyContent="center">
                <ProductGallery items={product.gallery} />
              </FlexLayout>
              <Text fontSize="sm" gridArea={ProductLayoutAreas.sku}>
                <T id="product.sku" sku={product.sku} />
              </Text>
              <H1 gridArea={ProductLayoutAreas.title}>{product.name}</H1>

              <Box gridArea={ProductLayoutAreas.price}>
                {price.special ? (
                  <React.Fragment>
                    <Price value={price.regular} fontSize="xl" variant="old" mr="xs" />
                    <Price value={price.special} fontSize="xl" variant="special" />
                  </React.Fragment>
                ) : (
                  <Price value={price.regular} fontSize="xl" />
                )}
                {tierPrices.length > 0 && (
                  <Locale>
                    {({ priceFormat }) =>
                      tierPrices.map(x => (
                        <Text key={x.qty}>
                          <T
                            id="product.tierPriceDescription"
                            qty={x.qty}
                            price={priceFormat(x.value)}
                            discount={x.discount}
                          />
                        </Text>
                      ))
                    }
                  </Locale>
                )}
              </Box>
              <ProductOptionList
                gridArea={ProductLayoutAreas.options}
                name="configurableOptions"
                items={product.configurableOptions}
                disabled={loading}
              />
              <ProductDescription gridArea={ProductLayoutAreas.description} value={product.description} />
              <FlexLayout alignItems="center" gridArea={ProductLayoutAreas.cta} mt="xs">
                <Field name="qty" validate={[requiredValidator, rangeValidator(1)]}>
                  {({ field, label }) => (
                    <NumberInput {...field} disabled={loading} mr="sm" mt="sm" min="1" aria-label={label} />
                  )}
                </Field>
                <Button type="submit" height="xl" mt="sm" disabled={loading} variant={loading && 'loader'}>
                  {!loading && <Icon src="cart" stroke="white" size="md" mr="sm" />}
                  <T id="product.addToCart" />
                </Button>
              </FlexLayout>
              <Box gridArea={ProductLayoutAreas.error}>
                <ErrorMessage name="qty" render={msg => <Text color="error">{msg}</Text>} />
                {!!error && <Text color="error">{error.message}</Text>}
              </Box>
            </ProductLayout>
          )}
        </ProductForm>
      </PageLayout>
    );
  }
}

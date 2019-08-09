import React from 'react';
import { T } from '@deity/falcon-i18n';
import { ProductResponse } from '@deity/falcon-shop-data';
import { Box, Text, H1, NumberInput, Button, Icon, FlexLayout } from '@deity/falcon-ui';
import { Locale, Field, rangeValidator, requiredValidator, AddToCartFormProvider } from '@deity/falcon-front-kit';
import {
  ProductLayout,
  ProductLayoutAreas,
  ProductDescription,
  OpenSidebarMutation,
  Price,
  ProductGallery,
  ProductOptionList,
  Form,
  FormFieldError,
  FormErrorSummary
} from '@deity/falcon-ui-kit';

export class Product extends React.PureComponent<ProductResponse> {
  render() {
    const { product } = this.props;
    const { price, tierPrices } = product;

    return (
      <OpenSidebarMutation>
        {openSidebar => (
          <AddToCartFormProvider
            quantity={1}
            product={product}
            onSubmit={() => openSidebar({ variables: { contentType: 'cart' } })}
          >
            {({ isSubmitting, status }) => (
              <ProductLayout as={Form} id="add-to-cart">
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
                  disabled={isSubmitting}
                />
                <ProductDescription gridArea={ProductLayoutAreas.description} value={product.description} />
                <FlexLayout alignItems="center" gridArea={ProductLayoutAreas.cta} mt="xs">
                  <Field name="qty" validate={[requiredValidator, rangeValidator(1)]}>
                    {({ field, label, error }) => (
                      <React.Fragment>
                        <NumberInput {...field} disabled={isSubmitting} mr="sm" mt="sm" min="1" aria-label={label} />
                        <FormFieldError>{field.invalid ? error : null}</FormFieldError>
                      </React.Fragment>
                    )}
                  </Field>
                  <Button type="submit" height="xl" mt="sm" disabled={isSubmitting} variant={isSubmitting && 'loader'}>
                    {!isSubmitting && <Icon src="cart" stroke="white" size="md" mr="sm" />}
                    <T id="product.addToCart" />
                  </Button>
                </FlexLayout>
                <Box gridArea={ProductLayoutAreas.error}>
                  <FormErrorSummary errors={status && status.error} />
                </Box>
              </ProductLayout>
            )}
          </AddToCartFormProvider>
        )}
      </OpenSidebarMutation>
    );
  }
}

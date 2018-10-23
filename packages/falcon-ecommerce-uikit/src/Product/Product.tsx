import React from 'react';
import { Formik, Form } from 'formik';
import { themed, Box, Text, H1, NumberInput, Button, Icon, FlexLayout } from '@deity/falcon-ui';
import { Breadcrumbs } from '../Breadcrumbs';
// import { ProductMeta } from './ProductMeta';
import { ProductGallery } from './ProductGallery';
import { ProductTranslations } from './ProductQuery';
import { ProductOptions } from './ConfigurableOptions';
import { AddToCartMutation } from '../MiniCart';
import { ProductConfigurator } from './ProductConfigurator';

export const ProductLayout = themed({
  tag: 'div',
  defaultTheme: {
    productLayout: {
      display: 'grid',
      gridGap: 'md',
      my: 'lg'
    }
  }
});

const asGridAreas = (items: Area[][]) => items.map(item => `"${item.join(' ')}"`).join(' ');

enum Area {
  gallery = 'gallery',
  sku = 'sku',
  title = 'title',
  description = 'description',
  cta = 'cta',
  price = 'price',
  meta = 'meta',
  empty = 'empty',
  options = 'options'
}

export const ProductDetailsLayout = themed({
  tag: 'article',
  defaultTheme: {
    productDetailsLayout: {
      display: 'grid',
      gridGap: 'md',
      gridTemplateColumns: {
        xs: '1fr',
        md: '1.5fr 1fr'
      },
      gridTemplateAreas: {
        xs: asGridAreas([
          [Area.title],
          [Area.sku],
          [Area.gallery],
          [Area.price],
          [Area.options],
          [Area.cta],
          [Area.description],
          [Area.meta]
        ]),
        md: asGridAreas([
          [Area.gallery, Area.sku],
          [Area.gallery, Area.title],
          [Area.gallery, Area.price],
          [Area.gallery, Area.options],
          [Area.gallery, Area.cta],
          [Area.gallery, Area.description],
          [Area.gallery, Area.meta]
        ])
      },
      gridTemplateRows: {
        md: 'auto auto auto auto auto 1fr'
      }
    }
  }
});

const ProductDescriptionLayout = themed({
  tag: 'div',

  defaultTheme: {
    productDescriptionLayout: {
      css: {
        p: {
          margin: 0
        }
      }
    }
  }
});

export class Product extends React.PureComponent<{ product: any; translations: ProductTranslations }> {
  addToCartHandler(sku: String, addToCart: Function): Function {
    return (values: any, props: any) => {
      addToCart({
        variables: {
          input: {
            sku,
            ...values,
            qty: parseInt(values.qty, 10)
          }
        }
      });
      props.setSubmitting(false);
    };
  }

  render() {
    const { product, translations } = this.props;

    return (
      <ProductLayout>
        <Breadcrumbs breadcrumbs={product.breadcrumbs} />
        <ProductDetailsLayout>
          <Box gridArea={Area.gallery} css={{ maxHeight: '100%' }}>
            <ProductGallery items={product.gallery} />
          </Box>
          <Text fontSize="sm" gridArea={Area.sku}>
            {`${translations.sku}: ${product.sku}`}
          </Text>
          <H1 gridArea={Area.title}>{product.name}</H1>
          <AddToCartMutation>
            {(addToCart, { error }) => (
              <Formik initialValues={{ qty: 1 }} onSubmit={this.addToCartHandler(product.sku, addToCart) as any}>
                {(props: any) => (
                  <ProductConfigurator onChange={(name: string, value: any) => props.setFieldValue(name, value)}>
                    {({ handleProductConfigurationChange }) => (
                      <React.Fragment>
                        <Text fontSize="xxl" gridArea={Area.price}>
                          {product.currency} {product.price}
                        </Text>
                        <Form>
                          <ProductOptions
                            options={product.configurableOptions}
                            onChange={(ev: React.ChangeEvent<any>) =>
                              handleProductConfigurationChange('configurableOption', ev)
                            }
                          />
                          <ProductDescriptionLayout
                            dangerouslySetInnerHTML={{ __html: product.description }}
                            gridArea={Area.description}
                          />
                          <FlexLayout alignItems="center" gridArea={Area.cta}>
                            <NumberInput
                              mr="md"
                              min="1"
                              name="qty"
                              disabled={props.isSubmitting}
                              defaultValue={String(props.values.qty)}
                              onChange={props.handleChange}
                            />
                            <Button type="submit">
                              <Icon src="cart" stroke="white" size={20} mr="sm" />
                              {translations.addToCart}
                            </Button>
                            {!!error && <Text color="error">{error.message}</Text>}
                          </FlexLayout>
                        </Form>
                      </React.Fragment>
                    )}
                  </ProductConfigurator>
                )}
              </Formik>
            )}
          </AddToCartMutation>
          <Box gridArea={Area.meta} my="lg">
            {/* <ProductMeta meta={data.seo} /> */}
          </Box>
        </ProductDetailsLayout>
      </ProductLayout>
    );
  }
}

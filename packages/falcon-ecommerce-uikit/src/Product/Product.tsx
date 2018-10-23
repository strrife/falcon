import React from 'react';
import { Formik, Form } from 'formik';
import { adopt } from 'react-adopt';
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

/**
 * Combine render props functions into one with react-adopt
 */
const ProductData = adopt({
  // mutation delivers addToCart method which should be called with proper data
  mutation: ({ render }) => (
    <AddToCartMutation>{(addToCart, result) => render({ addToCart, result })}</AddToCartMutation>
  ),

  // formik handles form operations and triggers submit when onSubmit event is fired on the form
  formik: ({ sku, mutation, render }) => (
    <Formik
      initialValues={{ qty: 1 }}
      onSubmit={(values: any) =>
        mutation.addToCart({
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
      {render}
    </Formik>
  ),

  // product configurator takes care about interactions between configurable product options and serializes
  // selected data into proper format so GraphQL can use it
  productConfigurator: ({ formik, render }) => (
    <ProductConfigurator onChange={(name: string, value: any) => formik.setFieldValue(name, value)}>
      {render}
    </ProductConfigurator>
  )
});

export class Product extends React.PureComponent<{ product: any; translations: ProductTranslations }> {
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
          <ProductData sku={product.sku}>
            {({ mutation, formik, productConfigurator }: any) => (
              <React.Fragment>
                <Text fontSize="xxl" gridArea={Area.price}>
                  {product.currency} {product.price}
                </Text>
                <Form>
                  <ProductOptions
                    options={product.configurableOptions}
                    onChange={(ev: React.ChangeEvent<any>) =>
                      productConfigurator.handleProductConfigurationChange('configurableOption', ev)
                    }
                  />
                  <ProductDescriptionLayout
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    gridArea={Area.description}
                  />
                  <FlexLayout alignItems="center" gridArea={Area.cta} mt="md">
                    <NumberInput
                      mr="md"
                      min="1"
                      name="qty"
                      disabled={formik.isSubmitting}
                      defaultValue={String(formik.values.qty)}
                      onChange={formik.handleChange}
                    />
                    <Button type="submit">
                      <Icon src="cart" stroke="white" size={20} mr="sm" />
                      {translations.addToCart}
                    </Button>
                    {!!mutation.result.error && <Text color="error">{mutation.result.error.message}</Text>}
                  </FlexLayout>
                </Form>
              </React.Fragment>
            )}
          </ProductData>
          <Box gridArea={Area.meta} my="lg">
            {/* <ProductMeta meta={data.seo} /> */}
          </Box>
        </ProductDetailsLayout>
      </ProductLayout>
    );
  }
}

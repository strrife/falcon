import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { adopt } from 'react-adopt';
import { themed, Box, Text, H1, NumberInput, Button, Icon, FlexLayout } from '@deity/falcon-ui';
import { Breadcrumbs } from '../Breadcrumbs';
// import { ProductMeta } from './ProductMeta';
import { ProductGallery } from './ProductGallery';
import { ProductTranslations } from './ProductQuery';
import { ProductConfigurableOptions } from './ConfigurableOptions';
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
const ProductForm = adopt({
  // mutation delivers addToCart method which should be called with proper data
  mutation: ({ render }) => (
    <AddToCartMutation>{(addToCart, result) => render({ addToCart, result })}</AddToCartMutation>
  ),

  // formik handles form operations and triggers submit when onSubmit event is fired on the form
  formik: ({ sku, validate, mutation, render }) => (
    <Formik
      initialValues={{ qty: 1 }}
      validate={validate}
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
  createValidator(product: any) {
    const { translations } = this.props;
    return (values: any) => {
      const errors: any = {};

      // handle qty
      if (parseInt(values.qty, 10) < 1) {
        errors.qty = translations.error.qty;
      }

      // handle configuration options
      if (product.configurableOptions) {
        if (!values.configurableOptions || values.configurableOptions.length !== product.configurableOptions.length) {
          errors.configurableOptions = translations.error.configurableOptions;
        }
      }

      // todo: handle bundled products

      return errors;
    };
  }

  // this method is defined as instance property so we don't need to use bind when passing it as render prop
  renderProductFormContent = ({
    mutation,
    formik: { values, isSubmitting, handleChange, errors },
    productConfigurator
  }: any) => {
    const { product, translations } = this.props;

    return (
      <React.Fragment>
        <Text fontSize="xxl" gridArea={Area.price}>
          {product.currency} {product.price}
        </Text>
        <Form>
          <ProductConfigurableOptions
            options={product.configurableOptions}
            error={errors.configurableOptions}
            onChange={(ev: React.ChangeEvent<any>) =>
              productConfigurator.handleProductConfigurationChange('configurableOption', ev)
            }
          />
          <ProductDescriptionLayout
            mt="sm"
            dangerouslySetInnerHTML={{ __html: product.description }}
            gridArea={Area.description}
          />
          <FlexLayout alignItems="center" gridArea={Area.cta} mt="md">
            <NumberInput
              mr="md"
              min="1"
              name="qty"
              disabled={isSubmitting}
              defaultValue={String(values.qty)}
              onChange={handleChange}
            />
            <Button type="submit">
              <Icon src="cart" stroke="white" size={20} mr="sm" />
              {translations.addToCart}
            </Button>
          </FlexLayout>
          <Box>
            <ErrorMessage name="qty" render={msg => <Text color="error">{msg}</Text>} />
            {!!mutation.result.error && <Text color="error">{mutation.result.error.message}</Text>}
          </Box>
        </Form>
      </React.Fragment>
    );
  };

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
          <ProductForm
            sku={product.sku}
            validate={this.createValidator(product)}
            render={this.renderProductFormContent}
          />
          <Box gridArea={Area.meta} my="lg">
            {/* <ProductMeta meta={data.seo} /> */}
          </Box>
        </ProductDetailsLayout>
      </ProductLayout>
    );
  }
}

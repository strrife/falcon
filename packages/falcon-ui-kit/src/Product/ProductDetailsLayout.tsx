import React from 'react';
import { themed } from '@deity/falcon-ui';
import { toGridTemplate } from '../helpers';

export const ProductDetailsLayoutAreas = {
  gallery: 'gallery',
  sku: 'sku',
  title: 'title',
  description: 'description',
  cta: 'cta',
  price: 'price',
  meta: 'meta',
  empty: 'empty',
  options: 'options',
  error: 'error'
};

export const ProductDetailsLayout = themed({
  tag: 'article',
  defaultTheme: {
    productDetailsLayout: {
      display: 'grid',
      gridGap: 'sm',

      gridTemplate: {
        // prettier-ignore
        xs: toGridTemplate([
          ['1fr'],
          [ProductDetailsLayoutAreas.title],
          [ProductDetailsLayoutAreas.sku],
          [ProductDetailsLayoutAreas.gallery],
          [ProductDetailsLayoutAreas.price],
          [ProductDetailsLayoutAreas.error],
          [ProductDetailsLayoutAreas.options],
          [ProductDetailsLayoutAreas.cta],
          [ProductDetailsLayoutAreas.description],
          [ProductDetailsLayoutAreas.meta]
        ]),
        // prettier-ignore
        md: toGridTemplate([
          ['1.5fr', '1fr'],
          [ProductDetailsLayoutAreas.gallery, ProductDetailsLayoutAreas.sku],
          [ProductDetailsLayoutAreas.gallery, ProductDetailsLayoutAreas.title],
          [ProductDetailsLayoutAreas.gallery, ProductDetailsLayoutAreas.price],
          [ProductDetailsLayoutAreas.gallery, ProductDetailsLayoutAreas.options],
          [ProductDetailsLayoutAreas.gallery, ProductDetailsLayoutAreas.cta],
          [ProductDetailsLayoutAreas.gallery, ProductDetailsLayoutAreas.error],
          [ProductDetailsLayoutAreas.gallery, ProductDetailsLayoutAreas.description, '1fr'],
          [ProductDetailsLayoutAreas.gallery, ProductDetailsLayoutAreas.meta]
        ])
      }
    }
  }
});

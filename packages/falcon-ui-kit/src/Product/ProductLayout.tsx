import React from 'react';
import { themed } from '@deity/falcon-ui';
import { toGridTemplate } from '../helpers';

export const ProductLayoutAreas = {
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

export const ProductLayout = themed({
  tag: 'article',
  defaultTheme: {
    productLayout: {
      display: 'grid',
      gridGap: 'sm',

      gridTemplate: {
        // prettier-ignore
        xs: toGridTemplate([
          ['1fr'],
          [ProductLayoutAreas.title],
          [ProductLayoutAreas.sku],
          [ProductLayoutAreas.gallery],
          [ProductLayoutAreas.price],
          [ProductLayoutAreas.error],
          [ProductLayoutAreas.options],
          [ProductLayoutAreas.cta],
          [ProductLayoutAreas.description],
          [ProductLayoutAreas.meta]
        ]),
        // prettier-ignore
        md: toGridTemplate([
          ['1.5fr', '1fr'],
          [ProductLayoutAreas.gallery, ProductLayoutAreas.sku],
          [ProductLayoutAreas.gallery, ProductLayoutAreas.title],
          [ProductLayoutAreas.gallery, ProductLayoutAreas.price],
          [ProductLayoutAreas.gallery, ProductLayoutAreas.options],
          [ProductLayoutAreas.gallery, ProductLayoutAreas.cta],
          [ProductLayoutAreas.gallery, ProductLayoutAreas.error],
          [ProductLayoutAreas.gallery, ProductLayoutAreas.description, '1fr'],
          [ProductLayoutAreas.gallery, ProductLayoutAreas.meta]
        ])
      }
    }
  }
});

import React from 'react';
import { Box, themed } from '@deity/falcon-ui';
import { toGridTemplate } from '../helpers';

export const productGalleryLayoutAreas = {
  full: 'full',
  thumbs: 'thumbs'
};

export const ProductGalleryLayout = themed({
  tag: Box,

  defaultTheme: {
    productGalleryLayout: {
      display: 'grid',
      gridTemplate: {
        // prettier-ignore
        xs: toGridTemplate([
          ['1fr'],
          [productGalleryLayoutAreas.full],
          [productGalleryLayoutAreas.thumbs]]),
        // prettier-ignore
        md: toGridTemplate([
          ['100px', '1fr'],
          [productGalleryLayoutAreas.thumbs, productGalleryLayoutAreas.full]])
      }
    }
  }
});

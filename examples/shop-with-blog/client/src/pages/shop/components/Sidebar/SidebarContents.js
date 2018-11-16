import React from 'react';
import { MiniCartQuery, MiniCart } from '@deity/falcon-ecommerce-uikit';

export default ({ contentType }) => {
  if (!contentType) return null;

  return <MiniCartQuery>{data => <MiniCart {...data} />}</MiniCartQuery>;
};

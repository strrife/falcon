import React from 'react';
import { T } from '@deity/falcon-i18n';
import { OrderItem } from '@deity/falcon-shop-extension';
import { Box, Image, Text } from '@deity/falcon-ui';
import { Price } from '../Price';
import { OrderItemSummaryLayout, OrderItemSummaryArea } from './OrderItemSummaryLayout';

export const OrderItemSummary: React.SFC<OrderItem> = props => {
  const thumbMaxSize = 80;

  return (
    <OrderItemSummaryLayout maxThumbSize={thumbMaxSize}>
      <Image
        gridArea={OrderItemSummaryArea.thumb}
        src={props.thumbnailUrl}
        css={{ maxWidth: `${thumbMaxSize}px`, maxHeight: `${thumbMaxSize}px` }}
      />
      <Text gridArea={OrderItemSummaryArea.name} fontWeight="bold">
        {props.name}
      </Text>
      <Price
        gridArea={OrderItemSummaryArea.price}
        value={props.rowTotalInclTax}
        fontWeight="bold"
        css={{ textAlign: 'right' }}
      />
      <Box gridArea={OrderItemSummaryArea.details} display="flex" fontSize="xs">
        <Text flex="1">
          <T id="order.quantityLabel" />
        </Text>
        <Text flex="2">{props.qty}</Text>
      </Box>
    </OrderItemSummaryLayout>
  );
};

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { T } from '@deity/falcon-i18n';
import { Order } from '@deity/falcon-shop-extension';
import { themed, Box, Text, Link, List } from '@deity/falcon-ui';
import {
  Price,
  FormattedDate,
  OrderListLayout,
  OrderListItemLayout,
  OrderListItemArea,
  OrderListHeader
} from '@deity/falcon-ui-kit';

export const OrderList: React.SFC<{ items: Order[] }> = ({ items }) => (
  <OrderListLayout>
    <OrderListHeader />
    <List css={{ listStyle: 'none' }}>
      {items.map(x => (
        <OrderListItem key={x.incrementId} {...x} />
      ))}
    </List>
  </OrderListLayout>
);

export const OrderListItem: React.SFC<Order> = props => (
  <OrderListItemLayout>
    <Box gridArea={OrderListItemArea.id} display="flex" alignContent="flex-start">
      <CellLabel>
        <T id="orderList.idLabel" />
      </CellLabel>
      <Link as={RouterLink} to={`/account/orders/${props.entityId}`}>
        {props.incrementId}
      </Link>
    </Box>
    <Box gridArea={OrderListItemArea.createdAt} display="flex" alignContent="flex-start">
      <CellLabel>
        <T id="orderList.createdAtLabel" />
      </CellLabel>
      <FormattedDate value={props.createdAt} display="flex" />
    </Box>
    <Box gridArea={OrderListItemArea.shipTo} display="flex" alignContent="flex-start">
      <CellLabel>
        <T id="orderList.shipToLabel" />
      </CellLabel>
      {`${props.customerFirstname} ${props.customerLastname}`}
    </Box>
    <Box gridArea={OrderListItemArea.grandTotal} display="flex" alignContent="flex-start">
      <CellLabel>
        <T id="orderList.grandTotalLabel" />
      </CellLabel>
      <Price value={props.grandTotal} formatOptions={{ currency: props.orderCurrencyCode }} display="flex" />
    </Box>
    <Box gridArea={OrderListItemArea.status} display="flex" alignContent="flex-start">
      <CellLabel>
        <T id="orderList.statusLabel" />
      </CellLabel>
      <T id="order.status" context={props.status || 'na'} />
    </Box>
    <Box gridArea={OrderListItemArea.actions} display="flex" alignContent="flex-start">
      <Link as={RouterLink} to={`/account/orders/${props.entityId}`}>
        <T id="orderList.viewOrderLink" />
      </Link>
    </Box>
  </OrderListItemLayout>
);

const CellLabel = themed({
  tag: Text,
  defaultTheme: {
    orderLabel: {
      display: {
        xs: 'inline-flex',
        md: 'none'
      },
      mr: 'xs',
      css: {
        '::after': {
          content: '":"'
        }
      }
    }
  }
});

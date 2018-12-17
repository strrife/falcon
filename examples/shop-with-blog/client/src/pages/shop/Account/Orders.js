import React from 'react';
import { H1, Box } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
// import { OrdersListQuery, OrdersList } from '@deity/falcon-ecommerce-uikit';

const Orders = () => (
  <Box>
    <H1>
      <T id="ordersList.title" />
    </H1>
    {/* <OrdersListQuery>{orders => <OrdersList {...orders} />}</OrdersListQuery> */}
  </Box>
);

export default Orders;

import React from 'react';
import { H1, GridLayout } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
// import { OrdersListQuery, OrdersList, NoOrders } from '@deity/falcon-ecommerce-uikit';

const Order = ({ match }) => {
  const { id } = match.params;

  return (
    <GridLayout mb="md" gridGap="md">
      <H1>
        <T id="order.title" orderId={id} />
      </H1>
    </GridLayout>
  );
};

export default Order;

import React from 'react';
import { NetworkStatus } from 'apollo-client';
import { H1, Box, Button, FlexLayout } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import { OrdersListQuery, OrdersList } from '@deity/falcon-ecommerce-uikit';

const Orders = () => (
  <Box>
    <H1>
      <T id="ordersList.title" />
    </H1>
    <OrdersListQuery>
      {({ orders: { items, pagination }, fetchMore, networkStatus }) => (
        <>
          <OrdersList items={items} />
          {pagination.nextPage && (
            <FlexLayout justifyContent="center">
              <Button
                onClick={fetchMore}
                variant={networkStatus === NetworkStatus.fetchMore ? 'loader' : 'secondary'}
                height="xl"
              >
                <T id="ordersList.showMore" />
              </Button>
            </FlexLayout>
          )}
        </>
      )}
    </OrdersListQuery>
  </Box>
);

export default Orders;

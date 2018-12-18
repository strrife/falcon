import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { T } from '@deity/falcon-i18n';
import { Box, H1, H2, Text, Link, FlexLayout } from '@deity/falcon-ui';
import { CustomerQuery, OrdersListQuery, NoOrders, OrdersList } from '@deity/falcon-ecommerce-uikit';

const Dashboard = () => (
  <Box>
    <H1>
      <T id="dashboard.title" />
    </H1>
    <Box>
      <H2>
        <T id="dashboard.personalInformation" />
      </H2>
      <CustomerQuery>
        {({ customer }) => (
          <Box>
            <Text>{`${customer.firstname} ${customer.lastname}`}</Text>
            <Text> {customer.email}</Text>
          </Box>
        )}
      </CustomerQuery>
    </Box>

    <Box mt="lg">
      <OrdersListQuery variables={{ perPage: 1, page: 1 }}>
        {({ orders: { items } }) => (
          <>
            <FlexLayout justifyContent="flex-start" alignItems="baseline">
              <H2 mr="md">
                <T id="dashboard.recentOrder" />
              </H2>
              <Link as={RouterLink} to="/account/orders">
                <T id="dashboard.viewAllOrders" />
              </Link>
            </FlexLayout>
            <Box>{items.length ? <OrdersList items={items} /> : <NoOrders />}</Box>
          </>
        )}
      </OrdersListQuery>
    </Box>
  </Box>
);

export default Dashboard;

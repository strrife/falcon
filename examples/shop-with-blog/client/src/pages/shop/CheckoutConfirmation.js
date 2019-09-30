import React from 'react';
import { T } from '@deity/falcon-i18n';
import { LastOrderQuery } from '@deity/falcon-shop-data';
import { Box, H1, Text, FlexLayout } from '@deity/falcon-ui';
import { PageLayout } from '@deity/falcon-ui-kit';

const OrderSummary = ({ order }) => (
  <Box>
    {order.items.map(item => (
      <Text fontWeight="bold" key={item.itemId}>
        {item.name}
      </Text>
    ))}
  </Box>
);

const CheckoutConfirmation = () => (
  <PageLayout>
    <H1 css={{ textAlign: 'center' }}>
      <T id="checkoutSuccessful.title" />
    </H1>
    <LastOrderQuery>
      {({ data: { lastOrder } }) => (
        <FlexLayout my="xl" flexDirection="column" alignItems="center">
          <Text>{`We have received your order (No.: ${lastOrder.referenceNo}) with the following items:`}</Text>
          <OrderSummary my="sm" order={lastOrder} />
          <Text my="sm">We are working hard on getting your items to you as soon as possible.</Text>
          <Text>We will send you a shipping confirmation email once your order is on the way.</Text>
        </FlexLayout>
      )}
    </LastOrderQuery>
  </PageLayout>
);

export default CheckoutConfirmation;

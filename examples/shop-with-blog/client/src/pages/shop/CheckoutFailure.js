import React from 'react';
import { H1, Text, FlexLayout } from '@deity/falcon-ui';

const CheckoutFailure = () => (
  <FlexLayout my="xxl" flexDirection="column" alignItems="center">
    <H1 mb="xl">Order failed</H1>
    <Text>Unfortunately we could not process your payment, try again later!</Text>
  </FlexLayout>
);

export default CheckoutFailure;

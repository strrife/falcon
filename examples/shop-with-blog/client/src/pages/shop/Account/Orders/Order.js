import React from 'react';
import { OrderQuery } from '@deity/falcon-shop-data';
import { H1, Text, Divider, Box, FlexLayout, GridLayout } from '@deity/falcon-ui';
import { OrderLayout, OrderLayoutArea, FormattedDate, AddressDetails } from '@deity/falcon-ui-kit';
import { LocaleProvider } from '@deity/falcon-front-kit';
import { I18n, T } from '@deity/falcon-i18n';
import { TotalRow, OrderItemSummary } from '@deity/falcon-ecommerce-uikit';

const Order = ({ match }) => {
  const id = parseInt(match.params.id, 10);

  return (
    <OrderQuery variables={{ id }}>
      {({ order }) => (
        <GridLayout gridGap="md">
          <H1>
            <T id="order.title" orderId={order.incrementId} />
          </H1>
          <OrderLayout>
            <FlexLayout gridArea={OrderLayoutArea.status}>
              <Text fontWeight="bold" mr="md">
                <T id="order.statusLabel" />
              </Text>
              <T id="order.status" context={order.status || 'na'} />
            </FlexLayout>
            <GridLayout gridArea={OrderLayoutArea.items} alignContent="flex-start">
              <I18n>
                {t => (
                  <LocaleProvider currency={order.orderCurrencyCode}>
                    <Divider />
                    {order.items.map(x => (
                      <React.Fragment key={x.sku}>
                        <OrderItemSummary {...x} />
                        <Divider />
                      </React.Fragment>
                    ))}

                    <Box>
                      <TotalRow title={t('order.subtotalLabel')} value={order.subtotal} />
                      <TotalRow title={t('order.shippingAmountLabel')} value={order.shippingAmount} />
                    </Box>
                    <Divider />
                    <TotalRow title={t('order.grandTotalLabel')} value={order.grandTotal} fontWeight="bold" />
                  </LocaleProvider>
                )}
              </I18n>
            </GridLayout>
            <Divider gridArea={OrderLayoutArea.divider} />
            <GridLayout gridArea={OrderLayoutArea.summary} alignContent="flex-start">
              <Box>
                <Text fontWeight="bold">
                  <T id="order.billingAddressLabel" />
                </Text>
                <AddressDetails {...order.billingAddress} />
              </Box>
              <Box>
                <Text fontWeight="bold">
                  <T id="order.shippingAddressLabel" />
                </Text>
                <AddressDetails {...order.shippingAddress} />
              </Box>
              <Box>
                <Text fontWeight="bold">
                  <T id="order.createdAtLabel" />
                </Text>
                <FormattedDate value={order.createdAt} />
              </Box>
              <Box>
                <Text fontWeight="bold">
                  <T id="order.shippingMethodLabel" />
                </Text>
                {order.shippingDescription}
              </Box>
              <Box>
                <Text fontWeight="bold">
                  <T id="order.paymentMethodLabel" />
                </Text>
                {order.shippingDescription}
              </Box>
            </GridLayout>
          </OrderLayout>
        </GridLayout>
      )}
    </OrderQuery>
  );
};

export default Order;

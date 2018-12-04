import React from 'react';
import PropTypes from 'prop-types';
import { CartQuery } from '@deity/falcon-ecommerce-uikit';
import { Box, H1, Text, Divider, Button } from '@deity/falcon-ui';
import { Link as RouterLink } from 'react-router-dom';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';

const cartLayout = {
  cartLayout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  }
};

const CartItemsList = ({ items }) => (
  <Box>
    {items.map(item => (
      <React.Fragment key={item.sku}>
        <CartItem item={item} />
        <Divider key={`d-${item.sku}`} />
      </React.Fragment>
    ))}
  </Box>
);

CartItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({}))
};

const CartPage = () => (
  <CartQuery>
    {({ cart, translations }) => (
      <Box mt="xxl" defaultTheme={cartLayout}>
        <H1 fontSize="xl">{translations.title}</H1>
        {cart.items.length > 0 ? (
          <React.Fragment>
            <CartItemsList items={cart.items} />
            <CartSummary totals={cart.totals} couponCode={cart.couponCode} translations={translations} />
            <Button as={RouterLink} to="/checkout" alignSelf="center" px="xxxl">
              {translations.checkout}
            </Button>
          </React.Fragment>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Text mt="lg">{translations.emptyCart}</Text>
            <Button mt="sm" as={RouterLink} to="/">
              {translations.goShopping}
            </Button>
          </Box>
        )}
      </Box>
    )}
  </CartQuery>
);

export default CartPage;

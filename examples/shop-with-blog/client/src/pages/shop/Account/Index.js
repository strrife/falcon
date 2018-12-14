import React from 'react';
import { PropTypes } from 'prop-types';
import { Link as RouterLink, Switch, Redirect } from 'react-router-dom';
import { Box, Link, Menu, MenuItem } from '@deity/falcon-ui';
import { toGridTemplate, ProtectedRoute } from '@deity/falcon-ecommerce-uikit';
import AccountDashboard from './Dashboard';
import PersonalInformation from './PersonalInformation';
import AddressBook from './AddressBook';
import OrdersHistory from './OrdersHistory';
import WishList from './WishList';
import DynamicRoute from './../../DynamicRoute';

const AccountArea = {
  menu: 'menu',
  content: 'totals'
};

const accountLayout = {
  accountLayout: {
    display: 'grid',
    gridGap: {
      xs: 'sm',
      md: 'md'
    },
    my: 'lg',
    // prettier-ignore
    gridTemplate: {
      xs: toGridTemplate([
        ['1fr'],
        [AccountArea.menu],
        [AccountArea.content]
      ]),
      md: toGridTemplate([
        ['1fr', '4fr'],
        [AccountArea.menu, AccountArea.content]
      ])
    }
  }
};

const MenuLink = ({ to, children, ...rest }) => (
  <MenuItem {...rest}>
    <Link as={RouterLink} to={to} p="xs" flex={1}>
      {children}
    </Link>
  </MenuItem>
);
MenuLink.propTypes = {
  to: PropTypes.string.isRequired
};

const Account = () => (
  <Box defaultTheme={accountLayout}>
    <Box gridArea={AccountArea.menu} display="flex" flexDirection="column" alignItems="stretch" my="md">
      <Menu>
        <MenuLink to="/account/dashboard">dashboard</MenuLink>
        <MenuLink to="/account/personal-information">Personal Information</MenuLink>
        <MenuLink to="/account/address-book">Address Book</MenuLink>
        <MenuLink to="/account/orders-history">Orders</MenuLink>
        <MenuLink to="/product-reviews">Product Reviews</MenuLink>
        <MenuLink to="/account/wish-list">Wish List</MenuLink>
      </Menu>
    </Box>
    <Box gridArea={AccountArea.content}>
      <Switch>
        <Redirect exact from="/account" to="/account/dashboard" />
        <ProtectedRoute exact path="/account/dashboard" component={AccountDashboard} />
        <ProtectedRoute exact path="/account/personal-information" component={PersonalInformation} />
        <ProtectedRoute exact path="/account/address-book" component={AddressBook} />
        <ProtectedRoute exact path="/account/orders-history" component={OrdersHistory} />
        <ProtectedRoute exact path="/account/wish-list" component={WishList} />
        <DynamicRoute />
      </Switch>
    </Box>
  </Box>
);

export default Account;

import React from 'react';
import { PropTypes } from 'prop-types';
import { Link as RouterLink, Switch } from 'react-router-dom';
import { T } from '@deity/falcon-i18n';
import { Box, Link, Menu, MenuItem } from '@deity/falcon-ui';
import { toGridTemplate, ProtectedRoute, SignOutLogic } from '@deity/falcon-ecommerce-uikit';
import AccountDashboard from './Dashboard';
import PersonalInformation from './PersonalInformation';
import ChangePassword from './ChangePassword';
import AddressBook from './AddressBook';
import AddAddress from './AddAddress';
import EditAddress from './EditAddress';
import Orders from './Orders';
import Order from './Order';
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
        <MenuLink to="/account">
          <T id="account.dashboardLink" />
        </MenuLink>
        <MenuLink to="/account/orders">
          <T id="account.ordersLink" />
        </MenuLink>
        <MenuLink to="/account/address-book">
          <T id="account.addressBookLink" />
        </MenuLink>
        <MenuLink to="/account/personal-information">
          <T id="account.personalInformationLink" />
        </MenuLink>
        <MenuItem>
          <SignOutLogic>
            {({ signOut }) => (
              <Link p="xs" flex={1} onClick={() => signOut()}>
                <T id="signOut.link" />
              </Link>
            )}
          </SignOutLogic>
        </MenuItem>
      </Menu>
    </Box>
    <Box gridArea={AccountArea.content} min-height="100%">
      <Switch>
        <ProtectedRoute exact path="/account" component={AccountDashboard} />
        <ProtectedRoute exact path="/account/orders" component={Orders} />
        <ProtectedRoute exact path="/account/orders/:id" component={Order} />
        <ProtectedRoute exact path="/account/personal-information" component={PersonalInformation} />
        <ProtectedRoute exact path="/account/change-password" component={ChangePassword} />
        <ProtectedRoute exact path="/account/address-book" component={AddressBook} />
        <ProtectedRoute exact path="/account/address-book/add" component={AddAddress} />
        <ProtectedRoute exact path="/account/address-book/edit/:id" component={EditAddress} />
        {/* <ProtectedRoute exact path="/product-reviews" component={} /> */}
        {/* <ProtectedRoute exact path="/account/wish-list" component={WishList} /> */}
        <DynamicRoute />
      </Switch>
    </Box>
  </Box>
);

export default Account;

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Icon, Box } from '@deity/falcon-ui';

import {
  toGridTemplate,
  MiniCartIcon,
  CartQuery,
  CustomerQuery,
  AccountIcon,
  SignInIcon,
  MenuQuery,
  MenuNavbar,
  OpenSidebarMutation,
  Banner
} from '@deity/falcon-ecommerce-uikit';

console.log('********************************************************************************');
console.log(toGridTemplate);
console.log('********************************************************************************');

export const SearchBarArea = {
  logo: 'logo',
  signIn: 'signIn',
  cart: 'cart',
  search: 'search'
};

const searchBarLayoutTheme = {
  searchbarLayout: {
    display: 'grid',
    py: 'sm',
    gridGap: 'sm',
    // prettier-ignore
    gridTemplate: toGridTemplate([
      ['200px',            '1fr',                'auto',               'auto'            ],
      [SearchBarArea.logo, SearchBarArea.search, SearchBarArea.signIn, SearchBarArea.cart]
    ]),
    css: {
      alignItems: 'center'
    }
  }
};

export const Searchbar = () => (
  <Box defaultTheme={searchBarLayoutTheme}>
    <Link aria-label="DEITY" pl="sm" height="xxl" as={RouterLink} gridArea={SearchBarArea.logo} to="/">
      aaaaaaaaaaaaaaaaaaaaaaaaa
      <Icon src="logo" />
    </Link>
    <OpenSidebarMutation>
      {openSidebar => (
        <React.Fragment>
          <CustomerQuery>
            {({ customer }) =>
              customer ? (
                <Link as={RouterLink} to="/account" gridArea={SearchBarArea.signIn}>
                  <AccountIcon />
                </Link>
              ) : (
                <SignInIcon
                  gridArea={SearchBarArea.signIn}
                  onClick={() => openSidebar({ variables: { contentType: 'account' } })}
                />
              )
            }
          </CustomerQuery>
          <CartQuery>
            {data => (
              <MiniCartIcon
                onClick={() => openSidebar({ variables: { contentType: 'cart' } })}
                gridArea={SearchBarArea.cart}
                itemsQty={data.cart ? data.cart.itemsQty : 0}
              />
            )}
          </CartQuery>
        </React.Fragment>
      )}
    </OpenSidebarMutation>
  </Box>
);

export const Header = () => (
  <header>
    <Banner />
    <Searchbar />
    <MenuQuery>{({ menu }) => <MenuNavbar items={menu} />}</MenuQuery>
  </header>
);

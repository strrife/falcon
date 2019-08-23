import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Icon } from '@deity/falcon-ui';
import { CustomerQuery, CartQuery } from '@deity/falcon-shop-data';
import { OpenSidebarMutation, CartIcon, HeaderSearchBarLayout, HeaderSearchBarArea } from '@deity/falcon-ui-kit';

export const Searchbar = () => (
  <HeaderSearchBarLayout>
    <Link as={RouterLink} gridArea={HeaderSearchBarArea.logo} to="/" pl="sm" height="xxl" aria-label="DEITY">
      <Icon src="logo" />
    </Link>
    <OpenSidebarMutation>
      {openSidebar => (
        <React.Fragment>
          <CustomerQuery>
            {({ customer }) =>
              customer ? (
                <Link as={RouterLink} gridArea={HeaderSearchBarArea.signIn} to="/account">
                  <Icon src="account" />
                </Link>
              ) : (
                <Link
                  gridArea={HeaderSearchBarArea.signIn}
                  onClick={() => openSidebar({ variables: { contentType: 'account' } })}
                >
                  <Icon src="signIn" />
                </Link>
              )
            }
          </CustomerQuery>
          <Link gridArea={HeaderSearchBarArea.cart} onClick={() => openSidebar({ variables: { contentType: 'cart' } })}>
            <CartQuery>{({ cart }) => <CartIcon itemsQty={cart && cart.itemsQty} />}</CartQuery>
          </Link>
        </React.Fragment>
      )}
    </OpenSidebarMutation>
  </HeaderSearchBarLayout>
);

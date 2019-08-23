import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { MenuQuery, CustomerQuery, CartQuery, SignOutMutation } from '@deity/falcon-shop-data';
import { T } from '@deity/falcon-i18n';
import { Link, ListItem, Icon } from '@deity/falcon-ui';
import {
  MenuNavbar,
  HeaderBanner,
  OpenSidebarMutation,
  CartIcon,
  HeaderBarLayout,
  HeaderBarArea
} from '@deity/falcon-ui-kit';

export const Header = withRouter(({ history }) => (
  <CustomerQuery>
    {({ customer }) => (
      <header>
        <HeaderBanner>
          {customer && (
            <ListItem>
              <SignOutMutation>
                {signOut => (
                  <Link onClick={() => signOut().then(() => history.push('/'))}>
                    <T id="signOut.link" />
                  </Link>
                )}
              </SignOutMutation>
            </ListItem>
          )}
          <ListItem>
            <Link as={RouterLink} to="#">
              <T id="banner.contactLink" />
            </Link>
          </ListItem>
          <ListItem>
            <Link as={RouterLink} to="/blog">
              <T id="banner.blogLink" />
            </Link>
          </ListItem>
        </HeaderBanner>
        <OpenSidebarMutation>
          {openSidebar => (
            <HeaderBarLayout>
              <Link as={RouterLink} gridArea={HeaderBarArea.logo} to="/" aria-label="DEITY">
                <Icon src="logo" size="xxl" />
              </Link>
              {customer ? (
                <Link as={RouterLink} gridArea={HeaderBarArea.signIn} to="/account">
                  <Icon src="account" />
                </Link>
              ) : (
                <Link
                  gridArea={HeaderBarArea.signIn}
                  onClick={() => openSidebar({ variables: { contentType: 'account' } })}
                >
                  <Icon src="signIn" />
                </Link>
              )}
              <Link gridArea={HeaderBarArea.cart} onClick={() => openSidebar({ variables: { contentType: 'cart' } })}>
                <CartQuery>{({ cart }) => <CartIcon itemsQty={cart && cart.itemsQty} />}</CartQuery>
              </Link>
            </HeaderBarLayout>
          )}
        </OpenSidebarMutation>
        <nav>
          <MenuQuery>{({ menu }) => <MenuNavbar items={menu} />}</MenuQuery>
        </nav>
      </header>
    )}
  </CustomerQuery>
));

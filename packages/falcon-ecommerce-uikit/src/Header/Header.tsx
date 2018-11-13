import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Navbar,
  NavbarItem,
  NavbarItemMenu,
  Link,
  List,
  ListItem,
  Icon,
  DefaultThemeProps,
  Box
} from '@deity/falcon-ui';

import { toGridTemplate } from '../helpers';
import { ToggleMiniCartMutation, MiniCartIcon, MiniCartQuery } from '../MiniCart';
import { CartQuery } from '../Cart';
import { HeaderData, MenuItem } from './HeaderQuery';
import { ToggleMiniAccountMutation } from '../MiniAccount/MiniAccountMutation';

const bannerLayoutTheme: DefaultThemeProps = {
  bannerLayout: {
    display: 'flex',
    justifyContent: 'flex-end',
    bgFullWidth: 'secondaryLight',
    m: 'none',
    p: 'none',
    css: {
      listStyle: 'none'
    }
  }
};

export const Banner: React.SFC<{ items: MenuItem[] }> = ({ items }) => (
  <List defaultTheme={bannerLayoutTheme}>
    {items.map(item => (
      <ListItem p="sm" key={item.name}>
        <Link as={RouterLink} to={item.url}>
          {item.name}
        </Link>
      </ListItem>
    ))}
  </List>
);

export const Nav: React.SFC<{ items: MenuItem[] }> = ({ items }) => (
  <Navbar>
    {items.map(item => (
      <NavbarItem key={item.name}>
        <Link p="sm" as={RouterLink} to={item.url}>
          {item.name}
        </Link>
        {item.children.length > 0 && (
          <NavbarItemMenu>
            <List>
              {item.children.map(subItem => (
                <ListItem key={subItem.name}>
                  <Link p="xs" display="block" as={RouterLink} to={subItem.url}>
                    {subItem.name}
                  </Link>
                </ListItem>
              ))}
            </List>
          </NavbarItemMenu>
        )}
      </NavbarItem>
    ))}
  </Navbar>
);

export enum SearchBarArea {
  logo = 'logo',
  signIn = 'signIn',
  cart = 'cart',
  search = 'search'
}

const searchBarLayoutTheme: DefaultThemeProps = {
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
    <Link as={RouterLink} gridArea={SearchBarArea.logo} to="/">
      <Icon src="logo" />
    </Link>
    <ToggleMiniAccountMutation>
      {toggle => (
        <Icon gridArea={SearchBarArea.signIn} src="user" onClick={() => toggle()} css={{ cursor: 'pointer' }} />
      )}
    </ToggleMiniAccountMutation>
    <ToggleMiniCartMutation>
      {toggle => (
        <CartQuery>
          {(data: any) => <MiniCartIcon onClick={toggle} gridArea={SearchBarArea.cart} itemsQty={data.cart.itemsQty} />}
        </CartQuery>
      )}
    </ToggleMiniCartMutation>
  </Box>
);

export const Header: React.SFC<HeaderData> = ({
  config: {
    menus: { header, banner }
  }
}) => (
  <header>
    <Banner items={banner} />
    <Searchbar />
    <nav>
      <Nav items={header} />
    </nav>
  </header>
);

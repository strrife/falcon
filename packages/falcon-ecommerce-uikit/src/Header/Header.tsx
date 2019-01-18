import React from 'react';
import { T } from '@deity/falcon-i18n';
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
import { MiniCartIcon } from '../MiniCart';
import { CartQuery, CartData } from '../Cart';
import { CustomerQuery } from '../Customer';
import { AccountIcon } from '../MiniAccount';
import { SignInIcon } from '../SignIn';
import { SignOutLogic } from '../SignOut';
import { HeaderData, MenuItem } from './HeaderQuery';
import { OpenSidebarMutation } from '../Sidebar';

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

export const Banner = () => (
  <Box defaultTheme={bannerLayoutTheme}>
    <T id="banner.summerSale" />
  </Box>
);

// export const Banner: React.SFC<{ items: MenuItem[] }> = ({ items }) => (
//  <List defaultTheme={bannerLayoutTheme}>
//     <SignOutLogic>
//       {({ isSignedIn, signOut }: any) =>
//         isSignedIn && (
//           <ListItem p="xs">
//             <Link onClick={() => signOut()}>
//               <T id="signOut.link" />
//             </Link>
//           </ListItem>
//         )
//       }
//     </SignOutLogic>
//     {items.map(item => (
//       <ListItem p="xs" key={item.name}>
//         <Link as={RouterLink} to={item.url}>
//           {item.name}
//         </Link>
//       </ListItem>
//     ))}
//   </List>

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

export const SearchBarArea = {
  leftMenu: 'leftMenu',
  logo: 'logo',
  rightMenu: 'rightMenu'
};

export const RightMenuArea = {
  search: 'search',
  account: 'account',
  cart: 'cart'
};

const searchBarLayoutTheme: DefaultThemeProps = {
  searchbarLayout: {
    display: 'grid',
    py: 'sm',
    gridGap: 'sm',
    // prettier-ignore
    gridTemplate: toGridTemplate([
      ['200px',                  'auto',            '200px'                  ],
      [SearchBarArea.leftMenu, SearchBarArea.logo, SearchBarArea.rightMenu]
    ]),
    css: {
      alignItems: 'center'
    }
  }
};

const rightMenuLayoutTheme: DefaultThemeProps = {
  rightMenuLayout: {
    display: 'grid',
    py: 'sm',
    gridGap: 'sm',
    // prettier-ignore
    gridTemplate: toGridTemplate([
      ['auto',               'auto',                'auto'            ],
      [RightMenuArea.search, RightMenuArea.account, RightMenuArea.cart]
    ]),
    css: {
      alignItems: 'center'
    }
  }
};

export const Searchbar: React.SFC<{ items: MenuItem[] }> = ({ items }) => (
  <Box defaultTheme={searchBarLayoutTheme}>
    <List css={{ color: 'black', display: { xs: 'none', md: 'flex' } }} gridArea={SearchBarArea.leftMenu}>
      {items.map(item => (
        <ListItem py="xs" mr="sm" key={item.name}>
          <Link as={RouterLink} to={item.url}>
            {item.name}
          </Link>
        </ListItem>
      ))}
    </List>
    <OpenSidebarMutation>
      {openSidebar => (
        <Icon
          gridArea={SearchBarArea.leftMenu}
          css={{ display: { md: 'none' } }}
          onClick={() =>
            openSidebar({
              variables: {
                contentType: 'account',
                side: 'left'
              }
            })
          }
          src="menu"
        />
      )}
    </OpenSidebarMutation>
    <Link aria-label="DEITY" height="xl" as={RouterLink} gridArea={SearchBarArea.logo} to="/">
      <Icon src="logo" />
    </Link>
    <Box defaultTheme={rightMenuLayoutTheme} gridArea={SearchBarArea.rightMenu}>
      <Icon src="search" gridArea={RightMenuArea.search} />
      <OpenSidebarMutation>
        {openSidebar => (
          <React.Fragment>
            <CustomerQuery>
              {({ customer }) =>
                customer ? (
                  <Link as={RouterLink} to="/account" gridArea={RightMenuArea.account}>
                    <AccountIcon />
                  </Link>
                ) : (
                  <SignInIcon
                    gridArea={RightMenuArea.account}
                    onClick={() => openSidebar({ variables: { contentType: 'account' } })}
                  />
                )
              }
            </CustomerQuery>
            <CartQuery>
              {(data: CartData) => (
                <MiniCartIcon
                  onClick={() => openSidebar({ variables: { contentType: 'cart' } })}
                  gridArea={RightMenuArea.cart}
                  itemsQty={data.cart ? data.cart.itemsQty : 0}
                />
              )}
            </CartQuery>
          </React.Fragment>
        )}
      </OpenSidebarMutation>
    </Box>
  </Box>
);

export const Header: React.SFC<HeaderData> = ({
  config: {
    menus: { header, leftMenu }
  }
}) => (
  <header>
    <Banner />
    {/* <LeftMenu items={leftMenu} /> */}
    <Searchbar items={leftMenu} />
    <nav>
      <Nav items={header} />
    </nav>
  </header>
);

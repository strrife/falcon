import React from 'react';
import { Value } from 'react-powerplug';

import { themed } from '../theme';
import { Box } from './Box';
import { ListItem } from './List';

export const Navbar = themed({
  tag: 'ul',

  defaultTheme: {
    navbar: {
      p: 'none',
      m: 'none',
      bgFullWidth: 'primary',
      color: 'primaryText',
      display: 'flex',
      css: {
        listStyle: 'none',
        position: 'relative'
      }
    }
  }
});

const MenuItemContext = React.createContext<{ open?: boolean }>({});

const MenuItemInnerDOM: React.SFC<any> = props => (
  <Value initial={false}>
    {({ set, value }) => (
      <MenuItemContext.Provider value={{ open: value }}>
        <ListItem
          {...props}
          onMouseEnter={() => set(true)}
          onMouseLeave={() => set(false)}
          onClick={() => set(false)}
        />
      </MenuItemContext.Provider>
    )}
  </Value>
);

export const NavbarItem = themed({
  tag: MenuItemInnerDOM,

  defaultTheme: {
    navbarItem: {
      fontSize: 'sm',
      display: 'flex',
      color: 'primaryText',

      css: ({ theme }) => ({
        cursor: 'pointer',
        userSelect: 'none',
        listStyle: 'none',

        ':hover': {
          background: theme.colors.secondary,
          color: theme.colors.secondaryText
        }
      })
    }
  }
});

const NavbarItemMenuInnerDOM: React.SFC<any> = props => (
  <MenuItemContext.Consumer>
    {({ open }) => (
      <Box
        {...props}
        css={{ opacity: open ? 1 : 0, visibility: open ? 'visible' : 'hidden' }}
        transitionTimingFunction="easeInOut"
        transitionDuration="standard"
      />
    )}
  </MenuItemContext.Consumer>
);

export const NavbarItemMenu = themed({
  tag: NavbarItemMenuInnerDOM,

  defaultProps: {
    role: 'menu'
  },

  defaultTheme: {
    navbarItemMenu: {
      p: 'sm',
      bg: 'white',
      color: 'secondaryText',
      css: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        '::before': {
          content: '""',
          width: '200vw',
          height: '100%',
          background: 'white',
          position: 'absolute',
          left: '-50vw',
          right: '50vw',
          top: 0,
          zIndex: -1,
          boxShadow: '#0000002b 0px 11px 11px 1px'
        }
      }
    }
  }
});

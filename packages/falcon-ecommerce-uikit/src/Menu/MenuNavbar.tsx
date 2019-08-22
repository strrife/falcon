import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { MenuItem } from '@deity/falcon-shop-extension';
import { Navbar, NavbarItem, NavbarItemMenu, Link, List, ListItem } from '@deity/falcon-ui';

export type MenuNavbarProps = {
  items: MenuItem[];
};
export const MenuNavbar: React.SFC<MenuNavbarProps> = ({ items }) => (
  <nav>
    <Navbar>
      {items.map(item => (
        <NavbarItem key={item.name}>
          <Link p="sm" as={RouterLink} to={item.urlPath}>
            {item.name}
          </Link>
          {item.children.length > 0 && (
            <NavbarItemMenu>
              <List>
                {item.children.map(subItem => (
                  <ListItem key={subItem.name}>
                    <Link p="xs" display="block" as={RouterLink} to={subItem.urlPath}>
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
  </nav>
);

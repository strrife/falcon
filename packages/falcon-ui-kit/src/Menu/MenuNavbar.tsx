import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Navbar, NavbarItem, NavbarItemMenu, Link, List, ListItem } from '@deity/falcon-ui';

export type NavbarItem = {
  name: string;
  urlPath: string;
  children: NavbarItem[];
};
export type MenuNavbarProps = {
  items: NavbarItem[];
};
export const MenuNavbar: React.SFC<MenuNavbarProps> = ({ items }) => (
  <Navbar>
    {items.map(item => (
      <NavbarItem key={item.urlPath}>
        <Link p="sm" as={RouterLink} to={item.urlPath}>
          {item.name}
        </Link>

        {item.children.length > 0 && (
          <NavbarItemMenu>
            <List>
              {item.children.map(subItem => (
                <ListItem key={subItem.urlPath}>
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
);

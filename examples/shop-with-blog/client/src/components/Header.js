import React from 'react';
import { MenuQuery } from '@deity/falcon-shop-data';
import { MenuNavbar } from '@deity/falcon-ui-kit';
import { Searchbar, Banner } from '@deity/falcon-ecommerce-uikit';

export const Header = () => (
  <header>
    <Banner />
    <Searchbar />
    <nav>
      <MenuQuery>{({ menu }) => <MenuNavbar items={menu} />}</MenuQuery>
    </nav>
  </header>
);

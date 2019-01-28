import React from 'react';
import { Dropdown, DropdownLabel, DropdownMenu, DropdownMenuItem } from '@deity/falcon-ui';

export type LocaleItem = {
  code: string;
  name: string;
};

export const addCIModeLocale = (locales: LocaleItem[]) => {
  if (process.env.NODE_ENV === 'development') {
    if (!locales.find(x => x.code === 'cimode')) {
      locales.unshift({ code: 'cimode', name: 'CI mode' });
    }
  }

  return locales;
};

type LocaleSwitcherDropdownProps = {
  items: LocaleItem[];
  value: LocaleItem;
  onChange?: (x: LocaleItem) => any;
};

export const LocaleSwitcherDropdown: React.SFC<LocaleSwitcherDropdownProps> = ({ items, value, onChange }) => (
  <Dropdown onChange={onChange}>
    <DropdownLabel>{value.name}</DropdownLabel>
    <DropdownMenu variant="above">
      {items.map(x => (
        <DropdownMenuItem key={x.code} value={x}>
          {x.name}
        </DropdownMenuItem>
      ))}
    </DropdownMenu>
  </Dropdown>
);

import React from 'react';
import { Dropdown, DropdownLabel, DropdownMenu, DropdownMenuItem } from '@deity/falcon-ui';

export type LocaleItem = {
  code: string;
  name: string;
};

const addCIModeLocale = (locales: LocaleItem[]) => {
  if (process.env.NODE_ENV === 'development') {
    if (!locales.find(x => x.code === 'cimode')) {
      locales.unshift({ code: 'cimode', name: 'CI mode' });
    }
  }

  return locales;
};

type LanguageSwitcherProps = {
  items: LocaleItem[];
  value: LocaleItem;
  onChange?: (x: LocaleItem) => any;
};

export const LanguageSwitcher: React.SFC<LanguageSwitcherProps> = ({ items, value, onChange }) => {
  // TODO: following line of code need to be moved into falcon-server I think.
  items = addCIModeLocale(items);

  return (
    <Dropdown onChange={onChange}>
      <DropdownLabel css={{ textAlign: 'left' }}>{value.name}</DropdownLabel>

      <DropdownMenu variant="above">
        {items.map(x => (
          <DropdownMenuItem key={x.code} value={x}>
            {x.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

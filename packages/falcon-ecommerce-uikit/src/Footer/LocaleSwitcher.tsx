import React from 'react';
import { themed, Dropdown, DropdownLabel, DropdownMenu, DropdownMenuItem, Box } from '@deity/falcon-ui';
import { LocaleItem } from '@deity/falcon-front-kit';

export const LanguageSection = themed({
  tag: Box,
  defaultTheme: {
    languageSection: {
      bgFullWidth: 'secondaryLight',
      py: 'md',
      css: {
        maxWidth: 190,
        margin: '0 auto',
        zIndex: 2
      }
    }
  }
});

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

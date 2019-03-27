import React from 'react';
import { Text, Box, FlexLayout, Dropdown, DropdownLabel, DropdownMenu, DropdownMenuItem } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import { SortOrder } from './SortOrdersQuery';

export type SortOrderDropdownProps<TItem extends { name: string } = SortOrder> = {
  items: TItem[];
  value: TItem;
  onChange: (value: TItem) => void;
};
export const SortOrderDropdown: React.SFC<SortOrderDropdownProps> = ({ items, value, onChange }) => (
  <FlexLayout alignItems="center">
    <Text mr="sm">
      <T id="productsList.sort.title" />
    </Text>
    <Box display="flex">
      <Dropdown css={{ width: '100%' }} onChange={onChange}>
        <DropdownLabel>{value.name}</DropdownLabel>
        <DropdownMenu>
          {items.map((x: any) => (
            <DropdownMenuItem key={x.name} value={x}>
              {x.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </Box>
  </FlexLayout>
);

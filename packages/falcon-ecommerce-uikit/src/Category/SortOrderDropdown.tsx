import React from 'react';
import { Text, Box, FlexLayout, Dropdown, DropdownLabel, DropdownMenu, DropdownMenuItem } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';

export type SortOrderDropdownProps<TItem extends { name: string } = { name: string }> = {
  sortOrders: TItem[];
  activeSortOrder: TItem;
  onChange: (value: TItem) => void;
};
export const SortOrderDropdown: React.SFC<SortOrderDropdownProps> = ({ sortOrders, activeSortOrder, onChange }) => (
  <FlexLayout alignItems="center">
    <Text mr="sm">
      <T id="productsList.sort.title" />
    </Text>
    <Box display="flex">
      <Dropdown css={{ width: '100%' }} onChange={onChange}>
        <DropdownLabel>{activeSortOrder.name}</DropdownLabel>
        <DropdownMenu>
          {sortOrders.map((x: any) => (
            <DropdownMenuItem key={x.name} value={x}>
              {x.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </Box>
  </FlexLayout>
);

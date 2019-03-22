import React from 'react';
import { Box, List, ListItem } from '@deity/falcon-ui';
import { FilterInput } from '../Search/types';
import { SelectedFilterItem } from './FilterItem';

const filtersSummaryTheme = {
  filtersSummary: {}
};

type FiltersSummaryProps = {
  removeFilter: (name: string) => void;
  selected: FilterInput[];
};

export const FiltersSummary: React.SFC<FiltersSummaryProps> = ({ selected, removeFilter }) => (
  <Box defaultTheme={filtersSummaryTheme}>
    <List>
      {selected.map(item => (
        <ListItem key={item.field}>
          <SelectedFilterItem onClick={() => removeFilter(item.field)}>
            {item.field}: {item.value[0]}
          </SelectedFilterItem>
        </ListItem>
      ))}
    </List>
  </Box>
);

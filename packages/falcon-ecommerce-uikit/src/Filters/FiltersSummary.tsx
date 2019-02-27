import React from 'react';
import { Box, Text, List, ListItem, Icon } from '@deity/falcon-ui';
import { FilterInput } from '../Search/types';

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
          <Box onClick={() => removeFilter(item.field)} role="button">
            <Icon src="close" />
            <Text>
              {item.field}: {item.value[0]}
            </Text>
          </Box>
        </ListItem>
      ))}
    </List>
  </Box>
);

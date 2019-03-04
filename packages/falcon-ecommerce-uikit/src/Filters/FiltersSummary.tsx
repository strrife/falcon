import React from 'react';
import { Box, Text, List, ListItem, Icon, Button } from '@deity/falcon-ui';
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
          <Button
            onClick={() => removeFilter(item.field)}
            css={({ theme }) => ({
              display: 'flex',
              background: 'transparent',
              alignItems: 'center',
              cursor: 'pointer',
              color: theme.colors.black,
              padding: 0,
              textAlign: 'left',
              transitionProperty: 'none',
              border: 'none',
              ':hover:enabled': {
                color: theme.colors.primaryLight,
                background: 'transparent',
                svg: {
                  stroke: theme.colors.primaryLight
                }
              }
            })}
          >
            <Icon src="close" size="sm" mr="xs" />
            <Text>
              {item.field}: {item.value[0]}
            </Text>
          </Button>
        </ListItem>
      ))}
    </List>
  </Box>
);

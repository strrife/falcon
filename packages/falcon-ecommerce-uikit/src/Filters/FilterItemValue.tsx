import React from 'react';
import { ListItem, Text, DefaultThemeProps } from '@deity/falcon-ui';
import { AggregationBucket } from '../Search/types';

const filterItemValueTheme: DefaultThemeProps = {
  filterItemValue: {
    color: 'black',
    pl: 'xs',
    css: ({ theme }) => ({
      cursor: 'pointer',
      ':hover': {
        color: theme.colors.primaryLight
      }
    })
  }
};

type FilterItemValueProps = {
  item: AggregationBucket;
  onClick?: (ev: any) => void;
  onChange?: (ev: any) => void;
  selected?: boolean;
};

export const FilterItemValue: React.SFC<FilterItemValueProps> = ({ item, onClick }) => (
  <ListItem defaultTheme={filterItemValueTheme}>
    <Text onClick={onClick}>
      {item.title} ({item.count})
    </Text>
  </ListItem>
);

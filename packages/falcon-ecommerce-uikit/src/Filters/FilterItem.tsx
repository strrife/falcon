import React from 'react';
import { Box, Icon, ListItem, themed } from '@deity/falcon-ui';
import { AggregationBucket } from '../Search/types';

export const FilterItemLayout = themed({
  tag: ListItem,
  defaultTheme: {
    filterItemLayout: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      color: 'black',
      pl: 'xs',
      pb: 'xs',
      css: ({ theme }) => ({
        cursor: 'pointer',
        ':hover': {
          color: theme.colors.primaryLight
        }
      })
    }
  }
});

type FilterItemProps = {
  item: AggregationBucket;
  onClick?: (ev: any) => void;
  // selected?: boolean;
};

export const FilterItem: React.SFC<FilterItemProps> = ({ item, onClick }) => (
  <FilterItemLayout onClick={onClick}>
    {item.title} ({item.count})
  </FilterItemLayout>
);

const SelectedFilterItemInnerDOM: React.SFC<any> = ({ onClick, children, ...rest }) => (
  <Box {...rest}>
    <Icon
      src="close"
      size="md"
      mr="xs"
      onClick={() => onClick && onClick()}
      css={({ theme }) => ({
        cursor: onClick ? 'pointer' : undefined,
        ':hover': {
          stroke: theme.colors.primaryLight
        }
      })}
    />
    {children}
  </Box>
);
export const SelectedFilterItem = themed({
  tag: SelectedFilterItemInnerDOM,
  defaultTheme: {
    selectedFilterItemLayout: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      pl: 'xs'
    }
  }
});

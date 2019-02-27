import React from 'react';
import { Box, List, ListItem, Label, Checkbox } from '@deity/falcon-ui';
import { FilterInput, Aggregation } from '../Search/types';

const filterContentTheme = {
  filterContent: {}
};

type FilterContentProps = {
  setFilter: (name: string, value: string[]) => void;
  removeFilter: (name: string) => void;
  selected?: FilterInput;
  aggregation: Aggregation;
  singleMode?: boolean;
};

export const FilterContent: React.SFC<FilterContentProps> = ({
  aggregation,
  selected,
  setFilter,
  singleMode,
  removeFilter
}) => {
  const updateFilter = (enable: boolean, value: string) => {
    if (singleMode) {
      if (selected && selected.value.includes(value)) {
        return removeFilter(aggregation.key);
      }
      return setFilter(aggregation.key, [value]);
    }
    const nextSelected = selected ? [...selected.value] : [];
    if (enable) {
      nextSelected.push(value);
    } else {
      nextSelected.splice(nextSelected.indexOf(value), 1);
    }
    setFilter(aggregation.key, nextSelected);
  };

  return (
    <Box defaultTheme={filterContentTheme}>
      <List>
        {aggregation.buckets.map(item => (
          <ListItem key={item.name} pt="xs">
            <Label htmlFor={`item-${item.name}-${item.value}`} display="flex" flexDirection="row" alignItems="center">
              <Checkbox
                id={`item-${item.name}-${item.value}`}
                mr="xs"
                checked={!!selected && selected.value.includes(item.value)}
                onChange={ev => updateFilter(ev.target.checked, item.value)}
              />
              {item.name} ({item.count})
            </Label>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

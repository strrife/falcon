import React from 'react';
import { Label, Checkbox, List, themed, ThemedComponentProps } from '@deity/falcon-ui';
import { FilterOption } from '../Search/types';
import { FilterItemLayout } from './FilterItem';
import { SelectedFilterItem } from './FilterItem';
import { ColorTile } from './ColorTile';

export const FilterItemsList = themed({
  tag: List,
  defaultTheme: {
    filterItemsList: {
      css: {
        listStyle: 'none'
      }
    }
  }
});

export type SingleFilterProps = {
  options: FilterOption[];
  selected?: string;
  onChange: (value?: string) => void;
};
export const SingleFilter: React.SFC<SingleFilterProps & ThemedComponentProps> = ({
  options,
  selected,
  onChange,
  ...rest
}) => {
  const selectedOption = selected !== undefined ? options.find(x => x.value === selected) : undefined;

  return (
    <FilterItemsList {...rest as any}>
      {selectedOption && <SelectedFilterItem onClick={() => onChange()}>{selectedOption!.title}</SelectedFilterItem>}
      {!selectedOption &&
        options.map(x => (
          <FilterItemLayout key={x.value} onClick={() => onChange(x.value)}>
            {x.title} ({x.count})
          </FilterItemLayout>
        ))}
    </FilterItemsList>
  );
};

export const ColorFilter: React.SFC<SingleFilterProps & ThemedComponentProps> = ({
  options,
  selected,
  onChange,
  ...rest
}) => {
  const selectedOption = selected !== undefined ? options.find(x => x.value === selected) : undefined;

  return (
    <FilterItemsList display="flex" flexWrap="wrap" {...rest as any}>
      {selectedOption && (
        <SelectedFilterItem onClick={() => onChange()}>
          <ColorTile size="lg" color={selectedOption!.title} title={selectedOption!.title} />
        </SelectedFilterItem>
      )}
      {!selectedOption &&
        options.map(x => (
          <FilterItemLayout key={x.value} onClick={() => onChange(x.value)}>
            <ColorTile size="lg" color={x!.title} title={x!.title} />
          </FilterItemLayout>
        ))}
    </FilterItemsList>
  );
};

type MultipleFilterProps = {
  options: FilterOption[];
  selected: string[];
  onChange: (value: string[]) => void;
};

export const MultipleFilter: React.SFC<MultipleFilterProps> = ({ options, selected = [], onChange }) => {
  const handleOnChange = (option: FilterOption, isSelected: boolean) => {
    if (isSelected) {
      onChange([...selected, option.value]);
    } else {
      onChange(selected.filter(value => value !== option.value));
    }
  };

  return (
    <FilterItemsList>
      {options.map(x => (
        <FilterItemLayout key={x.value}>
          <Checkbox
            id={`${x.title}-${x.value}`}
            checked={selected.some(value => value === x.value)}
            onChange={e => handleOnChange(x, e.target.checked)}
          />
          <Label ml="sm" htmlFor={`${x.title}-${x.value}`}>
            {x.title} ({x.count})
          </Label>
        </FilterItemLayout>
      ))}
    </FilterItemsList>
  );
};

type RangeFilterProps = {
  min: number;
  max: number;
  selected: { from: number; to: number };
  setFilter: (from: string, to: string) => void;
};

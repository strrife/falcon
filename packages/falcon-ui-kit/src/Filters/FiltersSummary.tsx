import React from 'react';
import { List } from '@deity/falcon-ui';
import { SearchConsumer, FilterData, getSelectedFilterOptionsFor } from '@deity/falcon-front-kit';
import { SelectedFilterItemLayout } from './SelectedFilterItemLayout';
import { FiltersSummaryLayout } from './FiltersSummaryLayout';

export type FiltersSummaryProps = {
  data: FilterData[];
};

export const FiltersSummary: React.SFC<FiltersSummaryProps> = ({ data }) => (
  <SearchConsumer>
    {({ state: { filters }, removeFilter }) => {
      if (!filters.length) {
        return null;
      }

      return (
        <FiltersSummaryLayout>
          <List>
            {data.map(({ field, title }) => {
              const selectedFilterOptions = getSelectedFilterOptionsFor(data, field);

              if (selectedFilterOptions.length === 0) {
                return null;
              }

              return (
                <SelectedFilterItemLayout key={field} onClick={() => removeFilter(field)}>
                  {title}: {selectedFilterOptions.map(x => x.title || x.value).join(', ')}
                </SelectedFilterItemLayout>
              );
            })}
          </List>
        </FiltersSummaryLayout>
      );
    }}
  </SearchConsumer>
);

import React from 'react';
import { Box, H3, themed } from '@deity/falcon-ui';

export const FilterLayout = themed({
  tag: Box,
  defaultTheme: {
    filterLayout: {}
  }
});

type FilterTileProps = {
  title: string;
};

export const FilterTile: React.SFC<FilterTileProps> = ({ title, children }) => (
  <FilterLayout>
    <H3>{title}</H3>
    <Box>{children}</Box>
  </FilterLayout>
);

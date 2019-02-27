import React from 'react';
import { Box, H3, DefaultThemeProps } from '@deity/falcon-ui';

const filterTileTheme: DefaultThemeProps = {
  filterTile: {
    py: {
      sm: 'xs',
      md: 'sm'
    }
  }
};

type FilterTileProps = {
  title: string;
};

export const FilterTile: React.SFC<FilterTileProps> = ({ title, children }) => (
  <Box defaultTheme={filterTileTheme}>
    <H3>{title}</H3>
    <Box>{children}</Box>
  </Box>
);

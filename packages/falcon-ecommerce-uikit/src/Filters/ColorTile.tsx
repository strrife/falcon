import React from 'react';
import { Box, themed } from '@deity/falcon-ui';

export const ColorTile = themed<{ color: string }, any>({
  tag: Box,
  defaultProps: {
    color: 'black'
  },
  defaultTheme: {
    colorTile: {
      size: 'md',
      borderRadius: 'small',
      border: 'bold',
      borderColor: 'secondaryDark',
      css: ({ color }) => ({
        backgroundColor: color
      })
    }
  }
});

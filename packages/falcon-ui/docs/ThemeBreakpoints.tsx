import React from 'react';
import { withMDXComponents } from '@mdx-js/tag/dist/mdx-provider';
import { ThemeStateContext } from '@deity/falcon-theme-editor';
import { Icon, Button } from '../src';

const ThemeBreakpoints: React.SFC = () => (
  <ThemeStateContext.Consumer>
    {({ openThemePropsPanel }) => (
      <Button
        onClick={() => {
          openThemePropsPanel('breakpoints');
        }}
      >
        <Icon stroke="white" size="md" src="viewTheme" mr="xs" /> view available theme breakpoints
      </Button>
    )}
  </ThemeStateContext.Consumer>
);

export default withMDXComponents(ThemeBreakpoints);

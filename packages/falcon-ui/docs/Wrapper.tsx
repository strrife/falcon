import React from 'react';
import { ThemeEditor, ThemeEditorState } from '@deity/falcon-theme-editor';
import Eye from 'react-feather/dist/icons/eye';
import { ThemeProvider, createTheme } from '../src';

const initialTheme = createTheme({
  fontWeights: {
    bold: 500
  },

  components: {},
  icons: {
    viewTheme: {
      icon: Eye
    }
  }
});

export default (props: any) => (
  <ThemeEditorState initial={initialTheme}>
    {({ theme, ...rest }) => (
      <React.Fragment>
        <ThemeProvider theme={theme} {...props} />
        <ThemeEditor theme={theme} {...rest} />
      </React.Fragment>
    )}
  </ThemeEditorState>
);

import React from 'react';
import { themed, Box } from '@deity/falcon-ui';

export const LanguageSection = themed({
  tag: Box,
  defaultTheme: {
    languageSection: {
      bgFullWidth: 'secondaryLight',
      py: 'md',
      css: {
        maxWidth: 190,
        margin: '0 auto',
        zIndex: 2
      }
    }
  }
});

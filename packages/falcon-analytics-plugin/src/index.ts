import React from 'react';
import { set, pageview, FieldsObject } from 'react-ga';
import WithAnalytics from './withAnalytics';

export * from 'react-ga';

export const withAnalytics = (component: React.ReactType, options: FieldsObject = {}) =>
  WithAnalytics(component, (page: string) => {
    set({
      page,
      ...options
    });
    pageview(page);
  });

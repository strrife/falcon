import React from 'react';
import WithAnalytics from './withAnalytics';

const proxyGetter = (methodName: string, ...params: any[]): any => {
  if (methodName === 'default') {
    return WithAnalytics(params[0], (page: string) => ga.trackPage(page));
  }
  console.log('[DEBUG] Google Analytics: "%s"', methodName, params.length ? { params } : '');
};

let ga: any = null;

export const initAnalytics = (trackingCode: string, isBrowser: boolean = false, isDebug: boolean = false): void => {
  if (!isBrowser || !trackingCode) {
    return;
  }
  if (isDebug) {
    ga = new Proxy(
      {},
      {
        get: (target: any, methodName: string) => (...params: any[]) => proxyGetter(methodName, ...params)
      }
    );
  } else {
    ga = require('react-with-analytics');
  }
  ga.initAnalytics(trackingCode);
};

export const trackEvent = (category: string, action: string, label: string): void => {
  if (!ga) {
    return;
  }
  ga.trackEvent(category, action, label);
};

export const withAnalytics = (component: React.ReactType) => (ga ? ga.default(component) : component);
